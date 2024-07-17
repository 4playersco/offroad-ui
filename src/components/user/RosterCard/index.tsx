import { FC } from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import cn from "classnames";

import { getMemberType, getPhoneNumber } from "@/lib";
// import { DEFAULT_AVATAR_SMALL_SRC } from "@/constants";
import Avatar from "@/components/common/Avatar";

import Styles from "./rosterCard.module.scss";
import { useNavigate } from "react-router-dom";

interface RosterCardProps {
  user: any;
  className?: string;
}

const RosterCard: FC<RosterCardProps> = ({ user, className }) => {
  const { pathname } = useRouter();
  const classes = cn(Styles["roster-card"], className);
  const phone = get(user, "contactInfo.phone", "");
  const match = pathname.includes("/admin/roster");
  const linkTo = match
    ? `/admin/profile/${user.username}`
    : `/profile/${user.username}`;

  return (
    <tr className={classes}>
      <td>
        <Avatar
          className={Styles["member__img"]}
          src={user.avatar && user.avatar.smallUrl}
          alt={user.firstName}
        />
      </td>
      <td>
        <Link to={linkTo}>
          {user.firstName} {user.lastName}
        </Link>
      </td>
      <td>{getMemberType(user.accountType)}</td>
      <td>{phone && phone !== "0000000000" && getPhoneNumber(phone)}</td>
    </tr>
  );
};

export default RosterCard;
