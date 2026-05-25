import "server-only";
import axios from "axios";
import {
  SLACK_SALES_LEADS_WEEBHOOK,
  SLACK_SUPPORT_TICKETS_WEEBHOOK,
} from "@/env";

// ── Channel routing ───────────────────────────────────────────────────────────
// Sales Leads  → Demo Request, Partnership, Onboarding
// Support      → Technical Support, General Inquiry, Others

const SALES_TYPES = new Set(["Demo Request", "Partnership", "Onboarding"]);
const SUPPORT_TYPES = new Set(["Technical Support", "General Inquiry", "Others"]);

type InquiryChannel = "sales" | "support";

function getChannel(inquiryType: string): InquiryChannel {
  return SALES_TYPES.has(inquiryType) ? "sales" : "support";
}

function getWebhookUrl(channel: InquiryChannel): string {
  return channel === "sales"
    ? SLACK_SALES_LEADS_WEEBHOOK!
    : SLACK_SUPPORT_TICKETS_WEEBHOOK!;
}

// ── Emoji + label maps ────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<
  string,
  { emoji: string; label: string; color: string }
> = {
  "Demo Request":      { emoji: "🎯", label: "Demo Request",      color: "#5A5FE8" },
  "Partnership":       { emoji: "🤝", label: "Partnership",       color: "#7C3AED" },
  "Onboarding":        { emoji: "🚀", label: "Onboarding",        color: "#0EA5E9" },
  "Technical Support": { emoji: "🔧", label: "Technical Support", color: "#F59E0B" },
  "General Inquiry":   { emoji: "💬", label: "General Inquiry",   color: "#6B7280" },
  "Others":            { emoji: "📋", label: "Others",            color: "#6B7280" },
};

// ── Block Kit payload builders ────────────────────────────────────────────────

interface InquiryData {
  id: string;
  fullName: string;
  institution: string;
  email: string;
  phone?: string | null;
  inquiryType: string;
  message: string;
  createdAt: Date;
}

function buildSalesPayload(data: InquiryData) {
  const cfg = TYPE_CONFIG[data.inquiryType] ?? TYPE_CONFIG["General Inquiry"];
  const timestamp = Math.floor(data.createdAt.getTime() / 1000);

  return {
    // Fallback text for notifications
    text: `${cfg.emoji} New ${cfg.label} from ${data.fullName} at ${data.institution}`,
    attachments: [
      {
        color: cfg.color,
        blocks: [
          // Header
          {
            type: "header",
            text: {
              type: "plain_text",
              text: `${cfg.emoji}  New ${cfg.label} — HermesWorkspace`,
              emoji: true,
            },
          },
          // Lead info
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*👤 Name*\n${data.fullName}`,
              },
              {
                type: "mrkdwn",
                text: `*🏛️ Institution*\n${data.institution}`,
              },
              {
                type: "mrkdwn",
                text: `*📧 Email*\n<mailto:${data.email}|${data.email}>`,
              },
              {
                type: "mrkdwn",
                text: `*📞 Phone*\n${data.phone || "_Not provided_"}`,
              },
            ],
          },
          { type: "divider" },
          // Message
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*💬 Message*\n>${data.message}`,
            },
          },
          { type: "divider" },
          // Footer context
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `🆔 *ID:* \`${data.id}\`   •   🕐 *Submitted:* <!date^${timestamp}^{date_short_pretty} at {time}|${data.createdAt.toISOString()}>`,
              },
            ],
          },
        ],
      },
    ],
  };
}

function buildSupportPayload(data: InquiryData) {
  const cfg = TYPE_CONFIG[data.inquiryType] ?? TYPE_CONFIG["General Inquiry"];
  const timestamp = Math.floor(data.createdAt.getTime() / 1000);

  // Urgency flag for Technical Support
  const isUrgent = data.inquiryType === "Technical Support";

  return {
    text: `${cfg.emoji} Support ticket from ${data.fullName} (${data.institution})`,
    attachments: [
      {
        color: cfg.color,
        blocks: [
          // Header
          {
            type: "header",
            text: {
              type: "plain_text",
              text: `${cfg.emoji}  ${isUrgent ? "⚡ " : ""}Support Ticket — HermesWorkspace`,
              emoji: true,
            },
          },
          // Urgency banner for Technical Support
          ...(isUrgent
            ? [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `:warning: *Technical Support request — respond within 12 hours.*`,
                  },
                },
              ]
            : []),
          // Ticket type badge
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Type:* \`${cfg.label}\``,
            },
          },
          { type: "divider" },
          // Contact info
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*👤 Name*\n${data.fullName}`,
              },
              {
                type: "mrkdwn",
                text: `*🏛️ Institution*\n${data.institution}`,
              },
              {
                type: "mrkdwn",
                text: `*📧 Email*\n<mailto:${data.email}|${data.email}>`,
              },
              {
                type: "mrkdwn",
                text: `*📞 Phone*\n${data.phone || "_Not provided_"}`,
              },
            ],
          },
          { type: "divider" },
          // Message / issue description
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*📝 Description*\n>${data.message}`,
            },
          },
          { type: "divider" },
          // Footer
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `🆔 *Ticket ID:* \`${data.id}\`   •   🕐 *Received:* <!date^${timestamp}^{date_short_pretty} at {time}|${data.createdAt.toISOString()}>`,
              },
            ],
          },
        ],
      },
    ],
  };
}

// ── Main export ───────────────────────────────────────────────────────────────
export default async function sendSlackNotification(data: InquiryData): Promise<void> {
  const channel = getChannel(data.inquiryType);
  const webhookUrl = getWebhookUrl(channel);
  const payload =
    channel === "sales"
      ? buildSalesPayload(data)
      : buildSupportPayload(data);

  try {
    await axios.post(webhookUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(
      `[Slack] ✓ ${channel === "sales" ? "Sales lead" : "Support ticket"} notification sent for inquiry ${data.id}`
    );
  } catch (error) {
    // Log but don't crash the API — Slack notification is non-critical
    console.error("[Slack] ✗ Failed to send notification:", error);
  }
}