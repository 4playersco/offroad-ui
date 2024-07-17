import {
  DEFAULT_ASSOCIATE_MEMBER_DUES_AMOUNT,
  DEFAULT_FULL_MEMBER_DUES_AMOUNT,
} from "@/constants";

export const sortByDateAsc = (key: string) => {
  return (a: any, b: any) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };
};

export const sortByDateDesc = (key: string) => {
  return (a: any, b: any) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  };
};

export const getMemberType = (type: keyof typeof AccountTypes) => {
  return `${AccountTypes[type] || "Guest"} Member`;
};

export const getPhoneNumber = (phoneNo: number) => {
  const phoneString = phoneNo.toString();

  return phoneString.length === 10
    ? `(${phoneString.substring(0, 3)}) ${phoneString.substring(
        3,
        6
      )}-${phoneString.substring(6)}`
    : "";
};

export const formatFilterSelect = (obj: object) => {
  return Object.entries(obj).map((entry) => ({
    value: entry[0],
    label: entry[1],
  }));
};

type FormatFilterSelected = (values: string[], valuesMap: any) => object[];

export const formatFilterSelected: FormatFilterSelected = (
  values = [],
  valuesMap
) => {
  const result = values
    .filter((value) => valuesMap[value])
    .map((value) => ({
      value,
      label: valuesMap[value],
    }));

  return result;
};

export const emailGroups = [
  { value: "officers", label: "Officers" },
  { value: "runmaster", label: "Run Master" },
  { value: "webmaster", label: "Webmaster" },
  { value: "run_leaders", label: "Run Leaders" },
  { value: "full_membership", label: "Active Full Members" },
  { value: "all_active", label: "Active Users" },
  { value: "guests", label: "Active Guests" },
  { value: "all_users", label: "ALL USERS" },
];

// Roles
export const isAdmin = (role: Role) => role === Role.ADMIN;

export const isBoardMember = (role: Role) => role === Role.OFFICER;

export const isAtLeastBoardMember = (role: Role) => {
  return [Role.OFFICER, Role.ADMIN].includes(role);
};

export const isRunMaster = (role: Role) => role === Role.RUN_MASTER;

export const isRunLeader = (role: Role) => role === Role.RUN_LEADER;

export const isAtLeastRunMaster = (role: Role) => {
  return [Role.RUN_MASTER, Role.OFFICER, Role.ADMIN].includes(role);
};

export const isAtMostRunmaster = (role: Role) => {
  return [Role.RUN_MASTER, Role.RUN_LEADER, Role.USER].includes(role);
};

export const isAtLeastRunLeader = (role: Role) => {
  return [Role.RUN_LEADER, Role.RUN_MASTER, Role.OFFICER, Role.ADMIN].includes(
    role
  );
};

// Types
export const isFullMember = (type: AccountType) => type === AccountType.FULL;
export const isNotFullMember = (type: AccountType) => type !== AccountType.FULL;

export const isMember = (type: AccountType) =>
  [AccountType.ASSOCIATE, AccountType.EMERITUS, AccountType.FULL].includes(
    type
  );

export const isAssociateMember = (type: AccountType) =>
  type === AccountType.ASSOCIATE;

export const isAtLeastAssociateMember = (type: AccountType) => {
  return [AccountType.ASSOCIATE, AccountType.FULL].includes(type);
};

export const isEmeritusMember = (type: AccountType) =>
  type === AccountType.EMERITUS;

export const isAtLeastEmeritusMember = (type: AccountType) => {
  return [
    AccountType.EMERITUS,
    AccountType.ASSOCIATE,
    AccountType.FULL,
  ].includes(type);
};

export const isGuestMember = (type: AccountType) => type === AccountType.GUEST;

export const isAtLeastGuestMember = (type: AccountType) => {
  return [
    AccountType.GUEST,
    AccountType.EMERITUS,
    AccountType.ASSOCIATE,
    AccountType.FULL,
  ].includes(type);
};

export const formatPhone = (phoneNum: number) => {
  const phone = phoneNum.toString();
  const areaCode = phone.substring(0, 3);
  const prefix = phone.substring(3, 6);
  const line = phone.substring(6);

  return `${areaCode}-${prefix}-${line}`;
};

// Statuses
export const isActive = (status: AccountStatus) =>
  status === AccountStatus.ACTIVE;
export const isNotActive = (status: AccountStatus) => !isActive(status);

export const isPastDue = (status: AccountStatus) =>
  status === AccountStatus.PAST_DUE;
export const isNotPastDue = (status: AccountStatus) => !isPastDue(status);

export const isActiveOrPastDue = (status: AccountStatus) =>
  status === AccountStatus.ACTIVE || status === AccountStatus.PAST_DUE;

export const isDelinquent = (status: AccountStatus) =>
  status === AccountStatus.DELINQUENT;
export const isNotDelinquent = (status: AccountStatus) => !isDelinquent(status);

export const wasRemoved = (status: AccountStatus) =>
  status === AccountStatus.REMOVED;
export const wasNotRemoved = (status: AccountStatus) => !wasRemoved(status);

export const hasResigned = (status: AccountStatus) =>
  status === AccountStatus.RESIGNED;
export const hasNotResigned = (status: AccountStatus) => !hasResigned(status);

export const isInactive = (status: AccountStatus) =>
  status === AccountStatus.INACTIVE;
export const isNotInactive = (status: AccountStatus) => !isInactive(status);

export const isLimited = (status: AccountStatus) =>
  status === AccountStatus.LIMITED;
export const isNotLimited = (status: AccountStatus) => !isLimited(status);

export const isLocked = (status: AccountStatus) =>
  status === AccountStatus.LOCKED;
export const isNotLocked = (status: AccountStatus) => !isLocked(status);

export const isRejected = (status: AccountStatus) =>
  status === AccountStatus.REJECTED;
export const isNotRejected = (status: AccountStatus) => !isRejected(status);

export const isDeceasedMember = (status: AccountStatus) =>
  status === AccountStatus.DECEASED;
export const isNotDeceasedMember = (status: AccountStatus) =>
  !isDeceasedMember(status);

// Cloudinary upload presets
export const getUploadLocation = (appendage: string) => {
  const env = import.meta.env.STAGING_ENV || import.meta.env.NODE_ENV;

  switch (env) {
    case "development":
      return `dev_${appendage}`;
    case "staging":
      return `staging_${appendage}`;
    case "production":
    default:
      return `prod_${appendage}`;
  }
};

export const uploadImage = async (file: string, location: string) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", getUploadLocation(location));

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/fourplayers/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const jsonResults = await res.json();

    if (jsonResults) {
      return {
        publicId: jsonResults.public_id,
        url: jsonResults.secure_url,
        smallUrl: jsonResults.eager[0].secure_url,
      };
    }
  } catch (e) {
    return null;
  }
};

// export const convertQueryParams = (params: string) => {
//   if (params.indexOf("?") !== 0 && params.indexOf("=") === -1) {
//     return {};
//   }

//   return params
//     .replace("?", "")
//     .split("&")
//     .reduce((acc, pair) => {
//       const newPair = pair.split("=");
//       return {
//         ...acc,
//         [newPair[0]]: newPair[1],
//       };
//     }, {});
// };

export const getUserRSVPStatus = (
  attendees: any[],
  eventId: string,
  userId: string
): RsvpStatus => {
  if (attendees) {
    const attendee = attendees.find((rsvp) => rsvp.member.id === userId);

    return (attendee && attendee.status) || "NONE";
  }
  return "NONE";
};

export const getFullMemberDuesAmount = () => {
  return parseInt(
    import.meta.env.FULL_MEMBERSHIP_DUES ??
      String(DEFAULT_FULL_MEMBER_DUES_AMOUNT),
    10
  );
};

export const getAssociateMemberDuesAmount = () => {
  return parseInt(
    import.meta.env.ASSOCIATE_MEMBERSHIP_DUES ??
      String(DEFAULT_ASSOCIATE_MEMBER_DUES_AMOUNT),
    10
  );
};

export const getDuesAmount = (
  fullMemberCount = 1,
  associateMemberCount = 0,
  includeFees = false
): number => {
  // Current: Stripe
  // 2.9% + $0.30 per transaction
  const fullMemberDues =
    parseInt(
      import.meta.env.FULL_MEMBERSHIP_DUES ??
        String(DEFAULT_FULL_MEMBER_DUES_AMOUNT),
      10
    ) * fullMemberCount;

  const associateMemberDues =
    parseInt(
      import.meta.env.ASSOCIATE_MEMBERSHIP_DUES ??
        String(DEFAULT_ASSOCIATE_MEMBER_DUES_AMOUNT),
      10
    ) * associateMemberCount;

  const dues = fullMemberDues + associateMemberDues;

  return includeFees ? Number(((dues + 0.3) / (1 - 0.029)).toFixed(2)) : dues;
};

export const convertToCents = (dollarAmt: number) => {
  return dollarAmt * 100;
};

export const whatYearIsIt = () => {
  return new Date().getFullYear();
};

export const getBadgeType = (difficulty: TrailDifficulty) => {
  switch (difficulty) {
    case TrailDifficulty.EASY:
      return "success";
    case TrailDifficulty.INTERMEDIATE:
      return "caution";
    case TrailDifficulty.ADVANCED:
      return "fail";
    case TrailDifficulty.UNKNOWN:
    default:
      return "neutral";
  }
};

export const onMapImgError = (event: any) => {
  event.target.src = "/img/default-map.png";
};

export const getMaxRigs = (count: number) => count > -1 && `Max ${count} rigs`;

export const getMaxAttendees = (count: number) =>
  count > -1 && `Max ${count} attendees`;
