import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import get from "lodash/get";
import { Link } from "react-router-dom";

import CREATE_EVENT_MUTATION from "./createEvent.graphql";
import SETUP_NEW_EVENT_QUERY from "./setupNewEvent.graphql";
import UPCOMING_EVENTS_QUERY from "../EventList/upcomingEvents.graphql";

import EventForm from "@/components/events/EventForm";
import ErrorMessage from "@/components/utility/ErrorMessage";
import { uploadImage } from "@/lib";
import type { FormValues } from "./types";

const CreateEvent = () => {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(SETUP_NEW_EVENT_QUERY);
  const [
    createEvent,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(CREATE_EVENT_MUTATION, {
    refetchQueries: [
      {
        query: UPCOMING_EVENTS_QUERY,
        variables: { page: 1 },
      },
    ],
  });

  const handleSubmit = async (
    {
      startDateTime,
      endDateTime,
      image,
      newImage,
      ...filteredValues
    }: FormValues,
    setSubmitting: (value: boolean) => void,
    createEvent: (arg0: { variables: any }) => void
  ) => {
    let eventValues: any = {
      ...filteredValues,
      startTime: startDateTime,
      endTime: endDateTime,
      featuredImage: image,
      newFeaturedImage: null,
    };

    if (newImage) {
      const cloudinaryResults = await uploadImage(newImage, "events");
      eventValues.newFeaturedImage = cloudinaryResults;
    }

    createEvent({
      variables: eventValues,
    });

    setSubmitting(false);
  };

  if (queryLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const todayStart = new Date();
  todayStart.setHours(10, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(15, 0, 0, 0);

  const hasRunLeaders = queryData.runLeaders && queryData.runLeaders.length > 0;

  const initialValues: FormValues = {
    type: "RUN",
    title: "",
    description: "",
    startDateTime: todayStart,
    endDateTime: todayEnd,
    address: "",
    trailDifficulty: "UNKNOWN",
    trailNotes: "",
    rallyAddress: "",
    membersOnly: false,
    host: hasRunLeaders
      ? queryData.runLeaders[0].username
      : queryData.myself.username,
    trail: "0",
    image: null,
    newImage: null,
    maxAttendees: -1,
    maxRigs: -1,
    changeDisabled: false, // can change rsvp
  };

  const successMessage = get(mutationData, "createEvent.message");

  return (
    <>
      <h3>Create New Event</h3>
      <EventForm
        initialValues={initialValues}
        onSubmit={(values, setSubmitting) =>
          handleSubmit(values, setSubmitting, createEvent)
        }
        runLeaders={hasRunLeaders ? queryData.runLeaders : [queryData.myself]}
        trails={queryData.trails}
        loading={mutationLoading}
        error={mutationError}
        submitLabel="Create Event"
      />
      {successMessage && (
        <p>
          {successMessage}. <Link to="/events">View events</Link>.
        </p>
      )}
    </>
  );
};

export default CreateEvent;
