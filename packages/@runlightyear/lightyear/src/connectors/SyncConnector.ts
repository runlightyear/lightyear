export interface SyncConnectorProps {}

export abstract class SyncConnector {
  constructor(props: SyncConnectorProps) {}

  abstract fullSync(): Promise<void>;
  abstract incrementalSync({ since }: { since: string }): Promise<void>;
  abstract hardDeleteSync(): Promise<void>;
}
