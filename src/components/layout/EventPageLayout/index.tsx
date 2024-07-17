import { FC } from "react";
import cn from "classnames";

import Meta from "@/components/layout/Meta";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/utility/ErrorBoundary";

import Styles from "./eventPageLayout.module.scss";
import PageStyles from "../PageLayout/pageLayout.module.scss";

interface EventPageLayoutProps {
  children: React.ReactNode;
}

const EventPageLayout: FC<EventPageLayoutProps> = ({ children }) => {
  const mainClasses = cn(PageStyles["container"], Styles["container"]);

  return (
    <>
      <Meta />
      <div className={PageStyles["wrapper"]}>
        <ErrorBoundary>
          <Header />
          <main className={mainClasses}>{children}</main>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  );
};

export default EventPageLayout;
