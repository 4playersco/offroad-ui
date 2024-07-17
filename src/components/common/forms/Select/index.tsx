import { useState, useCallback } from "react";
import ReactSelect from "react-select";

const orderOptions = (values) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const Select = ({ defaultValues = [], options = [], onChange = () => {} }) => {
  const [values, setValues] = useState(defaultValues);

  const handleChange = useCallback(
    (updatedValue, { action, removedValue }) => {
      /* eslint-disable */
      switch (action) {
        case "remove-value":
        case "pop-value":
          if (removedValue.isFixed) {
            return;
          }
          break;
        case "clear":
          updatedValue = values.filter((v) => v.isFixed);
          break;
      }
      /* eslint-enable */
      updatedValue = orderOptions(updatedValue);
      setValues(updatedValue);
      onChange(updatedValue);
    },
    [setValues, values, onChange]
  );

  const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: "none" } : base;
    },
  };

  return (
    <ReactSelect
      value={values}
      options={options}
      styles={styles}
      isMulti
      isClearable={values.some((v) => !v.isFixed)}
      name="colors"
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
    />
  );
};

export default Select;
