import loadable from "@loadable/component";

export const PendingQueriesForm = loadable(() =>
  import("./PendingQuery/index.form")
);
