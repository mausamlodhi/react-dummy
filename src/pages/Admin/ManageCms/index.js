import React from "react";

export const FAQS = React.lazy(() => import("./FAQS/index.page"));
export const ContactUs = React.lazy(() => import("./ContactUs/index.page"));
export const PrivacyPolicy = React.lazy(() =>
  import("./PrivacyPolicy/index.page")
);
export const TermsAndConditions = React.lazy(() =>
  import("./TermsAndConditions/index.page")
);
