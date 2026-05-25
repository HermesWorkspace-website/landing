import "server-only";

export const DATABASE_URL = process.env.DATABASE_URL;
export const SLACK_SALES_LEADS_WEEBHOOK = process.env.SLACK_SALES_LEADS_WEEBHOOK;
export const SLACK_SUPPORT_TICKETS_WEEBHOOK = process.env.SLACK_SUPPORT_TICKETS_WEEBHOOK;

if (!DATABASE_URL || !SLACK_SALES_LEADS_WEEBHOOK || !SLACK_SUPPORT_TICKETS_WEEBHOOK) {
  throw new Error(
    `Missing required environment variables:\n` +
    `${!DATABASE_URL ? "  - DATABASE_URL\n" : ""}` +
    `${!SLACK_SALES_LEADS_WEEBHOOK ? "  - SLACK_SALES_LEADS_WEEBHOOK\n" : ""}` +
    `${!SLACK_SUPPORT_TICKETS_WEEBHOOK ? "  - SLACK_SUPPORT_TICKETS_WEEBHOOK\n" : ""}`
  );
}