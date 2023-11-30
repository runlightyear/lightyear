import {
  OAuthConnector,
  OAuthConnectorProps,
} from "../connectors/OAuthConnector";
import { z } from "zod";
import { validNameRegex } from "../util/isValidName";
import { pushToDeployList } from "./deploy";

/**
 * @internal
 */
export type AuthorizerIndex = {
  [customAppName: string]: (props: OAuthConnectorProps) => OAuthConnector;
};


export interface DefineAuthorizerProps {
  customApp: string;
  connector: (props: OAuthConnectorProps) => OAuthConnector;
}

function validateAuthorizerProps(props: DefineAuthorizerProps) {
  const { customApp } = props;

  const NameSchema = z.string().min(1).regex(validNameRegex);
  const ConnectorSchema = z.function();

  const DefineAuthorizerSchema = z
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

  const fullResult = DefineAuthorizerSchema.safeParse(props);
  if (!fullResult.success) {
    const messages = fullResult.error.issues.map((issue) => issue.message);
    throw new Error("Invalid authorizer definition: " + messages.join(", "));
  }
}

export function defineAuthorizer(props: DefineAuthorizerProps) {
  validateAuthorizerProps(props);

  const { customApp, connector } = props;

  pushToDeployList({ type: "authorizer", authorizerProps: props });

  globalThis.authorizerIndex[customApp] = connector;
}

/**
 * @deprecated
 */
export interface DefineOAuthProps {
  customApp: string;
  connector: (props: OAuthConnectorProps) => OAuthConnector;
}

/**
 * @deprecated
 *
 * @param props
 */
export function defineOAuth(props: DefineOAuthProps) {
  defineAuthorizer(props);
}
