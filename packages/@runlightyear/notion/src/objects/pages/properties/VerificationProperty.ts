import { User } from "../../users/User";
import { NotionDate } from "../../types/NotionDate";

export interface VerificationProperty {
  id: string;
  type: "verification";
  verification: Verified | Unverified;
}

export interface Verified {
  state: "verified";
  verifiedBy: User;
  date: {
    start: NotionDate;
    end: NotionDate | null;
  };
}

export interface Unverified {
  state: "unverified";
  verifiedBy: null;
  date: null;
}

/** Can't be updated **/
