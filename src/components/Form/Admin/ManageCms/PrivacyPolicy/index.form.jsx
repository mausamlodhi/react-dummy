import { Form, Formik } from "formik";
import { t } from "i18next";
import React from "react";
import { CommonButton, TextEditor } from "../../../../UiElement";
import validation from "./validation";

function PrivacyPolicyForm({ onSubmit, loading, message }) {
  const initialValues = {
    message: message || "",
  };

  return (
    <>
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
                <TextEditor setFieldValue={props.handleChange} name="message" />
              </div>
              <CommonButton
                extraClassName="btn btn-lg btn-primary my-3"
                type="submit"
                htmltype="submit"
                loading={loading}
              >
                {t("text.common.update")}
              </CommonButton>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default PrivacyPolicyForm;
