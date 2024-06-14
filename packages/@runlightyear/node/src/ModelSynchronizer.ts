type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ObjectId = string;

export interface ObjectMetaDataWithoutId<T> {
  userId: string;
  data: T;
}

export interface ObjectMetaDataWithId<T> extends ObjectMetaDataWithoutId<T> {
  id: ObjectId;
}

export interface ObjectMetaData<T> extends ObjectMetaDataWithId<T> {
  updatedAt: string;
  isDeleted?: boolean;
}

export class ModelSynchronizer<T> {
  list: () => Promise<Array<Prettify<ObjectMetaData<T>>>>;
  get: (id: ObjectId) => Promise<ObjectMetaData<T>>;
  create: (object: ObjectMetaDataWithoutId<T>) => Promise<ObjectId>;
  update: (object: ObjectMetaDataWithId<T>) => Promise<void>;
  delete: (id: ObjectId) => Promise<void>;

  constructor(props: {
    list: () => Promise<Array<Prettify<ObjectMetaData<T>>>>;
    get: (id: ObjectId) => Promise<Prettify<ObjectMetaData<T>>>;
    create: (object: Prettify<ObjectMetaDataWithoutId<T>>) => Promise<ObjectId>;
    update: (object: Prettify<ObjectMetaDataWithId<T>>) => Promise<void>;
    delete: (id: ObjectId) => Promise<void>;
  }) {
    this.list = props.list;
    this.get = props.get;
    this.create = props.create;
    this.update = props.update;
    this.delete = props.delete;
  }
}
