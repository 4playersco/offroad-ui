import { FC } from "react";
import cn from "classnames";

import Styles from "./icon.module.scss";

interface IconProps {
  icon: string;
  className?: string;
  children?: React.ReactNode;
}

const Icon: FC<IconProps> = ({ icon, className, children, ...props }) => {
  const classNames = cn(Styles["icon"], Styles[`icon-${icon}`], className);

  return (
    <i
      className={classNames}
      title={String(children) || icon}
      aria-label={String(children) || icon}
      {...props}
    >
      {children ? children : null}
    </i>
  );
};

export default Icon;
