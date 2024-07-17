export const perPage = 4;
export const siteNameShort = "4-Players";
export const siteName = "4-Players of Colorado";
export const DEFAULT_FULL_MEMBER_DUES_AMOUNT = 40;
export const DEFAULT_ASSOCIATE_MEMBER_DUES_AMOUNT = 20;

/**
 * Date/time
 *
 * Outdated:
 * M/d/yyyy    // 1/1/2001
 * M/d/yy      // 1/1/01
 */
export const dateFormat = "dd LLL yyyy"; // 08 Sept 2018
export const dateFormatAbbrev = "eee, MMM d"; // Sat, Jan 2
export const dateFormatFull = "EEEE, MMMM d, yyyy"; // Thursday, April 1, 2021
export const dateFormatForm = "yyyy-MM-dd"; // 2017-08-01
export const timeFormat = "h:mm a"; // 3:00 PM
export const timeFormat24Hr = "HH:mm"; // 03:00
export const dateTimeFormat = `${dateFormat}, ${timeFormat}`;
export const dateTimeFormatAbbrev = `${dateFormatAbbrev}, ${timeFormat}`;

export type NotificationSetting = keyof typeof notificationsSettings;

export const notificationsSettings = {
  emailPublicNotifications: "Public Newsletter",
  emailMemberNotifications: "Members Newsletter",
};

export const DEFAULT_AVATAR_SRC = "/img/default-user.jpg";
export const DEFAULT_AVATAR_SMALL_SRC = "/img/default-user.jpg";
export const DEFAULT_RIG_SRC = "/img/default-vehicle.jpg";
export const DEFAULT_EVENT_SRC = "/img/default-event.jpg";
export const DEFAULT_EVENT_SMALL_SRC = "/img/default-event-sm.jpg";
export const DEFAULT_TRAIL_SRC = "https://placekitten.com/700/400";
export const DEFAULT_TRAIL_SMALL_SRC = "https://placekitten.com/150/100";

export const membershipLogMessageTypes = [
  "ACCOUNT_CREATED",
  "ACCOUNT_UNLOCKED",
  "ACCOUNT_CHANGED",
  "ACCOUNT_REJECTED",
  "DUES_PAID",
  "OFFICE_ADDED",
  "OFFICE_REMOVED",
  "TITLE_ADDED",
  "TITLE_REMOVED",
  "MEMBERSHIP_ELIGIBLE", // Redundant?
  "MEMBERSHIP_GRANTED", // Redundant?
  "GUEST_RESTRICTED", // Redundant?
];

export const getTrailDifficultyBadgeType = (difficulty: string) => {
  switch (difficulty) {
    case "ADVANCED":
      return "fail";
    case "INTERMEDIATE":
      return "caution";
    case "EASY":
    case "BEGINNER":
      return "success";
    default:
      return "neutral";
  }
};

export const membershipLogMessages = {
  ACCOUNT_CREATED: () => "Account created",
  ACCOUNT_UNLOCKED: ({ logger }: { logger: string }) =>
    `Account unlocked by ${logger}`,
  ACCOUNT_CHANGED: ({
    property,
    beforeState,
    afterState,
    logger,
  }: {
    property: string;
    beforeState: string;
    afterState: string;
    logger: string;
  }) =>
    logger
      ? `${property} changed from "${beforeState}" to "${afterState}" by ${logger}`
      : `${property} automatically changed from "${beforeState}" to "${afterState}"`,
  ACCOUNT_REJECTED: ({ logger, reason }: { logger: string; reason: string }) =>
    `Account rejected by ${logger}: ${reason}`,
  DUES_PAID: (amt: number) => `Paid $${amt}`,
  OFFICE_ADDED: ({ office, logger }: { office: string; logger: string }) =>
    `"${office}" office added by ${logger}`,
  OFFICE_REMOVED: ({ office, logger }: { office: string; logger: string }) =>
    `"${office}" office removed by ${logger}`,
  TITLE_ADDED: ({ title, logger }: { title: string; logger: string }) =>
    `"${title}" title added by ${logger}`,
  TITLE_REMOVED: ({ title, logger }: { title: string; logger: string }) =>
    `"${title}" title removed by ${logger}`,
  MEMBERSHIP_ELIGIBLE: () => "Eligible for membership",
  MEMBERSHIP_GRANTED: ({
    accountType,
  }: {
    accountType: keyof typeof AccountTypes;
  }) => `Became a ${AccountTypes[accountType]} Member`,
  GUEST_RESTRICTED: () => "Attended 3 runs",
};

export const activityLogMessages = {
  EVENT_ATTENDED: ({ title, type }: { title: string; type: string }) =>
    `Attended "${title}" ${type}`,
  RUN_LED: ({ title }: { title: string }) => `Led "${title}" run`,
  EVENT_REVIEW_SUBMITTED: ({ title, type }: { title: string; type: string }) =>
    `Wrote a review for "${title}" ${type}`,
  RUN_REPORT_SUBMITTED: ({ title, type }: { title: string; type: string }) =>
    `Wrote a Run Report for "${title}" ${type}`,
  GALLERY_PHOTO_SUBMITTED: ({ title }: { title: string }) =>
    `Added a photo to "${title}" gallery`,
  GALLERY_PHOTOS_SUBMITTED: ({ title }: { title: string }) =>
    `Added photos to "${title}" gallery`,
  PROFILE_PHOTO_SUBMITTED: () => "Added a new profile photo",
  RIGBOOK_PHOTO_SUBMITTED: () => "Added a new Rigbook photo",
  // COMMENTED: '',
  JOINED: () => "Became a Full Member",
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
