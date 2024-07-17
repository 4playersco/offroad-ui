import { useState, useCallback } from "react";

const NumberInput = ({
  defaultValue = 0,
  onChange = (value: number) => {},
  width = 60,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(Number(value));
      onChange(Number(value));
    },
    [onChange, setValue]
  );

  const style = { width };

  return (
    <input
      value={value}
      onChange={handleValueChange}
      type="number"
      style={style}
      {...props}
    />
  );
};

export default NumberInput;
