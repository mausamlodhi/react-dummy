import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { AntSelect } from "../../../../Antd";

function SubscriptionFilterForm({ arrayOfData,submit }) {

        const initialValues = {
            statusName : "",
        }
    return <>
        <Formik 
            initialValues={initialValues}
            onSubmit={submit}
        >
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
                                    name="statusName"
                                    disabled={false}
                                    variant="standard"
                                    default = {0}
                                    placeholder="Select"
                                    arrayOfData={arrayOfData}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="dropdown-foot between">
                    <Link
                        to="#"
                        type="button"
                        className="clickable text-info"
                    >
                        Reset
                    </Link>

                    <button 
                    type="submit"
                    className="btn btn-primary btn-lg"
                    >
                        Filter
                    </button>
                </div>
            </Form>
        </Formik>
    </>
}
export default SubscriptionFilterForm;