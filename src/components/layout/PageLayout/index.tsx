import { FC } from "react";

import Header from "../Header";
import Footer from "../Footer";
import ErrorBoundary from "../../utility/ErrorBoundary";

import Styles from "./pageLayout.module.scss";

interface PageProps {
  children: React.ReactNode;
}

const PageLayout: FC<PageProps> = ({ children }) => (
  <>
    <div className={Styles["wrapper"]}>
      <ErrorBoundary>
        <Header />
        <main className={Styles["container"]}>{children}</main>
      </ErrorBoundary>
    </div>
    <Footer />
  </>
);

export default PageLayout;
