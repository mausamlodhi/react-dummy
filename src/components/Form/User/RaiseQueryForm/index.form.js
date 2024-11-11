import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, RippleEffect, AntSelect, AntTextArea } from "../../..";
import { validation } from "./validation";

export default function RaiseQueryForm({
  onSubmit,
  categoryData,
  categoryLoading,
  loading,
}) {
  const { t } = useTranslation();
  let initialValues = {
    categoryId: undefined,
    description: "",
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e, { resetForm }) => {
        onSubmit(e, resetForm);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form className="raiseQuery">
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label font-sb" htmlFor="name">
                  {t("text.raiseQuery.category")}
                </label>
              </div>
              <div className="form-control-wrap font-rg">
                <AntSelect
                  id="categoryId"
                  name="categoryId"
                  placeholder={t("text.raiseQuery.selectCategoryPlaceHolder")}
                  arrayOfData={categoryData}
                  loading={categoryLoading}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label font-sb" htmlFor="name">
                  {t("text.raiseQuery.description")}
                </label>
              </div>
              <div className="form-control-wrap font-rg">
                <AntTextArea name="description" placeholder="" />
              </div>
            </div>

            <div className="text-end">
              <RippleEffect>
                <CommonButton
                  htmlType="submit"
                  type="submit"
                  variant="primary"
                  extraClassName="me-auto text-end"
                  loading={loading}
                >
                  {t("text.common.submit")}
                </CommonButton>
              </RippleEffect>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
