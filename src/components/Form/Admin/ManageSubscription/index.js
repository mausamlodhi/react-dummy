
import loadable from "@loadable/component";

export const SubscriptionFilterForm = loadable(() =>
  import("./SubscriptionFilterForm/index")
);

export const AddSubscriptionForm = loadable(() =>
  import("./AddSubscriptionForm/index.form")
);

