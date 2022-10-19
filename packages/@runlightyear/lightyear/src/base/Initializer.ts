import { getCache, saveCache } from "./cache";

export interface InitializerOptions {
  name: string;
}

export class Initializer {
  name: string;

  constructor(options: InitializerOptions) {
    const { name } = options;
    console.log("Constructing an initializer", name);
    this.name = name;
  }

  async init() {
    console.log(`Initializing ${this.name} ...`);
    const lastInitAt = String(new Date());
    console.log("initializing at", lastInitAt);
    await this.saveCache(lastInitAt);
  }

  async cleanup() {
    console.log(`Cleaning up ${this.name} ...`);
    const lastInitAt = await this.getCache();
    console.log("last init was at", lastInitAt);
  }

  async saveCache(value: string) {
    await saveCache({ key: this.name, value });
  }

  async getCache(): Promise<string> {
    return await getCache({ key: this.name });
  }
}
