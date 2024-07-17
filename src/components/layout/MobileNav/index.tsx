import { useState, useCallback } from "react";
import cn from "classnames";

import Styles from "./mobileNav.module.scss";

const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleClick = useCallback(() => {
    setOpenNav(!openNav);
  }, [setOpenNav, openNav]);

  const buttonClasses = cn(Styles["menu-toggle"], {
    [Styles["active"]]: openNav,
  });

  return (
    <button
      className={buttonClasses}
      type="button"
      aria-controls="primary-menu"
      aria-expanded={openNav}
      onClick={handleClick}
    >
      Menu
    </button>
  );
};

export default MobileNav;
