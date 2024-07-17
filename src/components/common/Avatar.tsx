import { FC } from "react";

import Image from "./Image";
import { DEFAULT_AVATAR_SRC } from "@/constants";

interface AvatarProps {
  src: string;
  alt: string;
  fallback?: string;
  [x: string]: any; // additional props
}

const Avatar: FC<AvatarProps> = ({ src, alt, fallback, ...props }) => {
  return <img src={src} fallback={DEFAULT_AVATAR_SRC} alt={alt} {...props} />;
};

export default Avatar;
