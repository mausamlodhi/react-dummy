import loadable from "@loadable/component";

// export { default as CreateButton } from "./CreateButton/index";
// export { default as ActionButton } from "./ActionButton/index";
// export { default as FilterButton } from "./FilterButton/index";
// export { default as CsvExport } from "./CsvExport/index";
// export { default as CommonButton } from "./Common/index.btn";
// export { default as GradientButton } from "./GradientButton/index.btn";
// export { default as CancelButton } from "./CancelButton/index.btn";

export const CreateButton = loadable(() => import("./CreateButton/index"));
export const ActionButton = loadable(() => import("./ActionButton/index"));
export const FilterButton = loadable(() => import("./FilterButton/index"));
export const CsvExport = loadable(() => import("./CsvExport/index"));
export const CommonButton = loadable(() => import("./Common/index.btn"));
export const GradientButton = loadable(() =>
  import("./GradientButton/index.btn")
);
export const CancelButton = loadable(() => import("./CancelButton/index.btn"));
