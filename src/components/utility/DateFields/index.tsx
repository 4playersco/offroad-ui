import { FC } from "react";
import DatePicker from "../DatePicker";
import DateTimePicker from "react-datetime-picker";

type DatePickerFieldProps = {
  name: string;
  value: Date;
  onChange: (name: string, value: Date) => void;
  [x: string]: any; // rest props
};

export const DatePickerField: FC<DatePickerFieldProps> = ({
  name,
  value,
  onChange,
  ...rest
}) => {
  return (
    <DatePicker
      value={value || null}
      onChange={(val: any) => {
        onChange(name, val);
      }}
      {...rest}
    />
  );
};

type DateTimePickerFieldProps = {
  name: string;
  value: Date;
  onChange: (name: string, value: Date) => void;
  [x: string]: any; // rest props
};

export const DateTimePickerField: FC<DateTimePickerFieldProps> = ({
  name,
  value,
  onChange,
  ...rest
}) => {
  return (
    <DateTimePicker
      value={value || null}
      onChange={(val: any) => {
        onChange(name, val);
      }}
      {...rest}
    />
  );
};
