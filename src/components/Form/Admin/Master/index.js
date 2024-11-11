
import loadable from "@loadable/component";

export const ClaimTypeForm = loadable(() =>
  import("./ClaimType/index.form")
);
export const CategoryTypeForm = loadable(() =>
  import("./CategoryForm/index.form")
);