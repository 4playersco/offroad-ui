import { FC } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import { dateFormat } from "@/constants";

import GET_ACTIVE_ELECTIONS_WITH_RESULTS from "./activeElectionsWithResults.graphql";
import GET_ACTIVE_ELECTIONS from "./activeElectionsWithResults.graphql";

type Race = {
  id: string;
  title: string;
  results: {
    candidate: {
      id: string;
      firstName: string;
      lastName: string;
    };
    count: number;
  }[];
};

type Election = {
  id: string;
  electionName: string;
  endTime: string;
  races: Race[];
};

interface PollingPlaceProps {
  admin?: boolean;
}

const getElectionQuery = (admin: boolean) =>
  admin ? GET_ACTIVE_ELECTIONS_WITH_RESULTS : GET_ACTIVE_ELECTIONS;

const getElectionLink = (admin: boolean, id: string) =>
  admin
    ? {
        pathname: "elections",
        query: { edit: id },
      }
    : {
        pathname: "vote",
        query: { poll: id },
      };

const PollingPlace: FC<PollingPlaceProps> = ({ admin = false }) => {
  const { loading, error, data } = useQuery(getElectionQuery(admin));

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h3>Polling Place</h3>

      {data.getActiveElections.length <= 0 ? (
        <div>No active polls</div>
      ) : (
        <>
          ✅ Active Polls:
          <ul>
            {data.getActiveElections.map((election: Election) => (
              <li key={election.id}>
                <Link to={getElectionLink(admin, election.id)}>
                  {election.electionName}
                </Link>
                <br />
                <small>
                  Ends: {format(new Date(election.endTime), dateFormat)}
                </small>
                {election.races && (
                  <>
                    Results:
                    {election.races.map((race) => {
                      return (
                        <div key={race.id}>
                          {race.results.map((result) => {
                            const key =
                              result.candidate === null
                                ? null
                                : result.candidate.id;
                            const race =
                              result.candidate === null
                                ? "Abstained"
                                : `${result.candidate.firstName} ${result.candidate.lastName}`;
                            return (
                              <div key={key}>
                                {race}: {result.count}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

{
  /* ⛔ Upcoming Polls:
  <ul>
    <li>
      2019 Runs
      <br />
      <small>Starts: 11/30/18, Ends: 1/1/19</small>
    </li>
  </ul>
  
  ⛔ Closed Polls:
  <ul>
    <li>
      2018 Executive Committee Election
      <br />
      <small>Ended 12/1/17</small>
      <Results />
    </li>
  </ul> */
}

export default PollingPlace;
