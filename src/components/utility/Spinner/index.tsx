import Loading from "../Loading";

import Styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={Styles["spinner"]}>
      <Loading loading size="md" />
    </div>
  );
};

export default Spinner;
