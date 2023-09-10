import { NotionDate } from "../types/NotionDate";

export interface InternalFile {
  type: "file";
  file: {
    url: string;
    expiryTime: NotionDate;
  };
}
export interface NamedInternalFile extends InternalFile {
  name: string;
}
