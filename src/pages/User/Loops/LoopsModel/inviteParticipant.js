import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function InviteParticipant() {
  return (
    <>
      <Row>
        <Col sm="12">
          <div className="form-group inviteLink mb-lg-5">
            <label className="form-label font-sb" htmlFor="name">
              Invite with Link
            </label>
            <p className="subPera">
              There are many variations of passages of Lorem Ipsum
            </p>
            <div className="form-control-wrap w-100">
              <input
                id="name"
                className="form-control form-control-lg"
                name="name"
                disabled={false}
                // variant="standard"
                type="name"
                placeholder="Enter Invite with Link"
                // setFieldValue="Wildfire Operation"
                icon=""
              />
              <Link href="#" className="btn btn-info btn-inviteLink">
                <span className="d-none d-md-block">Copy Link</span>{" "}
                <em className="icon-copy-outline d-block d-md-none" />
              </Link>
            </div>
          </div>
        </Col>
        <Col sm="12">
          <div className="form-group">
            <label className="form-label font-sb" htmlFor="name">
              Add Participants
            </label>
            <p className="subPera">
              There are many variations of passages of Lorem Ipsum
            </p>
            <div className="d-flex align-items-center w-100">
              <input
                id="name"
                className="form-control form-control-lg w-100"
                name="name"
                disabled={false}
                // variant="standard"
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
    </>
  );
}
