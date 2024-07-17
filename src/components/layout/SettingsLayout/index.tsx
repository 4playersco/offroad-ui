import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Tabs from "@/components/common/Tabs";

import Styles from "./settingsLayout.module.scss";

interface SettingsIndexProps {
  children: React.ReactNode;
}

const SettingsIndex: FC<SettingsIndexProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <h2>Settings</h2>

      <div className={Styles["nav"]}>
        <Tabs
          tabs={[
            {
              link: `/settings/profile`,
              title: "Profile",
              activeStyles: pathname.includes("/profile"),
            },
            {
              link: `/settings/garage`,
              title: "Garage",
              activeStyles: pathname.includes("/garage"),
            },
            {
              link: `/settings/account`,
              title: "Account",
              activeStyles: pathname.includes("/account"),
            },
            {
              link: `/settings/notifications`,
              title: "Notifications",
              activeStyles: pathname.includes("/notifications"),
            },
          ]}
        />
      </div>

      {children}
    </>
  );
};

export default SettingsIndex;
