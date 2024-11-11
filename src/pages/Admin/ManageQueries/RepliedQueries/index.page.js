import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  DataTable,
  PageHeader,
  ModalComponent,
  serialNumberFormatter,
  checkValidData,
} from "../../../../components";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import {
  dateFormatter,
  decodeQueryData,
  getFullName,
  getSortType,
  logger,
  navigateWithParam,
  readMoreTextShow,
  // readMoreTextShow,
} from "../../../../utils";
import { AdminManageQueriesService } from "../../../../services";
import { newDateFormatter } from "../../../../helpers";

function RepliedQueries() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [readData, setReadData] = useState();
  const [showReadMore, setShowReadMore] = useState(false);
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
  const [repliedQueryData, setRepliedQueryData] = useState([]);

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };
  const onCloseDescriptionModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: "DASHBOARD",
    },
    {
      path: "#",
      name: t("text.manageQueries.repliedQueries"),
    },
  ];
  const tableReset = () => {
    setTableLoader(true);
    setRepliedQueryData([]);
    setNoOfPage(0);
    setTotalCount(0);
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

  const getQueriesData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        status: "replied",
        search: searchName,
      };
      const response = await AdminManageQueriesService?.getQueriesService(
        queryParams
      );
      if (response?.success) {
        setTableLoader(false);
        setRepliedQueryData(response?.data?.rows);
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
      dataField: "userName",
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
      dataField: "repliedAt",
      text: t("text.manageQueries.date"),
      headerClasses: "sorting",
      formatter: (cell, row) => dateFormatter(row?.repliedAt, newDateFormatter),
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
      dataField: "response",
      text: t("text.manageQueries.response"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        readMoreTextShow(row?.reply, showMoreText, "text-info"),
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
          <PageHeader heading="Replied Queries">
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
        tableData={repliedQueryData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        selectRow={false}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.manageQueries.searchByUser")}
      />
      <ModalComponent
        backdrop
        modalExtraClass="zoom"
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title="Read More"
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </>
  );
}

export default RepliedQueries;
