import { FC } from "react";
import { useQuery } from "@apollo/client";
// import { Link, Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CURRENT_USER_QUERY from "@/hooks/useUser/useUser.graphql";

interface GateProps {
  roleCheck?: (role: Role) => boolean;
  statusCheck?: (status: AccountStatus) => boolean;
  typeCheck?: (type: AccountType) => boolean;
  redirect?: string;
  children: React.ReactNode;
}

const Gate: FC<GateProps> = ({
  roleCheck = (role: Role) => role,
  statusCheck = (status: AccountStatus) => status,
  typeCheck = (type: AccountType) => type,
  redirect = "/",
  children,
}) => {
  const nav = useNavigate();
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Logged out
  if (!data || !data.myself) {
    nav(`/login${redirect === "/" ? "" : `?redirect=${redirect}`}`, {
      replace: true,
    });
  }

  const { role, accountStatus, accountType } = data.myself;

  const contactWebmasterMessage = (
    <>
      <Link to="/message?to=webmaster">Contact the webmaster</Link> for help
    </>
  );

  // Improper role
  if (roleCheck && !roleCheck(role)) {
    return <p>Your account is not authorized to view this content.</p>;
  }

  // Improper status
  if (statusCheck && !statusCheck(accountStatus)) {
    return (
      <p>
        Your account does not have the proper status to view this content.{" "}
        {contactWebmasterMessage}.
      </p>
    );
  }

  // Improper type
  if (typeCheck && !typeCheck(accountType)) {
    return (
      <p>
        You do not have the proper account type to view this content.{" "}
        {contactWebmasterMessage}.
      </p>
    );
  }

  return children;
};

export default Gate;
