import React from "react";
import { Link } from "react-router-dom";
// import //  Col, Row
// "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Accordion, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  AccordionComponent,
  CommonButton,
  checkValidData,
  logoCreater,
  phoneNumberFormatter,
  textFormatter,
} from "../../../../components";
import {
  colorObj,
  dayJsDateFormatter,
  getRoomMembersLength,
} from "../../../../utils";
import { selectUserData } from "../../../../redux/AuthSlice/index.slice";

export default function LoopsInfo({
  setSidebarOpenKey,
  showEditLoopModal,
  loopData,
  loopId,
  insuranceData,
}) {
  const userData = useSelector(selectUserData);
  const Data = (
    <>
      <Accordion.Body>
        <div className="panelInfo d-flex align-items-center">
          <div
            className={`userAvatar userAvatar-md d-flex  ${
              loopData?.name
                ? colorObj?.[loopData?.name?.charAt(0).toLowerCase()]
                : ""
            } justify-content-center align-items-center flex-shrink-0`}
          >
            <span>{logoCreater(loopData?.name)}</span>
          </div>
          <div className="panelProfile">
            <h4>{checkValidData(loopData?.clientName)}</h4>
            <p className="mb-0">
              <em className="icon icon-phone" />
              {phoneNumberFormatter(
                loopData?.countryCode,
                loopData?.phoneNumber
              )}
            </p>
          </div>
        </div>
        <ul className="panelDetail list-unstyled mb-0">
          <li>
            <div className="panelDetail_list d-flex">
              <span className="icon-email">
                <em className="path1" />
                <em className="path2" />
              </span>
              {checkValidData(loopData?.email)}
            </div>
          </li>
          <li>
            <div className="panelDetail_list d-flex">
              <span className="icon-location">
                <em className="path1" />
                <em className="path2" />
              </span>
              {checkValidData(loopData?.address)},{" "}
              {loopData?.address
                ? `${checkValidData(loopData?.city)}, ${checkValidData(
                    loopData?.state?.name
                  )}, ${checkValidData(
                    loopData?.country?.name
                  )}, ${checkValidData(loopData?.zipCode)}`
                : ""}
            </div>
          </li>
        </ul>
      </Accordion.Body>
    </>
  );

  const insurance = (
    <Accordion.Body>
      <ul className="panelDetail list-unstyled mb-0">
        <li>
          <div className="panelDetail_list d-flex text-break">
            <span className="icon-user">
              <em className="path1" />
              <em className="path2" />
            </span>
            {checkValidData(insuranceData?.AdjusterName)}
          </div>
        </li>
        <li>
          <div className="panelDetail_list d-flex">
            <span className="icon-phone">
              <em className="path1" />
              <em className="path2" />
            </span>
            +
            {phoneNumberFormatter(
              insuranceData?.countryCode,
              insuranceData?.phoneNumber
            )}
          </div>
        </li>
        <li>
          <div className="panelDetail_list d-flex">
            <span className="icon-email">
              <em className="path1" />
              <em className="path2" />
            </span>
            {checkValidData(insuranceData?.email)}
          </div>
        </li>
        <li>
          <div className="panelDetail_list d-flex text-break">
            <span className="icon-address">
              <em className="path1" />
              <em className="path2" />
            </span>
            {checkValidData(loopData?.address)}
          </div>
        </li>
        <li>
          <Row className="g-3">
            {/* <Col md="6">
              <div className="panelDetail_list d-flex">
                <span className="icon-water">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                <div>
                  Type of loss
                  <p>Water</p>
                </div>
              </div>
            </Col> */}
            <Col md="6">
              <div className="panelDetail_list d-flex">
                <span className="icon-number">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                <div>
                  Claim Number
                  <p className="text-break">
                    {checkValidData(insuranceData?.claimNumber)}
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="panelDetail_list d-flex">
                <span className="icon-number">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                <div>
                  Policy Number
                  <p className="text-break">
                    {checkValidData(insuranceData?.policyNumber)}
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="panelDetail_list d-flex">
                <span className="icon-calendar">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                <div>
                  Date of loss
                  <p>
                    {checkValidData(
                      dayJsDateFormatter(
                        insuranceData?.dateOfLoss,
                        "DD-MM-YYYY"
                      )
                    )}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </li>
        <li>
          <div className="panelDetail_list d-flex text-break">
            <span className="icon-address">
              <em className="path1" />
              <em className="path2" />
            </span>
            <div>
              Additional Notes
              <p>{checkValidData(insuranceData?.additionalNote)}</p>
            </div>
          </div>
        </li>
      </ul>
    </Accordion.Body>
  );

  const accordionData = [
    { name: "Client", eventKey: 0, content: Data, modalData: "loopClient" },
    {
      name: "Insurance",
      eventKey: 1,
      content: insurance,
      modalData: "loopInsurance",
    },
  ];
  const { t } = useTranslation();
  return (
    <div className="rightBarDetail vh-100">
      <div className="rightBarDetail_header position-relative">
        <Link to="#" onClick={() => setSidebarOpenKey("")} className="closeBar">
          <em className="icon icon-close" />
        </Link>
      </div>
      <div className="rightBarDetail_profile text-center">
        <div
          className={`userAvatar userAvatar-lg ${
            loopData?.name
              ? colorObj?.[loopData?.name?.charAt(0).toLowerCase()]
              : ""
          } d-flex justify-content-center align-items-center`}
        >
          <span>{logoCreater(loopData?.name)}</span>
        </div>
        <div className="detail">
          <h2>{checkValidData(textFormatter(loopData?.name))}</h2>
          <h3 className="mb-0">
            {loopData?.chatRooms?.length > 0
              ? getRoomMembersLength(
                  loopData?.chatRooms
                    ?.map((item) => item?.chatRoomMembers)
                    .flat()
                )
              : 0}{" "}
            Members <span className="px-1">|</span>
            {loopData?.chatRooms?.length} Channel{" "}
          </h3>
          <p>{checkValidData(loopData?.description)}</p>
          {userData?.id === loopId && (
            <CommonButton
              variant="outline-info"
              htmlType="submit"
              onClick={() => showEditLoopModal("loopInfo")}
            >
              {t("text.common.edit")}
            </CommonButton>
          )}
        </div>
      </div>
      <div className="rightBarDetail_panel">
        {accordionData?.length > 0 &&
          accordionData.map((item) => {
            return (
              <AccordionComponent
                defaultActiveKey={0}
                alwaysOpen
                eventKey={item?.eventKey}
              >
                <Accordion.Header>
                  {checkValidData(item?.name)}
                  {userData?.id === loopId && (
                    <Link
                      to="#"
                      onClick={() => showEditLoopModal(item?.modalData)}
                    >
                      <em className="icon icon-edit-box edit" />
                    </Link>
                  )}
                </Accordion.Header>
                {item?.content}
              </AccordionComponent>
            );
          })}
      </div>
    </div>
  );
}
