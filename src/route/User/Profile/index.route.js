import { Profile } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.PROFILE.path,
      name: "Profile",
      key: routesMap.PROFILE.path,
      // commonRoute: false,
      private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <Profile />,
    },
  ];
}
