import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    roleName: yup
      .string()
      .required(i18next.t("validation.adminManageRoles.roleName"))
      .matches(/^[^\s].+[^\s]$/g, i18next.t("validation.common.noSpace")),
    description: yup
      .string()
      .required(i18next.t("validation.adminManageRoles.descriptionReq"))
      .trim(),
  });
}
