import React, { useState } from "react";
import { t } from "i18next";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { modalNotification } from "../../../utils";
import {
  actionFormatter,
  Breadcrumb,
  DataTable,
  ListingHeader,
  ManageSubscriptionFilter,
  ModalComponent,
  PageHeader,
  statusFormatter,
  SubscriptionForm,
  SweetAlert,
} from "../../../components";

function ManageSubscription() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [status, setStatus] = useState("active");
  const [userLimitRadio, setUserLimitRadio] = useState(false);
  const [loopsLimitRadio, setLoopsLimitRadio] = useState(false);
  const [addUser, setAddUser] = useState(0);
  const [isAlertVisibleDelete, setIsAlertVisibleDelete] = useState(false);
  const [subscriptionModalType, setSubscriptionModalType] = useState("");
  const [SubscriptionEditModal, setSubscriptionEditModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const onTypeDeleteConfirmAlert = () => {
    modalNotification({
      type: "success",
      message: "Subscription Plan Deleted Successfully",
    });
    setIsAlertVisibleDelete(false);
  };
  const showSubscriptionEditModal = () => {
    console.log("show");
    setSubscriptionModalType("edit");
    setLoopsLimitRadio(1);
    setUserLimitRadio(1);
    setAddUser(true);
    setSubscriptionEditModal(true);
  };
  const options = (row) => {
    const optionsArr = [
      {
        name: "Edit",
        icon: "icon ni ni-edit",
        action: "confirm",
        onClickHandle: () => {
          showSubscriptionEditModal(true);
          document.body.click();
        },
      },
      {
        name: "Delete",
        icon: "icon ni ni-trash",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisibleDelete(true);
          document.body.click();
        },
      },
    ];
    if (row.status === "active") {
      optionsArr.splice(0, 0, {
        name: "Deactivate",
        icon: "icon ni ni-cross-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setStatus("inactive");
          document.body.click();
        },
      });
    }
    if (row.status === "inactive") {
      optionsArr.splice(0, 0, {
        name: "Activate",
        icon: "icon ni ni-check-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setStatus("active");
          document.body.click();
        },
      });
    }
    return optionsArr;
  };
  const onConfirmAlert = () => {
    setIsAlertVisible(false);
    if (status === "active") {
      modalNotification({
        type: "success",
        message: "Subscription Plan Activated Successfully",
      });
    } else {
      modalNotification({
        type: "success",
        message: "Subscription Plan Deactivated Successfully",
      });
    }
    // return true;
  };

  const showSubscriptionAddModal = () => {
    setSubscriptionModalType("add");
    setSubscriptionEditModal(true);
  };

  const hideSubscriptionEditModal = () => {
    setSubscriptionEditModal(false);
  };
  const SubscriptionAdded = (formData) => {
    console.log(formData);
    setSubscriptionEditModal(false);
    modalNotification({
      type: "success",
      message: "Subscription Plan Added Successfully",
    });
  };
  const SubscriptionUpdated = () => {
    setSubscriptionEditModal(false);
    modalNotification({
      type: "success",
      message: "Subscription Plan Updated Successfully",
    });
  };

  const radioOnChange = (e) => {
    if (e.target.name === "loopsLimit") {
      setLoopsLimitRadio(e.target.value * 1);
    }
    if (e.target.name === "userLimit") {
      setAddUser(false);
    }
  };

  const addUserChange = (e) => {
    setAddUser(e.target.checked);
  };

  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: "DASHBOARD",
    },
    {
      path: "#",
      name: "Manage Subscription",
    },
  ];
  const planValidityData = [
    {
      id: "monthly",
      name: "Monthly",
    },
    {
      id: "yearly",
      name: "Yearly",
    },
  ];
  const planLevel = [
    {
      id: "01",
      name: "01",
    },
    {
      id: "02",
      name: "02",
    },
    {
      id: "03",
      name: "03",
    },
    {
      id: "04",
      name: "04",
    },
    {
      id: "05",
      name: "05",
    },
  ];
  const customerData = [
    {
      id: 1,
      planName: "Pro Plan",
      plandurationPeriod: "Annually",
      planPrice: "$1300",
      activeUsers: "12",
      createdOn: "02-04-2023",
      lastUpdated: "01/05/2023",
      status: "active",
    },
    {
      id: 2,
      planName: "	Enterprise Plan",
      plandurationPeriod: "Monthly",
      planPrice: "$1200",
      activeUsers: "30",
      createdOn: "10-06-2023",
      lastUpdated: "11/07/2021",
      status: "inactive",
    },
    {
      id: 3,
      planName: "Pro Plan",
      plandurationPeriod: "Annually",
      planPrice: "$1300",
      activeUsers: "40",
      createdOn: "25-02-2023",
      lastUpdated: "15/05/2023",
      status: "active",
    },
    {
      id: 4,
      planName: "	Enterprise Plan",
      plandurationPeriod: "Monthly",
      planPrice: "$1200",
      activeUsers: "50",
      createdOn: "10-06-2023",
      lastUpdated: "11/07/2021",
      status: "active",
    },
    {
      id: 5,
      planName: "	Enterprise Plan",
      plandurationPeriod: "Monthly",
      planPrice: "$1200",
      activeUsers: "30",
      createdOn: "10-06-2023",
      lastUpdated: "11/07/2021",
      status: "active",
    },
    {
      id: 6,
      planName: "Pro Plan",
      plandurationPeriod: "Annually",
      planPrice: "$1300",
      activeUsers: "12",
      createdOn: "02-04-2023",
      lastUpdated: "01/05/2023",
      status: "active",
    },
    {
      id: 7,
      planName: "	Enterprise Plan",
      plandurationPeriod: "Monthly",
      planPrice: "$1200",
      activeUsers: "30",
      createdOn: "10-06-2023",
      lastUpdated: "11/07/2021",
      status: "inactive",
    },
    {
      id: 8,
      planName: "Pro Plan",
      plandurationPeriod: "Annually",
      planPrice: "$1300",
      activeUsers: "40",
      createdOn: "25-02-2023",
      lastUpdated: "15/05/2023",
      status: "active",
    },
    {
      id: 9,
      planName: "	Enterprise Plan",
      plandurationPeriod: "Monthly",
      planPrice: "$1200",
      activeUsers: "50",
      createdOn: "10-06-2023",
      lastUpdated: "11/07/2021",
      status: "active",
    },
    {
      id: 10,
      planName: "	Enterprise Plan",
      plandurationPeriod: "Monthly",
      planPrice: "$1200",
      activeUsers: "30",
      createdOn: "10-06-2023",
      lastUpdated: "11/07/2021",
      status: "inactive",
    },
  ];

  const columns = [
    {
      dataField: "id",
      text: "S.No.",
      headerClasses: "w_70",
    },
    {
      dataField: "planName",
      text: "Plan Name",
      headerClasses: "sorting",
    },
    {
      dataField: "plandurationPeriod",
      text: "Plan Duration Period ",
      headerClasses: "sorting",
    },
    {
      dataField: "planPrice",
      text: "Plan Price",
      headerClasses: "sorting",
    },
    {
      dataField: "activeUsers",
      text: "Active Users",
      headerClasses: "sorting",
    },
    {
      dataField: "createdOn",
      text: "Created on",
      headerClasses: "sorting",
    },
    {
      dataField: "lastUpdated",
      text: "Last updated",
      headerClasses: "sorting",
    },
    {
      dataField: "status",
      text: "Plan Status",
      headerClasses: "sorting",
      formatter: statusFormatter,
    },
    {
      dataField: "action",
      text: "Action",
      headerClasses: "nk-tb-col-tools text-end",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];
  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.common.manageSubscription")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["create", "filter"]}
            btnText={t("text.common.addSubscription")}
            setVisible={setVisible}
            visible={visible}
            onHandleShow={showSubscriptionAddModal}
            popover={<ManageSubscriptionFilter />}
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage="1"
        sizePerPage="10"
        page="1"
        count="100"
        tableData={customerData}
        tableColumns={columns}
        setSizePerPage=""
      />
      <ModalComponent
        size="md"
        backdrop
        show={SubscriptionEditModal}
        onHandleCancel={hideSubscriptionEditModal}
        title={
          subscriptionModalType === "add"
            ? `${t("text.common.addSubscription")}`
            : `${t("text.common.editSubscription")}`
        }
      >
        <SubscriptionForm
          subscriptionModalType={subscriptionModalType}
          planLevel={planLevel}
          planValidityData={planValidityData}
          loopsLimitRadio={loopsLimitRadio}
          userLimitRadio={userLimitRadio}
          addUser={addUser}
          showSubscriptionAddModal={showSubscriptionAddModal}
          radioOnChange={radioOnChange}
          addUserChange={addUserChange}
          SubscriptionAdded={SubscriptionAdded}
          SubscriptionUpdated={SubscriptionUpdated}
          hideSubscriptionEditModal={hideSubscriptionEditModal}
        />
      </ModalComponent>
      <SweetAlert
        title={t("text.common.areYouSure")}
        text={t("text.common.youWantToDeleteThisSubscriptionPlan")}
        show={isAlertVisibleDelete}
        icon={t("text.common.warning")}
        showCancelButton
        confirmButtonText={t("text.common.yes")}
        cancelButtonText={t("text.common.no")}
        setIsAlertVisible={setIsAlertVisibleDelete}
        onConfirmAlert={onTypeDeleteConfirmAlert}
      />
      <SweetAlert
        title={t("text.common.areYouSure")}
        text={
          status === `${t("text.common.areYouSure")}`
            ? `${t("text.common.youWantToActivateThisSubscriptionPlan")}`
            : `${t("text.common.youWantToDeactivateThisSubscriptionPlan")}`
        }
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.common.yes")}
        cancelButtonText={t("text.common.no")}
        setIsAlertVisible={setIsAlertVisible}
        onConfirmAlert={onConfirmAlert}
      />
    </>
  );
}

export default ManageSubscription;
