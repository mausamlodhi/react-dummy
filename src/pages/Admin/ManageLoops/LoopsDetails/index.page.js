import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GlobalLoader from "components/UiElement/GlobalLoader";
import {
  Breadcrumb,
  DataTable,
  ModalComponent,
  PageHeader,
  TabComponent,
  capitalizeFirstLetter,
  checkValidCount,
  checkValidData,
  logoCreater,
  nameFormatter,
  serialNumberFormatter,
} from "../../../../components";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import {
  ImageElement,
  colorObj,
  dateFormatter,
  decodeQueryData,
  firstLetterCaps,
  getFullName,
  getSortType,
  logger,
  navigateWithParam,
} from "../../../../utils";
import { AdminManageLoopService } from "../../../../services/Admin";
import { DateMonthYearFormate } from "../../../../helpers";

function LoopsDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [defaultKey, setDefaultKey] = useState("");
  const [membersModal, setMembersModal] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loopData, setLoopData] = useState([]);
  const [channelMemberData, setChannelMemberData] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState();
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { id } = useParams();
  const [param, setParam] = useState({});
  const { pathname, search } = location;
  const [searchName, setSearchName] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [tabId, setTabId] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [fetchApi, setFetchApi] = useState(false);
  const [previousTabId, setPreviousTabId] = useState("");
  const hideMembersModal = () => {
    setMembersModal(false);
  };

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
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
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t("text.common.dashboard"),
    },
    {
      path: `${adminRouteMap.MANAGE_LOOPS.path}`,
      name: t("text.adminManageLoop.manageLoop"),
    },
    {
      path: "#",
      name: t("text.adminManageLoop.loopDetails"),
    },
  ];

  const tableReset = () => {
    setTableLoader(true);
    setChannelMemberData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getLoopDetails = async () => {
    setLoading(true);
    try {
      const response = await AdminManageLoopService.getSingleLoopService(id);
      if (response?.success && response?.data) {
        setLoopData(response?.data);
        setTabId(response?.data?.chatRooms[0]?.id);
        setDefaultKey(response?.data?.chatRooms[0]?.id);
        let queryParams = {};

        const res =
          response?.data?.chatRooms?.length > 0 &&
          (await AdminManageLoopService.getChannelMembersListService({
            id: response?.data?.chatRooms[0]?.id,
            queryParams,
          }));
        if (res?.success) {
          setChannelMemberData(res?.data?.rows);
          setNoOfPage(
            res?.data?.count > 0 ? Math.ceil(res?.data?.count / sizePerPage) : 1
          );
          setTotalCount(res?.data?.count);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const getChannelMemberList = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
      };
      const response =
        await AdminManageLoopService.getChannelMembersListService({
          id: tabId,
          queryParams,
        });
      if (response?.success && response?.data) {
        setChannelMemberData(response?.data?.rows);
        setNoOfPage(
          response?.data?.count > 0
            ? Math.ceil(response?.data?.count / sizePerPage)
            : 1
        );
        setTotalCount(response?.data?.count);
        setPreviousTabId(response?.data?.rows[0]?.roomId);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
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

  const columns = [
    {
      dataField: "id",
      text: t("text.common.sno"),
      headerClasses: "w_70",
      formatter: (cell, row, index) =>
        serialNumberFormatter(page, sizePerPage, index),
    },
    {
      dataField: "name",
      text: t("text.common.name"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        checkValidData(getFullName(row?.user?.firstName, row?.user?.lastName)),
    },
    {
      dataField: "createdAt",
      text: t("text.adminManageLoop.joinedOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        dateFormatter(row?.createdAt, DateMonthYearFormate),
    },
    {
      dataField: "role",
      text: t("text.common.roles"),
      headerClasses: "sorting",
      role: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        checkValidData(row?.loopRolePermission?.channelRole?.role),
    },
  ];

  const tabContent =
    !loopData?.chatRooms?.length > 0
      ? []
      : loopData?.chatRooms?.map((item) => {
          return {
            name: firstLetterCaps(item?.roomName),
            key: item?.id,
            content: (
              <>
                <DataTable
                  hasLimit
                  noOfPage={noOfPage}
                  sizePerPage={sizePerPage}
                  page={page}
                  count={totalCount}
                  isCard={false}
                  tableData={channelMemberData}
                  tableColumns={columns}
                  setSizePerPage={setSizePerView}
                  defaultSort={defaultSort}
                  tableLoader={tableLoader}
                  tableReset={tableReset}
                  getSearchValue={getSearchValue}
                  searchPlaceholder={t("text.adminManageLoop.searchByUser")}
                />
              </>
            ),
          };
        });

  useEffect(() => {
    if (search && JSON.stringify(param) !== "{}") {
      getChannelMemberList();
    }
  }, [param, tabId]);

  useEffect(() => {
    if (fetchApi && parseInt(tabId) !== parseInt(previousTabId)) {
      tableReset();
      getChannelMemberList();
    }
  }, [fetchApi, tabId, previousTabId]);

  useEffect(() => {
    getLoopDetails(id);
  }, []);

  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.adminManageLoop.manageLoop")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      {loading ? (
        <GlobalLoader />
      ) : (
        <Row className="g-2 row">
          <Col lg="4" xl="4" xxl="3">
            <div className="card h-100">
              <div className="card-inner-group">
                <div className="card-inner">
                  <div className="user-card user-card-s2">
                    <div
                      className={`user-avatar lg ${
                        loopData?.name
                          ? colorObj?.[loopData?.name?.charAt(0).toLowerCase()]
                          : ""
                      }`}
                    >
                      <span> {logoCreater(loopData?.name)}</span>
                    </div>
                    <div className="user-info">
                      <div
                        className={`badge  rounded-pill ucap ${
                          loopData?.status === "active"
                            ? "bg-success"
                            : "bg-danger"
                        } `}
                      >
                        {checkValidData(loopData?.status)}
                      </div>
                      <h5>{checkValidData(firstLetterCaps(loopData?.name))}</h5>
                      {/* <span className="sub-text">francis@test.com</span> */}
                    </div>
                  </div>
                </div>
                <div className="card-inner">
                  <h6 className="overline-title mb-2">Short Details</h6>
                  <div className="row g-3">
                    <div className="col-sm-6 col-md-4 col-lg-12">
                      <span className="sub-text">
                        {t("text.adminManageLoop.createdBy")}
                      </span>
                      <span>
                        {checkValidData(
                          nameFormatter(
                            capitalizeFirstLetter(loopData?.user?.firstName),
                            capitalizeFirstLetter(loopData?.user?.lastName)
                          )
                        )}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-12">
                      <span className="sub-text">
                        {" "}
                        {t("text.adminManageLoop.joinedOn")}
                      </span>
                      <span>
                        {checkValidData(
                          dateFormatter(
                            loopData?.createdAt,
                            DateMonthYearFormate
                          )
                        )}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-12">
                      <span className="sub-text">
                        {t("text.adminManageLoop.totalChannel")}
                      </span>
                      <span>
                        {" "}
                        {checkValidCount(loopData?.chatRooms?.length)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="8" xl="8" xxl="9">
            <div className="card h-100">
              <div className="manageLoopTab">
                {loopData?.chatRooms?.length > 0 ? (
                  <TabComponent
                    tabContent={tabContent || []}
                    activeKey={defaultKey}
                    setActiveKey={setDefaultKey}
                    onTabChange={(e) => {
                      setFetchApi(true);
                      setTabId(e);
                    }}
                  />
                ) : (
                  <span>No Channel Found</span>
                )}
              </div>
            </div>
          </Col>
        </Row>
      )}

      <ModalComponent
        size="md"
        backdrop
        show={membersModal}
        onHandleCancel={hideMembersModal}
        title="role"
        closeButton
        extraClassName="memberModal"
      >
        <div className="newUser_filter d-flex align-items-center ">
          {/* <form> */}
          <div className="searchBox w-100 mb-4">
            <div className="form-group mb-0">
              <div className="form-control-wrap">
                <label className="position-relative w-100">
                  <input
                    type="search"
                    className="form-control form-control-md w-100"
                    placeholder="Search"
                  />
                  <div className="form-icon">
                    <em className="icon ni ni-search" />
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/* </form>  */}
        </div>
        <div className="newUser">
          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile01.jpg" alt="user" />
              <span className="statusdot statusdot-available" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>Owner</span>
            </div>
          </div>

          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile02.jpg" alt="user" />
              <span className="statusdot statusdot-away" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>member</span>
            </div>
          </div>
          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile03.jpg" alt="user" />
              <span className="statusdot statusdot-busy" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>member</span>
            </div>
          </div>
          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile04.jpg" alt="user" />
              <span className="statusdot statusdot-available" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>member</span>
            </div>
          </div>
          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile05.jpg" alt="user" />
              <span className="statusdot statusdot-away" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>Owner</span>
            </div>
          </div>
          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile06.jpg" alt="user" />
              <span className="statusdot statusdot-busy" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>member</span>
            </div>
          </div>
          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile07.jpg" alt="user" />
              <span className="statusdot statusdot-available" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>Owner</span>
            </div>
          </div>
          <div className="user-card">
            <div className="user-avatar">
              <ImageElement source="profile/profile08.jpg" alt="user" />
              <span className="statusdot statusdot-away" />
            </div>
            <div className="user-info mt-1">
              <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              <span>member</span>
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

export default LoopsDetails;
