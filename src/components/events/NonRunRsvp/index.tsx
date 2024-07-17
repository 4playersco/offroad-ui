import { useState, useCallback, FC } from "react";
import { useQuery, useMutation } from "@apollo/client";
import cn from "classnames";
import get from "lodash/get";
import toast from "react-hot-toast";

import RSVP_MUTATION from "./rsvp.graphql";
// Refetch
import NON_RUN_EVENT_QUERY from "../NonRunEventDetails/nonRunEventDetails.graphql";
import UPCOMING_EVENTS_QUERY from "../EventList/eventList.graphql";
import NEXT_EVENT_QUERY from "../../dashboard/NextEvent/nextEvent.graphql";
import MEMBERSHIP_QUERY from "../../user/Roster/roster.graphql";

import { SideModal } from "../../common/Modal";
import Steps from "../../common/Steps";
import Icon from "../../common/Icon";
import NumberInput from "../../common/forms/NumberInput";
import Button from "../../common/Button";

import Styles from "./rsvp.module.scss";

// interface RsvpProps {
//   userStatus: string;
//   attendeeCount: number;
//   userId: string;
//   eventId: string;
//   pastEvent: boolean;
// }

type NonRunRsvpProps = {
  userStatus: string;
  attendeeCount: number;
  rsvpCount: number;
  user: any;
  eventId: string;
  pastEvent: boolean;
  userRsvp: any;
  remainingSpots?: number;
  fullUp?: boolean;
  changeDisabled?: boolean;
};

const NonRunRsvp: FC<NonRunRsvpProps> = ({
  userStatus,
  attendeeCount,
  rsvpCount,
  user,
  eventId,
  pastEvent,
  userRsvp,
  remainingSpots = 20,
  fullUp = false,
  changeDisabled = false,
}) => {
  const userId = user.id;
  const [localUserStatus, setLocalUserStatus] = useState(userStatus);
  const [guestsCountInVehicle, setGuestsCountInVehicle] = useState(
    get(userRsvp, "guestCount", 0) || 0
  );
  const [modalIsOpen, setIsOpen] = useState(false);

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
  const [
    setRsvp,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(RSVP_MUTATION);

  if (!mutationLoading && mutationError) {
    toast.error(mutationError.message.replace("GraphQL error: ", ""));
  }

  // if (!mutationLoading && !mutationError && mutationData) {
  // re-renders cause many toasts
  //   toast.success(mutationData.setRSVP.message);
  // }

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
      await setRsvp({
        variables: {
          rsvp: {
            userId,
            eventId,
            status: "GOING",
            guestCount: guestsCountInVehicle,
            vehicle: null,
          },
        },
        refetchQueries: [
          {
            query: NON_RUN_EVENT_QUERY,
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
          },
        },
        refetchQueries: [
          {
            query: NON_RUN_EVENT_QUERY,
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
    switch (localUserStatus) {
      case "GOING":
        return guestsCountInVehicle
          ? `You + ${guestsCountInVehicle} went`
          : `You went`;
      case "MAYBE":
      case "CANT_GO":
      default:
        return `You didn't go`;
    }
  }, [localUserStatus, guestsCountInVehicle]);

  const getPastCountText = useCallback(() => {
    switch (attendeeCount) {
      case 0:
        return `Nobody went`;
      case 1:
        return `1 person went`;
      default:
        return `${attendeeCount} people went`;
    }
  }, [attendeeCount]);

  const getRsvpText = useCallback(() => {
    switch (localUserStatus) {
      case "GOING":
        return guestsCountInVehicle
          ? `You + ${guestsCountInVehicle} going`
          : `You're going`;
      case "MAYBE":
        return `You're considering it`;
      case "CANT_GO":
        return `You're not going`;
      default:
        return "Are you going?";
    }
  }, [localUserStatus, guestsCountInVehicle]);

  const getCountText = useCallback(() => {
    switch (attendeeCount) {
      case 0:
        return `0 people`;
      case 1:
        return `1 person`;
      default:
        return `${attendeeCount} people`;
    }
  }, [attendeeCount]);

  const handleGuestCountChange = useCallback(
    (value: any) => {
      setGuestsCountInVehicle(+value);
    },
    [setGuestsCountInVehicle]
  );

  const yesDisabled =
    mutationLoading || (fullUp && localUserStatus !== "GOING");
  const noDisabled = mutationLoading || localUserStatus === "CANT_GO";

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
    [Styles["icon-no--not-selected"]]: localUserStatus === "GOING",
    [Styles["icon--disabled"]]: mutationLoading,
  });

  if (queryLoading) {
    return "Loading...";
  }

  const cost = false;

  return pastEvent ? (
    <div className={Styles["rsvp__status--past"]}>
      {getPastRsvpText()}{" "}
      <span className={Styles["rsvp__count--past"]}>{getPastCountText()}</span>
    </div>
  ) : (
    <div className={Styles["rsvp__status--upcoming"]}>
      <div className={Styles["rsvp__attendees"]}>
        {getRsvpText()}
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
          <h4>Attendees</h4>
          <p>
            How many guests are you bringing?
            <br />
            <NumberInput
              min={0}
              max={remainingSpots}
              defaultValue={guestsCountInVehicle}
              onChange={handleGuestCountChange}
            />{" "}
          </p>
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
          <p>I am over 18 years of age.</p>
          <p>
            I have read and understand the bylaws and agree to adhere to them.
          </p>
          <p>
            I have read and understand the standard operating rules and agree to
            adhere to them.
          </p>
          {changeDisabled && (
            <p className={Styles["change-disabled"]}>
              This event has been set to allow one RSVP. I understand that I
              cannot change my RSVP once I submit it.
            </p>
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

export default NonRunRsvp;
