import { createServer, RequestListener, Server } from "http";
import { program } from "commander";
import { AddressInfo } from "net";

export default async function startServer(
  callback: RequestListener
): Promise<{ port: number; server: Server }> {
  const server = createServer(callback);

  server.listen(0);

  const address = server.address() as AddressInfo;

  if (!address) {
    program.error("Error starting local server");
  }

  return { port: address.port, server };
}
