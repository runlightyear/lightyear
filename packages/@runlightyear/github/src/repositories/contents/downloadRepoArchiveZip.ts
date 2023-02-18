import { GitHub } from "../../GitHub";

export interface DownloadRepoArchiveZipProps {
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
  (self: GitHub) => async (props: DownloadRepoArchiveZipProps) => {
    const { owner, repo, ref } = props;

    return await self.get({
      url: `/repos/${owner}/${repo}/zipball/${ref}`,
    });
  };

export default downloadRepoArchiveZip;
