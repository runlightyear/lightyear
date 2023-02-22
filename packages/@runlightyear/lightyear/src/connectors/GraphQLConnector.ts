import { RestConnector, RestConnectorProps } from "./RestConnector";

/**
 * @beta
 */
export interface GraphQLConnectorProps extends RestConnectorProps {}

/**
 * @beta
 */
export interface GraphQLConnectorQueryProps {
  query: string;
  variables: {
    [name: string]: unknown;
  };
}

/**
 * @beta
 *
 * GraphQL Connector
 *
 * The base for making calls to GraphQL APIs
 */
export class GraphQLConnector extends RestConnector {
  constructor(props: GraphQLConnectorProps) {
    super(props);
  }

  async execute(props: GraphQLConnectorQueryProps) {
    const { query, variables } = props;

    return await this.post({
      url: this.baseUrl,
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  }
}
