import { FC } from "react";
import { useQuery } from "@apollo/client";

import GET_ELECTION_QUERY from "./election.graphql";
import GET_USER_VOTE from "./userVote.graphql";
import Race from "../Race";

type Race = {
  id: string;
  title: string;
  desc: string;
  candidates: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: {
      url: string;
    };
  }[];
  results: {
    candidate: {
      id: string;
    };
    count: number;
  }[];
};

type VoteInfo = {
  candidate: {
    id: string;
  };
};

interface RaceProps {
  electionName: string;
  race: Race;
}

const RaceWrapper: FC<RaceProps> = ({ electionName, race }) => {
  const {
    loading: voteLoading,
    error: voteError,
    data: voteData,
  } = useQuery(GET_USER_VOTE, {
    variables: {
      ballot: race.id,
    },
  });

  const getVoteId = (voteInfo: VoteInfo[]) => {
    // Is there a vote?
    if (voteInfo.length <= 0) {
      return false;
    }

    // Was it an abstain vote?
    if (voteInfo[0].candidate === null) {
      return 1;
    }

    // It was a vote for a person
    return voteInfo[0].candidate.id;
  };

  if (voteLoading) {
    return <div>Loading...</div>;
  }
  if (voteError) {
    return <div>Error: {voteError.message}</div>;
  }

  return (
    <Race
      pollId={`${electionName.replace(" ", "_")}_${race.title.replace(
        " ",
        "_"
      )}`}
      userVotedFor={getVoteId(voteData.getUserVote) as string}
      {...race}
    />
  );
};

interface ElectionProps {
  id: string;
}

const Election: FC<ElectionProps> = ({ id = null }) => {
  const { loading, error, data } = useQuery(GET_ELECTION_QUERY, {
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (id === null) {
    return null;
  }

  return (
    <>
      <h2>{data.getElection.electionName} Election</h2>

      {data.getElection.races.map((race: Race) => (
        <RaceWrapper
          key={race.id}
          race={race}
          electionName={data.getElection.electionName}
        />
      ))}
    </>
  );
};

export default Election;
