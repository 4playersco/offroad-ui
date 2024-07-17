import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import cn from "classnames";

import Icon from "../../common/Icon";
import { accountTypes, DEFAULT_AVATAR_SRC } from "../../../lib/constants";

import Styles from "./runAttendeeCard.module.scss";

const RunAttendeeCard = ({ rsvp, startOpen = false, isLeader = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const detailsClassNames = cn(Styles["event__details"], {
    [Styles["event__details--open"]]: isOpen,
  });

  const cardClassNames = cn(Styles["event__card"], {
    [Styles["event__card--leader"]]: isLeader,
  });

  if (!rsvp) {
    return null;
  }

  const { member } = rsvp;
  const passengerCount = rsvp.guestCount || 0;
  const AVATAR_SRC = get(member, "avatar.url", DEFAULT_AVATAR_SRC);
  const memberType =
    member.accountType === "GUEST"
      ? "Guest"
      : `${accountTypes[member.accountType]} Member`;
  const vehicle =
    member.vehicle &&
    `${member.vehicle.year} ${member.vehicle.make} ${member.vehicle.model} ${
      member.vehicle.trim || ""
    }`.trim();
  const vehicleDetails =
    !vehicle || rsvp.isRider ? "Rider" : vehicle || "Driver";

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
            {passengerCount > 0 && (
              <span
                className={Styles["event__guestCount"]}
                title={`${passengerCount} passenger(s)`}
              >
                {passengerCount}
              </span>
            )}
          </div>

          <div className={Styles["event__main__heading"]}>
            <h3>
              {member.firstName} {member.lastName}
            </h3>
            <p>{memberType}</p>
            <p>{vehicleDetails}</p>
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
        {member.equipment && member.equipment.length > 0 && (
          <p>
            <h5>Equipment</h5>
            {member.equipment.join(", ")}
          </p>
        )}

        <ul className={Styles["event__details-list"]}>
          <li>
            <Icon className={Styles["event__details-list__icon"]} icon="run">
              Events Count
            </Icon>{" "}
            {member.runsAttendedCount || 0}
          </li>
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
          {member.contactInfo && member.contactInfo.phone && (
            <li>
              <Icon
                className={Styles["event__details-list__icon"]}
                icon="phone"
              >
                Send Message
              </Icon>{" "}
              <a href={`tel:${member.contactInfo.phone}`}>Call</a>
            </li>
          )}
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

export default RunAttendeeCard;

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
