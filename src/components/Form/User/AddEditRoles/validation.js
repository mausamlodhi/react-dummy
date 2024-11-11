import i18next from "i18next";
import * as yup from "yup";

export function validation() {
  return yup.object().shape({
    channelRoleId: yup
      .string()
      .required(i18next.t("validation.loops.roleName")),
  });
}
