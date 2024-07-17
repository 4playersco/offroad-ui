import { FC } from "react";

import Activity from "@/components/user/activity/Activity";

import Styles from "./activityIndex.module.scss";

interface ActivityIndexProps {
  username: string;
}

const ActivityIndex: FC<ActivityIndexProps> = ({ username }) => {
  return (
    <div className={Styles["profile"]}>
      {/* <Breadcrumbs /> */}

      {/* <Switch> */}
      {/* <Route path={`${path}/trails`}>
          <TrailActivity username={username} isSelf={isSelf} />
        </Route>
        <Route path={`${path}/run-leader`}>
          <RunLeaderActivity username={username} isSelf={isSelf} />
        </Route>
        <Route path={`${path}/bandaids`}>
          <BandaidsActivity username={username} isSelf={isSelf} />
        </Route>
        <Route path={`${path}/events`}>
          <EventsActivity username={username} isSelf={isSelf} />
        </Route> */}
      {/* <Route exact path={path}> */}
      <Activity username={username} />
      {/* </Route> */}
      {/* <Redirect from="*" to="/404" /> */}
      {/* </Switch> */}
    </div>
  );
};

export default ActivityIndex;
