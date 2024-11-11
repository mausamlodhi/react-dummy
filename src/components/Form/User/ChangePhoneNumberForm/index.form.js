import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, Input as TextInput } from "../../..";
import { validation } from "./validation";

export default function ChangePhoneNumberForm({
  onSubmit,
  handleClose,
  loading,
}) {
  const { t } = useTranslation();
  let initialValues = {
    phoneNumber: "",
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e) => {
        onSubmit(e);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="modalForm">
              <div className="form-group w-100">
                <div className="form-label-group">
                  <label className="form-label">
                    {t("text.common.phoneNumber")}
                  </label>
                </div>
                <div className="form-control-wrap phoneNumber">
                  <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    placeholder={t("text.common.phoneNumber")}
                    type="text"
                    setFieldValue={props.handleChange}
                  />
                </div>
              </div>
              <div className="text-end modalFooter">
                <CommonButton onClick={() => handleClose()} variant="light">
                  {t("text.common.cancel")}
                </CommonButton>
                <CommonButton
                  variant="primary"
                  htmlType="submit"
                  type="submit"
                  className="ms-3"
                  loading={loading}
                >
                  {t("text.common.continue")}
                </CommonButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
