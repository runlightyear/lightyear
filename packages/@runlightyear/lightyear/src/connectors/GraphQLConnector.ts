import { RestConnector, RestConnectorProps } from "./RestConnector";
import { HttpProxyResponse } from "../base/http";

/**
 * @beta
 */
export interface GraphQLConnectorProps extends RestConnectorProps {}

/**
 * @beta
 */
export interface GraphQLConnectorQueryProps {
  query: string;
  variables?: {
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

  async execute(props: GraphQLConnectorQueryProps): Promise<HttpProxyResponse> {
    const { query, variables } = props;

    console.debug("in execute", query, variables);

    return await this.post({
      url: "",
      data: {
        query,
        variables,
      },
    });
  }
}
