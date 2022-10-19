import type { GithubTypes } from "../GithubTypes";
import { Github } from "../Github";

export interface CreateGistOptions {
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

const createGist = (self: Github) => async (options: CreateGistOptions) => {
  const { description, files, isPublic } = options;

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
