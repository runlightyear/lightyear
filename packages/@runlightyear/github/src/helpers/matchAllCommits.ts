import { Commit } from "../types/Commit";

export interface MatchAllCommitsProps {
  regex: RegExp;
  commits: Array<Commit>;
}

export function matchAllCommits(props: MatchAllCommitsProps): Array<string> {
  const { regex, commits } = props;

  const matches = commits
    .map((commit) => [...commit.commit.message.matchAll(regex)])
    .flat(2);
  return [...new Set(matches)];
}
