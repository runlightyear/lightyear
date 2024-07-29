import { program } from "commander";

export async function getModel(collectionName: string, modelName: string) {
  console.debug("Getting model");

  const response = await fetch(
    `http://localhost:3000/api/v1/envs/dev/collections/${collectionName}/models/${modelName}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `apiKey ${process.env.LIGHTYEAR_API_KEY}`,
      },
    }
  );

  console.log("response", response.status, response.statusText);
  if (response.ok) {
    const data = await response.json();
    console.log(`Model`, data);
    return data;
  } else {
    program.error("Error getting model");
  }
}
