import { compile } from "json-schema-to-typescript";
import fs from "fs";
import * as path from "path";
import { camelCase, capitalize } from "lodash";

export interface GenerateTypescriptDeclarationsProps {
  collections: Array<{
    name: string;
    models: Array<{
      name: string;
      schema: unknown;
    }>;
  }>;
}

export async function generateTypescript(
  props: GenerateTypescriptDeclarationsProps
) {
  const { collections } = props;

  for (const collection of collections) {
    for (const model of collection.models) {
      const typeName = `${capitalize(camelCase(collection.name))}${capitalize(
        camelCase(model.name)
      )}`;

      const declaration = await compile(model.schema as any, typeName, {
        bannerComment: "",
      });

      console.log("declaration", declaration);

      fs.appendFileSync(
        path.join("node_modules", ".lightyear", "index.ts"),
        `${declaration}\n`
      );
    }
  }
}
