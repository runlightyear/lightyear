import { DeployItem } from "./base/deploy";
import { ActionIndex } from "./run";
import {
  ReceiveDeliveryIndex,
  RefreshSubscriptionIndex,
  SubscribeIndex,
  UnsubscribeIndex,
} from "./base/webhook";
import { AuthorizerIndex } from "./base/authorizer";
import { CustomAppWebhookIndex } from "./base/customApp";

export declare global {
  declare module globalThis {
    var startTimeMs: number;
    var deployList: DeployItem[];
    var actionIndex: ActionIndex;
    var subscribeIndex: SubscribeIndex;
    var unsubscribeIndex: UnsubscribeIndex;
    var refreshSubscriptionIndex: RefreshSubscriptionIndex;
    var receiveDeliveryIndex: ReceiveDeliveryIndex;
    var authorizerIndex: AuthorizerIndex;
    var customAppWebhookIndex: CustomAppWebhookIndex;
  }
}
