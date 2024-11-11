import { ManageCms } from "../../../pages/User";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.PRIVACY_POLICY.path,
      name: "",
      key: routesMap.PRIVACY_POLICY.path,
      commonRoute: true,
      private: true,
      element: <ManageCms />,
    },
  ];
}
