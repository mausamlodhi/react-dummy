import { Form, Formik } from "formik";
import { t } from "i18next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import validation from "./validation";
import { Input as TextInput, CommonButton } from "../../../..";
import { phoneNumberField } from "../../../../../utils";

function ContactUsForm({ onSubmit, details, loading }) {
  const initialValues = {
    email: details?.email || "",
    mobileNumber: details?.mobileNumber || "",
    address: details?.address || "",
  };
  function handleKey(e) {
    phoneNumberField(e);
  }
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
              <Row className="gy-3">
                <Col lg={6}>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.common.email")}
                    </label>
                    <div className="form-control-wrap">
                      <TextInput
                        id="email"
                        className="form-control form-control-lg"
                        name="email"
                        variant="standard"
                        type="text"
                        placeholder={t("text.adminCms.emailPlaceholder")}
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.adminCms.contactNo")}
                    </label>
                    <div className="form-control-wrap">
                      <TextInput
                        className="form-control form-control-lg"
                        onKeyPress={(e) => handleKey(e)}
                        min="0"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        type="text"
                        name="mobileNumber"
                        placeholder={t("text.adminCms.enterContactNo")}
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.adminCms.address")}
                    </label>
                    <div className="form-control-wrap">
                      <TextInput
                        id="address"
                        className="form-control form-control-lg"
                        name="address"
                        variant="standard"
                        type="text"
                        placeholder={t("text.adminCms.enterAddress")}
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <CommonButton
                    extraClassName="btn btn-lg btn-primary my-3"
                    htmlType="submit"
                    type="submit"
                    loading={loading}
                    // onClick={() => cmsUpdate()}
                  >
                    {t("text.common.update")}
                  </CommonButton>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default ContactUsForm;
