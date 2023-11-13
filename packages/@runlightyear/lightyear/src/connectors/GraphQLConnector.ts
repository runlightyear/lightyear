import { RestConnector, RestConnectorProps } from "./RestConnector";
import { HttpProxyResponse } from "../base/http";

export interface GraphQLConnectorProps extends RestConnectorProps {}

export interface GraphQLConnectorQueryProps {
  query: string;
  variables?: {
    [name: string]: unknown;
  };
}

/**
 * GraphQL Connector
 *
 * The base for making calls to GraphQL APIs
 */
export abstract class GraphQLConnector extends RestConnector {
  protected constructor(props: GraphQLConnectorProps) {
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
