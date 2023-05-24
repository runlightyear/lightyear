import { Commit } from "../types/Commit";
import { PushCommit } from "../types/PushCommit";

export interface MatchAllCommitsProps {
  regex: RegExp;
  commits: Array<Commit> | Array<PushCommit>;
}

export function matchAllCommits(props: MatchAllCommitsProps): Array<string> {
  const { regex, commits } = props;

  const matches = commits
    .map((commit) => {
      if ("commit" in commit) {
        return [...commit.commit.message.matchAll(regex)];
      } else {
        return [...commit.message.matchAll(regex)];
      }
    })
    .flat(2);
  return [...new Set(matches)];
}
