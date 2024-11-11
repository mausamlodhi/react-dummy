import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import {
  CommonButton,
  GlobalLoader,
  ImageElement,
  logoCreater,
} from "components";
import { SocketContext } from "context/socket.context";
import { colorObj, getChatData, getRoomMembersLength ,userChatStatusOptions } from "utils";

export default function ChannelInformation({
  myRef,
  // showEditLoopModal,
  // setSidebarOpenKey,
  handleOpenChannelInfo,
  onHandleCreateChannel,
  setChannel,
  channelInfoLoading,
  userData,
  disableChat
}) {
  const { socketState } = useContext(SocketContext);
  const { selectedChannel } = socketState;
  const [copyEmail, setCopyEmail] = useState(false);
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // handleCopyMessageAlert();
    setCopyEmail(true);
    setTimeout(() => {
      setCopyEmail(false);
    }, 1400);
  };

  return (
    <div className="rightBarDetail vh-100" ref={myRef}>
      <div className="rightBarDetail_header position-relative">
        <h4 className="w-100 font-bd">Information</h4>
        <Link
          to="#"
          onClick={() => {
            // setSidebarOpenKey('')
            handleOpenChannelInfo();
          }}
          className="closeBar"
        >
          <em className="icon icon-close" />
        </Link>
      </div>
      {selectedChannel?.type === "single" ? (
        <div className="rightBarDetail_profile d-flex flex-column justify-content-center align-items-center h-100 text-center position-relative">
          <div className="userAvatar userAvatar-lg danger d-flex justify-content-center align-items-center">
            <ImageElement
              previewSource={getChatData(
                selectedChannel?.fromUser,
                selectedChannel?.toUser,
                "image",
                userData
              )||getChatData(
                selectedChannel?.chatRoomMembers[0]?.user,
                selectedChannel?.chatRoomMembers[1]?.user,
                "image",
                userData
              )}
              alt="profile"
            />
          </div>
          <div className="pUserInfo_center border-0">
            <h6 className="font-bd">
              {getChatData(
                selectedChannel?.fromUser,
                selectedChannel?.toUser,
                "name",
                userData
              )||getChatData(
                selectedChannel?.chatRoomMembers[0]?.user,
                selectedChannel?.chatRoomMembers[1]?.user,
                "name",
                userData
              )}
            </h6>
            <ul className="list-unstyled pUserInfo_list mb-0">
              <li className="d-flex justify-content-center">
                <span className="status available">
                  <em className="icon-check" />
                </span>{" "}
                <span className="info">{ userChatStatusOptions?.[(selectedChannel?.fromUser?.chatStatus?.status || selectedChannel?.chatRoomMembers?.user?.chatStatus?.status  )?? "online"]?.label}</span>
              </li>
              <li>
                <em className="icon icon-phone" />{" "}
                <span className="info">
                  {" "}
                  {getChatData(
                    selectedChannel?.fromUser,
                    selectedChannel?.toUser,
                    "number",
                    userData
                  )||getChatData(
                    selectedChannel?.chatRoomMembers[0]?.user,
                    selectedChannel?.chatRoomMembers[1]?.user,
                    "number",
                    userData
                  )}
                </span>
              </li>
              <li className="pUserInfo_email d-flex align-items-center">
                <span className="icon icon-email">
                  <span className="path1" />
                  <span className="path2" />
                </span>
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span className="info">
                    {" "}
                    {getChatData(
                      selectedChannel?.fromUser,
                      selectedChannel?.toUser,
                      "email",
                      userData
                    )||getChatData(
                      selectedChannel?.chatRoomMembers[0]?.user,
                      selectedChannel?.chatRoomMembers[1]?.user,
                      "email",
                      userData
                    )}
                  </span>
                  <Link
                    className="ms-2"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopyToClipboard(
                        getChatData(
                          selectedChannel?.fromUser,
                          selectedChannel?.toUser,
                          "email",
                          userData
                        )||getChatData(
                          selectedChannel?.chatRoomMembers[0]?.user,
                          selectedChannel?.chatRoomMembers[1]?.user,
                          "email",
                          userData
                        )
                      );
                    }}
                  >
                    <span className="icon icon-copy">
                      <em className="path1" />
                      <em className="path2" />
                    </span>
                  </Link>
                </div>
              </li>
            </ul>
            {copyEmail && (
              <div className="posit ion-relative copiedClipboard d-flex justify-content-center pt-5">
                <span className="info">Copied to Clipboard</span>
              </div>
            )}
          </div>
        </div>
      ) : channelInfoLoading ? (
        <GlobalLoader />
      ) : (
        <div className="rightBarDetail_profile d-flex flex-column justify-content-center align-items-center h-100 text-center">
          <div
            className={`userAvatar userAvatar-lg ${
              selectedChannel?.roomName
                ? colorObj?.[selectedChannel?.roomName?.charAt(0).toLowerCase()]
                : ""
            } d-flex justify-content-center align-items-center `}
          >
            <span>{logoCreater(selectedChannel?.roomName)}</span>
          </div>
          <div className="detail">
            <h2>{selectedChannel?.roomName}</h2>
            {selectedChannel?.type!=="me" && 
              <h3 className="mb-0">
              {getRoomMembersLength(selectedChannel?.chatRoomMembers)} Members
            </h3>
            }
            
            {selectedChannel?.description && (
              <p>{selectedChannel?.description}</p>
            )}

            {!disableChat?.includes(userData?.id) && selectedChannel?.type!=="me" && <CommonButton
              variant="outline-info"
              htmlType="submit"
              onClick={() => {
                onHandleCreateChannel(selectedChannel, "edit");
                setChannel(selectedChannel);
              }}
            >
              Edit
            </CommonButton>}
          </div>
        </div>
      )}
    </div>
  );
}
