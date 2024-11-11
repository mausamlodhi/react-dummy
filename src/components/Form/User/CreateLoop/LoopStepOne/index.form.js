import React from "react";
import { Col, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { AntSelect, AntTextArea, Input as TextInput } from "../../../../Antd";
import { CommonButton } from "../../../../UiElement";
import { validation } from "./validation";

function LoopStepOneForm({
  onSubmit,
  loading,
  userData,
  claimLoad,
  claimType,
}) {
  const initialValues = {
    name: userData?.name || "",
    claimTypeId: claimLoad ? undefined : userData?.claimTypeId,
    description: userData?.description || "",
  };

  const { t } = useTranslation();
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
            <Row>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("text.createLoop.loopName")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="name"
                      className="form-control form-control-lg"
                      name="name"
                      disabled={false}
                      variant="standard"
                      type="name"
                      placeholder={t("text.createLoop.enterLoopName")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("text.createLoop.claimType")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <AntSelect
                      placeholder={t("text.createLoop.selectClaimType")}
                      // arrayOfData={claimType}
                      setFieldValue={props.handleChange}
                      loading={claimLoad}
                      name="claimTypeId"
                      arrayOfData={claimType}
                    >
                      {/* {claimType?.length > 0 &&
                        claimType.map((item) => {
                          return (
                            <option value={Number(item?.id)}>
                              {item?.name}
                            </option>
                          );
                        })} */}
                    </AntSelect>
                  </div>
                </div>
              </Col>
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="description">
                      {t("text.createLoop.description")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <AntTextArea
                      id="description"
                      className="form-control form-control-lg"
                      name="description"
                      disabled={false}
                      variant="standard"
                      type="description"
                      placeholder={t("text.createLoop.enterDescription")}
                      setFieldValue={props.handleChange}
                      icon=""
                      length={500}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <div className="stepsBtn d-flex justify-content-end">
              <CommonButton
                type="primary"
                // onClick={() => next()}
                variant="primary"
                loading={loading}
              >
                {userData ? t("text.common.update") : t("text.common.next")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoopStepOneForm;
