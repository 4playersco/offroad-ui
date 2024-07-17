import React from "react";
import { useQuery } from "@apollo/client";

import Hr from "@/components/common/Hr";
import Filter from "@/components/login/Filter";
import { months } from "@/constants";
import { isMember } from "@/lib";

import DOCS_QUERY from "./documents.graphql";
import Styles from "./documents.module.scss";

type Archive = {
  month: number;
  meetingMinutes: {
    name: string;
    link: string;
  };
  newsletter: {
    name: string;
    link: string;
  };
  year: string;
};

const Documents = () => {
  const { loading, error, data } = useQuery(DOCS_QUERY);

  if (loading || !data) {
    return "Loading...";
  }

  if (error) {
    return "Error.";
  }

  const { docs } = data;
  const { bylaws, sors, archives } = docs;

  const yearsAvailable = archives.map((archive: Archive) => archive.year);

  return (
    <div>
      <h2>Club Documents</h2>

      <h3>Operations</h3>

      <ul>
        <li>
          <a
            href={bylaws.link}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Bylaws
          </a>{" "}
          ({new Date(bylaws.date).getFullYear()} rev)
        </li>
        <li>
          <a
            href={sors.link}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Standard Operating Rules
          </a>{" "}
          ({new Date(sors.date).getFullYear()} rev)
        </li>
      </ul>

      <Filter typeCheck={isMember}>
        <>
          <Hr />

          <h3>Monthly Archives</h3>

          <p>
            Our records are incomplete, so if you can provide some missing
            details, please contact the{" "}
            <a href="mailto:webmaster@4-playersofcolorado.org">webmaster</a>.
          </p>

          <div className={Styles["archive-content"]}>
            <div className={Styles["archive-lists"]}>
              <section>
                {archives.map(
                  ({
                    year,
                    monthlyArchives,
                  }: {
                    year: string;
                    monthlyArchives: Archive[];
                  }) => (
                    <>
                      <h4 id={`c-${year}`}>{year}</h4>
                      <dl className={Styles["archive-list"]}>
                        {monthlyArchives.map(
                          ({ month, meetingMinutes, newsletter }) => (
                            <>
                              <dt>{months[month]}</dt>
                              <dd>
                                {meetingMinutes && (
                                  <a
                                    href={meetingMinutes.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    {meetingMinutes.name}
                                  </a>
                                )}
                                {newsletter && (
                                  <>
                                    <br />
                                    <a
                                      href={newsletter.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      download
                                    >
                                      {newsletter.name}
                                    </a>
                                  </>
                                )}
                              </dd>
                            </>
                          )
                        )}
                      </dl>
                    </>
                  )
                )}
              </section>
            </div>
            <aside className={Styles["aside"]}>
              <div className={Styles["aside-content"]}>
                <ul className={Styles["aside-list"]}>
                  {yearsAvailable.map((year: string) => (
                    <li key={year}>
                      <a href={`#c-${year}`}>{year}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </>
      </Filter>
    </div>
  );
};

export default Documents;
