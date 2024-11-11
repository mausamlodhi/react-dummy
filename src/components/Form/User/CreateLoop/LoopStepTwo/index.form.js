import React from "react";
import { Col, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AntTextArea, Select, Input as TextInput } from "../../../../Antd";
import { CommonButton } from "../../../../UiElement";
import { validation } from "./validation";

function LoopStepTwoForm({
  onSubmit,
  current,
  prev,
  countryList,
  getState,
  stateList,
  loading,
  setCurrent,
  loopIdData,
  nexts,
  stateListLoading,
}) {
  const initialValues = {
    clientName: loopIdData?.clientName || "",
    email: loopIdData?.email || "",
    countryCode: loopIdData?.countryCode || 1,
    phoneNumber: loopIdData?.phoneNumber || "",
    altEmail: loopIdData?.altEmail || "",
    altCountryCode: loopIdData?.altCountryCode || 1,
    altPhoneNumber: loopIdData?.altPhoneNumber || "",
    countryId: loopIdData?.countryId || undefined,
    stateId: stateListLoading ? undefined : loopIdData?.stateId,
    city: loopIdData?.city || "",
    address: loopIdData?.address || "",
    zipCode: loopIdData?.zipCode || "",
    note: loopIdData?.note || "",
  };

  const { t } = useTranslation();

  const getStateValue = (value, props) => {
    props.setFieldValue("countryId", value);
    props.setFieldValue("stateId", undefined);
    props.setFieldValue("cityId", undefined);
    getState({ countryId: Number(value) });
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
    >
      {(props) => {
        return (
          <Form>
            <Row>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("text.createLoop.clientName")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="name"
                      className="form-control form-control-lg"
                      name="clientName"
                      disabled={false}
                      variant="standard"
                      type="name"
                      placeholder={t("text.createLoop.enterClientName")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="email">
                      {t("text.createLoop.email")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="email"
                      className="form-control form-control-lg"
                      name="email"
                      disabled={false}
                      variant="standard"
                      type="email"
                      placeholder={t("text.createLoop.enterEmail")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="number">
                      {t("text.createLoop.phoneNumber")}
                    </label>
                  </div>
                  <div className="form-control-wrap phoneNumber">
                    <TextInput
                      id="number"
                      className="form-control form-control-lg"
                      name="phoneNumber"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterPhone")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="altemail">
                      {t("text.createLoop.alternateEmailAddress")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="altEmail"
                      className="form-control form-control-lg"
                      name="altEmail"
                      disabled={false}
                      variant="standard"
                      type="email"
                      placeholder={t("text.createLoop.enterAlternate")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="number">
                      {t("text.createLoop.alternatePhone")}
                    </label>
                  </div>
                  <div className="form-control-wrap phoneNumber">
                    <TextInput
                      id="altPhoneNumber"
                      className="form-control form-control-lg"
                      name="altPhoneNumber"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterAlternatePhone")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="address">
                      {t("text.createLoop.address")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="address"
                      className="form-control form-control-lg"
                      name="address"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterAddress")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="state">
                      {t("text.createLoop.country")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <Select
                      name="countryId"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.createLoop.enterCountry")}
                      arrayOfData={countryList}
                      callback={(e) => {
                        getStateValue(e, props);
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="state">
                      {t("text.createLoop.state")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <Select
                      id="state"
                      name="stateId"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.createLoop.enterState")}
                      arrayOfData={stateList}
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="city">
                      {t("text.createLoop.city")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="city"
                      className="form-control form-control-lg"
                      name="city"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterCity")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="zip">
                      {t("text.createLoop.zip")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="zip"
                      className="form-control form-control-lg"
                      name="zipCode"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterZip")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="notes">
                      {t("text.createLoop.notes")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <AntTextArea
                      id="notes"
                      className="form-control form-control-lg"
                      name="note"
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterNotes")}
                      setFieldValue={props.handleChange}
                      length={500}
                    />
                  </div>
                </div>
              </Col>{" "}
            </Row>

            <div className="stepsBtn d-flex justify-content-between">
              <div>
                {current > 0 && (
                  <CommonButton onClick={() => prev()} variant="light">
                    {t("text.common.back")}
                  </CommonButton>
                )}
              </div>
              <div>
                {nexts && (
                  <Link
                    onClick={() => {
                      setCurrent(current + 1);
                    }}
                    className="btnSkip me-3 me-lg-4 me-xxl-5"
                  >
                    {t("text.common.skip")}
                  </Link>
                )}

                <CommonButton type="submit" variant="primary" loading={loading}>
                  {!nexts ? t("text.common.update") : t("text.common.next")}
                </CommonButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoopStepTwoForm;
