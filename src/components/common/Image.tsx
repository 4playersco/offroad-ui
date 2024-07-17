import { useState, useCallback, FC } from "react";
import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  fallback: string;
}

const Image: FC<imgProps> = ({ src, alt, fallback, ...props }) => {
  const [source, setSource] = useState(src || fallback);
  const handleError = useCallback(() => {
    setSource(fallback);
  }, [setSource, fallback]);

  return <NextImage src={source} alt={alt} {...props} onError={handleError} />;
};

export default Image;
