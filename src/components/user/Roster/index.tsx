import { FC } from "react";
import { useQuery } from "@apollo/client";

import RosterCard from "@/components/user/RosterCard";

import Styles from "./roster.module.scss";
import MEMBERSHIP_QUERY from "./roster.graphql";

export type Filter = {
  accountStatus: AccountStatus[];
  accountType: AccountType[];
  role: string[];
  office: string[];
  title: string[];
};

const defaultFilters = {
  accountStatus: [AccountStatus.ACTIVE, AccountStatus.PAST_DUE],
  accountType: [AccountType.FULL, AccountType.ASSOCIATE, AccountType.EMERITUS],
  role: [],
  office: [],
  title: [],
};

interface RosterProps {
  filters?: Filter;
}

const Roster: FC<RosterProps> = ({ filters = defaultFilters }) => {
  const { loading, error, data } = useQuery(MEMBERSHIP_QUERY, {
    variables: filters,
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { users } = data;

  return (
    <>
      <h2>Roster</h2>
      <table className={Styles["roster"]}>
        <thead className={Styles["roster-header"]}>
          <tr>
            <th />
            <th>Name</th>
            <th>Account Type</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <RosterCard
              key={user.id}
              user={user}
              className={Styles["roster-card"]}
            />
          ))}
        </tbody>
      </table>
      <small>
        Full:{" "}
        {
          users.filter((user: any) => user.accountType === AccountType.FULL)
            .length
        }
      </small>
      &nbsp;&#8226;&nbsp;
      <small>
        Associate:{" "}
        {
          users.filter(
            (user: any) => user.accountType === AccountType.ASSOCIATE
          ).length
        }
      </small>
      &nbsp;&#8226;&nbsp;
      <small>
        Emeritus:{" "}
        {
          users.filter((user: any) => user.accountType === AccountType.EMERITUS)
            .length
        }
      </small>
      &nbsp;&#8226;&nbsp;
      <small>Total: {users.length}</small>
    </>
  );
};

export default Roster;
