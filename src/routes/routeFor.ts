import routePaths from "./routePaths";

const routeFor = (route: string) => {
  return routePaths[route];
};

export default routeFor;
