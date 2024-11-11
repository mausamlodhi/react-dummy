import { lazy } from "react";

export const UserLoginForm = lazy(() => import("./LoginForm/index.form"));
export const UserVerificationForm = lazy(() =>
  import("./Verification/index.form")
);
export const UserSignUpForm = lazy(() => import("./SignupForm/index.form"));
export const UserProfileForm = lazy(() =>
  import("./UserProfileForm/index.form")
);
export const ChangePhoneNumberForm = lazy(() =>
  import("./ChangePhoneNumberForm/index.form")
);
export const AddEditRolesForm = lazy(() => import("./AddEditRoles/index.form"));
export const RaiseQueryForm = lazy(() => import("./RaiseQueryForm/index.form"));
export const NotesForm = lazy(() => import("./Notes/index.form"));
export const AddParticipentForm = lazy(() =>
  import("./AddParticipants/index.form")
);
export * from "./CreateLoop";
