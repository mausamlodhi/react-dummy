import { Link } from "react-router-dom";
import { t } from "i18next";
import { CommonButton, RippleEffect } from "../../../../components/UiElement";
import { Popovers } from "../../../../components/Antd";
import Subscriptionfeatures from "../SubscriptionFeatures";

function SubscriptionPlans(props) {

    const { sidebarOpen, setIsCancelPlan, handleSwitchShow } = props;
    return <>
        <div className="d-flex justify-content-between head">
            <h2 className="title mb-0">{t("text.userProfile.subscriptionPlans")} </h2>
            <Link
                className="d-lg-none toggleIcon"
                onClick={sidebarOpen}
            >
                <em className="icon-menu-bar" />{" "}
            </Link>
        </div>
        <div className="subscriptionBox">
            <div className="plansList">
                <ul className="list-unstyled d-flex justify-content-between mb-0 flex-wrap">
                    <li className="plansList_box position-relative">
                        <h5 className="font-bd">1. Pro Plan</h5>
                        <p className="mb-1">
                            Date of expira:{" "}
                            <span className="font-bd"> 24-10-2023 </span>
                        </p>
                        <p className="mb-2">
                            Date of expiration:{" "}
                            <span className="font-bd"> 24-10-2024 </span>
                        </p>
                        <div className="">
                            <p className="planInfo font-sb text-success">
                                <small>{t("text.userProfile.autoRenewalIsOn")}</small>
                            </p>

                            <RippleEffect>
                                <Popovers
                                    placement="right"
                                    overlayClassName="featuresInfo"
                                    content={
                                        <Subscriptionfeatures />

                                    }
                                >
                                    <div>
                                        <CommonButton
                                            extraClassName="btn-feature btn-sm"
                                            variant="info"
                                        >
                                            {t("text.common.features")}
                                        </CommonButton>
                                    </div>
                                </Popovers>
                            </RippleEffect>
                        </div>
                        <div className="d-flex mt-2 mt-md-3 mt-lg-4">
                            <RippleEffect>
                                <CommonButton
                                    variant="light"
                                    onClick={() => setIsCancelPlan(true)}
                                >
                                    {t("text.common.cancel")}
                                </CommonButton>
                            </RippleEffect>
                            <RippleEffect extraClassName="ms-2 ms-md-3">
                                <CommonButton
                                    variant="primary"
                                    onClick={() => handleSwitchShow()}
                                >
                                    {t("text.common.switch")}
                                </CommonButton>
                            </RippleEffect>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </>
}
export default SubscriptionPlans;