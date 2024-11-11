import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import validation from "./validation";
import { Input as TextInput, CommonButton, AntTextArea } from "../../../..";

function EditFAQSForm({
  onSubmit,
  hideFaqEditModal,
  loading,
  rowData,
  initialData,
}) {
  const { t } = useTranslation();
  const initialValues = {
    question: initialData?.question || "",
    answer: initialData?.answer || "",
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <label className="form-label" htmlFor="question">
                {t("text.adminCms.question")}
              </label>
              <TextInput
                className="form-control form-control-lg"
                placeholder={t("text.adminCms.questionPlaceholder")}
                name="question"
                disabled={false}
                variant="standard"
                type="text"
                setFieldValue={props.handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="answer">
                {t("text.adminCms.answer")}
              </label>
              <AntTextArea
                className="form-control form-control-lg"
                placeholder={t("text.adminCms.answerPlaceholder")}
                name="answer"
                setFieldValue={props.handleChange}
              />
            </div>

            <div className="mt-4 align-center justify-content-center flex-wrap flex-sm-nowrap gx-md-4 gx-2 gy-2">
              <div>
                <CommonButton
                  extraClassName="btn btn-lg btn-primary"
                  loading={loading}
                  htmltype="button"
                  type="submit"
                >
                  {!rowData?.id
                    ? t("text.common.add")
                    : t("text.common.update")}
                </CommonButton>
              </div>
              <div>
                <Link
                  href="#"
                  onClick={() => hideFaqEditModal()}
                  className="btn btn-light btn-lg"
                >
                  {t("text.common.cancel")}
                </Link>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EditFAQSForm;
