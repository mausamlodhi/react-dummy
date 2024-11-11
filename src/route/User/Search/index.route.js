import { Search } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.SEARCH.path,
      name: "Search",
      key: routesMap.SEARCH.path,
      commonRoute: false,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      element: <Search />,
    },
  ];
}
