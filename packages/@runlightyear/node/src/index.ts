export { type LightyearProps, Lightyear } from "./Lightyear";

export type {
  ObjectId,
  ObjectMetaDataWithoutId,
  ObjectMetaDataWithId,
  ObjectMetaData,
} from "./ModelSynchronizer";
export { ModelSynchronizer } from "./ModelSynchronizer";

try {
  const test = require(".lightyear");
  console.log("test", test);
} catch (error) {
  console.log(error);
}
