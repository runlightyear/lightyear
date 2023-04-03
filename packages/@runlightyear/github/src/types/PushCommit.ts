export interface PushCommit {
  /**
   * An array of files added in the commit.
   */
  added: string[];

  /**
   * Metaproperties for Git author/committer information.
   */
  author: {
    date: string;
    email: string | null;
    /**
     * The git author's name.
     */
    name: string;
    username: string;
  };

  /**
   * Metaproperties for Git author/committer information.
   */
  committer: {
    date: string;
    email: string | null;
    /**
     * The git author's name.
     */
    name: string;
    username: string;
  };

  /**
   * Whether this commit is distinct from any that have been pushed before.
   */
  distinct: boolean;

  id: string;
  /**
   * The commit message.
   */
  message: string;

  /**
   * An array of files modified by the commit.
   */
  modified: string[];

  /**
   * An array of files removed in the commit.
   */
  removed: string[];

  /**
   * The ISO 8601 timestamp of the commit.
   */
  timestamp: string;

  treeId: string;

  /**
   * URL that points to the commit API resource.
   */
  url: string;
}
