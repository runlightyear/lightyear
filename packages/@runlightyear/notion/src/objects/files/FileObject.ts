import { InternalFile, NamedInternalFile } from "./InternalFile";
import { ExternalFile, NamedExternalFile } from "./ExternalFile";

export type FileObject = InternalFile | ExternalFile;

export type NamedFile = NamedInternalFile | NamedExternalFile;
