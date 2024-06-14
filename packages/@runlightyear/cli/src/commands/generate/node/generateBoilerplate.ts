import fs from "fs";
import * as path from "path";
import crypto from "crypto";

export async function generateBoilerplate() {
  console.debug("Generating boilerplate");

  fs.appendFileSync(
    path.join("node_modules", ".lightyear", "package.json"),
    `
{
  "name": "lightyear-client-${crypto.randomUUID()}",
  "main": "index.js",
  "types": "index.d.ts",
  "version": "1.0.0"
}
    `
  );

  //   fs.appendFileSync(
  //     path.join("node_modules", ".lightyear", "index.js"),
  //     `
  // export const hithere = "hithere";
  // `
  //   );
}
