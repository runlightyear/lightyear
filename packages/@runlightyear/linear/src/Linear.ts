import { GraphQLConnector } from "@runlightyear/lightyear/src/connectors/GraphQLConnector";
import { AuthConnectorOptions } from "@runlightyear/lightyear";

export interface LinearProps extends AuthConnectorOptions {}

export class Linear extends GraphQLConnector {
  constructor(props: LinearProps) {
    super({ ...props, baseUrl: "https://api.linear.app/graphql" });
  }
}
