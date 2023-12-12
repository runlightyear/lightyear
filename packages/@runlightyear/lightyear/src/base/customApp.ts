import { z } from "zod";
import { validNameRegex } from "../util/isValidName";
import { pushToDeployList } from "./deploy";

/**
 * @beta
 */
export interface DefineCustomAppProps {
  name: string;
  title: string;
  authType: "APIKEY" | "BASIC";
}

export function validateCustomAppProps(props: DefineCustomAppProps) {
  const { name, title, authType } = props;

  const NameSchema = z.string().min(1).regex(validNameRegex);
  const TitleSchema = z.string().min(1);
  const AuthTypeSchema = z.union([z.literal("APIKEY"), z.literal("BASIC")]);

  const DefineCustomAppSchema = z
    .object({
      name: NameSchema,
      title: TitleSchema,
      authType: AuthTypeSchema,
    })
    .strict();

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
