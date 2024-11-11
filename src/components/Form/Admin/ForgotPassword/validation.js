import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    email: yup
      .string()
      .required(i18next.t("validation.adminAuth.email"))
      .email(i18next.t("validation.adminAuth.validEmail")),
  });
}
