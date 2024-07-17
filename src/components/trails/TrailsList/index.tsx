import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import TRAILS_QUERY from "./trailsList.graphql";

import ErrorMessage from "@/components/utility/ErrorMessage";
import Button from "@/components/common/Button";

// import {
//   StyledEvents,
//   StyledEventsList,
//   StyledEvent,
// } from './eventList.styles';
// import AttendeeStatus from '../AttendeeStatus';
// import {
//   DEFAULT_EVENT_SMALL_SRC,
//   DEFAULT_AVATAR_SMALL_SRC,
// } from '../../../lib/constants';

const TrailsList = () => {
  const { loading, error, data } = useQuery(TRAILS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { trails } = data;

  return (
    <>
      <h2>Trails</h2>
      <div>
        <Button to="/trail/new">Create a trail</Button>
      </div>
      {trails.length > 0 ? (
        <ul>
          {trails
            .sort((a: any, b: any) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }

              // names must be equal
              return 0;
            })
            .map((trail: any) => {
              return (
                <li key={trail.slug}>
                  {trail.name} -{" "}
                  <Link to={`/trail/${trail.slug}/edit`}>Edit</Link>
                </li>
              );
            })}
        </ul>
      ) : (
        <h3>No trails yet</h3>
      )}
    </>
  );
};

export default TrailsList;
