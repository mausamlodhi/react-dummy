import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { Container, Row, Col } from "react-bootstrap";
import { CommonButton } from "../../../components";
import userRoutesMap from "../../../routeControl/userRouteMap";

function Pricing() {
  const navigate = useNavigate();
  const next = () => {
    navigate(userRoutesMap.PAYMENT_SUMMARY.path);
  };

  return (
    <>
      <div className="pageWrap pricingPage">
        <Container>
          <div className="pricingPage_head text-center">
            <h3 className="font-bd">{t("text.payment.pricing")}</h3>
            <h1 className="font-bd mb-0">{t("text.payment.selectAPlanThatHelpsGrow")}</h1>
          </div>

          <Row className="g-3 g-xl-4">
            <Col lg="4" xl="4" md="6">
              <div className="pricingPage_box bg-white">
                <div className="text-center">
                  <div className="pricingPage_box_plan">
                    <h2 className="font-bd">{t("text.payment.freePlan")}</h2>
                    <span className="users">For up to 10 users</span>
                  </div>
                  <div className="pricingPage_box_planPrice">
                    <h3 className="mb-0">$00</h3>
                    <p className="mb-0">Free</p>
                  </div>
                </div>

                <span className="saprator" />

                <div className="pricingPage_box_desc">
                  <ul className="list-unstyled mb-0">
                    <li>Lorem ipsum dolor sit amet, consectetuer </li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <li>Vestibulum auctor dapibus neque.</li>
                    <li>Nunc dignissim risus id metus.</li>
                    <li>Cras ornare tristique elit.</li>
                    <li>Vivamus vestibulum ntulla nec ante.</li>
                    <li>Praesent placerat risus quis eros.</li>
                    <li>Fusce pellentesque suscipit nibh.</li>
                  </ul>
                  <div className="w-100 viewMore text-center">
                    <Link to="#" className="text-center">
                    {t("text.payment.viewMore")}
                    </Link>
                  </div>
                </div>

                <div className="pricingPage_box_btn">
                  <CommonButton
                    onClick={next}
                    variant="outline-info"
                    className="w-100"
                    disabled
                  >
                    {t("text.payment.buyNow")}
                  </CommonButton>
                </div>
              </div>
            </Col>
            <Col lg="4" xl="4" md="6">
              <div className="pricingPage_box bg-white">
                <div className="pricingPage_box_price text-center">
                  <div className="pricingPage_box_plan">
                    <h2 className="font-bd">{t("text.payment.proPlan")}</h2>
                    <span className="users">For up to 50+ users</span>
                  </div>
                  <div className="pricingPage_box_planPrice">
                    <h3 className="mb-0">
                      $450 <span>Per Month</span>
                    </h3>
                    <p className="mb-0">($1,200 Annually)</p>
                  </div>
                </div>

                <span className="saprator" />

                <div className="pricingPage_box_desc">
                  <ul className="list-unstyled mb-0">
                    <li>Lorem ipsum dolor sit amet, consectetuer </li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <li>Vestibulum auctor dapibus neque.</li>
                    <li>Nunc dignissim risus id metus.</li>
                    <li>Cras ornare tristique elit.</li>
                    <li>Vivamus vestibulum ntulla nec ante.</li>
                    <li>Praesent placerat risus quis eros.</li>
                    <li>Fusce pellentesque suscipit nibh.</li>
                  </ul>
                  <div className="w-100 viewMore text-center">
                    <Link to="#" className="text-center">
                    {t("text.payment.viewMore")}
                    </Link>
                  </div>
                </div>
                <div className="pricingPage_box_btn">
                  <CommonButton
                    onClick={next}
                    variant="outline-info"
                    className="w-100"
                  >
                    {t("text.payment.switchTo")}
                  </CommonButton>
                </div>
              </div>
            </Col>
            <Col lg="4" xl="4" md="6">
              <div className="pricingPage_box bg-white">
                <div className="pricingPage_box_price text-center">
                  <div className="pricingPage_box_plan">
                    <h2 className="font-bd">Enterprise Plan</h2>
                    <span className="users">For up to 200+ users</span>
                  </div>
                  <div className="pricingPage_box_planPrice">
                    <h3 className="mb-0">
                      $560 <span>Per Month</span>
                    </h3>
                    <p className="mb-0">($1,200 Annually)</p>
                  </div>
                </div>

                <span className="saprator" />

                <div className="pricingPage_box_desc">
                  <ul className="list-unstyled mb-0">
                    <li>Lorem ipsum dolor sit amet, consectetuer </li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <li>Vestibulum auctor dapibus neque.</li>
                    <li>Nunc dignissim risus id metus.</li>
                    <li>Cras ornare tristique elit.</li>
                    <li>Vivamus vestibulum ntulla nec ante.</li>
                    <li>Praesent placerat risus quis eros.</li>
                    <li>Fusce pellentesque suscipit nibh.</li>
                  </ul>
                  <div className="w-100 viewMore text-center">
                    <Link to="#" className="text-center">
                    {t("text.payment.viewMore")}
                    </Link>
                  </div>
                </div>
                <div className="pricingPage_box_btn">
                  <CommonButton
                    onClick={next}
                    variant="outline-info"
                    className="w-100"
                  >
                    {t("text.payment.switchTo")}
                  </CommonButton>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Pricing;
