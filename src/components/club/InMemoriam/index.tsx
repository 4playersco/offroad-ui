import React from "react";

import Styles from "./inMemoriam.module.scss";

const InMemoriam = () => {
  return (
    <div className={Styles["in-memoriam"]}>
      <h3>In Memoriam</h3>

      <p>
        Here we honor the amazing lives of our members and alumni who have
        passed away.
      </p>

      <p>
        To notify us of a death of a member, please send an obituary to the{" "}
        <a href="mailto:webmaster@4-playersofcolorado.org">webmaster</a>.
      </p>

      <table className={Styles["in-memoriam-list"]}>
        <tbody>
          <tr>
            <td>Kenny Tenbensal</td>
            <td>
              d: 27 Mar 1991. His ashes were spread at the cabin, for whom it is
              named after
            </td>
          </tr>
          <tr>
            <td>Mark Reddemann</td>
            <td>Ashes at Kenny&apos;s Cabin</td>
          </tr>
          <tr>
            <td>Sam Nelson</td>
            <td>d: 6 Mar 2017. Emeritus Member, Charter Member</td>
          </tr>
          <tr>
            <td>Ashley Johnson</td>
            <td>d: 12 Sept 2019. Charter Member</td>
          </tr>
          <tr>
            <td>Rich Reynolds</td>
            <td>d: 25 Sept 2019</td>
          </tr>
          <tr>
            <td>James &ldquo;Beemer&rdquo; Murphy</td>
            <td>d: 28 May 2021</td>
          </tr>
          <tr>
            <td>Jerry Holter</td>
            <td>d: 9 Feb 2022</td>
          </tr>
          <tr>
            <td>Tom Eskridge</td>
            <td>d: 21 May 2023</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InMemoriam;
