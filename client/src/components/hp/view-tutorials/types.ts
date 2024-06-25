import {VideoStructureType} from "../../../redux/types"
import { Image } from "../../../redux/types";
export interface VideoType {
  title: string;
  description: string;
  thumbnail: Image;
  video: VideoStructureType;
  HPId: string;
  _id: string;
  target: string;
  duration: string;
}
