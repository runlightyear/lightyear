import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface NotionProps extends AuthConnectorProps {}

/**
 * @beta
 */
export class Notion extends RestConnector {
  constructor(props: NotionProps) {
    super({ ...props, baseUrl: "https://api.notion.com/v1" });
  }
}
