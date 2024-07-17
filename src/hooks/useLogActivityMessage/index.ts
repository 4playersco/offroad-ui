import { useCallback } from "react";
import { useMutation } from "@apollo/client";

import { activityLogMessages } from "@/constants";

import LOG_ACTIVITY_MESSAGE from "./logActivityMessage.graphql";

const useLogActivityMessage = () => {
  const [log] = useMutation(LOG_ACTIVITY_MESSAGE);
  const logMessage = useCallback(
    (
      props: any,
      messageCode: ActivityMessageCode,
      username: string,
      time: Date,
      link: string
    ) => {
      log({
        message: activityLogMessages[messageCode](props),
        messageCode,
        username,
        time: time || new Date(),
        link,
      } as any);
    },
    [log]
  );

  return logMessage;
};

export default useLogActivityMessage;
