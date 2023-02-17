import { Github } from "../../Github";

export interface DownloadRepoArchiveTarProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  ref: string;
}

const downloadRepoArchiveTar =
  (self: Github) => async (props: DownloadRepoArchiveTarProps) => {
    const { owner, repo, ref } = props;

    return await self.get({
      url: `/repos/${owner}/${repo}/tarball/${ref}`,
    });
  };

export default downloadRepoArchiveTar;
