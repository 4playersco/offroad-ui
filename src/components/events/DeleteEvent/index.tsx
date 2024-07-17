import { FC, useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";

import DELETE_EVENT_MUTATION from "./deleteEvent.graphql";
import PAST_EVENTS_QUERY from "../EventList/pastEvents.graphql";
import UPCOMING_EVENTS_QUERY from "../EventList/upcomingEvents.graphql";

interface DeleteEventProps {
  id: string;
}

const DeleteEvent: FC<DeleteEventProps> = ({ id }) => {
  const nav = useNavigate();
  const [deleteEvent, { error, loading }] = useMutation(DELETE_EVENT_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [
      { query: UPCOMING_EVENTS_QUERY },
      { query: PAST_EVENTS_QUERY },
    ],
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (error) {
      toast.error(String(error));
    }
  }, [error]);

  const handleEventDelete = useCallback(() => {
    async function asyncDelete() {
      if (window.confirm("Are you sure you want to delete this event?")) {
        try {
          const result = await deleteEvent();

          toast.success(result.data.deleteEvent.message);
          nav("/events");
        } catch (e) {
          console.error(e);
        }
      }
    }

    asyncDelete();
  }, [deleteEvent, nav]);

  return (
    <Button disabled={loading || Boolean(error)} onClick={handleEventDelete}>
      Delete
    </Button>
  );
};

export default DeleteEvent;
