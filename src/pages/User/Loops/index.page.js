import React, {
  useState,
  useEffect,
  useContext,
  memo,
  useCallback,
} from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "context/socket.context";
import { selectUserData } from "redux/AuthSlice/index.slice";
import useDebounce from "hooks/useDebounce";
import {
  AudioCall,
  CommonButton,
  ModalComponent,
  textFormatter,
  checkValidData,
  logoCreater,
  userNameImageFormatter,
  userDropdownFormatter,
} from "components";
import userRoutesMap from "routeControl/userRouteMap";
import {
  checkValidCount,
  colorObj,
  getRoomMembersLength,
  getUniqueListByKey,
  logger,
  modalNotification,
  removeSessionStorage,
  setSessionStorage,
} from "utils";
import {
  ChatServices,
  CommonService,
  LoopRequestService,
  LoopService,
} from "services";
import { handleOnlineUsers } from "redux/ChatSlice/index.slice";
import LoopsSidebar from "./LoopsSidebar/index";
import CreateLoop from "./StepForm/index.page";
import LoopRightSidebar from "./LoopRightSidebar";
// import plugins if you need
import LoopsRole from "./LoopsRole";
import LoopParticipantList from "./ParticipantList";

import { DeleteChannelModal, DeleteLoopModal, PinChannel } from "./LoopModals";
import LoopsChatBox from "./LoopsChatBox";
import ChatBlank from "../ChatBlank/index.page";

import ManageParticipants from "../ManageParticipants/index.page";
import StepOne from "./StepForm/StepOne/index.page";
import LeaveChannelModal from "./LoopModals/LeaveChannel";

function Loops() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { socket, socketState, socketStateHandler } = useContext(SocketContext);
  const { handleUpdateChannelDetails, handleJoinNewMember } =
    socketStateHandler;
  const [chatInfoOpen, setChatInfoOpen] = useState(false);
  const [sidebarOpenKey, setSidebarOpenKey] = useState("");
  const [loopInfoSidebar, setLoopInfoSidebar] = useState(false);
  const [userRoleBlock, setUserRoleBlock] = useState(false);
  const [audioCall, setAudioCall] = useState(false);
  const [participantListBlock, setParticipantListBlock] = useState(false);
  const [, setPinMessageModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoopsModal, setDeleteLoopsModal] = useState(false);
  const [deleteChannelModal, setDeleteChannelModal] = useState(false);
  const [leaveLoopModal, setLeaveLoopModal] = useState(false);
  const [leaveChannelModal, setLeaveChannelModal] = useState(false);
  const [pinChannelModal, setPinChannelModal] = useState(false);
  const [chatDetails, setChatDetails] = useState(false);
  const [loopRequest, setLoopRequest] = useState(false);
  const [addParticipants, setAddParticipantsModal] = useState(false);
  const [channelModal, setCreateChannelModal] = useState(false);
  const [copyMassageAlert, setCopymassageAlert] = useState(false);
  const [counter, setCounter] = useState(0);
  const [removeModal, setRemoveModal] = useState(false);
  const [editLoop, setEditLoop] = useState(false);
  const [loopData, setLoopData] = useState([]);
  const [loopLoading, setLoopLoading] = useState(false);
  const [loopId, setLoopId] = useState({});
  const [loopIdData, setLoopIdData] = useState({});
  const [loopsLoading, setLoopsLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectLoopRoom, setSelectLoopRoom] = useState(null);
  const [channelLoopId, setChannelLoopId] = useState();
  const [channel, setChannel] = useState({});
  const navigate = useNavigate();
  const [pinChannelData, setPinChannelData] = useState([]);
  const [newChannelDetails, setNewChannelDetails] = useState(null);
  const [loopRequestData, setLoopRequestData] = useState([]);
  const [state, setState] = useState([]);
  const [joinLoading, setJoinLoading] = useState(
    Array(loopRequestData?.length).fill(false),
  );
  const [nexts, setNext] = useState(false);
  const [manageParticipants, setManageParticipants] = useState(false);
  const [channelTypeForm, setChannelFormType] = useState("");
  const [channelInfoLoading, setChannelInfoLoading] = useState(false);
  const userData = useSelector(selectUserData);
  const [stateListLoading, setStateListLoading] = useState(false);
  const [disableChat, setDisableChat] = useState([]);
  const [createdBy, setCreatedBy] = useState("");
  const debounce = useDebounce();
  useEffect(() => {
    if (selectLoopRoom?.chatRoomMembers?.length > 0) {
      let arr = [];
      selectLoopRoom?.chatRoomMembers?.map((item) => {
        return item?.status === "left" && arr.push(item?.userId);
      });
      setDisableChat(arr);
    }
  }, [selectLoopRoom]);

  const {
    newParticipantRequest,
    joinNewMember,
    selectedChannel,
    viewInChatGlobal,
  } = socketState;

  const handleGetCurrentRoomDetails = (loopDetails) => {
    let tempLoopData = loopDetails || loopData;

    const chatRooms = tempLoopData
      ?.map((rowItem) => rowItem?.chatRooms)
      ?.flat();
    const viewChat = chatRooms?.find(
      (chatRoomItem) => chatRoomItem?.id === viewInChatGlobal?.message?.roomId,
    );

    return viewChat;
  };

  const getLoopData = async (searchData, { isNewMember = false } = {}) => {
    setLoopLoading(true);
    try {
      let queryParams = { search: searchData, scope: "all" };
      const res = await LoopService.getLoopService(queryParams);
      if (res?.success) {
        if (viewInChatGlobal && res?.data?.rows?.length > 0) {
          const viewChat = handleGetCurrentRoomDetails(res.data.rows);
          if (viewChat) {
            handleUpdateChannelDetails(viewChat);
          }
        }

        if (res?.data?.rows?.length > 0) {
          dispatch(
            handleOnlineUsers(
              getUniqueListByKey(
                res?.data?.rows
                  ?.map((item) =>
                    item?.chatRooms
                      ?.map((roomItem) => roomItem?.chatRoomMembers)
                      ?.flat?.(),
                  )
                  ?.flat?.(),
                "userId",
              ),
            ),
          );
        }

        setLoopData(res?.data?.rows);
        if (isNewMember && selectedChannel) {
          const updateChannel = res?.data?.rows
            ?.filter((rowItem) => rowItem?.id === selectedChannel?.loopId)
            ?.map?.((loopItem) =>
              loopItem?.chatRooms?.find?.(
                (chatRoomItem) => chatRoomItem?.id === selectedChannel?.id,
              ),
            );
          if (updateChannel?.length)
            handleUpdateChannelDetails(updateChannel?.[0]);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoopLoading(false);
  };

  const handleJoinChannelMember = async () => {
    try {
      const response = await LoopService.getChannelMemberListsService(
        joinNewMember?.chatRoomId,
      );
      if (response?.success && response?.data?.rows?.length > 0) {
        if (
          selectedChannel &&
          joinNewMember?.chatRoomId === selectedChannel?.id
        ) {
          handleUpdateChannelDetails({
            ...selectedChannel,
            chatRoomMembers: response?.data?.rows,
          });
        }

        setLoopData((prev) =>
          prev.map?.((loopDItem) => ({
            ...loopDItem,
            chatRooms: loopDItem?.chatRooms.map((chatRoomItem) =>
              chatRoomItem?.id === joinNewMember?.chatRoomId
                ? { ...chatRoomItem, chatRoomMembers: response?.data?.rows }
                : chatRoomItem,
            ),
          })),
        );

        handleJoinNewMember();
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    return () => {
      setSessionStorage("newData", selectLoopRoom);
    };
  }, []);

  useEffect(() => {
    if (joinNewMember) {
      handleJoinChannelMember();
    }
  }, [joinNewMember]);

  const onHandleSearch = useCallback(
    debounce((e) => {
      getLoopData(e);
    }, 1400),
    [],
  );

  const getPinChannels = async () => {
    try {
      let queryParams = { scope: "all", type: "channel" };
      const res = await LoopService.getPinChannelService(queryParams);
      if (res?.success) {
        setPinChannelData(res?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getPinChannels();
  }, []);

  const onHandleDelete = async () => {
    try {
      const res = await LoopService.deleteChannelService(
        channel?.loopId || channel?.chatRoom?.loop?.id,
        channel?.channelId ? channel?.channelId : channel?.id,
      );
      if (res?.success) {
        modalNotification({
          type: "success",
          message: res?.message,
        });
        getLoopData();
        setChannel();
        setDeleteChannelModal(false);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getCountryList = async () => {
    try {
      const res = await CommonService.countryService();
      const { success, data } = res;
      if (success) {
        setCountryList(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getStateList = async (value) => {
    setStateListLoading(true);
    try {
      const res = await CommonService.stateService(value);
      const { success, data } = res;
      if (success) {
        setStateList(data);
      }
    } catch (error) {
      logger(error);
    }
    setStateListLoading(false);
  };

  useEffect(() => {
    getCountryList();
  }, []);

  const hideEditLoop = () => {
    setEditLoop(false);
    setLoopId();
  };

  const hideCreateChannelModal = () => {
    setCreateChannelModal(false);
    setChannelLoopId();
    setChannelFormType("");
  };

  const hideaddParticipantsModal = () => {
    setAddParticipantsModal(false);
  };

  const hidePinChannelModal = () => {
    setPinChannelModal(false);
    setChannel();
  };
  const hidePinModal = () => {
    setPinModal(false);
  };
  const hideDeleteModal = () => {
    setDeleteModal(false);
  };
  const hideDeleteLoopsModal = () => {
    setDeleteLoopsModal(false);
  };
  const hideDeleteChannelModal = () => {
    setDeleteChannelModal(false);
  };
  const hideLeaveChannelModal = () => {
    setLeaveChannelModal(false);
  };
  const hideLeaveLoopModal = () => {
    setLeaveLoopModal(false);
  };
  const [unPinModal, setUnPinModal] = useState(false);
  const hideUnPinModal = () => {
    setUnPinModal(false);
  };
  const [updatePinModal, setUpdatePinModal] = useState(false);
  const hideUpdatePinModal = () => {
    setUpdatePinModal(false);
  };
  const [filterVisible, setFilterVisible] = useState(false);
  const [loopStepModal, setLoopStepModal] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (loopStepModal === false) {
      removeSessionStorage("step2Data");
      removeSessionStorage("step1Data");
    }
  }, [loopStepModal]);

  const hideLoopStepModal = () => {
    setLoopStepModal(false);
    removeSessionStorage("step1Data");

    setTimeout(() => {
      setCurrent(0);
    }, 500);
  };
  const chatOpen = () => {
    if (window.innerWidth < 991) {
      if (chatDetails === true) {
        setChatDetails(false);
      } else {
        setChatDetails(true);
      }
    }
  };

  const chatClose = () => {
    setChatDetails(false);
  };

  useEffect(() => {
    if (loopStepModal) {
      setLoopId({});
    }
  }, [loopStepModal]);

  useEffect(() => {
    if (loopStepModal === false) {
      removeSessionStorage("step1Data");
      removeSessionStorage("step2Data");
      setLoopId([]);
    }
  }, [loopStepModal]);

  if (copyMassageAlert) {
    let interval = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
    if (counter === 3) {
      setCopymassageAlert(false);
      setCounter(counter + 0);
      return () => clearTimeout(interval);
    }
  }
  if (counter === 4) {
    setCounter(0);
  }

  useEffect(() => {
    if (loopData?.length > 0) {
      navigate(userRoutesMap.LOOPS.path);
    } else {
      navigate(userRoutesMap.LOOPS.path);
    }
  }, [loopData]);

  const loopDatas = async (id) => {
    setLoopsLoading(true);
    try {
      const res = await LoopService.getLoopInformationService(id);
      const { success, data } = res;
      if (success) {
        setLoopIdData(data);
        setSessionStorage("step2Data", data);
      }
    } catch (error) {
      logger(error);
    }
    setLoopsLoading(false);
  };

  const onEditLoop = (loopItem) => {
    setEditLoop(true);
    setLoopId(loopItem);
    loopDatas(loopItem?.id);
    getLoopData();
  };

  const getLoopRequest = async () => {
    try {
      let queryParams = {};
      const response = await LoopRequestService.getLoopRequest(queryParams);
      if (response?.success) {
        setLoopRequestData(response?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
  };

  const handleJoinChannelRequest = (roomId) => {
    socket?.emit?.("join_single_room", roomId);
  };

  const joinRequest = async (id, index) => {
    const updatedLoadingStates = [...joinLoading];
    updatedLoadingStates[index] = true;
    setJoinLoading(updatedLoadingStates);
    try {
      const response = await LoopRequestService.joinLoopRequest(id);
      if (response?.success) {
        socket?.emit?.("join_single_room", response?.data?.roomId);
        modalNotification({
          type: "success",
          message: response?.message,
        });
        handleJoinChannelRequest(id);
        setState([...state, id]);
      }
    } catch (error) {
      logger(error);
    }
    updatedLoadingStates[index] = false;
    setJoinLoading(updatedLoadingStates);
  };

  const singleChat = async (id) => {
    try {
      let bodyData = {
        userId: id,
      };
      const response = await ChatServices.singleChatService(bodyData);
      if (response?.success) {
        localStorage.setItem("chatData", response?.data?.id);
        navigate(userRoutesMap.CHAT.path);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getChannelInformation = async (id, channelId) => {
    setChannelInfoLoading(true);
    try {
      const response = await LoopService?.getPinChannelByIdService(
        id,
        channelId,
      );
      if (response?.success) {
        let updateSelectedChannelData = {
          ...socketState?.selectedChannel,
          roomName: response?.data?.roomName,
          description: response?.data?.description,
        };
        handleUpdateChannelDetails(updateSelectedChannelData);
      }
    } catch (error) {
      logger(error);
    }
    setChannelInfoLoading(false);
  };

  const hideLoopRequest = () => {
    getLoopRequest();
    setLoopRequest(false);
    getLoopData();
  };

  useEffect(() => {
    if (newParticipantRequest) {
      getLoopRequest();
    }
  }, [newParticipantRequest]);

  useEffect(() => {
    if (loopId?.id) {
      loopDatas(loopId?.id);
    }
  }, [loopId]);

  useEffect(() => {
    if (!selectedChannel && loopData?.length > 0) {
      const viewChat = handleGetCurrentRoomDetails();
      if (viewChat) {
        handleUpdateChannelDetails(viewChat);
      }
    }
  }, [viewInChatGlobal]);

  // const userStatusFormatter = (cell) => {
  //   return cell === "Invited" ? <span className="invited">{cell}</span> : cell;
  // };

  const userActionFormatter = (type, row) => {
    return (
      <ul className="actionMenu list-unstyled m-0 d-flex align-items-center justify-content-end">
        {type === "icons" ? (
          <>
            {/* <li>
              <Link to="#"><span className="icon-video"><em className="path1"/><em className="path2"/></span></Link>
            </li>
            <li>
              <Link to="#"><span className="icon-phone"/></Link>
            </li> */}
            <li>
              {userData?.id !== row?.userId && (
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    singleChat(row?.userId);
                  }}
                >
                  <span className="icon-chat">
                    <em className="path1" />
                    <em className="path2" />
                  </span>
                </Link>
              )}
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
          <Dropdown className="ellipseDrop d-inline-block">
            <Dropdown.Toggle
              as="a"
              className="d-inline-flex align-items-center"
              id="dropdown-basic"
            >
              <span className="icon-ellipse" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
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
              <Link
                className="dropdown-item"
                onClick={document.body.click()}
                to="#"
              >
                <span className="icon-phone" />
                Call
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    );
  };
  const EmployeeData = [
    {
      name: "Melissa Sanders",
      onlineStatus: "away",
      profileImg:
        "https://loopity.codiantdev.com/assets/images/frontend/profile/profile01.jpg",
      emailID: "melissasanders@gmail.com",
      phoneNumber: "-",
      channel: "02",
      channelName: [
        {
          name: "Search and Rescue",
          path: "#",
        },
        {
          name: "Recovery",
          path: "#",
        },
      ],
      roles: "Guset",
      rolesName: [
        {
          name: "Guest",
          path: "#",
        },
        {
          name: "Employee",
          path: "#",
        },
        {
          name: "Project Manager",
          path: "#",
        },
        {
          name: "Vendor",
          path: "#",
        },
      ],
    },
    {
      name: "Brian Beaulieu",
      onlineStatus: "available",
      profileImg:
        "https://loopity.codiantdev.com/assets/images/frontend/profile/profile02.jpg",
      emailID: "brianbeaulieu@gmail.com",
      phoneNumber: "-",
      channel: "01",
      channelName: [
        {
          name: "Search and Rescue",
          path: "#",
        },
      ],
      roles: "Guset",
      rolesName: [
        {
          name: "Guest",
          path: "#",
        },
        {
          name: "Employee",
          path: "#",
        },
        {
          name: "Project Manager",
          path: "#",
        },
        {
          name: "Vendor",
          path: "#",
        },
      ],
    },
    {
      name: "Brian Beaulieu",
      onlineStatus: "available",
      profileImg:
        "https://loopity.codiantdev.com/assets/images/frontend/profile/profile02.jpg",
      emailID: "brianbeaulieu@gmail.com",
      phoneNumber: "+1 202-505-0127",
      channel: "01",
      channelName: [
        {
          name: "Search and Rescue",
          path: "#",
        },
      ],
      roles: "Guset",
      rolesName: [
        {
          name: "Guest",
          path: "#",
        },
        {
          name: "Employee",
          path: "#",
        },
        {
          name: "Project Manager",
          path: "#",
        },
        {
          name: "Vendor",
          path: "#",
        },
      ],
    },
    {
      name: "Melissa Sanders",
      onlineStatus: "away",
      profileImg:
        "https://loopity.codiantdev.com/assets/images/frontend/profile/profile01.jpg",
      emailID: "melissasanders@gmail.com",
      phoneNumber: "-",
      channel: "02",
      channelName: [
        {
          name: "Search and Rescue",
          path: "#",
        },
        {
          name: "Recovery",
          path: "#",
        },
      ],
      roles: "Guset",
      rolesName: [
        {
          name: "Guest",
          path: "#",
        },
        {
          name: "Employee",
          path: "#",
        },
        {
          name: "Project Manager",
          path: "#",
        },
        {
          name: "Vendor",
          path: "#",
        },
      ],
    },
    {
      name: "Brian Beaulieu",
      onlineStatus: "available",
      profileImg:
        "https://loopity.codiantdev.com/assets/images/frontend/profile/profile02.jpg",
      emailID: "brianbeaulieu@gmail.com",
      phoneNumber: "+1 202-505-0127",
      channel: "02",
      channelName: [
        {
          name: "Search and Rescue",
          path: "#",
        },
        {
          name: "Recovery",
          path: "#",
        },
      ],
      roles: "Guset",
      rolesName: [
        {
          name: "Guest",
          path: "#",
        },
        {
          name: "Employee",
          path: "#",
        },
        {
          name: "Project Manager",
          path: "#",
        },
        {
          name: "Vendor",
          path: "#",
        },
      ],
    },
  ];
  const Employeecolumns = ({
    roleLists,
    handleUpdateParticipantRole,
    updateRoleDetails,
  }) => {
    return [
      {
        dataField: "name",
        text: t("text.common.name"),
        headerClasses: "sorting",
        formatter: (_, row) => {
          return userNameImageFormatter(
            `${row?.user?.firstName} ${row?.user?.lastName}`,
            row?.user?.profileImageUrl,
            "",
            row?.onlineStatus,
          );
        },
      },
      {
        dataField: "emailID",
        text: "Email ID",
        headerClasses: "sorting",
        formatter: (_, row) => checkValidData(row?.user?.email),
      },
      {
        dataField: "phoneNumber",
        text: "Phone Number",
        headerClasses: "sorting",
        formatter: (_, row) => checkValidData(row?.user?.phoneNumber),
      },
      {
        dataField: "channel",
        text: "Channel Counts",
        headerClasses: "sorting",
        formatter: () => "-",
      },
      {
        dataField: "roles",
        text: "Roles",
        headerClasses: "sorting",
        formatter: (_, row) => {
          const isUpdate = updateRoleDetails?.find(
            (updRoleDetailsItem) =>
              updRoleDetailsItem?.participantId === row?.userId &&
              updRoleDetailsItem?.isLoading,
          );
          const defaultRole = roleLists.find((roleListItem) =>
            isUpdate
              ? isUpdate?.participantId === row?.userId
              : roleListItem?.id === row?.loopRoleId,
          )?.channelRole?.role;

          const handleChangeRole = (selectedRoleId) => {
            handleUpdateParticipantRole(row.userId, selectedRoleId);
          };

          logger(handleChangeRole);

          // defaultRole,
          //     roleLists,
          //     handleChangeRole,
          //     !!isUpdate?.isLoading

          if (isUpdate?.isLoading) {
            return <Spin />;
          } else {
            return userDropdownFormatter(
              defaultRole ?? "-",
              roleLists?.length > 0
                ? roleLists.map((roleListItem) => ({
                    name: roleListItem.channelRole.role,
                    id: roleListItem.id,
                  }))
                : [],
            );
          }
        },
      },
      {
        dataField: "action",
        text: "Action",
        headerClasses: "text-end",
        formatter: (cell, row) => userActionFormatter("icons", row),
      },
    ];
  };

  const onHandleCreateChannel = (ids, type) => {
    setCreateChannelModal(true);
    setChannelLoopId(ids);
    setChannelFormType(type);
  };

  useEffect(() => {
    if (state?.length === loopRequestData?.length) {
      hideLoopRequest();
    }
  }, [state]);

  return (
    <>
      <div className="chatPage">
        <aside className="chatAside">
          <div className="chatAsideHead d-flex align-items-center">
            <h3 className="chatAsideHead_heading mb-0">Loops</h3>
            <div className="d-flex align-items-center ms-auto ">
              <Link
                className="chatAsideHead_icon d-inline-flex"
                onClick={() => setFilterVisible(true)}
              >
                <em className="icon-filter" />
              </Link>
            </div>
            {filterVisible && (
              <div className="searchBox">
                <div className="form-group mb-0">
                  <div className="form-control-wrap">
                    <div>
                      <div className="form-icon">
                        <em className="icon-search" />
                      </div>

                      <input
                        className="form-control"
                        placeholder="Search loops by name"
                        type="text"
                        onChange={(e) => {
                          onHandleSearch(e.target.value);
                        }}
                      />
                    </div>

                    <Link className="searchBox_icon">
                      <em
                        className="icon-close"
                        onClick={() => {
                          setSearch("");
                          setFilterVisible(false);
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {loopRequestData?.length > 0 && (
            <Link
              className="chatAside_req chatAsideHead"
              onClick={() => setLoopRequest(true)}
            >
              <div className="d-flex align-items-center justify-content-between w-100">
                <h2 className="mb-0">Loops Request</h2>
                <span className="ms-auto flex-shrink-0">
                  <span className="font-sb badge rounded-pill bg-primary">
                    {loopRequestData?.length}
                  </span>
                </span>
              </div>
            </Link>
          )}
          <LoopRightSidebar
            setUserRoleBlock={setUserRoleBlock}
            setEditLoop={setEditLoop}
            setPinChannelModal={setPinChannelModal}
            setLoopLoading={setLoopLoading}
            setAddParticipantsModal={setAddParticipantsModal}
            setCreateChannelModal={setCreateChannelModal}
            setDeleteLoopsModal={setDeleteLoopsModal}
            search={search}
            setSidebarOpenKey={setSidebarOpenKey}
            setLoopInfoSidebar={setLoopInfoSidebar}
            setLeaveChannelModal={setLeaveChannelModal}
            setLeaveLoopModal={setLeaveLoopModal}
            setDeleteChannelModal={setDeleteChannelModal}
            chatOpen={chatOpen}
            setLoopId={setLoopId}
            setLoopStepModal={setLoopStepModal}
            setSelectLoopRoom={setSelectLoopRoom}
            onEditLoop={onEditLoop}
            setLoopData={setLoopData}
            loopData={loopData}
            onHandleCreateChannel={onHandleCreateChannel}
            setChannelLoopId={setChannelLoopId}
            setChannel={setChannel}
            pinChannelData={pinChannelData}
            setNewChannelDetails={setNewChannelDetails}
            newChannelDetails={newChannelDetails}
            setManageParticipants={setManageParticipants}
            loopLoading={loopLoading}
            setChatDetails={setChatDetails}
            channel={channel}
            userData={userData}
            disableChat={disableChat}
            setCreatedBy={setCreatedBy}
          />
        </aside>

        {loopInfoSidebar && userRoleBlock ? (
          // Role list
          <LoopsRole loopId={loopId?.id} selectLoopRoom={selectLoopRoom} />
        ) : loopInfoSidebar && participantListBlock ? (
          <LoopParticipantList
            chatClose={chatClose}
            chatDetails={chatDetails}
            EmployeeData={EmployeeData}
            Employeecolumns={Employeecolumns}
            selectLoopRoom={selectLoopRoom}
          />
        ) : loopInfoSidebar ? (
          <>
            <div className="chatRight">
              <div className="chatBox d-flex justify-content-center align-items-center">
                <div className="loopInfo text-center">
                  <div
                    className={`userAvatar userAvatar-lg ${
                      loopIdData?.name
                        ? colorObj?.[loopIdData?.name?.charAt(0).toLowerCase()]
                        : ""
                    } d-flex justify-content-center align-items-center mx-auto`}
                  >
                    <span>{logoCreater(loopIdData?.name)}</span>
                  </div>
                  <div className="detail">
                    <p>Welcome To </p>
                    <h2>{checkValidData(textFormatter(loopIdData?.name))}</h2>
                    <h3 className="mb-0">
                      {loopIdData?.chatRooms?.length > 0
                        ? getRoomMembersLength(
                            loopIdData?.chatRooms
                              ?.map((item) => item?.chatRoomMembers)
                              .flat(),
                          )
                        : 0}{" "}
                      Members <span className="px-1">|</span>
                      {loopIdData?.chatRooms?.length} Channel{" "}
                      <span className="px-1">|</span>Claim Type :{" "}
                      {loopIdData?.claimType?.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : manageParticipants === true ? (
          <ManageParticipants
            selectedRoom={selectLoopRoom}
            setAddParticipantsModal={setAddParticipantsModal}
            chatOpen={chatOpen}
            setManageParticipants={setManageParticipants}
            getLoopData={getLoopData}
            createdBy={createdBy}
            disableChat={disableChat}
            userData={userData}
          />
        ) : socketState?.selectedChannel ? (
          <div
            className={`chatRight ${
              chatDetails ? "chatRight-open" : "position-relative "
            }`}
          >
            <LoopsChatBox
              handleCloseChat={() => {
                chatClose();
                setChatDetails(false);
              }}
              setChatInfoOpen={setChatInfoOpen}
              setSidebarOpenKey={setSidebarOpenKey}
              setAudioCall={setAudioCall}
              disableChat={disableChat}
              channel={channel}
              userData={userData}
              selectedRoom={selectLoopRoom}
            />
          </div>
        ) : (
          <div className="chatRight position-relative ">
            <ChatBlank
              getLoops={loopDatas}
              getLoopData={getLoopData}
              loopIdData={loopIdData}
            />
          </div>
        )}

        <LoopsSidebar
          setChannel={setChannel}
          onHandleCreateChannel={onHandleCreateChannel}
          selectLoopRoom={selectLoopRoom}
          addParticipants={addParticipants}
          setAddParticipantsModal={setAddParticipantsModal}
          hideaddParticipantsModal={hideaddParticipantsModal}
          setCreateChannelModal={setCreateChannelModal}
          channelModal={channelModal}
          channelTypeForm={channelTypeForm}
          setChannelFormType={setChannelFormType}
          hideCreateChannelModal={hideCreateChannelModal}
          userRoleBlock={userRoleBlock}
          setUserRoleBlock={setUserRoleBlock}
          loopInfoSidebar={loopInfoSidebar}
          sidebarOpenKey={sidebarOpenKey}
          setSidebarOpenKey={setSidebarOpenKey}
          chatInfoOpen={chatInfoOpen}
          setChatInfoOpen={setChatInfoOpen}
          setAudioCall={setAudioCall}
          participantListBlock={participantListBlock}
          setParticipantListBlock={setParticipantListBlock}
          loopData={loopId}
          getLoopData={getLoopData}
          loopLoading={loopsLoading}
          loopIdData={loopIdData}
          loopDatas={loopDatas}
          countryList={countryList}
          stateList={stateList}
          getStateList={getStateList}
          channelLoopId={channelLoopId}
          setChannelLoopId={setChannelLoopId}
          channel={channel}
          getPinChannels={getPinChannels}
          channelDetails={newChannelDetails}
          setManageParticipants={setManageParticipants}
          chatOpen={chatOpen}
          getChannelInformation={getChannelInformation}
          channelInfoLoading={channelInfoLoading}
          setChatDetails={setChatDetails}
          stateListLoading={stateListLoading}
          disableChat={disableChat}
          createdBy={createdBy}
          userData={userData}
        />
        {audioCall && (
          <AudioCall
            audioCall={audioCall}
            setAudioCall={setAudioCall}
            setChatInfoOpen={setChatInfoOpen}
          />
        )}
      </div>
      <CreateLoop
        current={current}
        loopStepModal={loopStepModal}
        hideLoopStepModal={hideLoopStepModal}
        setCurrent={setCurrent}
        countryList={countryList}
        states={stateList}
        getStates={getStateList}
        getLoops={loopDatas}
        getLoopData={getLoopData}
        loopIdData={loopIdData}
        setNext={setNext}
        nexts={nexts}
      />
      <PinChannel
        setPinChannelModal={setPinChannelModal}
        getLoopData={getLoopData}
        channel={channel}
        pinChannelModal={pinChannelModal}
        hidePinChannelModal={hidePinChannelModal}
        setChannelLoopId={setChannel}
        getPinChannels={getPinChannels}
        t={t}
      />
      <ModalComponent
        backdrop
        show={pinModal}
        onHandleCancel={hidePinModal}
        size="md"
        title="Pin this Message?"
        extraClassName="pinModal"
      >
        <>
          <p className="mb-0">
            The message will be pinned for everyone who views the channel.
          </p>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => setPinModal(false)} variant="light">
              {t("text.common.cancel")}
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => {
                setPinModal(false);
                // setPinMessageModal(true);
              }}
              className="ms-2 ms-md-3"
            >
              {t("text.createLoop.pin")}
            </CommonButton>
          </div>
        </>
      </ModalComponent>
      {/* <ModalComponent
        backdrop
        show={unPinModal}
        onHandleCancel={hideUnPinModal}
        size="md"
        title="Unpin this Message?"
        extraClassName="pinModal"
      >
        <>
          <p className="mb-0">This will unpin the message for everyone.</p>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => setUnPinModal(false)} variant="light">Cancel</CommonButton>
            <CommonButton  variant="primary" onClick={() => {setUnPinModal(false); setPinMessageModal(false)}} className="ms-2 ms-md-3">Unpin</CommonButton>
          </div>
        </>
      </ModalComponent> */}
      <ModalComponent
        backdrop
        show={unPinModal}
        onHandleCancel={hideUnPinModal}
        size="md"
        title="Unpin this Channel?"
        extraClassName="pinModal"
      >
        <>
          <p className="mb-0">This will unpin the Channel for everyone.</p>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => setUnPinModal(false)} variant="light">
              Cancel
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => {
                setUnPinModal(false);
                setPinMessageModal(false);
              }}
              className="ms-2 ms-md-3"
            >
              Unpin
            </CommonButton>
          </div>
        </>
      </ModalComponent>
      <ModalComponent
        backdrop
        show={loopRequest}
        onHandleCancel={hideLoopRequest}
        size="sm"
        modalExtraClass="noHeader"
        // extraClassName="loopRequest"
      >
        <>
          <div className="loopRequest">
            <div className="modalHeader">
              <h3>Loops Request</h3>
              <p className="mb-0">
                Don&apos;t miss out on the opportunity to join a Loop channel or
                create your own team.{" "}
              </p>
            </div>

            <div className="loopRequestJoin">
              {loopRequestData?.length > 0 &&
                loopRequestData?.map((item, index) => (
                  <div className="userBox userBox-recent d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-sm-center w-100">
                      <div
                        className={`userAvatar userAvatar-lg ${
                          item?.loop?.name
                            ? colorObj?.[
                                item?.loop?.name?.charAt(0).toLowerCase()
                              ]
                            : ""
                        }`}
                      >
                        <span>{logoCreater(item?.loop?.name)}</span>
                      </div>
                      <div className="userBox_content d-flex align-items-center flex-wrap flex-sm-nowrap w-100">
                        <div className="mb-2 mb-sm-0 me-sm-4">
                          <h5 className="mb-0">
                            {checkValidData(item?.chatRoom?.roomName)}
                          </h5>
                          <p className="mb-0">
                            Loop -{" "}
                            <strong> {checkValidData(item?.loop?.name)}</strong>{" "}
                            |{" "}
                            {checkValidCount(
                              item?.chatRoom?.chatRoomMemberCount,
                            )}{" "}
                            Participants Created by{" "}
                            {checkValidData(item?.chatRoom?.user?.email)}
                          </p>
                        </div>
                        <CommonButton
                          onClick={(e) => {
                            e.preventDefault();
                            joinRequest(item?.id, index);
                          }}
                          loading={joinLoading[index]}
                          disabled={
                            (state?.length > 0 &&
                              state?.find((el) => el === item?.id && true)) ||
                            joinLoading[index]
                          }
                          className="btn btn-md btn-primary font-sb"
                        >
                          {!joinLoading[index] &&
                            (state?.length > 0 && state?.includes(item?.id)
                              ? t("text.common.joined")
                              : t("text.common.join"))}
                        </CommonButton>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      </ModalComponent>
      <ModalComponent
        backdrop
        show={updatePinModal}
        onHandleCancel={hideUpdatePinModal}
        size="md"
        title="Update Pinned Message?"
        extraClassName="pinModal"
      >
        <>
          <p className="mb-0">
            Do you want to replace the current pinned message with this one?
          </p>
          <div className="text-end modalFooter">
            <CommonButton
              onClick={() => setUpdatePinModal(false)}
              variant="light"
            >
              Cancel
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => setUpdatePinModal(false)}
              className="ms-2 ms-md-3"
            >
              Yes
            </CommonButton>
          </div>
        </>
      </ModalComponent>

      <DeleteLoopModal
        deleteLoopsModal={deleteLoopsModal}
        hideDeleteLoopsModal={hideDeleteLoopsModal}
        getLoopData={getLoopData}
        loopId={loopId}
        setLoopId={setLoopId}
        t={t}
      />

      <DeleteChannelModal
        deleteChannelModal={deleteChannelModal}
        hideDeleteChannelModal={hideDeleteChannelModal}
        onHandleDelete={onHandleDelete}
        t={t}
      />

      <ModalComponent
        backdrop
        show={deleteModal}
        onHandleCancel={hideDeleteModal}
        size="md"
        title="Are you sure?"
        extraClassName="deleteModal"
      >
        <>
          <p className="mb-0">
            This message will be deleted for everyone in this chat
          </p>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => setDeleteModal(false)} variant="light">
              Cancel
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => setDeleteModal(false)}
              className="ms-2 ms-md-3"
            >
              Yes
            </CommonButton>
          </div>
        </>
      </ModalComponent>

      <ModalComponent
        backdrop
        show={removeModal}
        onHandleCancel={setRemoveModal}
        size="md"
        title="Are you sure?"
        extraClassName="deleteModal"
      >
        <>
          <p className="mb-0">
            This Participant List will be deleted for everyone
          </p>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => setRemoveModal(false)} variant="light">
              Cancel
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => setRemoveModal(false)}
              className="ms-2 ms-md-3"
            >
              Yes
            </CommonButton>
          </div>
        </>
      </ModalComponent>

      {/*  leave Loop */}
      <ModalComponent
        backdrop
        show={leaveLoopModal}
        onHandleCancel={hideLeaveLoopModal}
        size="md"
        title="You are about to leave this Loop?"
        extraClassName="leaveLoopModal"
      >
        <>
          <p className="mb-0">
            You won&apos;t be able to access this loop and its information
          </p>
          <div className="text-end modalFooter">
            <CommonButton
              onClick={() => setLeaveLoopModal(false)}
              variant="light"
            >
              Cancel
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => setLeaveLoopModal(false)}
              className="ms-2 ms-md-3"
            >
              Confirm
            </CommonButton>
          </div>
        </>
      </ModalComponent>
      {/*  leave Channel */}
      <LeaveChannelModal
        setLeaveChannelModal={setLeaveChannelModal}
        leaveChannelModal={leaveChannelModal}
        hideLeaveChannelModal={hideLeaveChannelModal}
        channel={channel}
        setChannel={setChannel}
        getLoopData={getLoopData}
        chatClose={chatClose}
        setSelectLoopRoom={setSelectLoopRoom}
      />

      <ModalComponent
        backdrop
        show={editLoop}
        onHandleCancel={hideEditLoop}
        size="lg"
        title="Edit Loop"
        extraClassName="loopModal"
      >
        <StepOne
          userData={loopIdData}
          hideEditLoop={hideEditLoop}
          getLoopData={getLoopData}
          getLoop={loopDatas}
          loopLoading={loopsLoading}
        />
      </ModalComponent>
    </>
  );
}

export default memo(Loops);
