import "server-only";
import { WebClient } from "@slack/web-api";

/**
 * Singleton Slack WebClient instance.
 *
 * We use this (not webhooks) to call chat.update after a button is clicked,
 * because Incoming Webhooks can only POST new messages — they cannot edit
 * existing messages. chat.update requires a Bot Token (xoxb-...) and the
 * channel ID + message timestamp (ts) from the interactive payload.
 */
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export default slack;
