import { FC } from "react";
import cn from "classnames";

import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

import Styles from "./attendeeStatus.module.scss";

type Status = RsvpStatus | PastRsvpStatus;

interface AttendeeStatusProps {
  isUpcoming: boolean;
  status: Status;
  eventId: string;
  iconFirst?: boolean;
  darkMode?: boolean;
  lockedOut?: boolean;
}

const AttendeeStatus: FC<AttendeeStatusProps> = ({
  isUpcoming,
  status,
  eventId,
  iconFirst = false,
  darkMode = false,
  lockedOut = false,
}) => {
  const showStatus = (status: Status) => {
    if (isUpcoming) {
      switch (status) {
        case "GOING":
          return RsvpStatuses.GOING;
        case "MAYBE":
        case "CANT_GO":
        default:
          return RsvpStatuses.CANT_GO;
      }
    } else {
      switch (status) {
        case "GOING":
          return PastRsvpStatuses.GOING;
        case "MAYBE":
        case "CANT_GO":
        default:
          return PastRsvpStatuses.CANT_GO;
      }
    }
  };

  const showIcon = (status: Status) => {
    if (isUpcoming) {
      switch (status) {
        case "GOING":
          return (
            <Icon
              className={Styles["attendee-status-icon--going"]}
              icon="success"
            >
              {RsvpStatuses[status]}
            </Icon>
          );
        case "MAYBE":
          return (
            <Icon
              className={Styles["attendee-status-icon--maybe"]}
              icon="unknown"
            >
              {RsvpStatuses[status]}
            </Icon>
          );
        case "CANT_GO":
        default:
          return (
            <Icon
              className={Styles["attendee-status-icon--not-going"]}
              icon="fail"
            >
              {RsvpStatuses[status]}
            </Icon>
          );
      }
    } else {
      switch (status) {
        case "GOING":
          return (
            <Icon
              className={Styles["attendee-status-icon--going"]}
              icon="success"
            >
              {PastRsvpStatuses[status]}
            </Icon>
          );
        case "NONE":
        case "MAYBE":
        case "CANT_GO":
        default:
          return (
            <Icon
              className={Styles["attendee-status-icon--not-going"]}
              icon="fail"
            >
              {PastRsvpStatuses["CANT_GO"]}
            </Icon>
          );
      }
    }
  };

  if (lockedOut) {
    return null;
  }

  const classNames = cn(Styles["attendee-status"], {
    [Styles["attendees-status--dark"]]: darkMode,
  });

  if (!status || status === "NONE") {
    return isUpcoming ? (
      <Button ghost={darkMode} href={`/event/${eventId}`}>
        View Event
      </Button>
    ) : (
      <span className={classNames}>
        <span>{showStatus(status as RsvpStatus)}</span>
        {showIcon(status as RsvpStatus)}
      </span>
    );
  }

  return (
    <span className={classNames}>
      {iconFirst ? (
        <>
          {showIcon(status)}
          <span>{showStatus(status)}</span>
        </>
      ) : (
        <>
          <span>{showStatus(status)}</span>
          {showIcon(status)}
        </>
      )}
    </span>
  );
};

export default AttendeeStatus;
