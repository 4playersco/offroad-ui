import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Switch from "@/components/common/Switch";

import Styles from "./eventsPageLayout.module.scss";

interface EventsIndexProps {
  children: React.ReactNode;
}

const EventsPageLayout: FC<EventsIndexProps> = ({ children }) => {
  const { push, pathname, asPath } = useRouter();

  const handleClick = useCallback(
    (isPastEvents: boolean) => {
      if (isPastEvents) {
        push(`${asPath}/past`);
      } else {
        push(`${asPath}`);
      }
    },
    [push, asPath]
  );

  return (
    <div>
      <nav className={Styles["event-nav"]}>
        <Switch
          offLabel="Upcoming"
          onLabel="Past"
          onClick={handleClick}
          onToStart={pathname.includes("/past")}
        />
      </nav>

      {children}
    </div>
  );
};

export default EventsPageLayout;
