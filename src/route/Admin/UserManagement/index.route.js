import { UserDetails, UserManagement } from "../../../pages";
import adminRouteMap from "../../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.USER_MANAGEMENT.path,
      name: "User Management",
      key: adminRouteMap.USER_MANAGEMENT.path,
      private: true,
      belongsToSidebar: true,
      icon: adminRouteMap.USER_MANAGEMENT.icon,
      element: <UserManagement />,
    },
    {
      path: `${adminRouteMap.USER_DETAILS.path}/:id`,
      name: "User Details",
      key: `${adminRouteMap.USER_DETAILS.path}/:id`,
      private: true,
      element: <UserDetails />,
    },
  ];
}
