enum Role {
  ADMIN = "ADMIN", // Manage permissions
  OFFICER = "OFFICER", // Administrative area
  RUN_MASTER = "RUN_MASTER", // Able to create events
  RUN_LEADER = "RUN_LEADER", // Able to view extra event details then log run report
  USER = "USER", // DEFAULT
}

enum AccountStatus {
  ACTIVE = "ACTIVE",
  PAST_DUE = "PAST_DUE", // account overdue - active, must pay
  DELINQUENT = "DELINQUENT", // account 3 months to 1 year overdue - locked, contact, must pay
  INACTIVE = "INACTIVE", // account 1+ year overdue - locked, contact
  REMOVED = "REMOVED", // cannot do anything - locked, contact
  RESIGNED = "RESIGNED", // cannot do anything - locked, contact
  REJECTED = "REJECTED", // cannot do anything
  LIMITED = "LIMITED", // attended too many runs - locked, must become member
  LOCKED = "LOCKED", // DEFAULT - must be approved
  DECEASED = "DECEASED",
}

enum AccountType {
  FULL = "FULL",
  ASSOCIATE = "ASSOCIATE", // No voting rights, no member's only events/discussion
  EMERITUS = "EMERITUS", // Same as Associate
  GUEST = "GUEST", // DEFAULT - confirmed user. No roster, no voting rights, no member's only events/discussion
}

// unique, can only be one user per office
enum Office {
  PRESIDENT = "President",
  VICE_PRESIDENT = "Vice President",
  SECRETARY = "Secretary",
  TREASURER = "Treasurer",
}

// can be multiple users with same title
enum Title {
  WEBMASTER = "Webmaster",
  // RUN_MASTER = "Run Master",
  // RUN_LEADER = "Run Leader",
  HISTORIAN = "Historian",
  CHARTER_MEMBER = "Charter Member",
}

enum Month {
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
}

enum MembershipMessageCode {
  ACCOUNT_CREATED = "ACCOUNT_CREATED",
  ACCOUNT_UNLOCKED = "ACCOUNT_UNLOCKED",
  ACCOUNT_CHANGED = "ACCOUNT_CHANGED",
  ACCOUNT_REJECTED = "ACCOUNT_REJECTED",
  DUES_PAID = "DUES_PAID",
  OFFICE_ADDED = "OFFICE_ADDED",
  OFFICE_REMOVED = "OFFICE_REMOVED",
  TITLE_ADDED = "TITLE_ADDED",
  TITLE_REMOVED = "TITLE_REMOVED",
  MEMBERSHIP_GRANTED = "MEMBERSHIP_GRANTED",
  MEMBERSHIP_ELIGIBLE = "MEMBERSHIP_ELIGIBLE",
  GUEST_RESTRICTED = "GUEST_RESTRICTED",
}

enum ActivityMessageCode {
  EVENT_ATTENDED = "EVENT_ATTENDED",
  RUN_LED = "RUN_LED",
  EVENT_REVIEW_SUBMITTED = "EVENT_REVIEW_SUBMITTED",
  RUN_REPORT_SUBMITTED = "RUN_REPORT_SUBMITTED",
  GALLERY_PHOTO_SUBMITTED = "GALLERY_PHOTO_SUBMITTED",
  GALLERY_PHOTOS_SUBMITTED = "GALLERY_PHOTOS_SUBMITTED",
  PROFILE_PHOTO_SUBMITTED = "PROFILE_PHOTO_SUBMITTED",
  RIGBOOK_PHOTO_SUBMITTED = "RIGBOOK_PHOTO_SUBMITTED",
  // COMMENTED
  JOINED = "JOINED",
}

enum NewsletterAction {
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
}

enum NewsletterList {
  MEMBERS = "MEMBERS",
  GENERAL = "GENERAL",
}

enum EventType {
  RUN = "RUN",
  SOCIAL = "Social",
  MEETING = "MEETING",
  FUNDRAISING = "FUNDRAISING",
  CAMPING = "CAMPING",
  CLINIC = "CLINIC",
}

enum EventRsvp {
  GOING = "GOING",
  NONE = "NONE",
  CANT_GO = "CANT_GO",
  MAYBE = "MAYBE",
}

enum TrailDifficulty {
  UNKNOWN,
  EASY,
  INTERMEDIATE,
  ADVANCED,
}
