import pako from "pako";
import { markRunCanceled } from "../../shared/cancellation";
import { cancelQueuedRun } from "../../shared/operationQueue";

export default async function handleRunCanceled(props: any) {
  console.debug("in handleRunCanceled");

  const { compressedPayloadB64 } = props;
  const compressedPayload = Buffer.from(compressedPayloadB64, "base64");
  const payloadStr = pako.inflate(compressedPayload, { to: "string" });
  const payload = JSON.parse(payloadStr);

  console.debug("payload", payload);

  const runId: string | undefined = payload.runId;
  if (!runId) return;

  // Mark in registry so long-running executions can detect and stop
  markRunCanceled(runId);

  // Try to cancel if it's in the local queue and not yet started
  cancelQueuedRun(runId);
}
