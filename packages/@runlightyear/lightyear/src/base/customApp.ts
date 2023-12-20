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
import { authorizerIndex } from "./authorizer";
import { BaseConnector } from "../connectors/BaseConnector";
import { VariableDef } from "./variable";

/**
 * @beta
 */

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
  variables?: Array<VariableDef>;
  secrets?: Array<VariableDef>;
}

export type DefineCustomAppProps =
  | DefineCustomAppBasicProps
  | DefineCustomAppApiKeyProps
  | DefineCustomAppOAuthProps;

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

  const connectorVariables = validatedProps.connector?.variables ?? [];
  const connectorSecrets = validatedProps.connector?.secrets ?? [];

  const validatedPropsWithDefaults = {
    ...validatedProps,
    variables: validatedProps.variables ?? connectorVariables,
    secrets: validatedProps.secrets ?? connectorSecrets,
  };

  pushToDeployList({
    type: "customApp",
    customAppProps: validatedPropsWithDefaults,
  });

  if (validatedProps.authType === "OAUTH2") {
    const { connector, oauth } = validatedProps;
    if (oauth) {
      authorizerIndex[props.name] = oauth;
    } else {
      // @ts-ignore - We are assuming the user passed in a concrete class. Is there a way to verify this?
      authorizerIndex[props.name] = (props) => new connector.OAuth(props);
    }
  }

  return props.name;
}
