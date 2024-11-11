import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import routesMap from "routeControl/userRouteMap";
import { AntTextArea, DatePicker, Input as TextInput } from "../../../../Antd";
import { CommonButton } from "../../../../UiElement";
import { validation } from "./validation";
import { dateFormateWithSlash } from "../../../../../helpers";
import {
  dayJsDateFormatter,
  dayJsFormatter,
  removeSessionStorage,
} from "../../../../../utils";

function LoopStepThreeForm({
  onSubmit,
  prev,
  // loading,
  userData,
  hideLoopStepModal,
  nexts,
  nav,
}) {
  const [date, setdate] = useState(
    dayJsDateFormatter(new Date(), "YYYY-MM-DD")
  );
  const [selectedDate, setSelectedDate] = useState(
    dayJsDateFormatter(new Date(), "YYYY-MM-DD")
  );
  const navigate = useNavigate();
  const onDateSelect = (val, props) => {
    props.setFieldValue("dateOfLoss", dayJsDateFormatter(val, "YYYY-MM-DD"));
    setSelectedDate(dayJsDateFormatter(val, "YYYY-MM-DD"));
  };

  useEffect(() => {
    setdate(userData?.dateOfLoss);
  }, [userData]);

  const initialValues = {
    insuranceCompanyName: userData?.insuranceCompanyName || "",
    AdjusterName: userData?.AdjusterName || "",
    email: userData?.email || "",
    countryCode: userData?.countryCode || 1,
    phoneNumber: userData?.phoneNumber || "",
    altEmail: userData?.email || "",
    altCountryCode: userData?.altCountryCode || 1,
    altPhoneNumber: userData?.altPhoneNumber || undefined,
    claimNumber: userData?.claimNumber || "",
    policyNumber: userData?.policyNumber || "",
    dateOfLoss: date || "",
    additionalNote: userData?.additionalNote || "",
  };

  const { t } = useTranslation();
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
                      {t("text.createLoop.insuranceCompanyName")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="name"
                      className="form-control form-control-lg"
                      name="insuranceCompanyName"
                      disabled={false}
                      variant="standard"
                      type="name"
                      placeholder={t(
                        "text.createLoop.enterInsuranceCompanyName"
                      )}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="email">
                      {t("text.createLoop.adjusterName")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="AdjusterName"
                      className="form-control form-control-lg"
                      name="AdjusterName"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.EnterAdjusterName")}
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
                    <label className="form-label" htmlFor="email">
                      {t("text.createLoop.email")}
                    </label>
                    {/* <Link href="#" className="link-primary">+ Add</Link> */}
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
                  <div className="form-label-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="altemail">
                      {t("text.createLoop.alternateEmailAddress")}
                    </label>
                    {/* <Link href="#" className="link-primary">+ Add</Link> */}
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
              {/* <Col lg="6">
      <div className="form-group">
        <div className="form-label-group">
          <label className="form-label" htmlFor="name">
          Claim Type
          </label>
        </div>
        <div className="form-control-wrap">
          <AntSelect placeholder="Select" arrayOfData={claimData}/>
        </div>
      </div>
    </Col> */}
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="claim">
                      {t("text.createLoop.claimNumber")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="claim"
                      className="form-control form-control-lg"
                      name="claimNumber"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterClaimNumber")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="policy">
                      {t("text.createLoop.policyNumber")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="policy"
                      className="form-control form-control-lg"
                      name="policyNumber"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.createLoop.enterPolicyNumber")}
                      setFieldValue={props.handleChange}
                      icon=""
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="date">
                      Date of Loss
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <DatePicker
                      name="dateOfLoss"
                      id="dateOfLoss"
                      className="form-control date-picker shadow-none"
                      placeholder={dateFormateWithSlash}
                      hasEvent
                      onChange={(e) => {
                        onDateSelect(e, props);
                      }}
                      value={
                        selectedDate
                          ? dayJsFormatter(selectedDate, "YYYY-MM-DD")
                          : dayJsDateFormatter(new Date(), "YYYY-MM-DD")
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col lg="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="notes">
                      Additional {t("text.createLoop.notes")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <AntTextArea
                      id="additionalNote"
                      className="form-control form-control-lg"
                      name="additionalNote"
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
                {!userData && (
                  <CommonButton onClick={prev} variant="light">
                    Back
                  </CommonButton>
                )}
              </div>
              <div>
                {nexts && (
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      hideLoopStepModal();
                      removeSessionStorage("step1Data");
                      removeSessionStorage("step2Data");
                      if (nav) {
                        nav();
                      } else {
                        navigate(routesMap.LOOPS.path);
                      }
                    }}
                    className="btnSkip me-3 me-lg-4 me-xxl-5"
                  >
                    {t("text.common.skip")}
                  </Link>
                )}
                <CommonButton
                  type="submit"
                  variant="primary"
                  //  loading={loading}
                >
                  {userData ? "Update" : "Done"}
                </CommonButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoopStepThreeForm;
