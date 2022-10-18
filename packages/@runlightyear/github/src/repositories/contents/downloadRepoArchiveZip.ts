import { Github } from "../../Github";

export interface DownloadRepoArchiveZipOptions {
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

const downloadRepoArchiveZip =
  (self: Github) => async (options: DownloadRepoArchiveZipOptions) => {
    const { owner, repo, ref } = options;

    return await self.get({
      url: `/repos/${owner}/${repo}/zipball/${ref}`,
    });
  };

export default downloadRepoArchiveZip;
