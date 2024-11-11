import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  actionFormatter,
  Breadcrumb,
  checkValidData,
  DataTable,
  ListingHeader,
  ManageUserFilter,
  MetaTags,
  PageHeader,
  serialNumberFormatter,
  statusFormatter,
  SweetAlert,
  textFormatter,
} from "../../../../components";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
} from "../../../../utils";
import { newDateFormatter } from "../../../../helpers";
import { UserManagementServices } from "../../../../services/Admin";

function UserManagement() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [status, setStatus] = useState("active");
  const { t } = useTranslation();
  const location = useLocation();
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [customerData, setCustomerData] = useState([]);
  const [noOfPage, setNoOfPage] = useState();
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [userId, setUserId] = useState();
  // const [alertLoader, setAlertLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const { pathname, search } = location;
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  // const formRef = useRef(null);
  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name ?? "");
      if (data?.sortType) {
        const sortData = [
          {
            order: getSortType(data?.sortType),
            dataField: data?.sortBy,
          },
        ];
        setDefaultSort(sortData);
      } else {
        setDefaultSort({
          dataField: "",
          order: "",
        });
      }
    }
  }, [location]);

  const getUserList = async () => {
    setLoading(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
        ...filterData,
      };
      const { success, data, message } =
        await UserManagementServices.getUserService({
          queryParams,
        });
      if (success && data) {
        setCustomerData(data?.rows);
        setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1);
        setTotalCount(data?.count);
      } else {
        modalNotification({
          type: "error",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (search && JSON.stringify(param) !== "{}") {
      getUserList();
    }
  }, [param]);

  useEffect(() => {
    if (!search) {
      getUserList();
    }
  }, []);

  const tableReset = () => {
    setLoading(true);
    setCustomerData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
    tableReset();
  };

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };
  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        action: "redirect",
        path: `${adminRouteMap?.USER_DETAILS?.path}/${row?.id}`,
      },
    ];
    if (row.status === "active") {
      optionsArr.push({
        name: t("text.common.deActivate"),
        icon: "icon ni ni-cross-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setUserId(row?.id);
          setStatus("inactive");
          document.body.click();
        },
      });
    }
    if (row.status === "inactive") {
      optionsArr.push({
        name: t("text.common.activate"),
        icon: "icon ni ni-check-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setStatus("active");
          setUserId(row?.id);
          document.body.click();
        },
      });
    }
    return optionsArr;
  };

  const updateUserStatus = async () => {
    try {
      const bodyData = { status };
      const res = await UserManagementServices.UpdateUserStatusService(
        userId,
        bodyData
      );
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        tableReset();
        getUserList();
        setStatus();
        setUserId();
        setIsAlertVisible();
        // return true;
      } else {
        modalNotification({
          type: "error",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
    // setAlertLoader(false);
  };

  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.adminUserManagement.userManagement"),
    },
  ];

  const columns = [
    {
      dataField: "id",
      text: t("text.common.sno"),
      headerClasses: "w_70",
      headerSortingClasses,
      formatter: (cell, row, index) =>
        serialNumberFormatter(page, sizePerPage, index),
    },
    {
      dataField: "firstName",
      text: t("text.common.firstName"),
      headerClasses: "sorting",
      formatter: (cell, row) => checkValidData(textFormatter(row?.firstName)),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "lastName",
      text: t("text.common.lastName"),
      headerClasses: "sorting",
      formatter: (cell, row) => checkValidData(textFormatter(row?.lastName)),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "email",
      text: t("text.common.email"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => row?.email,
    },
    {
      dataField: "mobile",
      text: t("text.common.mobileNumber"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => row?.phoneNumber,
    },
    {
      dataField: "subscriberType",
      text: t("text.adminUserManagement.subscriberType"),
      headerClasses: "sorting",
      formatter: (cell, row) => checkValidData(textFormatter(row?.type)),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "lastLogin",
      text: t("text.common.lastLogin"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => dateFormatter(row?.lastLogin, newDateFormatter),
    },
    {
      dataField: "createdAt",
      text: t("text.adminUserManagement.created"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => dateFormatter(row?.createdAt, newDateFormatter),
    },
    {
      dataField: "status",
      text: t("text.common.status"),
      headerClasses: "sorting",
      formatter: statusFormatter,
    },
    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "nk-tb-col-tools text-end",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const onReset = () => {
    setFilterData({});
    tableReset();
    setVisible(false);
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };

  const handleFilterSubmit = (val) => {
    setLoading(true);
    try {
      setFilterData(val);
      tableReset();
      const newParams = { ...param };
      newParams.page = 1;
      navigateWithParam(newParams, navigate, pathname);
      setVisible(false);
      setLoading(false);
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title={t("text.adminUserManagement.userManagement")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.adminUserManagement.userManagement")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["filter"]}
            setVisible={setVisible}
            visible={visible}
            popover={
              <ManageUserFilter
                onSubmit={handleFilterSubmit}
                loading={loading}
                onReset={onReset}
                filterData={filterData}
                t={t}
              />
            }
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={customerData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        selectRow={false}
        tableLoader={loading}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.adminUserManagement.searchByUser")}
      />
      <SweetAlert
        title={t("text.common.areYouSure")}
        text={
          status === "active"
            ? t("text.adminUserManagement.youWantToActive")
            : t("text.adminUserManagement.youWantToDeActive")
        }
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.common.yes")}
        cancelButtonText={t("text.common.no")}
        setIsAlertVisible={setIsAlertVisible}
        onConfirmAlert={updateUserStatus}
      />
    </>
  );
}

export default UserManagement;
