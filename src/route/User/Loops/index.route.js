import { Loops, LoopsBlank } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.LOOPS.path,
      name: "Loops",
      key: routesMap.LOOPS.path,
      // commonRoute: false,
      private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <Loops />,
    },
    {
      path: routesMap.LOOPS_BLANK.path,
      name: "Loops",
      key: routesMap.LOOPS_BLANK.path,
      // commonRoute: false,
      private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <LoopsBlank />,
    },
  ];
}
