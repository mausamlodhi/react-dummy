import React, { useState, useEffect, useContext, useMemo } from "react";
import { Accordion, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { t } from "i18next";
import {
  actionFormatter,
  logger,
  nameFormatter,
  totalTimeDifference,
} from "utils";
import { ActivityService } from "services";
import { SocketContext } from "context/socket.context";
import {
  AccordionComponent,
  AudioCall,
  GlobalLoader,
  ImageElement,
  NoDataFound,
  Switch,
  checkValidData,
} from "components";
import LoopsSidebar from "../Loops/LoopsSidebar";
import ChatBlank from "../ChatBlank/index.page";
import LoopsChatBox from "../Loops/LoopsChatBox";

function Activity() {
  const { socketState, socketStateHandler } = useContext(SocketContext);
  const { handleSetViewInChatGlobal, handleSelectChannel , handleActivityCount } = socketStateHandler;
  const [loopsData, setLoopsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [firstTimeFetch, setFirstTimeFetch] = useState(false);
  const [setChatInfoOpen] = useState(false);
  const [sidebarOpenKey, setSidebarOpenKey] = useState("");
  const [audioCall, setAudioCall] = useState(false);
  const [chatDetails, setChatDetails] = useState(false);
  const { selectedChannel , activityCount,unreadActivity } = socketState;
  const [count, setCount] = useState(0);
  const [currentChannelPage, setCurrentChannelPage] = useState(1);
  const [channelNotesLength, setChannelNotesLength] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const perPageData = 10;
  const [selectLoopRoom, setSelectLoopRoom] = useState(null);
  const [disableChat, setDisableChat] = useState([]);
  const [readActivityArray, setReadActivityArray] = useState([]);
  const { pathname } = useLocation();
  const [ activityState , setActivityState] = useState(true);
  const [initial , setInitial] = useState(false);
  const [activityHead, setActivityHead] = useState(true);
  const getActivityList = async (messageTypes) => {
      setLoopsData([]);
    try {
      let queryParams = {
        messageType: messageTypes?.flag === 1 ? "" :messageTypes,
        status: `${switchValue ? "unread" : ""}`,
      };
      if(!messageTypes?.flag){
        setLoading(true);
        setLoopsData([]);
      }
      if (loopsData?.length <= count) {
        const res = await ActivityService.getActivityService(queryParams);
        if (res?.success) {
          setLoopsData(res?.data?.rows);
          setCount(res?.data?.count);
          setChannelNotesLength(res?.data?.rows?.length);
          setCurrentChannelPage(0);
          setReadActivityArray([]);
        }
      }
      setLoading(false);
    } catch (error) {
      logger(error);
    }
    if(!messageTypes?.flag)
      setLoading(false);
  };

  const getMoreActibityList = async (messageTypes, newPage) => {
    try {
      let queryParams = {
        messageType: messageTypes,
        offset: newPage * perPageData,
        status: `${switchValue ? "unread" : ""}`,
        limit: perPageData,
      };
      if (loopsData?.length <= count) {
        const response = await ActivityService.getActivityService(queryParams);
        if (response?.success) {
          setLoopsData([...loopsData, ...(response?.data?.rows ?? [])]);
          setCount(response?.data?.count ?? 0);
          setChannelNotesLength(response?.data?.rows?.length);
        }
        if (newPage) setCurrentChannelPage(newPage);
      }
    } catch (error) {
      logger(error);
    }
  };

  const readActivity = async (id, readStatus) => {
    try {
      let bodyData = { readStatus };
      handleActivityCount({flag :1}, activityCount);
      const res = await ActivityService.readUnreadActivity(id, bodyData);
      if (res?.success) {
        setReadActivityArray([...readActivityArray, id]);
      }else{
        handleActivityCount({flag :0}, activityCount)
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(()=>{
    setActivityState(true);
    if((activityCount !== count && pathname === "/activity" && activityState)|| !activityCount ){
      setInitial(!initial);
      if(!activityCount && activityCount)
        getActivityList()
    }
    if(!initial)
      getActivityList();
  },[activityCount,unreadActivity])

  useEffect(() => {
    if (messageType) {
      getActivityList(messageType);
    }
  }, [messageType]);

  useEffect(() => {
    setFirstTimeFetch(true);
  }, []);

  const options = () => {
    let arr = [
      {
        name: t("text.activity.mentions"),
        path: "#",
        action: "confirm",
        icon: "icon-fill-tag",
        path3: true,
        onClickHandle: () => {
          setMessageType("tag");
        },
      },
      {
        name: t("text.activity.replies"),
        path: "#",
        action: "confirm",
        icon: "icon-reply",
        onClickHandle: () => {
          setMessageType("reply");
        },
      },
      {
        name: t("text.activity.reactions"),
        path: "#",
        action: "confirm",
        icon: "icon-smiley",
        onClickHandle: () => {
          setMessageType("react");
        },
      },
    ];
    return arr;
  };

  useEffect(() => {
    if(initial){
      getActivityList();
    }
  }, [switchValue]);

  useEffect(() => {
    if (loopsData?.length > 0 && firstTimeFetch) {
      let obj = { ...loopsData?.[0]?.activity?.chatRoom };
      obj.id = loopsData?.[0]?.activity?.chatRoom?.id;
      obj.loopId = loopsData?.[0]?.activity?.loop?.id;
      obj.chatRoomMessage = loopsData?.[0]?.activity?.chatRoomMessage;
      obj.loop = loopsData?.[0]?.activity?.loop;
      obj.activityId = loopsData?.[0]?.activity?.id;
      obj.activityData = {
        id: loopsData?.[0]?.activity?.id,
        readStatus: loopsData?.[0]?.activity?.readStatus,
      };
      obj.fromUser = loopsData?.[0]?.activity?.fromUser;
      obj.createdAt = loopsData?.[0]?.activity?.createdAt;
      obj.type = loopsData?.[0]?.activity?.chatRoom?.type;
      obj.chatRoom = loopsData?.[0]?.activity?.chatRoom;
      setChatDetails(true);
      handleSelectChannel(obj);
      // setSelectLoopRoom(arr);
      if (loopsData?.[0]?.activity?.readStatus === "unread") {
        readActivity(
          obj?.activityData?.id,
          obj?.activityData?.readStatus === "unread" && "read",
        );
      }
    }
    setFirstTimeFetch(false);
  }, [loopsData, firstTimeFetch]);

  let chats = useMemo(() => {
    let arr = [];
    loopsData?.forEach((item) => {
      let obj = {};
      obj.id = item?.activity?.chatRoom?.id;
      obj.loopId = item?.activity?.loop?.id;
      obj.chatRoomMessage = item?.activity?.chatRoomMessage;
      obj.loop = item?.activity?.loop;
      obj.activityId = item?.activity?.id;
      obj.activityData = {
        id: item?.activity?.id,
        readStatus: item?.activity?.readStatus,
      };
      obj.fromUser = item?.activity?.fromUser;
      obj.createdAt = item?.activity?.createdAt;
      obj.roomName = item?.activity?.chatRoom?.roomName;
      obj.type = item?.activity?.chatRoom?.type;
      obj.messageReact = item?.activity?.messageReact ?? {};
      obj.chatRoom = item?.activity?.chatRoom;
      obj.messageIndex = item?.messageIndex;
      arr.push(obj);
    });
    return arr;
  }, [loopsData]);

  useEffect(() => {
    if (selectLoopRoom?.chatRoomMembers?.length > 0) {
      let arr = [];
      selectLoopRoom?.chatRoomMembers?.map((item) => {
        return item?.status === "left" && arr.push(item?.userId);
      });
      setDisableChat(arr);
    }
  }, [selectLoopRoom]);
  return (
    <>
      <div className="chatPage">
        <>
          <aside className="chatAside">
            <div className="chatAsideHead d-flex align-items-center">
              <h3 className="chatAsideHead_heading mb-0">
                {t("text.activity.activity")}
              </h3>
              <div className="d-flex align-items-end ms-auto">
                <div className="chatAside_switch d-flex align-items-end">
                  <Switch onChange={() => {
                    setInitial(true)
                    setSwitchValue(!switchValue)
                  }} />{" "}
                  <span className="info">Unread</span>
                </div>
              </div>
              <div className="chatAsideHead_icons">
                {actionFormatter(
                  options("e"),
                  "dropdown ms-1 ms-md-2 ellipseDrop d-inline-block ",
                  "icon-filter text-info",
                  "d-inline-flex align-items-center",
                  "dropdown-menu-end ms-auto",
                  "dropdown-item",
                  true,
                )}
              </div>
            </div>

            {!loading ? (
              <>
                {loopsData?.length > 0 ? (
                  <div
                    id="sidebarScrollableDiv"
                    className="chatAside_list chatAside_list-activity"
                  >
                    <AccordionComponent defaultActiveKey={0} eventKey={0} show>
                      <Accordion.Header
                        onClick={()=>setActivityHead(!activityHead)}
                      >
                        {" "}
                        {t("text.activity.recent")}
                      </Accordion.Header>
                      <InfiniteScroll
                        dataLength={currentChannelPage * perPageData}
                        hasMore={loopsData?.length !== count && activityHead}
                        next={() =>
                          channelNotesLength < count &&
                          getMoreActibityList(
                            messageType,
                            currentChannelPage + 1,
                          )
                        }
                        scrollableTarget="sidebarScrollableDiv"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          overflow: "inherit",
                        }}
                        loader={<Spin className="mt-4" />}
                      >
                        <Accordion.Body
                        //  onScroll={onScroll}
                        
                        >
                          {loading ? (
                            <GlobalLoader />
                          ) : chats?.length > 0 ? (
                            chats.map((item, index) => {
                              return (
                                <AccordionComponent
                                  defaultActiveKey={0}
                                  eventKey={index}
                                  itemClassName="accordion-item-left pinnedLoops"
                                 
                                >
                                  <div className="accordionLoop">
                                    <Accordion.Header
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setChatDetails(true);
                                        handleSetViewInChatGlobal({
                                          messageIndex: item?.messageIndex,
                                          message: {
                                            ...item,
                                            ...item.chatRoomMessage,
                                          },
                                        });
                                        if (
                                          !selectedChannel ||
                                          selectedChannel?.id !== item.channelId
                                        ) {
                                          handleSelectChannel(item);
                                        }
                                        setSelectLoopRoom(item?.chatRoom);
                                        setSidebarOpenKey("");
                                        if (
                                          item?.activityData?.readStatus ===
                                          "unread"
                                        ) {
                                          readActivity(
                                            item?.activityId,
                                            item?.activityData?.readStatus ===
                                              "unread" && "read",
                                          );
                                        }
                                      }}
                                    >
                                      <div
                                        className={`userBox ${
                                          !readActivityArray.includes(
                                            item?.activityData?.id,
                                          ) &&
                                          item?.activityData?.readStatus ===
                                            "unread"
                                            ? "userBox-recent"
                                            : "unread "
                                        } d-flex align-items-start justify-content-between w-100`}
                                      >
                                        <div className="d-flex align-items-start w-100">
                                          <div className="userBox_image">
                                            <div className="userAvatar userAvatar-md">
                                              <ImageElement
                                                previewSource={
                                                  item?.fromUser
                                                    ?.profileImageUrl
                                                }
                                                alt="profile"
                                              />
                                            </div>
                                            <span className="activityStatus">
                                              {Object.keys(
                                                item?.messageReact ?? {},
                                              ).length > 0 ? (
                                                <ImageElement
                                                  source="activity-icon/smaile.svg"
                                                  alt="profile"
                                                />
                                              ) : (
                                                <span
                                                  className={`icon icon-${
                                                    item?.chatRoomMessage
                                                      ?.parentMessageId
                                                      ? "reply-outline"
                                                      : "tag"
                                                  }`}
                                                />
                                              )}
                                            </span>
                                          </div>
                                          <div className="userBox_content w-100">
                                            <div className="d-flex align-items-end w-100">
                                              <h5>
                                                {nameFormatter(
                                                  item?.fromUser?.firstName,
                                                  item?.fromUser?.lastName,
                                                )}
                                              </h5>
                                              <span className="ms-auto flex-shrink-0 me-2">
                                                {totalTimeDifference(
                                                  item?.createdAt,
                                                )}
                                              </span>
                                            </div>
                                            <h6 className="mb-0">
                                              {Object.keys(
                                                item?.messageReact?.reaction ??
                                                  {},
                                              ).length > 0
                                                ? item?.messageReact?.reaction
                                                : checkValidData(
                                                    item?.chatRoomMessage
                                                      ?.message,
                                                  )}
                                            </h6>
                                            {item?.type !== "single" && (
                                              <span>
                                                {checkValidData(
                                                  item?.loop?.name,
                                                )}{" "}
                                                &gt;{" "}
                                                {checkValidData(item?.roomName)}{" "}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </Accordion.Header>
                                    {!readActivityArray.includes(
                                      item?.activityData?.id,
                                    ) &&
                                      item?.activityData?.readStatus ===
                                        "unread" && (
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
                                              onClick={() => {
                                                setChatDetails(true);
                                                handleSelectChannel(item);
                                                setSidebarOpenKey("");
                                                // setLoopInfoSidebar(false);
                                                // setManageParticipants(false);
                                                if (
                                                  item?.activityData
                                                    ?.readStatus === "unread"
                                                ) {
                                                  readActivity(
                                                    item?.activityId,
                                                    item?.activityData
                                                      .readStatus ===
                                                      "unread" && "read",
                                                  );
                                                }
                                              }}
                                              to="#"
                                            >
                                              <span className="icon-mark-read">
                                                <span className="path1" />
                                                <span className="path2" />
                                                <span className="path3" />
                                                <span className="path4" />
                                                <span className="path5" />
                                              </span>{" "}
                                              {t("text.activity.markAsRead")}
                                            </Link>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      )}
                                  </div>
                                </AccordionComponent>
                              );
                            })
                          ) : (
                            <NoDataFound />
                          )}{" "}
                        </Accordion.Body>
                      </InfiniteScroll>{" "}
                    </AccordionComponent>
                  </div>
                ) : (
                  <div className="chatAside_list">
                    <span className="noData font-bd h-100 d-flex align-items-center justify-content-center">
                      No Activities!
                    </span>
                    {/* Your Loops */}
                  </div>
                )}
              </>
            ) : (
              <GlobalLoader />
            )}
          </aside>

          {socketState?.selectedChannel ? (
            <div className={`chatRight ${chatDetails ? "chatRight-open" : ""}`}>
              <LoopsChatBox
                handleCloseChat={() => setChatDetails(false)}
                // singleChat
                disableChat={disableChat}
              />
            </div>
          ) : (
            <div className="chatRight position-relative ">
              <ChatBlank
                Ptext="You will see @mentions, reactions and other notifications here."
                // getLoops={loopDatas}
                // getLoopData={getLoopData}
                // loopIdData={loopIdData}
              />
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
          />
        </>
      </div>
    </>
  );
}

export default Activity;
