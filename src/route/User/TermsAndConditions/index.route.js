import { ManageCms } from "../../../pages/User";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.Terms_And_Condition.path,
      name: "",
      key: routesMap.Terms_And_Condition.path,
      commonRoute: true,
      private: true,
      element: <ManageCms />,
    },
  ];
}
