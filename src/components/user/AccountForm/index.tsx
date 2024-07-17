import { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import ACCOUNT_FORM_QUERY from "./accountForm.graphql";

import {
  isEmeritusMember,
  // isMember,
  isAtLeastAssociateMember, // Full && Associate
  isActive,
  isPastDue,
  isDelinquent,
  isInactive,
  hasResigned,
  wasRemoved,
  isGuestMember,
  isLocked,
  isLimited,
  isDeceasedMember,
  whatYearIsIt,
  // isActiveOrPastDue,
} from "@/lib";
import { dateFormat } from "@/constants";

// import Switch from '@/components/common/Switch';
import ChangeEmail from "@/components/login/ChangeEmail";
import ChangePassword from "@/components/login/ChangePassword";
import Filter from "@/components/login/Filter.jsx";
import PayDues from "@/components/payment/PayDues";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/utility/ErrorMessage";
import Icon from "@/components/common/Icon/";
import Badge from "@/components/common/Badge";
import Loading from "@/components/utility/Loading";

import Styles from "./accountForm.module.scss";

const AccountForm = ({ token = null }) => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const handlePaymentLoading = useCallback(
    (isLoading: boolean) => {
      setIsPaymentLoading(isLoading);
    },
    [setIsPaymentLoading]
  );
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(ACCOUNT_FORM_QUERY);

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  if (queryLoading) {
    return null;
  }

  const { myself, logItems } = queryData;
  const { accountType, accountStatus, email, eventsRSVPd } = myself;

  let runsAttended = 0;
  let meetingsAttended = 0;

  if (eventsRSVPd && eventsRSVPd.length && eventsRSVPd.length > 0) {
    runsAttended = eventsRSVPd
      .filter((rsvp: any) => rsvp.status === EventRsvp.GOING)
      .filter((rsvp: any) => rsvp.event.type === EventType.RUN)
      .filter(
        (rsvp: any) => new Date(rsvp.event.startTime) < new Date()
      ).length;

    meetingsAttended = eventsRSVPd
      .filter((rsvp: any) => rsvp.status === EventRsvp.GOING)
      .filter((rsvp: any) => rsvp.event.type === EventType.MEETING)
      .filter(
        (rsvp: any) => new Date(rsvp.event.startTime) < new Date()
      ).length;
  }

  return (
    <div className={Styles["account-form"]}>
      <div className={Styles["account-section-wrapper"]}>
        <section className={Styles["account-section"]}>
          <h3 className={Styles["account-heading"]}>Account Details</h3>
          <div className={Styles["account-content"]}>
            <div className={Styles["account-details"]}>
              {isPaymentLoading ? (
                <Loading loading={isPaymentLoading} />
              ) : (
                <>
                  <Filter
                    typeCheck={isAtLeastAssociateMember}
                    statusCheck={isActive}
                  >
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="success">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>

                      <p>Your account is in good standing.</p>
                    </>
                  </Filter>

                  <Filter
                    typeCheck={isAtLeastAssociateMember}
                    statusCheck={isPastDue}
                  >
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="caution">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Past Due</h3> */}
                        Happy New Year! It&apos;s {whatYearIsIt()} and that
                        means it&apos;s time to pay your membership dues. Please
                        pay before March 31st to remain on the membership
                        roster.
                        <br />
                        <br />
                        <PayDues onLoading={handlePaymentLoading}>
                          <Button disabled={isPaymentLoading}>Pay Now</Button>
                        </PayDues>
                      </p>
                    </>
                  </Filter>

                  <Filter
                    typeCheck={isAtLeastAssociateMember}
                    statusCheck={isDelinquent}
                  >
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="warning">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Lapsed</h3> */}
                        Your account has been suspended because your membership
                        dues were not been received by March 31st. If you would
                        like to reactivate your membership, send an email to{" "}
                        <a href="mailto:board@4-playersofcolorado.org">
                          board@4-playersofcolorado.org
                        </a>
                        .
                      </p>
                    </>
                  </Filter>

                  <Filter
                    typeCheck={isAtLeastAssociateMember}
                    statusCheck={isInactive}
                  >
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="failure">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Inactive</h3> */}
                        Your membership has lapsed due to non-payment. If you
                        would like to become a member again, send an email to{" "}
                        <a href="mailto:board@4-playersofcolorado.org">
                          board@4-playersofcolorado.org
                        </a>
                        .
                      </p>
                    </>
                  </Filter>

                  <Filter
                    typeCheck={isAtLeastAssociateMember}
                    statusCheck={hasResigned}
                  >
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="failure">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Resigned</h3> */}
                        You have resigned from membership. Sorry to see you go!
                        If you would like to become a member again, send an
                        email to{" "}
                        <a href="mailto:board@4-playersofcolorado.org">
                          board@4-playersofcolorado.org
                        </a>
                        .
                      </p>
                    </>
                  </Filter>

                  <Filter
                    typeCheck={isAtLeastAssociateMember}
                    statusCheck={wasRemoved}
                  >
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="failure">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Removed</h3> */}
                        You have been removed from membership. If you have any
                        questions, please email{" "}
                        <a href="mailto:board@4-playersofcolorado.org">
                          board@4-playersofcolorado.org
                        </a>
                        .
                      </p>
                    </>
                  </Filter>

                  <Filter typeCheck={isGuestMember} statusCheck={isActive}>
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="neutral">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Guest</h3> */}
                        You are a guest.
                      </p>

                      <p>
                        Runs Attended: {runsAttended} <br />
                        Meetings Attended: {meetingsAttended}
                      </p>

                      <p>
                        You must attend 1 run and 1 run regular meeting before
                        you are eligible for membership.
                      </p>

                      <p>
                        If you have any questions, please contact the{" "}
                        <a href="mailto:board@4-playersofcolorado.org">Board</a>
                        .
                      </p>
                    </>
                  </Filter>

                  <Filter typeCheck={isGuestMember} statusCheck={isInactive}>
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="neutral">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Guest</h3> */}
                        You are a guest.
                      </p>

                      <p>
                        Runs Attended: {runsAttended} <br />
                        Meetings Attended: {meetingsAttended}
                      </p>

                      <p>
                        You must attend 1 run and 1 run regular meeting before
                        you are eligible for membership.
                      </p>

                      <p>
                        If you have any questions, please email{" "}
                        <a href="mailto:board@4-playersofcolorado.org">
                          board@4-playersofcolorado.org
                        </a>
                        .
                      </p>
                    </>
                  </Filter>

                  <Filter typeCheck={isGuestMember} statusCheck={isLimited}>
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="warning">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Limited</h3> */}
                        You are a guest.
                      </p>

                      <p>
                        Runs Attended: {runsAttended} <br />
                        Meetings Attended: {meetingsAttended}
                      </p>

                      <p>
                        As a guest, you are allowed to attend 3 runs per
                        calendar year before we ask that you become a member.
                      </p>

                      {runsAttended >= 1 && meetingsAttended >= 1 && (
                        <p>
                          Congratulations! You are eligible for membership. If
                          you have any questions, please email{" "}
                          <a href="mailto:board@4-playersofcolorado.org">
                            board@4-playersofcolorado.org
                          </a>
                          .
                        </p>
                      )}
                    </>
                  </Filter>

                  <Filter typeCheck={isEmeritusMember}>
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="neutral">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* Account Type: Emeritus */}
                        {/* <h3>Limited</h3> */}
                        You are an Emeritus Member. You have all the perks of
                        full membership, except you do not have to pay annual
                        dues and you cannot vote on club business.
                      </p>
                    </>
                  </Filter>

                  <Filter typeCheck={isGuestMember} statusCheck={isLocked}>
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]} type="failure">
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Locked</h3> */}
                        Welcome! Your account is being reviewed. Please make
                        sure your profile is filled out. If you have any
                        questions, please email{" "}
                        <a href="mailto:webmaster@4-playersofcolorado.org">
                          webmaster@4-playersofcolorado.org
                        </a>
                        .
                      </p>
                    </>
                  </Filter>

                  <Filter statusCheck={isDeceasedMember}>
                    <>
                      <h4>
                        {AccountTypes[accountType as keyof typeof AccountTypes]}{" "}
                        Member{" "}
                        <Badge className={Styles["badge"]}>
                          {
                            AccountStatuses[
                              accountStatus as keyof typeof AccountStatuses
                            ]
                          }
                        </Badge>
                      </h4>
                      <p>
                        {/* <h3>Locked</h3> */}
                        This account belonged to a club member who has passed
                        away. It is being maintained for historical records.
                      </p>
                    </>
                  </Filter>
                </>
              )}
            </div>
          </div>
        </section>

        <Filter typeCheck={isAtLeastAssociateMember}>
          <section className={Styles["account-section"]}>
            <h3 className={Styles["account-heading"]}>Annual Dues</h3>

            <div className={Styles["account-content"]}>
              {isPaymentLoading ? (
                <Loading loading={isPaymentLoading} />
              ) : (
                <>
                  {logItems && logItems.length > 0 ? (
                    <>
                      {logItems.map((item: any) => {
                        const msg = item.logger
                          ? `${item.message}, logged by ${item.logger.firstName} ${item.logger.lastName}`
                          : item.message;

                        return (
                          <div
                            key={item.id}
                            className={Styles["account-details"]}
                          >
                            <Icon className={Styles["icon"]} icon="success" />{" "}
                            Dues received{" "}
                            {format(new Date(item.time), dateFormat)}
                            <br />
                            <small>{msg}</small>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className={Styles["account-details"]}>
                      <h4>No record of dues received</h4>
                      <p>
                        If you have paid recently, the website is likely out of
                        date.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </Filter>

        {/* <div>
          <div>
            <h3>Notifications</h3>
          </div>

          <div>
            <div>
              <h4>General Newsletter</h4>
              <p>
                Get notified of upcoming events, announcements, and other
                club-related updates.
              </p>
              <p>Switch</p>
            </div>

            <Filter typeCheck={isMember} statusCheck={isActive}>
              <div>
                <h4>Member Newsletter</h4>
                <p>
                  Get notified of meeting minutes, votes, and other club-related
                  business.
                </p>
                <p>Switch</p>
              </div>
            </Filter>

            <Filter statusCheck={isActiveOrPastDue}>
              <div>
                <h4>Event Announcements</h4>
                <p>Get notified of upcoming club events.</p>
                <p>Switch</p>
              </div>
            </Filter>
          </div>
        </div> */}
      </div>

      {/* 
        <NotificationPreferences /> 

        Campaigns:
        - Member Newsletter
        - Club Announcements
        - Event Announcements

        Transactional: 
        - Event Updates (if RSVP yes)
        - Event Cancellations (if RSVP yes)
        - Password reset
        - Account created
          - To admin/board
          - To user
        - Account status change
          - Account unlocked triggers automation
          - New full member
        - Post event: Minutes have been posted
        
        Automation:
        - Welcome
          - New account welcome
          - New account helpful tips

      */}

      <div className={Styles["email-actions"]}>
        <ChangeEmail email={email} />
        <ChangePassword />
      </div>
      {/* <DeleteAccount /> */}
    </div>
  );
};

export default AccountForm;
