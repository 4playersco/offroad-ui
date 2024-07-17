import { FC } from "react";
import { Link } from "react-router-dom";
import { format, getTime } from "date-fns";
import parse from "html-react-parser";
import get from "lodash/get";
import cn from "classnames";
import { useQuery } from "@apollo/client";

import RUN_EVENT_QUERY from "./runEventDetails.graphql";

import {
  dateFormatFull,
  DEFAULT_EVENT_SRC,
  DEFAULT_AVATAR_SMALL_SRC,
} from "@/constants";
import {
  isAtLeastRunMaster,
  isFullMember,
  getBadgeType,
  onMapImgError,
  getMaxRigs,
  getMaxAttendees,
} from "@/lib";
import RunAttendeeCard from "@/components/events/RunAttendeeCard";
import RunRsvp from "@/components/events/RunRsvp";
import Filter from "@/components/login/Filter";
import {
  getStat,
  getEventDate,
  getEventTime,
} from "@/components/events/NonRunEventDetails";
import Icon from "@/components/common/Icon";
import Badge from "@/components/common/Badge";
import ErrorMessage from "@/components/utility/ErrorMessage";

import Styles from "./runEventDetails.module.scss";

interface RunEventDetailsProps {
  eventId: string;
}

const RunEventDetails: FC<RunEventDetailsProps> = ({ eventId }) => {
  const { loading, error, data } = useQuery(RUN_EVENT_QUERY, {
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
  const guestPassengerCount = allAttendees.reduce(
    (acc: number, attendee: any) => acc + get(attendee, "guestCount", 0),
    0
  );
  const memberCount = allAttendees.length;
  const attendeeCount = guestPassengerCount + memberCount;
  const rigCount = allAttendees.filter((attendee: any) => {
    return !attendee.isRider;
  }).length;

  const userStatus = () => {
    const rsvp = event.rsvps.find((rsvp: any) => rsvp.member.id === myself.id);

    if (rsvp) {
      return rsvp.status;
    }

    return "NONE";
  };

  const userRsvp = () =>
    event.rsvps.find((rsvp: any) => rsvp.member.id === myself.id);

  const encodedRallyAddress = encodeURIComponent(
    event.rallyAddress || event.address || "Colorado"
  );

  // const encodedAddress =
  //   get(event, 'trail.trailheadCoords') ||
  //   encodeURIComponent(event.address || 'Colorado');

  const EVENT_IMAGE = get(event, "featuredImage.url", DEFAULT_EVENT_SRC);

  const TRAIL_IMAGE = get(event, "trail.featuredImage.url");

  const HOST_IMAGE = get(
    event,
    "host.avatar.smallUrl",
    DEFAULT_AVATAR_SMALL_SRC
  );

  const eventType = EventTypes[event.type as keyof typeof EventTypes];
  const fullUp =
    (event.maxAttendees &&
      event.maxAttendees !== -1 &&
      event.maxAttendees <= attendeeCount) ||
    (event.maxRigs && event.maxRigs !== -1 && event.maxRigs <= rigCount);

  return (
    <>
      <div className={Styles["event__header"]}>
        <div className={Styles["event__date"]}>
          {isPastEvent
            ? "Past Event"
            : format(new Date(event.startTime), dateFormatFull)}
          <Filter roleCheck={isAtLeastRunMaster} typeCheck={isFullMember}>
            {" "}
            <small>
              <Link to={`/event/${eventId}/edit`}>Edit</Link>
            </small>
          </Filter>
        </div>
        <div className={Styles["event__title"]}>
          <h2 className={Styles["event__title--heading"]}>{event.title}</h2>
          {event.trailDifficulty && event.trailDifficulty !== "UNKNOWN" && (
            <Badge
              type={getBadgeType(event.trailDifficulty)}
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
        <RunRsvp
          user={myself}
          userStatus={userStatus()}
          eventId={eventId}
          attendeeCount={attendeeCount}
          rigCount={rigCount}
          pastEvent={isPastEvent}
          userRsvp={userRsvp()}
          isHost={event.host.id === myself.id}
          maxRigs={event.maxRigs}
          maxAttendees={event.maxAttendees}
          fullUp={fullUp}
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
              <small>Run Leader</small>
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

            {event.maxRigs && event.maxRigs > -1 && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="count">
                    Max Rigs
                  </Icon>
                </dt>
                <dd>{getMaxRigs(event.maxRigs)}</dd>
              </>
            )}

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

            {event.rallyAddress && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="location">
                    Rally Address
                  </Icon>
                </dt>
                <dd>
                  {event.rallyAddress}
                  <br />
                  <small>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodedRallyAddress}`}
                    >
                      Directions
                    </a>
                  </small>
                </dd>
              </>
            )}
            {event.address && !event.rallyAddress && (
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
          {event.rallyAddress && (
            <p>
              <img
                width="250"
                height="100"
                src={`https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=250x100&maptype=roadmap&markers=color:red%7Csize:small%7C${encodeURIComponent(
                  event.rallyAddress
                )}&center=${encodeURIComponent(event.rallyAddress)}&key=${
                  import.meta.env.GOOGLE_MAPS_API_KEY
                }`}
                alt={`${event.title} map`}
                onError={onMapImgError}
                className={Styles["event__map-image"]}
              />
            </p>
          )}
          {event.address && !event.rallyAddress && (
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
          {TRAIL_IMAGE && <img src={TRAIL_IMAGE} alt={event.trail.name} />}
          {EVENT_IMAGE && !TRAIL_IMAGE && (
            <img src={EVENT_IMAGE} alt={event.title} />
          )}
        </section>

        {event.description && (
          <section
            className={Styles["event__section"]}
            aria-label="Description"
          >
            {parse(event.description)}
          </section>
        )}
        {event.trail && (
          <section>
            {event.trail.description && !!event.trail.description && (
              <>
                <h3>{event.trail.name} Trail Information</h3>
                {parse(event.trail.description)}
              </>
            )}

            {/* <CurrentWeather coords={event.trail.trailheadCoords} /> */}

            {event.trailNotes && (
              <>
                <h3>Run Leader Notes</h3>
                <p>
                  <strong>Comments</strong>: {event.trailNotes}
                </p>
              </>
            )}
            {/* {(event.trail.avgDifficulty ||
              event.trail.avgRatings ||
              event.trail.favoriteCount ||
              event.trail.conditionsLastReported) && (
              <>
                <h4>Member Notes</h4>
                <p>
                  {event.trail.avgDifficulty && (
                    <>
                      <strong>Difficulty</strong>:{' '}
                      {trailDifficulties[event.trail.avgDifficulty]}
                      <br />
                    </>
                  )}
                  {!Number.isNaN(event.trail.avgRatings) && (
                    <>
                      <strong>Quality Rating</strong>:{' '}
                      {event.trail.avgRatings > 0 ? (
                        <>{event.trail.avgRatings}/5</>
                      ) : (
                        <>None</>
                      )}
                      <br />
                    </>
                  )}
                  <strong>Favorites</strong>:{' '}
                  {event.trail.favoriteCount}
                  <br />
                  <strong>Conditions</strong>:{' '}
                  {trailConditions[event.trail.currentConditions] ||
                    'Unknown'}
                  <br />
                  <small>
                    Last reported:{' '}
                    {distanceInWordsToNow(
                      event.trail.conditionsLastReported,
                    ) || 'Never'}
                  </small>
                </p>
              </>
            )} */}
          </section>
        )}
        <section className={Styles["event__section"]}>
          <h3>Attendees</h3>

          <div className={Styles["event__stats"]}>
            <div className={Styles["event__stat"]}>
              {getStat(rigCount, event.maxRigs, "rig", "rigs")}
            </div>
            <div className={Styles["event__stat"]}>
              {getStat(
                attendeeCount,
                event.maxAttendees,
                "attendee",
                "attendees"
              )}
            </div>
            <Filter roleCheck={isAtLeastRunMaster} typeCheck={isFullMember}>
              <div className={Styles["event__stat"]}>
                <a>+</a>
              </div>
            </Filter>
          </div>

          <div className={Styles["event__attendees"]}>
            <div>
              <h4
                className={cn(
                  Styles["event__card-heading"],
                  Styles["event__card-heading--first"]
                )}
              >
                Run Leader
              </h4>
              <RunAttendeeCard key={event.host.id} rsvp={hostRsvp} isLeader />
            </div>
            <div>
              <h4 className={Styles["event__card-heading"]}>Attendees</h4>
              {rsvpsSansHost.map((attendee: any) => (
                <RunAttendeeCard key={attendee.member.id} rsvp={attendee} />
              ))}
            </div>
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

export default RunEventDetails;

/*
  
  Old card:

  <RigbookCard
    key={attendee.member.id}
    user={attendee.member}
  />
*/

/*

Ideal State:

<Page>
  <Title />

  <Stats>
    <RigsAllowed />
    <AttendeesAllowed />
    <TotalMiles />
    <HighestElevation />
  </Stats>

  <RSVP />

  <OptionalRecurringEventInfo />
  <StartDateTime />
  <EndDateTime />

  <RallyPoint />

  <AddToCalendar>
    <Google />
    <ICal />
  </AddToCalendar>

  <Tabs>
    <Details>
      <Difficulty />
      <TripType />
      <Region />

      <TerrainExpected />
      <RecommendedCapabilities />
    </Details>

    <Attendees>
      <Host>
        <RigPhoto />
        <Avatar />
        <RunLeaderCount />

        <Name />
        <TitlesOrOffices />

        <SendMessage />

        <Hometown />
        <ProfileLink />
        <MemberSince />
      </Host>

      <Attending>
        <Count />

        <Attendee>
          <Avatar />
          <PassengersCount />

          <Name />
          <AccountType />

          <AddlInfo>
            <Name />
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

        <Riders />
      </Attending>
      <NotAttending />
    </Attendees>

    <Location>
      <Meta>
        <AvgRatings />
        <AvgDifficulty />
        <NumOfFavorites />
      </Meta>
    
      <Description />
      <Map />

    </Location>

    <Comments>
      <CommentCount />

      <Comment>
        <Avatar />
        <Name />
        <Date />
        <Message />
      </Comment>
    </Comments>
  </Tabs>
</Page>

*/
