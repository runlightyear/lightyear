import { FileObject, NamedFile } from "../../files/FileObject";

export interface FilesProperty {
  id: string;
  type: "file";
  files: Array<NamedFile>;
}

export interface FilesPropertyInput {
  files: Array<FileObject>;
}
