import { Actions } from "./actions";
import { Context } from "./context";
import { Section } from "./section";
import { Divider } from "./divider";
import { File } from "./file";
import { Header } from "./header";
import { Image } from "./image";
import { Video } from "./video";

export type Block =
  | Actions
  | Context
  | Divider
  | File
  | Header
  | Image
  | Section
  | Video;
