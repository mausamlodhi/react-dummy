import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    email: yup
      .string()
      .required(i18next.t("validation.adminCms.emailReq"))
      .email(i18next.t("validation.adminAuth.validEmail")),
    mobileNumber: yup
      .string()
      .min(6, i18next.t("validation.adminCms.minPhone"))
      .max(16, i18next.t("validation.adminCms.minPhone"))
      .required(i18next.t("validation.adminCms.phoneNumber")),
    address: yup
      .string()
      .min(3)
      .required(i18next.t("validation.adminCms.addressReq")),
  });
}
