import { NewLoops, LoopsBlank } from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
      path: routesMap.NEW_LOOPS.path,
      name: "NewLoops",
      key: routesMap.NEW_LOOPS.path,
      // commonRoute: false,
      // private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <NewLoops />,
    },
    {
      path: routesMap.LOOPS_BLANK.path,
      name: "Loops",
      key: routesMap.LOOPS_BLANK.path,
      // commonRoute: false,
      // private: true,
      // withAuth: true,
      // belongsToHeader: true,
      element: <LoopsBlank />,
    },
  ];
}
