import { Component, FC, useCallback, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";

import Loading from "@/components/utility/Loading";
import ErrorMessage from "@/components/utility/ErrorMessage";
import RichTextArea from "@/components/utility/RichTextArea";
import {
  isAdmin,
  isBoardMember,
  isRunMaster,
  isAtLeastRunMaster,
  isActive,
  formatFilterSelect,
  formatFilterSelected,
  emailGroups,
} from "@/lib";

import MESSAGE_QUERY from "./message.graphql";
import SEND_MESSAGE_MUTATION from "./sendMessage.graphql";
import Button from "../../common/Button";

interface MessageProps {
  initialRecipients: string;
}

const Message: FC<MessageProps> = ({ initialRecipients }) => {
  const [recipients, setRecipients] = useState(
    (initialRecipients && initialRecipients.split(",")) || []
  );
  const [subject, setSubject] = useState("");
  const [htmlText, setHtmlText] = useState("");

  const { data, loading, error } = useQuery(MESSAGE_QUERY);
  const [
    sendMessage,
    { data: mutationData = {}, loading: mutationLoading, error: mutationError },
  ] = useMutation(SEND_MESSAGE_MUTATION, {
    refetchQueries: ["MESSAGE_QUERY"],
  });

  const handleSendMessage = useCallback(async () => {
    await sendMessage({
      variables: {
        to: recipients,
        subject: subject,
        htmlText: htmlText,
      },
    });
  }, [sendMessage, recipients, subject, htmlText]);

  const handleSelectChange = (recipients: any) => {
    const newRecipients = Array.isArray(recipients)
      ? recipients.map((recipient) => recipient.value)
      : [recipients.value];
    setRecipients(newRecipients);
  };

  const handleTextChange = (htmlText: string) => {
    setHtmlText(htmlText);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const determineEmailGroups = (role: Role, status: AccountStatus) => {
    const defaultGroups = emailGroups.filter(
      (group) => group.value === "officers" || group.value === "webmaster"
    );

    if (!isActive(status)) {
      return defaultGroups;
    }

    if (isAdmin(role) && isActive(status)) {
      return emailGroups;
    }

    if (isBoardMember(role) && isActive(status)) {
      return emailGroups.filter((group) => group.value !== "all_users");
    }

    if (isRunMaster(role) && isActive(status)) {
      return emailGroups
        .filter((group) => group.value === "run_leaders")
        .concat(defaultGroups);
    }

    return emailGroups
      .filter((group) => group.value === "runmaster")
      .concat(defaultGroups);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { myself, getMessageRecipients: users } = data;

  const fullMembersMap = users.reduce(
    (acc: object, user: any) => ({
      ...acc,
      [user.username]: `${user.firstName} ${user.lastName}`,
    }),
    {}
  );

  return (
    <>
      <h3>Send a Message</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div className="">
            <p>Recipient(s):</p>
            <Select
              placeholder="Select recipient(s)"
              isMulti={isAtLeastRunMaster(myself.role)}
              defaultValue={formatFilterSelected(recipients, fullMembersMap)}
              options={[
                ...determineEmailGroups(myself.role, myself.accountStatus),
                ...formatFilterSelect(fullMembersMap),
              ]}
              onChange={handleSelectChange}
            />

            <p>Subject:</p>
            <input
              width="200"
              onChange={handleSubjectChange}
              type="text"
              name="subject"
              value={subject}
            />
          </div>
        </div>

        <p>Message:</p>
        <RichTextArea onChange={handleTextChange} />

        <Button disabled={loading} onClick={handleSendMessage}>
          Send
        </Button>

        <Loading loading={mutationLoading} />
        {mutationData.sendMessage && <p>{mutationData.sendMessage.message}</p>}
        {error && <ErrorMessage error={error} />}
      </form>
    </>
  );
};

export default Message;
