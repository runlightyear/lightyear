import { z } from "zod";
import {
  validNameRegex,
  validVariableAndSecretNameRegex,
} from "../util/isValidName";
import { pushToDeployList } from "./deploy";
import {
  OAuthConnector,
  OAuthConnectorProps,
} from "../connectors/OAuthConnector";
import { BaseConnector } from "../connectors/BaseConnector";
import { VariableDef } from "./variable";
import {
  AppWebhookConnector,
  AppWebhookConnectorProps,
} from "../connectors/AppWebhookConnector";

/**
 * @beta
 */

export type AppWebhookFunc = (
  props: AppWebhookConnectorProps
) => AppWebhookConnector;

export type CustomAppWebhookIndex = {
  [customAppName: string]: AppWebhookFunc;
};

export interface DefineCustomAppBasicProps {
  authType: "BASIC";
  name: string;
  title: string;
  connector?: typeof BaseConnector;
  variables?: Array<VariableDef>;
  secrets?: Array<VariableDef>;
}

export interface DefineCustomAppApiKeyProps {
  authType: "APIKEY";
  name: string;
  title: string;
  connector?: typeof BaseConnector;
  variables?: Array<VariableDef>;
  secrets?: Array<VariableDef>;
}

export interface DefineCustomAppOAuthProps {
  authType: "OAUTH2";
  name: string;
  title: string;
  connector: typeof BaseConnector;
  oauth?: (props: OAuthConnectorProps) => OAuthConnector;
  appWebhook?: AppWebhookFunc;
  variables?: Array<VariableDef>;
  secrets?: Array<VariableDef>;
}

export type DefineCustomAppProps =
  | DefineCustomAppBasicProps
  | DefineCustomAppApiKeyProps
  | DefineCustomAppOAuthProps;

export interface DeployCustomAppBasicProps {
  authType: "BASIC";
  name: string;
  title: string;
  variables?: Array<VariableDef>;
  secrets?: Array<VariableDef>;
}
export interface DeployCustomAppApiKeyProps {
  authType: "APIKEY";
  name: string;
  title: string;
  connector?: typeof BaseConnector;
  variables?: Array<VariableDef>;
  secrets?: Array<VariableDef>;
}
export interface DeployCustomAppOAuthProps {
  authType: "OAUTH2";
  name: string;
  title: string;
  hasAppWebhook?: boolean;
  variables?: Array<VariableDef>;
  secrets?: Array<VariableDef>;
}

export type DeployCustomAppProps =
  | DeployCustomAppBasicProps
  | DeployCustomAppApiKeyProps
  | DeployCustomAppOAuthProps;

export function validateCustomAppProps(props: DefineCustomAppProps) {
  const { name, title, authType } = props;

  const NameSchema = z.string().min(1).regex(validNameRegex);
  const TitleSchema = z.string().min(1);
  const ConnectorSchema = z.custom<typeof BaseConnector>(
    (value) => {
      if (typeof value === "function") {
        return value.prototype instanceof BaseConnector;
      }
      return false;
    },
    {
      message: "Connector class must be a subclass of BaseConnector",
    }
  );
  const OAuthSchema = z.custom<(props: OAuthConnectorProps) => OAuthConnector>(
    (value) => {
      return typeof value === "function";
    }
  );
  const AppWebhookSchema = z.custom<AppWebhookFunc>((value) => {
    return typeof value === "function";
  });
  const VariableAndSecretNameSchema = z.union([
    z.string().min(1).regex(validVariableAndSecretNameRegex),
    z.object({
      name: z.string().min(1).regex(validVariableAndSecretNameRegex),
      description: z.string().optional(),
    }),
  ]);
  const VariablesSchema = z.array(VariableAndSecretNameSchema);
  const SecretsSchema = z.array(VariableAndSecretNameSchema);

  const DefineCustomAppSchema = z.discriminatedUnion("authType", [
    z
      .object({
        authType: z.literal("BASIC"),
        name: NameSchema,
        title: TitleSchema,
        connector: ConnectorSchema.optional(),
        variables: VariablesSchema.optional(),
        secrets: SecretsSchema.optional(),
      })
      .strict(),
    z
      .object({
        authType: z.literal("APIKEY"),
        name: NameSchema,
        title: TitleSchema,
        connector: ConnectorSchema.optional(),
        variables: VariablesSchema.optional(),
        secrets: SecretsSchema.optional(),
      })
      .strict(),
    z
      .object({
        authType: z.literal("OAUTH2"),
        name: NameSchema,
        title: TitleSchema,
        connector: ConnectorSchema,
        oauth: OAuthSchema.optional(),
        appWebhook: AppWebhookSchema.optional(),
        variables: VariablesSchema.optional(),
        secrets: SecretsSchema.optional(),
      })
      .strict(),
  ]);

  if (name === undefined) {
    throw new Error("Custom app missing required name");
  }

  if (!NameSchema.safeParse(name).success) {
    throw new Error(`Invalid custom app name: ${name}`);
  }

  if (title === undefined) {
    throw new Error("Custom app missing required title");
  }

  if (!TitleSchema.safeParse(title).success) {
    throw new Error(`Invalid custom app title: ${title}`);
  }

  const fullResult = DefineCustomAppSchema.safeParse(props);
  if (!fullResult.success) {
    const messages = fullResult.error.issues.map((issue) => issue.message);
    throw new Error(
      `Invalid custom app definition for ${name}: ${messages.join(", ")}`
    );
  }

  if (fullResult.data.authType === "OAUTH2") {
    if (fullResult.data.connector.OAuth === null) {
      throw new Error(
        `Invalid custom app definition for ${name}: connector must have an OAuth class set`
      );
    }
  }

  return fullResult.data;
}

/**
 * @beta
 *
 * Define a Custom App
 *
 */
export function defineCustomApp(props: DefineCustomAppProps) {
  console.debug("in defineCustomApp", props);

  const validatedProps = validateCustomAppProps(props);

  const connectorAppWebhook = validatedProps.connector?.AppWebhook;
  const connectorVariables = validatedProps.connector?.variables ?? [];
  const connectorSecrets = validatedProps.connector?.secrets ?? [];

  const deployProps = {
    ...validatedProps,
    ...(connectorAppWebhook ? { hasAppWebhook: true } : {}),
    variables: validatedProps.variables ?? connectorVariables,
    secrets: validatedProps.secrets ?? connectorSecrets,
  };

  delete deployProps.connector;
  if ("oauth" in deployProps) {
    delete deployProps.oauth;
  }

  pushToDeployList({
    type: "customApp",
    customAppProps: deployProps,
  });

  if (validatedProps.authType === "OAUTH2") {
    const { connector, oauth, appWebhook } = validatedProps;

    if (oauth) {
      globalThis.authorizerIndex[props.name] = oauth;
    } else {
      globalThis.authorizerIndex[props.name] = (props) => {
        // @ts-ignore - We are assuming the user passed in a concrete class. Is there a way to verify this?
        return new connector.OAuth(props);
      };
    }

    if (appWebhook) {
      globalThis.customAppWebhookIndex[props.name] = appWebhook;
    } else {
      globalThis.customAppWebhookIndex[props.name] = (props) => {
        // @ts-ignore - We are assuming the user passed in a concrete class.
        return new connector.AppWebhook(props);
      };
    }
  }

  return props.name;
}
