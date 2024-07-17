import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Tabs from "@/components/common/Tabs";

import Styles from "./historyLayout.module.scss";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div className={Styles["history"]}>
      <h2>Club History</h2>
      <Tabs
        tabs={[
          {
            link: `/history`,
            title: "Details",
            activeStyles:
              !pathname.includes("/officers") &&
              !pathname.includes("/in-memoriam") &&
              !pathname.includes("/kennys-cabin"),
          },
          {
            link: `/history/officers`,
            title: "Officers",
            activeStyles: pathname.includes("/officers"),
          },
          {
            link: `/history/in-memoriam`,
            title: "In Memoriam",
            activeStyles: pathname.includes("/in-memoriam"),
          },
          {
            link: `/history/kennys-cabin`,
            title: "Kenny's Cabin",
            activeStyles: pathname.includes("/kennys-cabin"),
          },
          // {
          //   link: `/history/awards`,
          //   title: 'Awards',
          //   activeStyles: pathname.includes('/awards'),
          // },
        ]}
      />
      {children}
    </div>
  );
};

export default ProfileLayout;
