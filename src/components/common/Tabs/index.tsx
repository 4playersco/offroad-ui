import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import Styles from "./tabs.module.scss";

interface TabsProps {
  tabs: {
    link: string;
    title: string;
    activeStyles: boolean;
  }[];
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const tabStyles = tabs.map((tab) =>
    cn({
      [Styles["active"]]: tab.activeStyles,
    })
  );

  return (
    <nav className={Styles["tabs"]}>
      <ul>
        {tabs.map((tab, index) => (
          <li key={index}>
            <Link className={tabStyles[index]} href={tab.link}>
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
