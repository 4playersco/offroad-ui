import { FC, useState, useCallback } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import Styles from "./richTextArea.module.scss";

interface RichTextAreaProps {
  onChange: (text: string) => void;
  defaultText?: string;
}

const RichTextArea: FC<RichTextAreaProps> = ({
  onChange,
  defaultText = "",
}) => {
  const [text, setText] = useState(defaultText);

  const handleChange = useCallback(
    (value: string) => {
      setText(value);
      onChange(value);
    },
    [setText, onChange]
  );

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className={Styles["rich-text"]}>
      <ReactQuill theme="snow" value={text} onChange={handleChange} />
    </div>
  );
};

export default RichTextArea;
