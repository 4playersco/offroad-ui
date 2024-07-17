import { FC } from "react";
import cn from "classnames";

import Styles from "./loading.module.scss";

interface LoadingProps {
  loading: boolean;
  size?: "sm" | "md";
}

const Loading: FC<LoadingProps> = ({ loading, size = "sm" }) => {
  const classNames = cn(Styles["loading"], {
    [Styles["sm"]]: size === "sm",
    [Styles["md"]]: size === "md",
  });

  return (
    loading && (
      <img
        className={classNames}
        height={size === "sm" ? 25 : 75}
        width={size === "sm" ? 25 : 75}
        src="/img/loading.png"
        alt="Loading..."
        priority
      />
    )
  );
};

export default Loading;
