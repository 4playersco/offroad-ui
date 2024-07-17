import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "@/hooks/useUser";
import Spinner from "@/components/utility/Spinner";
import PageLayout from "./PageLayout";

const Unauthorized: FC = () => {
  const nav = useNavigate();
  useEffect(() => {
    nav("/unauthorized");
  });

  return <></>;
};

interface GuardedRouteProps {
  roleCheck?: (role: Role) => boolean;
  statusCheck?: (status: AccountStatus) => boolean;
  typeCheck?: (type: AccountType) => boolean;
  selfCheck?: boolean;
  fallback?: FC;
  children: ReactNode;
}

const GuardedPage: FC<GuardedRouteProps> = ({
  roleCheck = () => true,
  statusCheck = () => true,
  typeCheck = () => true,
  selfCheck,
  fallback: Fallback = Unauthorized,
  children,
}) => {
  const { loading, data } = useUser();
  const nav = useNavigate();

  if (loading || !data) {
    return <Spinner />;
  }

  // Authenticate
  if (!data.myself) {
    const queryParam =
      location.pathname === "/login" || location.pathname === "/"
        ? ""
        : `?redirect=${encodeURIComponent(
            `${location.pathname}${location.search}`
          )}`;

    nav(`/login${queryParam}`);
  }

  // Authorize
  const { myself } = data;
  const { role, accountStatus, accountType } = myself;

  // Can view if self
  if (selfCheck) {
    return <>{children}</>;
  }

  // Only view if checks pass
  return !selfCheck &&
    roleCheck(role) &&
    statusCheck(accountStatus) &&
    typeCheck(accountType) ? (
    <PageLayout>{children}</PageLayout>
  ) : (
    <Fallback />
  );
};

export default GuardedPage;
