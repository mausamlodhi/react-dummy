import { Activity, ActivityBlank } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.ACTIVITY.path,
      name: "Activity",
      key: routesMap.ACTIVITY.path,
      commonRoute: false,
      private: true,
      withAuth: true,
      belongsToHeader: true,
      element: <Activity />,
    },
    {
      path: routesMap.ACTIVITY_BLANK.path,
      name: "ActivityBlank",
      key: routesMap.ACTIVITY_BLANK.path,
      // commonRoute: false,
      // private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <ActivityBlank />,
    },
  ];
}
