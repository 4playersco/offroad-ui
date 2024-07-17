import { useEffect } from "react";

interface IUseOutsideClick {
  (ref: any, callback: () => void): void;
}

const useOutsideClick: IUseOutsideClick = (ref, callback) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
