import React from "react";

import Styles from "./kennysCabin.module.scss";

const KennysCabin = () => {
  return (
    <div className={Styles["in-memoriam"]}>
      <h3>Kenny&apos;s Cabin</h3>

      <p>
        <img
          className={Styles["img"]}
          src="/img/kennys-cabin.jpg"
          width="400"
          alt="Kenny's Cabin map"
        />
      </p>
      <blockquote>
        <p>
          In the early days of the club, members went exploring for possible
          places to go four wheeling. There weren’t many maps or info available,
          unlike today with GPS coordinates etc. One Saturday, myself and a
          friend of mine, who was an expert on Colorado ghost towns, went
          searching for a settlement called &lsquo;LeMarti&rsquo; up above Idaho
          Springs. We chanced upon an beautiful alpine meadow waith a crumbling
          log building and a stream running down hill. Later, we would often
          stop there, have lunch and drive the shelf road and other trails in
          the area. During the 1980s, HIV/AIDS took many of our members. One was
          Kenny Tensenbel. On a beautiful summer day, we scattered his ashes in
          the meadow just below the cabin. Later, Mark Reddemann&apos;s family
          and club members scattered his ashes there as well. Since then, Norm
          Bywater&apos;s friend, Terry, and Willy C&apos;s mom and stepdad have
          been placed there.
        </p>
        <cite>David &lsquo;Daddy Dawg&rsquo; Faull</cite>
      </blockquote>
      <p>
        For over 30 years, Kenny&apos;s Cabin was the club&apos;s honored
        retreat. The cabin&apos;s condition deteriorated over time, but members
        would traverse the hills southwest of Idaho Springs to pay their
        respects annually. Though the cabin was accessible via public Forestry
        Service roads, the property that the cabin sat on was private. In 2020,
        the club discovered that the land was sold and the new owner had begun
        development. The cabin is still visible from the Forestry Service road,
        but it is now inaccessible.
      </p>
      <p>
        The former members, friends, and family who rest on the hallowed ground
        known as Kenny&apos;s Cabin:
        <table className={Styles["table"]}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Relation</th>
              <th>Story</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kenny Tenbensal</td>
              <td>Member</td>
              <td>d: 27 Mar 1991 (164 RMN)</td>
            </tr>
            <tr>
              <td>Mark Reddemann</td>
              <td>Member</td>
              <td>
                <em>Need Info</em>
              </td>
            </tr>
            <tr>
              <td>Terry</td>
              <td>Friend</td>
              <td>
                <em>Friend of Norm Bywaters</em>
              </td>
            </tr>
            <tr>
              <td className={Styles["td-split"]}>
                Jacquiline Page
                <a href="https://i1.wp.com/members.4-playersofcolorado.org/wp-content/uploads/2016/12/DSC00482.jpg">
                  <img
                    className="aligncenter size-thumbnail wp-image-3003"
                    src="https://i1.wp.com/members.4-playersofcolorado.org/wp-content/uploads/2016/12/DSC00482.jpg?resize=150%2C150"
                    alt="Jacqueline Page"
                    width="86"
                    height="86"
                  />
                </a>
              </td>
              <td>Family</td>
              <td>
                Willy Clark&apos;s Mom
                <br />
                <blockquote>
                  <p>
                    Mom was from Worcester, Massachusetts. She was a great mom
                    and was always there for me. She was upset when the military
                    sent me to Vietnam but was excited when I got back. After my
                    dad passed away in December 1994, she was alone. She came
                    out to visit me and had a great time. Shortly thereafter,
                    she moved to Houston and remarried. My step dad Walter Page
                    died in 2000. My mom moved to Denver in September 2004. She
                    passed away in November 2007. Mom and Walter&apos;s remains
                    were let free at Kenny&apos;s Cabin in the summer of 2012.
                  </p>
                  <cite>Willy</cite>
                </blockquote>
              </td>
            </tr>
            <tr>
              <td>Walter Page</td>
              <td>Family</td>
              <td>Willy Clark&apos;s Stepdad</td>
            </tr>
          </tbody>
        </table>
      </p>
      <h4>Location</h4>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=39.72940,+-105.63615&aq=&sll=38.997934,-105.550567
&sspn=5.361017,8.009033&vpsrc=6&ie=UTF8&ll=39.729164,-105.636289&spn=0.041455,0.062571&t=m&z=14"
        >
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=400x300&maptype=roadmap&markers=size:mid%7Ccolor:red%7C|39.729161,-105.636254&key=${
              import.meta.env.GOOGLE_MAPS_API_KEY
            }`}
            alt="Map"
            className={Styles["map"]}
          />
        </a>
        Forest Srv Rd, Arapaho National Forest, Idaho Springs, CO 80452
        <br />
        <br />
        GPS:{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=39.729164,-105.636289&aq=&sll=38.997934,-105.550567
&sspn=5.361017,8.009033&vpsrc=6&ie=UTF8&ll=39.729164,-105.636289&spn=0.041455,0.062571&t=m&z=14"
        >
          39.729164, -105.636289
        </a>
      </p>
      <h4>Known Club Visits</h4>
      <ul>
        <li>13 Sept 2003</li>
        <li>1 Oct 2005</li>
        <li>26 Aug 2006</li>
        <li>June 2012</li>
        <li>25 July 2015</li>
        <li>15 Oct 2016</li>
        <li>14 Oct 2017</li>
        <li>7 Oct 2018</li>
        <li>13 Oct 2019</li>
        <li>18 July 2020</li>
      </ul>
    </div>
  );
};

export default KennysCabin;
