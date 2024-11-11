import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { CommonButton, ModalComponent } from "components";
import { logger } from "utils";

import { SocketContext } from "context/socket.context";
import { selectUserData } from "redux/AuthSlice/index.slice";

function LeaveChannelModal({
  setLeaveChannelModal,
  leaveChannelModal,
  hideLeaveChannelModal,
  channel,
  setChannel,
  getLoopData,
  chatClose,
  setSelectLoopRoom,
}) {
  const { socket } = useContext(SocketContext);
  const userData = useSelector(selectUserData);

  const handleSubmitMessage = async (chat) => {
    let arr =
      chat?.chatRoomMembers?.length > 0 &&
      chat?.chatRoomMembers?.map((item) => {
        return item?.userId;
      });

    try {
      let data = {
        userId: userData?.id,
        chatRoomId: chat?.channelId ? chat?.channelId : chat?.id,
      };
      if (arr && !arr.includes(userData?.id)) {
        data.removeBy = userData?.id;
      }

      await socket?.emit?.("left_chat_room", data, (ack) => {
        if (ack?.success) {
          setLeaveChannelModal(false);
          getLoopData();
          setSelectLoopRoom();
          chatClose();
        }
        window.location.reload();
      });
    } catch (error) {
      logger(error);
    }
  };

  return (
    <ModalComponent
      backdrop
      show={leaveChannelModal}
      onHandleCancel={hideLeaveChannelModal}
      size="md"
      title="You are about to leave this Channel?"
      extraClassName="leaveChannelModal"
    >
      <>
        <p className="mb-0">
          You won&apos;t be able to access this Channel and its information
        </p>
        <div className="text-end modalFooter">
          <CommonButton
            onClick={() => {
              setLeaveChannelModal(false);
              setChannel({});
            }}
            variant="light"
          >
            Cancel
          </CommonButton>
          <CommonButton
            variant="primary"
            onClick={() => {
              handleSubmitMessage(channel);
            }}
            className="ms-2 ms-md-3"
          >
            Confirm
          </CommonButton>
        </div>
      </>
    </ModalComponent>
  );
}

export default LeaveChannelModal;
