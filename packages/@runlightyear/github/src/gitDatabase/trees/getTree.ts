import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Tree } from "../../types/Tree";
import { GitHub } from "../../GitHub";

export interface GetTreeProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository without the .git extension. The name is not case sensitive.
   */
  repo: string;
  /**
   * The SHA1 value or ref (branch or tag) name of the tree.
   */
  treeSha: string;
  /**
   * Setting this parameter to any value returns the objects or subtrees referenced by the tree specified in :tree_sha. For example, setting recursive to any of the following will enable returning objects or subtrees: 0, 1, "true", and "false". Omit this parameter to prevent recursively returning objects or subtrees.
   */
  recursive?: string | boolean | number;
}

export interface GetTreeResponse extends HttpProxyResponse {
  data: Tree;
}

export const getTree =
  (self: GitHub) =>
  async (props: GetTreeProps): Promise<GetTreeResponse> => {
    const { owner, repo, treeSha, recursive } = props;

    return await self.get({
      url: `/repos/${owner}/${repo}/git/trees/${treeSha}`,
      params: { recursive },
    });
  };
