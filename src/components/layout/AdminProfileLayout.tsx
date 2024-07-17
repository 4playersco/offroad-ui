import { FC } from "react";
import { useNavigate } from "react-router-dom";

import ProfileHeader from "@/components/admin/ProfileHeader";
import AdminProfileForm from "@/components/user/AdminProfileForm";
import AdminOverview from "@/components/user/AdminOverview";
import ProfileForm from "@/components/user/ProfileForm";
import MembershipLog from "@/components/user/MembershipLog";
import useUser from "@/components/../hooks/useUser";

import { isAtLeastBoardMember } from "@/lib";

import Styles from "@/components/user/ProfileIndex/profileIndex.module.scss";

interface AdminProfileLayoutProps {
  children: React.ReactNode;
}

const AdminProfileLayout: FC<AdminProfileLayoutProps> = ({ children }) => {
  const { query } = useRouter();
  const { username } = query;

  return (
    <div className={Styles["profile"]}>
      <ProfileHeader username={username} />
      {children}
    </div>
  );
};

export default AdminProfileLayout;
