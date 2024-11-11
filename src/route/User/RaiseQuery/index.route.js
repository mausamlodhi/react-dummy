import { RaiseQuery } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.RAISE_QUERY.path,
      name: "",
      key: routesMap.RAISE_QUERY.path,
      commonRoute: true,
      private: true,
      element: <RaiseQuery />,
    },
  ];
}
