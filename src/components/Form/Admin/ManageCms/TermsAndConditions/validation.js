import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    message: yup
      .string()
      .min(3)
      .required(i18next.t("validation.adminCms.termsAndConditions")),
  });
}
