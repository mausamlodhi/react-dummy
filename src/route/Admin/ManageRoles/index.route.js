import { ManageRoles } from "../../../pages";
import adminRouteMap from "../../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.MANAGE_ROLES.path,
      name: "Manage Roles",
      key: adminRouteMap.MANAGE_ROLES.path,
      private: true,
      belongsToSidebar: true,
      icon: adminRouteMap.MANAGE_ROLES.icon,
      element: <ManageRoles />,
    },
  ];
}
