import { Formik, Form } from "formik";
import { Checkbox, Radio } from "antd";
import { Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { AntRadio } from "../../../../Antd";
import validation from "./validation";
import { AntSelect, Input as TextInput } from "../../../..";

function SubscriptionForm(props) {
    const { subscriptionModalType, planLevel, planValidityData, loopsLimitRadio, userLimitRadio, addUser, radioOnChange, addUserChange, SubscriptionAdded, SubscriptionUpdated, hideSubscriptionEditModal } = props;
    const initialValues = {
        planName: "",
        planPrice: "",
        planValidity: "",
        planLevel: "",
        voiceCallsLimit: "",
        videoCallsLimit: "",
        loopsLimit: "",
        userLimit: ""
    }
    function handleKey(e) {
        let ASCIICode = e.which ? e.which : e.keyCode;
        if (
            ASCIICode > 31 &&
            (ASCIICode < 48 || ASCIICode > 57)
        ) {
            e.preventDefault();
        }
    }

    console.log("userLimitRadiouserLimitRadio",userLimitRadio);
    return <>
        <Formik initialValues={{ ...initialValues }}
            onSubmit={SubscriptionAdded}
            validationSchema={()=>validation(addUser,loopsLimitRadio,userLimitRadio)}
            enableReinitialize
        >
            <Form>
                <Row className="g-3">
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="question">{t("text.manageSubscription.planName")}</label>
                            <TextInput
                                className="form-control form-control-lg"
                                placeholder={t("text.manageSubscription.planNamePlaceholder")}
                                defaultValue={subscriptionModalType === 'add' ? "" : "Pro Plan"}
                                name="planName"
                                disabled={false}
                                variant="standard"
                                type="text"
                            />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="question">{t("text.manageSubscription.planPrice")}</label>
                            <TextInput
                                className="form-control form-control-lg"
                                placeholder={t("text.manageSubscription.planPricePlaceholder")}
                                defaultValue={subscriptionModalType === 'add' ? "" : "$450"}
                                name="planPrice"
                                disabled={false}
                                onKeyPress={(e) => handleKey(e)}
                                variant="standard"
                                type="text"
                            />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="question">{t("text.manageSubscription.planValidity")}</label>
                            <AntSelect
                                size="large"
                                id="dateFilter"
                                name="planValidity"
                                disabled={false}
                                variant="standard"
                                placeholder={t("text.manageSubscription.planNamePlaceholder")}
                                arrayOfData={planValidityData}
                            />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="question">{t("text.manageSubscription.planLevel")}</label>
                            <AntSelect
                                size="large"
                                id="dateFilter"
                                name="planLevel"
                                placeholder={t("text.manageSubscription.planLevelPlaceholder")}
                                disabled={false}
                                variant="standard"
                                arrayOfData={planLevel}
                            />
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="form-group">
                            <h6 className="title">{t("text.manageSubscription.setFeatures")}</h6>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="question">{t("text.manageSubscription.voiceCallsLimit")}</label>
                            <TextInput
                                className="form-control form-control-lg"
                                placeholder={t("text.manageSubscription.voiceCallsLimitPlaceholder")}
                                defaultValue={subscriptionModalType === 'add' ? "" : "60"}
                                name="voiceCallsLimit"
                                disabled={false}
                                variant="standard"
                                onKeyPress={(e) => handleKey(e)}
                                type="text"
                                formItemClass="input-group"
                                addonAfter={<span className="input-group-text border-start-0">Min</span>}
                            />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="question">{t("text.manageSubscription.videoCallsLimit")}</label>
                            <TextInput
                                className="form-control form-control-lg"
                                placeholder={t("text.manageSubscription.videoCallsLimitPlaceholder")}
                                defaultValue={subscriptionModalType === 'add' ? "" : "60"}
                                name="videoCallsLimit"
                                disabled={false}
                                onKeyPress={(e) => handleKey(e)}
                                variant="standard"
                                type="text"
                                formItemClass="input-group"
                                addonAfter={<span className="input-group-text border-start-0">Min</span>}
                            />
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="form-group mb-0">
                            <label className="form-label">{t("text.manageSubscription.loopsLimit")}</label>
                            <div className="form-control-wrap">
                                <Radio.Group name="loopsLimit" onChange={radioOnChange} defaultValue={0}>
                                    <AntRadio value={1}>Custom</AntRadio>
                                    <AntRadio value={0}>Unlimited</AntRadio>
                                </Radio.Group>
                            </div>
                        </div>
                        {loopsLimitRadio === 1 ?
                            <div className="form-group mt-2">
                                <TextInput
                                    className="form-control form-control-lg"
                                    placeholder={t("text.manageSubscription.loopsLimitPlaceholder")}
                                    defaultValue={subscriptionModalType === 'add' ? "" : "60"}
                                    name="loopsLimit"
                                    onKeyPress={(e) => handleKey(e)}
                                    disabled={false}
                                    variant="standard"
                                    type="text"
                                />
                            </div>
                            :
                            <></>
                        }
                    </Col>
                    <Col md="12">
                        <div className="form-group mb-0">
                            <label className="form-label">{t("text.manageSubscription.userLimit")}</label>
                            <div className="form-control-wrap">
                                <Radio.Group name="userLimit" defaultValue={0}>
                                    <AntRadio value={1}>Custom</AntRadio>
                                    <AntRadio value={0}>Unlimited</AntRadio>
                                </Radio.Group>
                            </div>
                        </div>
                        {userLimitRadio  ?
                            <div className="d-flex mt-2">
                                <div className="form-group flex-grow-1">
                                    <TextInput
                                        className="form-control form-control-lg"
                                        placeholder={t("text.manageSubscription.userLimitPlaceholder")}
                                        defaultValue={subscriptionModalType === 'add' ? "" : "60"}
                                        name="usersLimit"
                                        onKeyPress={(e) => handleKey(e)}
                                        disabled={false}
                                        variant="standard"
                                        type="text"
                                    />
                                </div>
                                <div className="ms-3">
                                    <Checkbox
                                        className="mt-2"
                                        onChange={addUserChange}
                                        defaultChecked={subscriptionModalType === 'add' ? 0 : 1}
                                    >
                                        {t("text.manageSubscription.additionalUserPrice")}
                                    </Checkbox>
                                </div>
                            </div>
                            :
                            <></>
                        }
                        {userLimitRadio  && addUser &&
                            <div className="form-group flex-grow-1">
                                <TextInput
                                    className="form-control form-control-lg"
                                    placeholder="Enter Additional User Price"
                                    defaultValue={subscriptionModalType === 'add' ? "" : "120"}
                                    name="question"
                                    onKeyPress={(e) => handleKey(e)}
                                    disabled={false}
                                    variant="standard"
                                    type="text"
                                />
                            </div>
                        }
                    </Col>
                </Row>
                <div className="mt-4 align-center justify-content-center flex-wrap flex-sm-nowrap gx-md-4 gx-2 gy-2">
                    <div>
                        {
                            subscriptionModalType === 'add' ?
                                <button type="submit" className="btn btn-primary btn-lg">{t("text.common.add")}</button>
                                :
                                <button type="suubmit" onClick={() => SubscriptionUpdated()} className="btn btn-primary btn-lg">{t("text.common.update")}</button>
                        }
                    </div>
                    <div>
                        <button onClick={() => hideSubscriptionEditModal()} className="btn btn-light btn-lg">{t("text.common.cancel")}</button>
                    </div>
                </div>
            </Form>
        </Formik>
    </>
}
export default SubscriptionForm;