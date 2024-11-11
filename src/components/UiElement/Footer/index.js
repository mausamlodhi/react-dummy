/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { CommonButton, ImageElement } from "..";
import RippleEffect from "../RippleEffect";

function UserFooter() {
  return (
    <>
      <footer className="footerSec position-relative">
        <Container>
          <div className="footerSec_top">
            <Row>
              <Col lg={3}>
                <div className="footerSec_info">
                  <ImageElement source="footer-logo.svg" alt="loopity" />
                  <p>
                    Loopity is a disaster helper chat app system designed to
                    provide support and assistance to individuals and
                    communities impacted by disasters.
                  </p>
                  <ul className="socialList list-inline mb-lg-0">
                    <li className="list-inline-item">
                      <Link className="socialList_list" to="#">
                        <em className="icon-facebook" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link className="socialList_list" to="#">
                        <em className="icon-instagram" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link className="socialList_list" to="#">
                        <em className="icon-linkedin" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link className="socialList_list" to="#">
                        <em className="icon-twiterr" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xl={6} lg={9}>
                <Row>
                  <Col xl="3" sm="3" xs="6">
                    <div className="footerSec_link ms-xxl-5">
                      <h5 className="font-sb">Company</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="#"> About Us</Link>
                        </li>
                        <li>
                          <Link to="#"> Pricing</Link>
                        </li>
                        <li>
                          <Link to="#"> Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col xl="4" sm="4" xs="6">
                    <div className="footerSec_link ms-xxl-5">
                      <h5 className="font-sb">Quick Link</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="/privacy-policy"> Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/terms-and-condition">
                            {" "}
                            Terms & Conditions
                          </Link>
                        </li>
                        <li>
                          <Link to="/faq"> FAQ's</Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col xl="5" sm="5">
                    <div className="footerSec_link">
                      <h5 className="font-sb">Contact Us</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link
                            className="d-flex align-items-center"
                            to="mailto:team@loopity.com"
                          >
                            <em className="icon icon-envelope me-2">
                              <em className="path1" />
                              <em className="path2" />
                            </em>{" "}
                            team@loopity.com
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="d-flex align-items-center text-nowrap"
                            to="tel:855-LOOPITY (855-566-7489)"
                          >
                            <em className="icon icon-phone me-2" /> 855-LOOPITY
                            (855-566-7489)
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xl={3}>
                <div className="footerSec_join">
                  <h4 className="font-sb">
                    Join Loopity is the perfect way to streamline your team
                    communication <em className="icon icon-next-up" />
                  </h4>
                  <RippleEffect>
                    <CommonButton variant="warning" extraClassName="w-100">
                      {" "}
                      <em className="icon-circle-next icon-left" /> Join Now
                    </CommonButton>
                  </RippleEffect>
                </div>
              </Col>
            </Row>
          </div>
          <div className="footerSec_bottom">
            <p className="copyRight text-center mb-0">
              Copyright ©2023 Loopity. All Rights Reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default UserFooter;
