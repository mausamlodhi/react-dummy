import { t } from "i18next";
import { Link } from "react-router-dom";
import { CommonButton, RippleEffect } from "../../../../components";

function BillingHistory({sidebarOpen}) {


    return <>
        <div className="d-flex justify-content-between head">
            <h2 className="title mb-0">{t("text.userProfile.billingHistory")}</h2>
            <Link
                className="d-lg-none toggleIcon"
                onClick={sidebarOpen}
            >
                <em className="icon-menu-bar" />{" "}
            </Link>
        </div>
        <div className="subscriptionBox">
            <div className="billingList">
                <h5 className="font-bd">{t("text.userProfile.proPlan")}</h5>
                <ul className="list-unstyled d-flex flex-wrap">
                    <li>
                        <span className="d-inline-block">{t("text.userProfile.plan")}</span>{" "}
                        <p className="mb-0 font-sb">Annualy</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.subScriptionPrice")}
                        </span>{" "}
                        <p className="mb-0 font-sb">$150</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.dateOfInvoice")}
                        </span>{" "}
                        <p className="mb-0 font-sb">24-10-2022</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.dateOfExpiration")}
                        </span>{" "}
                        <p className="mb-0 font-sb">24-10-2023</p>
                    </li>
                    <li>
                        <span className="d-inline-block">{t("text.common.status")}</span>{" "}
                        <p className="mb-0 font-sb">Active</p>
                    </li>
                    <li>
                        <span className="d-inline-block">{t("text.userProfile.refund")}</span>{" "}
                        <p className="mb-0 font-sb">NA</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.paymentMethod")}
                        </span>{" "}
                        <p className="mb-0 font-sb">Visa****4242</p>
                    </li>
                </ul>
                <RippleEffect>
                    <CommonButton
                        extraClassName="btn-md"
                        variant="secondary"
                    >
                        {" "}
                        <em className="icon-download-light icon-left" />
                        {t("text.userProfile.downloadInvoice")}
                    </CommonButton>
                </RippleEffect>
            </div>
            <div className="billingList">
                <h5 className="font-bd">{t("text.userProfile.enterprisePlan")}</h5>
                <ul className="list-unstyled d-flex flex-wrap">
                    <li>
                        <span className="d-inline-block">{t("text.userProfile.plan")}</span>{" "}
                        <p className="mb-0 font-sb">Annualy</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.subScriptionPrice")}
                        </span>{" "}
                        <p className="mb-0 font-sb">$150</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.dateOfInvoice")}
                        </span>{" "}
                        <p className="mb-0 font-sb">24-10-2022</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.dateOfExpiration")}
                        </span>{" "}
                        <p className="mb-0 font-sb">24-10-2023</p>
                    </li>
                    <li>
                        <span className="d-inline-block">{t("text.common.status")}</span>{" "}
                        <p className="mb-0 font-sb">Active</p>
                    </li>
                    <li>
                        <span className="d-inline-block">{t("text.userProfile.refund")}</span>{" "}
                        <p className="mb-0 font-sb">NA</p>
                    </li>
                    <li>
                        <span className="d-inline-block">
                            {t("text.userProfile.paymentMethod")}
                        </span>{" "}
                        <p className="mb-0 font-sb">Visa****4242</p>
                    </li>
                </ul>
                <RippleEffect>
                    <CommonButton
                        extraClassName="btn-md"
                        variant="secondary"
                    >
                        {" "}
                        <em className="icon-download-light icon-left" />
                        {t("text.userProfile.downloadInvoice")}
                    </CommonButton>
                </RippleEffect>
            </div>
        </div>
    </>
}
export default BillingHistory;