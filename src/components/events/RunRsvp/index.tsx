import { useState, useCallback, FC } from "react";
import { useQuery, useMutation } from "@apollo/client";
import cn from "classnames";
import { Link } from "react-router-dom";
import get from "lodash/get";
import toast from "react-hot-toast";

import { SideModal } from "@/components/common/Modal";
import Steps from "@/components/common/Steps";
import Icon from "@/components/common/Icon";
import NumberInput from "@/components/common/forms/NumberInput";
import Button from "@/components/common/Button";

import Styles from "./rsvp.module.scss";
import RSVP_MUTATION from "./rsvp.graphql";
// Refetch
import RUN_EVENT_QUERY from "@/components/RunEventDetails/runEventDetails.graphql";
import UPCOMING_EVENTS_QUERY from "@/components/EventList/eventList.graphql";
import NEXT_EVENT_QUERY from "@/components/dashboard/NextEvent/nextEvent.graphql";
import MEMBERSHIP_QUERY from "@/components/user/Roster/roster.graphql";

interface RunRsvpProps {
  userStatus: string;
  attendeeCount?: number;
  rigCount?: number;
  user: any;
  eventId: string;
  pastEvent: boolean;
  userRsvp: any;
  isHost?: boolean;
  maxAttendees?: number;
  maxRigs?: number;
  fullUp?: boolean;
}

const RunRsvp: FC<RunRsvpProps> = ({
  userStatus,
  attendeeCount = 0, // rsvps + guests
  rigCount = 0, // # of rigs
  user,
  eventId,
  pastEvent,
  userRsvp,
  isHost = false,
  maxAttendees,
  maxRigs,
  fullUp = false,
}) => {
  const userId = user.id;
  const [localUserStatus, setLocalUserStatus] = useState(userStatus);
  const [guestsCountInVehicle, setGuestsCountInVehicle] = useState(
    get(userRsvp, "guestCount", 0)
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isRider, setIsRider] = useState(
    !user.vehicle || (userRsvp && userRsvp.isRider)
  );

  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(MEMBERSHIP_QUERY, {
    variables: {
      accountStatus: ["ACTIVE"],
      accountType: ["FULL", "ASSOCIATE", "EMERITUS"],
      role: [],
      office: [],
      title: [],
    },
  });
  const [setRsvp, { loading: mutationLoading, error: mutationError }] =
    useMutation(RSVP_MUTATION);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    // reset rsvp state
  }, [setIsOpen]);

  const handleOpenModal = useCallback(() => {
    // Open modal
    setIsOpen(true);
  }, [setIsOpen]);

  const handleYesClick = useCallback(() => {
    const set = async () => {
      try {
        await setRsvp({
          variables: {
            rsvp: {
              userId,
              eventId,
              status: "GOING",
              guestCount: isRider ? 0 : guestsCountInVehicle,
              vehicle: !isRider && user.vehicle ? user.vehicle.id : null,
              isRider: isRider,
            },
          },
          refetchQueries: [
            {
              query: RUN_EVENT_QUERY,
              variables: { eventId },
            },
            {
              query: UPCOMING_EVENTS_QUERY,
              variables: { page: 1 },
            },
            {
              query: NEXT_EVENT_QUERY,
            },
          ],
        });

        if (localUserStatus !== "GOING") {
          setLocalUserStatus("GOING");
        }

        if (isRider && guestsCountInVehicle > 0) {
          setGuestsCountInVehicle(0);
        }
      } catch (error) {
        // @ts-ignore
        toast.error(error.message.replace("GraphQL error: ", ""));
      }
    };

    set();

    // Close modal
    setIsOpen(false);
  }, [
    localUserStatus,
    setLocalUserStatus,
    setRsvp,
    userId,
    eventId,
    guestsCountInVehicle,
    setGuestsCountInVehicle,
    user,
    isRider,
  ]);

  const handleNoClick = useCallback(() => {
    if (localUserStatus === "CANT_GO") {
      return;
    }

    const set = async () => {
      await setRsvp({
        variables: {
          rsvp: {
            userId,
            eventId,
            status: "CANT_GO",
            guestCount: 0,
            vehicle: null,
            isRider: false,
          },
        },
        refetchQueries: [
          {
            query: RUN_EVENT_QUERY,
            variables: { eventId },
          },
          {
            query: UPCOMING_EVENTS_QUERY,
            variables: { page: 1 },
          },
        ],
      });

      setLocalUserStatus("CANT_GO");
    };

    set();
  }, [localUserStatus, setLocalUserStatus, setRsvp, userId, eventId]);

  const getPastRsvpText = useCallback(() => {
    const guests = !isRider ? guestsCountInVehicle : 0;

    switch (localUserStatus) {
      case "GOING":
        return guests ? `You + ${guests} went` : `You went`;
      case "MAYBE":
      case "CANT_GO":
      default:
        return `You didn't go`;
    }
  }, [localUserStatus, guestsCountInVehicle, isRider]);

  const getRsvpText = useCallback(
    (fullUp: boolean) => {
      const guests = get(userRsvp, "guestCount", 0);

      switch (userStatus) {
        case "GOING":
          return guests ? `You + ${guests} going` : `You're going`;
        case "MAYBE":
          return `You're considering it`;
        case "CANT_GO":
          return `You're not going`;
        default:
          return fullUp ? `You're not going` : "Are you going?";
      }
    },
    [userStatus, userRsvp]
  );

  const getCountText = useCallback(
    () =>
      `${rigCount} rig${rigCount === 1 ? "" : "s"}, ${attendeeCount} attendee${
        attendeeCount === 1 ? "" : "s"
      }`,
    [attendeeCount, rigCount]
  );

  const handleGuestCountChange = useCallback(
    (value: number) => {
      setGuestsCountInVehicle(+value);
    },
    [setGuestsCountInVehicle]
  );

  const yesDisabled =
    mutationLoading || (fullUp && localUserStatus !== "GOING");
  const noDisabled = mutationLoading || localUserStatus === "CANT_GO" || isHost;

  const yesIconClasses = cn({
    [Styles["icon-yes"]]: localUserStatus === "NONE" && !fullUp,
    [Styles["icon-yes--selected"]]: localUserStatus === "GOING",
    [Styles["icon-yes--not-selected"]]:
      localUserStatus === "CANT_GO" && !fullUp,
    [Styles["icon--disabled"]]:
      mutationLoading || (fullUp && localUserStatus !== "GOING"),
  });

  const noIconClasses = cn({
    [Styles["icon-no"]]: localUserStatus === "NONE",
    [Styles["icon-no--selected"]]: localUserStatus === "CANT_GO",
    [Styles["icon-no--not-selected"]]: localUserStatus === "GOING" && !isHost,
    [Styles["icon--disabled"]]: mutationLoading || isHost,
  });

  if (queryLoading) {
    return "Loading...";
  }

  const cost = false;
  const diff = (maxAttendees || -1) - attendeeCount;
  const remainingAttendeeSpots = diff >= 0 ? diff : 100;

  const { vehicle } = user;

  return pastEvent ? (
    <div className={Styles["rsvp__status--past"]}>
      {getPastRsvpText()}{" "}
      <span className={Styles["rsvp__count--past"]}>{getCountText()}</span>
    </div>
  ) : (
    <div className={Styles["rsvp__status--upcoming"]}>
      <div className={Styles["rsvp__attendees"]}>
        {getRsvpText(fullUp)}
        <span className={Styles["rsvp__count"]}>{getCountText()}</span>
      </div>
      <div className={Styles["rsvp__actions"]}>
        <button
          className={Styles["rsvp__button"]}
          disabled={yesDisabled}
          onClick={handleOpenModal}
        >
          <Icon icon="success" className={yesIconClasses}>
            Yes
          </Icon>
        </button>
        <button
          className={Styles["rsvp__button"]}
          disabled={noDisabled}
          onClick={handleNoClick}
        >
          <Icon icon="fail" className={noIconClasses}>
            No
          </Icon>
        </button>
      </div>

      <SideModal title="RSVP" isOpen={modalIsOpen} onClose={handleCloseModal}>
        <div>
          {cost && <Steps />}
          <h4>Vehicle</h4>

          {vehicle ? (
            <>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </>
          ) : (
            <Link to="/settings/garage">Add a rig to your profile</Link>
          )}
          <br />

          {!isHost && (
            <label htmlFor="is-rider">
              <input
                name="is-rider"
                type="checkbox"
                disabled={!vehicle}
                checked={isRider}
                onChange={() => setIsRider(!isRider)}
              />{" "}
              I am a rider
            </label>
          )}
          {userRsvp && userRsvp.equipment && !isRider && (
            <>
              <h4>Equipment</h4>
              {userRsvp.equipment.map((item: any) => item.concat(", "))}
            </>
          )}
          {!isRider && (
            <>
              <h4>Attendees</h4>
              <p>
                How many passengers are you bringing?
                <br />
                <NumberInput
                  min={0}
                  max={remainingAttendeeSpots}
                  defaultValue={guestsCountInVehicle}
                  onChange={handleGuestCountChange}
                  disabled={remainingAttendeeSpots === 1}
                />{" "}
              </p>
            </>
          )}
          {cost && (
            <>
              <h4>Payment</h4>
              <table>
                <tr>
                  <th></th>
                  <th>Count</th>
                  <th>Cost</th>
                  <th>Sub Total</th>
                </tr>
                <tr>
                  <td>Members</td>
                  <td>3</td>
                  <td>$35</td>
                  <td>$105</td>
                </tr>
                <tr>
                  <td>Guests</td>
                  <td>1</td>
                  <td>$45</td>
                  <td>$45</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td>$150</td>
                </tr>
              </table>
            </>
          )}
          <h4>Agreement</h4>
          {!isRider ? (
            <>
              <p>
                I have a valid driver&apos;s license, valid insurance, and valid
                registration.
              </p>
              <p>All occupants of the vehicle are over 18 years of age.</p>
              <p>
                I have read and understand the bylaws. I will adhere to them and
                ensure that the occupants of my vehicle will do the same.
              </p>
              <p>
                I have read and understand the standard operating rules. I will
                adhere to them and ensure that the occupants of my vehicle will
                do the same.
              </p>
              <p>
                I understand that there is risk of vehicular damage, bodily
                injury, and/or death.
              </p>
            </>
          ) : (
            <>
              <p>I am over 18 years of age.</p>
              <p>
                I have read and understand the bylaws and agree to adhere to
                them.
              </p>
              <p>
                I have read and understand the standard operating rules and
                agree to adhere to them.
              </p>

              <p>I understand that there is risk of bodily injury or death.</p>
            </>
          )}
          {cost ? (
            <>Pay Now</>
          ) : (
            <Button onClick={handleYesClick}>Confirm</Button>
          )}
        </div>
      </SideModal>
    </div>
  );
};

export default RunRsvp;
