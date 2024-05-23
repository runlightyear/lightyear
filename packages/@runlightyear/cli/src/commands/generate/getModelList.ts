import { program } from "commander";

export async function getModelList(collectionName: string) {
  console.debug("Getting models");

  const response = await fetch(
    `http://localhost:3000/api/v1/envs/dev/collections/${collectionName}/models`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `apiKey ${process.env.LIGHTYEAR_API_KEY}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(`Models`, data);
    return data;
  } else {
    program.error("Error getting models");
  }
}
