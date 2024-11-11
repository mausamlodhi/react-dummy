import { Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Input as TextInput } from "components/Antd";

function AddParticipentForm() {
  return (
    <Formik initialValues={{ name: "" }}>
      {(props) => {
        return (
          <Form>
            <Row>
              <Col sm="12">
                <div className="form-group inviteLink mb-lg-5">
                  <label className="form-label font-sb" htmlFor="name">
                    Add Participants
                  </label>
                  <p className="subPera">
                    There are many variations of passages of Lorem Ipsum
                  </p>
                  <div className="d-flex w-100 align-items-center">
                    <div className="form-control-wrap w-100">
                      {/* <ChatSearchBar searchOpen={searchOpen} setSearchOpen={setSearchOpen} /> */}
                      <TextInput
                        id="name"
                        className="form-control form-control-lg"
                        name="name"
                        disabled={false}
                        variant="standard"
                        type="name"
                        placeholder="Enter Invite with Link"
                        // setFieldValue="Wildfire Operation"
                        defaultValue="https://xd.adobe.com/view/0d68d580-440d-4341-8ae2-892322ffebc4-583b/"
                        icon=""
                        setFieldValue={props.handleChange}
                      />
                      <Link href="#" className="btn btn-dark bg-info border-0">
                        <span className="d-none d-md-block">Copy Link</span>{" "}
                        <em className="icon-copy-outline d-block d-md-none" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group inviteLink">
                  <label className="form-label font-sb" htmlFor="name">
                    Add Participants
                  </label>
                  <p className="subPera">
                    There are many variations of passages of Lorem Ipsum
                  </p>
                  <div className="d-flex align-items-center w-100">
                    <TextInput
                      id="name"
                      className="form-control form-control-lg w-100"
                      name="name"
                      disabled={false}
                      variant="standard"
                      type="name"
                      placeholder="Enter Email"
                      icon=""
                    />
                    <Link
                      href="#"
                      className="btn btn-primary ms-2 ms-md-3 flex-shrink-0"
                    >
                      <span className="d-none d-md-block">Copy Link</span>{" "}
                      <em className="icon-copy-outline d-block d-md-none" />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddParticipentForm;
