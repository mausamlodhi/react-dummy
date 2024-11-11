import { Faq } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.FAQ.path,
      name: "",
      key: routesMap.FAQ.path,
      commonRoute: true,
      private: true,
      element: <Faq />,
    },
  ];
}
