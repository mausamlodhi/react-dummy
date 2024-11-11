import DashboardRoutes from "./Dashboard/index.route";
import UserManagementRoutes from "./UserManagement/index.route";
import adminAccountRoutes from "./AdminAccount/index.route";
import manageLoopsRoutes from "./ManageLoops/index.route";
import manageSubscriptionRoutes from "./ManageSubscription/index.route";
import transactionsHistoryRoutes from "./TransactionsHistory/index.route";
import manageQueriesRoutes from "./ManageQueries/index.route";
import ManageCmsRoutes from "./ManageCms/index.route";
import ManageRolesRoutes from "./ManageRoles/index.route";
import Master from "./Master/index.route";

export default function route() {
  return [
    ...DashboardRoutes(),
    ...UserManagementRoutes(),
    ...adminAccountRoutes(),
    ...manageLoopsRoutes(),
    ...manageSubscriptionRoutes(),
    ...transactionsHistoryRoutes(),
    ...ManageRolesRoutes(),
    ...Master(),
    ...manageQueriesRoutes(),
    ...ManageCmsRoutes(),
  ];
}
