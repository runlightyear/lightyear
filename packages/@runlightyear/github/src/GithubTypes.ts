/* eslint-disable */
/* this integration will be reworked soon */

export namespace GithubTypes {
  export type Content = {
    content: string;
  };

  export type Files = {
    [key: string]: Content;
  };
}
