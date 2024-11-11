import { lazy } from "react";

export const AdminLoginForm = lazy(() => import("./Login/index.form"));
export const AdminForgotPasswordForm = lazy(() =>
  import("./ForgotPassword/index.form")
);
export const ResetPasswordForm = lazy(() =>
  import("./ResetPassword/index.form")
);
export const AdminUpdateProfileForm = lazy(() =>
  import("./UpdateProfile/index.form")
);
export const AdminChangePasswordForm = lazy(() =>
  import("./ChangePassword/index.form")
);
export const AdminVerificationForm = lazy(() =>
  import("./OtpVerification/index.form")
);
export const PandingQueriesForm = lazy(() =>
  import("./ManageQueries/PendingQuery/index.form")
);

export const SubscriptionForm = lazy(() =>
  import("./ManageSubscription/AddSubscriptionForm/index.form")
);

export const SubscriptionFilterForm = lazy(() =>
  import("./ManageSubscription/SubscriptionFilterForm")
);

export const MasterFilterForm = lazy(() =>
  import("./MasterFilterForm/index.form")
);
export const ClaimTypeForm = lazy(() =>
  import("./Master/ClaimType/index.form")
);
export const CategoryTypeForm = lazy(() =>
  import("./Master/CategoryForm/index.form")
);
export * from "./ManageCms";
export { default as ManageRoleForm } from "./ManageRole/index.form";
