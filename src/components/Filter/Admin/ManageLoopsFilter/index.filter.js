import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import moment from "moment";
import { AntSelect, CommonButton, DatePicker } from "../../../index";
import { classicDateFormat, dateFormateWithSlash } from "../../../../helpers";

function ManageLoopsFilter({ filterData, onSubmit, onReset }) {
  const { t } = useTranslation();
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const arrayOfData = [
    { id: "all", name: "All" },
    {
      id: "active",
      name: "Active",
    },
    {
      id: "inactive",
      name: "Inactive",
    },
  ];

  const initialValues = {
    fromDate: filterData?.fromDate || "",
    toDate: filterData?.toDate || "",
    status: filterData?.status || undefined,
  };

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.fromDate || filterData.toDate || filterData.status) {
      onReset();
    }
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      enableReinitialize
      validate={(e) => {
        if (e.fromDate || e.toDate || e.status) {
          setDisableReset(false);
          setDisableSubmit(true);
        } else {
          setDisableReset(true);
          setDisableSubmit(false);
        }
      }}
    >
      {(props) => {
        const { values } = props;
        return (
          <>
            <Form>
              <div className="dropdown-body dropdown-body-rg">
                <Row className="g-3">
                  <Col xs="12">
                    <div className="form-group ">
                      <label className="overline-title overline-title-alt">
                        {t("text.common.status")}
                      </label>
                      <AntSelect
                        size="medium"
                        id="status"
                        extraClassName="form-control"
                        name="status"
                        disabled={false}
                        variant="standard"
                        placeholder="Select"
                        arrayOfData={arrayOfData}
                        setFieldValue={props.handleChange}
                        value={values.status}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group ">
                      <label className="overline-title overline-title-alt">
                        {t("text.common.date")}
                      </label>
                      <div className="dateRange rangeBetween d-flex flex-column flex-sm-row">
                        <div className="form-control-wrap">
                          <DatePicker
                            name="fromDate"
                            id="fromDate"
                            className="form-control date-picker shadow-none"
                            placeholder={classicDateFormat}
                            format={classicDateFormat}
                            requiredDateTimeFormat={dateFormateWithSlash}
                            // hasEvent
                            onChange={(_, dateString) =>
                              props.setFieldValue(
                                "fromDate",
                                moment(dateString)
                              )
                            }
                            value={
                              props?.values?.fromDate !== ""
                                ? dayjs(props?.values?.fromDate)
                                : ""
                            }
                            // value={
                            //   props?.values?.fromDate === ""
                            //     ? ""
                            //     : moment(props?.values?.fromDate)
                            // }
                            // disabledDate={(d) => {
                            //   return !d || !d.isBefore(moment());
                            // }}
                          />
                        </div>
                        <div className="dateBetween align-self-center mx-0 mx-sm-1 my-sm-0 my-1">
                          {t("text.common.to")}
                        </div>
                        <div className="form-control-wrap">
                          <DatePicker
                            name="toDate"
                            id="toDate"
                            className="form-control date-picker shadow-none"
                            placeholder={classicDateFormat}
                            format={classicDateFormat}
                            // hasEvent
                            requiredDateTimeFormat={dateFormateWithSlash}
                            onChange={(_, dateString) =>
                              props.setFieldValue("toDate", moment(dateString))
                            }
                            value={
                              props.values?.toDate !== ""
                                ? dayjs(props?.values?.toDate)
                                : ""
                            }
                            // disabledDate={(d) => {
                            //   return (
                            //     !d ||
                            //     d.isBefore(
                            //       moment(
                            //         initialValues?.fromDate ||
                            //           props.values.fromDate
                            //       )
                            //     )
                            //   );
                            // }}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="dropdown-foot between">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!disableReset) {
                      onHandleReset(props.resetForm, props);
                    }
                  }}
                  type="button"
                  className="clickable text-info"
                >
                  {t("text.common.reset")}
                </Link>
                <CommonButton
                  type="submit"
                  extraClassName="btn btn-primary"
                  htmlType="submit"
                >
                  {t("text.common.filter")}
                </CommonButton>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(ManageLoopsFilter);
