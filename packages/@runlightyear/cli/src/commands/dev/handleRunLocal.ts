import runAction from "../../shared/runAction";
import pako from "pako";

export default async function handleRunLocal(props: any) {
  console.debug("in handleRunLocal");

  const { compressedPayloadB64 } = props;
  const compressedPayload = Buffer.from(compressedPayloadB64, "base64");
  const payloadStr = pako.inflate(compressedPayload, { to: "string" });
  const payload = JSON.parse(payloadStr);

  console.debug("payload", payload);

  await runAction({
    actionName: payload.actionName,
    runId: payload.runId,
    data: payload.data,
    deliveryId: payload.deliveryId,
  });
}
