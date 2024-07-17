import get from "lodash/get";
import { Link } from "react-router-dom";
import format from "date-fns/format";

import Calendar from "../../../events/Calendar";
import { dateFormat } from "../../../../lib/constants";

const Styles = [];

const TrailActivity = () => {
  const user = {
    trailsVisited: [],
    bandaids: [],
    runReportsLogged: [],
  };
  const activity = [];

  return (
    <div>
      <div className={Styles["user-data__section"]}>
        {activity.length > 0 ? (
          <ul className={Styles["calendar-list"]}>
            {activity.map((rsvp) => (
              <li key={rsvp.event.id}>
                <Calendar date={rsvp.event.startTime} />
                <Link to={`/event/${rsvp.event.id}`}>{rsvp.event.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <span>None</span>
        )}
      </div>
      <div className={Styles["user-data__section"]}>
        <h3>Trails Visited</h3>
        {get(user, "trailsVisited", []).length > 0 ? (
          <ul>
            {user.trailsVisited.map((trail) => (
              <li key={trail.id}>{trail.name}</li>
            ))}
          </ul>
        ) : (
          <span>None</span>
        )}
      </div>
      <div className={Styles["user-data__section"]}>
        <h3>Bandaids</h3>
        {get(user, "bandaids", []).length > 0 ? (
          <ul>
            {user.bandaids.map((bandaid) => (
              <li key={bandaid.id}>
                {format(new Date(bandaid.occurred), dateFormat)} {bandaid.name}
              </li>
            ))}
          </ul>
        ) : (
          <span>No bandaids found...</span>
        )}
      </div>
      <div className={Styles["user-data__section"]}>
        <h3>Run Reports</h3>
        {get(user, "runReportsLogged", []).length > 0 ? (
          <ul>
            {user.runReportsLogged.map((report) => (
              <li key={report.id}>
                {format(new Date(report.reportFiled), dateFormat)}{" "}
                {report.title}
              </li>
            ))}
          </ul>
        ) : (
          <span>No run reports found...</span>
        )}
      </div>
    </div>
  );
};

export default TrailActivity;
