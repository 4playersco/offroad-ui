import { Component, FC, useCallback, useState } from "react";
import { useMutation } from "@apollo/client";

import RigbookCard from "@/components/user/RigbookCard";

import SUBMIT_VOTE_MUTATION from "./race.graphql";

type Vote = {
  ballot: string;
  dateTime: string;
  candidate: string;
};

interface RaceProps {
  userVotedFor: string;
  id: string;
  title: string;
  description?: string;
  candidates: any[];
  pollId: string;
}

const Race: FC<RaceProps> = ({
  userVotedFor,
  id,
  title,
  description,
  candidates,
  pollId,
}) => {
  const [vote, setVote] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");

  const [submitVote, { data }] = useMutation(SUBMIT_VOTE_MUTATION, {
    variables: {
      vote: {
        ballot: id,
        dateTime: Date.now(),
        candidate: vote,
      },
    },
  });

  const handleCastBallot = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      // Record vote
      await submitVote();

      // Disable form
      setIsDisabled(true);
    },
    [submitVote]
  );

  const handleAbstain = useCallback(() => {
    // Remove selection
    setVote("");
    setIsDisabled(true);

    submitVote();
  }, [submitVote]);

  const removeBallot = (message = "") => {
    setSubmissionMessage(message);
  };

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVote(event.target.value);
  };

  return (
    <section className="race">
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      <p>
        Click a candidate to select. When you are ready, click
        &ldquo;Vote&rdquo; button to record your selection. You may only vote
        for one candidate per race and you cannot change your vote. If you want
        to formally decline to vote for a particular race, click the
        &ldquo;Abstain&rdquo; button.
      </p>

      <form onSubmit={handleCastBallot} method="post">
        {data && data.submitVote.message && <h3>{data.submitVote.message}</h3>}
        <fieldset
          className="fieldset"
          disabled={isDisabled}
          aria-busy={isDisabled}
        >
          <ul className="ballot-list">
            {candidates.map((candidate) => {
              const id = `${pollId}_${candidate.id}`;

              return (
                <li key={candidate.id}>
                  <div className="candidate">
                    <input
                      type="radio"
                      id={id}
                      name={pollId}
                      checked={
                        vote === candidate.id || userVotedFor === candidate.id
                      }
                      value={candidate.id}
                      onChange={handleSelection}
                    />
                    <label htmlFor={id}>
                      <RigbookCard user={candidate} />
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
          <button className="vote-button" type="submit" disabled={!vote}>
            Vote
          </button>
          <button
            className="abstain-button"
            type="button"
            onClick={handleAbstain}
          >
            Abstain
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default Race;
