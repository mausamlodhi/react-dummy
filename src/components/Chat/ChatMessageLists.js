/* eslint-disable react/no-danger */
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
  memo,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { Form, Formik } from "formik";

import { Col, Dropdown, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import Picker from "@emoji-mart/react";
import { ChatServices, LoopService } from "services";
import {
  dateFormatter,
  dateToFromNowDaily,
  fileIcon,
  getChatData,
  getChatPinData,
  getFullName,
  logger,
  modalNotification,
  statusFormatter,
  userChatStatusOptions,
} from "utils";
import { SocketContext } from "context/socket.context";
import routesMap from "routeControl/userRouteMap";
import { selectUserData } from "redux/AuthSlice/index.slice";
import { highlightedText, userTagRegex } from "helpers/regex";
import { AntTextArea, Popovers } from "../Antd";
import { CommonButton, ImageElement, ModalComponent } from "../UiElement";

const PER_PAGE_MESSAGE = 15;

const lightGalleryFormat = ["jpg", "png", "gif"];

const initialState = {
  messageLists: [],
  count: 0,
  isFetchMoreLoading: false,
  currentMessagePage: 0,
  hasMoreFetch: true,
  isScrollUp: false,
  isOpenUserDetailsPopover: null,
  selectFowardFileDetails: {},
  isLoading: true,
  isLoadingViewMsg: false,
  unReadMsgUserLists: [],
  viewOnChatDetails: {
    isLoading: false,
    isFocusMsgId: null,
    currentElementScroll: 0,
    currentScrollPos: 0,
  },
};

const viewScrollInitialValues = {
  isScrollView: false,
  isScrollViewInChat: false,
};

const initialScrollQueryParamsVal = {
  UP: {},
  DOWN: {},
  scrollVisible: {
    UP: true,
    DOWN: true,
  },
};

function ChatMessageLists(props, ref) {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector(selectUserData);
  const { socket, socketState, socketStateHandler } = useContext(SocketContext);
  const {
    handleSelectReply,
    userId,
    handleCopyMessageAlert,
    handleForwardFile,
    getUserName,
    getUserValue,
    handleScrollToBottom,
    handlePinMessage,
    isMessageLoading,
    getReplyMessageName,
    participants,
    viewOnChatDetails,
    disableChat,
    handleSetViewOnChatDetails,
  } = props;
  const [state, setState] = useState(initialState);
  const {
    selectedChannel,
    channelNewMessage,
    updateMsgDetails,
    channelTypingUsers,
    newReactMsg,
    newLeftMember,
    viewInChatGlobal,
    newReadMsgUserDetails,
  } = socketState;
  const {
    getUserChatStatus,
    handleNewReactMessage,
    handleChannelReadMsg,
    handleSetViewInChatGlobal,
  } = socketStateHandler;
  const [activeDiv, setActiveDiv] = useState(null);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [viewScrollState, setViewScrollState] = useState(
    viewScrollInitialValues,
  );
  const messageListStateRef = useRef([]);
  const scrollQueryParams = useRef(initialScrollQueryParamsVal);
  const messageListRef = useRef();

  const Participants = useMemo(() => {
    if (participants?.length > 0) {
      let arr = [];
      arr = participants?.map((item) => item?.name);
      return arr;
    }
  }, [participants]);

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
  };

  const edtiMessage = (divIndex) => {
    setActiveDiv(divIndex);
  };

  const groupedDays = (messages) => {
    return messages.reduce((acc, el) => {
      const messageDay = moment(el.createdAt).format("YYYY-MM-DD");
      if (acc[messageDay]) {
        return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
      }
      return { ...acc, [messageDay]: [el] };
    }, {});
  };

  const generateItems = (messages) => {
    const days = groupedDays(messages);
    const sortedDays = Object.keys(days).sort(
      (x, y) => moment(y, "YYYY-MM-DD").unix() - moment(x, "YYYY-MM-DD").unix(),
    );
    const items = sortedDays.reduce((acc, date) => {
      const sortedMessages = days[date].sort(
        (x, y) => new Date(y.createdAt) - new Date(x.createdAt),
      );
      return acc.concat([...sortedMessages, { type: "day", date, id: date }]);
    }, []);

    return items;
  };

  const handleScrollToElement = (id, smooth = true) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollIntoView({
        block: "center",
        behavior: smooth ? "smooth" : "instant",
      });
    }
  };

  const handleMsgViewInChat = async ({
    scrollType = "",
    isNewViewChatDetails = null,
    replyMessageDetails = null,
  } = {}) => {
    let isFindMessage;

    let viewDetails =
      viewInChatGlobal || viewOnChatDetails || replyMessageDetails;

    if (isNewViewChatDetails) {
      viewDetails = isNewViewChatDetails;
    }
    const messageId =
      viewDetails?.messagePin?.messageId ||
      viewDetails?.message?.id ||
      replyMessageDetails?.messageId;

    if (scrollType === "") {
      isFindMessage = state.messageLists?.some(
        (item) => item?.id === messageId,
      );
    }
    if (isFindMessage) {
      handleStateChange({
        isLoading: false,
        viewOnChatDetails: {
          ...state.viewOnChatDetails,
          isFocusMsgId: messageId,
        },
      });
      setTimeout(() => {
        handleScrollToElement(messageId);
      }, 100);
    } else {
      let loadingKey = "";

      if (scrollType === "" || scrollType === "DOWN") {
        loadingKey = "isLoading";
      } else if (scrollType === "UP") {
        loadingKey = "isLoadingViewMsg";
      }
      await handleStateChange({
        messageLists: !viewScrollState.isScrollView ? [] : state.messageLists,
        [loadingKey]: true,
      });

      let isScrollView = true;
      setViewScrollState({
        ...viewScrollState,
        isScrollView,
      });

      const queryParams = {
        offset:
          viewDetails?.messageIndex < 15 ? 0 : viewDetails?.messageIndex - 15,
        limit: scrollType === "" ? 30 : 15,
      };

      if (scrollType === "UP") {
        if (scrollQueryParams?.current?.UP?.limit === 30) {
          queryParams.offset = scrollQueryParams?.current?.UP?.offset + 30;
        } else {
          queryParams.offset = scrollQueryParams?.current?.UP?.offset + 15;
        }

        queryParams.limit = 15;
        scrollQueryParams.current = {
          ...scrollQueryParams.current,
          UP: queryParams,
        };
      } else if (scrollType === "DOWN") {
        if (scrollQueryParams?.current?.DOWN.offset < 15) {
          queryParams.offset = 0;
          queryParams.limit = scrollQueryParams?.current?.DOWN.offset;
        } else {
          queryParams.offset = scrollQueryParams?.current?.DOWN.offset - 15;
          queryParams.limit = 15;
        }

        scrollQueryParams.current = {
          ...scrollQueryParams.current,
          DOWN: queryParams,
        };
      } else {
        scrollQueryParams.current = {
          ...scrollQueryParams.current,
          UP: queryParams,
          DOWN: queryParams,
        };
      }

      try {
        const response = await LoopService.getChatRoomMessageListsService(
          viewDetails?.message?.chatRoom?.id || selectedChannel?.id,
          queryParams,
        );
        let data = response?.data?.rows ?? [];
        if (data?.length > 0) {
          let fetchNewMessages = [
            ...(scrollType === "UP"
              ? messageListStateRef.current.filter(
                  (roomMessage) => !roomMessage.type,
                )
              : []),
            ...data,
            ...(scrollType === "DOWN"
              ? messageListStateRef.current.filter(
                  (roomMessage) => !roomMessage.type,
                )
              : []),
          ];

          if (scrollType === "") {
            setTimeout(() => {
              if (fetchNewMessages.length !== response?.data?.count) {
                setViewScrollState({
                  ...viewScrollState,
                  isScrollView,
                  isScrollViewInChat: true,
                });
              }
            }, 1500);
          }
          messageListStateRef.current = generateItems(fetchNewMessages);
          await handleStateChange({
            messageLists: generateItems(fetchNewMessages),
            hasMoreFetch:
              fetchNewMessages.length !== response?.data?.count ?? 0,
            viewOnChatDetails: {
              ...state.viewOnChatDetails,
              isFocusMsgId: messageId,
              queryParams,
            },
            [loadingKey]: false,
          });

          if (scrollType === "") {
            if (queryParams.offset === 0) {
              scrollQueryParams.current = {
                ...scrollQueryParams.current,
                scrollVisible: {
                  ...scrollQueryParams.current.scrollVisible,
                  DOWN: false,
                },
              };
            }
          }

          if (scrollType === "DOWN") {
            setTimeout(() => {
              handleScrollToElement(data?.[5]?.id, false);
            }, 500);
          }
        } else {
          handleStateChange(loadingKey, false);
        }
        if (
          scrollType !== "" &&
          (queryParams.limit !== response?.data?.rows?.length ||
            queryParams.offset === 0 ||
            !response?.data?.rows?.length)
        ) {
          scrollQueryParams.current = {
            ...scrollQueryParams.current,
            scrollVisible: {
              ...scrollQueryParams.current.scrollVisible,
              [scrollType]: false,
            },
          };
        }
        if (viewInChatGlobal) {
          handleSetViewInChatGlobal();
        }
        if (viewOnChatDetails) {
          handleSetViewOnChatDetails();
        }
      } catch (error) {
        logger(error);
        handleStateChange(loadingKey, false);
      }
      if (scrollType === "") {
        setTimeout(() => {
          handleScrollToElement(messageId);
        }, 200);
      }
    }
  };

  const getRoomMessagesList = async () => {
    if (viewOnChatDetails) {
      setTimeout(() => {
        handleMsgViewInChat({ isNewViewChatDetails: viewOnChatDetails });
      }, 1200);
      return;
    }
    if (viewInChatGlobal && !viewInChatGlobal?.type) {
      return;
    }
    let queryParams = {
      offset: initialState.currentMessagePage * PER_PAGE_MESSAGE,
      limit: PER_PAGE_MESSAGE,
    };
    const response = await LoopService.getChatRoomMessageListsService(
      selectedChannel?.id,
      queryParams,
    );
    if (response?.success) {
      socket?.emit?.("read-message", {
        userId,
        roomId: selectedChannel?.id,
      });
      const messageData =
        response?.data?.rows?.length > 0
          ? generateItems(
              response?.data.rows.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
              ),
            )
          : [];
      handleStateChange({
        messageLists: messageData,
        count: response?.data?.count ?? 0,
        isLoading: false,
        hasMoreFetch: !(response?.data?.count < PER_PAGE_MESSAGE),
        currentMessagePage: initialState.currentMessagePage + 1,
      });
    } else {
      modalNotification({ type: "error", message: "Something is wrong" });
    }
  };

  const getChatUnreadMessage = async () => {
    try {
      const response = await ChatServices.getUserChatUnreadMessageService(
        selectedChannel?.id,
      );
      if (response?.success && response?.data?.length > 0) {
        handleStateChange("unReadMsgUserLists", response?.data);
      }
    } catch (error) {
      logger(error);
    }
  };

  const generateSubHtmlContent = (content, loopName) => {
    return `<div class="d-flex align-items-center">
      <div class="chat_image position-relative me-3">
        <div class="userAvatar">
          <img class="img-fluid" src=${
            content?.user?.profileImageUrl
          } alt="profile"/>
        </div>
        <span class="statusdot statusdot-${
          userChatStatusOptions[getUserChatStatus(content?.fromId)]?.key
        }"></span>


      </div>
      <div class="userBox_content text-start overflow-hidden">
        <h5 class="font-sb text-truncate"> ${getUserName(content?.fromId)}</h5>
        ${
          selectedChannel?.type === "channel"
            ? `<p class="text-truncate">${loopName} > ${
                selectedChannel?.roomName
              } ${content?.parentMessage ? `> In chat reply </p>` : ``}`
            : ``
        }
      </div>
    </div>`;
  };

  const fetchMoreRoomMessageList = async () => {
    handleStateChange("isFetchMoreLoading", true);
    let queryParams = {
      offset: state.currentMessagePage * PER_PAGE_MESSAGE,
      limit: PER_PAGE_MESSAGE,
    };
    const response = await LoopService.getChatRoomMessageListsService(
      selectedChannel?.id,
      queryParams,
    );
    if (response?.success) {
      let fetchNewMessages = [
        ...(response?.data?.rows ?? []),
        ...state.messageLists.filter((roomMessage) => !roomMessage.type),
      ];
      handleStateChange({
        messageLists: generateItems(fetchNewMessages),
        currentMessagePage: state.currentMessagePage + 1,
        hasMoreFetch: !(fetchNewMessages.length === state.count),
      });
    } else {
      modalNotification({ type: "error", message: "Something is wrong" });
    }
    handleStateChange("isFetchMoreLoading", false);
  };

  const handleReceiveMessage = (data = {}) => {
    const receiveMsgObj = channelNewMessage || data;

    if (selectedChannel && selectedChannel?.id === receiveMsgObj?.roomId) {
      const msgObj = {
        ...(receiveMsgObj?.roomMessage ?? receiveMsgObj),
        message: receiveMsgObj.message,
        messageType: receiveMsgObj?.messageType,
        createdAt: new Date().toISOString(),
      };
      if (receiveMsgObj?.parentMessage) {
        msgObj.parentMessage = receiveMsgObj.parentMessage;
      }
      if (receiveMsgObj?.type) {
        delete msgObj.type;
      }
      let newMessageLists = [
        ...state.messageLists?.filter((message) => !message?.type),
        msgObj,
      ];
      handleStateChange({
        messageLists: generateItems(newMessageLists),
        count: state.count + 1,
      });
      handleScrollToBottom();
      if (receiveMsgObj?.fromId !== userId) {
        const readMsgEventBody = {
          userId: userData?.id,
          chatRoomId: receiveMsgObj?.roomId,
        };
        socket?.emit?.("read_message", readMsgEventBody);
      }
    }
  };

  const updateMessage = async (messageData) => {
    try {
      setActiveDiv("");
      let bodyData = {
        message: updatedMessage || messageData?.message,
      };
      const response = await LoopService.updateChatRoomMessage(
        messageData?.roomId,
        messageData?.id,
        bodyData,
      );
      if (response?.success) {
        const updateEventData = {
          userId: messageData?.fromId,
          chatRoomId: messageData?.roomId,
          messageDetails: { ...response?.data, ...bodyData },
        };
        socket?.emit?.("edit_message", updateEventData);
        setUpdatedMessage("");
        getRoomMessagesList();
      }
    } catch (error) {
      logger(error);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    handleCopyMessageAlert();
  };
  const [forwardFile, setForwardFile] = useState(false);
  const hideForwardFile = () => {
    setForwardFile(false);
  };

  const onScroll = useCallback(() => {
    if (viewScrollState.isScrollViewInChat && !state.isLoading) {
      const element = document.getElementById("scrollableDiv");

      const scrollPos = element?.scrollTop;

      const maxScrollPosition = element?.scrollHeight - element?.clientHeight;

      if (
        !state.isLoadingViewMsg &&
        scrollQueryParams.current.scrollVisible.UP &&
        (Math.abs(maxScrollPosition) === Math.abs(scrollPos) ||
          Math.abs(maxScrollPosition) - Math.abs(scrollPos) === 1)
      ) {
        handleMsgViewInChat({ scrollType: "UP" });
      } else if (
        Math.abs(scrollPos) <= 1 &&
        scrollQueryParams.current.scrollVisible.DOWN
      ) {
        handleMsgViewInChat({ scrollType: "DOWN" });
      }
    }
  }, [
    state.viewOnChatDetails,
    viewScrollState.isScrollViewInChat,
    scrollQueryParams.current.scrollVisible,
  ]);

  const onInit = useCallback((detail) => {
    const button = document.createElement("button");
    button.textContent = "San";
    const isExist = document.getElementById("lg-delete");
    if (detail && !isExist) {
      const { instance } = detail;
      LightGallery.current = instance;
      const $btn =
        '<a href="#!" class="lg-icon" id="lg-delete"><span class="icon-forward"></span></a>';
      instance.outer.find(".lg-toolbar").append($btn);
      document.getElementById("lg-delete").addEventListener("click", () => {
        handleForwardFile(state.selectFowardFileDetails);
        setForwardFile(true);
      });
    }
  }, []);

  const handleReplyClick = async (messageId) => {
    const isMessageInList = state.messageLists?.some?.(
      (item) => item?.id === messageId,
    );
    if (isMessageInList) {
      handleMsgViewInChat({ replyMessageDetails: { messageId } });
    } else {
      try {
        const response = await ChatServices.getMessageIndexService(messageId);
        if (response?.data)
          handleMsgViewInChat({ replyMessageDetails: response.data });
      } catch (error) {
        logger(error);
      }
    }
  };

  useImperativeHandle(ref, () => {
    return {
      handleMsgViewInChat,
      messageListRef: messageListRef.current,
    };
  });

  const handleSendQuickMesage = (formValues, formProps) => {
    logger({ formValues, formProps });
    formProps?.resetForm();
  };

  // const handleClickImageGallery = () => {
  //   // handleStateChange('selectFowardFileDetails', details)
  // }

  const usersTyping = useMemo(
    () =>
      channelTypingUsers?.filter?.(
        (userTypeItem) =>
          userTypeItem?.isTyping &&
          userTypeItem?.chatRoomId === selectedChannel?.id &&
          userTypeItem?.userId !== userData?.id,
      ),
    [channelTypingUsers],
  );

  const getTypingUserName = (typingUsers) => {
    let result = "";
    if (typingUsers?.length) {
      result = typingUsers.reduce(
        (acc, cur) => (acc += `${acc ? ", " : ""}${getUserName(cur?.userId)}`),
        "",
      );
    }

    return result;
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

  const handleUpdateMessage = (updateMsg) => {
    const updateMessageLists = state.messageLists?.map?.((messageListItem) =>
      messageListItem?.id === updateMsg?.messageDetails?.id
        ? { ...updateMsg?.messageDetails, user: messageListItem?.user }
        : messageListItem,
    );
    handleStateChange("messageLists", updateMessageLists);
  };

  const handleSelectMentionUser = (e) => {
    let members = [];
    const userName = e?.target?.innerText;

    if (selectedChannel?.chatRoomMembers?.length > 0) {
      members = selectedChannel.chatRoomMembers;
    } else if (selectedChannel?.chatRoom?.chatRoomMembers?.length > 0) {
      members = selectedChannel.chatRoom.chatRoomMembers;
    }

    if (members.length > 0) {
      members = members.map((item) => ({
        id: item?.userId,
        userName: `${item?.user?.firstName?.trim?.()} ${item?.user?.lastName?.trim?.()}`,
      }));

      const isFindUser = members.find((memberItem) =>
        memberItem?.userName?.includes?.(userName),
      );

      if (isFindUser && isFindUser?.id !== userData?.id) {
        const isChatPage = location.pathname.includes("/chat");
        if (!isChatPage) {
          navigate("/chat");
          handleSetViewInChatGlobal({
            type: "single",
            id: isFindUser?.id,
          });
        }
      }
    }
  };

  const getReceiveMessageDropdown = (messgeListItem) => {
    return (
      !disableChat && (
        <Dropdown className="dropdown ms-2 ms-md-2 ellipseDrop d-inline-block">
          <Dropdown.Toggle
            as="a"
            className="d-inline-flex align-items-center"
            id="dropdown-basic"
          >
            <span className="icon-ellipse" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-end">
            {messgeListItem?.message && (
              <Link
                onClick={() => handleCopyToClipboard(messgeListItem?.message)}
                className="dropdown-item"
                to="#"
              >
                <span className="icon-copy">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                Copy
              </Link>
            )}
            <Link
              className="dropdown-item"
              onClick={() => handleSelectReply(messgeListItem)}
              to="#"
            >
              <span className="icon-reply" />
              Reply
            </Link>
            <Link
              className="dropdown-item"
              onClick={() => handlePinMessage(messgeListItem?.id)}
            >
              <span className="icon-pin">
                <span className="path1" />
                <span className="path2" />
              </span>
              &nbsp;Pin
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      )
    );
  };

  const getSendMessageDropdown = (messgeListItem) => {
    return (
      !disableChat && (
        <Dropdown className="ellipseDrop d-inline-block postion-static mt-3">
          <Dropdown.Toggle
            as="a"
            className="d-inline-flex align-items-center"
            id="dropdown-basic"
          >
            <span className="icon-ellipse" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-end">
            {messgeListItem?.message && (
              <Link
                onClick={() => handleCopyToClipboard(messgeListItem?.message)}
                className="dropdown-item"
                to="#"
              >
                <span className="icon-copy">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                Copy
              </Link>
            )}
            <Link
              onClick={() => handleSelectReply(messgeListItem)}
              className="dropdown-item"
              to="#"
            >
              <span className="icon-reply" />
              Reply
            </Link>
            {messgeListItem?.messageType !== "media" && (
              <Link
                className="dropdown-item"
                onClick={() => edtiMessage(messgeListItem?.id)}
                to="#"
              >
                <span className="icon-fill-edit">
                  <span className="path1" />
                  <span className="path2" />
                </span>
                &nbsp;Edit
              </Link>
            )}
            {/* <Link className="dropdown-item">
            <span className="icon-trash">
              <em className="path1" />
              <em className="path2" />
            </span>
            Delete
          </Link> */}
            <Link
              onClick={() => handlePinMessage(messgeListItem?.id)}
              className="dropdown-item"
            >
              <span className="icon-pin">
                <span className="path1" />
                <span className="path2" />
              </span>
              &nbsp;Pin
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      )
    );
  };

  const getReactEmojiContent = (reactionData) => {
    let reactions = reactionData;

    const getFirstThreeReactDetails = () => {
      let result = [];

      reactions?.forEach((reactItem) => {
        const members =
          selectedChannel?.chatRoomMembers ||
          selectedChannel?.chatRoom?.chatRoomMembers;
        let userObj = members?.find(
          (memberItem) =>
            reactItem?.userId === (memberItem?.userId || memberItem?.id),
        );
        const findReact = result.findIndex(
          (rItem) => rItem?.reaction === reactItem?.reaction,
        );

        if (userObj?.user) {
          userObj = userObj.user;
        }

        if (findReact === -1) {
          result.push({ ...reactItem, users: userObj ? [userObj] : [] });
        } else {
          result[findReact] = {
            ...result[findReact],
            users: [...(result[findReact]?.users ?? []), userObj],
          };
        }
      });

      return result;
    };

    let morePeopleReactList = getFirstThreeReactDetails()?.slice?.(3);

    if (morePeopleReactList.length > 0) {
      morePeopleReactList = morePeopleReactList
        .map((item) =>
          item.users?.map((userItem) => ({
            reaction: item.reaction,
            ...userItem,
          })),
        )
        ?.flat?.();
    }

    return (
      <ul className="d-flex align-items-center list-inline mb-0 dropdownEmoji">
        {getFirstThreeReactDetails()
          ?.slice?.(0, 3)
          ?.map((reactionItem, idx) => (
            <Popovers
              placement="bottomLeft"
              content={
                <>
                  {reactionItem?.users?.length > 0 &&
                    reactionItem?.users?.map((userItem, userItemIdx) => (
                      <Link
                        className="dropdown-item popoversUser"
                        onClick={document.body.click()}
                        to="#"
                        key={userItemIdx}
                      >
                        <ImageElement
                          className="popoversUser_image img-fluid"
                          previewSource={userItem?.profileImageUrl}
                          alt="profile"
                        />
                        &nbsp;
                        <span className="popoversUser_name">
                          {getFullName(userItem?.firstName, userItem?.lastName)}
                        </span>
                      </Link>
                    ))}
                </>
              }
            >
              <li key={idx} className="list-inline-item dropdownEmoji_list">
                <Link
                  className="emoji"
                  onClick={() => document.body.click()}
                  to="#"
                >
                  <span className="emojiReaction h-100 w-100">
                    {reactionItem?.reaction}
                  </span>
                </Link>
              </li>
            </Popovers>
          ))}

        {morePeopleReactList?.length > 0 && (
          <li className="list-inline-item dropdownEmoji_list">
            <Popovers
              placement="bottomLeft"
              overlayClassName="dropdownEmojiList"
              content={
                <>
                  {morePeopleReactList.map((item, idx) => (
                    <div
                      key={idx}
                      className="d-flex align-item-center justify-content-center"
                    >
                      <Link
                        className="dropdown-item popoversUser"
                        onClick={document.body.click()}
                        to="#"
                      >
                        <ImageElement
                          className="popoversUser_image img-fluid"
                          previewSource={item?.profileImageUrl}
                          alt="profile"
                        />
                        <span className="popoversUser_name">
                          {getFullName(item?.firstName, item?.lastName)}
                        </span>
                      </Link>
                      <div className="ms-2 ms-md-4 ms-xl-5">
                        <Link to="#">{item?.reaction}</Link>
                      </div>
                    </div>
                  ))}
                </>
              }
            >
              <Link
                className="emoji emoji_cnt"
                onClick={document.body.click()}
                to="#"
              >
                +{morePeopleReactList?.length}
              </Link>
            </Popovers>
          </li>
        )}
      </ul>
    );
  };

  const getUnReadMsgContent = (messageId) => {
    if (!state.unReadMsgUserLists.length) {
      return null;
    }

    const unReadUserFind = state.unReadMsgUserLists.filter?.(
      (listItem) =>
        listItem?.unreadMessageId === messageId && listItem?.userId !== userId,
    );

    if (unReadUserFind?.length > 0) {
      return (
        <Dropdown className="dropdown ellipseDrop d-block text-end">
          <>
            <Dropdown.Toggle
              as="a"
              className="d-inline-flex align-items-center"
              id="dropdown-basic"
            >
              <div className="chatRead">
                <ul className="list-inline chatRead_list d-inline-block mb-0">
                  {unReadUserFind?.map((item) => {
                    const userDetails = getUserValue(item.userId, "user");
                    return (
                      <li className="list-inline-item">
                        <ImageElement
                          className="img-fluid"
                          previewSource={userDetails?.profileImageUrl}
                          alt="profile"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              {unReadUserFind.map((item, idx) => {
                const userDetails = getUserValue(item.userId, "user");
                return (
                  <Link
                    key={idx}
                    className="dropdown-item dropdownUser"
                    onClick={document.body.click()}
                    to="#"
                  >
                    <ImageElement
                      className="dropdownUser_image img-fluid"
                      previewSource={userDetails?.profileImageUrl}
                      alt="profile"
                    />
                    &nbsp;
                    <span className="dropdownUser_name">
                      {getFullName(
                        userDetails?.firstName,
                        userDetails?.lastName,
                      )}
                    </span>
                  </Link>
                );
              })}
            </Dropdown.Menu>
          </>
        </Dropdown>
      );
    }
    return null;
  };

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const handleUpdateMsgListForReact = (reactDetails) => {
    handleStateChange(
      "messageLists",
      state.messageLists.map((msgItem) =>
        msgItem.id === reactDetails?.messageId
          ? {
              ...msgItem,
              isReact: 1,
              reactions:
                msgItem?.reactions?.length > 0
                  ? msgItem?.reactions?.some(
                      (item) => item?.userId === reactDetails?.userId,
                    )
                    ? msgItem?.reactions?.map?.((reactionItem) =>
                        reactionItem?.userId === reactDetails?.userId
                          ? { ...reactionItem, ...(reactDetails ?? {}) }
                          : reactionItem,
                      )
                    : [...msgItem?.reactions, reactDetails]
                  : reactDetails
                  ? [reactDetails]
                  : [],
            }
          : msgItem,
      ),
    );
    if (newReactMsg) {
      handleNewReactMessage();
    }
  };

  const handleMsgReact = (e, messageDetails) => {
    const eventBody = {
      userId: userData?.id,
      messageId: messageDetails?.id,
      chatRoomId: messageDetails?.roomId,
      reaction: e.native,
    };

    socket?.emit?.("reactions", eventBody, (ack) => {
      if (ack?.success) {
        handleUpdateMsgListForReact(ack?.data);
        const element = document.getElementById(`emoji${messageDetails?.id}`);
        element.click();
      }
    });
  };

  const handleClickEmojiElement = (messageId) => {
    const element = document.getElementById(`emoji${messageId}`)?.parentNode;
    const className = element?.className;
    const isBlock = className?.includes?.("dropdownEmojiP-block");

    element.className = className?.replace?.(
      new RegExp(
        !isBlock && className?.includes?.("ant-popover-open")
          ? "dropdownEmojiP"
          : "dropdownEmojiP-block",
      ),
      !isBlock && className?.includes?.("ant-popover-open")
        ? "dropdownEmojiP-block"
        : "dropdownEmojiP",
    );
  };

  const getEmojiReactPickerContent = (messgeListItem) => {
    return (
      !disableChat && (
        <Popovers
          content={
            <Picker
              onEmojiClick
              autoFocus
              onEmojiSelect={(e) => {
                handleMsgReact(e, messgeListItem);
              }}
              showPreview
              emoji="point_up"
              previewPosition="none"
              // set={isWindows() ? 'google' : 'apple'}
              emojiButtonSize={28}
              emojiSize={16}
            />
          }
          trigger="click"
        >
          <Link
            onClick={(e) => {
              e.preventDefault();
              handleClickEmojiElement(messgeListItem?.id);
            }}
            className="dropdownEmojiP me-2"
          >
            <ImageElement
              className="dropdownUser_image img-fluid"
              source="activity-icon/smaile-gray.svg"
              alt="emoji"
              id={`emoji${messgeListItem?.id}`}
            />
          </Link>
        </Popovers>
      )
    );
  };

  const handleHideViewOnChatMsg = () => {
    handleStateChange("viewOnChatDetails", {
      ...state.viewOnChatDetails,
      isFocusMsgId: null,
    });
  };

  const handleNewReadMessage = (data) => {
    const user = state.unReadMsgUserLists.some(
      (item) => item?.userId === data?.userId,
    );
    const lastMessageItem = state.messageLists?.[0];

    if (lastMessageItem) {
      handleStateChange(
        "unReadMsgUserLists",
        user
          ? state.unReadMsgUserLists.map((item) =>
              item?.userId === data?.userId
                ? { ...item, unreadMessageId: lastMessageItem?.id }
                : item,
            )
          : [
              ...state.unReadMsgUserLists,
              { userId: data?.userId, unreadMessageId: lastMessageItem?.id },
            ],
      );
      handleChannelReadMsg();
    }
  };

  useEffect(() => {
    if (
      channelNewMessage &&
      Object.keys(channelNewMessage).length &&
      selectedChannel?.id === channelNewMessage?.roomId
    ) {
      handleReceiveMessage();
    }
  }, [channelNewMessage]);

  useEffect(() => {
    if (
      updateMsgDetails &&
      updateMsgDetails?.chatRoomId === selectedChannel?.id
    ) {
      handleUpdateMessage(updateMsgDetails);
    }
  }, [updateMsgDetails]);

  useEffect(() => {
    handleStateChange(initialState);
    setViewScrollState(viewScrollInitialValues);
    scrollQueryParams.current = initialScrollQueryParamsVal;
    getRoomMessagesList();
    getChatUnreadMessage();
  }, [selectedChannel?.id]);

  useEffect(() => {
    if (newReactMsg && newReactMsg?.chatRoomId === selectedChannel?.id) {
      handleUpdateMsgListForReact(newReactMsg);
    }
  }, [newReactMsg]);

  useEffect(() => {
    if (newLeftMember) {
      handleStateChange(
        "messageLists",
        generateItems([newLeftMember, ...state.messageLists]),
      );
    }
  }, [newLeftMember]);

  useEffect(() => {
    if (viewInChatGlobal && !viewInChatGlobal?.type) {
      handleMsgViewInChat();
    }
    if (viewOnChatDetails) {
      handleMsgViewInChat();
    }
  }, [viewInChatGlobal, viewOnChatDetails]);

  useEffect(() => {
    if (
      newReadMsgUserDetails &&
      newReadMsgUserDetails?.chatRoomId === selectedChannel?.id &&
      newReadMsgUserDetails?.userId !== userId
    ) {
      handleNewReadMessage(newReadMsgUserDetails);
    }
  }, [newReadMsgUserDetails]);

  return (
    <>
      <div
        onClick={() => {
          if (state.viewOnChatDetails.isFocusMsgId) {
            handleHideViewOnChatMsg();
          }
        }}
        id="scrollableDiv"
        style={{
          height: "100%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          position: "relative",
        }}
        className="chatBox"
        ref={messageListRef}
        onScroll={onScroll}
      >
        {state.isScrollUp && (
          <div className="d-flex justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
            </svg>
          </div>
        )}
        <InfiniteScroll
          dataLength={state.messageLists.length}
          inverse={!viewScrollState.isScrollViewInChat}
          hasMore={state.hasMoreFetch && !viewScrollState.isScrollView}
          loader={
            state.isFetchMoreLoading ? <Spin className="pt-1 pb-3" /> : null
          }
          scrollableTarget="scrollableDiv"
          next={() =>
            !state.isFetchMoreLoading &&
            state.hasMoreFetch &&
            !viewScrollState.isScrollView
              ? fetchMoreRoomMessageList()
              : null
          }
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "inherit",
          }}
        >
          {(isMessageLoading || state.isLoading) && (
            <Spin className="d-flex justify-content-center pb-1" />
          )}
          {state.messageLists.map((messgeListItem, idx) => (
            <div key={idx}>
              {messgeListItem?.type ? (
                <div className="chat_list">
                  <div className="text-center">
                    <span className="masInfo">
                      {dateToFromNowDaily(messgeListItem?.date)}
                    </span>
                  </div>
                </div>
              ) : messgeListItem?.messageType === "info" ? (
                <div className="chat_list userLeftmsg my-xxl-5 my-4">
                  <p className="text-center font-sb">
                    {`${messgeListItem?.message} ${dateFormatter(
                      messgeListItem?.createdAt,
                      "hh:mm",
                    )}`}
                  </p>
                </div>
              ) : messgeListItem?.fromId !== userId ? (
                <>
                  {messgeListItem?.messageType === "info" ? (
                    <div className="chat_list userLeftmsg my-xxl-5 my-4">
                      <p className="text-center font-sb">
                        {messgeListItem?.message}
                      </p>
                    </div>
                  ) : (
                    <div
                      key={messgeListItem?.id}
                      id={messgeListItem?.id}
                      className={` chat_list ${
                        messgeListItem?.parentMessage
                          ? "msgReply"
                          : "msgReceived"
                      } d-flex align-items-start`}
                    >
                      <Popovers
                        placement="bottomLeft"
                        content={
                          <>
                            <div className="pUserInfo">
                              <div className="pUserInfo_top">
                                <div className="d-flex align-items-start">
                                  <div className="userAvatar userAvatar-lg">
                                    <ImageElement
                                      className="img-fluid"
                                      previewSource={
                                        selectedChannel?.type === "single"
                                          ? getUserValue(
                                              messgeListItem?.fromId,
                                              "user.profileImageUrl",
                                            ) ||
                                            getChatData(
                                              selectedChannel?.fromUser,
                                              selectedChannel?.toUser,
                                              "image",
                                              userData,
                                            )
                                          : getUserValue(
                                              messgeListItem?.fromId,
                                              "user.profileImageUrl",
                                            )
                                      }
                                      crossOrigin="anonymous"
                                      alt="profile"
                                    />
                                  </div>
                                  <div className="userBox_content">
                                    <h5 className="font-bd mb-0">
                                      {getUserName(messgeListItem?.fromId)}
                                    </h5>
                                    <span
                                      className={`font-sb status ${
                                        userChatStatusOptions[
                                          getUserChatStatus(
                                            messgeListItem?.fromId,
                                          )
                                        ]?.key
                                      }`}
                                    >
                                      {
                                        userChatStatusOptions[
                                          getUserChatStatus(
                                            messgeListItem?.fromId,
                                          )
                                        ]?.label
                                      }
                                    </span>
                                    <ul className="chatHead_toolsList list-inline mb-0">
                                      <li className="list-inline-item">
                                        <Link
                                          className="chatHead_toolsList_icon"
                                          to="#"
                                        >
                                          <em className="icon icon-video">
                                            <em className="path1" />
                                            <em className="path2" />
                                          </em>
                                        </Link>
                                      </li>
                                      <li className="list-inline-item">
                                        <Link
                                          to="#"
                                          className="chatHead_toolsList_icon d-flex align-item-center"
                                        >
                                          <em className="icon icon-phone" />
                                        </Link>
                                      </li>
                                      {selectedChannel?.type !== "single" && (
                                        <li className="list-inline-item">
                                          <Link
                                            className="chatHead_toolsList_icon d-flex align-item-center"
                                            to="#"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              singleChat(
                                                messgeListItem?.fromId,
                                              );
                                            }}
                                          >
                                            <em className="icon icon-chat">
                                              <em className="path1" />
                                              <em className="path2" />
                                            </em>
                                          </Link>
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="pUserInfo_center">
                                <h6 className="font-bd">Contact</h6>
                                <ul className="list-unstyled pUserInfo_list mb-0">
                                  <li className="d-flex pe-none">
                                    <span
                                      className={`status ${
                                        userChatStatusOptions[
                                          getUserChatStatus(
                                            messgeListItem?.fromId,
                                          )
                                        ]?.key
                                      }`}
                                    >
                                      <em className="icon-check" />
                                    </span>
                                    &nbsp;
                                    <span className="info">
                                      {
                                        userChatStatusOptions[
                                          getUserChatStatus(
                                            messgeListItem?.fromId,
                                          )
                                        ]?.label
                                      }
                                    </span>
                                  </li>
                                  <li className="mailCopy d-flex align-items-center">
                                    <em className="icon icon-phone" />
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                      <span className="info">
                                        {selectedChannel?.type === "single"
                                          ? getUserValue(
                                              messgeListItem?.fromId,
                                              "user.phoneNumber",
                                            ) ||
                                            getChatData(
                                              selectedChannel?.fromUser,
                                              selectedChannel?.toUser,
                                              "number",
                                              userData,
                                            ) ||
                                            "-"
                                          : getUserValue(
                                              messgeListItem?.fromId,
                                              "user.phoneNumber",
                                            ) || "-"}
                                      </span>
                                      <Link
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleCopyToClipboard(
                                            getUserValue(
                                              messgeListItem?.fromId,
                                              "user.phoneNumber",
                                            ) ||
                                              getChatData(
                                                selectedChannel?.fromUser,
                                                selectedChannel?.toUser,
                                                "number",
                                                userData,
                                              ),
                                          );
                                        }}
                                        className="ms-2"
                                      >
                                        <span className="icon-copy">
                                          <em className="path1" />
                                          <em className="path2" />
                                        </span>
                                      </Link>
                                    </div>
                                  </li>
                                  <li className="pe-none">
                                    <em className="icon icon-tesla-corporation">
                                      <span className="path1" />
                                      <span className="path2" />
                                    </em>
                                    &nbsp;
                                    <span className="info">
                                      {getUserValue(
                                        messgeListItem?.fromId,
                                        "user.companyName",
                                      ) || "-"}
                                    </span>
                                  </li>
                                  <li className="mailCopy d-flex align-items-center">
                                    <span className="icon icon-email">
                                      <span className="path1" />
                                      <span className="path2" />
                                    </span>
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                      <span className="info">
                                        {selectedChannel?.type === "single"
                                          ? getUserValue(
                                              messgeListItem?.fromId,
                                              "user.email",
                                            ) ||
                                            getChatData(
                                              selectedChannel?.fromUser,
                                              selectedChannel?.toUser,
                                              "email",
                                              userData,
                                            ) ||
                                            "-"
                                          : getUserValue(
                                              messgeListItem?.fromId,
                                              "user.email",
                                            ) || "-"}
                                      </span>
                                      <Link
                                        className="ms-2"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleCopyToClipboard(
                                            getUserValue(
                                              messgeListItem?.fromId,
                                              "user.email",
                                            ),
                                          );
                                        }}
                                      >
                                        <span className="icon-copy">
                                          <em className="path1" />
                                          <em className="path2" />
                                        </span>
                                      </Link>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              {selectedChannel?.type !== "single" &&
                                !disableChat && (
                                  <div className="pUserInfo_bottom">
                                    <Formik
                                      initialValues={{ description: "" }}
                                      onSubmit={(formValues, formProps) =>
                                        handleSendQuickMesage(
                                          formValues,
                                          formProps,
                                        )
                                      }
                                    >
                                      {(formikProps) => (
                                        <Form>
                                          <Row>
                                            <Col sm="12">
                                              <div className="form-group">
                                                <div className="form-control-wrap">
                                                  <AntTextArea
                                                    id="description"
                                                    className="form-control"
                                                    name="description"
                                                    disabled={false}
                                                    variant="standard"
                                                    type="description"
                                                    placeholder="Send a quick message"
                                                    value={
                                                      formikProps.values
                                                        .description
                                                    }
                                                    setFieldValue={
                                                      formikProps.handleChange
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </Col>
                                            <Col sm="12 text-end">
                                              <CommonButton
                                                type="submit"
                                                disabled={
                                                  !formikProps.values
                                                    .description
                                                }
                                                className="btn btn-secondary btn-sm"
                                              >
                                                Send
                                              </CommonButton>
                                            </Col>
                                          </Row>
                                        </Form>
                                      )}
                                    </Formik>
                                  </div>
                                )}
                            </div>
                          </>
                        }
                      >
                        <div
                          onClick={() => {
                            handleStateChange(
                              "isOpenUserDetailsPopover",
                              messgeListItem?.fromId,
                            );
                          }}
                          className="chat_image position-relative"
                        >
                          <div className="userAvatar">
                            <ImageElement
                              className="img-fluid"
                              previewSource={
                                selectedChannel?.type === "single"
                                  ? selectedChannel?.fromUser
                                    ? getChatData(
                                        selectedChannel?.fromUser,
                                        selectedChannel?.toUser,
                                        "image",
                                        userData,
                                      )
                                    : getChatPinData(
                                        selectedChannel?.chatRoomMembers,
                                        "image",
                                        userData,
                                      )
                                  : getUserValue(
                                      messgeListItem?.fromId,
                                      "user.profileImageUrl",
                                    ) ||
                                    getChatData(
                                      selectedChannel?.fromUser,
                                      selectedChannel?.toUser,
                                      "image",
                                    )
                              }
                              alt="profile"
                              crossOrigin="anonymous"
                            />
                          </div>
                          <span
                            className={
                              selectedChannel?.type === "single"
                                ? statusFormatter(
                                    getUserChatStatus(messgeListItem?.fromId),
                                    "dotStatus",
                                  )
                                : `statusdot statusdot-${
                                    userChatStatusOptions[
                                      getUserChatStatus(messgeListItem?.fromId)
                                    ]?.key
                                  }`
                            }
                          />
                        </div>
                      </Popovers>

                      <div className="chat_content">
                        {messgeListItem?.parentMessage ? (
                          <Link className="d-flex align-items-center justify-content-center">
                            <div>
                              <div
                                className={`msg msg_received ${
                                  state.viewOnChatDetails.isFocusMsgId ===
                                  messgeListItem?.id
                                    ? "border border-primary border-1 rounded"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleReplyClick(
                                    messgeListItem.parentMessage?.id,
                                  );
                                }}
                              >
                                <div className="d-flex align-items-center">
                                  <div className="icon">
                                    <em className="icon-reply-right" />
                                  </div>

                                  <div className="content">
                                    <h5 className="name">
                                      {getFullName(
                                        messgeListItem?.user?.firstName,
                                        messgeListItem?.user?.lastName,
                                      )}
                                      &nbsp;
                                      <span className="time">
                                        {moment(
                                          messgeListItem?.createdAt,
                                        ).format("hh:mm")}
                                      </span>
                                    </h5>
                                    {messgeListItem?.parentMessage?.message ? (
                                      <h6
                                        onClick={handleSelectMentionUser}
                                        dangerouslySetInnerHTML={{
                                          __html: highlightedText(
                                            Participants?.join("*"),
                                            messgeListItem?.parentMessage
                                              ?.message,
                                          ),
                                        }}
                                      />
                                    ) : (
                                      <h6
                                        onClick={handleSelectMentionUser}
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            getReplyMessageName(
                                              messgeListItem?.parentMessage,
                                            ) &&
                                            getReplyMessageName(
                                              messgeListItem?.parentMessage,
                                            )?.replace?.(
                                              userTagRegex,
                                              (match) =>
                                                `<span class="text-primary">${match}</span>`,
                                            ),
                                        }}
                                      />
                                    )}

                                    {messgeListItem?.message && (
                                      <span
                                        onClick={handleSelectMentionUser}
                                        dangerouslySetInnerHTML={{
                                          __html: highlightedText(
                                            Participants?.join("*"),
                                            messgeListItem?.message,
                                          ),
                                        }}
                                      />
                                    )}
                                    {messgeListItem?.isReact === 1 &&
                                      messgeListItem?.reactions?.length > 0 &&
                                      getReactEmojiContent(
                                        messgeListItem?.reactions ?? [],
                                      )}
                                  </div>
                                </div>
                                {messgeListItem?.messageMedia?.length > 0 &&
                                  messgeListItem.messageMedia.map(
                                    (msgMediaItem, msgMediaItemIdx) => (
                                      <div
                                        key={msgMediaItemIdx}
                                        className="pb-2 pt-2"
                                      >
                                        {lightGalleryFormat.includes(
                                          msgMediaItem?.mediaType,
                                        ) ? (
                                          <LightGallery
                                            onInit={onInit}
                                            speed={500}
                                            counter={false}
                                            addClass="chatImgView"
                                            mobileSettings="showCloseIcon: true, download: true"
                                            plugins={[lgZoom]}
                                          >
                                            <a
                                              href={msgMediaItem?.mediaImageUrl}
                                              data-sub-html={generateSubHtmlContent(
                                                messgeListItem,
                                                selectedChannel?.loopDetails
                                                  ?.name,
                                              )}
                                            >
                                              <ImageElement
                                                className="img-fluid image"
                                                previewSource={
                                                  msgMediaItem?.mediaImageUrl
                                                }
                                                alt="image"
                                              />
                                            </a>
                                          </LightGallery>
                                        ) : (
                                          <Link
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleOpenFile(
                                                msgMediaItem?.mediaImageUrl,
                                              );
                                            }}
                                          >
                                            {fileIcon?.[msgMediaItem.mediaType]
                                              ?.file && (
                                              <ImageElement
                                                source={`files-icons/${
                                                  fileIcon?.[
                                                    msgMediaItem.mediaType
                                                  ]?.file
                                                }`}
                                                alt="upload-document"
                                              />
                                            )}
                                            &nbsp;{msgMediaItem?.mediaName}
                                          </Link>
                                        )}
                                      </div>
                                    ),
                                  )}
                              </div>
                              {getUnReadMsgContent(messgeListItem?.id)}
                            </div>
                            {getReceiveMessageDropdown(messgeListItem)}
                            {getEmojiReactPickerContent(messgeListItem)}
                          </Link>
                        ) : (
                          !messgeListItem?.parentMessage &&
                          messgeListItem?.message &&
                          !messgeListItem?.messageMedia?.length && (
                            <>
                              <div className="d-flex justify-content-start">
                                <div className="username">
                                  {getFullName(
                                    messgeListItem?.user?.firstName,
                                    messgeListItem?.user?.lastName,
                                  )}

                                  <span className="time">
                                    {moment(messgeListItem?.createdAt).format(
                                      "hh:mm",
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-start justify-content-start position-relative">
                                <div>
                                  <div
                                    className={`msg msg_received text-break d-flex align-items-start justify-content-start ${
                                      state.viewOnChatDetails.isFocusMsgId ===
                                      messgeListItem?.id
                                        ? "border border-primary border-1 rounded"
                                        : ""
                                    }`}
                                  >
                                    <span
                                      onClick={handleSelectMentionUser}
                                      dangerouslySetInnerHTML={{
                                        __html: highlightedText(
                                          Participants?.join("*"),
                                          messgeListItem?.message,
                                        ),
                                      }}
                                    />
                                    {messgeListItem?.isReact === 1 &&
                                      messgeListItem?.reactions?.length > 0 &&
                                      getReactEmojiContent(
                                        messgeListItem?.reactions ?? [],
                                      )}
                                  </div>
                                  {getUnReadMsgContent(messgeListItem?.id)}
                                </div>
                                {messgeListItem?.isEdited === 1 && (
                                  <div className="icon me-2 mx-2">
                                    <em className="icon-edit">
                                      <em className="path1" />
                                      <em className="path2" />
                                    </em>
                                  </div>
                                )}

                                {getReceiveMessageDropdown(messgeListItem)}
                                {getEmojiReactPickerContent(messgeListItem)}
                              </div>
                            </>
                          )
                        )}

                        {!messgeListItem?.parentMessage &&
                          messgeListItem?.messageType === "media" &&
                          messgeListItem?.messageMedia?.length > 0 && (
                            <>
                              <div className="d-flex align-items-center justify-content-start">
                                <div className="username">
                                  {getFullName(
                                    messgeListItem?.user?.firstName,
                                    messgeListItem?.user?.lastName,
                                  )}
                                  <span className="time">
                                    {moment(messgeListItem?.createdAt).format(
                                      "hh:mm",
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end align-items-start position-relative">
                                <div>
                                  <div
                                    className={`msg msg_received ${
                                      state.viewOnChatDetails.isFocusMsgId ===
                                      messgeListItem?.id
                                        ? "border border-primary border-1 rounded"
                                        : ""
                                    }`}
                                  >
                                    {messgeListItem?.message && (
                                      <div className="d-flex align-items-start justify-content-start">
                                        {messgeListItem?.message && (
                                          <div
                                            className="msg msg_received text-break"
                                            onClick={handleSelectMentionUser}
                                            dangerouslySetInnerHTML={{
                                              __html: highlightedText(
                                                Participants?.join("*"),
                                                messgeListItem?.message,
                                              ),
                                            }}
                                          />
                                        )}
                                      </div>
                                    )}
                                    {messgeListItem.messageMedia.map(
                                      (msgMediaItem, msgMediaItemIdx) => (
                                        <div
                                          key={msgMediaItemIdx}
                                          className="d-flex justify-content-start align-items-start pb-2 pt-2"
                                        >
                                          {lightGalleryFormat.includes(
                                            msgMediaItem?.mediaType,
                                          ) ? (
                                            <LightGallery
                                              onInit={onInit}
                                              speed={500}
                                              counter={false}
                                              addClass="chatImgView"
                                              mobileSettings="showCloseIcon: true, download: true"
                                              plugins={[lgZoom]}
                                            >
                                              <a
                                                href={
                                                  msgMediaItem?.mediaImageUrl
                                                }
                                                data-sub-html={generateSubHtmlContent(
                                                  messgeListItem,
                                                  selectedChannel?.loopDetails
                                                    ?.name,
                                                )}
                                              >
                                                <ImageElement
                                                  className="img-fluid image"
                                                  previewSource={
                                                    msgMediaItem?.mediaImageUrl
                                                  }
                                                  alt="image"
                                                />
                                              </a>
                                            </LightGallery>
                                          ) : (
                                            <Link
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleOpenFile(
                                                  msgMediaItem?.mediaImageUrl,
                                                );
                                              }}
                                            >
                                              {fileIcon?.[
                                                msgMediaItem.mediaType
                                              ]?.file && (
                                                <ImageElement
                                                  source={`files-icons/${
                                                    fileIcon?.[
                                                      msgMediaItem.mediaType
                                                    ]?.file
                                                  }`}
                                                  alt="upload-document"
                                                />
                                              )}
                                              &nbsp;{msgMediaItem?.mediaName}
                                            </Link>
                                          )}
                                        </div>
                                      ),
                                    )}
                                    {messgeListItem?.isReact === 1 &&
                                      messgeListItem?.reactions?.length > 0 &&
                                      getReactEmojiContent(
                                        messgeListItem?.reactions ?? [],
                                      )}
                                  </div>
                                  {getUnReadMsgContent(messgeListItem?.id)}
                                </div>
                                {getReceiveMessageDropdown(messgeListItem)}
                                {getEmojiReactPickerContent(messgeListItem)}
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  id={messgeListItem?.id}
                  className={`position-relative chat_list ${
                    messgeListItem?.parentMessage ? "msgReply" : "msgSend"
                  } d-flex align-items-start justify-content-end`}
                >
                  {activeDiv === messgeListItem?.id ? (
                    <div className="chat_list msgSend d-flex align-items-start justify-content-end ">
                      <div className="chat_content">
                        <div className="chatEditor chatEditor-Editmsg m-0">
                          <div className="d-flex align-items-center">
                            <div className="chatEditor_center pl-2">
                              <div className="d-flex align-items-center form-control-wrap">
                                <span
                                  className="icon-close mx-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setActiveDiv(null)}
                                />
                                <Formik
                                  initialValues={{
                                    edit: messgeListItem?.message || "",
                                  }}
                                  onSubmit={(formValues) =>
                                    updateMessage(formValues, messgeListItem)
                                  }
                                >
                                  {() => (
                                    <Form>
                                      <div>
                                        <textarea
                                          rows={1}
                                          name="edit"
                                          defaultValue={messgeListItem?.message}
                                          placeholder="Write your message"
                                          className="form-control ps-1"
                                          style={{ border: "none" }}
                                          onChange={(e) =>
                                            setUpdatedMessage(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Form>
                                  )}
                                </Formik>
                              </div>
                            </div>
                            <div className="chatEditor_right">
                              <ul className="list-inline action mb-0">
                                {/* <li className="list-inline-item actionList">
                                <Link className="icon">
                                  <span className="icon-smiley"
                                    
                                  >
                                    <span className="path1"><></></span>
                                    <span className="path2"><></></span>
                                  </span>
                                </Link>
                              </li> */}
                                <li className="list-inline-item actionList">
                                  <Link
                                    className="icon send"
                                    onClick={() =>
                                      updateMessage(messgeListItem)
                                    }
                                  >
                                    <em className="icon-send">
                                      <></>
                                    </em>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`chat_content ${
                        activeDiv === messgeListItem?.id ? "active" : ""
                      }`}
                    >
                      <div className="d-flex align-items-center justify-content-end">
                        <>
                          {messgeListItem?.parentMessage ? (
                            <Link className="d-flex align-items-start">
                              <div className="m-auto position-relative">
                                {getEmojiReactPickerContent(messgeListItem)}
                              </div>
                              <div>
                                <div
                                  className={`${
                                    state.viewOnChatDetails.isFocusMsgId ===
                                    messgeListItem?.id
                                      ? "border border-primary border-1 rounded "
                                      : ""
                                  }msg msg_send d-flex flex-column align-items-end justify-content-end`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleReplyClick(
                                      messgeListItem.parentMessage?.id,
                                    );
                                  }}
                                >
                                  <div className="d-flex align-items-center">
                                    <div className="icon">
                                      <em className="icon-reply-right" />
                                    </div>
                                    {messgeListItem?.isEdited === 1 && (
                                      <Link to="#" className="icon me-2">
                                        <em className="icon-edit">
                                          <em className="path1" />
                                          <em className="path2" />
                                        </em>
                                      </Link>
                                    )}
                                    <div className="content d-flex flex-column align-items-end justify-content-end">
                                      <h5 className="name">
                                        &nbsp;
                                        <span className="time">
                                          {moment(
                                            messgeListItem?.createdAt,
                                          ).format("hh:mm")}
                                        </span>
                                      </h5>
                                      {messgeListItem?.parentMessage && (
                                        <>
                                          {messgeListItem?.parentMessage
                                            ?.message ? (
                                            <h6
                                              onClick={handleSelectMentionUser}
                                              dangerouslySetInnerHTML={{
                                                __html: highlightedText(
                                                  Participants?.join("*"),
                                                  messgeListItem?.parentMessage
                                                    ?.message,
                                                ),
                                              }}
                                            />
                                          ) : (
                                            <h6
                                              onClick={handleSelectMentionUser}
                                              dangerouslySetInnerHTML={{
                                                __html: getReplyMessageName(
                                                  messgeListItem?.parentMessage,
                                                )?.replace?.(
                                                  userTagRegex,
                                                  (match) =>
                                                    `<span class="text-primary">${match}</span>`,
                                                ),
                                              }}
                                            />
                                          )}
                                        </>
                                      )}
                                      {messgeListItem?.message && (
                                        <span
                                          onClick={handleSelectMentionUser}
                                          dangerouslySetInnerHTML={{
                                            __html: highlightedText(
                                              Participants?.join("*"),
                                              messgeListItem?.message,
                                            ),
                                          }}
                                        />
                                      )}
                                      {messgeListItem?.isReact === 1 &&
                                        messgeListItem?.reactions?.length > 0 &&
                                        getReactEmojiContent(
                                          messgeListItem?.reactions ?? [],
                                        )}
                                    </div>
                                  </div>
                                  {messgeListItem?.messageMedia?.length > 0 &&
                                    messgeListItem.messageMedia.map(
                                      (msgMediaItem, msgMediaItemIdx) => (
                                        <div
                                          key={msgMediaItemIdx}
                                          className="pb-2 pt-2"
                                        >
                                          {lightGalleryFormat.includes(
                                            msgMediaItem?.mediaType,
                                          ) ? (
                                            <LightGallery
                                              onInit={onInit}
                                              speed={500}
                                              counter={false}
                                              addClass="chatImgView"
                                              mobileSettings="showCloseIcon: true, download: true"
                                              plugins={[lgZoom]}
                                              // onPosterClick={() =>
                                              //   handleClickImageGallery(messgeListItem)
                                              // }
                                            >
                                              <a
                                                href={
                                                  msgMediaItem?.mediaImageUrl
                                                }
                                                data-sub-html={generateSubHtmlContent(
                                                  messgeListItem,
                                                  selectedChannel?.loopDetails
                                                    ?.name,
                                                )}
                                              >
                                                <ImageElement
                                                  className="img-fluid image"
                                                  previewSource={
                                                    msgMediaItem?.mediaImageUrl
                                                  }
                                                  alt="image"
                                                />
                                              </a>
                                            </LightGallery>
                                          ) : (
                                            <Link
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleOpenFile(
                                                  msgMediaItem?.mediaImageUrl,
                                                );
                                              }}
                                            >
                                              {fileIcon?.[
                                                msgMediaItem.mediaType
                                              ]?.file && (
                                                <ImageElement
                                                  source={`files-icons/${
                                                    fileIcon?.[
                                                      msgMediaItem.mediaType
                                                    ]?.file
                                                  }`}
                                                  alt="upload-document"
                                                />
                                              )}
                                              &nbsp;{msgMediaItem?.mediaName}
                                            </Link>
                                          )}
                                        </div>
                                      ),
                                    )}
                                </div>
                                {getUnReadMsgContent(messgeListItem?.id)}
                              </div>
                              {getSendMessageDropdown(messgeListItem)}
                            </Link>
                          ) : (
                            !messgeListItem?.parentMessage &&
                            messgeListItem?.message &&
                            !messgeListItem?.messageMedia?.length && (
                              <div>
                                <div className="d-flex justify-content-end">
                                  <div className="username">
                                    <span className="time">
                                      {moment(messgeListItem?.createdAt).format(
                                        "hh:mm",
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end">
                                  {getEmojiReactPickerContent(messgeListItem)}

                                  {messgeListItem?.isEdited === 1 && (
                                    <div className="icon me-2">
                                      <em className="icon-edit">
                                        <em className="path1" />
                                        <em className="path2" />
                                      </em>
                                    </div>
                                  )}
                                  <div
                                    className={`msg msg_send text-break ${
                                      state.viewOnChatDetails.isFocusMsgId ===
                                      messgeListItem?.id
                                        ? "border border-primary border-1 rounded"
                                        : ""
                                    }`}
                                  >
                                    <span
                                      onClick={handleSelectMentionUser}
                                      dangerouslySetInnerHTML={{
                                        __html: highlightedText(
                                          Participants?.join("*"),
                                          messgeListItem?.message,
                                        ),
                                      }}
                                    />
                                    {messgeListItem?.isReact === 1 &&
                                      messgeListItem?.reactions?.length > 0 &&
                                      getReactEmojiContent(
                                        messgeListItem?.reactions ?? [],
                                      )}
                                  </div>
                                </div>
                                {getUnReadMsgContent(messgeListItem?.id)}
                              </div>
                            )
                          )}
                        </>
                        {!messgeListItem?.parentMessage &&
                          messgeListItem?.message?.length > 0 &&
                          !messgeListItem?.messageMedia?.length &&
                          getSendMessageDropdown(messgeListItem)}
                      </div>

                      {!messgeListItem?.parentMessage &&
                        messgeListItem?.messageType === "media" &&
                        messgeListItem?.messageMedia?.length > 0 && (
                          <>
                            <div className="d-flex align-items-center justify-content-end mx-3">
                              <div className="username">
                                <span className="time">
                                  {moment(messgeListItem?.createdAt).format(
                                    "hh:mm",
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end align-items-start">
                              {getEmojiReactPickerContent(messgeListItem)}
                              <div>
                                <div
                                  className={`msg msg_send ${
                                    state.viewOnChatDetails.isFocusMsgId ===
                                    messgeListItem?.id
                                      ? "border border-primary border-1 rounded"
                                      : ""
                                  }`}
                                >
                                  {messgeListItem?.message && (
                                    <div className="d-flex align-items-center justify-content-end">
                                      <div
                                        onClick={handleSelectMentionUser}
                                        className="msg msg_send text-break"
                                        dangerouslySetInnerHTML={{
                                          __html: highlightedText(
                                            Participants?.join("*"),
                                            messgeListItem?.message,
                                            messgeListItem?.mentionedUsers,
                                          ),
                                        }}
                                      />
                                    </div>
                                  )}
                                  {messgeListItem.messageMedia.map(
                                    (msgMediaItem, msgMediaItemIdx) => (
                                      <div
                                        key={msgMediaItemIdx}
                                        className="d-flex justify-content-end align-items-end pb-2 pt-2"
                                      >
                                        {lightGalleryFormat.includes(
                                          msgMediaItem?.mediaType,
                                        ) ? (
                                          <>
                                            <LightGallery
                                              onInit={onInit}
                                              speed={500}
                                              counter={false}
                                              addClass="chatImgView"
                                              mobileSettings="showCloseIcon: true, download: true"
                                              plugins={[lgZoom]}
                                              // onPosterClick={() =>
                                              //   handleClickImageGallery(messgeListItem)
                                              // }
                                            >
                                              <a
                                                href={
                                                  msgMediaItem?.mediaImageUrl
                                                }
                                                data-sub-html={generateSubHtmlContent(
                                                  messgeListItem,
                                                  selectedChannel?.loopDetails
                                                    ?.name,
                                                )}
                                              >
                                                <ImageElement
                                                  className="img-fluid image"
                                                  previewSource={
                                                    msgMediaItem?.mediaImageUrl
                                                  }
                                                  alt="image"
                                                />
                                              </a>
                                            </LightGallery>
                                          </>
                                        ) : (
                                          <Link
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleOpenFile(
                                                msgMediaItem?.mediaImageUrl,
                                              );
                                            }}
                                          >
                                            {fileIcon?.[msgMediaItem.mediaType]
                                              ?.file && (
                                              <ImageElement
                                                source={`files-icons/${
                                                  fileIcon?.[
                                                    msgMediaItem.mediaType
                                                  ]?.file
                                                }`}
                                                alt="upload-document"
                                              />
                                            )}
                                            &nbsp;{msgMediaItem?.mediaName}
                                          </Link>
                                        )}
                                      </div>
                                    ),
                                  )}
                                  {messgeListItem?.isReact === 1 &&
                                    getReactEmojiContent(
                                      messgeListItem?.reactions ?? [],
                                    )}
                                </div>
                                {getUnReadMsgContent(messgeListItem?.id)}
                              </div>
                              {getSendMessageDropdown(messgeListItem)}
                            </div>
                          </>
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {state.isLoadingViewMsg && (
            <Spin className="d-flex justify-content-center pb-1 mt-10" />
          )}
        </InfiniteScroll>
      </div>
      {usersTyping?.length > 0 && usersTyping && (
        <div className="chat_list msgTyping d-flex align-items-center ms-3">
          <ul className="list-inline channelsList_user d-inline-block mb-0">
            {usersTyping.slice(0, 3).map((_, idx) => (
              <li key={idx} className="list-inline-item">
                {/* <ImageElement
                  className='img-fluid'
                  previewSource={getUserValue(userTypeItem?.userId, [
                    "user",
                    "profileImageUrl",
                  ])}
                  crossOrigin='anonymous'
                  alt='profile'
                /> */}
                {usersTyping.length > 4 && (
                  <span className="font-sb">
                    {usersTyping?.slice?.(3)?.length}
                  </span>
                )}
              </li>
            ))}
          </ul>
          &nbsp;
          <div className="chat_content">
            <div className="d-flex align-items-center">
              <div className="username mb-md-0">
                <small>
                  {getTypingUserName(usersTyping)}
                  &nbsp;is typing
                </small>
                <span className="typing ms-2">
                  <span className="typingDot" />
                  <span className="typingDot" />
                  <span className="typingDot" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalComponent
        backdrop
        show={forwardFile}
        onHandleCancel={hideForwardFile}
        size="md"
        title="Forward"
        extraClassName="newChatModal newChatModal-sendfile"
        titleClassName="m-0"
      >
        <div className="newUser_filter d-flex align-items-center ">
          <div className="searchBox me-0">
            <div className="form-group mb-0">
              <div className="form-control-wrap">
                <input
                  className="form-control"
                  placeholder="Search Channel and People"
                  type="text"
                  icon={
                    <div className="form-icon">
                      <em className="icon-search" />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <h6 className="newUser_heading font-sb">Suggested</h6>
        <div className="newUser">
          <div className="userBox userBox-pin d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <div className="userAvatar grey">
                <span>MR</span>
              </div>
              <div className="userBox_content">
                <h5 className="font-sb">General</h5>
                <span>Michigan Rescue </span>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
          <div className="userBox userBox-pin d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <div className="userAvatar grey">
                <span>MR</span>
              </div>
              <div className="userBox_content">
                <h5 className="font-sb">Search and rescue</h5>
                <span>Michigan Rescue </span>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
          <div className="userBox userBox-pin d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <div className="userAvatar grey">
                <span>MR</span>
              </div>
              <div className="userBox_content">
                <h5 className="font-sb">Recovery</h5>
                <span>Michigan Rescue </span>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
          <div className="userBox userBox-pin d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <div className="userAvatar grey">
                <span>MR</span>
              </div>
              <div className="userBox_content">
                <h5 className="font-sb">Recovery</h5>
                <span>Michigan Rescue </span>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
        </div>
        <h6 className="newUser_heading font-sb mt-2 mt-md-3">People</h6>
        <div className="newUser">
          <div className="newUser_list d-flex align-items-center justify-content-between">
            <div className="user d-flex align-items-center">
              <div className="userImage position-relative">
                <div className="userAvatar flex-shrink-0">
                  <ImageElement source="profile/profile06.jpg" alt="user" />
                </div>
                <span className="statusdot statusdot-available">
                  <></>
                </span>
              </div>
              <div className="user_info ms-2 ms-md-3 overflow-hidden">
                <h5 className="font-sb text-truncate mb-0">Annei Posted</h5>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
          <div className="newUser_list d-flex align-items-center justify-content-between">
            <div className="user d-flex align-items-center">
              <div className="userImage position-relative">
                <div className="userAvatar flex-shrink-0">
                  <ImageElement source="profile/profile08.jpg" alt="user" />
                </div>
                <span className="statusdot statusdot-away">
                  <></>
                </span>
              </div>
              <div className="user_info ms-2 ms-md-3 overflow-hidden">
                <h5 className="font-sb text-truncate mb-0">Brian Beaulieu</h5>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
          <div className="newUser_list d-flex align-items-center justify-content-between">
            <div className="user d-flex align-items-center">
              <div className="userImage position-relative">
                <div className="userAvatar flex-shrink-0">
                  <ImageElement source="profile/profile01.jpg" alt="user" />
                </div>
                <span className="statusdot statusdot-available">
                  <></>
                </span>
              </div>
              <div className="user_info ms-2 ms-md-3 overflow-hidden">
                <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
          <div className="newUser_list d-flex align-items-center justify-content-between">
            <div className="user d-flex align-items-center">
              <div className="userImage position-relative">
                <div className="userAvatar flex-shrink-0">
                  <ImageElement source="profile/profile01.jpg" alt="user" />
                </div>
                <span className="statusdot statusdot-available">
                  <></>
                </span>
              </div>
              <div className="user_info ms-2 ms-md-3 overflow-hidden">
                <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
              </div>
            </div>
            <Link className="btn btn-md btn-info">Send</Link>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

export default memo(forwardRef(ChatMessageLists));
