import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slack from "@/lib/slack-client";
import { verifySlackSignature } from "@/lib/slack-verify";

// ─────────────────────────────────────────────────────────────────────────────
// HOW SLACK INTERACTIVE PAYLOADS WORK
//
// When a user clicks a Block Kit button:
//  1. Slack POSTs to the Interactivity Request URL (api.slack.com → App →
//     Interactivity & Shortcuts → Request URL)
//  2. Body is application/x-www-form-urlencoded with one field: `payload`
//     containing a JSON string.
//  3. That JSON includes:
//     - payload.actions[0].action_id  → which button was clicked
//     - payload.actions[0].value      → value set on the button (inquiry ID)
//     - payload.user.name             → Slack display name of who clicked
//     - payload.channel.id            → channel the message lives in
//     - payload.message.ts            → the message's unique timestamp (its ID)
//       WHY ts is needed: chat.update uses channel + ts as the message address.
//       ts is Slack's unique identifier for a message within a channel.
//     - payload.message.attachments   → original blocks, so we can rebuild them
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Read raw body ──────────────────────────────────────────────────────
  // Must capture raw bytes BEFORE any parsing — signature verification
  // hashes the exact raw body string.
  const rawBody = await req.text();

  // ── 2. Verify Slack signature ─────────────────────────────────────────────
  // Confirms the request actually came from Slack, not a forged POST.
  const isValid = await verifySlackSignature(req, rawBody);
  if (!isValid) {
    console.warn("[Slack Actions] Rejected — invalid signature");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── 3. Parse the form-encoded payload ────────────────────────────────────
  // Slack sends: payload=<url-encoded JSON string>
  let payload: SlackInteractivePayload;
  try {
    const params = new URLSearchParams(rawBody);
    const raw = params.get("payload");
    if (!raw) throw new Error("Missing payload field");
    payload = JSON.parse(raw);
  } catch (err) {
    console.error("[Slack Actions] Failed to parse payload:", err);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // ── 4. Route by action_id ─────────────────────────────────────────────────
  const action = payload.actions?.[0];
  if (!action) {
    return NextResponse.json({ ok: true });
  }

  if (action.action_id === "close_ticket") {
    return handleCloseTicket(payload, action);
  }

  // Unknown action — always acknowledge within Slack's 3-second window
  return NextResponse.json({ ok: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// close_ticket handler
// ─────────────────────────────────────────────────────────────────────────────
async function handleCloseTicket(
  payload: SlackInteractivePayload,
  action: SlackAction
): Promise<NextResponse> {
  const inquiryId = action.value;
  const closedByUser =
    payload.user?.name ?? payload.user?.username ?? "Unknown";
  const closedAt = new Date();

  // ── 5. Update the DB ──────────────────────────────────────────────────────
  let inquiry;
  try {
    inquiry = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status: "CLOSED", closedAt, closedBy: closedByUser },
    });
  } catch (err) {
    console.error("[Slack Actions] DB update failed:", err);
    return NextResponse.json(
      { text: "❌ Failed to close ticket — database error." },
      { status: 200 } // Must 200 so Slack doesn't retry and show a timeout
    );
  }

  // ── 6. Build the updated message ──────────────────────────────────────────
  // Strip the "Close Ticket" actions block, replace with a closed-state section.
  const closedTimestamp = Math.floor(closedAt.getTime() / 1000);
  const originalAttachments: SlackAttachment[] =
    payload.message?.attachments ?? [];

  const updatedAttachments = originalAttachments.map((attachment) => {
    const filteredBlocks = (attachment.blocks ?? []).filter(
      // Remove the interactive actions block (the button row)
      (block: SlackBlock) => block.type !== "actions"
    );

    return {
      ...attachment,
      color: "#9CA3AF", // grey sidebar = visually closed
      blocks: [
        ...filteredBlocks,
        // ✅ Closed status banner
        {
          type: "section",
          text: { type: "mrkdwn", text: `:white_check_mark: *Ticket Closed*` },
        },
        // Audit trail context row
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: [
                `👤 *Closed by:* ${closedByUser}`,
                `🕐 *Closed at:* <!date^${closedTimestamp}^{date_short_pretty} at {time}|${closedAt.toISOString()}>`,
                `🆔 *ID:* \`${inquiry.id}\``,
              ].join("   •   "),
            },
          ],
        },
      ],
    };
  });

  // ── 7. Update the original Slack message via chat.update ─────────────────
  // WHY channel.id + message.ts:
  //   chat.update identifies a message by its channel + ts (timestamp).
  //   ts is the unique message ID Slack assigns at send time.
  //   The bot token (xoxb-) must have chat:write scope and must be the
  //   same bot that originally posted the message.
  const channelId = payload.channel?.id;
  const messageTs = payload.message?.ts;

  if (channelId && messageTs) {
    try {
      await slack.chat.update({
        channel: channelId,
        ts: messageTs,
        text: `✅ Closed by ${closedByUser} — ${inquiry.fullName} (${inquiry.institution})`,
        attachments: updatedAttachments,
      });
      // Message updated successfully
    } catch (err) {
      // Non-fatal — DB already updated, just log
      console.error("[Slack Actions] chat.update failed:", err);
    }
  }

  // ── 8. Acknowledge Slack ──────────────────────────────────────────────────
  // Slack requires a response within 3 seconds or shows a timeout error.
  // Empty 200 = "received and handled".
  return new NextResponse(null, { status: 200 });
}

// ─────────────────────────────────────────────────────────────────────────────
// Minimal Slack payload types
// ─────────────────────────────────────────────────────────────────────────────

interface SlackAction {
  action_id: string;
  value: string;
  type: string;
}

interface SlackBlock {
  type: string;
  [key: string]: unknown;
}

interface SlackAttachment {
  color?: string;
  blocks?: SlackBlock[];
  [key: string]: unknown;
}

interface SlackInteractivePayload {
  type: string;
  actions: SlackAction[];
  user: { id: string; name: string; username?: string };
  channel: { id: string; name: string };
  message: {
    ts: string;
    attachments?: SlackAttachment[];
    [key: string]: unknown;
  };
  response_url: string;
}