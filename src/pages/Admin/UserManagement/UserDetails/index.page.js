import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  DataTable,
  ImageElement,
  PageHeader,
  TabComponent,
  checkValidData,
  statusFormatter,
  textFormatter,
} from "../../../../components";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import { dateFormatter, logger, modalNotification } from "../../../../utils";
import { newDateFormatter } from "../../../../helpers";
import { UserManagementServices } from "../../../../services/Admin";

function UserDetails() {
  const [defaultKey, setDefaultKey] = useState("transactionDetails");
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t("text.common.dashboard"),
    },
    {
      path: `${adminRouteMap.USER_MANAGEMENT.path}`,
      name: t("text.adminUserManagement.userManagement"),
    },
    {
      path: "#",
      name: t("text.adminUserManagement.userDetails"),
    },
  ];
  const customerData = [
    {
      id: 1,
      planName: "Gold",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "active",
    },
    {
      id: 2,
      planName: "Silver",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "inactive",
    },
    {
      id: 3,
      planName: "Platinum",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "active",
    },
    {
      id: 4,
      planName: "Platinum",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "active",
    },
    {
      id: 5,
      planName: "Silver",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "inactive",
    },
    {
      id: 6,
      planName: "Gold",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "inactive",
    },
    {
      id: 7,
      planName: "Platinum",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "active",
    },
    {
      id: 8,
      planName: "Silver",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "active",
    },
    {
      id: 9,
      planName: "Silver",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "inactive",
    },
    {
      id: 10,
      planName: "Gold",
      planStartDate: "22/02/2021",
      planExpiryDate: "22/02/2022",
      status: "inactive",
    },
  ];
  const columns = [
    {
      dataField: "id",
      text: t("text.common.sno"),
      headerClasses: "w_70",
    },
    {
      dataField: "planName",
      text: t("text.common.subscriptionPlan"),
      headerClasses: "sorting",
    },
    {
      dataField: "planStartDate",
      text: t("text.adminUserManagement.planStartDate"),
      headerClasses: "sorting",
    },
    {
      dataField: "planExpiryDate",
      text: t("text.adminUserManagement.planExpiryDate"),
      headerClasses: "sorting",
    },
    {
      dataField: "status",
      text: t("text.common.status"),
      headerClasses: "sorting",
      formatter: statusFormatter,
    },
  ];
  const tabContent = [
    {
      name: t("text.adminUserManagement.transactionDetails"),
      key: "transactionDetails",
      icon: "icon ni ni-repeat",
      content: (
        <>
          <DataTable
            hasLimit
            noOfPage="1"
            sizePerPage="10"
            page="1"
            count="100"
            isCard={false}
            tableData={customerData}
            tableColumns={columns}
            setSizePerPage=""
          />
        </>
      ),
    },
  ];

  const getUserList = async (userId) => {
    // setLoading(true);
    try {
      const { success, data, message } =
        await UserManagementServices.getSingleUserService(userId);

      if (success && data) {
        setUserData(data);
      } else {
        modalNotification({
          type: "error",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getUserList(id);
  }, []);

  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.adminUserManagement.userManagement")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <Row className="g-2 row">
        <Col lg="4" xl="4" xxl="3">
          <div className="card h-100">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="user-card user-card-s2">
                  {/* <div className="user-avatar lg bg-primary">
                    <span>FM</span>
                  </div> */}
                  {userData?.profileImageUrl && (
                    <>
                      {" "}
                      <ImageElement
                        previewSource={userData?.profileImageUrl}
                        className="img-fluid"
                        alt="profile"
                        origin="anonymous"
                      />
                    </>
                  )}
                  <div className="user-info">
                    <div
                      className={`badge  rounded-pill ucap ${
                        userData?.status === "active"
                          ? "bg-success"
                          : "bg-danger"
                      } `}
                    >
                      {checkValidData(userData?.status)}
                    </div>
                    <h5>{textFormatter(userData?.username)}</h5>
                    <span className="sub-text">
                      {checkValidData(userData?.email)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-inner">
                <h6 className="overline-title mb-2">
                  {t("text.adminUserManagement.shortDetails")}
                </h6>
                <div className="row g-3">
                  <div className="col-sm-6 col-md-4 col-lg-12">
                    <span className="sub-text">
                      {" "}
                      {t("text.common.lastLogin")}:
                    </span>
                    <span>
                      {dateFormatter(userData?.lastLogin, newDateFormatter)}
                    </span>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-12">
                    <span className="sub-text">
                      {t("text.common.createdAt")}:
                    </span>
                    <span>
                      {" "}
                      {dateFormatter(userData?.createdAt, newDateFormatter)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg="8" xl="8" xxl="9">
          <div className="card h-100">
            <div className="">
              <TabComponent
                tabContent={tabContent}
                activeKey={defaultKey}
                setActiveKey={setDefaultKey}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default UserDetails;
