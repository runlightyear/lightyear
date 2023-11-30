import {
  AppWebhookConnector,
  AppWebhookConnectorProps,
} from "../connectors/AppWebhookConnector";
import { validNameRegex } from "../util/isValidName";
import { z } from "zod";
import { pushToDeployList } from "./deploy";

export type CustomAppWebhookIndex = {
  [customAppName: string]: (
    props: AppWebhookConnectorProps
  ) => AppWebhookConnector;
};

export interface DefineCustomAppWebhookProps {
  customApp: string;
  connector: (props: AppWebhookConnectorProps) => AppWebhookConnector;
}

function validateCustomAppWebhookProps(props: DefineCustomAppWebhookProps) {
  const { customApp } = props;

  const NameSchema = z.string().min(1).regex(validNameRegex);
  const ConnectorSchema = z.function();

  const DefineAppWebhookSchema = z
    .object({
      customApp: NameSchema,
      connector: ConnectorSchema,
    })
    .strict();

  if (customApp === undefined) {
    throw new Error("customApp is required");
  }

  if (!NameSchema.safeParse(customApp).success) {
    throw new Error(`Invalid customApp: ${customApp}`);
  }

  const fullResult = DefineAppWebhookSchema.safeParse(props);
  if (!fullResult.success) {
    const messages = fullResult.error.issues.map((issue) => issue.message);
    throw new Error(
      "Invalid custom app webhook definition: " + messages.join(", ")
    );
  }
}

export function defineCustomAppWebhook(props: DefineCustomAppWebhookProps) {
  validateCustomAppWebhookProps(props);

  const { customApp, connector } = props;

  pushToDeployList({ type: "customAppWebhook", customAppWebhookProps: props });

  globalThis.customAppWebhookIndex[customApp] = connector;
}
