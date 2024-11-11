import i18next from "i18next";
import * as yup from "yup";

export function validation() {
  const phoneRegExp = /^[0-9]+$/;

  return yup.object().shape({
    clientName: yup
      .string()
      .required(i18next.t("validation.createLoop.clientName")),
    email: yup
      .string()
      .required(i18next.t("validation.auth.email"))
      .email(i18next.t("validation.auth.validEmail"))
      .matches(
        /^(?:\d{6,15}|[\w-\.]+@([\w-]+\.)+[\w-]{2,6})$/,
        i18next.t("validation.auth.validEmail")
      ),
    altEmail: yup
      .string()
      .required(i18next.t("validation.auth.email"))
      .email(i18next.t("validation.auth.validEmail"))
      .matches(
        /^(?:\d{6,15}|[\w-\.]+@([\w-]+\.)+[\w-]{2,6})$/,
        i18next.t("validation.auth.validEmail")
      ),
    phoneNumber: yup
      .string()
      .required(i18next.t("validation.auth.phoneNumber"))
      .min(6, i18next.t("validation.auth.phoneNumberShort"))
      .max(12, i18next.t("validation.auth.phoneNumberLong"))
      .matches(phoneRegExp, i18next.t("validation.auth.validPhoneNumber")),
    altPhoneNumber: yup
      .string()
      .required(i18next.t("validation.auth.phoneNumber"))
      .min(6, i18next.t("validation.auth.phoneNumberShort"))
      .max(12, i18next.t("validation.auth.phoneNumberLong"))
      .matches(phoneRegExp, i18next.t("validation.auth.validPhoneNumber")),
    countryCode: yup
      .string()
      .required(i18next.t("validation.createLoop.countryCode")),
    // altCountryCode: yup
    //   .string()
    //   .required(i18next.t("validation.createLoop.countryCode")),
    countryId: yup
      .string()
      .required(i18next.t("validation.createLoop.country")),
    stateId: yup.string().required(i18next.t("validation.createLoop.state")),
    city: yup.string().required(i18next.t("validation.createLoop.city")),
    zipCode: yup.string().required(i18next.t("validation.createLoop.zipCode")),
    // note: yup.string().required(i18next.t("validation.createLoop.note")),
    address: yup.string().required(i18next.t("validation.createLoop.address")),
  });
}
