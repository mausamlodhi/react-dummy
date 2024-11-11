import i18next from "i18next";
import * as yup from "yup";

export function validation() {
  return yup.object().shape({
    name: yup.string().required(i18next.t("validation.createLoop.name")),
    description: yup
      .string()
      .required(i18next.t("validation.createLoop.description")),
    claimTypeId: yup
      .string()
      .required(i18next.t("validation.createLoop.claimType")),
  });
}
