import fetch from "node-fetch";

export default async function getUnsubscribeList() {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/subscriptions/unsubscribe-list`,
    {
      method: "GET",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("Unsubscribe list returned");
    const list = await response.json();
    console.log(list);
    return list;
  } else {
    console.log("Error retrieving destroy list");
    return null;
  }
}
