import tar, { FileStat } from "tar";
import { TEMP_TGZ_FILE } from "./constants";
import { program } from "commander";

export default async function tarSourceCode(fileList: string[]) {
  console.log("Preparing source code");

  try {
    await tar.create(
      {
        gzip: true,
        file: TEMP_TGZ_FILE,
        prefix: "project",
        filter(path: string, stat: FileStat): boolean {
          console.log("Adding", path);
          return true;
        },
      },
      fileList
    );
  } catch (error) {
    console.log(error);
    program.error("Error creating tgz");
  }
}
