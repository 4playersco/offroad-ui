import { useCallback } from "react";
import { useMutation } from "@apollo/client";

import { membershipLogMessages } from "@/constants";

import LOG_MEMBERSHIP_MESSAGE from "./logMembershipMessage.graphql";

const useLogActivityMessage = () => {
  const [log] = useMutation(LOG_MEMBERSHIP_MESSAGE);
  const logMessage = useCallback(
    (
      props: any,
      messageCode: MembershipMessageCode,
      username: string,
      time: Date
    ) => {
      log({
        message: membershipLogMessages[messageCode](props),
        messageCode,
        username,
        time: time || new Date(),
      } as any);
    },
    [log]
  );

  return logMessage;
};

export default useLogActivityMessage;
