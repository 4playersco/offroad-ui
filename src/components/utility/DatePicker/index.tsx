import { FC } from "react";
import DatePickerComponent from "react-date-picker";

interface DatePickerProps {
  [x: string]: any;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  return <DatePickerComponent {...props} />;
};

export default DatePicker;
