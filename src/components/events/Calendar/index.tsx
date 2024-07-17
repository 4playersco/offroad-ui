import { FC } from "react";
import { format } from "date-fns";
import cn from "classnames";

import Icon from "@/components/common/Icon";
import { dateFormat } from "@/constants";

import Styles from "./calendar.module.scss";

interface CalendarProps {
  date: string;
  className?: string;
  mask?: boolean;
}

const Calendar: FC<CalendarProps> = ({ date, className, mask = false }) => {
  const dateValue = new Date(date);
  const classNames = cn(Styles["calendar"], className);

  return (
    <div className={classNames} title={format(dateValue, dateFormat)}>
      {mask ? (
        <Icon icon="lock">Members Only</Icon>
      ) : (
        <>
          <div className={Styles["date"]}>{format(dateValue, "d")}</div>
          <div className={Styles["month"]}>{format(dateValue, "MMM")}</div>
        </>
      )}
    </div>
  );
};

export default Calendar;
