import { FC, useState } from "react";

import "./addOffice.module.scss";

interface OfficeProps {
  onSubmit: (office: any) => void;
  electionCandidates?: any[];
}

const Office: FC<OfficeProps> = ({ electionCandidates = [], onSubmit }) => {
  return null;
  // const [availableMembers, setAvailableMembers] =
  //   useState<User[]>(electionCandidates);
  // const [candidates, setCandidates] = useState<User[]>([]);
  // const [title, setTitle] = useState<string>("");
  // const [desc, setDesc] = useState<string>("");

  // const addToBallot = (candidate) => {
  //   // Add to list of candidates on ballot
  //   let updatedCandidates = [...candidates];
  //   updatedCandidates.push(candidate);

  //   // Remove from eligible members
  //   let updatedMembers = [...availableMembers];
  //   updatedMembers = updatedMembers.filter(
  //     (member) => member.id !== candidate.id
  //   );

  //   // Update state
  //   setCandidates(updatedCandidates);
  //   setAvailableMembers(updatedMembers);
  // };

  // const removeFromBallot = (candidate) => {
  //   // Remove from candidates on ballot
  //   let updatedCandidates = [...candidates];
  //   updatedCandidates = updatedCandidates.filter(
  //     (candidateOnList) => candidateOnList.id !== candidate.id
  //   );

  //   // Add to eligible members
  //   const updatedMembers = [...availableMembers];
  //   updatedMembers.push(candidate);

  //   // Update state
  //   setCandidates(updatedCandidates);
  //   setAvailableMembers(updatedMembers);
  // };

  // const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   onSubmit({
  //     candidates,
  //     title,
  //     desc,
  //   });

  //   setCandidates([]);
  //   setTitle("");
  //   setDesc("");
  // };

  // // const updateState = (e) => {
  // //   this.setState({ [e.target.name]: e.target.value });
  // // };

  // const cancelOffice = () => {
  //   setCandidates([]);
  //   setTitle("");
  //   setDesc("");
  // };

  // return (
  //   <form className="Offices" onSubmit={handleSubmit}>
  //     <div className="office">
  //       <div className="Office-Picker">
  //         <h3>Create Ballot for Office</h3>
  //         <p>
  //           <label htmlFor="officeTitle">
  //             Title of Office&nbsp;
  //             <input
  //               type="text"
  //               name="title"
  //               id="officeTitle"
  //               value={title}
  //               onChange={updateState}
  //               required
  //             />
  //           </label>
  //         </p>

  //         <p>
  //           <label htmlFor="officeDesc">
  //             Description&nbsp;
  //             <textarea
  //               type="text"
  //               name="desc"
  //               id="officeDesc"
  //               value={desc}
  //               onChange={updateState}
  //             />
  //           </label>
  //         </p>

  //         <div className="memberSearch">
  //           <h4>Eligible Candidates</h4>
  //           Search:
  //           <input type="search" />
  //           Sort:
  //           <button>⬇️</button>
  //           <button>⬆️</button>
  //           <div className="memberSearch-list">
  //             {availableMembers
  //               .sort((a, b) => {
  //                 const aFirstName = a.firstName.toLowerCase();
  //                 const bFirstName = b.firstName.toLowerCase();

  //                 if (aFirstName < bFirstName) {
  //                   return -1;
  //                 }
  //                 if (aFirstName > bFirstName) {
  //                   return 1;
  //                 }
  //                 return 0;
  //               })
  //               .map((user) => (
  //                 <p key={user.id}>
  //                   {user.firstName} {user.lastName}
  //                   <button
  //                     type="button"
  //                     onClick={() => addToBallot(user)}
  //                     disabled={user.officeRunningFor}
  //                   >
  //                     {user.officeRunningFor
  //                       ? `Running for ${user.officeRunningFor}`
  //                       : "Add"}
  //                   </button>
  //                 </p>
  //               ))}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="Office-Stage">
  //         <h3>Candidates on Ballot</h3>
  //         {this.state.candidates
  //           .sort((a, b) => {
  //             const aFirstName = a.firstName.toLowerCase();
  //             const bFirstName = b.firstName.toLowerCase();

  //             if (aFirstName < bFirstName) {
  //               return -1;
  //             }
  //             if (aFirstName > bFirstName) {
  //               return 1;
  //             }
  //             return 0;
  //           })
  //           .map((candidate) => (
  //             <p key={candidate.id}>
  //               {candidate.firstName} {candidate.lastName}
  //               <button
  //                 type="button"
  //                 onClick={() => this.removeFromBallot(candidate)}
  //               >
  //                 x
  //               </button>
  //             </p>
  //           ))}
  //       </div>
  //     </div>

  //     <button type="button" onClick={this.cancelOffice}>
  //       Cancel
  //     </button>
  //     <button
  //       disabled={this.state.candidates.length < 1 || !this.state.title}
  //       type="submit"
  //     >
  //       Save Office Ballot
  //     </button>
  //   </form>
  // );
};

export default Office;
