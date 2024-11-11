import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  memo,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import socketio from "socket.io-client";

import config from "config";
import { userChatStatusOptions } from "utils";
import IdleTimeout from "components/IdleTimeout";
import { handleUpdateOnlineUser } from "redux/ChatSlice/index.slice";

export const SocketContext = createContext({});

const initialState = {
  selectedChannel: null,
  channelTypingUsers: [],
  channelNewMessage: null,
  channelOnlineMembers: [],
  isUserFocus: false,
  timeoutTime: 60,
  newParticipantRequest: null,
  joinNewMember: null,
  updateMsgDetails: null,
  newReactMsg: null,
  newLeftMember: null,
  viewInChatGlobal: null,
  meetingStartedEvent: null,
  meetingEndEvent: null,
  newReadMsgUserDetails: null,
  unreadCount: 0,
  activityCount: 0,
  unreadStatus: false,
  unreadActivity: false,
  unreadMessageCounts: [],
};

function SocketProvider({ onlineUsers, children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const [state, setState] = useState(initialState);
  const activityCountRef = useRef(0);
  const userChatCountRef = useRef([]);

  const socket = useMemo(() => {
    if (userData?.token) {
      return socketio(config.API_BASE_URL.replace("/api", ""), {
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 20,
        forceNew: true,
        query: {
          token: `Bearer ${userData?.token}`,
        },
        transports: ["websocket", "polling"],
      });
    }
  }, {});

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
  };

  const handleSelectChannel = useCallback((channel) => {
    handleStateChange("selectedChannel", channel);
  }, []);

  const handleUsersTyping = (typingUser) => {
    handleStateChange("channelTypingUsers", [
      ...new Set([...state.channelTypingUsers, typingUser]),
    ]);
  };

  const handleAddChannelNewMessage = (newMessage) => {
    handleStateChange("channelNewMessage", newMessage);
  };

  const handleUpdateUnreadCount = (id) => {
    handleStateChange("unreadCount", id);
  };

  const handleUpdateOnlineMembers = (members, isNewMember) => {
    handleStateChange(
      "channelOnlineMembers",
      isNewMember
        ? !state.channelOnlineMembers?.some?.(
            (item) => item?.userId === isNewMember?.userId
          )
          ? [...state.channelOnlineMembers, isNewMember]
          : state.channelOnlineMembers.map((item) =>
              item?.userId === isNewMember?.userId ? isNewMember : item
            )
        : members
    );
  };

  const handleLeftMember = (members) => {
    handleStateChange("newLeftMember", members);
  };

  const isUserOnline = (userId) => {
    return state.channelOnlineMembers.some(
      (memberItem) => memberItem.userId === userId
    );
  };
  const handleParticipantRequest = (data) => {
    handleStateChange("newParticipantRequest", data);
  };

  const handleUpdateChannelDetails = (data) => {
    handleStateChange("selectedChannel", data);
  };

  const handleJoinNewMember = (data) => {
    handleStateChange("joinNewMember", data || null);
  };
  const handleMeetingJoin = (data) => {
    handleStateChange("meetingStartedEvent", data);
  };
  const handleMeetingEndEvent = (data) => {
    handleStateChange("meetingEndEvent", data);
  };

  const handleSetViewInChatGlobal = (data) => {
    handleStateChange("viewInChatGlobal", data || null);
  };

  const getUserChatStatus = useCallback(
    (userId, chatRoomMembers) => {
      let tempUserId = userId;

      if (chatRoomMembers) {
        tempUserId = chatRoomMembers?.find(
          (item) => item?.userId !== userData?.id
        )?.user?.id;
      }

      return onlineUsers[tempUserId] || "offline";
    },
    [onlineUsers]
  );

  const handleRegisterUser = () => {
    let registerDetails = {
      userId: userData?.id,
      name: `${userData?.firstName} ${userData?.lastName}`,
      userImage: userData?.profileImageUrl,
    };
    if (socket) {
      socket.emit("register", registerDetails);
      if (userData?.id) {
        socket.emit("join_chat_room", userData?.id);
      }
    }
  };

  const handleOnUserIdle = (status) => {
    const onlineStatus = status === "active" ? "online" : "away";
    const statusOption = userChatStatusOptions[onlineStatus];

    socket?.emit(
      "chat_status_update",
      {
        userId: userData?.id,
        chatStatusId: statusOption.id,
      },
      (ack) => {
        if (ack?.success) {
          dispatch(handleUpdateOnlineUser({ [userData?.id]: onlineStatus }));
        }
      }
    );
    socket?.off();
  };

  const handleChannelMsgRead = (readDetails) => {
    socket?.emit("read_message", readDetails);
  };

  const handleNewReactMessage = (reactDetails) => {
    handleStateChange("newReactMsg", reactDetails || null);
  };

  const handleChannelReadMsg = (data) => {
    handleStateChange("newReadMsgUserDetails", data || null);
  };

  const handleActivityCount = async (data, count) => {
    if (data?.flag === 0) {
      activityCountRef.current = count;
      handleStateChange("activityCount", count);
    } else if (data?.flag === 1) {
      activityCountRef.current = count - 1;
      handleStateChange("activityCount", count - 1);
    } else if (
      data?.parentMessage !== undefined ||
      data?.tagUserId !== undefined ||
      data?.reaction !== undefined
    ) {
      activityCountRef.current += 1;
      handleStateChange("activityCount", activityCountRef.current);
      handleStateChange("unreadActivity", !state.unreadActivity);
    }
  };

  const handleReceiveChatStatus = (data) => {
    const statusObj = Object.values(userChatStatusOptions).find(
      (val) => val.id === data?.chatStatusId
    );
    const statusKey = statusObj?.key;
    if (statusKey) {
      dispatch(handleUpdateOnlineUser({ [data?.userId]: statusKey }));
    }
  };

  const handleUnreadMessageCounts = (array, id) => {
    let arr = {};
    if (array.length > 0) {
      array.forEach((item) => {
        const chatRoomId = item?.chatRoom?.id;
        const unreadCount = item?.chatRoom?.unreadCount;
        if (chatRoomId !== undefined && unreadCount !== undefined) {
          arr[chatRoomId] = unreadCount;
        }
      });
      handleStateChange("unreadMessageCounts", arr);
      userChatCountRef.current = arr;
    }
    if (id) {
      userChatCountRef.current[id] += 1;
      handleStateChange("unreadMessageCounts", userChatCountRef?.current);
    }
  };

  useEffect(() => {
    if (socket) {
      handleRegisterUser();
      return () => socket.disconnect();
    }
  }, [userData]);

  useEffect(() => {
    if (socket) {
      socket.on("typing", (data) => {
        handleUsersTyping(data);
      });

      socket.on("new_msg_receive", (data) => {
        handleActivityCount(data);
        handleAddChannelNewMessage(data);
        handleUpdateUnreadCount(data?.roomId);
        handleUnreadMessageCounts([], data?.roomId);
      });

      socket.on("participant_request_receive", (data) => {
        handleParticipantRequest(data);
      });
      socket.on("join_new_member", (data) => {
        if (
          !state.channelOnlineMembers.some(
            (onlineMember) => onlineMember?.userId === data?.userId
          )
        ) {
          handleStateChange({
            channelTypingUsers: state.channelTypingUsers?.filter?.(
              (item) => item?.userId === data?.userId
            ),
          });
        }
      });

      socket.on("join_single_member", (data) => {
        handleJoinNewMember(data);
      });

      socket.on("edit_message", (data) => {
        handleStateChange("updateMsgDetails", data);
      });

      socket.on("left_chat_room", (data) => {
        handleLeftMember(data);
      });

      socket.on("receive_chat_status", (data) => {
        handleReceiveChatStatus(data);
      });

      socket.on("react_to_message", (data) => {
        handleActivityCount(data);
        handleNewReactMessage(data);
      });

      socket.on("read_message_received", (data) => {
        handleChannelReadMsg(data);
      });

      socket.on("meeting_started", (data) => {
        console.log("meeting_started", data);
        handleMeetingJoin(data);
        handleAddChannelNewMessage(data?.roomMessage);
      });

      socket.on("meeting_ended", (data) => {
        console.log("meeting_ended", data);
        handleMeetingEndEvent(data);
        handleAddChannelNewMessage(data?.roomMessage);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (state.selectedChannel) {
      handleStateChange("selectedChannel", null);
    }
  }, [location.pathname]);

  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape") {
        if (state.selectedChannel) {
          handleStateChange("selectedChannel", null);
        }
      }
    },
    [state.selectedChannel]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const valuesObj = {
    socket,
    socketState: state,
    socketStateHandler: {
      handleSelectChannel,
      handleAddChannelNewMessage,
      getUserChatStatus,
      handleUpdateOnlineMembers,
      handleChannelMsgRead,
      isUserOnline,
      handleUpdateChannelDetails,
      handleNewReactMessage,
      handleSetViewInChatGlobal,
      handleMeetingEndEvent,
      handleMeetingJoin,
      handleChannelReadMsg,
      handleJoinNewMember,
      handleActivityCount,
      handleUnreadMessageCounts,
    },
  };

  const values = useMemo(() => valuesObj, [state, onlineUsers]);

  return (
    <SocketContext.Provider value={values}>
      <IdleTimeout
        timeout={60000}
        onIdle={handleOnUserIdle}
        isLogin={!!userData?.token}
      >
        {children}
      </IdleTimeout>
    </SocketContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    onlineUsers: state?.chat?.onlineUsers ?? {},
  };
};

export default connect(mapStateToProps)(memo(SocketProvider));
