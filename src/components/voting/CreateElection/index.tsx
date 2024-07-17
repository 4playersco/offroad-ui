import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { format, addWeeks } from "date-fns";

import { dateFormatForm } from "@/constants";
import AddOffice from "../AddOffice";
import { DateTimePickerField } from "../../utility/DateFields";

import ELECTION_CANDIDATES_QUERY from "./candidates.graphql";
import SUBMIT_ELECTION_MUTATION from "../data/submitElection.graphql";

const CreateElection = () => {
  return null;
  // const [title, setTitle] = useState("");
  // const [startTime, setStartTime] = useState(
  //   format(Date.now(), dateFormatForm)
  // );
  // const [endTime, setEndTime] = useState(
  //   format(addWeeks(Date.now(), 2), dateFormatForm)
  // );
  // const [races, setRaces] = useState([]);
  // const history = useHistory();

  // const updateOffices = useCallback(
  //   (office) => {
  //     office.id = Date.now();
  //     setRaces([...races, office]);
  //   },
  //   [setRaces, races]
  // );

  // const handleSubmit = useCallback(
  //   (submit) => {
  //     const submission = async () => {
  //       await submit();
  //       history.push("/admin");
  //       // @TODO Refetch queries?
  //     };
  //     submission(submit);
  //   },
  //   [history]
  // );

  // return (
  //   <Query query={ELECTION_CANDIDATES_QUERY}>
  //     {({ loading, error, data }) => {
  //       if (loading) {
  //         return <div>Loading...</div>;
  //       }
  //       if (error) {
  //         return <div>Error: {error.message}</div>;
  //       }

  //       const { electionCandidates } = data;

  //       return (
  //         <>
  //           <h3>Create New Election</h3>

  //           <p>
  //             <label htmlFor="title">
  //               Title&nbsp;
  //               <input
  //                 name="title"
  //                 id="title"
  //                 value={title}
  //                 onChange={(e) => setTitle(e.target.value)}
  //                 type="text"
  //               />
  //             </label>
  //           </p>

  //           <p>
  //             <label htmlFor="startDate">
  //               Start Time&nbsp;
  //               <input
  //                 name="startDate"
  //                 id="startDate"
  //                 defaultValue={startTime}
  //                 min={format(Date.now(), dateFormatForm)}
  //                 onChange={(e) => setStartTime(e.target.value)}
  //                 type="date"
  //                 pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
  //               />
  //             </label>

  //             <label htmlFor="endDate">
  //               End Date&nbsp;
  //               <input
  //                 name="endDate"
  //                 id="endDate"
  //                 defaultValue={endTime}
  //                 onChange={(e) => setEndTime(e.target.value)}
  //                 type="date"
  //                 pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
  //               />
  //             </label>
  //           </p>

  //           {races.map((race) => (
  //             <div key={race.id}>
  //               {race.title}
  //               {race.candidates.map((candidate) => (
  //                 <span key={candidate.id}>{candidate.firstName}</span>
  //               ))}
  //             </div>
  //           ))}

  //           <AddOffice
  //             candidates={electionCandidates}
  //             handleSubmit={updateOffices}
  //           />

  //           <button>Cancel</button>

  //           <Mutation
  //             mutation={SUBMIT_ELECTION_MUTATION}
  //             variables={{
  //               election: {
  //                 electionName: title,
  //                 startTime,
  //                 endTime,
  //                 races: races.map((race) => {
  //                   delete race.id;
  //                   race.candidates = race.candidates.map((candidate) => ({
  //                     id: candidate.id,
  //                   }));
  //                   return race;
  //                 }),
  //               },
  //             }}
  //           >
  //             {(submitElection) => (
  //               <button
  //                 type="button"
  //                 onClick={() => handleSubmit(submitElection)}
  //               >
  //                 Create Election
  //               </button>
  //             )}
  //           </Mutation>
  //         </>
  //       );
  //     }}
  //   </Query>
  // );
};

export default CreateElection;
