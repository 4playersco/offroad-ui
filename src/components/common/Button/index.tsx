import { FC, useCallback } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Styles from "./button.module.scss";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  ghost?: boolean;
  className?: string;
  href?: string;
  to?: string;
  selected?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  ghost = false,
  className = "",
  href = "",
  to = "",
  selected = false,
  disabled = false,
  type = "button",
  ...rest
}) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(event);
      }
    },
    [disabled, onClick]
  );
  const classes = classnames(className, {
    [Styles["button"]]: !ghost,
    [Styles["button--ghost"]]: ghost,
    [Styles["selected"]]: selected,
    [Styles["disabled"]]: disabled || selected,
  });

  let btnComponent;

  if (href) {
    btnComponent = (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  } else if (to) {
    btnComponent = disabled ? (
      <button type={type} disabled={disabled} className={classes} {...rest}>
        {children}
      </button>
    ) : (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  } else {
    btnComponent = (
      <button
        disabled={disabled || selected}
        onClick={handleClick}
        className={classes}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return <span className={Styles["wrapper"]}>{btnComponent}</span>;
};

export default Button;
