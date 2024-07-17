import { FC } from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { useQuery } from "@apollo/client";

import ErrorMessage from "@/components/utility/ErrorMessage";
import Calendar from "@/components/events/Calendar";
import { sortByDateDesc } from "@/lib";

import ACTIVITY_QUERY from "./activity.graphql";
import Styles from "./activity.module.scss";

interface ActivityProps {
  username: string;
}

const Activity: FC<ActivityProps> = ({ username }) => {
  const { loading, error, data } = useQuery(ACTIVITY_QUERY, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { user } = data;

  // const trails = get(user, 'eventsRSVPd', [])
  //   .filter((event) => event.trail !== null)
  //   .map((event) => event.trail);
  // filter
  //    past events
  // some
  //    have trails
  // map
  //   .sort((a, b) =>
  //   a.event.startTime < b.event.startTime ? 1 : -1,
  // );

  let activity = get(user, "activityLog", []).sort(sortByDateDesc("time"));

  if (activity.length) {
    activity.sort((a: any, b: any) => (a.time < b.time ? 1 : -1));
  }

  return (
    <div className={Styles["activity"]}>
      {/* <ul className={Styles['user-data']}>
        <li>
          <h3>Trails</h3>
        </li>
        <li>
          <h3>Events</h3>
        </li>
        <Filter roleCheck={isAtLeastRunLeader}>
          <li>
            <h3>Runs Led</h3>
          </li>
        </Filter>
        <li>
          <h3>Bandaids</h3>
        </li>
      </ul> */}
      <aside className={Styles["activity__aside"]}>
        <div className={Styles["user-data__section"]}>
          <h3>Activity Log</h3>
          <div className={Styles["user-logs"]}>
            <div className={Styles["activity-log"]}>
              {activity.length > 0 ? (
                <ul className={Styles["calendar-list"]}>
                  {activity.map((entry: any) => (
                    <li key={entry.id}>
                      <Calendar date={entry.time} />
                      {entry.message}

                      {entry.link && <Link to={entry.link}>&gt;</Link>}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Activity;
