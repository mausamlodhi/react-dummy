import { ManageLoops, LoopsDetails } from "../../../pages";
import adminRouteMap from "../../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.MANAGE_LOOPS.path,
      name: "Manage Loops",
      key: adminRouteMap.MANAGE_LOOPS.path,
      private: true,
      belongsToSidebar: true,
      icon: adminRouteMap.MANAGE_LOOPS.icon,
      element: <ManageLoops />,
    },
    {
      path: `${adminRouteMap.LOOPS_DETAILS.path}/:id`,
      name: "Loops Details",
      key: `${adminRouteMap.LOOPS_DETAILS.path}/:id`,
      private: true,
      element: <LoopsDetails />,
    },
  ];
}
