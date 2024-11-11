import loadable from "@loadable/component";

// export { default as MetaTags } from "./Title";

export const MetaTags = loadable(() => import("./Title"));
