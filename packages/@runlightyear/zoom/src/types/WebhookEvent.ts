import { WebhookMeetingEvent } from "./webhookEvents/WebhookMeetingEvent";
import { WebhookContactCenterEvent } from "./webhookEvents/WebhookContactCenterEvent";
import { WebhookZoomPhoneEvent } from "./webhookEvents/WebhookZoomPhoneEvent";
import { WebhookVideoSdkEvent } from "./webhookEvents/WebhookVideoSdkEvent";
import { WebhookZoomEventsEvent } from "./webhookEvents/WebhookZoomEventsEvent";
import { WebhookTeamChatEvent } from "./webhookEvents/WebhookTeamChatEvent";
import { WebhookChatbotEvent } from "./webhookEvents/WebhookChatbotEvent";
import { WebhookWhiteboardEvent } from "./webhookEvents/WebhookWhiteboardEvent";
import { WebhookZoomAppEvent } from "./webhookEvents/WebhookZoomAppEvent";
import { WebhookZoomRoomsEvent } from "./webhookEvents/WebhookZoomRoomsEvent";
import { WebhookQssEvent } from "./webhookEvents/WebhookQssEvent";

export type WebhookEvent =
  | WebhookMeetingEvent
  | WebhookZoomPhoneEvent
  | WebhookContactCenterEvent
  | WebhookVideoSdkEvent
  | WebhookZoomEventsEvent
  | WebhookTeamChatEvent
  | WebhookChatbotEvent
  | WebhookZoomRoomsEvent
  | WebhookZoomAppEvent
  | WebhookQssEvent
  | WebhookWhiteboardEvent;
