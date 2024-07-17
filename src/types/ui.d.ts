/*
  Note: If someone is assigned a role, that does not change their title or office.
  Must be done manually.
*/
enum Roles {
  ADMIN = "Admin",
  OFFICER = "Officer",
  RUN_MASTER = "Run Master",
  RUN_LEADER = "Run Leader",
  USER = "User",
}

enum AccountStatuses {
  // Paid-up full members
  ACTIVE = "Active",
  // Full members who haven't paid dues between 1/1 and 3/31
  PAST_DUE = "Past Due",
  // Full members who haven't paid dues between 4/1 and 12/31
  DELINQUENT = "Delinquent",
  // Members who have been removed by the officers
  REMOVED = "Removed",
  // Members who no longer want to be associated
  RESIGNED = "Resigned",
  // Full members = Dues not received in a year
  INACTIVE = "Inactive",
  // For accounts that were rejected
  REJECTED = "Rejected",
  // For Guests who should join or leave
  LIMITED = "Limited",
  // For new profiles
  LOCKED = "Locked",
  DECEASED = "Deceased",
}

enum AccountTypes {
  FULL = "Full",
  ASSOCIATE = "Associate",
  EMERITUS = "Emeritus",
  GUEST = "Guest",
}

enum TrailDifficulties {
  UNKNOWN = "Unknown",
  // BEGINNER = 'Easy', // deprecated
  EASY = "Easy",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

enum TrailConditions {
  UNKNOWN = "Unknown",
  CLEAR = "Clear",
  MINOR_ISSUES = "Minor Issues",
  MAJOR_ISSUES = "Major Issues",
  CLOSED = "Closed",
}

enum MigrationStatuses {
  NEEDED = "Not Done",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

enum EventTypes {
  RUN = "Run",
  // COLLECTION = 'Collection of Events', // Moab, camping, etc.
  FUNDRAISING = "Fundraising", // Beer bust, etc.
  MEETING = "Meeting",
  CLINIC = "Clinic",
  SOCIAL = "Social",
  CAMPING = "Camping",
}

type RsvpStatus = keyof typeof RsvpStatuses;

enum RsvpStatuses {
  NONE = "None",
  CANT_GO = "Can't Go",
  GOING = "Going",
  MAYBE = "Maybe",
}

type PastRsvpStatus = keyof typeof PastRsvpStatuses;

enum PastRsvpStatuses {
  NONE = "",
  CANT_GO = "Didn't Go",
  GOING = "Went",
  MAYBE = "Didn't Go",
}

enum OutfitLevel {
  MODIFIED = "Modified",
  STOCK = "Stock",
}

enum Genders {
  MALE = "Male",
  FEMALE = "Female",
  UNDISCLOSED = "Undisclosed",
  OTHER = "Other",
}

enum Weather {
  CLEAR = "Clear",
  PARTLY_CLOUDY = "Partly Cloudy",
  CLOUDY = "Cloudy",
  OVERCAST = "Overcast",
  FOG = "Fog",
  DRIZZLE = "Drizzle",
  RAIN = "Rain",
  STORMY = "Thunderstorms",
  HAIL = "Hail",
  TORNADO = "Tornado",
  SLEET = "Wintry Mix",
  SNOW = "Snow",
}

enum States {
  AL = "Alabama",
  AK = "Alaska",
  AZ = "Arizona",
  AR = "Arkansas",
  CA = "California",
  CO = "Colorado",
  CT = "Connecticut",
  DE = "Delaware",
  DC = "District Of Columbia",
  FL = "Florida",
  GA = "Georgia",
  HI = "Hawaii",
  ID = "Idaho",
  IL = "Illinois",
  IN = "Indiana",
  IA = "Iowa",
  KS = "Kansas",
  KY = "Kentucky",
  LA = "Louisiana",
  ME = "Maine",
  MD = "Maryland",
  MA = "Massachusetts",
  MI = "Michigan",
  MN = "Minnesota",
  MS = "Mississippi",
  MO = "Missouri",
  MT = "Montana",
  NE = "Nebraska",
  NV = "Nevada",
  NH = "New Hampshire",
  NJ = "New Jersey",
  NM = "New Mexico",
  NY = "New York",
  NC = "North Carolina",
  ND = "North Dakota",
  OH = "Ohio",
  OK = "Oklahoma",
  OR = "Oregon",
  PA = "Pennsylvania",
  RI = "Rhode Island",
  SC = "South Carolina",
  SD = "South Dakota",
  TN = "Tennessee",
  TX = "Texas",
  UT = "Utah",
  VT = "Vermont",
  VA = "Virginia",
  WA = "Washington",
  WV = "West Virginia",
  WI = "Wisconsin",
  WY = "Wyoming",
}
