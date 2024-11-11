import i18next from "i18next";
import * as yup from "yup";

export function validation() {
  const phoneRegExp = /^[0-9]+$/;
  return yup.object().shape({
    firstName: yup
      .string()
      .required(i18next.t("validation.auth.firstName"))
      .min(3, "Minimum 3 Character required"),
    lastName: yup
      .string()
      .required(i18next.t("validation.auth.lastName"))
      .min(3, "Minimum 3 Character required"),
    phoneNumber: yup
      .string()
      .required(i18next.t("validation.auth.phoneNumber"))
      .test(
        'is-valid-phone',
        i18next.t("validation.auth.validPhoneNumber"),
        (value)=> {
          if (!value || phoneRegExp.test(value)) {
            return true; 
          } else {
            return false;
          }
        }
      )
      .min(6, i18next.t("validation.auth.phoneNumberShort"))
      .max(12, i18next.t("validation.auth.phoneNumberLong"))
      .matches(phoneRegExp, i18next.t("validation.auth.validPhoneNumber")),
    companyName: yup
      .string()
      .required(i18next.t("validation.auth.companyName"))
      .min(3, "Minimum 3 Character required"),
  });
}
