import pako from "pako";
import { pushOperation } from "../../shared/operationQueue";
import { clearRunCanceled } from "../../shared/cancellation";

export default async function handleRunLocal(props: any) {
  console.debug("in handleRunLocal");

  const { compressedPayloadB64 } = props;
  const compressedPayload = Buffer.from(compressedPayloadB64, "base64");
  const payloadStr = pako.inflate(compressedPayload, { to: "string" });
  const payload = JSON.parse(payloadStr);

  console.debug("payload", payload);

  // If previously canceled, clear the flag when a fresh run comes in
  if (payload.runId) {
    clearRunCanceled(payload.runId);
  }

  pushOperation({
    operation: "run",
    params: {
      actionName: payload.actionName,
      runId: payload.runId,
      data: payload.data,
      deliveryId: payload.deliveryId,
    },
  });
}
