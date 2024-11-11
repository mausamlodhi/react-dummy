import i18next from "i18next";
import * as yup from "yup";

export function validation() {
  return yup.object().shape({
    categoryId: yup
      .string()
      .required(i18next.t("validation.raiseQuery.category")),
    description: yup
      .string()
      .required(i18next.t("validation.raiseQuery.description")),
  });
}
