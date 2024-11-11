import { ManageSubscription } from "../../../pages";
import adminRouteMap from "../../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.MANAGE_SUBSCRIPTION.path,
      name: "Manage Subscription",
      key: adminRouteMap.MANAGE_SUBSCRIPTION.path,
      private: true,
      belongsToSidebar: true,
      icon: adminRouteMap.MANAGE_SUBSCRIPTION.icon,
      element: <ManageSubscription />,
    },
  ];
}
