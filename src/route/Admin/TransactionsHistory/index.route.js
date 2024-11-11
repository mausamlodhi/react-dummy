import { TransactionsHistory } from "../../../pages";
import adminRouteMap from "../../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.TRANSACTIONS_HISTORY.path,
      name: "Transactions History",
      key: adminRouteMap.TRANSACTIONS_HISTORY.path,
      private: true,
      belongsToSidebar: true,
      icon: adminRouteMap.TRANSACTIONS_HISTORY.icon,
      element: <TransactionsHistory />,
    },
  ];
}
