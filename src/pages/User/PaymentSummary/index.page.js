import React, { useState } from "react";
import { t } from "i18next";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import {
  AntRadio,
  Checkbox,
  CommonButton,
  ModalComponent,
  Popovers,
  RippleEffect,
  Input as TextInput,
} from "../../../components";
import { ImageElement } from "../../../utils";

function PaymentSummary() {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalType, setmodalType] = useState("");
  const handleUpdateSuccessShow = (type) => {
    setUpdateSuccess(true);
    setmodalType(type);
  };
  const handleClose = () => {
    setUpdateSuccess(false);
  };

  return (
    <>
      <div className="pageWrap">
        <section className="paymentMode">
          <Container className="container-md">
            <div className="pageHeader p-0">
              <div className="pageHeader_head d-flex flex-wrap align-items-center">
                <h3 className="pageHeader_head_title font-bd d-flex align-items-center mb-0">
                  <Link to="/profile" className="backIcon me-2 me-xl-3">
                    <em className="icon-back" />
                  </Link>
                  {t("text.payment.paymentSummary")}
                </h3>
              </div>
            </div>
            <div className="paymentMode_cnt d-lg-flex customCard">
              <div className="paymentMode_cnt_details">
                <Radio.Group name="paymentSummary">
                  <div className="d-flex align-items-center">
                    <h3 className="font-bd mb-0">
                      {t("text.payment.saveCards")}
                    </h3>
                  </div>
                  <div className="paymentSec">
                    <Radio.Group name="cardChoose">
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="d-flex paymentSec_card align-items-center">
                          <AntRadio
                            value="1"
                            className="d-flex align-items-center"
                          >
                            <div className="">
                              <h6 className="mb-0 font-bd">HDFC Credit Card</h6>
                              <p className="mb-0"> visa****4242 </p>
                            </div>
                          </AntRadio>
                          <Link to="#" className="">
                            <em className="icon-remove" />
                          </Link>
                        </div>
                        <div className="d-flex paymentSec_card align-items-center">
                          <AntRadio
                            value="2"
                            className="d-flex align-items-center"
                          >
                            <div className="">
                              <h6 className="mb-0 font-bd">HDFC Credit Card</h6>
                              <p className="mb-0"> visa****4242 </p>
                            </div>
                          </AntRadio>
                          <Link to="#" className="">
                            <em className="icon-remove" />
                          </Link>
                        </div>
                      </div>
                    </Radio.Group>
                  </div>
                  <div className="d-flex align-items-center">
                    <AntRadio
                      value="11"
                      className="d-flex align-items-center me-md-5 me-2"
                    >
                      <h3 className="font-bd mb-0">
                        {t("text.payment.creditCards")}
                      </h3>
                    </AntRadio>
                    <AntRadio value="12" className="d-flex align-items-center">
                      <h3 className="font-bd mb-0">
                        {t("text.payment.debitCards")}
                      </h3>
                    </AntRadio>
                  </div>
                </Radio.Group>
                <div className="cardPayment paymentSec">
                  <form>
                    <Row className="gx-3 w-100">
                      <Col sm="12">
                        <div className="form-group">
                          <label className="form-label">
                            {t("text.payment.cardHolder")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            placeholder="Card holder's name "
                          />
                        </div>
                      </Col>
                      <Col sm="12">
                        <div className="form-group">
                          <label className="form-label">
                            {t("text.payment.cardNumber")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            placeholder="Card number"
                          />
                        </div>
                      </Col>
                      <Col xs="7" sm="8">
                        <div className="form-group">
                          <label className="form-label">
                            {t("text.payment.expirationDate")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            placeholder="MM/YY"
                          />
                        </div>
                      </Col>
                      <Col xs="5" sm="4">
                        <div className="form-group">
                          <label className="form-label">
                            {t("text.payment.cvv")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            placeholder="MM/YY"
                          />
                        </div>
                      </Col>
                      <Col sm="12">
                        <div className="form-group mb-0">
                          <Checkbox className="mb-0">
                            {" "}
                            {t(
                              "text.payment.saveThisCardToMakeYourPaymentsEasy",
                            )}
                          </Checkbox>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </div>

                {/* <h3 className="font-bd">Payment Method</h3>
                    <Radio.Group name="paymentMethod" defaultValue="1">
                        <ul className="list-unstyled mb-0 d-flex flex-wrap">
                            <li><AntRadio value="1">Credit & Debit Cards</AntRadio></li>
                            <li><AntRadio value="2">Debit Card</AntRadio></li>
                        </ul>
                    </Radio.Group>
                    <div className="affirmative">
                        <h3 className="font-bd mb-0">Affirmative Action</h3>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>
                        <p className="mb-0"><span>Disclaimer:</span> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    </div>
                    <div className="form-group mb-0">
                        <label className="form-label">Description</label>
                        <div className="form-control-wrap">
                            <AntTextArea className="form-control" placeholder="Enter Description ">  </AntTextArea>
                        </div>
                    </div> */}
              </div>
              <div className="paymentMode_right ms-xl-auto">
                <div className="paymentBox">
                  <h5 className="font-bd d-flex align-items-center">
                    {t("text.payment.proPlan")}
                  </h5>
                  <p>
                    {t("text.payment.withThisPlanYouGetAccessTo")}
                    <Popovers
                      placement="right"
                      overlayClassName="featuresInfo"
                      content={
                        <>
                          <h5 className="mb-xl-3 mb-2">
                            Translation Plan Features
                          </h5>
                          <ul className="featuresInfo_list list-unstyled mb-0">
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              Audio & video conference
                            </li>
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              Maximum meeting duration
                            </li>
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              International dial-in phone numbers
                            </li>
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              Whiteboard
                            </li>
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              Background noise cancellation
                            </li>
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              Record Meetings
                            </li>
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              Save recordings to cloud
                            </li>
                            <li className="d-flex flex-wrap">
                              <em className="icon-check" />
                              Secure cloud storage (10 GB per license)
                            </li>
                          </ul>
                        </>
                      }
                    >
                      <em className="cursor-pointer icon-info paymentBox_infoIcon me-auto ms-2" />
                    </Popovers>
                  </p>
                  <ul className="paymentBox_summary list-unstyled">
                    <li className="font-rg">
                      Plan <span>$450 / Monthly</span>
                    </li>
                    <li className="font-rg">
                      Date of Expiration <span>24-10-2023</span>
                    </li>
                    <li className="font-rg pb-0">
                      <div className="w-100 d-flex align-items-center">
                        <p className="flex-shrink-0 mb-0">Previous Adjusted</p>{" "}
                        <Popovers
                          overlayClassName="renewalInfo"
                          content={
                            <>
                              <p className="mb-0">
                                Pro plan yearly | Exp. 20-07-2023 <br />
                                Remaining days adjusted - 26{" "}
                              </p>
                            </>
                          }
                        >
                          <em className="cursor-pointer icon-info paymentBox_infoIcon me-auto ms-2" />
                        </Popovers>
                      </div>{" "}
                      <span>- ₹ 50</span>
                    </li>
                    {/* <li className="font-rg pb-0"><small>Pro plan yearly | Exp. 20-07-2023</small> </li>   
                            <li className="font-rg py-0"><small>Remaining days adjusted - 26 </small> </li>    */}
                    <li className="totalPayment font-sb pb-0">
                      {t("text.payment.totalPayment")}
                      <span>₹ 899</span>
                    </li>
                  </ul>
                  <div className="d-flex align-items-center">
                    <Checkbox className="dark">Auto-Renewal</Checkbox>{" "}
                    <Popovers
                      placement="right"
                      overlayClassName="renewalInfo"
                      content={
                        <>
                          <h5>Auto-Renewal</h5>
                          <p>
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour
                          </p>
                        </>
                      }
                    >
                      <em className="icon-info paymentBox_infoIcon" />
                    </Popovers>
                  </div>
                  <div className="paymentBox_action">
                    {/* payment Failed modal */}
                    {/* <RippleEffect extraClassName="w-100"><CommonButton extraClassName="w-100" variant="primary"  onClick={() => handleUpdateSuccessShow("failed")}><em className="icon-circle-next icon-left" /> Pay Now</CommonButton></RippleEffect> */}
                    {/* payment Successfull modal */}
                    <RippleEffect extraClassName="w-100">
                      <CommonButton
                        extraClassName="w-100"
                        variant="primary"
                        onClick={() => handleUpdateSuccessShow("success")}
                      >
                        <em className="icon-circle-next icon-left" />
                        {t("text.payment.payNow")}
                      </CommonButton>
                    </RippleEffect>

                    {/* payment-mode page */}
                    {/* <RippleEffect extraClassName="w-100"><Link className="btn btn-primary w-100" to={userRoutesMap.PAYMENT_MODE.path}>Pay Now</Link></RippleEffect> */}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
      <ModalComponent
        show={updateSuccess}
        modalExtraClass="paymentSuccessModal"
        onHandleVisible={handleUpdateSuccessShow}
        onHandleCancel={handleClose}
        title=""
        size="sm"
        closeButton={false}
      >
        {modalType === "success" ? (
          <div className="text-center">
            <ImageElement
              source="success.svg"
              alt="payment-success"
              className="img-fluid"
            />
            <h3 className="font-bd">{t("text.payment.paymentSuccessful")}</h3>
            <p>{t("text.payment.paymentReceiptMessage")}</p>
            <div className="btnAction">
              <CommonButton variant="primary" onClick={() => handleClose()}>
                {t("text.common.okay")}
              </CommonButton>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <ImageElement
              source="failed.svg"
              alt="payment-success"
              className="img-fluid"
            />
            <h3 className="font-bd">{t("text.payment.paymentFailed")}</h3>
            <p>{t("text.payment.paymentReceiptFailed")}</p>
            <div className="btnAction">
              <CommonButton variant="primary" onClick={() => handleClose()}>
                {t("text.payment.tryAgain")}
              </CommonButton>
            </div>
          </div>
        )}
      </ModalComponent>
    </>
  );
}

export default PaymentSummary;
