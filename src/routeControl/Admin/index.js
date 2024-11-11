import userManagement from "./UserManagement";
import manageLoops from "./ManageLoops";
import auth from "./Auth";
import dashboard from "./Dashboard";
import manageCms from "./ManageCms/index";
import adminProfile from "./AdminAccount/index";
import manageQueries from "./ManageQueries/index";
import transactionsHistory from "./TransactionsHistory/index";
import manageSubscription from "./ManageSubscription/index";
import manageRoles from "./ManageRoles/index";
import master from "./Master/index";

const AccessControl = {
  ...userManagement,
  ...auth,
  ...dashboard,
  ...manageCms,
  ...adminProfile,
  ...manageQueries,
  ...manageLoops,
  ...transactionsHistory,
  ...manageSubscription,
  ...manageRoles,
  ...master,
};

export default AccessControl;
