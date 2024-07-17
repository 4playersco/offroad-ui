import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Switch from "@/components/common/Switch";

import Styles from "./rosterLayout.module.scss";

interface RosterLayoutProps {
  children: React.ReactNode;
}

const RosterLayout: FC<RosterLayoutProps> = ({ children }) => {
  const { asPath, push, pathname } = useRouter();

  const handleClick = useCallback(
    (isRosterList: boolean) => {
      if (isRosterList) {
        push(`${asPath}/list`);
      } else {
        push(`${asPath}`);
      }
    },
    [push, asPath]
  );

  return (
    <div className={Styles["rigbook-index"]}>
      <nav className={Styles["rigbook-nav"]}>
        <Switch
          offLabel="Rigbook"
          offIcon="rigbook"
          onLabel="List"
          onIcon="list"
          onClick={handleClick}
          onToStart={pathname.includes("/list")}
        />
      </nav>

      {children}
    </div>
  );
};

export default RosterLayout;

{
  /* <RouterSwitch>
  <Route path={`${path}/list`} component={Roster} />
  // <Route exact path={path} component={Rigbook} />
  // <Route path="*">
  //   <Redirect to="/404" />
  // </Route>
</RouterSwitch>; */
}
