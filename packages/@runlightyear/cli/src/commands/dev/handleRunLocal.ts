import runTask from "../../shared/runTask";
import pako from "pako";

export default async function handleRunLocal(props: any) {
  console.log("in handleRunLocal");
  console.log("props", props);
  // const sc = saveConsole();

  const { compressedPayloadB64 } = props;
  const compressedPayload = Buffer.from(compressedPayloadB64, "base64");
  const payloadStr = pako.inflate(compressedPayload, { to: "string" });
  const payload = JSON.parse(payloadStr);

  console.log("payload", payload);

  await runTask({
    taskName: payload.taskName,
    data: payload.data,
    deliveryId: payload.deliveryId,
  });

  // restoreConsole(sc);
}
