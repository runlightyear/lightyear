import { program } from "commander";

export async function getCollectionList() {
  console.debug("Getting collections");

  const response = await fetch(
    "http://localhost:3000/api/v1/envs/dev/collections",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `apiKey ${process.env.LIGHTYEAR_API_KEY}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(`Collections`, data);
    return data;
  } else {
    program.error("Error getting collections");
  }
}
