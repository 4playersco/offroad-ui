import { FC } from "react";

import Image from "./Image";
import { DEFAULT_RIG_SRC } from "@/constants";

interface RigProps {
  src: string;
  alt: string;
  fallback?: string;
  [key: string]: any; // extra props
}

const Rig: FC<RigProps> = ({ src, alt, fallback, ...props }) => {
  return <img src={src} fallback={DEFAULT_RIG_SRC} alt={alt} {...props} />;
};

export default Rig;
