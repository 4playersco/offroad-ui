import { FC } from "react";

// import Profile from "@/components/user/Profile";
// import ActivityIndex from "@/components/user/activity/ActivityIndex";
// import Garage from "@/components/vehicles/Garage";
import ProfileHeader from "@/components/user/ProfileHeader";

import Styles from "./profileLayout.module.scss";
import useProfile from "@/hooks/useProfile";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  const results = useProfile();

  if (results === null) {
    return null;
  }

  const [username] = results;

  return (
    <div className={Styles["profile"]}>
      <ProfileHeader username={username} />
      {children}
    </div>
  );
};

export default ProfileLayout;
