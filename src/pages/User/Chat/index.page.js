/* eslint-disable react/no-unescaped-entities */
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  memo,
} from "react";
// import LightGallery from "lightgallery/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Accordion, Badge, Dropdown } from "react-bootstrap";

// import plugins if you need
// import lgThumbnail from "lightgallery/plugins/thumbnail";
// import lgZoom from "lightgallery/plugins/zoom";
import { useDispatch, useSelector } from "react-redux";

import {
  colorObj,
  getFullName,
  getUniqueListByKey,
  logger,
  modalNotification,
  statusFormatter,
  totalTimeDifference,
  userChatStatusOptions,
} from "utils";
import { ChatServices, LoopService, UserManagementServices } from "services";
import { selectUserData } from "redux/AuthSlice/index.slice";
import useDebounce from "hooks/useDebounce";
import { SocketContext } from "context/socket.context";
// import userRoutesMap from "../../../routeControl/userRouteMap";
import {
  AccordionComponent,
  // AntTextArea,
  AudioCall,
  CommonButton,
  GlobalLoader,
  ImageElement,
  ModalComponent,
  NoDataFound,
  logoCreater,
  // Popovers,
  // SweetAlert,
  // Switch,
  // checkValidData,
  // Input as TextInput,
} from "components";
// import routesMap from "routeControl/userRouteMap";
import { handleOnlineUsers } from "redux/ChatSlice/index.slice";
import NewChatAdd from "./NewChatAddModal/index.page";
import LoopsChatBox from "../Loops/LoopsChatBox";
import LoopsSidebar from "../Loops/LoopsSidebar";

function Chat() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { socketState, socketStateHandler, socket } = useContext(SocketContext);
  const [setChatInfoOpen] = useState(false);
  const [sidebarOpenKey, setSidebarOpenKey] = useState("");
  const [audioCall, setAudioCall] = useState(false);
  const [, setPinMessageModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [singleChatData, setSingleChatData] = useState({});
  // const [replyMassage, setReplyMassage] = useState(false);
  // const [setCopyMassage] = useState(false);
  const [copyMassageAlert, setCopymassageAlert] = useState(false);
  const [counter, setCounter] = useState(0);

  // const navigate = useNavigate();

  const hidePinModal = () => {
    setPinModal(false);
  };

  const [unPinModal, setUnPinModal] = useState(false);
  const hideUnPinModal = () => {
    setUnPinModal(false);
  };
  // const onInit = () => {
  //   // console.log("lightGallery has been initialized");
  // };
  const [filterVisible, setFilterVisible] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [newChatModalType, setnewChatModalType] = useState("");
  const [chatDetails, setChatDetails] = useState(false);
  const [chatListData, setChatListData] = useState([]);
  const [newChatListDataLoading, setNewChatListDataLoading] = useState(false);
  const [newChatListData, setNewChatListData] = useState([]);
  const [userId, setUserId] = useState("");
  const [chatListLoading, setChatListLoading] = useState(false);
  const [pinListData, setPinListData] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [checkSweetAlert, setCheckSweetAlert] = useState("");
  const [pinUserId, setPinUserId] = useState("");
  const userData = useSelector(selectUserData);
  const [pinUnPinLoading, setPinUnPinLoading] = useState(false);
  const debounce = useDebounce();
  const [fetchApi, setfetchApi] = useState(false);
  const [markAsReadIds, setMarkAsReadIds] = useState([]);
  const [newPin, setNewPin] = useState("");
  const { selectedChannel, channelNewMessage, viewInChatGlobal ,unreadMessageCounts } = socketState;
  const [meChatData, setMeChatData] = useState([]);
  const [chatValue, setChatValue] = useState("");
  const [message, setMessage] = useState(meChatData?.last_message?.message);
  const {
    handleSelectChannel,
    handleUpdateChannelDetails,
    handleSetViewInChatGlobal,
    getUserChatStatus,
    handleUnreadMessageCounts
  } = socketStateHandler;

  const otherPageChatData = localStorage.getItem("chatData");

  const hideNewChatModal = () => {
    setNotesModal(false);
    setNewChatListData([]);
    setTimeout(() => {
      setnewChatModalType("");
    }, 500);
  };

  const chatOpen = () => {
    if (window.innerWidth < 991) {
      setChatDetails(true);
    }
  };

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
  const getMEChatData = async () => {
    try {
      setMeChatData([]);
      const response = await ChatServices.getMeChatService();
      if (response?.success) {
        setMeChatData(response?.data);
        setMessage(response?.data?.last_message?.message);
      }
    } catch (error) {
      logger(error);
    }
  };

  const handleGetCurrentRoomDetails = (loopDetails) => {
    let tempLoopData = loopDetails || chatListData;

    const viewChatRoom = tempLoopData.find(
      (item) => item?.chatRoom?.id === viewInChatGlobal?.message?.roomId,
    );

    return viewChatRoom;
  };

  const handleViewSingleChat = (data) => {
    const isExistChatRoom = data?.find((item) =>
      item?.chatRoom?.chatRoomMembers?.some(
        (roomMember) => roomMember?.userId === viewInChatGlobal?.id,
      ),
    );
    return isExistChatRoom;
  };

  const getChatListData = async (inputVal) => {
    setMarkAsReadIds([]);
    setChatListLoading(true);
    try {
      const response = await ChatServices.getChatListService({
        search: inputVal,
      });
      let queryParams = {
        scope: "all",
        type: "single",
      };
      let isGlobalView = false;
      if (response?.data?.length > 0) {
        if (viewInChatGlobal?.type) {
          const isExistSingleChatRoom = handleViewSingleChat(response.data);
          if (isExistSingleChatRoom) {
            isGlobalView = true;
            handleSelectChannel({
              ...isExistSingleChatRoom?.chatRoom,
              type: viewInChatGlobal?.type,
            });
          }
        } else if (!isGlobalView && viewInChatGlobal) {
          const viewChatRoom = response.data.find(
            (item) => item?.chatRoom?.id === viewInChatGlobal?.message?.roomId,
          );
          if (viewChatRoom) {
            isGlobalView = true;
            handleUpdateChannelDetails(viewChatRoom?.chatRoom);
          }
        }
        const roomMembers = response?.data
          ?.map((dItem) => dItem?.chatRoom?.chatRoomMembers ?? [])
          ?.flat?.();

        if (roomMembers?.length > 0) {
          dispatch(
            handleOnlineUsers(getUniqueListByKey(roomMembers, "userId")),
          );
        }
      }
      const res = await LoopService.getPinChannelService(queryParams);
      if (res?.success) {
        if (!isGlobalView && viewInChatGlobal && res?.data?.rows?.length > 0) {
          if (!isGlobalView && viewInChatGlobal?.type) {
            const isExistSingleChatRoom = handleViewSingleChat(res.data.rows);
            if (isExistSingleChatRoom) {
              isGlobalView = true;
              handleSelectChannel({
                ...isExistSingleChatRoom?.chatRoom,
                type: viewInChatGlobal?.type,
              });
            }
          } else {
            const viewChatRoom = res.data.rows.find(
              (rowItem) =>
                rowItem?.channelId === viewInChatGlobal?.message?.roomId,
            );

            if (viewChatRoom?.chatRoom) {
              isGlobalView = true;
              handleUpdateChannelDetails(viewChatRoom.chatRoom);
            }
          }
        }
        if (!inputVal) {
          setPinListData(res?.data?.rows);
        } else setPinListData([]);
      }
      if (response?.success) {
        let resData = response?.data?.filter((item) => {
          if (item?.chatRoom?.fromUser?.id !== userData?.id) {
            let usrData = item?.chatRoom;
            return usrData;
          } else if (item?.chatRoom?.toUser?.id !== userData?.id) {
            let usrData = item?.chatRoom;
            return usrData;
          }
        });
        setChatListData(resData);
        handleUnreadMessageCounts(resData)
        setfetchApi(true);
      }
    } catch (error) {
      logger(error);
    }
    setChatListLoading(false);
  };

  const getNewChatListData = async (search) => {
    setNewChatListData([]);
    setNewChatListDataLoading(true);
    try {
      let query = {
        offset: 0,
        limit: 5,
        search,
      };
      const response = await UserManagementServices.getUserService({
        queryParams: query,
      });
      if (response?.success) {
        setNewChatListData(response?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setNewChatListDataLoading(false);
  };

  const chatSearch = useCallback(
    debounce((inputVal) => getChatListData(inputVal), 1400),
    [],
  );

  const handleSearch = useCallback(
    debounce((inputVal) => getNewChatListData(inputVal), 1400),
    [],
  );

  const onConfirmAlert = async () => {
    if (checkSweetAlert === "pin") {
      setPinUnPinLoading(true);
      setNewPin("");
      try {
        let bodyData = {
          channelId: pinUserId,
        };
        const response = await LoopService.addPinChannelService(bodyData);
        if (response?.success) {
          modalNotification({
            type: "success",
            message: response?.message,
          });
          setPinUserId("");
          setIsAlertVisible(false);
          getChatListData();
        }
      } catch (error) {
        logger(error);
      }
      setPinUnPinLoading(false);
    } else {
      setPinUnPinLoading(true);
      try {
        const response = await LoopService.UnpinPinChannelService(pinUserId);
        if (response?.success) {
          modalNotification({
            type: "success",
            message: response?.message,
          });
          setPinUserId("");
          setIsAlertVisible(false);
          getChatListData();
        }
      } catch (error) {
        logger(error);
      }
      setPinUnPinLoading(false);
      return false;
    }
  };

  const singleChatGetByID = async (id) => {
    try {
      const response = await ChatServices.singleChatGetByIdService(id);
      if (response?.success) {
        let idArr =
          chatListData?.length > 0 &&
          chatListData?.map((item) => item?.id || item?.chatRoom?.id);
        if (idArr?.length > 0 && !idArr?.includes(response?.data?.id)) {
          setChatListData([...chatListData, response?.data]);
        }
        handleSelectChannel(response?.data);
        setfetchApi(false);
        localStorage.removeItem("chatData");
      }
    } catch (error) {
      logger(error);
    }
  };

  const singleChat = async (id) => {
    try {
      let bodyData = {
        userId: id,
      };
      const response = await ChatServices.singleChatService(bodyData);
      if (response?.success) {
        singleChatGetByID(response?.data?.id);
        if (userId) setNewPin(response?.data?.id);
        setSingleChatData(response?.data);
        setUserId("");
        hideNewChatModal();
      }
    } catch (error) {
      logger(error);
    }
  };

  const markAsRead = (unreadCount, chatRoomId, id) => {
    if (unreadCount) {
      socket.emit(
        "read_message",
        {
          userId: userData?.id,
          chatRoomId,
        },
        (e) => {
          if (e?.success && !markAsReadIds.includes(id))
            setMarkAsReadIds([...markAsReadIds, id]);
        },
      );
    }
  };

  const shownewChatModal = (type) => {
    setNotesModal(true);
    setnewChatModalType(type);
    getNewChatListData();
  };

  function moveObjectsToTopById(arr, id) {
    const resultArray = [];
    const objectsWithTargetId = [];    
    for (const obj of arr) {
      if (obj?.chatRoom?.id === id) {
        objectsWithTargetId.push(obj);
      } else {
        resultArray.push(obj);
      }
    }
    resultArray.unshift(...objectsWithTargetId);
    return resultArray;
  }

  useEffect(() => {
    if (meChatData?.id === channelNewMessage?.roomId)
      setMessage(
        channelNewMessage?.message ||
          channelNewMessage?.media?.mediaName ||
          channelNewMessage?.media[0]?.mediaName ||
          meChatData?.last_message?.message,
      );
    else {
      setMessage((prevState) => prevState);
    }
  }, [channelNewMessage]);

  useEffect(() => {
    getChatListData();
    getMEChatData();
  }, []);

  useEffect(() => {
    if (parseInt(otherPageChatData) > 0 && fetchApi) {
      singleChatGetByID(parseInt(otherPageChatData));
    }
  }, [otherPageChatData, fetchApi]);

  useEffect(() => {
    if (userId) {
      singleChat(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (
      chatListData?.length > 0 ||
      pinListData?.length > 0 ||
      viewInChatGlobal?.type
    ) {
      if (viewInChatGlobal?.type) {
        const isExistSingleChatRoom = handleViewSingleChat([
          ...chatListData,
          ...pinListData,
        ]);
        if (isExistSingleChatRoom) {
          handleSelectChannel({
            ...isExistSingleChatRoom?.chatRoom,
            type: viewInChatGlobal?.type,
          });
        } else {
          singleChat(viewInChatGlobal?.id);
        }
      } else {
        const viewChat = handleGetCurrentRoomDetails();
        if (viewChat) {
          handleUpdateChannelDetails(viewChat?.chatRoom);
        }
      }
    }
  }, [viewInChatGlobal]);

  const getPinData = (val1, type) => {
    let data = "";
    if (val1?.length > 0) {
      if (type === "image") {
        val1?.map((item) => {
          if (item?.id !== userData?.id) {
            data = item?.profileImageUrl;
            return data;
          }
        });
      } else if (type === "name") {
        val1?.map((item) => {
          if (item?.id !== userData?.id) {
            data = getFullName(item?.firstName, item?.lastName);
            return data;
          }
        });
      } else if (type === "status") {
        val1?.map((item) => {
          if (item?.id !== userData?.id) {
            data = statusFormatter(item?.chatStatus?.status);
            return data;
          }
        });
      }
    }
    return data;
  };

  const updateLastMsg = () => {
    let chatData = chatListData?.map((item) => {
      if (
        item?.chatRoom?.id === channelNewMessage?.roomId ||
        item?.id === channelNewMessage?.roomId
      ) {
        let updateData = {};
        updateData = {
          ...item,
          message: channelNewMessage?.message
            ? channelNewMessage?.message
            : null,

          mediaName: channelNewMessage?.mediaName
            ? channelNewMessage?.mediaName
            : null,
          mediaPath: channelNewMessage?.mediaPath
            ? channelNewMessage?.mediaPath
            : null,
        };
        return updateData;
      } else {
        return item;
      }
    });
    let pinData = pinListData?.map((item) => {
      if (item?.channelId === channelNewMessage?.roomId) {
        let updateData = {};
        updateData = {
          ...item,
          chatRoom: {
            ...item.chatRoom,
            chatRoomMessages: [
              {
                ...item?.chatRoom?.chatRoomMessages?.[0],
                message: channelNewMessage?.message
                  ? channelNewMessage?.message
                  : null,
                mediaName: channelNewMessage?.mediaName
                  ? channelNewMessage?.mediaName
                  : null,
                mediaPath: channelNewMessage?.mediaPath
                  ? channelNewMessage?.mediaPath
                  : null,
              },
            ],
          },
        };
        return updateData;
      } else {
        return item;
      }
    });
    setChatListData(moveObjectsToTopById(chatData, channelNewMessage?.roomId));
    setPinListData(pinData);
  };

  useEffect(() => {
    if (channelNewMessage && Object.keys(channelNewMessage)?.length) {
      updateLastMsg();
    }
  }, [channelNewMessage]);

  const pinnedData = (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Body>
          <Accordion>
            {pinListData?.length > 0 ? (
              pinListData?.map((item) => (
                <Accordion.Item
                  className="accordion-item-left pinnedLoops"
                  eventKey="0.2"
                >
                  <div className="accordionLoop">
                    <Accordion.Header
                      onClick={(e) => {
                        e.preventDefault();
                        if (socketState?.viewInChatGlobal) {
                          handleSetViewInChatGlobal();
                        }
                        chatOpen();
                        if (item?.chatRoom?.unreadCount > 0) {
                          markAsRead(
                            item?.chatRoom?.unreadCount,
                            item?.chatRoom?.id,
                            item?.chatRoom?.id,
                          );
                        }
                        if (
                          !selectedChannel ||
                          selectedChannel?.id !== item.channelId
                        ) {
                          handleSelectChannel(item?.chatRoom || item);
                        }
                      }}
                    >
                      <div
                        className={` userBox d-flex align-items-start justify-content-between w-100 ${
                          !markAsReadIds?.includes(item?.chatRoom?.id) &&
                          item?.chatRoom?.unreadCount > 0 &&
                          "userBox-recent"
                        }`}
                      >
                        <div className="d-flex align-items-start w-100">
                          <div className="userBox_image">
                            <div className="userAvatar userAvatar-md">
                              <ImageElement
                                previewSource={
                                  item?.chatRoom?.chatRoomMembers?.length > 0 &&
                                  getPinData(
                                    item?.chatRoom?.chatRoomMembers?.map(
                                      (items) => items?.user,
                                    ),
                                    "image",
                                  )
                                }
                                alt="profile"
                              />
                            </div>
                            <span
                              className={`statusdot statusdot-${
                                userChatStatusOptions[
                                  getUserChatStatus(
                                    null,
                                    item?.chatRoom?.chatRoomMembers,
                                  )
                                ]?.key
                              }`}
                            />
                          </div>
                          <div className="userBox_content w-100">
                            <div className="d-flex align-items-end w-100">
                              <h5>
                                {item?.chatRoom?.chatRoomMembers?.length > 0 &&
                                  getPinData(
                                    item?.chatRoom?.chatRoomMembers?.map(
                                      (items) => items?.user,
                                    ),
                                    "name",
                                  )}
                              </h5>
                              <span className="ms-auto flex-shrink-0 me-2">
                              {totalTimeDifference(
                                ((channelNewMessage?.roomId===item?.chatRoom?.id) && channelNewMessage?.createdAt )||
                                item?.chatRoom?.chatRoomMessages[0]?.createdAt,
                              )}
                              </span>
                            </div>
                            <div className="d-flex  align-items-center w-100">
                              <h6 className="mb-0">
                                {item?.chatRoom?.chatRoomMessages?.[0]
                                  ?.mediaName ||
                                  item?.chatRoom?.chatRoomMessages?.[0]
                                    ?.message ||
                                  item?.chatRoom?.chatRoomMessages?.[0]
                                    ?.messageMedia[0]?.mediaName}
                              </h6>
                              {item?.chatRoom?.unreadCount > 0 && (
                                <span className="ms-auto flex-shrink-0 badgeChat">
                                  {item?.chatRoom?.unreadCount > 0 &&
                                    !markAsReadIds.includes(
                                      item?.chatRoom?.id,
                                    ) && (
                                      <Badge
                                        className="font-sb"
                                        pill
                                        bg="primary"
                                      >
                                        {item?.chatRoom?.unreadCount}
                                      </Badge>
                                    )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Dropdown className="ellipseDrop d-inline-block">
                      <Dropdown.Toggle
                        as="a"
                        className="d-inline-flex align-items-center"
                        id="dropdown-basic"
                      >
                        <span className="icon-ellipse" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end">
                        {item?.chatRoom?.unreadCount > 0 &&
                        !markAsReadIds.includes(item?.chatRoom?.id) ? (
                          <Link
                            className="dropdown-item"
                            onClick={() =>
                              markAsRead(
                                item?.chatRoom?.unreadCount,
                                item?.chatRoom?.id,
                                item?.chatRoom?.id,
                              )
                            }
                            to="#"
                          >
                            <span className="icon-unread">
                              <span className="path1" />
                              <span className="path2" />
                              <span className="path3" />
                              <span className="path4" />
                              <span className="path5" />
                            </span>{" "}
                            {t("text.chat.markAsRead")}
                          </Link>
                        ) : (
                          <></>
                        )}
                        <Link
                          to="#"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            setCheckSweetAlert("unpin");
                            setIsAlertVisible(true);
                            setPinUserId(item?.id);
                          }}
                        >
                          <span className="icon-pin">
                            <span className="path1" />
                            <span className="path2" />
                          </span>{" "}
                          {t("text.chat.unPin")}
                        </Link>
                        {/* <Link className="dropdown-item">
                          <span className="icon-clear-chat">
                            <span className="path1" />
                            <span className="path2" />
                          </span>{" "}
                          {t("text.chat.clearChat")}
                        </Link> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Accordion.Item>
              ))
            ) : (
              <NoDataFound />
            )}
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );

  const getChatData = (fromUser, toUser, type) => {
    let name = "";
    if (type === "image") {
      if (fromUser?.id !== userData?.id) {
        name = fromUser?.profileImageUrl;
        return name;
      } else {
        name = toUser?.profileImageUrl;
      }
    } else if (type === "status") {
      if (fromUser?.id !== userData?.id) {
        name = statusFormatter(fromUser?.chatStatus?.status);
        return name;
      } else {
        name = statusFormatter(toUser?.chatStatus?.status);
      }
    } else if (fromUser?.id !== userData?.id) {
      name = getFullName(fromUser?.firstName, fromUser?.lastName);
      return name;
    } else {
      name = getFullName(toUser?.firstName, toUser?.lastName);
    }
    return name;
  };

  const data = (
    <>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Body>
            <Accordion>
              {chatListData?.length > 0 ? (
                chatListData?.map((item) => {
                  if (item?.fromUser || item?.chatRoom?.fromUser)
                    return (
                      <Accordion.Item className="accordion-item-left pinnedLoops">
                        <div className="accordionLoop">
                          <Accordion.Header
                            onClick={(e) => {
                              e.preventDefault();
                              if (socketState?.viewInChatGlobal) {
                                handleSetViewInChatGlobal();
                              }
                              // chatOpen();
                              if (item?.chatRoom?.unreadCount > 0) {
                                markAsRead(
                                  item?.chatRoom?.unreadCount,
                                  item?.chatRoom?.id,
                                  item?.chatRoom?.id,
                                );
                              }
                              if (
                                !selectedChannel ||
                                selectedChannel?.id !== item?.chatRoom?.id
                              ) {
                                handleSelectChannel(item?.chatRoom || item);
                              }
                            }}
                          >
                            <div
                              className={` userBox d-flex align-items-start justify-content-between w-100 ${
                                !markAsReadIds?.includes(item?.chatRoom?.id) &&
                                item?.chatRoom?.unreadCount > 0 &&
                                "userBox-recent"
                              }`}
                            >
                              <div className="d-flex align-items-start w-100">
                                <div className="userBox_image">
                                  {(item?.fromUser || item?.chatRoom?.fromUser,
                                  item?.toUser || item?.chatRoom?.toUser) ? (
                                    <div className="userAvatar userAvatar-md">
                                      <ImageElement
                                        previewSource={getChatData(
                                          item?.fromUser ||
                                            item?.chatRoom?.fromUser,
                                          item?.toUser ||
                                            item?.chatRoom?.toUser,
                                          "image",
                                        )}
                                        alt="profile"
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className={`userAvatar userAvatar-md ${
                                        item?.chatRoom?.roomName
                                          ? colorObj?.[
                                              item?.chatRoom?.roomName
                                                ?.charAt(0)
                                                .toLowerCase()
                                            ]
                                          : ""
                                      }`}
                                    >
                                      <span>
                                        {logoCreater(item?.chatRoom?.roomName)}
                                      </span>
                                    </div>
                                  )}
                                  <span
                                    className={`statusdot statusdot-${
                                      userChatStatusOptions[
                                        getUserChatStatus(
                                          null,
                                          item?.chatRoom?.chatRoomMembers,
                                        )
                                      ]?.key
                                    }`}
                                  />
                                </div>
                                <div className="userBox_content w-100">
                                  <div className="d-flex align-items-end w-100">
                                    <h5>
                                      {getChatData(
                                        item?.chatRoom?.fromUser ||
                                          item?.fromUser,
                                        item?.chatRoom?.toUser || item?.toUser,
                                        "name",
                                      )}
                                    </h5>

                                    <span className="ms-auto flex-shrink-0 me-2">
                                      {totalTimeDifference(
                                       ((channelNewMessage?.roomId===item?.chatRoom?.id) && channelNewMessage?.createdAt )||
                                          item?.last_message?.createdAt,
                                      )}
                                    </span>
                                  </div>
                                  <div className="d-flex  align-items-center w-100">
                                    <h6 className="mb-0">
                                      {item?.message ||
                                        item?.mediaName ||
                                        item?.last_message?.message ||
                                        item?.last_message?.messageMedia[0]
                                          ?.mediaName}
                                    </h6>
                                    {item?.chatRoom?.unreadCount > 0 && (
                                      <span className="ms-auto flex-shrink-0 badgeChat">
                                        {item?.chatRoom?.unreadCount > 0 &&
                                          !markAsReadIds.includes(
                                            item?.chatRoom?.id,
                                          ) && (
                                            <Badge
                                              className="font-sb"
                                              pill
                                              bg="primary"
                                            >
                                              {unreadMessageCounts &&unreadMessageCounts[item?.chatRoom?.id]}
                                            </Badge>
                                          )}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Dropdown className="ellipseDrop d-inline-block">
                            <Dropdown.Toggle
                              as="a"
                              className="d-inline-flex align-items-center"
                              id="dropdown-basic"
                            >
                              <span className="icon-ellipse" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-end">
                              {!markAsReadIds?.includes(item?.chatRoom?.id) &&
                              item?.chatRoom?.unreadCount > 0 ? (
                                <Link
                                  className="dropdown-item"
                                  onClick={() =>
                                    markAsRead(
                                      item?.chatRoom?.unreadCount,
                                      item?.chatRoom?.id,
                                      item?.chatRoom?.id,
                                    )
                                  }
                                  to="#"
                                >
                                  <span className="icon-unread">
                                    <span className="path1" />
                                    <span className="path2" />
                                    <span className="path3" />
                                    <span className="path4" />
                                    <span className="path5" />
                                  </span>{" "}
                                  {t("text.chat.markAsRead")}
                                </Link>
                              ) : (
                                <></>
                              )}
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCheckSweetAlert("pin");
                                  setIsAlertVisible(true);
                                  if (newPin) setPinUserId(newPin);
                                  else setPinUserId(item?.chatRoom?.id);
                                }}
                              >
                                <span className="icon-pin">
                                  <span className="path1" />
                                  <span className="path2" />
                                </span>{" "}
                                {t("text.chat.pin")}
                              </Link>
                              {/* <Link className="dropdown-item">
                            <span className="icon-clear-chat">
                              <span className="path1" />
                              <span className="path2" />
                            </span>{" "}
                            {t("text.chat.clearChat")}
                          </Link> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Accordion.Item>
                    );
                })
              ) : (
                <NoDataFound />
              )}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
  const accordionData = [
    {
      name: t("text.chat.pinned"),
      content: pinnedData,
      eventKey: 0,
      defaultKey: 0,
    },
    {
      name: t("text.chat.recent"),
      content: data,
      eventKey: 1,
      defaultKey: 1,
    },
  ];
  if (!pinListData?.length > 0) {
    accordionData?.shift();
  }

  if (!chatListData?.length) {
    accordionData?.pop();
  }

  return (
    <>
      <div className="chatPage">
        <aside className="chatAside">
          <div className="chatAsideHead d-flex align-items-center">
            <h3 className="chatAsideHead_heading mb-0">
              {t("text.chat.chat")}
            </h3>
            <div className="d-flex align-items-center ms-auto ">
              {/* <div className="chatAside_switch d-flex align-items-center">  
                <Switch /> <span className="info">{t("text.chat.unRead")}</span>
              </div> */}
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
                    <div className="form-icon">
                      <em className="icon-search" />
                    </div>
                    <input
                      className="form-control"
                      placeholder="Search Chats by name"
                      type="text"
                      onChange={(e) => {
                        setChatValue(e.target.value);
                        chatSearch(e.target.value);
                      }}
                    />
                    <Link className="searchBox_icon">
                      <em
                        className="icon-close"
                        onClick={() => {
                          setFilterVisible(false);
                          if (chatValue?.length > 0) getChatListData("");
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="chatAside_list chatAside_list-activity">
            <>
              <Accordion>
                <Accordion.Item className="accordion-item-left pinnedLoops">
                  <div className="accordionLoop">
                    <Accordion.Header
                      onClick={() => {
                        if (socketState?.viewInChatGlobal) {
                          handleSetViewInChatGlobal();
                        }
                        chatOpen();
                        if (
                          !selectedChannel ||
                          selectedChannel?.id !== meChatData?.chatRoom?.id
                        ) {
                          handleSelectChannel(
                            meChatData?.chatRoom || meChatData,
                          );
                        }
                      }}
                    >
                      <div
                        className={` userBox d-flex align-items-start justify-content-between w-100 ${
                          !markAsReadIds?.includes(meChatData?.chatRoom?.id) &&
                          meChatData?.chatRoom?.unreadCount > 0 &&
                          "userBox-recent"
                        }`}
                      >
                        <div className="d-flex align-items-start w-100">
                          <div className="userBox_image">
                            <div className="userAvatar userAvatar-md">
                              <ImageElement
                                previewSource={userData?.profileImageUrl}
                                alt="profile"
                              />
                            </div>
                            <span
                              className={`statusdot statusdot-${
                                userChatStatusOptions[
                                  getUserChatStatus(userData?.id)
                                ]?.key
                              }`}
                            />
                          </div>
                          <div className="userBox_content w-100">
                            <div className="d-flex align-items-end w-100">
                              <h5>
                                {`${userData?.firstName} ${userData?.lastName} (You)`}
                              </h5>

                              <span className="ms-auto flex-shrink-0 me-2">
                                {totalTimeDifference(
                                  ((channelNewMessage?.roomId===meChatData?.id) && channelNewMessage?.createdAt )||
                                    meChatData?.last_message?.createdAt,
                                )}
                              </span>
                            </div>

                            <div className="d-flex  align-items-center w-100">
                              <h6 className="mb-0">{message}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Header>
                  </div>
                </Accordion.Item>
              </Accordion>
            </>
            {chatListLoading ? (
              <GlobalLoader />
            ) : chatListData?.length > 0 || pinListData?.length > 0 ? (
              accordionData.map((item) => {
                return (
                  <>
                    <AccordionComponent
                      defaultActiveKey={[0, 1]}
                      flush
                      eventKey={item?.eventKey}
                    >
                      <Accordion.Header>{item?.name}</Accordion.Header>

                      <Accordion.Body>{item?.content}</Accordion.Body>
                    </AccordionComponent>
                  </>
                );
              })
            ) : (
              chatValue?.length > 0 && <NoDataFound />
            )}
          </div>
          <div className="plusIcon plusIcon-md">
            <Link to="#" onClick={() => shownewChatModal("add")}>
              <em className="icon-plus" />
            </Link>
          </div>
        </aside>
        {socketState?.selectedChannel ? (
          <div className={`chatRight ${chatDetails ? "chatRight-open" : ""}`}>
            <LoopsChatBox
              handleCloseChat={() => setChatDetails(false)}
              singleChat
              setAudioCall={setAudioCall}
            />
          </div>
        ) : (
          <div className="chatRight position-relative ">
            <div className="chatBox d-flex align-items-center">
              <div className="newLoops text-center">
                <h2 className="font-bd">
                  {t("text.chat.welcomeToTheLoopity")}
                </h2>
                <p className="mb-0">
                  {t("text.chat.hereAreSomeThingsToGetGoing")}
                </p>
                <ImageElement
                  className="img-fluid image"
                  source="create-more-loops.svg"
                  alt="image"
                />
                <CommonButton
                  variant="primary"
                  extraClassName="btn-md flex-shrink-0 btn-mw-180"
                  onClick={() => {
                    shownewChatModal("add");
                  }}
                >
                  {t("text.chat.startChatting")}
                </CommonButton>
              </div>
            </div>
          </div>
        )}

        {audioCall && (
          <AudioCall
            audioCall={audioCall}
            setAudioCall={setAudioCall}
            setChatInfoOpen={setChatInfoOpen}
          />
        )}
        <LoopsSidebar
          sidebarOpenKey={sidebarOpenKey}
          setSidebarOpenKey={setSidebarOpenKey}
          // chatInfoOpen={chatInfoOpen}
          setChatInfoOpen={setChatInfoOpen}
          setAudioCall={setAudioCall}
          selectLoopRoom={selectedChannel}
          singleChat={!false}
        />
      </div>
      {/* New Chat */}
      <ModalComponent
        backdrop
        show={notesModal}
        onHandleCancel={hideNewChatModal}
        size="md"
        title="New Chat"
        extraClassName="newChatModal"
        titleClassName="m-0"
      >
        {newChatModalType === "add" || newChatModalType === "edit" ? (
          <NewChatAdd
            handleSearch={handleSearch}
            newChatListDataLoading={newChatListDataLoading}
            newChatListData={newChatListData}
            setUserId={setUserId}
            singleChatData={singleChatData}
          />
        ) : (
          <div className="notesModal_details">
            <div className="user d-flex align-items-center">
              <div className="userAvatar">
                <ImageElement source="profile/profile04.jpg" alt="user" />
              </div>
              <div className="user_info d-flex align-items-center flex-wrap">
                <h3 className="m-0 font-sb">Melissa Sanders</h3>{" "}
                <p className="m-0">Yesterday, 10:19</p>
              </div>
            </div>
            <h2 className="font-bd">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </h2>
            <p className="mb-0 font-sb">
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        )}
      </ModalComponent>
      <ModalComponent
        backdrop
        show={pinModal}
        onHandleCancel={hidePinModal}
        size="md"
        title="Pin this Message?"
        extraClassName="pinModal"
      >
        <>
          <p className="mb-0">{t("text.common.pinMessageText")}</p>
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
              {t("text.common.pin")}
            </CommonButton>
          </div>
        </>
      </ModalComponent>
      <ModalComponent
        backdrop
        show={isAlertVisible}
        onHandleCancel={() => setIsAlertVisible(false)}
        size="md"
        title={
          checkSweetAlert === "pin"
            ? t("text.chat.pinThisChannel")
            : t("text.chat.unPinThisChannel")
        }
        // extraClassName="pinModal"
      >
        <>
          <p className="mb-0">
            {checkSweetAlert === "pin"
              ? t("text.chat.pinText")
              : t("text.chat.unPinText")}
          </p>
          <div className="text-end modalFooter">
            <CommonButton
              onClick={() => setIsAlertVisible(false)}
              variant="light"
            >
              {t("text.common.cancel")}
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={onConfirmAlert}
              className="ms-2 ms-md-3"
              loading={pinUnPinLoading}
            >
              {checkSweetAlert === "pin"
                ? t("text.chat.pin")
                : t("text.chat.unPin")}
            </CommonButton>
          </div>
        </>
      </ModalComponent>
      <ModalComponent
        backdrop
        show={deleteMessage}
        onHandleCancel={setDeleteMessage}
        size="md"
        title="Are you sure?"
        // extraClassName="pinModal"
      >
        <>
          <p className="mb-0">
            {t("text.chat.thisMessageWillBeDeletedForEveryoneInThisChat")}
          </p>
          <div className="text-end modalFooter">
            <CommonButton
              onClick={() => setDeleteMessage(false)}
              variant="light"
            >
              {t("text.common.no")}
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => setDeleteMessage(false)}
              className="ms-2 ms-md-3"
            >
              {t("text.common.yes")}
            </CommonButton>
          </div>
        </>
      </ModalComponent>
      <ModalComponent
        backdrop
        show={unPinModal}
        onHandleCancel={hideUnPinModal}
        size="md"
        title="Unpin this Message?"
        extraClassName="pinModal"
      >
        <>
          <p className="mb-0">{t("text.common.unPinMessageText")}</p>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => setUnPinModal(false)} variant="light">
              {t("text.common.cancel")}
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => {
                setUnPinModal(false);
                setPinMessageModal(false);
              }}
              className="ms-2 ms-md-3"
            >
              {t("text.chat.unPin")}
            </CommonButton>
          </div>
        </>
      </ModalComponent>
      {/* <SweetAlert
        reverseButtons
        title={
          checkSweetAlert === 'pin'
            ? t('text.chat.pinThisChannel')
            : t('text.chat.unPinThisChannel')
        }
        text={
          checkSweetAlert === 'pin'
            ? t('text.chat.pinText')
            : t('text.chat.unPinText')
        }
        show={isAlertVisible}
        icon={t('text.common.warning')}
        showCancelButton
        confirmButtonText={
          checkSweetAlert === 'pin' ? t('text.chat.pin') : t('text.chat.unPin')
        }
        cancelButtonText={t('text.common.cancel')}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        loading={pinUnPinLoading}
        onConfirmAlert={onConfirmAlert}
      /> */}
    </>
  );
}

export default memo(Chat);
