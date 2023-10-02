export interface Tree {
  sha: string;
  url: string;
  tree: Array<TreeItem>;
  truncated: boolean;
}

export interface TreeItem {
  path: string;
  mode: string;
  type: string;
  size: number;
  sha: string;
  url: string;
}
