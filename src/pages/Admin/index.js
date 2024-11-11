import React from "react";

export const AdminLogin = React.lazy(() => import("./Login/index.page"));
export const AdminForgotPassword = React.lazy(() =>
  import("./ForgotPassword/index.page")
);
export const AdminOtpVerification = React.lazy(() =>
  import("./OtpVerification/index.page")
);
export const AdminResetPassword = React.lazy(() =>
  import("./ResetPassword/index.page")
);
export const AdminProfile = React.lazy(() =>
  import("./AdminAccount/AdminProfile/index.page")
);
export const AdminChangePassword = React.lazy(() =>
  import("./AdminAccount/AdminChangePassword/index.page")
);
export const AdminNotifications = React.lazy(() =>
  import("./AdminAccount/AdminNotifications/index.page")
);
export const AdminDashboard = React.lazy(() =>
  import("./Dashboard/index.page")
);
export const ManageSubscription = React.lazy(() =>
  import("./ManageSubscription/index.page")
);
export const TransactionsHistory = React.lazy(() =>
  import("./TransactionsHistory/index.page")
);

export * from "./UserManagement";
export * from "./ManageLoops";
export * from "./ManageCms";
export * from "./ManageQueries";

export const ManageRoles = React.lazy(() => import("./ManageRoles/index.page"));
export const AddEditManageRole = React.lazy(() =>
  import("./ManageRoles/AddEditManageRole/index.page")
);

export const ClaimType = React.lazy(() =>
  import("./Master/ClaimType/index.page")
);
export const Category = React.lazy(() =>
  import("./Master/Category/index.page")
);
