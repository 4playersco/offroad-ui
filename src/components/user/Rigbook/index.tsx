import React from "react";
import { useQuery } from "@apollo/client";

import RigbookCard from "../RigbookCard";

import Styles from "./rigbook.module.scss";
import RIGBOOK_QUERY from "./rigbook.graphql";

const Rigbook = () => {
  const { loading, error, data } = useQuery(RIGBOOK_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Roster</h2>
      <h3>Officers</h3>
      <ul className={Styles["rigbook"]}>
        {data.president.id && (
          <RigbookCard key={data.president.id} user={data.president} />
        )}
        {data.vicePresident.id && (
          <RigbookCard key={data.vicePresident.id} user={data.vicePresident} />
        )}
        {data.secretary.id && (
          <RigbookCard key={data.secretary.id} user={data.secretary} />
        )}
        {data.treasurer.id && (
          <RigbookCard key={data.treasurer.id} user={data.treasurer} />
        )}
      </ul>

      <h3>Membership</h3>
      <ul className={Styles["rigbook"]}>
        {data.membership &&
          data.membership.map((member: any) => (
            <RigbookCard key={member.id} user={member} />
          ))}
      </ul>
    </div>
  );
};

export default Rigbook;
