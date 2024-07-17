import React from "react";
import { Box } from "rebass";

import Styles from "./history.module.scss";

const History = () => {
  return (
    <div>
      <h3>Details</h3>

      <p>
        <Box width="50%">
          <img
            className={Styles["img"]}
            src="/img/early-club.jpg"
            alt="Early club days"
          />
        </Box>
        The club was founded in 1986 as a social organization for gay men in a
        time when non-bar activities were sought after during the uptick of the
        AIDS crisis. Fundraising for gay men&apos;s health organizations has
        always been central to the member&apos;s activities since day one.
      </p>

      <blockquote>
        <p>
          Jim Powell, a friend of mine came up with the idea of a gay four wheel
          drive club. I was at the first meeting in a bar on South Broadway. In
          advance of the first meeting, Jim went around to the gay bars &amp;
          parks and put fliers on every 4-wheel drive vehicle he saw...{" "}
        </p>

        <p>
          There were a dozen people at that meeting. Jim told everyone in
          attendance that it&apos;s &ldquo;our club&rdquo; to run it as we
          wished. We had to pick a name for the club. Keep in mind this was a
          time when not a lot of guys were out of the closet. We had to choose
          between &ldquo;Fourwheels R Us&rdquo; or &ldquo;4 Players&rdquo;. Some
          of the guys wanted the first option because it was not sexual. I
          personally thought it sounded too much like &ldquo;toys r us&rdquo;.
          It&apos;s obvious which name was chosen. I think that if they had
          gotten their way, I don&apos;t think the club would still be here with
          a name like the first option. The rest of the meeting involved the
          legal stuff like Bylaws and such.
        </p>

        <p>
          The bottom line was &ldquo;we will let anyone into the club that has a
          four-wheel drive and a man attached to it.&rdquo;
        </p>

        <cite>Kurtis Keele, attendee at the first meeting</cite>
      </blockquote>
      <p>
        If you have have any club photos, history, or anecdotes to share, please
        email the{" "}
        <a href="mailto:webmaster@4-playersofcolorado.org">webmaster</a>.
      </p>

      <h3>Charter Members</h3>
      <p>
        Though the club was officially incorporated in November of 1986, the 26
        members who adopted and signed the Bylaws on or before June 1, 1986 are
        known as Charter members of the 4-Players of Colorado.
        <ul>
          <li>Jim Powell (Founder)</li>
          <li>Ashley Johnson, Jr.</li>
          <li>Bill Salas</li>
          <li>Bill Widdison</li>
          <li>Bill Willis</li>
          <li>Carl Schneider</li>
          <li>David &ldquo;Daddy Dawg&rdquo; Faull</li>
          <li>Darrell Yamada</li>
          <li>Hugh Morris</li>
          <li>Keith Lee</li>
          <li>Kenny Tenbensel</li>
          <li>Kurtis Keele</li>
          <li>Jeff McNamar</li>
          <li>Jim Vela</li>
          <li>John Krasovich</li>
          <li>John Smith</li>
          <li>John Raferty</li>
          <li>Lee Griffin</li>
          <li>Mark Reddemann</li>
          <li>Mike Ketterman</li>
          <li>Mike Knorr</li>
          <li>Randy Hamilton</li>
          <li>Randy MacMillan</li>
          <li>Sam Nelson</li>
          <li>Steve McClung</li>
          <li>Walter &ldquo;Bear&rdquo; Pedigo</li>
          <li>Wayne Jakino</li>
        </ul>
      </p>
    </div>
  );
};

export default History;
