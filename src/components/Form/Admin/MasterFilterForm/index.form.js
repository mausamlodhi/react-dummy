import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AntSelect } from "../../../Antd";

function MasterFilterForm({ arrayOfData, filterData, onReset, onSubmit }) {
  const { t } = useTranslation();
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);
  console.log(filterData);

  const initialValues = {
    statusId: undefined,
  };
  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.status) {
      onReset();
    }
  };
  return (
    <>
      <Formik
        initialValues={{ ...initialValues }}
        onSubmit={disableSubmit && onSubmit}
        enableReinitialize
        validate={(e) => {
          if (e.status) {
            setDisableReset(false);
            setDisableSubmit(true);
          } else {
            setDisableReset(true);
            setDisableSubmit(false);
          }
        }}
      >
        {(props) => {
          //   const { values } = props;
          return (
            <Form>
              <div className="dropdown-body dropdown-body-rg">
                <Row className="row g-3">
                  <Col xs="12">
                    <div className="form-group ">
                      <label className="overline-title overline-title-alt">
                        Status
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
                        // value={values.statusId}
                      />
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

                <button type="submit" className="btn btn-primary btn-lg">
                  Filter
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
export default MasterFilterForm;
