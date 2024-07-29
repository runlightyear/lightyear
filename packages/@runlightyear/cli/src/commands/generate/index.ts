import { Command, program } from "commander";
import { removeDirectory } from "./node/removeDirectory";
import { initializeDirectory } from "./node/initializeDirectory";
import { getCollectionList } from "./getCollectionList";
import { getModelList } from "./getModelList";
import { getModel } from "./getModel";
import { generateTypescript } from "./node/generateTypescript";
import { generateBoilerplate } from "./node/generateBoilerplate";
import { compileTypescript } from "./node/compileTypescript";

export const generate = new Command("generate");

generate
  .description("Generate language-specific bindings")
  .argument(
    "<language>",
    "Language to generate bindings for (node | python | go)"
  )
  .action(async (language) => {
    console.log("Generating bindings for", language);

    const collections: Array<{
      name: string;
      models: Array<{
        name: string;
        schema: unknown;
      }>;
    }> = [];

    const collectionList = await getCollectionList();

    for (const collection of collectionList) {
      collections.push({ name: collection.name, models: [] });

      const modelList = await getModelList(collection.name);

      for (const model of modelList) {
        const modelDetail = await getModel(collection.name, model.name);

        collections[collections.length - 1].models.push({
          name: modelDetail.name,
          schema: modelDetail.schema,
        });
      }
    }

    if (language === "node") {
      await removeDirectory();
      await initializeDirectory();
      await generateBoilerplate();
      await generateTypescript({ collections });
      await compileTypescript();
    } else {
      program.error(`Unsupported language: ${language}`);
    }
  });
