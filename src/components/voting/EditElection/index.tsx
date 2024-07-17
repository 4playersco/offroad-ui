import { FC, useCallback, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";

import { dateFormatForm } from "@/constants";
import AddOffice from "../AddOffice";

import ELECTION_CANDIDATES_QUERY from "./candidates.graphql";
import SUBMIT_ELECTION_MUTATION from "../data/submitElection.graphql";
import REMOVE_ELECTION_MUTATION from "./removeElection.graphql";
import Button from "../../common/Button";

type Race = {
  id: number;
  title: string;
  candidates: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
};

interface EditElectionProps {
  election: string;
}

const EditElection: FC<EditElectionProps> = ({ election }) => {
  return null;
  // const [title, setTitle] = useState<string>("");
  // const [startTime, setStartTime] = useState<Date>();
  // const [endTime, setEndTime] = useState<Date>();
  // const [races, setRaces] = useState<Race[]>([]);

  // const { loading, error, data } = useQuery(ELECTION_CANDIDATES_QUERY, {
  //   variables: { id: election },
  // });

  // const [editElection] = useMutation(SUBMIT_ELECTION_MUTATION);
  // const [removeElection] = useMutation(REMOVE_ELECTION_MUTATION);

  // const updateOffices = useCallback((office: any) => {
  //   office.id = Date.now();
  //   setRaces((existingRaces) => [
  //     ...existingRaces,
  //     office: { ...existingRaces.office, id: office.id
  //   ]);
  // }, []);

  // // const updateState = (event: any) => {
  // //   this.setState({
  // //     [e.target.id]: e.target.value,
  // //   });
  // // };

  // const handleUpdateElection = useCallback(async () => {
  //   await editElection({
  //     variables: {
  //       election: {
  //         electionName: title,
  //         startTime: startTime,
  //         endTime: endTime,
  //         races: races.map(({ id, ...race }) => ({
  //           ...race,
  //           candidates: race.candidates.map((candidate) => ({
  //             id: candidate.id,
  //           })),
  //         })),
  //       },
  //     },
  //   });
  //   // @TODO Show update message
  // }, [editElection, title, startTime, endTime, races]);

  // const handleRemoveElection = useCallback(async () => {
  //   if (window.confirm("Are you sure you want to delete this election?")) {
  //     await removeElection({ variables: { id: data.getElection.id } });
  //   }
  //   // @TODO Show remove message
  // }, [removeElection, data]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // const { electionCandidates, getElection } = data;

  // return (
  //   <>
  //     <h3>Edit {getElection.electionName}</h3>

  //     <p>
  //       <label htmlFor="title">
  //         Title&nbsp;
  //         <input
  //           name="title"
  //           id="title"
  //           value={title || getElection.electionName}
  //           onChange={updateState}
  //           type="text"
  //         />
  //       </label>
  //     </p>

  //     <p>
  //       <label htmlFor="startDate">
  //         Start Time&nbsp;
  //         <input
  //           name="startDate"
  //           id="startDate"
  //           defaultValue={
  //             startTime?.toString() ||
  //             format(new Date(getElection.startTime), dateFormatForm)
  //           }
  //           min={format(Date.now(), dateFormatForm)}
  //           onChange={updateState}
  //           type="date"
  //           pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
  //         />
  //       </label>

  //       <label htmlFor="endDate">
  //         End Date&nbsp;
  //         <input
  //           name="endDate"
  //           id="endDate"
  //           defaultValue={
  //             endTime?.toString() ||
  //             format(new Date(getElection.endTime), dateFormatForm)
  //           }
  //           onChange={updateState}
  //           type="date"
  //           pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
  //         />
  //       </label>
  //     </p>

  //     {races.map((race) => (
  //       <div key={race.id}>
  //         {race.title}
  //         {race.candidates.map((candidate) => (
  //           <span key={candidate.id}>{candidate.firstName}</span>
  //         ))}
  //       </div>
  //     ))}

  //     <AddOffice
  //       electionCandidates={electionCandidates}
  //       onSubmit={updateOffices}
  //     />

  //     <button>Cancel</button>

  //     <Button type="button" onClick={handleUpdateElection}>
  //       Update Election
  //     </Button>
  //     <button type="button" onClick={handleRemoveElection}>
  //       Delete Election
  //     </button>
  //   </>
  // );
};

export default EditElection;
