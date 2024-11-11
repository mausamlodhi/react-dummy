import { Radio } from "antd";
import React, { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { AntRadio, Checkbox, CommonButton, ImageElement, ModalComponent, Input as TextInput } from "../../../components";

function PaymentMode() {
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [modalType, setmodalType] = useState("");
    const handleUpdateSuccessShow = (type) => {
        setUpdateSuccess(true);
        setmodalType(type)
    }
    const handleClose = () => {
        setUpdateSuccess(false)
      };
  return (
    <>
        <div className="pageWrap">
            <section className="paymentMode">
                <Container className="container-md">
                    <div className="pageHeader p-0">
                        <div className="pageHeader_head d-flex flex-wrap align-items-center">
                        <h3 className="pageHeader_head_title font-bd d-flex align-items-center mb-0"><Link to="/payment-summary" className="backIcon me-2 me-xl-3"><em className="icon-back" /></Link>{t("text.payment.choosePaymentMode")}</h3>
                        </div>
                    </div>
                    <div className="paymentMode_inner">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="paymentOption">
                            <Row>
                                <Col lg={3}>
                                    <div className="customCard p-0 overflow-hidden paymentMode_tab">
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link className="d-flex align-items-center" eventKey="paymentOption"> <span className="icon-saved"><em className="path1"/><em className="path2"/></span>{t("text.payment.savedPaymentOptions")}</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="d-flex align-items-center" eventKey="cards"><span className="icon-credit-card"><em className="path1"/><em className="path2"/></span>{t("text.payment.creditAndDebitCards")}</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="paymentOption">
                                            <div className="paymentMode_cnt customCard">
                                                <h3 className="font-bd mb-0">{t("text.payment.saveCards")}</h3>
                                                <div className="paymentSec">
                                                    <Radio.Group name="cardChoose">
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <div className="d-flex paymentSec_card align-items-center">
                                                                <AntRadio value="1" className="d-flex align-items-center">
                                                                    <div className=""><h6 className="mb-0 font-bd">HDFC Credit Card</h6><p className="mb-0"> visa****4242 </p></div>
                                                                </AntRadio>
                                                                <Link to="#" className=""><em className="icon-remove"/></Link>
                                                            </div>
                                                            <div className="d-flex paymentSec_card align-items-center">
                                                                <AntRadio value="2" className="d-flex align-items-center">
                                                                    <div className=""><h6 className="mb-0 font-bd">HDFC Credit Card</h6><p className="mb-0"> visa****4242 </p></div>
                                                                </AntRadio>
                                                                <Link to="#" className=""><em className="icon-remove"/></Link>
                                                            </div>
                                                        </div>
                                                    </Radio.Group>
                                                </div>
                                                <CommonButton variant="primary" onClick={() => handleUpdateSuccessShow("success")}><em className="icon-circle-next icon-left" />{t("text.payment.payNow")}</CommonButton>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="cards">
                                            <div className="paymentMode_cnt customCard">
                                                <h3 className="font-bd">{t("text.payment.addCreditAndDebitCards")}</h3>
                                                <div className="cardPayment">
                                                    <form>
                                                        <Row className="gx-3">
                                                            <Col sm="12">
                                                                <div className="form-group">
                                                                    <label className="form-label">{t("text.payment.cardHolder")} </label>
                                                                    <TextInput 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    placeholder="Card holder's name "/>     
                                                                </div>
                                                            </Col>
                                                            <Col sm="12">
                                                                <div className="form-group">
                                                                    <label className="form-label">{t("text.payment.cardNumber")}</label>
                                                                    <TextInput 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    placeholder="Card number"/>     
                                                                </div>
                                                            </Col>
                                                            <Col xs ="7" sm="8">
                                                                <div className="form-group">
                                                                    <label className="form-label">={t("text.payment.expirationDate")}</label>
                                                                    <TextInput 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    placeholder="MM/YY"/>     
                                                                </div>
                                                            </Col>
                                                            <Col xs="5" sm="4">
                                                                <div className="form-group">
                                                                    <label className="form-label">{t("text.payment.cvv")}</label>
                                                                    <TextInput 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    placeholder="MM/YY"/>     
                                                                </div>
                                                            </Col>
                                                            <Col sm="12">
                                                                <div className="form-group mb-0">
                                                                    <Checkbox className="mb-0"> {t("text.payment.saveThisCardToMakeYourPaymentsEasy")}</Checkbox>  
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <CommonButton variant="primary" onClick={() => handleUpdateSuccessShow("failed")}><em className="icon-circle-next icon-left" /> {t("text.payment.payNow")}</CommonButton>
                                                    </form>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </Container>
            </section>
        </div>
        <ModalComponent
        show={updateSuccess}
        modalExtraClass="paymentSuccessModal"
        onHandleVisible={handleUpdateSuccessShow}
        onHandleCancel={handleClose}
        title="" size="sm" closeButton={false}
      >
        { modalType ==="success"?
        <div className="text-center">
            <ImageElement source="success.svg" alt="payment-success" className="img-fluid"/>
            <h3 className="font-bd">{t("text.payment.paymentSuccessful")}</h3>
            <p>{t("text.payment.thankYouForThePaymentReceiptWillBeSentToYourRegisteredEmailAddress")}</p>
            <div className="btnAction">
                <CommonButton  variant="primary" onClick={ () => handleClose()}>{t("text.common.okay")}</CommonButton>
            </div>
        </div>
        :
        <div className="text-center">
            <ImageElement source="failed.svg" alt="payment-success" className="img-fluid"/>
            <h3 className="font-bd">{t("text.payment.paymentFailed")}</h3>
            <p>{t("text.payment.informYouThatThePaymentForYourRecentTransactionHasFailed")}</p>
            <div className="btnAction">
                <CommonButton  variant="primary" onClick={ () => handleClose()}>{t("text.payment.tryAgain")}</CommonButton>
            </div>
        </div>
        }
      </ModalComponent>
    </>
  );
}

export default PaymentMode;
