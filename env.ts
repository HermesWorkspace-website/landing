import "server-only";

export const DATABASE_URL = process.env.DATABASE_URL;

// Webhook URLs are no longer used — messages are sent via chat.postMessage
// These can be kept in .env for reference but are not required at runtime
export const SLACK_SALES_LEADS_WEEBHOOK = process.env.SLACK_SALES_LEADS_WEEBHOOK;
export const SLACK_SUPPORT_TICKETS_WEEBHOOK = process.env.SLACK_SUPPORT_TICKETS_WEEBHOOK;

// Slack app credentials
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

// Channel IDs for chat.postMessage
// Find these in Slack: right-click a channel → View channel details → bottom of About tab
export const SLACK_SALES_CHANNEL_ID = process.env.SLACK_SALES_CHANNEL_ID;
export const SLACK_SUPPORT_CHANNEL_ID = process.env.SLACK_SUPPORT_CHANNEL_ID;

const missing = [
  !DATABASE_URL && "DATABASE_URL",
  !SLACK_SIGNING_SECRET && "SLACK_SIGNING_SECRET",
  !SLACK_BOT_TOKEN && "SLACK_BOT_TOKEN",
  !SLACK_SALES_CHANNEL_ID && "SLACK_SALES_CHANNEL_ID",
  !SLACK_SUPPORT_CHANNEL_ID && "SLACK_SUPPORT_CHANNEL_ID",
].filter(Boolean);

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables:\n${missing.map((v) => `  - ${v}`).join("\n")}`
  );
}