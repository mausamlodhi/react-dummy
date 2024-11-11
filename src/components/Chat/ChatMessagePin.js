import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { Dropdown } from "react-bootstrap";
import { getFullName } from "utils";
import ImageElement from "components/UiElement/ImageElement";

function ChatMessagePin(props) {
  const {
    pinDetails,
    isViewUnpin,
    handleSelectUnPinMessage,
    handleMsgViewInChat,
  } = props;

  const { messagePin } = pinDetails;

  return (
    <div className="pinMessage">
      <div className="d-flex align-items-center flex-wrap">
        <div className="pinMessage_left d-flex align-items-center">
          <em className="icon icon-pin">
            <em className="path1" />
            <em className="path2" />
          </em>
          <h6 className="font-sb mb-0">
            {getFullName(
              messagePin?.user?.firstName,
              messagePin?.user?.lastName,
            )}
          </h6>
          {messagePin?.chatRoomMessage?.message ? (
            <p className="mb-0">
              {messagePin.chatRoomMessage.message?.substring(0, 80)}
              {messagePin.chatRoomMessage.message?.length > 80 && (
                <Link className="link-primary"
                  onClick={() => {
                    handleMsgViewInChat(pinDetails);
                    document.body.click();
                  }}
                  to="#">... View in chat</Link>
              )}
            </p>
          ) : messagePin?.chatRoomMessage?.messageType === "media" ? (
            <ImageElement source="camera.svg" alt="upload-document" />
          ) : null}
        </div>
        <div className="pinMessage_right ms-auto d-flex align-items-center">
          {messagePin?.createdAt && (
            <p className="mb-0">
              {moment(messagePin?.createdAt).format("hh:mm")}
            </p>
          )}
          <Dropdown className="dropdown ms-1 ms-md-2 ellipseDrop d-inline-block">
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
                  handleMsgViewInChat(pinDetails);
                  document.body.click();
                }}
                to="#"
              >
                <span className="icon-chat">
                  <span className="path1" />
                  <span className="path2" />
                </span>
                &nbsp;View in chat
              </Link>
              {isViewUnpin && (
                <Link
                  className="dropdown-item"
                  onClick={() => handleSelectUnPinMessage(messagePin?.id)}
                >
                  <span className="icon-pin">
                    <span className="path1" />
                    <span className="path2" />
                  </span>
                  &nbsp;UnPin
                </Link>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default ChatMessagePin;
