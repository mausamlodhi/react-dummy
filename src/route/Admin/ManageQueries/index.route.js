import { Outlet } from "react-router-dom";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { PendingQueries, RepliedQueries } from "../../../pages";

export default function route() {
  return [
    {
      path: adminRouteMap.MANAGE_QUERIES.path,
      private: true,
      name: "Manage Queries",
      key: adminRouteMap.MANAGE_QUERIES.path,
      belongsToSidebar: true,
      icon: adminRouteMap.MANAGE_QUERIES.icon,
      element: <Outlet />,
      children: [
        {
          path: adminRouteMap.PENDING_QUERIES.path,
          private: true,
          name: "Pending Queries",
          key: adminRouteMap.PENDING_QUERIES.path,
          belongsToSidebar: true,
          element: <PendingQueries />,
        },
        {
          path: adminRouteMap.REPLIED_QUERIES.path,
          private: true,
          name: "Replied Queries",
          key: adminRouteMap.REPLIED_QUERIES.path,
          belongsToSidebar: true,
          element: <RepliedQueries />,
        },
      ],
    },
  ];
}
