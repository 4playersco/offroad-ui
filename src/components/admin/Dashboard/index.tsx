import React from "react";
import { Link } from "react-router-dom";

// import AtAGlance from '../AtAGlance';
// import PollingPlace from '../../voting/PollingPlace';
import Filter from "../../login/Filter";
import { isAdmin, isActive } from "../../../lib/utils";

const Dashboard = () => (
  <>
    <h2>Dashboard</h2>
    {/* <div>
      <h3>At A Glance</h3>
      <AtAGlance />
    </div> */}
    <div>
      <h3>Tools</h3>
      <ul>
        <Filter roleCheck={isAdmin} statusCheck={isActive}>
          <li>
            <Link to="/admin/permissions">Permissions</Link>
          </li>
        </Filter>
        <li>
          <Link to="/admin/roster">Membership List</Link>
        </li>
        <li>
          <Link to="/event/new">Create Event</Link>
        </li>
        <li>
          <Link to="/admin/meetings">Meetings</Link>
        </li>
        <li>
          <Link to="/admin/trails">Trails</Link>
        </li>
        <li>
          <Link to="/admin/unlock">Locked New Accounts</Link>
        </li>
        <li>
          <Link to="/admin/invite">Invite a Member</Link>
        </li>
        {/* <li>
          <Link to={{
            pathname: '/elections',
            query: { action: 'create' },
          }}>
            Create New Election
          </Link>
        </li> */}
        {/* <li>
          <Link to={{
            pathname: '/vote',
            query: { action: 'create' },
          }}>
            Create New Poll
          </Link>
        </li> */}
      </ul>
    </div>
    <div>
      {/* <PollingPlace admin /> */}
      {/* <ul>
        <li>
          Active election&nbsp;
          <Link
            href={{
              pathname: 'election-management',
              query: {
                action: 'edit',
                id: 123,
              },
            }}
          >
            (edit)
          </Link>
        </li>
        <li>
          <ul>
            <li>Time left</li>
            <li>Races</li>
            <li>
              <ul>
                <li>Candidates sorted by most votes</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul> */}
      {/* <Results admin /> */}
    </div>
  </>
);

export default Dashboard;
