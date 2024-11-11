import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import DataTable from "components/UiElement/DataTable";
import useDebounce from "hooks/useDebounce";
import {
  decodeQueryData,
  logger,
  modalNotification,
  nameFormatter,
  textFormatter,
  userDropdownFormatter,
} from "utils";

import { AdminManageLoopService, ChatServices, LoopService } from "services";
import { SocketContext } from "context/socket.context";
import routesMap from "routeControl/userRouteMap";
import {
  CommonButton,
  ModalComponent,
  TabComponent,
  checkValidCount,
  checkValidData,
  userNameImageFormatter,
} from "../../../components";

function ManageParticipants({
  setAddParticipantsModal,
  // chatOpen,
  // setManageParticipants,
  selectedRoom,
  getLoopData,
  createdBy,
  disableChat,
  userData
}) {
  const [removeParticipant, setRemoveParticipant] = useState(false);
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [defaultActiveKey, setDefaultActiveKey] = useState(roles[0]?.id);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [memberLoad, setMemberLoad] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const location = useLocation();
  const debounce = useDebounce();
  // const [firstTimeFetch, setFirstTimeFetch] = useState(false);
  const { socket } = useContext(SocketContext);
  const [selectRoom, setSelectedRoom] = useState({});
  const defaultKey = useMemo(() => {
    return roles[0]?.id;
  });
  const navigate = useNavigate();

  useEffect(() => {
    setDefaultActiveKey(defaultKey);
  }, [defaultKey]);

  const onHandleSearch = useCallback(
    debounce((e) => {
      setSearch(e);
    }, 1400),
    []
  );

  const [param, setParam] = useState({});

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name ?? "");
    }
  }, [location]);

  const getMemberList = async (id, rolePermissionId) => {
    setMemberLoad(true);
    setMembers([]);
    try {
      let queryParams = {
        scope: "all",
        rolePermissionId,
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        search,
      };
      const res = await AdminManageLoopService.getChannelMembersListService({
        id,
        queryParams,
      });
      if (res?.success) {
        setMemberLoad(false);
        setNoOfPage(
          res?.data?.count > 0 ? Math.ceil(res?.data?.count / sizePerPage) : 1
        );
        setTotalCount(res?.data?.count);
        setMembers(res?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setMemberLoad(false);
  };

  const singleChat = async (id) => {
    try {
      let bodyData = {
        userId: id,
      };
      const response = await ChatServices.singleChatService(bodyData);
      if (response?.success) {
        localStorage.setItem("chatData", response?.data?.id);
        navigate(routesMap.CHAT.path);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getTabs = async (id) => {
    try {
      const res = await LoopService.getRolesListService(id);
      if (res?.success) {
        setRoles(res?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (selectedRoom?.loopId) getTabs(selectedRoom?.loopId);
  }, [selectedRoom]);

  useEffect(() => {
    if (defaultActiveKey && selectedRoom?.id) {
      getMemberList(selectedRoom?.id, Number(defaultActiveKey));
    }
  }, [defaultActiveKey, selectedRoom, search]);

  const userActionFormatter = (type, cell) => {
    return (
      <ul className="actionMenu list-unstyled m-0 d-flex align-items-center justify-content-end">
        {userData?.id !== cell?.userId && type === "icons" ? (
          <>
            <li>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  singleChat(cell?.userId);
                }}
              >
                <span className="icon-chat">
                  <em className="path1" />
                  <em className="path2" />
                </span>
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {type === "buttons" ? (
          <>
            <li>
              <CommonButton variant="light" extraClassName="btn-sm">
                Reject
              </CommonButton>
            </li>
            <li>
              <CommonButton
                variant="primary"
                extraClassName="btn-sm btn-accept"
              >
                Accept
              </CommonButton>
            </li>
          </>
        ) : (
          <></>
        )}
        <li>
          <Dropdown className="ellipseDrop position-static d-inline-block">
            <Dropdown.Toggle
              as="a"
              className="d-inline-flex align-items-center"
              id="dropdown-basic"
            >
              <span className="icon-ellipse" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              {cell?.status !== "left" && (
                <Link
                  className="dropdown-item"
                  onClick={document.body.click()}
                  to="#"
                >
                  <span className="icon-video">
                    <em className="path1" />
                    <em className="path2" />
                  </span>
                  Video Call
                </Link>
              )}
              {cell?.status !== "left" && (
                <Link
                  className="dropdown-item"
                  onClick={document.body.click()}
                  to="#"
                >
                  <span className="icon-phone" />
                  Call
                </Link>
              )}
              <Link
                className="dropdown-item"
                onClick={document.body.click()}
                to="#"
              >
                <span className="icon-copy">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                Copy Email
              </Link>
              {!disableChat?.includes(userData?.id)&&cell?.status !== "left" && createdBy !== cell?.userId && (
                <Link
                  className="dropdown-item"
                  onClick={() => {
                    setRemoveParticipant(true);
                    setSelectedRoom(cell);
                  }}
                  to="#"
                >
                  <span className="icon-trash">
                    <em className="path1" />
                    <em className="path2" />
                  </span>
                  Remove
                </Link>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    );
  };

  const handleSubmitMessage = async (chat) => {
    try {
      let data = {
        userId: chat?.userId,
        chatRoomId: chat?.roomId,
      };
      if (userData?.id !== chat?.userId) {
        data.removeBy = userData?.id;
      }

      await socket?.emit?.("left_chat_room", data, (ack) => {
        if (ack?.success === true) {
          setRemoveParticipant(false);
          getMemberList(chat?.roomId, Number(defaultActiveKey));
          getLoopData();
        }
      });
    } catch (error) {
      logger(error);
    }
  };

  const onHandleClick = async (val, id) => {
    try {
      let bodyData = {
        rolePermissionId: val,
      };
      const res = await LoopService.updateChannelParticipants(
        selectedRoom?.id,
        id,
        bodyData
      );
      if (res?.success) {
        modalNotification({
          type: "success",
          message: res?.message,
        });
        getTabs(selectedRoom?.loopId);
        getMemberList(selectedRoom?.id, Number(defaultActiveKey));
      }
    } catch (error) {
      logger(error);
    }
  };

  const tableReset = () => {
    setMemberLoad(true);
    setMembers([]);
  };

  const ownerscolumns = () => {
    let arr = [
      {
        dataField: "name",
        text: "Name",
        headerClasses: "sorting",
        formatter: (cell, row) => {
          let name = nameFormatter(row?.user?.firstName, row?.user?.lastName);
          return userNameImageFormatter(
            name,
            row?.user.profileImageUrl,
            "",
            row?.status
          );
        },
      },
      {
        dataField: "emailID",
        text: "Email ID",
        headerClasses: "sorting",
        formatter: (cell, row) => row?.user?.email,
      },
      {
        dataField: "status",
        text: "Status",
        headerClasses: "sorting",
        formatter: (cell) => {
          return cell === "invite" || cell === "left" ? (
            <span className="invited">
              {cell === "invite" ? "Invited" : textFormatter(cell)}
            </span>
          ) : (
            <>{cell && textFormatter(cell).concat("ed")}</>
          );
        },
      },
      {
        dataField: "channel",
        text: "Channel",
        headerClasses: "sorting",
        formatter: (cell, row) => {
          return userDropdownFormatter(
            row?.loopRolePermission?.channelCreate,
            roles,
            onHandleClick
          );
        },
      },
      {
        dataField: "role",
        text: "Role",
        headerClasses: "sorting",
        formatter: (cell, row) => {
          return (
            <>
              {disableChat?.includes(userData?.id)|| row?.status === "left" || row?.userId === createdBy 
                ? row?.loopRolePermission?.channelRole?.role
                : userDropdownFormatter(
                    row?.loopRolePermission?.channelRole?.role,
                    roles,
                    (val) => onHandleClick(val, row?.id),
                    <em className="icon icon-arrow-down ms-1 ms-md-2" />
                  )}
            </>
          );
        },
      },
      {
        dataField: "action",
        text: "Action",
        headerClasses: "text-end",
        formatter: (cell, row) => userActionFormatter("icons", row),
      },
    ];
    return arr;
  };

  const tabContents = useMemo(() => {
    let arr = [];
    if (roles?.length > 0)
      roles?.forEach((item) => {
        let obj = {
          name: item?.channelRole?.role,
          key: item?.id,
          content: (
            <div className="userDataTable">
              <DataTable
                isCard={false}
                header={false}
                pagination={false}
                noOfPage={noOfPage}
                sizePerPage={sizePerPage}
                page={page}
                count={totalCount}
                hasLimit
                userTable
                setSizePerPage={setSizePerView}
                selectRow={false}
                tableReset={tableReset}
                tableData={members}
                tableColumns={ownerscolumns("id")}
                param={param}
                tableLoader={memberLoad}
              />
            </div>
          ),
        };
        arr.push(obj);
      });
    return arr;
  }, [roles, members]);

  return (
    <>
      <div className="chatRight">
        {/* chatHead */}
        <div className="chatHead">
          <div className="userBox d-flex align-items-center justify-content-between w-100 p-0">
            <div className="d-flex align-items-center">
              <Link
                className="link-primary me-2 d-block d-lg-none"
                // onClick={() => chatClose(false)}
              >
                <em className="icon icon-back">
                  <em className="path1" />
                  <em className="path2" />
                </em>
              </Link>
              <div className="userAvatar userAvatar-md danger">
                <span>WO</span>
              </div>
              <div className="userBox_content">
                <h5>{checkValidData(selectedRoom?.roomName)}</h5>
                <span>
                  {checkValidCount(selectedRoom?.chatRoomMembers?.length)}{" "}
                  Members
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="chatBox pt-0">
          <div className="pageHeader">
            <div className="pageHeader_head d-flex flex-wrap flex-xl-nowrap align-items-center">
              <h3 className="pageHeader_head_title pageHeader_head_title-sm font-sb m-0 flex-shrink-0">
                {t("text.participants.title")}
              </h3>
              <div className="d-flex align-items-center ms-auto flex justify-content-between justify-content-xl-end w-100 mt-2 mt-md-3 mt-xl-0">
                <div className="searchBox">
                  <div className="form-group mb-0">
                    <div className="form-control-wrap">
                      <div className="form-icon">
                        <em className="icon-search" />
                      </div>
                      <input
                        className="form-control bg-white"
                        placeholder="Search for member"
                        type="text"
                        onChange={(e) => {
                          onHandleSearch(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {!disableChat?.includes(userData?.id) && <CommonButton
                  variant="secondary"
                  extraClassName="btn-md flex-shrink-0"
                  onClick={() => setAddParticipantsModal(true)}
                >
                  <em className="icon-fill-add-user icon-left">
                    <em className="path1" /> <em className="path2" />
                  </em>{" "}
                  <span>{t("text.participants.invite")}</span>
                </CommonButton>}
              </div>
            </div>
            <TabComponent
              tabContent={tabContents}
              extraClass="ownerHeader_tabs commonTabs"
              tabsFor="table"
              activeKey={defaultActiveKey}
              setActiveKey={(e) => {
                if (defaultActiveKey !== e) {
                  tableReset();
                }
                setDefaultActiveKey(e);
              }}
            />{" "}
          </div>
        </div>
      </div>

      <ModalComponent
        backdrop
        show={removeParticipant}
        onHandleCancel={() => setRemoveParticipant(false)}
        size="md"
        title="Are you sure?"
        extraClassName="removeModal"
      >
        <>
          <p className="mb-0">
            This participant will be remove from this channel
          </p>
          <div className="text-end modalFooter">
            <CommonButton
              onClick={() => setRemoveParticipant(false)}
              variant="light"
            >
              No
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => handleSubmitMessage(selectRoom)}
              className="ms-2 ms-md-3"
            >
              Yes
            </CommonButton>
          </div>
        </>
      </ModalComponent>
    </>
  );
}

export default ManageParticipants;
