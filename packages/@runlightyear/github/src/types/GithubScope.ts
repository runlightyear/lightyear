export type GithubScope =
  /**
   * Grants full access to public and private repositories including read and write access to code, commit statuses, repository invitations, collaborators, deployment statuses, and repository webhooks. Note: In addition to repository related resources, the repo scope also grants access to manage organization-owned resources including projects, invitations, team memberships and webhooks. This scope also grants the ability to manage projects owned by users.
   */
  | "repo"
  /**
   * Grants read/write access to commit statuses in public and private repositories. This scope is only necessary to grant other users or services access to private repository commit statuses without granting access to the code.
   */
  | "repo:status"
  /**
   * Grants access to deployment statuses for public and private repositories. This scope is only necessary to grant other users or services access to deployment statuses, without granting access to the code.
   */
  | "repo_deployment"
  /**
   * Limits access to public repositories. That includes read/write access to code, commit statuses, repository projects, collaborators, and deployment statuses for public repositories and organizations. Also required for starring public repositories.
   */
  | "public_repo"
  /**
   * Grants accept/decline abilities for invitations to collaborate on a repository. This scope is only necessary to grant other users or services access to invites without granting access to the code.
   */
  | "repo:invite"
  /*  Grants:
   *   read and write access to security events in the code scanning API
   * This scope is only necessary to grant other users or services access to security events without granting access to the code.
   */
  | "security_events"
  /**
   * 	Grants read, write, ping, and delete access to repository hooks in public or private repositories. The repo and public_repo scopes grant full access to repositories, including repository hooks. Use the admin:repo_hook scope to limit access to only repository hooks.
   */
  | "admin:repo_hook"
  /**
   * Grants read, write, and ping access to hooks in public or private repositories.
   */
  | "write:repo_hook"
  /**
   * Grants read and ping access to hooks in public or private repositories.
   */
  | "read:repo_hook"
  /**
   * Fully manage the organization and its teams, projects, and memberships.
   */
  | "admin:org"
  /**
   * Read and write access to organization membership, organization projects, and team membership.
   */
  | "write:org"
  /**
   * Read-only access to organization membership, organization projects, and team membership.
   */
  | "read:org"
  /**
   * Fully manage public keys.
   */
  | "admin:public_key"
  /**
   * Create, list, and view details for public keys.
   */
  | "write:public_key"
  /**
   * List and view details for public keys.
   */
  | "read:public_key"
  /**
   * Grants read, write, ping, and delete access to organization hooks. Note: OAuth tokens will only be able to perform these actions on organization hooks which were created by the OAuth App. Personal access tokens will only be able to perform these actions on organization hooks created by a user.
   */
  | "admin:org_hook"
  /**
   * Grants write access to gists.
   */
  | "gist"
  /**
   *  Grants:
   *   read access to a user's notifications
   * mark as read access to threads
   * watch and unwatch access to a repository, and
   * read, write, and delete access to thread subscriptions.
   */
  | "notifications"
  /**
   * Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.
   */
  | "user"
  /**
   * Grants access to read a user's profile data.
   */
  | "read:user"
  /**
   * Grants read access to a user's email addresses.
   */
  | "user:email"
  /**
   * Grants access to follow or unfollow other users.
   */
  | "user:follow"
  /**
   * Grants read/write access to user and organization projects.
   */
  | "project"
  /**
   * Grants read only access to user and organization projects.
   */
  | "read:project"
  /**
   * Grants access to delete adminable repositories.
   */
  | "delete_repo"
  /**
   * Allows read and write access for team discussions.
   */
  | "write:discussion"
  /**
   * Allows read access for team discussions.
   */
  | "read:discussion"
  /**
   * Grants access to download or install packages from GitHub Packages. For more information, see "Installing a package".
   */
  | "read:packages"
  /**
   * Grants access to delete packages from GitHub Packages. For more information, see "Deleting and restoring a package."
   */
  | "delete:packages"
  /**
   * Fully manage GPG keys.
   */
  | "admin:gpg_key"
  /**
   * Create, list, and view details for GPG keys.
   */
  | "write:gpg_key"
  /**
   * 	List and view details for GPG keys.
   */
  | "read:gpg_key"
  /**
   * 	Grants the ability to create and manage codespaces. Codespaces can expose a GITHUB_TOKEN which may have a different set of scopes. For more information, see "Security in GitHub Codespaces."
   */
  | "codespace"
  /**
   * Grants the ability to add and update GitHub Actions workflow files. Workflow files can be committed without this scope if the same file (with both the same path and contents) exists on another branch in the same repository. Workflow files can expose GITHUB_TOKEN which may have a different set of scopes. For more information, see "Authentication in a workflow."
   */
  | "workflow";
