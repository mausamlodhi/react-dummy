import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    heading: yup
      .string()
      // .matches(
      //   /^[^\s].+[^\s]$/g,
      //   "Space not allowed at start & end of sentence."
      // )
      .required(i18next.t("validation.notes.heading")),
    description: yup
      .string()
      // .matches(
      //   /^[^\s].+[^\s]$/g,
      //   "Space not allowed at start & end of sentence."
      // )
      .required(i18next.t("validation.notes.description")),
  });
}
