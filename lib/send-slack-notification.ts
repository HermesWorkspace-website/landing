import "server-only";
import slack from "@/lib/slack-client";
import { SLACK_SALES_CHANNEL_ID, SLACK_SUPPORT_CHANNEL_ID } from "@/env";

// ── Channel routing ───────────────────────────────────────────────────────────
// Sales     → Demo Request, Partnership, General Inquiry
// Support   → Technical Support, Onboarding, Others

const SALES_TYPES = new Set(["Demo Request", "Partnership", "General Inquiry"]);

type InquiryChannel = "sales" | "support";

function getChannel(inquiryType: string): InquiryChannel {
    return SALES_TYPES.has(inquiryType) ? "sales" : "support";
}

function getChannelId(channel: InquiryChannel): string {
    return channel === "sales"
        ? SLACK_SALES_CHANNEL_ID!
        : SLACK_SUPPORT_CHANNEL_ID!;
}

// ── Emoji + label maps ────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
    "Demo Request":      { emoji: "🎯", label: "Demo Request",      color: "#5A5FE8" },
    "Partnership":       { emoji: "🤝", label: "Partnership",       color: "#7C3AED" },
    "Onboarding":        { emoji: "🚀", label: "Onboarding",        color: "#0EA5E9" },
    "Technical Support": { emoji: "🔧", label: "Technical Support", color: "#F59E0B" },
    "General Inquiry":   { emoji: "💬", label: "General Inquiry",   color: "#6B7280" },
    "Others":            { emoji: "📋", label: "Others",            color: "#6B7280" },
};

// ── Types ─────────────────────────────────────────────────────────────────────
export interface InquiryData {
    id: string;
    fullName: string;
    institution: string;
    email: string;
    phone?: string | null;
    inquiryType: string;
    message: string;
    createdAt: Date;
}

// ── Block Kit payload builders ────────────────────────────────────────────────

function buildSalesBlocks(data: InquiryData, cfg: { emoji: string; label: string }) {
    const timestamp = Math.floor(data.createdAt.getTime() / 1000);
    return [
        {
            type: "header",
            text: {
                type: "plain_text",
                text: `${cfg.emoji}  New ${cfg.label} — HermesWorkspace`,
                emoji: true,
            },
        },
        {
            type: "section",
            fields: [
                { type: "mrkdwn", text: `*👤 Name*\n${data.fullName}` },
                { type: "mrkdwn", text: `*🏛️ Institution*\n${data.institution}` },
                { type: "mrkdwn", text: `*📧 Email*\n<mailto:${data.email}|${data.email}>` },
                { type: "mrkdwn", text: `*📞 Phone*\n${data.phone || "_Not provided_"}` },
            ],
        },
        { type: "divider" },
        {
            type: "section",
            text: { type: "mrkdwn", text: `*💬 Message*\n>${data.message}` },
        },
        { type: "divider" },
        {
            type: "actions",
            elements: [
                {
                    type: "button",
                    text: { type: "plain_text", text: "✅ Close Ticket", emoji: true },
                    style: "primary",
                    value: data.id,
                    action_id: "close_ticket",
                },
            ],
        },
        {
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `🆔 *ID:* \`${data.id}\`   •   🕐 *Submitted:* <!date^${timestamp}^{date_short_pretty} at {time}|${data.createdAt.toISOString()}>`,
                },
            ],
        },
    ];
}

function buildSupportBlocks(data: InquiryData, cfg: { emoji: string; label: string }) {
    const timestamp = Math.floor(data.createdAt.getTime() / 1000);
    const isUrgent = data.inquiryType === "Technical Support";
    return [
        {
            type: "header",
            text: {
                type: "plain_text",
                text: `${cfg.emoji}  ${isUrgent ? "⚡ " : ""}Support Ticket — HermesWorkspace`,
                emoji: true,
            },
        },
        ...(isUrgent
            ? [{
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `:warning: *Technical Support request — respond within 12 hours.*`,
                },
            }]
            : []),
        {
            type: "section",
            text: { type: "mrkdwn", text: `*Type:* \`${cfg.label}\`` },
        },
        { type: "divider" },
        {
            type: "section",
            fields: [
                { type: "mrkdwn", text: `*👤 Name*\n${data.fullName}` },
                { type: "mrkdwn", text: `*🏛️ Institution*\n${data.institution}` },
                { type: "mrkdwn", text: `*📧 Email*\n<mailto:${data.email}|${data.email}>` },
                { type: "mrkdwn", text: `*📞 Phone*\n${data.phone || "_Not provided_"}` },
            ],
        },
        { type: "divider" },
        {
            type: "section",
            text: { type: "mrkdwn", text: `*📝 Description*\n>${data.message}` },
        },
        { type: "divider" },
        {
            type: "actions",
            elements: [
                {
                    type: "button",
                    text: { type: "plain_text", text: "✅ Close Ticket", emoji: true },
                    style: "primary",
                    value: data.id,
                    action_id: "close_ticket",
                },
            ],
        },
        {
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `🆔 *Ticket ID:* \`${data.id}\`   •   🕐 *Received:* <!date^${timestamp}^{date_short_pretty} at {time}|${data.createdAt.toISOString()}>`,
                },
            ],
        },
    ];
}

// ── Main export ───────────────────────────────────────────────────────────────

export default async function sendSlackNotification(data: InquiryData): Promise<void> {
    const channel = getChannel(data.inquiryType);
    const channelId = getChannelId(channel);
    const cfg = TYPE_CONFIG[data.inquiryType] ?? TYPE_CONFIG["General Inquiry"];

    const blocks =
        channel === "sales"
            ? buildSalesBlocks(data, cfg)
            : buildSupportBlocks(data, cfg);

    try {
        await slack.chat.postMessage({
            channel: channelId,
            // Fallback text for notifications / accessibility
            text: `${cfg.emoji} New ${cfg.label} from ${data.fullName} at ${data.institution}`,
            attachments: [
                {
                    color: cfg.color,
                    blocks,
                },
            ],
        });

        console.log(
            `[Slack] ✓ ${channel === "sales" ? "Sales lead" : "Support ticket"} posted for inquiry ${data.id}`
        );
    } catch (error) {
        // Non-critical — log but never crash the API response
        console.error("[Slack] ✗ chat.postMessage failed:", error);
    }
}