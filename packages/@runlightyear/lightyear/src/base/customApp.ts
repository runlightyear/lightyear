import { z } from "zod";
import { validNameRegex } from "../util/isValidName";
import { pushToDeployList } from "./deploy";
import {
  OAuthConnector,
  OAuthConnectorProps,
} from "../connectors/OAuthConnector";

/**
 * @beta
 */
export interface DefineCustomAppBasicProps {
  name: string;
  title: string;
  authType: "BASIC";
}

export interface DefineCustomAppApiKeyProps {
  name: string;
  title: string;
  authType: "APIKEY";
}

export interface DefineCustomAppOAuthProps {
  name: string;
  title: string;
  authType: "OAUTH2";
  oauthConnector: (props: OAuthConnectorProps) => OAuthConnector;
}

export type DefineCustomAppProps =
  | DefineCustomAppBasicProps
  | DefineCustomAppApiKeyProps
  | DefineCustomAppOAuthProps;

export function validateCustomAppProps(props: DefineCustomAppProps) {
  const { name, title, authType } = props;

  const NameSchema = z.string().min(1).regex(validNameRegex);
  const TitleSchema = z.string().min(1);
  const OAuthConnectorSchema = z.function();

  const DefineCustomAppSchema = z.discriminatedUnion("authType", [
    z
      .object({
        authType: z.literal("BASIC"),
        name: NameSchema,
        title: TitleSchema,
      })
      .strict(),
    z
      .object({
        authType: z.literal("APIKEY"),
        name: NameSchema,
        title: TitleSchema,
      })
      .strict(),
    z
      .object({
        authType: z.literal("OAUTH2"),
        name: NameSchema,
        title: TitleSchema,
        oauthConnector: OAuthConnectorSchema,
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
}

/**
 * @beta
 *
 * Define a Custom App
 *
 */
export function defineCustomApp(props: DefineCustomAppProps) {
  console.debug("in defineCustomApp", props);

  validateCustomAppProps(props);

  pushToDeployList({ type: "customApp", customAppProps: props });

  return props.name;
}
