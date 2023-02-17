import type { GithubTypes } from "../GithubTypes";
import { Github } from "../Github";

export interface CreateGistProps {
  /**
   * Description of the gist
   */
  description?: string;
  /**
   * Names and content for the files that make up the gist
   */
  files: GithubTypes.Files;
  /**
   * Flag indicating whether the gist is public
   */
  isPublic?: boolean;
}

const createGist = (self: Github) => async (props: CreateGistProps) => {
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
