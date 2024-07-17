import { FC, useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import get from "lodash/get";
import cn from "classnames";

import UPCOMING_EVENTS_QUERY from "./upcomingEvents.graphql";
import PAST_EVENTS_QUERY from "./pastEvents.graphql";

import {
  dateFormatAbbrev,
  dateTimeFormatAbbrev,
  DEFAULT_EVENT_SMALL_SRC,
  getTrailDifficultyBadgeType,
} from "@/constants";
import { getUserRSVPStatus } from "@/lib";
import AttendeeStatus from "@/components/events/AttendeeStatus";
import Badge from "@/components/common/Badge";
import Pagination from "@/components/common/Pagination";
import Avatar from "@/components/common/Avatar.js";

import Styles from "./eventList.module.scss";

interface EventListProps {
  upcoming?: boolean;
  page: number;
}

const EventList: FC<EventListProps> = ({ upcoming, page }) => {
  const [attendees, setAttendees] = useState<any[]>([]);
  const { loading, error, data } = useQuery(
    upcoming ? UPCOMING_EVENTS_QUERY : PAST_EVENTS_QUERY,
    { variables: { page } }
  );

  const getAttendees = useCallback(
    (eventId: number) => {
      if (attendees[eventId]) {
        const eventAttendees: any = attendees[eventId];
        return eventAttendees.length > 3
          ? eventAttendees.slice(0, 3)
          : eventAttendees;
      }

      return [];
    },
    [attendees]
  );

  const eventType = upcoming ? "Upcoming" : "Past";
  const localPage = page || 1;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { events, totalEvents, myself } = data;
  const { count } = totalEvents;

  return (
    <div className={Styles["events"]}>
      <h2>{eventType} Events</h2>
      {events && events.length > 0 ? (
        <>
          <Pagination page={page} totalRecords={count} />
          <ul className={Styles["events-list"]}>
            {events.map((event: any) => {
              const attendeesList = event.rsvps.filter(
                (rsvp: any) => rsvp.status === "GOING"
              );

              let totalAttendees = 0;
              let totalRigs = 0;

              if (attendees && attendees[event.id]) {
                attendees[event.id].forEach((attendee: any) => {
                  totalAttendees += 1;

                  if (attendee.isRider) {
                    return;
                  }

                  if (attendee.guestCount) {
                    totalAttendees += attendee.guestCount;
                  }

                  if (event.trail) {
                    totalRigs += 1;
                  }
                  return;
                });
              } else {
                setAttendees((attendees: any) => ({
                  ...attendees,
                  [event.id]: attendeesList,
                }));
              }

              const EVENT_IMAGE = get(
                event,
                "featuredImage.smallUrl",
                DEFAULT_EVENT_SMALL_SRC
              );

              const TRAIL_IMAGE = get(event, "trail.featuredImage.smallUrl");

              const lockedOut =
                event.membersOnly && myself.accountType === "GUEST";

              const classNames = cn(Styles["event"], {
                [Styles["event__locked"]]: lockedOut,
              });

              // this.state.attendees[event.id] || [].map(() => '');
              // Loop through each attendee

              // const totalRigs =
              //   this.state.attendees[event.id] || [].map(() => '');

              const isFull =
                event.maxRigs === totalRigs ||
                event.maxAttendees === totalAttendees;

              return (
                <li className={Styles["event-wrapper"]} key={event.id}>
                  <div className={classNames}>
                    <div className={Styles["event__header"]}>
                      <div className={Styles["event__header-details"]}>
                        <div className={Styles["event-date"]}>
                          {lockedOut ? (
                            <>
                              {format(
                                new Date(event.startTime),
                                dateFormatAbbrev
                              )}
                            </>
                          ) : (
                            <Link to={`/event/${event.id}`}>
                              {format(
                                new Date(event.startTime),
                                dateTimeFormatAbbrev
                              )}
                            </Link>
                          )}
                        </div>
                        <h3 className={Styles["event-title"]}>
                          {lockedOut ? (
                            <>{event.title}</>
                          ) : (
                            <Link to={`/event/${event.id}`}>{event.title}</Link>
                          )}
                        </h3>
                        {event.trailDifficulty &&
                          event.trailDifficulty !== "UNKNOWN" && (
                            <Badge
                              type={getTrailDifficultyBadgeType(
                                event.trailDifficulty
                              )}
                              className={Styles["event__badge"]}
                            >
                              {
                                TrailDifficulties[
                                  event.trailDifficulty as keyof typeof TrailDifficulties
                                ]
                              }
                            </Badge>
                          )}
                        {event.membersOnly && (
                          <Badge
                            type="neutral"
                            className={Styles["event__badge"]}
                          >
                            Members Only
                          </Badge>
                        )}
                      </div>
                      {TRAIL_IMAGE && (
                        <img
                          className={Styles["event-image"]}
                          src={TRAIL_IMAGE}
                          alt={event.trail.name}
                          height="100"
                          width="150"
                        />
                      )}
                      {EVENT_IMAGE && !TRAIL_IMAGE && (
                        <img
                          className={Styles["event-image"]}
                          src={EVENT_IMAGE}
                          alt={event.title}
                          height="100"
                          width="150"
                        />
                      )}
                    </div>
                    <div className={Styles["event-details"]}>
                      <div className={Styles["event-meta"]}>
                        {attendees[event.id] &&
                          attendees[event.id].length >= 0 && (
                            <span className={Styles["event-attendees"]}>
                              {event.rsvps && event.rsvps.length > 0 && (
                                <span
                                  className={Styles["event-attendees__avatars"]}
                                >
                                  {getAttendees(event.id).map((rsvp: any) => (
                                    <Avatar
                                      src={get(rsvp.member, "avatar.smallUrl")}
                                      key={`${event.id}-${rsvp.member.id}`}
                                      width="30"
                                      alt="Attendee"
                                    />
                                  ))}
                                </span>
                              )}
                              {isFull ? (
                                <Badge
                                  className={Styles["event-attendees__badge"]}
                                  type="fail"
                                >
                                  Full
                                </Badge>
                              ) : (
                                <span
                                  className={Styles["event-attendees__count"]}
                                >
                                  <span
                                    className={
                                      Styles["event-attendees__number"]
                                    }
                                  >
                                    {totalAttendees}
                                  </span>{" "}
                                  attendees
                                </span>
                              )}
                            </span>
                          )}
                        <span className={Styles["event-rsvp"]}>
                          {/* <span className={Styles["event-comment-count">
                          12
                        </span> */}
                          <AttendeeStatus
                            isUpcoming={Boolean(upcoming)}
                            status={getUserRSVPStatus(
                              event.rsvps,
                              event.id,
                              myself.id
                            )}
                            eventId={event.id}
                            lockedOut={lockedOut}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Pagination page={page} totalRecords={count} />
        </>
      ) : (
        <h3>No events planned</h3>
      )}
    </div>
  );
};

export default EventList;
