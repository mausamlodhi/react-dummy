import loadable from "@loadable/component";

// export { default as PrivacyPolicyForm } from "./PrivacyPolicy/index.form";
// export { default as TermsAndConditionsForm } from "./TermsAndConditions/index.form";

export const PrivacyPolicyForm = loadable(() =>
  import("./PrivacyPolicy/index.form")
);
export const ContactUsForm = loadable(() => import("./ContactUs/index.form"));
export const TermsAndConditionsForm = loadable(() =>
  import("./TermsAndConditions/index.form")
);

export const AddEditFaqForm = loadable(() =>
  import("./EditFAQSForm/index.form")
);
