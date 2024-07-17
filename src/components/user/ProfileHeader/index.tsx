import { FC } from "react";
import get from "lodash/get";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Tabs from "@/components/common/Tabs";
import { dateFormat, DEFAULT_AVATAR_SRC, DEFAULT_RIG_SRC } from "@/constants";

import PROFILE_HEADER_QUERY from "./profileHeader.graphql";
import Styles from "./profileHeader.module.scss";

interface ProfileHeaderProps {
  username: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ username }) => {
  const { pathname } = useLocation();
  const { data, loading, error } = useQuery(PROFILE_HEADER_QUERY, {
    variables: { username },
  });

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const { user } = data;
  const convertedTitles = get(user, "title", []).map(
    (title: any) => Title[title as keyof typeof Title]
  );
  const RIG_SRC = get(user, "rig.image.url", DEFAULT_RIG_SRC);
  const AVATAR_SRC = get(user, "avatar.url", DEFAULT_AVATAR_SRC);

  const tabs = [
    {
      link: `/profile/${username}`,
      title: "Details",
      activeStyles:
        !pathname.includes("/garage") && !pathname.includes("/activity"),
    },
    {
      link: `/profile/${username}/garage`,
      title: "Garage",
      activeStyles: pathname.includes("/garage"),
    },
    {
      link: `/profile/${username}/activity`,
      title: "Activity",
      activeStyles: pathname.includes("/activity"),
    },
  ];

  return (
    <>
      <header>
        <div
          aria-label={"User's Vehicle"}
          className={Styles["user-vehicle"]}
          style={{
            backgroundImage: `url(${RIG_SRC})`,
          }}
        />

        {user ? (
          <div className={Styles["user-header"]}>
            <div className={Styles["user-demographics"]}>
              <img src={AVATAR_SRC} height="130" width="130" alt="Avatar" />
              <div className={Styles["user-name-info"]}>
                <div className={Styles["user-name"]}>
                  <h2 className={Styles["user-full-name"]}>
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
                <ul className={Styles["user-info"]}>
                  {user.foundingMember ? (
                    <li>Charter Member</li>
                  ) : (
                    <li>
                      {
                        AccountType[
                          user.accountType as keyof typeof AccountType
                        ]
                      }{" "}
                      Member
                    </li>
                  )}
                  {(user.office || convertedTitles.length > 0) && (
                    <li>
                      {[
                        Office[user.office as keyof typeof Office],
                        ...convertedTitles,
                      ].join(", ")}
                    </li>
                  )}
                  {user.joined && (
                    <li>Joined {format(new Date(user.joined), dateFormat)}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <h3>No user information</h3>
        )}
      </header>

      <div className={Styles["nav"]}>
        <Tabs tabs={tabs} />
      </div>
    </>
  );
};

export default ProfileHeader;
