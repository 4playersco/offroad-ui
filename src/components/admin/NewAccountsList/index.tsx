import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { differenceInYears } from "date-fns";

import Button from "@/components/common/Button";
import Loading from "@/components/utility/Loading";
import SuccessMessage from "@/components/utility/SuccessMessage";
import ErrorMessage from "@/components/utility/ErrorMessage";
import { SideModal } from "@/components/common/Modal";

import Styles from "./newAccountsList.module.scss";
import NEW_ACCOUNTS_QUERY from "./newAccountsList.graphql";
import NEW_ACCOUNTS_APPROVE_MUTATION from "./newAccountsApprove.graphql";
import NEW_ACCOUNTS_REJECT_MUTATION from "./newAccountsReject.graphql";

const NewAccountsList = () => {
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [rejectId, setRejectId] = useState<string | null>();

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(NEW_ACCOUNTS_QUERY);
  const [
    unlockNewAccount,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(NEW_ACCOUNTS_APPROVE_MUTATION);

  const [
    rejectNewAccount,
    { error: rejectError, loading: rejectLoading, data: rejectData },
  ] = useMutation(NEW_ACCOUNTS_REJECT_MUTATION);

  const handleUnlock = useCallback(
    (id: any) => {
      unlockNewAccount({
        variables: { userId: id },
        refetchQueries: [{ query: NEW_ACCOUNTS_QUERY }],
      });
    },
    [unlockNewAccount]
  );

  const handleOpenModal = useCallback(
    (id: any) => {
      setRejectId(id);
      setReasonModalOpen(true);
    },
    [setRejectId, setReasonModalOpen]
  );

  const handleCloseModal = useCallback(() => {
    setRejectId(null);
    setReasonModalOpen(false);
  }, [setRejectId, setReasonModalOpen]);

  const handleReject = useCallback(() => {
    const fn = async () => {
      await rejectNewAccount({
        variables: { userId: rejectId, reason },
        refetchQueries: [{ query: NEW_ACCOUNTS_QUERY }],
      });

      handleCloseModal();
    };

    fn();
  }, [rejectNewAccount, handleCloseModal, reason, rejectId]);

  if (queryLoading) {
    return <Loading loading />;
  }

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { users } = queryData;

  return (
    <div>
      <h2>Locked New Accounts</h2>
      <p>
        <strong>
          Please add new user to &ldquo;4-Players of Colorado&rdquo; general
          email list on Mailchimp
        </strong>
      </p>
      {mutationError && <ErrorMessage error={mutationError} />}
      {rejectError && <ErrorMessage error={rejectError} />}
      {mutationData && (
        <SuccessMessage message={mutationData.unlockNewAccount.message} />
      )}
      {rejectData && (
        <SuccessMessage message={rejectData.rejectNewAccount.message} />
      )}
      <table className={Styles["new-accounts-table"]}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Unlock/Notify</th>
          </tr>
        </thead>
        {users && users.length > 0 ? (
          <tbody>
            {users.map((user: any) => {
              const { id, firstName, lastName, birthdate, gender, username } =
                user;
              const age = differenceInYears(new Date(), new Date(birthdate));

              return (
                <tr key={id}>
                  <td>
                    <Link to={`/admin/profile/${username}`}>
                      {firstName} {lastName}
                    </Link>
                  </td>
                  <td>{age}</td>
                  <td>{Genders[gender as keyof typeof Genders]}</td>
                  <td>
                    <Loading loading={mutationLoading || rejectLoading} />
                    <Button onClick={() => handleUnlock(id)}>Unlock</Button>
                    <Button onClick={() => handleOpenModal(id)}>Reject</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={4}>No new accounts</td>
            </tr>
          </tbody>
        )}
      </table>
      <SideModal
        title="Reason for Reject"
        isOpen={reasonModalOpen}
        onClose={handleCloseModal}
      >
        <p>
          Please provide a reason for this account reject. An email will be sent
          to this user.
        </p>
        <input
          type="text"
          className={Styles["reason-input"]}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button disabled={!reason} onClick={handleReject}>
          Confirm Rejection
        </Button>
      </SideModal>
    </div>
  );
};

export default NewAccountsList;
