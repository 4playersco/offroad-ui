import { FC } from "react";
import { Link } from "react-router-dom";
import { format, getTime, isEqual, startOfDay } from "date-fns";
import parse from "html-react-parser";
import get from "lodash/get";
import cn from "classnames";
import { useQuery } from "@apollo/client";

import NON_RUN_EVENT_QUERY from "./nonRunEventDetails.graphql";

import {
  dateFormat,
  dateFormatFull,
  timeFormat,
  DEFAULT_EVENT_SRC,
  DEFAULT_AVATAR_SMALL_SRC,
} from "@/constants";
import NonRunAttendeeCard from "../NonRunAttendeeCard";
import NonRunRsvp from "../NonRunRsvp";
import Filter from "@/components/login/Filter";
import {
  isAtLeastBoardMember,
  isFullMember,
  onMapImgError,
  getMaxAttendees,
} from "@/lib";

import Icon from "../../common/Icon";
import Badge from "../../common/Badge";
import ErrorMessage from "../../utility/ErrorMessage";

import Styles from "./nonRunEventDetails.module.scss";

type NonRunEventDetailsProps = {
  eventId: string;
};

const NonRunEventDetails: FC<NonRunEventDetailsProps> = ({ eventId }) => {
  const { loading, error, data } = useQuery(NON_RUN_EVENT_QUERY, {
    variables: { eventId },
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { event, myself } = data;

  const lockedOut = event.membersOnly && myself.accountType === "GUEST";

  if (lockedOut) {
    return null;
  }

  const isPastEvent = Date.now() > getTime(new Date(event.startTime));

  const allAttendees = event.rsvps.filter(
    (rsvp: any) => rsvp.status === "GOING"
  );
  const hostRsvp = allAttendees.find(
    (attendee: any) => attendee.member.id === event.host.id
  );
  const rsvpsSansHost = allAttendees.filter(
    (attendee: any) => attendee.member.id !== event.host.id
  );
  const guestCount = allAttendees.reduce(
    (acc: any, attendee: any) => acc + get(attendee, "guestCount", 0),
    0
  );
  const memberCount = allAttendees.length;
  const attendeeCount = guestCount + memberCount;

  const userStatus = () => {
    const rsvp = event.rsvps.find((rsvp: any) => rsvp.member.id === myself.id);

    if (rsvp) {
      return rsvp.status;
    }

    return "NONE";
  };

  const userRsvp = () =>
    event.rsvps.find((rsvp: any) => rsvp.member.id === myself.id);

  const EVENT_IMAGE = get(event, "featuredImage.url", DEFAULT_EVENT_SRC);

  const HOST_IMAGE = get(
    event,
    "host.avatar.smallUrl",
    DEFAULT_AVATAR_SMALL_SRC
  );

  const eventType = EventTypes[event.type as keyof typeof EventTypes];
  const fullUp =
    event.maxAttendees &&
    event.maxAttendees !== -1 &&
    event.maxAttendees <= attendeeCount;

  return (
    <>
      <div className={Styles["event__header"]}>
        <div className={Styles["event__date"]}>
          {isPastEvent
            ? "Past Event"
            : format(new Date(event.startTime), dateFormatFull)}
          {!isPastEvent && (
            <Filter roleCheck={isAtLeastBoardMember} typeCheck={isFullMember}>
              {" "}
              <small>
                <Link to={`/event/${eventId}/edit`}>Edit</Link>
              </small>
            </Filter>
          )}
        </div>
        <div className={Styles["event__title"]}>
          <h2 className={Styles["event__title--heading"]}>{event.title}</h2>
          {event.membersOnly && (
            <Badge type="neutral" className={Styles["event__badge"]}>
              Members Only
            </Badge>
          )}
          {fullUp && (
            <Badge type="fail" className={Styles["event__badge"]}>
              Full
            </Badge>
          )}
        </div>
      </div>
      <div className={Styles["event__rsvp"]}>
        <NonRunRsvp
          user={myself}
          userStatus={userStatus()}
          eventId={eventId}
          attendeeCount={attendeeCount}
          rsvpCount={attendeeCount}
          pastEvent={isPastEvent}
          userRsvp={userRsvp()}
          fullUp={fullUp}
          changeDisabled={event.changeDisabled}
        />
      </div>
      <aside className={Styles["event__aside"]}>
        <div className={Styles["event__aside-wrapper"]}>
          <dl>
            <dt>
              <img
                className={Styles["event__leader"]}
                src={HOST_IMAGE}
                alt={`Run Leader ${event.host.firstName} ${event.host.lastName}`}
              />
            </dt>
            <dd>
              {event.host.firstName} {event.host.lastName}
              <br />
              <small>Host</small>
            </dd>

            <dt>
              <Icon
                className={
                  Styles[`event__type-icon--${eventType.toLowerCase()}`]
                }
                icon={eventType.toLowerCase()}
              >
                Event Type
              </Icon>
            </dt>
            <dd>{eventType}</dd>

            {event.maxAttendees && event.maxAttendees > -1 && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="count">
                    Max Attendees
                  </Icon>
                </dt>
                <dd>{getMaxAttendees(event.maxAttendees)}</dd>
              </>
            )}

            <dt>
              <Icon className={Styles[`event__type-icon`]} icon="date">
                Date
              </Icon>
            </dt>
            <dd>{getEventDate(event)}</dd>

            <dt>
              <Icon className={Styles[`event__type-icon`]} icon="time">
                Time
              </Icon>
            </dt>
            <dd>{getEventTime(event)}</dd>

            {event.address && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="location">
                    Address
                  </Icon>
                </dt>
                <dd>
                  {event.address}
                  <br />
                  <small>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        event.address
                      )}`}
                    >
                      Directions
                    </a>
                  </small>
                </dd>
              </>
            )}
          </dl>

          {event.address && (
            <p>
              <img
                width="250"
                height="100"
                src={`https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=250x100&maptype=roadmap&markers=color:red%7Csize:small%7C${encodeURIComponent(
                  event.address
                )}&center=${encodeURIComponent(event.address)}&key=${
                  import.meta.env.GOOGLE_MAPS_API_KEY
                }`}
                alt={`${event.title} map`}
                onError={onMapImgError}
                className={Styles["event__map-image"]}
              />
            </p>
          )}
        </div>
      </aside>
      <div className={Styles["event__details"]}>
        <section className={Styles["event__section"]}>
          {EVENT_IMAGE && <img src={EVENT_IMAGE} alt={event.title} />}
        </section>

        {event.description && (
          <section
            className={Styles["event__section"]}
            aria-label="Description"
          >
            {parse(event.description)}
          </section>
        )}

        <section className={Styles["event__section"]}>
          <h3>Attendees</h3>

          <div className={Styles["event__stats"]}>
            <div className={Styles["event__stat"]}>
              {getStat(
                attendeeCount,
                event.maxAttendees,
                "attendee",
                "attendees"
              )}
            </div>
          </div>

          <div className={Styles["event__attendees"]}>
            <div>
              <h4
                className={cn(
                  Styles["event__card-heading"],
                  Styles["event__card-heading--first"]
                )}
              >
                Host
              </h4>
              <NonRunAttendeeCard key={event.host.id} rsvp={hostRsvp} isHost />
            </div>
            {rsvpsSansHost.length > 0 && (
              <div>
                <h4 className={Styles["event__card-heading"]}>Attendees</h4>
                {rsvpsSansHost.map((attendee: any) => (
                  <NonRunAttendeeCard
                    key={attendee.member.id}
                    rsvp={attendee}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        {/* {isPastEvent && (
          <section className={Styles["event__section"]}>
            <h3>Photos</h3>
            <form>
              <input type="file" />
            </form>
          </section>
        )} */}
        {event.comments && (
          <section className={Styles["event__section"]}>
            <h3>Comments</h3>
            <hr />
            <form>
              <textarea />
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default NonRunEventDetails;

export const getStat = (actual: any, max: any, noun: any, plural: any) => {
  return max && max !== -1 ? (
    <>
      <span className={Styles["event__stat--large"]}>{actual}</span> out of{" "}
      <span className={Styles["event__stat--large"]}>{max}</span>{" "}
      <span className={Styles["event__stat--newline"]}>{plural}</span>
    </>
  ) : (
    <>
      <span className={Styles["event__stat--large"]}>{actual}</span>{" "}
      <span className={Styles["event__stat--newline"]}>
        {actual === 1 ? noun : plural}
      </span>
    </>
  );
};

export const getEventDate = (event: any) => {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  // If event is on one day
  if (isEqual(startOfDay(startTime), startOfDay(endTime))) {
    return <>{format(startTime, dateFormat)}</>;
  } else {
    return (
      <>
        {format(startTime, dateFormat)} to {format(endTime, dateFormat)}
      </>
    );
  }
};

export const getEventTime = (event: any) => {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  // If event is on one day
  if (isEqual(startOfDay(startTime), startOfDay(endTime))) {
    return (
      <>
        {format(startTime, timeFormat)} to {format(endTime, timeFormat)}
      </>
    );
  } else {
    return <>{format(startTime, timeFormat)}</>;
  }
};
