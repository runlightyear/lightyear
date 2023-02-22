export interface FileProps {
  /**
   * The external unique ID for this file.
   */
  externalId: string;
  /**
   * At the moment, source will always be remote for a remote file.
   */
  source: "remote";
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface File extends FileProps {
  type: "file";
}

export default function file(props: FileProps) {
  const { externalId, source, blockId } = props;

  return {
    type: "file",
    externalId,
    source,
    blockId,
  };
}
