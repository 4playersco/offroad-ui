import { FC } from "react";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";

import RunEventDetails from "../RunEventDetails";
import NonRunEventDetails from "../NonRunEventDetails";

import EVENT_QUERY from "./event.graphql";

interface EventIndexProps {
  id: string;
}

const EventIndex: FC<EventIndexProps> = ({ id }) => {
  const { loading, error, data } = useQuery(EVENT_QUERY, {
    variables: { eventId: id },
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }
  if (error) {
    toast.error(error.message.replace("GraphQL error: ", ""));
    console.error(error);
    // return <ErrorMessage error={error} />;
    return null;
  }

  const { event } = data;

  return (
    <>
      {event.type === "RUN" ? (
        <RunEventDetails eventId={event.id} />
      ) : (
        <NonRunEventDetails eventId={event.id} />
      )}
    </>
  );
};

export default EventIndex;
