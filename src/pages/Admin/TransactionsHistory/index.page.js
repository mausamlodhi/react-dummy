import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  DataTable,
  ListingHeader,
  TransactionsHistoryFilter,
  PageHeader,
  SweetAlert,
  statusFormatter,
  serialNumberFormatter,
  checkValidData,
  textFormatter,
  checkValidPrice,
} from "../../../components";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import {
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
} from "../../../utils";
// import { newDateFormatter } from "../../../helpers";

function TransactionsHistory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAlertVisibleDelete, setIsAlertVisibleDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [param, setParam] = useState({});
  const { pathname, search } = location;
  const [page, setPage] = useState(1);
  // const [searchName, setSearchName] = useState("");
  // const [CustomerData, setCustomerData] = useState([]);
  const [sizePerPage, setSizePerView] = useState(10);
  const [loading, setLoading] = useState(false);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const onTypeDeleteConfirmAlert = () => {
    modalNotification({
      type: "success",
      message: "User Deleted Successfully",
    });
    setIsAlertVisibleDelete(false);
  };
  const tableReset = () => {
    setLoading(true);
    // setCustomerData([]);
    // setNoOfPage(0);
    // setTotalCount(0);
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
  // const getSearchValue = (val) => {
  //   setSearchName(val);
  //   if (val) {
  //     tableReset();
  //   }
  // };
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: "DASHBOARD",
    },
    {
      path: "#",
      name: "TRANSACTIONS HISTORY",
    },
  ];
  const customerData = [
    {
      id: 1,
      fullName: "Francis Mitcham",
      date: "25-04-2023",
      subscriptionPlan: "Free Plan",
      subscriptionAmount: "1200",
      status: "failedTransactions",
    },
    {
      id: 2,
      fullName: "Daniella Hand",
      date: "15-04-2023",
      subscriptionPlan: "Enterprise Plan",
      subscriptionAmount: "560",
      status: "successTransactions",
    },
    {
      id: 3,
      fullName: "Hudson Kohler",
      date: "15-05-2023",
      subscriptionPlan: "Enterprise Plan",
      subscriptionAmount: "1200",
      status: "failedTransactions",
    },
    {
      id: 4,
      fullName: "Daniella Hand",
      date: "01-01-2023",
      subscriptionPlan: "Pro Plan",
      subscriptionAmount: "450",
      status: "successTransactions",
    },
    {
      id: 5,
      fullName: "Hudson Kohler",
      date: "15-05-2023",
      subscriptionPlan: "Enterprise Plan",
      subscriptionAmount: "1200",
      status: "failedTransactions",
    },
    {
      id: 6,
      fullName: "Daniella Hand",
      date: "01-01-2023",
      subscriptionPlan: "Free Plan",
      subscriptionAmount: "450",
      status: "successTransactions",
    },
    {
      id: 7,
      fullName: "Francis Mitcham",
      date: "25-04-2023",
      subscriptionPlan: "Pro Plan",
      subscriptionAmount: "1200",
      status: "failedTransactions",
    },
    {
      id: 8,
      fullName: "Daniella Hand",
      date: "15-04-2023",
      subscriptionPlan: "Enterprise Plan",
      subscriptionAmount: "560",
      status: "successTransactions",
    },
    {
      id: 9,
      fullName: "Hudson Kohler",
      date: "15-05-2023",
      subscriptionPlan: "Enterprise Plan",
      subscriptionAmount: "1200",
      status: "failedTransactions",
    },
    {
      id: 10,
      fullName: "Daniella Hand",
      date: "01-01-2023",
      subscriptionPlan: "Pro Plan",
      subscriptionAmount: "450",
      status: "successTransactions",
    },
    {
      id: 11,
      fullName: "Hudson Kohler",
      date: "15-05-2023",
      subscriptionPlan: "Enterprise Plan",
      subscriptionAmount: "1200",
      status: "failedTransactions",
    },
    {
      id: 12,
      fullName: "Daniella Hand",
      date: "01-01-2023",
      subscriptionPlan: "Pro Plan",
      subscriptionAmount: "450",
      status: "successTransactions",
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
      dataField: "fullName",
      text: t("text.common.fullName"),
      headerClasses: "sorting",
      formatter: (cell, row) => checkValidData(textFormatter(row?.fullName)),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "date",
      text: t("text.common.date"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      // formatter: (cell, row) => dateFormatter(row?.createdAt, newDateFormatter),
    },
    {
      dataField: "subscriptionPlan",
      text: t("text.common.subscriptionPlan"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "subscriptionAmount",
      text: t("text.common.subscriptionAmount"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => checkValidPrice(cell),
    },
    {
      dataField: "status",
      text: t("text.common.status"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },

      formatter: statusFormatter,
    },
  ];
  const onReset = () => {
    setFilterData({});
    // tableReset();
    setVisible(false);
    // const newParams = { ...param };
    // newParams.page = 1;
    // navigateWithParam(newParams, navigate, pathname);
  };

  const handleFilterSubmit = (val) => {
    setLoading(true);
    try {
      console.log(val);
      setFilterData(val);
      // const newParams = { ...param };
      console.log(filterData);
      setVisible(false);
      setLoading(false);
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
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
  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader
            heading={t("text.adminUserManagement.transactionDetails")}
          >
            {/* <PageHeader heading="Transactions History"> */}
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["filter"]}
            setVisible={setVisible}
            visible={visible}
            popover={
              <TransactionsHistoryFilter
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
        noOfPage="1"
        // sizePerPage="10"
        sizePerPage={sizePerPage}
        page="1"
        count="100"
        param={param}
        // page={page}
        // count={totalCount}
        tableData={customerData}
        tableColumns={columns}
        tableReset={tableReset}
        setSizePerPage={setSizePerView}
        // setSizePerPage=""
        // getSearchValue={getSearchValue}
        defaultSort={defaultSort}
        tableLoader={loading}
        searchPlaceholder={t("text.adminUserManagement.searchByUser")}
      />
      <SweetAlert
        title="Are you sure"
        text="you want to delete this user?"
        show={isAlertVisibleDelete}
        icon="warning"
        showCancelButton
        confirmButtonText="Yes"
        cancelButtonText="No"
        setIsAlertVisible={setIsAlertVisibleDelete}
        onConfirmAlert={onTypeDeleteConfirmAlert}
      />
    </>
  );
}
export default TransactionsHistory;
