/* this integration will be reworked soon */

export namespace GitHubTypes {
  export type Content = {
    content: string;
  };

  export type Files = {
    [key: string]: Content;
  };
}
