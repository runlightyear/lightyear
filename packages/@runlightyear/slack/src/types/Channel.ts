export type Channel = {
  id: string;
  name: string;
  isChannel: boolean;
  isGroup: boolean;
  isIm: boolean;
  created: number;
  creator: string;
  isArchived: boolean;
  isGeneral: boolean;
  unlinked: number;
  nameNormalized: string;
  isShared: boolean;
  isExtShared: boolean;
  isOrgShared: boolean;
  pendingShared: Array<unknown>;
  isPendingExtShared: boolean;
  isMember: boolean;
  isPrivate: boolean;
  isMpim: boolean;
  topic: {
    value: string;
    creator: string;
    lastSet: number;
  };
  purpose: {
    value: string;
    creator: string;
    lastSet: number;
  };
  previousNames: Array<string>;
};
