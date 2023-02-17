import { GraphQLConnector } from "@runlightyear/lightyear/src/connectors/GraphQLConnector";
import { AuthConnectorProps } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface LinearProps extends AuthConnectorProps {}

/**
 * @beta
 *
 * Connector to the Linear API
 *
 * @example Import
 * ```typescript
 * import { Linear } from "@runlightyear/linear"
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "linearExample",
 *   title: "Linear Example"
 *   apps: ["linear"],
 *   run: async ({ auths }) => {
 *     const linear = new Linear({ auth: auths.linear });
 *   }
 * }
 * ```
 *
 * @example Crate an issue
 * ```typescript
 * await linear.createIssue({ teamId: "<team id>", title: "New Issue" });
 * ```
 */
export class Linear extends GraphQLConnector {
  constructor(props: LinearProps) {
    super({ ...props, baseUrl: "https://api.linear.app/graphql" });
  }
}
