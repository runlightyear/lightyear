export interface ExternalFile {
  type: "external";
  external: {
    url: string;
  };
}

export interface NamedExternalFile extends ExternalFile {
  name: string;
}
