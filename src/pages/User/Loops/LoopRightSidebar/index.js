import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { AccordionComponent, logoCreater } from "components";
import { SocketContext } from "context/socket.context";

import {
  ImageElement,
  actionFormatter,
  checkValidData,
  colorObj,
  getFullName,
  removeSessionStorage,
  textFormatter,
} from "utils";

import routesMap from "routeControl/userRouteMap";
import GlobalLoader from "components/UiElement/GlobalLoader";

function LoopRightSidebar({
  setPinChannelModal,
  onEditLoop,
  // seteditChannelModal,
  setUserRoleBlock,
  setAddParticipantsModal,
  // setDeleteLoopsModal,
  setSidebarOpenKey,
  setLoopInfoSidebar,
  setLeaveChannelModal,
  // setLeaveLoopModal,
  setDeleteChannelModal,
  chatOpen,
  setLoopId,
  setLoopStepModal,
  loopData,
  setSelectLoopRoom,
  onHandleCreateChannel,
  setCreateChannelModal,
  setChannel,
  pinChannelData,
  setNewChannelDetails,
  setManageParticipants,
  loopLoading,
  setChatDetails,
  userData,
  setCreatedBy,
}) {
  const { t } = useTranslation();
  const { socketState, socketStateHandler } = useContext(SocketContext);
  const {
    handleSelectChannel,
    handleChannelMsgRead,
    handleSetViewInChatGlobal,
  } = socketStateHandler;

  const [unreadCountArray, setUnreadCountArray] = useState([]);
  const isUserJoin = (array) => {
    const obj = array.find((user) => user.userId === userData.id);
    return obj ? obj.status === "join" : false;
  };
  const Options = (loopItem) => {
    let optionArray = [
      {
        name: t("text.createLoop.loopInfo"),
        path: "#",
        action: "confirm",
        icon: "icon-info",
        onClickHandle: () => {
          setSidebarOpenKey("infoSidebar");
          setLoopInfoSidebar(true);
          setUserRoleBlock(false);
          setLoopId(loopItem);
          setSelectLoopRoom(loopItem);
          setChatDetails(false);
        },
      },

      {
        name: t("text.createLoop.createChannel"),
        path: "#",
        action: "confirm",
        icon: "icon-create",
        onClickHandle: () => {
          onHandleCreateChannel(loopItem, "add");
        },
      },
      // {
      //   name: t("text.createLoop.leaveLoop"),
      //   path: "#",
      //   action: "confirm",
      //   icon: "icon-leave-loop",
      //   onClickHandle: () => {
      //     setLeaveLoopModal(true);
      //   },
      // },
      // {
      //   name: t("text.createLoop.deleteLoop"),
      //   path: "#",
      //   action: "confirm",
      //   icon: "icon-trash",
      //   onClickHandle: () => {
      //     setDeleteChannelModal(true);
      //     setChannel(loopItem);
      //   },
      // },
    ];
    if (userData?.id === loopItem?.user?.id) {
      optionArray.splice(1, 0, {
        name: t("text.createLoop.editLoop"),
        path: "#",
        action: "confirm",
        icon: "icon-fill-edit",
        onClickHandle: () => {
          onEditLoop(loopItem);
        },
      });
    }

    return optionArray;
  };
  const channelOptions = (item, pinned) => {
    let arr = [
      // {
      //   name: t("text.createLoop.copyChannelLink"),
      //   path: "#",
      //   action: "confirm",
      //   icon: "icon-copy",
      //   onClickHandle: () => {
      //     // setPinChannelModal(true);
      //     // setChannelId(item);
      //   },
      // },
    ];
    if (item?.channelPin === null) {
      arr = [
        ...arr,
        {
          name: t("text.createLoop.pin"),
          path: "#",
          action: "confirm",
          icon: "icon-pin",
          onClickHandle: () => {
            setPinChannelModal(true);
            setChannel(item);
          },
        },
      ];
    }
    if (
      (userData?.id === item?.createdBy || userData?.id === item?.userId) &&
      isUserJoin(item?.chatRoom?.chatRoomMembers || item?.chatRoomMembers)
    ) {
      arr.splice(0, 0, {
        name: t("text.createLoop.editChannel"),
        path: "#",
        action: "confirm",
        icon: "icon-fill-edit",
        onClickHandle: () => {
          setCreateChannelModal(true, "edit");
          onHandleCreateChannel(item, "edit");
          setChannel(item);
        },
      });
    }
    if (item?.channelPin?.id || pinned) {
      arr.splice(1, 1, {
        name: t("text.createLoop.unPin"),
        path: "#",
        action: "confirm",
        icon: "icon-pin",
        onClickHandle: () => {
          setPinChannelModal(true);
          setChannel({ ...item, pinned: true });
        },
      });
    }

    if (
      userData?.id !== (item?.userId || item?.createdBy) &&
      isUserJoin(item?.chatRoom?.chatRoomMembers || item?.chatRoomMembers)
    ) {
      arr.splice(4, 0, {
        name: t("text.createLoop.leaveChannel"),
        path: "#",
        action: "confirm",
        icon: "icon-leave-loop",
        onClickHandle: () => {
          setLeaveChannelModal(true);
          setChannel(item);
        },
      });
    }
    if (userData?.id === item?.createdBy) {
      arr.splice(5, 0, {
        name: t("text.createLoop.deleteChannel"),
        path: "#",
        action: "confirm",
        icon: "icon-trash",
        onClickHandle: () => {
          setDeleteChannelModal(true);
          setChannel(item);
        },
      });
    }
    if (isUserJoin(item?.chatRoom?.chatRoomMembers || item?.chatRoomMembers)) {
      arr.splice(3, 0, {
        name: t("text.createLoop.addParticipant"),
        path: "#",
        action: "confirm",
        icon: "icon-users",
        onClickHandle: () => {
          setNewChannelDetails(item);
          setAddParticipantsModal(true);
        },
      });
    }

    return arr;
  };

  const pinnedData = (
    <>
      {pinChannelData?.length > 0 &&
        pinChannelData.map((item, index) => {
          return (
            <AccordionComponent
              eventKey={`1.${index}`}
              itemClassName="accordion-item-left accordion-hover pinnedLoops accordion-item"
              onClick={() => {
                setSelectLoopRoom({ ...item?.chatRoom, loopDetails: item });
                chatOpen();
                setChatDetails(true);
                setLoopInfoSidebar(false);
              }}
            >
              <div className="accordionLoop">
                <Accordion.Header
                  onClick={() => {
                    if (socketState?.viewInChatGlobal) {
                      handleSetViewInChatGlobal();
                    }
                    if (
                      !socketState?.selectedChannel ||
                      socketState?.selectedChannel?.id !== item?.chatRoom?.id
                    ) {
                      handleSelectChannel({
                        ...item?.chatRoom,
                        loopDetails: item,
                      });
                      setSelectLoopRoom(item?.chatRoom);
                      setLoopInfoSidebar(false);
                      setChatDetails(true);
                    }
                    chatOpen();
                    setLoopInfoSidebar(false);
                    setManageParticipants(false);
                  }}
                >
                  <div className="userBox userBox-unread d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center">
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
                        <span>{logoCreater(item?.chatRoom?.roomName)}</span>
                      </div>
                      <div className="userBox_content">
                        <h5>{checkValidData(item?.chatRoom?.roomName)}</h5>
                        <span>
                          {checkValidData(item?.chatRoom?.loop?.name)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Accordion.Header>

                {actionFormatter(
                  channelOptions(item, "pinned"),
                  "ellipseDrop d-inline-block",
                  "icon-ellipse",
                  "d-inline-flex align-items-center",
                  "dropdown-menu-end",
                  "dropdown-item",
                  true,
                )}
              </div>
            </AccordionComponent>
          );
        })}
    </>
  );

  useEffect(() => {
    if (socketState?.unreadCount !== socketState?.selectedChannel?.id)
      setUnreadCountArray([
        ...new Set([
          ...unreadCountArray.filter(
            (item) => item !== socketState?.selectedChannel?.id,
          ),
          socketState?.unreadCount,
        ]),
      ]);
  }, [socketState?.channelNewMessage]);
  const getRoomMembersLength = (loopItem) => {
    const chatRoomMembers = loopItem?.chatRooms
      ?.map((chatRoomItem) => chatRoomItem?.chatRoomMembers)
      ?.flat?.();
    if (!chatRoomMembers?.length) return 0;
    return chatRoomMembers?.filter?.(
      (value, index, self) =>
        self?.findIndex?.((selfItem) => selfItem?.userId === value?.userId) ===
        index,
    )?.length;
  };

  const Data = (
    <>
      {loopLoading ? (
        <GlobalLoader />
      ) : loopData?.length > 0 ? (
        loopData.map((loopItem, key) => {
          return (
            <AccordionComponent
              itemClassName="accordion-item-left accordion-hover"
              eventKey={`0.${key}`}
            >
              <div className="accordionLoop">
                <Accordion.Header>
                  <div className="userBox userBox-unread d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center">
                      <div
                        className={`userAvatar userAvatar-md ${
                          loopItem?.name
                            ? colorObj?.[
                                loopItem?.name?.charAt(0).toLowerCase()
                              ]
                            : ""
                        }`}
                      >
                        <span>{logoCreater(loopItem?.name)}</span>
                      </div>
                      <div className="userBox_content">
                        <h5>{checkValidData(textFormatter(loopItem?.name))}</h5>
                        <span>
                          {getRoomMembersLength(loopItem)} Members |&nbsp;
                          {loopItem?.chatRooms?.length} Channels
                        </span>
                      </div>
                    </div>
                  </div>
                </Accordion.Header>

                {actionFormatter(
                  Options(loopItem),
                  "ellipseDrop d-inline-block",
                  "icon-ellipse",
                  "d-inline-flex align-items-center",
                  "dropdown-menu-end",
                  "dropdown-item",
                  true,
                )}
              </div>
              {loopItem?.chatRooms?.length > 0 && (
                <Accordion.Body>
                  <ul className="list-unstyled channelsList mb-0">
                    {loopItem.chatRooms.map((chatRoomItem, idx) => (
                      <li
                        key={idx}
                        className="channelsList_list"
                        // onClick={() => {
                        //   setSelectLoopRoom({
                        //     ...chatRoomItem,
                        //     loopDetails: loopItem,
                        //   });
                        //   chatOpen();
                        //   setLoopInfoSidebar(false);
                        //   setChatDetails(true);
                        // }}
                      >
                        <div className="d-flex align-items-center">
                          <Link
                            className="channelsList_list_user unRead d-flex align-items-center"
                            to={routesMap.LOOPS.path}
                            onClick={() => {
                              if (socketState?.viewInChatGlobal) {
                                handleSetViewInChatGlobal();
                              }
                              if (
                                !socketState?.selectedChannel ||
                                socketState?.selectedChannel?.id !==
                                  chatRoomItem?.id
                              ) {
                                if (chatRoomItem?.unreadCount > 0) {
                                  handleChannelMsgRead({
                                    userId: userData?.id,
                                    chatRoomId: chatRoomItem?.id,
                                  });
                                }
                                chatOpen();
                                setUnreadCountArray([
                                  ...unreadCountArray?.filter(
                                    (item) => item !== chatRoomItem?.id,
                                  ),
                                ]);
                                setChatDetails(true);
                                setLoopInfoSidebar(false);
                                setManageParticipants(false);
                                handleSelectChannel({
                                  ...chatRoomItem,
                                  loopDetails: loopItem,
                                });
                                setSelectLoopRoom(chatRoomItem);
                                setCreatedBy(loopItem?.createdBy);
                                if (
                                  document.getElementById(
                                    `unread-${chatRoomItem?.loopId}-${chatRoomItem?.id}`,
                                  ) &&
                                  unreadCountArray?.includes(chatRoomItem?.id)
                                )
                                  document.getElementById(
                                    `unread-${chatRoomItem?.loopId}-${chatRoomItem?.id}`,
                                  ).className = " ";
                                setUnreadCountArray([
                                  ...unreadCountArray?.filter(
                                    (item) => item !== chatRoomItem?.id,
                                  ),
                                ]);
                              }
                            }}
                          >
                            {chatRoomItem?.roomName}&nbsp;
                            {socketState?.selectedChannel?.id !==
                              chatRoomItem?.id &&
                              (unreadCountArray?.includes(chatRoomItem?.id) ||
                                chatRoomItem?.unreadCount > 0) && (
                                <span
                                  id={`unread-${chatRoomItem?.loopId}-${chatRoomItem?.id}`}
                                  className="unRead_dot"
                                />
                              )}
                          </Link>
                          <ul className="channelsList_action list-unstyled mb-0 d-flex align-items-center ms-auto">
                            {chatRoomItem?.chatRoomMembers?.length > 0 && (
                              <li className="channelsList_action_list">
                                <div className="chatRead text-end">
                                  <ul className="list-inline channelsList_user d-inline-block mb-0">
                                    {chatRoomItem.chatRoomMembers
                                      .slice(0, 4)
                                      .map(
                                        (
                                          chatRoomMembItem,
                                          chatRoomMembItemIdx,
                                        ) => (
                                          <>
                                            <li
                                              key={chatRoomMembItemIdx}
                                              className="list-inline-item"
                                            >
                                              <ImageElement
                                                className="img-fluid"
                                                previewSource={
                                                  chatRoomMembItem?.user
                                                    ?.profileImageUrl
                                                }
                                                crossOrigin="anonymous"
                                                alt="profile"
                                              />
                                              {chatRoomItem.chatRoomMembers
                                                .length > 4 &&
                                                chatRoomMembItemIdx === 3 && (
                                                  <Link to="#">
                                                    <span className="font-sb">
                                                      +
                                                      {
                                                        chatRoomItem.chatRoomMembers.slice(
                                                          3,
                                                        )?.length
                                                      }
                                                    </span>
                                                  </Link>
                                                )}
                                              {chatRoomMembItemIdx !== 3 && (
                                                <Tooltip
                                                  placement="bottom"
                                                  title={getFullName(
                                                    chatRoomMembItem?.user
                                                      ?.firstName,
                                                    chatRoomMembItem?.user
                                                      ?.lastName,
                                                  )}
                                                  className="bg-transparent text-dark"
                                                />
                                              )}
                                            </li>
                                          </>
                                        ),
                                      )}
                                  </ul>
                                </div>
                              </li>
                            )}
                            <li>
                              &nbsp;
                              {actionFormatter(
                                channelOptions(chatRoomItem),
                                "ellipseDrop d-inline-block",
                                "icon-ellipse",
                                "d-inline-flex align-items-center",
                                "dropdown-menu-end",
                                "dropdown-item",
                                true,
                              )}
                            </li>
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              )}
            </AccordionComponent>
          );
        })
      ) : (
        <div className="chatAside_list">
          <span className="noData font-bd h-100 d-flex align-items-center justify-content-center">
            No Loops!
          </span>
          {/* Your Loops */}
        </div>
      )}
    </>
  );

  const accordionData = [
    {
      name: "Pinned Channels",
      content: pinnedData,
      eventKey: 0,
      defaultKey: 0,
    },
    {
      name: "Your Loops",
      content: Data,
      eventKey: 1,
      defaultKey: 1,
    },
  ];
  if (!pinChannelData?.length > 0) {
    accordionData?.shift();
  }

  return (
    <>
      <div className="chatAside_list">
        {loopLoading ? (
          <GlobalLoader />
        ) : (
          accordionData?.length > 0 &&
          accordionData.map((item) => {
            return (
              <>
                {loopData?.length > 0 ? (
                  <AccordionComponent
                    defaultActiveKey={[0, 1]}
                    flush
                    eventKey={item?.eventKey}
                  >
                    <Accordion.Header>{item?.name}</Accordion.Header>

                    <Accordion.Body>{item?.content}</Accordion.Body>
                  </AccordionComponent>
                ) : (
                  <div className="chatAside_list">
                    <span className="noData font-bd h-100 d-flex align-items-center justify-content-center">
                      No Loops!
                    </span>
                    {/* Your Loops */}
                  </div>
                )}
              </>
            );
          })
        )}
      </div>
      <div className="plusIcon plusIcon-md">
        <Link
          to="#"
          onClick={() => {
            setLoopStepModal(true);
            removeSessionStorage("step1Data");
            removeSessionStorage("step2Data");
          }}
        >
          <em className="icon-plus" />
        </Link>
      </div>
    </>
  );
}

export default LoopRightSidebar;
