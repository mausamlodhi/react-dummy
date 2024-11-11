import i18next from "i18next";
import * as yup from "yup";

export function validation() {
  const phoneRegExp = /^[0-9]+$/;
  return yup.object().shape({
    phoneNumber: yup
      .string()
      .required(i18next.t("validation.auth.phoneNumber"))
      .min(6, i18next.t("validation.auth.phoneNumberShort"))
      .max(12, i18next.t("validation.auth.phoneNumberLong"))
      .matches(phoneRegExp, i18next.t("validation.auth.validPhoneNumber")),
  });
}
