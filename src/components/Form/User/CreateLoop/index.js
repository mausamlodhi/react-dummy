import { lazy } from "react";

export const LoopStepOneForm = lazy(() => import("./LoopStepOne/index.form"));
export const LoopStepTwoForm = lazy(() => import("./LoopStepTwo/index.form"));
export const LoopStepThreeForm = lazy(() =>
  import("./LoopStepThree/index.form")
);
