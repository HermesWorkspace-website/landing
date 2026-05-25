import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Verifies a Slack request using its signing secret.
 *
 * How it works:
 *  1. Slack sends `X-Slack-Request-Timestamp` and `X-Slack-Signature` headers.
 *  2. We build a basestring: `v0:{timestamp}:{raw_body}`
 *  3. We HMAC-SHA256 that with our signing secret → our expected signature.
 *  4. We compare ours vs Slack's using timingSafeEqual (prevents timing attacks).
 *  5. We also reject requests older than 5 minutes (replay attack protection).
 *
 * Docs: https://api.slack.com/authentication/verifying-requests-from-slack
 */
export async function verifySlackSignature(
  req: Request,
  rawBody: string
): Promise<boolean> {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (!signingSecret) {
    console.error("[Slack] SLACK_SIGNING_SECRET not set");
    return false;
  }

  const timestamp = req.headers.get("x-slack-request-timestamp");
  const slackSignature = req.headers.get("x-slack-signature");

  if (!timestamp || !slackSignature) return false;

  // Reject requests older than 5 minutes to block replay attacks
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 5 * 60;
  if (parseInt(timestamp, 10) < fiveMinutesAgo) {
    console.warn("[Slack] Rejected stale request (possible replay attack)");
    return false;
  }

  // Build the signature base string exactly as Slack does
  const sigBaseString = `v0:${timestamp}:${rawBody}`;

  const ourSignature =
    "v0=" +
    createHmac("sha256", signingSecret)
      .update(sigBaseString, "utf8")
      .digest("hex");

  // timingSafeEqual prevents timing-based brute-force attacks
  try {
    const ourBuf = Buffer.from(ourSignature, "utf8");
    const theirBuf = Buffer.from(slackSignature, "utf8");
    if (ourBuf.length !== theirBuf.length) return false;
    return timingSafeEqual(ourBuf, theirBuf);
  } catch {
    return false;
  }
}
