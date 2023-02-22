import type { GitHubTypes } from "../GitHubTypes";
import { GitHub } from "../GitHub";

export interface CreateGistProps {
  /**
   * Description of the gist
   */
  description?: string;
  /**
   * Names and content for the files that make up the gist
   */
  files: GitHubTypes.Files;
  /**
   * Flag indicating whether the gist is public
   */
  isPublic?: boolean;
}

const createGist = (self: GitHub) => async (props: CreateGistProps) => {
  const { description, files, isPublic } = props;

  return await self.post({
    url: `/gists`,
    data: {
      description,
      files,
      public: isPublic,
    },
  });
};

export default createGist;
