import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
  memo,
} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { useTranslation } from "react-i18next";
import DeleteMessageModal from "components/Chat/Modals/DeleteMessageModal";
import ChatHeader from "components/Chat/ChatHeader";
import ChatMessagePin from "components/Chat/ChatMessagePin";
import ChatMessageLists from "components/Chat/ChatMessageLists";
import ChatFooter from "components/Chat/ChatFooter";
import ForwardFileModal from "components/Chat/Modals/ForwardFileModal";

import { getFullName, logger, modalNotification } from "utils";
import { SocketContext } from "context/socket.context";
import { ChatServices, LoopService } from "services";
import PinMessageModal from "components/Chat/Modals/PinMessageModal";

const LOADING_TYPE = {
  PIN: "PIN",
  UNPIN: "UNPIN",
  DELETE: "DELETE",
};

const FILE_MAX_COUNT = 5;

const formats = ["jpg", "png", "jpeg", "mp3", "mp4", "pdf"];

const initialValues = {
  copyMassageAlert: false,
  replyMassageDetails: null,
  pinMessageDetails: {
    lists: [],
    count: 0,
  },
  forwardFileDetails: null,
  isMessageLoading: false,
  isOpenPinMessageModal: false,
  pinMessageId: null,
  unPinMessageId: null,
  isLoading: false,
  deletedMessageIds: [],
  deleteMessageDetails: null,
  dragFiles: [],
  isFooterValidation: "",
  viewOnChatDetails: null,
};

function LoopsChatBox(props) {
  const { t } = useTranslation();
  const {
    handleCloseChat,
    singleChat,
    setChatInfoOpen,
    setSidebarOpenKey,
    setAudioCall,
    // channel,
  } = props;
  const { socket, socketState } = useContext(SocketContext);
  const userId = useSelector((rState) => rState.auth?.userData?.id);
  const [state, setState] = useState(initialValues);
  const { selectedChannel } = socketState;
  const messageListRef = useRef(null);
  const dropRef = useRef();
  const [pinnedMessageArray, setPinnedMessageArray] = useState([]);
  const [pinLoad, setPinLoad] = useState(false);
  const [Participants, setParticipants] = useState([]);

  let chatRoomMembers = [];

  if (selectedChannel?.chatRoomMembers) {
    chatRoomMembers = selectedChannel.chatRoomMembers;
  } else if (selectedChannel?.chatRoom?.chatRoomMembers) {
    chatRoomMembers = selectedChannel?.chatRoom?.chatRoomMembers;
  }

  const isDisableChat = chatRoomMembers?.some?.(
    (item) => item?.status === "left" && item?.userId === userId,
  );

  useEffect(() => {
    if (
      (
        selectedChannel.chatRoomMembers ||
        selectedChannel?.chatRoom?.chatRoomMembers
      )?.length > 0
    ) {
      let array = [];
      (
        selectedChannel.chatRoomMembers ||
        selectedChannel?.chatRoom?.chatRoomMembers
      )?.map((item) => {
        let obj = {};
        obj.name =
          `${item?.user?.firstName} ${item?.user?.lastName}` ||
          `${item?.user?.firstName} ${item?.user?.lastName} `;
        obj.id = item?.user?.id;
        array?.push(obj);
      });
      setParticipants(array);
    }
  }, [selectedChannel]);

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
  };

  const handleSelectReply = (replyDetails) => {
    handleStateChange("replyMassageDetails", replyDetails);
  };

  const handleCopyMessageAlert = () => {
    handleStateChange("copyMassageAlert", true);
    setTimeout(() => {
      handleStateChange("copyMassageAlert", false);
    }, 1400);
  };

  const handleForwardFile = (forwardFileDetails) => {
    handleStateChange("forwardFileDetails", forwardFileDetails);
  };

  const handleIsMessageLoading = (status) => {
    handleStateChange("isMessageLoading", status);
  };

  const getUserName = (memberId) => {
    let userObj;
    if (selectedChannel.type === "single") {
      userObj = selectedChannel.fromUser;
      if (selectedChannel?.fromUser?.id === memberId) {
        userObj = getFullName(
          selectedChannel?.fromUser?.firstName,
          selectedChannel?.fromUser?.lastName,
        );
        return userObj;
      } else if (selectedChannel?.toUser?.id === memberId) {
        userObj = getFullName(
          selectedChannel?.toUser?.firstName,
          selectedChannel?.toUser?.lastName,
        );
        return userObj;
      }
    } else {
      userObj = selectedChannel?.chatRoomMembers?.find?.(
        (chatRoomMemItem) => chatRoomMemItem?.userId === memberId,
      )?.user;
    }

    return getFullName(userObj?.firstName, userObj?.lastName);
  };

  const getUserValue = (memberId, keys) => {
    const splitKey = keys?.split?.(".");
    let members;
    if (selectedChannel?.chatRoomMembers) {
      members = selectedChannel.chatRoomMembers;
    }

    if (selectedChannel?.chatRoom?.chatRoomMembers) {
      members = selectedChannel?.chatRoom?.chatRoomMembers;
    }

    if (
      selectedChannel?.type !== "single" &&
      selectedChannel?.toUserId === memberId
    ) {
      return selectedChannel?.toUser;
    }

    if (selectedChannel?.fromUserId === memberId) {
      return selectedChannel?.fromUser;
    }

    let userObj = members?.find?.(
      (chatRoomMemItem) => chatRoomMemItem?.userId === memberId,
    );

    let result;

    if (splitKey?.length > 1) {
      result = splitKey.reduce((acc, cur) => (acc || {})[cur], userObj);
    } else {
      result = userObj?.[keys];
    }

    return result;
  };

  const getMessagePinLists = async () => {
    try {
      const response =
        (!isDisableChat || singleChat) &&
        (await LoopService.getMessagePinListsService(selectedChannel?.id));
      if (response?.success) {
        handleStateChange("pinMessageDetails", {
          lists: response?.data ?? [],
          count: response?.data?.count ?? 0,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    let arr = [];
    arr = state?.pinMessageDetails?.lists.map((item) => {
      return item?.messagePin?.messageId;
    });
    setPinnedMessageArray(arr);
  }, [state]);

  const handleSelectPinMessage = (messageId) => {
    const isMsgAlreadyPin = state.pinMessageDetails.lists?.some(
      (listItem) => listItem?.messagePin?.messageId === messageId,
    );
    if (!isMsgAlreadyPin) {
      handleStateChange({
        pinMessageId: messageId,
        isOpenPinMessageModal: true,
      });
    } else {
      modalNotification({
        type: "error",
        message: t("validation.chat.msgAlreadyPin"),
      });
    }
  };

  const handleSelectUnPinMessage = (unPinMessageId) => {
    handleStateChange({
      unPinMessageId,
      isOpenPinMessageModal: true,
    });
  };

  const handleEmitPinMsgEvent = () => {
    const emitBody = {
      userId,
      chatRoomId: selectedChannel?.id,
      action: "message_pin",
    };
    socket?.emit?.("common_action", emitBody);
  };

  const handlePinMessage = async () => {
    try {
      setPinLoad(true);
      handleStateChange("isLoading", LOADING_TYPE.PIN);
      const response = await LoopService.postMessagePinService(
        selectedChannel?.id,
        { messageId: state.pinMessageId },
      );
      handleStateChange({
        isOpenPinMessageModal: !response?.success,
        pinMessageId: response?.success ? null : state.pinMessageId,
        isLoading: false,
      });
      if (response?.message) {
        if (selectedChannel?.type !== "me") {
          handleEmitPinMsgEvent();
        }
        modalNotification({
          type: "success",
          message: response?.message,
        });
      }
      getMessagePinLists();
    } catch (error) {
      logger(error);
    }
    setPinLoad(false);
  };

  const handleUnPinMessage = async () => {
    setPinLoad(true);
    try {
      handleStateChange("isLoading", LOADING_TYPE.UNPIN);
      const response = await LoopService.deleteMessageUnPinService(
        selectedChannel?.id,
        state.unPinMessageId,
      );
      handleStateChange({
        isOpenPinMessageModal: !response?.success,
        unPinMessageId: response?.success ? null : state.unPinMessageId,
        isLoading: false,
      });
      if (response?.message) {
        if (selectedChannel?.type !== "me") {
          handleEmitPinMsgEvent();
        }
        modalNotification({
          type: "success",
          message: response.message,
        });
      }
      getMessagePinLists();
    } catch (error) {
      logger(error);
    }
    setPinLoad(false);
  };

  const handleOpenFowwardFileModal = () => {
    handleStateChange("forwardFileDetails", null);
  };

  const handleOpenDeleteMsgModal = (message) => {
    handleStateChange({
      deleteMessageDetails: message || null,
    });
  };

  const handleScrollToBottom = useCallback(() => {
    if (messageListRef && messageListRef.current) {
      const element = messageListRef.current?.messageListRef;
      element.scroll(0, 0);
    }
  }, []);

  const handleSubmitReply = () => {
    handleStateChange("replyMassageDetails", null);
    handleScrollToBottom();
  };

  const handleClearDragFiles = () => {
    handleStateChange("dragFiles", []);
  };

  const handleSubmitDeleteMessage = async () => {
    try {
      handleStateChange("isLoading", LOADING_TYPE.DELETE);
      const response = await ChatServices.deleteChannelMessageService(
        state.deleteMessageDetails?.roomId,
        state.deleteMessageDetails?.id,
      );
      handleStateChange({
        deleteMessageDetails: null,
        deletedMessageIds: [
          ...state.deletedMessageIds,
          ...(response?.success ? [state.deleteMessageDetails?.id] : []),
        ],
        isLoading: false,
      });
    } catch (error) {
      logger(error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer?.files;
    const filesLength = files?.length || 0;
    const arrFiles = [];

    let index = 0;

    while (index < filesLength) {
      const file = files?.item(index);
      arrFiles.push(file);
      index += index + 1;
    }

    // check if the provided count prop is less than uploaded count of files
    if (FILE_MAX_COUNT && FILE_MAX_COUNT < filesLength) {
      logger(
        `Only ${FILE_MAX_COUNT} file${
          FILE_MAX_COUNT !== 1 ? "s" : ""
        } can be uploaded at a time`,
      );
      return;
    }

    // check if some uploaded file is not in one of the allowed formats
    if (
      formats &&
      arrFiles.some(
        (file) =>
          !formats.some((format) =>
            file.name.toLowerCase().endsWith(format.toLowerCase()),
          ),
      )
    ) {
      modalNotification({
        type: "error",
        message: `Only following file formats are acceptable: ${formats.join(
          ", ",
        )}`,
      });

      return;
    }

    if (files && files.length) {
      let fileList = Array.from(files);
      handleStateChange("dragFiles", fileList);
      // onUpload(fileList)
    }
  };

  const getReplyMessageName = useCallback((details) => {
    let result = "";
    if (details?.message) {
      result = details?.message;
    }

    const msgMediaItems =
      details?.messageMedia || details?.parentMessage?.messageMedia;

    if (msgMediaItems) {
      result += `${result ? " " : ""}${msgMediaItems?.reduce?.(
        (acc, cur) => `${acc}${acc ? ", " : ""}File:${cur?.mediaName}`,
        "",
      )}`;
    }

    return result;
  }, []);

  const handleFooterValidation = (validationMsg) => {
    handleStateChange("isFooterValidation", validationMsg);
  };

  const handleSetViewOnChatDetails = (details) => {
    handleStateChange("viewOnChatDetails", details || null);
  };

  const handleSelectMsgViewInChat = (details) => {
    if (
      !state.viewOnChatDetails ||
      details?.messageIndex !== state.viewOnChatDetails?.messageIndex
    ) {
      handleSetViewOnChatDetails(details);
    } else {
      messageListRef.current?.handleMsgViewInChat?.();
    }
  };

  useEffect(() => {
    dropRef.current?.addEventListener("dragover", handleDragOver);
    dropRef.current?.addEventListener("drop", handleDrop);

    return () => {
      dropRef.current?.removeEventListener("dragover", handleDragOver);
      dropRef.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  useEffect(() => {
    handleStateChange(initialValues);
    getMessagePinLists();
  }, [selectedChannel]);

  useEffect(() => {
    socket?.on?.("receive_common_action", (data) => {
      if (data?.action === "message_pin") {
        if (selectedChannel?.id === data?.chatRoomId) {
          getMessagePinLists();
        }
      }
    });
  }, []);

  return (
    <>
      <ChatHeader
        {...selectedChannel}
        handleCloseChat={handleCloseChat}
        singleChat={singleChat}
        selectedChannel={selectedChannel}
        setChatInfoOpen={setChatInfoOpen}
        setSidebarOpenKey={setSidebarOpenKey}
        setAudioCall={setAudioCall}
        disableChat={isDisableChat}
      />
      {state.pinMessageDetails?.lists.length > 0 && (
        <ChatMessagePin
          isViewUnpin={
            state.pinMessageDetails.lists[0]?.messagePin?.userId === userId
          }
          pinDetails={state.pinMessageDetails.lists[0]}
          handleSelectUnPinMessage={handleSelectUnPinMessage}
          handleMsgViewInChat={handleSelectMsgViewInChat}
        />
      )}
      <ChatMessageLists
        singleChatBox={singleChat}
        ref={messageListRef}
        selectRoom={selectedChannel}
        userId={userId}
        handleSelectReply={handleSelectReply}
        handleCopyMessageAlert={handleCopyMessageAlert}
        handleForwardFile={handleForwardFile}
        getUserName={getUserName}
        getUserValue={getUserValue}
        handleScrollToBottom={handleScrollToBottom}
        handlePinMessage={handleSelectPinMessage}
        isMessageLoading={state.isMessageLoading}
        handleOpenDeleteMsgModal={handleOpenDeleteMsgModal}
        getReplyMessageName={getReplyMessageName}
        viewOnChatDetails={state.viewOnChatDetails}
        pinnedMessageArray={pinnedMessageArray}
        participants={Participants}
        disableChat={isDisableChat}
        handleSetViewOnChatDetails={handleSetViewOnChatDetails}
      />

      <div className="chatEditor">
        {state.isFooterValidation?.length > 0 && (
          <div className="pb-2 pr-2">
            <div className="p-1 text-bg-light">{state.isFooterValidation}</div>
          </div>
        )}

        {state.copyMassageAlert && (
          <div className="copiedClipboard d-flex justify-content-center">
            <span className="info">Copied to Clipboard</span>
          </div>
        )}
        {state.replyMassageDetails && (
          <div className="replayMessage d-flex align-items-center">
            <div className="replayMessage_icon">
              <em className="icon icon-reply-right" />
            </div>
            <Link
              to="#"
              className="replayMessage_close"
              onClick={(e) => {
                e.preventDefault();
                handleStateChange("replyMassageDetails", false);
              }}
            >
              <span className="icon-close" />
            </Link>
            <div className="replayMessage_cnt">
              <h6>{getReplyMessageName(state.replyMassageDetails)}</h6>
              <span>
                {getUserName(state.replyMassageDetails?.fromId)},&nbsp;
                {moment(state.replyMassageDetails?.createdAt).calendar()}
              </span>
            </div>
          </div>
        )}
        {!isDisableChat ||
        selectedChannel?.type === "single" ||
        selectedChannel?.type === "me" ||
        (!isDisableChat && selectedChannel?.type === "channel") ? (
          <ChatFooter
            userId={userId}
            isReply={state.replyMassageDetails}
            isMessageLoading={state.isMessageLoading}
            handleSubmitReply={handleSubmitReply}
            handleIsMessageLoading={handleIsMessageLoading}
            dragFiles={state.dragFiles}
            handleClearDragFiles={handleClearDragFiles}
            handleFooterValidation={handleFooterValidation}
          />
        ) : (
          <div className="text-danger text-center text-capitalize">
            <b>You are no longer available to send message in this chat!</b>
          </div>
        )}
      </div>

      {state.forwardFileDetails && (
        <ForwardFileModal onClose={handleOpenFowwardFileModal} />
      )}
      {state.isOpenPinMessageModal && (
        <PinMessageModal
          isPinMessage={state.pinMessageDetails.lists.length > 0}
          isUnPinMessage={!!state.unPinMessageId}
          isLoading={pinLoad}
          onClose={() => handleStateChange("isOpenPinMessageModal", false)}
          state={state}
          onSubmit={
            state.unPinMessageId ? handleUnPinMessage : handlePinMessage
          }
        />
      )}
      {state.deleteMessageDetails && (
        <DeleteMessageModal
          onClose={handleOpenDeleteMsgModal}
          onSubmit={handleSubmitDeleteMessage}
          isLoading={state.isLoading === LOADING_TYPE.DELETE}
        />
      )}
    </>
  );
}

export default memo(LoopsChatBox);
