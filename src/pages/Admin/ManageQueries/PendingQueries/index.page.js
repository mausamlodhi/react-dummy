import React, { useState, useEffect } from "react";
import { t } from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import {
  dateFormatter,
  decodeQueryData,
  getFullName,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../utils";
import {
  Breadcrumb,
  DataTable,
  ModalComponent,
  PageHeader,
  checkValidData,
  serialNumberFormatter,
  actionFormatter,
} from "../../../../components";
import { PendingQueriesForm } from "../../../../components/Form/Admin/ManageQueries";
import { AdminManageQueriesService } from "../../../../services";
import { newDateFormatter } from "../../../../helpers";

function PendingQueries() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [showReply, setShowReply] = useState(false);
  const [readData, setReadData] = useState();
  const [showReadMore, setShowReadMore] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState();
  const [tableLoader, setTableLoader] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [rowData, setRowData] = useState("");
  const [loading, setLoading] = useState(false);

  const replyModal = (row) => {
    setShowReply(true);
    setRowData(row);
  };
  const closeReplyModal = () => {
    setShowReply(false);
  };

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };
  const onCloseDescriptionModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const tableReset = () => {
    setTableLoader(true);
    setQueryData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getQueriesData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        status: "pending",
        search : searchName
      };
      const response = await AdminManageQueriesService?.getQueriesService(
        queryParams
      );
      if (response?.success) {
        setTableLoader(false);
        setQueryData(response?.data?.rows);
        setNoOfPage(
          response?.data?.count > 0
            ? Math.ceil(response?.data?.count / sizePerPage)
            : 1
        );
        setTotalCount(response?.data?.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  const sendReplyModal = async (value) => {
    setLoading(true);
    try {
      let bodyData = {
        reply: value?.reply,
      };
      const response = await AdminManageQueriesService.sendReplyService(
        bodyData,
        rowData?.id
      );
      if (response?.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
        getQueriesData();
        tableReset();
        setShowReply(false);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: "Reply",
        icon: "icon ni ni-mail",
        action: "confirm",
        onClickHandle: () => {
          replyModal(row);
        },
      },
    ];
    return optionsArr;
  };
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.manageQueries.pendingQueries"),
    },
  ];

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

  const columns = [
    {
      dataField: "id",
      text: t("text.manageQueries.serialNo"),
      headerClasses: "w_70",
      headerSortingClasses,
      formatter: (cell, row, index) =>
        serialNumberFormatter(page, sizePerPage, index),
    },
    {
      dataField: "firstName",
      text: t("text.manageQueries.userName"),
      headerClasses: "sorting",
      formatter: (cell, row) =>
        checkValidData(getFullName(row?.firstName, row?.lastName)),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "email",
      text: t("text.manageQueries.emailAddress"),
      headerClasses: "sorting",
      formatter: (cell, row) => checkValidData(row?.email),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "createdAt",
      text: t("text.manageQueries.date"),
      headerClasses: "sorting",
      formatter: (cell, row) => dateFormatter(row?.createdAt, newDateFormatter),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "category",
      text: t("text.manageQueries.category"),
      headerClasses: "sorting",
      formatter: (cell, row) => checkValidData(row?.category?.name),
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "description",
      text: t("text.manageQueries.description"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => readMoreTextShow(cell, showMoreText, "text-info"),
    },
    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "nk-tb-col-tools text-end",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
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
  useEffect(() => {
    if (search && JSON.stringify(param) !== "{}") {
      getQueriesData();
    }
  }, [param]);

  useEffect(() => {
    if (!search) {
      getQueriesData();
    }
  }, []);

  useEffect(() => {
    getQueriesData();
  }, []);

  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageQueries.pendingQuery")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={queryData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.manageQueries.searchByUser")}
      />
      <ModalComponent
        closeButton
        extraTitleClassName="justify-content-center"
        onHandleCancel={() => {
          setShowReply(false);
          setRowData("");
        }}
        backdrop
        show={showReply}
        title="Reply"
      >
        <PendingQueriesForm
          loading={loading}
          rowData={rowData}
          columns={columns}
          showReadMore={showReadMore}
          readData={readData}
          showReply={showReply}
          setShowReply={setShowReply}
          onCloseDescriptionModal={onCloseDescriptionModal}
          onSubmit={sendReplyModal}
          closeReplyModal={closeReplyModal}
        />
      </ModalComponent>
      <ModalComponent
        backdrop
        modalExtraClass="zoom"
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title={t("text.manageQueries.description")}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </>
  );
}

export default PendingQueries;
