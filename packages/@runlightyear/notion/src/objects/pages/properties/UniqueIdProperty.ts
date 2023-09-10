export interface UniqueIdProperty {
  id: string;
  type: "unique_id";
  uniqueId: {
    number: number;
    prefix: string | null;
  };
}

/** Can't be updated **/
