import React, { useContext, useEffect, useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import AgoraRTC from "agora-rtc-sdk-ng";
import userRoutesMap from "routeControl/userRouteMap";
import { logoCreater } from "components/Formatter";
import { selectUserData, updateCallData } from "redux/AuthSlice/index.slice";
import {
  ImageElement,
  colorObj,
  getDevices,
  getFullName,
  modalNotification,
  statusFormatter,
  userChatStatusOptions,
} from "utils";
import { SocketContext } from "context/socket.context";
import { CommonButton } from "components/UiElement";
// import { CommonButton } from "../UiElement";
function ChatHeader(props) {
  const { socketStateHandler, socketState } = useContext(SocketContext);
  const { meetingStartedEvent, selectedChannel, meetingEndEvent } = socketState;

  const {
    roomName,
    handleCloseChat,
    setChatInfoOpen,
    // setSidebarOpenKey,
    setAudioCall,
    disableChat,
  } = props;

  const { getUserChatStatus, handleMeetingJoin } = socketStateHandler;
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [startCall, setStartCall] = useState(null);
  const [endCall, setEndCall] = useState(null);
  let callStart = localStorage.getItem("callStart");

  const userData = useSelector(selectUserData);

  let chatRoomMembers = [];

  if (selectedChannel?.chatRoomMembers) {
    chatRoomMembers = selectedChannel?.chatRoomMembers;
  } else if (selectedChannel?.chatRoom?.chatRoomMembers) {
    chatRoomMembers = selectedChannel?.chatRoom?.chatRoomMembers;
  }

  useEffect(() => {
    if (meetingStartedEvent?.chatRoomId) {
      setStartCall(meetingStartedEvent);
      setEndCall(null);
    }
    if (meetingEndEvent?.chatRoomId) {
      setStartCall(null);
      handleMeetingJoin(null);
      setEndCall(meetingEndEvent);
    }
  }, [meetingStartedEvent, meetingEndEvent]);

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
        name = fromUser?.chatStatus?.status;
        return name;
      } else {
        name = toUser?.chatStatus?.status;
      }
    } else if (type === "loggedInUser") {
      if (fromUser?.id === userData?.id) {
        name = getFullName(fromUser?.firstName, fromUser?.lastName);
        return name;
      } else {
        name = getFullName(toUser?.firstName, toUser?.lastName);
      }
    } else if (fromUser?.id !== userData?.id) {
      name = getFullName(fromUser?.firstName, fromUser?.lastName);
      return name;
    } else {
      name = getFullName(toUser?.firstName, toUser?.lastName);
    }
    return name;
  };
  const getChatPinData = (val, type) => {
    let name = "";
    if (type === "image") {
      let data = val?.find((item) => item?.userId !== userData?.id);
      name = data?.user?.profileImageUrl;
      return name;
    } else if (type === "name") {
      let data = val?.find((item) => item?.userId !== userData?.id);
      name = getFullName(data?.user?.firstName, data?.user?.lastName);
      return name;
    } else if (type === "status") {
      let data = val?.find((item) => item?.userId !== userData?.id);
      name = data?.user?.chatStatus?.status;
      return name;
    }
    return name;
  };
  const checkDevices = async (type) => {
    let device = await getDevices();
    if (
      device?.audio?.length > 0 &&
      device?.video?.length > 0 &&
      type === "video"
    ) {
      let data = {
        channelId: selectedChannel?.id,
        channelName: selectedChannel?.code,
        roomName:
          selectedChannel?.type === "single"
            ? getChatData(
                selectedChannel?.fromUser,
                selectedChannel?.toUser || {},
                "loggedInUser",
              )
            : selectedChannel?.roomName,
        imageURL:
          selectedChannel?.type === "single"
            ? getChatData(
                selectedChannel?.fromUser,
                selectedChannel?.toUser || {},
                "image",
              )
            : "",
        backURL: location?.pathname,
        callType: selectedChannel?.type,
        type: meetingStartedEvent?.userId ? "inComing" : "outGoing",
      };
      dispatch(updateCallData(data));
      // navigate(userRoutesMap.VIDEO.path);
      window.open(
        userRoutesMap.VIDEO.path,
        "com_MyDomain_myWindowForThisPurpose",
        "",
      );
      // window.open(userRoutesMap.VIDEO.path);
    } else if (device?.audio?.length > 0 && type === "audio") {
      setAudioCall(true);
    } else {
      modalNotification({
        type: "error",
        message: "Please check your device connection",
      });
    }
  };
  return (
    <div className="chatHead">
      <div className="userBox d-flex align-items-center justify-content-between w-100 p-0">
        {selectedChannel?.type === "single" ||
        selectedChannel?.type === "me" ? (
          <div className="d-flex align-items-center">
            <Link
              className="link-primary me-2 d-block d-lg-none"
              onClick={() => handleCloseChat()}
              to="#"
            >
              <em className="icon icon-back">
                <em className="path1" />
                <em className="path2" />
              </em>
            </Link>
            <div className="userAvatar userAvatar-md danger">
              <ImageElement
                previewSource={
                  selectedChannel?.type === "me"
                    ? userData?.profileImageUrl
                    : selectedChannel?.fromUser
                    ? getChatData(
                        selectedChannel?.fromUser,
                        selectedChannel?.toUser || {},
                        "image",
                      )
                    : getChatPinData(chatRoomMembers, "image")
                }
                alt="profile"
              />
            </div>
            <div className="userBox_content">
              <h5>
                {selectedChannel?.type === "me"
                  ? `${userData?.firstName} ${userData?.lastName}`
                  : selectedChannel?.fromUser
                  ? getChatData(
                      selectedChannel?.fromUser,
                      selectedChannel?.toUser,
                      "name",
                    )
                  : getChatPinData(chatRoomMembers, "name")}
              </h5>
              <span
                className={`font-sb status ${
                  userChatStatusOptions[
                    getUserChatStatus(selectedChannel?.createdBy)
                  ]?.key
                }`}
              >
                {selectedChannel?.type === "me"
                  ? statusFormatter(
                      getUserChatStatus(selectedChannel?.createdBy),
                      "profileStatus",
                    )
                  : statusFormatter(
                      getUserChatStatus(null, chatRoomMembers),
                      "profileStatus",
                    )}
              </span>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <Link
              className="link-primary me-2 d-block d-lg-none"
              onClick={() => handleCloseChat()}
            >
              <em className="icon icon-back">
                <em className="path1" />
                <em className="path2" />
              </em>
            </Link>
            <div
              className={`userAvatar userAvatar-md  ${
                roomName ? colorObj?.[roomName?.charAt(0).toLowerCase()] : ""
              } `}
            >
              <span>{logoCreater(roomName)}</span>
            </div>
            <div className="userBox_content">
              <h5>{roomName}</h5>
              <span>
                {selectedChannel?.chatRoomMembers?.length ||
                  selectedChannel?.chatRoom?.chatRoomMembers?.length}{" "}
                Participants
              </span>
            </div>
          </div>
        )}

        {selectedChannel?.type !== "me" && !disableChat && (
          <ul className="ms-2 ms-sm-3 ms-xl-5 chatHead_toolsList list-inline mb-0 d-flex align-items-center">
            {startCall?.chatRoomId !== selectedChannel?.id &&
            parseInt(callStart) !== selectedChannel?.id ? (
              <li className="list-inline-item">
                <Link
                  className="chatHead_toolsList_icon"
                  // to={userRoutesMap.VIDEO.path}
                  onClick={(e) => {
                    e.preventDefault();
                    checkDevices("video");
                  }}
                >
                  <em className="icon icon-video">
                    <em className="path1" />
                    <em className="path2" />
                  </em>
                </Link>
              </li>
            ) : (
              ""
            )}
            {startCall?.chatRoomId !== selectedChannel?.id &&
            parseInt(callStart) !== selectedChannel?.id ? (
              <li className="list-inline-item">
                <Link
                  className="chatHead_toolsList_icon"
                  onClick={(e) => {
                    e.preventDefault();
                    checkDevices("audio");
                    // setChatInfoOpen(false);
                    // setSidebarOpenKey("");
                  }}
                  to="#"
                >
                  <em className="icon icon-phone" />
                </Link>
              </li>
            ) : (
              ""
            )}
            {(startCall?.chatRoomId === selectedChannel?.id ||
              parseInt(callStart) === selectedChannel?.id) &&
            endCall === null ? (
              <li className="list-inline-item">
                <CommonButton
                  variant="success"
                  className="btn-md joinCall"
                  onClick={() => checkDevices("video")}
                >
                  Join Call
                </CommonButton>
              </li>
            ) : (
              ""
            )}
            <li className="list-inline-item chatHead_toolsList_toggle">
              <Link
                className="chatHead_toolsList_icon"
                onClick={() => {
                  setChatInfoOpen(true);
                }}
              >
                <em className="icon icon-info" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default memo(ChatHeader);
