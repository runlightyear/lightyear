import { SelectMenuConversationsElement } from "./SelectMenuConversationsElement";
import { SelectMenuExternalDataSourceElement } from "./SelectMenuExternalDataSourceElement";
import { SelectMenuPublicChannelsElement } from "./SelectMenuPublicChannels";
import { SelectMenuStaticOptionsElement } from "./SelectMenuStaticOptionsElement";
import { SelectMenuUserElement } from "./SelectMenuUserElement";

export type SelectMenuElement =
  | SelectMenuConversationsElement
  | SelectMenuExternalDataSourceElement
  | SelectMenuPublicChannelsElement
  | SelectMenuStaticOptionsElement
  | SelectMenuUserElement;
