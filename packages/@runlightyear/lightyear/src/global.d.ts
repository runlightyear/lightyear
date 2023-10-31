import { DeployItem } from "./base/deploy";

export declare global {
  declare module globalThis {
    var deployList: DeployItem[];
  }
}
