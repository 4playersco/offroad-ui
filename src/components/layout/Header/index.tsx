import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import cn from "classnames";

import Nav from "../Nav";
import { siteNameShort } from "@/constants";

import Styles from "./header.module.scss";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsMobileNavOpen(!isMobileNavOpen);
  }, [setIsMobileNavOpen, isMobileNavOpen]);

  const buttonClasses = cn(Styles["menu-toggle"], {
    [Styles["menu-active"]]: isMobileNavOpen,
  });

  return (
    <header className={Styles["header"]}>
      <div className={Styles["nav"]}>
        <div className={Styles["nav-container"]}>
          <Link to="/">
            <img
              className={Styles["logo-image"]}
              src="/img/logo.png"
              alt={siteNameShort}
              height="60"
            />
            <h1 className={Styles["list-heading"]}>
              <span className={Styles["list-big-number"]}>4</span>-Players
            </h1>
          </Link>
          <button
            className={buttonClasses}
            type="button"
            aria-controls="primary-menu"
            aria-expanded={isMobileNavOpen}
            onClick={handleClick}
            data-icon
          >
            Menu
          </button>
        </div>
        <Nav openMobileNav={isMobileNavOpen} />
      </div>
    </header>
  );
};

export default Header;
