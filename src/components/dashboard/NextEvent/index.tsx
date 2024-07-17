import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { format } from "date-fns";
import { rgba } from "polished";

import ErrorMessage from "../../utility/ErrorMessage";
import AttendeeStatus from "../../events/AttendeeStatus";
import {
  dateFormatAbbrev,
  dateTimeFormatAbbrev,
  DEFAULT_EVENT_SRC,
} from "@/constants";

import Styles from "./nextEvent.module.scss";
import NEXT_EVENT_QUERY from "./nextEvent.graphql";

type Event = {
  id: string;
  title: string;
  startTime: string;
  membersOnly: boolean;
  rsvps: any[];
  trail: {
    featuredImage: {
      url: string;
    };
  };
};

const userStatus = (userId: string, event: Event) => {
  if (!event.rsvps) {
    return "NONE";
  }

  const rsvp = event.rsvps.find((rsvp) => rsvp.member.id === userId);

  if (rsvp) {
    return rsvp.status;
  }

  return "NONE";
};

const NextEvent = () => {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(NEXT_EVENT_QUERY);
  // const [setRsvp, { loading }] = useMutation(RSVP_MUTATION);

  // const [attending, setAttending] = useState(null);
  // const submitRsvp = useCallback(
  //   (rsvp, eventId, userId, callback) => {
  //     setAttending(rsvp);
  //     callback({
  //       variables: {
  //         rsvp: {
  //           userId,
  //           eventId,
  //           status: rsvp ? 'GOING' : 'CANT_GO',
  //         },
  //       },
  //       refetchQueries: [
  //         {
  //           query: EVENT_QUERY,
  //           variables: { eventId },
  //         },
  //         {
  //           query: UPCOMING_EVENTS_QUERY,
  //         },
  //       ],
  //     });
  //   },
  //   [setAttending],
  // );

  if (queryLoading) {
    return <div>Loading...</div>;
  }

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { event, myself } = queryData;

  if (!event) {
    return <div className={Styles["nothing-scheduled"]}>Nothing scheduled</div>;
  }

  const userRSVP = userStatus(myself.id, event);
  // const hasRSVPd = userRSVP !== 'NONE' || attending !== null;
  // const isAttendingNextEvent =
  //   attending !== null ? attending : userRSVP === 'GOING';

  const featuredImage =
    get(event, "trail.featuredImage.url") ||
    get(event, "featuredImage.url", DEFAULT_EVENT_SRC);

  const backgroundImage = {
    backgroundImage: `linear-gradient(90deg,${rgba("#4b5767", 1)} 0%,${rgba(
      "#4b5767",
      0.95
    )} 0%,${rgba("#4b5767", 0.75)} 40%,${rgba("#ce312c", 0.5)} 65%,${rgba(
      "#ff372d",
      0.25
    )} 80%),
    url(${featuredImage})
    `,
  };

  const lockedOut = myself.accountType === "GUEST" && event.membersOnly;

  return (
    <>
      <h3 className={Styles["dashboard-heading"]}>Next Event</h3>
      <div className={Styles["event-container"]}>
        <div className={Styles["event"]} style={backgroundImage}>
          <div className={Styles["event-details"]}>
            <h3>
              {lockedOut ? (
                <>{event.title}</>
              ) : (
                <Link to={`/event/${event.id}`}>{event.title}</Link>
              )}
            </h3>
            {lockedOut ? (
              <h4>{format(new Date(event.startTime), dateFormatAbbrev)}</h4>
            ) : (
              <h4>{format(new Date(event.startTime), dateTimeFormatAbbrev)}</h4>
            )}
            {lockedOut && <h4>Members Only</h4>}
          </div>

          <AttendeeStatus
            isUpcoming
            status={userRSVP}
            eventId={event.id}
            iconFirst
            darkMode
            lockedOut={lockedOut}
          />
          {/* <Button
            onClick={() => submitRsvp(true, event.id, myself.id, setRsvp)}
            ghost
            selected={hasRSVPd && isAttendingNextEvent}
          >
            {hasRSVPd && isAttendingNextEvent ? 'Attending' : 'Attend'}
          </Button>
          <Button
            onClick={() => submitRsvp(false, event.id, myself.id, setRsvp)}
            ghost
            selected={hasRSVPd && !isAttendingNextEvent}
          >
            {hasRSVPd && !isAttendingNextEvent
              ? 'Not Attending'
              : "Won't Attend"}
          </Button>
          <Loading loading={loading} /> */}
        </div>
      </div>
    </>
  );
};

export default NextEvent;
