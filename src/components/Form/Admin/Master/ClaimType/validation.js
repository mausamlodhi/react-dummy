import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    claimType: yup
      .string()
      .matches(/^[^\s].+[^\s]$/g, i18next.t("validation.common.noSpace"))
      .required(i18next.t("validation.master.claimType")),
  });
}
