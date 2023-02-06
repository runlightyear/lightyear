import { RestConnector, RestConnectorOptions } from "./RestConnector";

export interface GraphQLConnectorProps extends RestConnectorOptions {}

export interface GraphQLConnectorQueryProps {
  query: string;
  variables: {
    [name: string]: unknown;
  };
}

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
