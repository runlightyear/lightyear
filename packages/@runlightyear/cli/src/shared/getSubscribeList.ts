import fetch from "node-fetch";

export default async function getSubscribeList() {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/subscriptions/subscribe-list`,
    {
      method: "GET",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("Subscribe list returned");
    const list = await response.json();
    console.log(list);
    return list;
  } else {
    console.log("Error retrieving subscribe list");
    return null;
  }
}
