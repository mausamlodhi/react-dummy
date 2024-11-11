import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    firstName: yup
      .string()
      .required(i18next.t("validation.adminUpdateProfile.fullName"))
      .max(20, i18next.t("validation.adminUpdateProfile.maxFullname"))
      .matches(
        /^[aA-zZ\s]+$/,
        i18next.t("validation.adminUpdateProfile.validFullName")
      )
      .matches(/^[^\s].+[^\s]$/g, i18next.t("validation.common.noSpace")),
    username: yup
      .string()
      .required(i18next.t("validation.adminUpdateProfile.fullName"))
      .max(20, i18next.t("validation.adminUpdateProfile.maxFullname"))
      .matches(
        /^[aA-zZ\s]+$/,
        i18next.t("validation.adminUpdateProfile.validFullName")
      )
      .matches(/^[^\s].+[^\s]$/g, i18next.t("validation.common.noSpace")),
  });
}
