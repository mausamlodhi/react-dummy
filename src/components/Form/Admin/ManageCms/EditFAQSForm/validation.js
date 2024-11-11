import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    question: yup
      .string()
      .required(i18next.t("validation.adminCms.question"))
      .matches(/^[^\s].+[^\s]$/g, i18next.t("validation.common.noSpace")),
    answer: yup
      .string()
      .required(i18next.t("validation.adminCms.answer"))
      .trim(),
    // .matches(/^[^\s].+[^\s]$/g, i18next.t("validation.common.noSpace")),
  });
}
