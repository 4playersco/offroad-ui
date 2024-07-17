// import App from "../App.tsx";
import routeFor from "./routeFor.ts";

import Dashboard from "../pages/dashboard/index.tsx";

const routes = [
  {
    path: routeFor("dashboard"),
    element: <Dashboard />,
  },
];

export default routes;
