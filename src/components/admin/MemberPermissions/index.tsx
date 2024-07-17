import { FC, useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import debounce from "lodash/debounce";

import ErrorMessage from "@/components/utility/ErrorMessage";
import Loading from "@/components/utility/Loading";

import UPDATE_ACCOUNT_STATUS_MUTATION from "./updateAccountStatus.graphql";
import UPDATE_ACCOUNT_TYPE_MUTATION from "./updateAccountType.graphql";
import UPDATE_OFFICE_MUTATION from "./updateOffice.graphql";
import UPDATE_ROLE_MUTATION from "./updateRole.graphql";
import ALL_USERS_QUERY from "./allUsers.graphql";

interface UserPropertyProps {
  userId: string;
  userProperty: string;
  currentProperty: string;
  properties: any;
  allowNone?: boolean;
}

const UserProperty: FC<UserPropertyProps> = ({
  userId,
  userProperty,
  currentProperty,
  properties,
  allowNone = false,
}) => {
  const [selectedProperty, setSelectedProperty] = useState(
    currentProperty || "NONE"
  );

  const [updateProperty, { loading, error }] = useMutation(
    userProperty === "role"
      ? UPDATE_ROLE_MUTATION
      : userProperty === "accountType"
      ? UPDATE_ACCOUNT_TYPE_MUTATION
      : userProperty === "accountStatus"
      ? UPDATE_ACCOUNT_STATUS_MUTATION
      : UPDATE_OFFICE_MUTATION,
    {
      variables: {
        userId,
        [userProperty]: selectedProperty,
      },
      refetchQueries: [{ query: ALL_USERS_QUERY }],
    }
  );

  const handleChange = (event: any, updateCallback: () => void) => {
    setSelectedProperty(
      allowNone && event.target.value === "NONE" ? null : event.target.value
    );

    updateCallback();
  };

  return (
    <label htmlFor={`${userProperty}-${userId}`}>
      <select
        name={`${userProperty}-${userId}`}
        id={`${userProperty}-${userId}`}
        onChange={(event) => {
          handleChange(event, updateProperty);
        }}
        defaultValue={currentProperty}
      >
        {allowNone && (
          <option key={0} value="NONE">
            None
          </option>
        )}
        {Object.entries(properties).map((property: any) => {
          return (
            <option key={property[0]} value={property[0]}>
              {property[1]}
            </option>
          );
        })}
      </select>
      <Loading loading={loading} />
      <ErrorMessage error={error} />
    </label>
  );
};

interface UserRoleProps {
  userId: string;
  currentProperty: string;
}

const UserRole: FC<UserRoleProps> = (props) => (
  <UserProperty properties={Roles} userProperty="role" {...props} />
);

interface UserAccountTypeProps {
  userId: string;
  currentProperty: string;
}

const UserAccountType: FC<UserAccountTypeProps> = (props) => (
  <UserProperty
    properties={AccountTypes}
    userProperty="accountType"
    {...props}
  />
);

interface UserAccountStatusProps {
  userId: string;
  currentProperty: string;
}

const UserAccountStatus: FC<UserAccountStatusProps> = (props) => (
  <UserProperty
    properties={AccountStatuses}
    userProperty="accountStatus"
    {...props}
  />
);

interface UserOfficeProps {
  userId: string;
  currentProperty: string;
}

const UserOffice: FC<UserOfficeProps> = (props) => (
  <UserProperty
    properties={Office}
    userProperty="office"
    {...props}
    allowNone
  />
);

interface MemberTableProps {
  allUsers: any;
}

const MemberTable: FC<MemberTableProps> = ({ allUsers }: any) => {
  const [userList, setUserList] = useState(allUsers);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSetUserList = debounce((user) => {
    setUserList(user);
    setLoading(false);
  }, 500);

  const filterUsers = useCallback(
    (event: any) => {
      const keyword = event.target.value.toString();
      setKeyword(keyword);
      setLoading(true);

      if (keyword) {
        debouncedSetUserList(
          allUsers.filter(
            (user: any) =>
              user.firstName.toUpperCase().includes(keyword.toUpperCase()) ||
              user.lastName.toUpperCase().includes(keyword.toUpperCase())
          )
        );
      } else {
        debouncedSetUserList(allUsers);
      }
    },
    [debouncedSetUserList, setKeyword, setLoading, allUsers]
  );

  return (
    <>
      <div>
        <h3>Filter Results</h3>
        <input value={keyword} type="search" onChange={filterUsers} />
        <Loading loading={loading} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th>Office</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user: any) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>
                <UserRole userId={user.id} currentProperty={user.role} />
              </td>
              <td>
                <UserAccountType
                  userId={user.id}
                  currentProperty={user.accountType}
                />
              </td>
              <td>
                <UserAccountStatus
                  userId={user.id}
                  currentProperty={user.accountStatus}
                />
              </td>
              <td>
                <UserOffice userId={user.id} currentProperty={user.office} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const MemberPermissions: FC = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ErrorMessage error={error} />
      <h2>Manage Permissions</h2>
      {data.users && <MemberTable allUsers={data.users} />}
    </>
  );
};

export default MemberPermissions;
