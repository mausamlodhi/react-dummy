import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  actionFormatter,
  Breadcrumb,
  DataTable,
  ListingHeader,
  ModalComponent,
  PageHeader,
  SweetAlert,
  // AddEditFaqForm,
  serialNumberFormatter,
} from "../../../../components";
import {
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
} from "../../../../utils";
import { AdminManageCms } from "../../../../services/Admin/ManageCms/index.service";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import AddEditFAQs from "./AddEditFAQs/index.page";

function FAQS() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [faqViewModal, setFaqViewModal] = useState(false);
  const [faqEditModal, setFaqEditModal] = useState(false);
  const [faqModal, setFaqModal] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [rowData, setRowData] = useState();
  // const [addEditFaqLoading, setAddEditFaqLoading] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [noOfPage, setNoOfPage] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [id, setId] = useState(null);
  const { t } = useTranslation();
  const [param, setParam] = useState({});
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [searchName, setSearchName] = useState("");
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.adminCms.pageTitle"),
    },
  ];
  const tableReset = () => {
    setTableLoader(true);
    setFaqList([]);
    setNoOfPage(0);
    setTotalCount(0);
  };
  const showFaqViewModal = (faq) => {
    setSelectedFaq(faq);
    setFaqViewModal(true);
  };
  const hideFaqViewModal = () => {
    setFaqViewModal(false);
  };
  const showFaqAddModal = () => {
    setFaqModal("add");
    setFaqEditModal(true);
    setRowData("");
  };
  const showFaqEditModal = (row) => {
    setFaqModal("edit");
    setFaqEditModal(true);
    setRowData(row);
  };
  const hideFaqEditModal = () => {
    setFaqEditModal(false);
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

  const dataDeleteAlert = (ids) => {
    setIsAlertVisible(true);
    setId(ids);
  };

  const getFaqList = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
      };
      const res = await AdminManageCms.getFaq(queryParams);
      const { data } = res;
      if (res?.success) {
        setFaqList(data?.rows);
        setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1);
        setTotalCount(data?.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  const onConfirmAlert = async () => {
    try {
      const res = await AdminManageCms.deletefaq(id);
      if (res?.success) {
        modalNotification({
          type: "success",
          message: "FAQs Deleted Successfully",
        });
        getFaqList();
        setIsAlertVisible(false);
      } else {
        modalNotification({
          type: "error",
          message: res.message,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  const getSearchValue = (val) => {
    setSearchName(val);
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        action: "confirm",
        onClickHandle: () => showFaqViewModal(row),
      },
      {
        name: t("text.common.edit"),
        icon: "icon ni ni-edit",
        action: "confirm",
        onClickHandle: () => showFaqEditModal(row),
      },
      {
        name: t("text.common.delete"),
        icon: "icon ni ni-trash",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          dataDeleteAlert(row.id);
        },
      },
    ];

    return optionsArr;
  };

  const columns = [
    {
      dataField: "id",
      text: "S.No.",
      headerClasses: "w_70",
      formatter: (cell, row, index) =>
        serialNumberFormatter(page, sizePerPage, index),
    },
    {
      dataField: "question",
      text: t("text.adminCms.question"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "nk-tb-col-tools text-end",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  useEffect(() => {
    if (search && JSON.stringify(param) !== "{}") {
      getFaqList();
    }
  }, [param]);

  useEffect(() => {
    if (!search) {
      getFaqList();
    }
  }, []);
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
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
    }
  }, [location]);

  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.adminCms.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["create"]}
            btnText={t("text.adminCms.addTitle")}
            onHandleShow={showFaqAddModal}
          />
        </div>
      </div>
      <DataTable
        hasLimit
        sizePerPage={sizePerPage}
        page={page}
        tableData={faqList}
        tableColumns={columns}
        setSizePerPage={setSizePerPage}
        noOfPage={noOfPage}
        count={totalCount}
        param={param}
        defaultSort={defaultSort}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.adminCms.question")}
      />
      <ModalComponent
        backdrop
        show={faqViewModal}
        onHandleCancel={hideFaqViewModal}
        title={t("text.adminCms.faqsDetails")}
      >
        <div className="faqView">
          <h6 className="title mb-3">{selectedFaq && selectedFaq.question}</h6>
          <p>{selectedFaq && selectedFaq.answer}</p>
        </div>
      </ModalComponent>
      <ModalComponent
        backdrop
        show={faqEditModal}
        onHandleCancel={hideFaqEditModal}
        title={
          faqModal === "add"
            ? t("text.adminCms.addTitle")
            : t("text.adminCms.editTitle")
        }
      >
        <AddEditFAQs
          onHandleCancel={hideFaqEditModal}
          rowData={rowData}
          setTableLoader={setTableLoader}
          getFAQsData={getFaqList}
          tableReset={tableReset}
        />
      </ModalComponent>
      <SweetAlert
        title={t("text.common.areYouSure")}
        text={t("text.adminCms.deleteDocumentText")}
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

export default FAQS;
