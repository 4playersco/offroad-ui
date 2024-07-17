import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import cn from "classnames";

import Icon from "../../common/Icon";
import { accountTypes, DEFAULT_AVATAR_SRC } from "../../../lib/constants";

import Styles from "./nonRunAttendeeCard.module.scss";

const NonRunAttendeeCard = ({ rsvp, startOpen = false, isHost = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const detailsClassNames = cn(Styles["event__details"], {
    [Styles["event__details--open"]]: isOpen,
  });

  const cardClassNames = cn(Styles["event__card"], {
    [Styles["event__card--host"]]: isHost,
  });

  if (!rsvp) {
    return null;
  }

  const { member } = rsvp;
  const guestCount = rsvp.guestCount || 0;
  const AVATAR_SRC = get(member, "avatar.url", DEFAULT_AVATAR_SRC);
  const memberType =
    member.accountType === "GUEST"
      ? "Guest"
      : `${accountTypes[member.accountType]} Member`;

  return (
    <div className={cardClassNames}>
      <div className={Styles["event__main"]}>
        <div className={Styles["event__main-container"]}>
          <div className={Styles["event__avatar-wrapper"]}>
            <img
              className={Styles["event__avatar"]}
              src={AVATAR_SRC}
              alt={`${member.firstName} ${member.lastName} avatar`}
            />
            {guestCount > 0 && (
              <span
                className={Styles["event__guestCount"]}
                title={`${guestCount} guest(s)`}
              >
                {guestCount}
              </span>
            )}
          </div>

          <div className={Styles["event__main__heading"]}>
            <h3>
              {member.firstName} {member.lastName}
            </h3>
            <p>{memberType}</p>
          </div>
        </div>

        <button
          className={Styles["event__open__button"]}
          onClick={handleToggle}
        >
          <Icon icon={isOpen ? "arrow-up" : "arrow-down"}>Toggle Details</Icon>
        </button>
      </div>
      <div className={detailsClassNames}>
        <ul className={Styles["event__details-list"]}>
          <li>
            <Icon
              className={cn(
                Styles["event__details-list__icon"],
                Styles["event__details-list__icon--location"]
              )}
              icon="location"
            >
              Location
            </Icon>{" "}
            {member.contactInfo &&
              member.contactInfo.city &&
              member.contactInfo.state && (
                <>
                  {member.contactInfo.city}, {member.contactInfo.state}
                </>
              )}
          </li>
          <li>
            <Icon className={Styles["event__details-list__icon"]} icon="mail">
              Send Message
            </Icon>{" "}
            <a href={`mailto:${member.email}`}>Send Message</a>
          </li>
          <li>
            <Icon
              className={Styles["event__details-list__icon"]}
              icon="profile"
            >
              Profile
            </Icon>{" "}
            <Link to={`/profile/${member.username}`}>View Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NonRunAttendeeCard;

/* 
<Attendee>
  <Name />
  <AccountType />

  <AddlInfo>
    <TitlesOrOffices />
    <Hometown />
    <MemberSince />

    <EventsCount />
    <SendMessage />
    <ProfileLink /> // Icon - @username
  </AddlInfo>

  <Drivers>
    <Rig />
    <Equipment />
  </Drivers>
</Attendee> 
*/
