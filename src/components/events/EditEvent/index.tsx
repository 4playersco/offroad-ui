import { FC } from "react";
import { useQuery, useMutation } from "@apollo/client";
import get from "lodash/get";
import { Link } from "react-router-dom";

import RUN_EVENT_QUERY from "@/components/events/RunEventDetails/runEventDetails.graphql";
import NON_RUN_EVENT_QUERY from "@/components/events/NonRunEventDetails/nonRunEventDetails.graphql";
import UPCOMING_EVENTS_QUERY from "@/components/events/EventList/eventList.graphql";

import EventForm from "../EventForm";
import DeleteEvent from "../DeleteEvent";
import ErrorMessage from "@/components/utility/ErrorMessage";
import { uploadImage } from "@/lib";
// import UploadImagePreview from '../../common/UploadImagePreview';

import Styles from "./editEvent.module.scss";
import EDIT_EVENT_MUTATION from "./editEvent.graphql";
import SETUP_EXISTING_EVENT_QUERY from "./event.graphql";

/**
 * Date round-trip
 *
 * 1. Type received from server: string
 * 2. Initial value: converted string to Date
 * 3.
 */

interface EditEventProps {
  event: string;
}

const EditEvent: FC<EditEventProps> = ({ event: existingEventId }) => {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(SETUP_EXISTING_EVENT_QUERY, {
    variables: { eventId: existingEventId },
  });

  const [
    updateEvent,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(EDIT_EVENT_MUTATION);

  if (queryLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { event } = queryData;
  const successMessage = get(mutationData, "updateEvent.message");

  const handleSubmit = async (
    { startDateTime, endDateTime, image, newImage, ...filteredValues }: any,
    setSubmitting: (value: boolean) => void,
    updateEvent: (value: any) => void
  ) => {
    let eventValues = {
      ...filteredValues,
      startTime: startDateTime,
      endTime: endDateTime,
      featuredImage: image,
      newFeaturedImage: null,
    };

    setSubmitting(true);

    if (newImage) {
      const cloudinaryResults = await uploadImage(newImage, "events");
      eventValues.newFeaturedImage = cloudinaryResults;
    }

    updateEvent({
      variables: eventValues,
      refetchQueries: [
        {
          query: UPCOMING_EVENTS_QUERY,
          variables: { page: 1 },
        },
        {
          query: event.type === "RUN" ? RUN_EVENT_QUERY : NON_RUN_EVENT_QUERY,
          variables: { eventId: existingEventId },
        },
      ],
    });

    setSubmitting(false);
  };

  const initialValues = {
    id: existingEventId,
    type: event.type,
    startDateTime: new Date(event.startTime),
    endDateTime: new Date(event.endTime),
    title: event.title,
    description: event.description,
    address: event.address,
    trailDifficulty: event.trailDifficulty,
    trailNotes: event.trailNotes,
    rallyAddress: event.rallyAddress || "",
    membersOnly: event.membersOnly || false,
    host: event.host.username,
    trail: (event.trail && event.trail.id) || "0",
    image: get(event, "featuredImage.url", null),
    imagePublicId: get(event, "featuredImage.publicId", null),
    newImage: null,
    maxAttendees: event.maxAttendees || -1,
    maxRigs: event.maxRigs || -1,
    changeDisabled: event.changeDisabled || false, // can change rsvp
  };

  return (
    <>
      <div className={Styles.title}>
        <h3>Edit Event</h3>
        <DeleteEvent id={existingEventId} />
      </div>

      <EventForm
        initialValues={initialValues}
        onSubmit={(values, setSubmitting) =>
          handleSubmit(values, setSubmitting, updateEvent)
        }
        runLeaders={queryData.runLeaders}
        trails={queryData.trails}
        loading={mutationLoading}
        error={mutationError}
        submitLabel="Edit Event"
      />
      {successMessage && (
        <p>
          {successMessage}.{" "}
          <Link to={`/event/${existingEventId}`}>View event</Link>.
        </p>
      )}
    </>
  );
};

export default EditEvent;
