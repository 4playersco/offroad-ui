type RoutePaths = Record<string, string>;

const routePaths: RoutePaths = {
  dashboard: "/",
  unauthorized: "/unauthorized",
  signup: "/signup",
  register: "/register",
  login: "/login",
  forgotPassword: "/forgot-password",
  documents: "/documents",

  settings: "/settings",
  "settings.account": "/settings/account",
  "settings.profile": "/settings/profile",
  "settings.notifications": "/settings/notifications",
  "settings.garage": "/settings/garage",

  roster: "/roster",
  "roster.list": "/roster/list",

  profile: "/profile",
  "profile.activity": "/profile/:username/activity",
  "profile.garage": "/profile/:username/garage",

  history: "/history",
  "history.inMemoriam": "/history/in-memoriam",
  "history.kennys-cabin": "/history/kennys-cabin",
  "history.officers": "/history/officers",

  event: "/event/:id",

  events: "/events",
  "events.past": "/events/past",

  // ADMIN
  admin: "/admin",

  "admin.invite": "/admin/invite",
  "admin.permissions": "/admin/permissions",
  "admin.roster": "/admin/roster",
  "admin.unlock": "/admin/unlock",

  "admin.meeting": "/admin/meeting:id",
  "admin.meeting.edit": "/admin/meeting/:id/edit",
  "admin.meeting.new": "/admin/meeting/new",

  "admin.meetings": "/admin/meetings",

  "admin.profile": "/admin/profile/:username",
  "admin.profile.edit": "/admin/profile/:username/edit",
  "admin.profile.membershipLog": "/admin/profile/membership-log",

  "admin.trail": "/admin/trail/:slug",
  "admin.trail.edit": "/admin/trail/:slug/edit",
  "admin.trail.new": "/admin/trail/new",

  "admin.trails": "/admin/trails",
};

export default routePaths;
