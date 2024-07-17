import { useState, useCallback, FC } from "react";
import { useQuery } from "@apollo/client";
import get from "lodash/get";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import ErrorMessage from "@/components/utility/ErrorMessage";
import { DEFAULT_AVATAR_SRC } from "@/constants";

import "./quorum.module.scss";
import QUORUM_QUERY from "./quorum.graphql";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: {
    url: string;
  };
  accountType: string;
  accountStatus: string;
};

const Quorum: FC = () => {
  const [present, setPresent] = useState(0);
  const { loading, error, data } = useQuery(QUORUM_QUERY);

  const handleCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setPresent(present + 1);
      } else {
        setPresent(present - 1);
      }
    },
    [present, setPresent]
  );

  const determineQuorum = useCallback(
    (total: number) => {
      const percentage = present / total;
      const hasQuorum =
        percentage >= 1 / 3
          ? '<span className="quorum-yes">Yes</span>'
          : '<span className="quorum-no">No</span>';

      return `${hasQuorum} (${100 * percentage}%)`;
    },
    [present]
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { users } = data;

  return (
    <div className="quorum">
      <h2>Meeting Quorum</h2>

      <div className="cols">
        <table cellSpacing="0">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Account Type</th>
              <th>Account Status</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              const AVATAR_SRC = get(user, "avatar.url", DEFAULT_AVATAR_SRC);

              return (
                <tr key={user.id}>
                  <td>
                    <img
                      src={AVATAR_SRC}
                      alt={`${user.firstName} ${user.lastName}`}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>
                    <Link to={`/admin-profile/${user.username}`}>
                      {user.firstName} {user.lastName}
                    </Link>
                  </td>
                  <td>
                    {
                      AccountTypes[
                        user.accountType as keyof typeof AccountTypes
                      ]
                    }
                  </td>
                  <td>
                    {
                      AccountStatuses[
                        user.accountStatus as keyof typeof AccountStatuses
                      ]
                    }
                  </td>
                  <td>
                    <input type="checkbox" onChange={handleCheck} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <p>Total Members: {users.length}</p>
          <p>Total Present: {present}</p>

          <p>Quorum: {parse(determineQuorum(users.length))}</p>
        </div>
      </div>
      {/* <Button>Record</Button> */}
    </div>
  );
};

export default Quorum;
