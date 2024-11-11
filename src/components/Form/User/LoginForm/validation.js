import i18next from "i18next";
import * as yup from "yup";

export function validation() {
  return yup.object().shape({
    email: yup
      .string()
      .required(i18next.t("validation.auth.email"))
      .email(i18next.t("validation.auth.validEmail"))
      .matches(
        /^(?:\d{6,15}|[\w-\.]+@([\w-]+\.)+[\w-]{2,6})$/,
        i18next.t("validation.auth.validEmail")
      ),
  });
}
