import { Query } from "@apollo/react-components";

import { GLANCE_QUERY } from "./atAGlance.graphql";

const AtAGlance = () => {
  return (
    <div>
      {/* <Query query={GLANCE_QUERY}> */}
      {/* {({ loading: queryLoading, error: queryError, data: queryData }) => ( */}
      <>
        <h4>Stats</h4>
        <ul>
          <li>Active Full Members Last Year: 58</li>
          <li>New members this year: 2</li>
          <li>Current Active Full Members (including past due): 60</li>
          <li>Current Active Full Members: 28</li>

          <li>Past due members: 32</li>
          <li>New members allowed this year: 49</li>
          <li>Total members allowed this year: 81</li>

          <li>Needed for Quorum: 10</li>
          <li>Needed to pass a motion: 6</li>
          <li>Needed to vote a new member in: 6</li>
        </ul>

        <h4>Active Members Per Year</h4>
        {/* Bar chart */}

        <h4>Locked New Accounts</h4>
        <ul>
          <li>Meowface McDuck</li>
        </ul>

        <h4>Eligible for Membership</h4>
        <p>
          18 years of age or order, have attended at least one run and one
          meeting
        </p>
        <ul>
          <li>Bosco Relli</li>
        </ul>

        <h4>Must Join</h4>
        <p>
          Have attended 3 runs, but accounts are now limited. Are not yet
          eligible for membership
        </p>
        <ul>
          <li>Ronald McDonald</li>
        </ul>
      </>
      {/* )} */}
      {/* </Query> */}
    </div>
  );
};

export default AtAGlance;
