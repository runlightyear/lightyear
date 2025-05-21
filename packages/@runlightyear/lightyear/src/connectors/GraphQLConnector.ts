import { RestConnector, RestConnectorProps } from "./RestConnector";
import { HttpProxyResponse } from "../base/http";

export interface GraphQLConnectorProps extends RestConnectorProps {}

export interface GraphQLConnectorQueryVariables {
  [name: string]: unknown;
}

export interface GraphQLConnectorQueryProps {
  query: string;
  variables?: GraphQLConnectorQueryVariables;
}

/**
 * The base for making calls to GraphQL APIs
 */
export abstract class GraphQLConnector extends RestConnector {
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
