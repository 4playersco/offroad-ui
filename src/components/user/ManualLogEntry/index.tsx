import { FC, useState, useCallback } from "react";
import { useMutation } from "@apollo/client";

import {
  DEFAULT_FULL_MEMBER_DUES_AMOUNT,
  membershipLogMessages,
} from "@/constants";
import Button from "@/components/common/Button";
import SuccessMessage from "@/components/utility/SuccessMessage";
import ErrorMessage from "@/components/utility/ErrorMessage";
import Loading from "@/components/utility/Loading";
import DatePicker from "@/components/utility/DatePicker";

import Styles from "./manualLogEntry.module.scss";
import LOG_MEMBERSHIP_ITEM_MUTATION from "./manualLogEntry.graphql";
import MEMBERSHIP_LOG_QUERY from "../MembershipLog/membershipLog.graphql";

type Code = keyof Pick<
  typeof membershipLogMessages,
  "DUES_PAID" | "MEMBERSHIP_ELIGIBLE" | "GUEST_RESTRICTED"
>;

interface ManualLogEntryProps {
  userId: string;
  username: string;
}

const ManualLogEntry: FC<ManualLogEntryProps> = ({ userId, username }) => {
  const [logMembershipEntry, { error, loading, data }] = useMutation(
    LOG_MEMBERSHIP_ITEM_MUTATION,
    {
      refetchQueries: [
        { query: MEMBERSHIP_LOG_QUERY, variables: { username } },
      ],
    }
  );

  const types: Code[] = [
    "DUES_PAID",
    "MEMBERSHIP_ELIGIBLE",
    "GUEST_RESTRICTED",
  ];
  const [date, setDate] = useState<Date>(new Date());
  const [code, setCode] = useState<Code>(types[0]);
  const [amt, setAmt] = useState<string>(
    DEFAULT_FULL_MEMBER_DUES_AMOUNT.toString()
  );

  // Refetch
  const handleChange = useCallback(() => {
    const asyncFn = async () => {
      let message;

      if (code === "DUES_PAID") {
        message = membershipLogMessages[code](Number(amt));
      } else {
        message = membershipLogMessages[code]();
      }

      await logMembershipEntry({
        variables: {
          date,
          message,
          code,
          userId,
        },
      });
    };

    asyncFn();
  }, [logMembershipEntry, date, code, userId, amt]);

  return (
    <>
      <div className={Styles["form"]}>
        <div className={Styles["form-field-wrapper"]}>
          <label className={Styles["form-label"]} htmlFor="msg">
            Message Code
          </label>
          <div className={Styles["form-field"]}>
            <select
              name="msg"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setCode(event.target.value as Code)
              }
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={Styles["form-field-wrapper"]}>
          <label className={Styles["form-label"]} htmlFor="date">
            Date
          </label>
          <div>
            <DatePicker
              value={date}
              onChange={setDate}
              className={Styles["date-field"]}
            />
          </div>
        </div>

        {code === "DUES_PAID" && (
          <div className={Styles["form-field-wrapper"]}>
            <label className={Styles["form-label"]} htmlFor="amt">
              $ Amount
            </label>
            <div className={Styles["form-field"]}>
              <input
                type="number"
                name="amt"
                value={amt}
                required
                onChange={(event) => setAmt(event.target.value)}
                className={Styles["form-field"]}
              />
            </div>
          </div>
        )}

        <div className={Styles["form-footer"]}>
          <Button
            onClick={handleChange}
            disabled={
              loading || !code || !date || (code === "DUES_PAID" && !amt)
            }
          >
            Log
          </Button>
          <Loading loading={loading} />
          <ErrorMessage error={error} />
          {data && <SuccessMessage message={data.message} />}
        </div>
      </div>
    </>
  );
};

export default ManualLogEntry;
