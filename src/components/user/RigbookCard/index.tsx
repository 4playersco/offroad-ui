import { FC } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import cn from "classnames";
import get from "lodash/get";

import { getMemberType, isAtLeastRunLeader } from "@/lib";
import Filter from "@/components/login/Filter";
import Avatar from "@/components/common/Avatar";
import Rig from "@/components/common/Rig";

import Styles from "./rigbookCard.module.scss";

interface RigbookCardProps {
  user: any;
  className?: string;
}

const RigbookCard: FC<RigbookCardProps> = ({ user, className }) => {
  const classes = cn(Styles["rigbook-card"], className);

  return (
    <div className={classes}>
      <div className={Styles["user-photos"]}>
        <Rig
          className={Styles["vehicle-img"]}
          src={get(user, "rig.image.url")}
          alt={`${user.firstName}'s Vehicle`}
        />
        <Avatar
          className={Styles["user-img"]}
          src={get(user, "avatar.url")}
          alt={user.firstName}
        />
      </div>
      <div className={Styles["content"]}>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        {user.office && (
          <small className={Styles["extra"]}>
            {Office[user.office as keyof typeof Office]}
          </small>
        )}
        {user.vehicle && (
          <>
            <h3>
              {[
                user.vehicle.year || "",
                user.vehicle.make || "",
                user.vehicle.model || "",
              ].join(" ")}
            </h3>
            {user.vehicle.trim && <h4>{user.vehicle.trim}</h4>}
          </>
        )}
        <h5 className={Styles["titles"]}>
          <ul>
            <li>{getMemberType(user.accountType)}</li>
            <li>Joined {format(new Date(user.joined), "yyyy")}</li>
          </ul>
          {user.titles && (
            <ul>
              {user.titles.map((title: any) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          )}
        </h5>
      </div>
      <ul className={Styles["profile-actions-list"]}>
        {user.username && (
          <>
            <li>
              <Link to={`/profile/${user.username}`}>View Profile</Link>
            </li>
            <Filter roleCheck={isAtLeastRunLeader}>
              <li>
                <Link to={`/message${user.username}`}>Message</Link>
              </li>
            </Filter>
          </>
        )}
      </ul>
    </div>
  );
};

export default RigbookCard;
