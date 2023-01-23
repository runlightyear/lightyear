import pako from "pako";
import execResubscribe from "../../shared/execResubscribe";

export default async function handleResubscribe(props: any) {
  console.debug("in handleResubscribe");

  const { compressedPayloadB64 } = props;
  const compressedPayload = Buffer.from(compressedPayloadB64, "base64");
  const payloadStr = pako.inflate(compressedPayload, { to: "string" });
  const payload = JSON.parse(payloadStr);

  console.debug("payload", payload);

  await execResubscribe({
    webhookName: payload.webhookName,
    manual: payload.manual,
  });
}
