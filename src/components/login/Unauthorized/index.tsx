import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";

import Styles from "./unauthorized.module.scss";

const Unauthorized = () => {
  const router = useRouter();

  return (
    <div className={Styles["unauthorized"]}>
      <div className={Styles["unauthorized-msg"]}>
        <h2>Not today...</h2>
        <p>You&apos;re not authorized to visit this page.</p>
        <Button onClick={() => router.back()}>Back</Button>
        <Button onClick={() => router.push("/")}>Home</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
