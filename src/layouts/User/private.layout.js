import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "context/socket.context";
import { ImageElement, colorObj, getDevices, modalNotification } from "utils";
import userRoutesMap from "routeControl/userRouteMap";
import {
  callingData,
  getCallData,
  // getLocalStreamData,
  selectUserData,
} from "redux/AuthSlice/index.slice";
import {
  CommonButton,
  LoginHeader,
  LoginSidebar,
  ModalComponent,
  logoCreater,
} from "../../components";
import AppLayout from "../App/index.layout";

function PrivateLayout() {
  const { socketState, socket, socketStateHandler } = useContext(SocketContext);
  const { meetingStartedEvent, meetingEndEvent } = socketState;
  // const getLocalStream = useSelector(getLocalStreamData);
  const {
    handleMeetingEndEvent,
    handleMeetingJoin,
    handleAddChannelNewMessage,
  } = socketStateHandler;
  const userData = useSelector(selectUserData);
  const callDetails = useSelector(getCallData);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [redirectpath, setRedirectPath] = useState("");
  const [menuToggle, setMenuToggle] = useState(false);
  const [modalState, setModalState] = useState(false);

  const CallAccept = async () => {
    let device = await getDevices();
    setModalState(false);
    if (device?.audio?.length > 0 && device?.video?.length > 0) {
      dispatch(callingData(meetingStartedEvent));
      window.open(
        userRoutesMap.VIDEO.path,
        "com_MyDomain_myWindowForThisPurpose",
        ""
      );
      // navigate(userRoutesMap.VIDEO.path);
    } else {
      modalNotification({
        type: "error",
        message: "Please check your device connection",
      });
    }
  };
  const CallReject = async () => {
    setModalState(false);
    dispatch(callingData(meetingStartedEvent));

    if (meetingStartedEvent?.callType !== "channel") {
      await socket.emit(
        "meeting_end",
        {
          messageId: meetingStartedEvent?.roomMessage?.id,
          userId: userData?.id,
          chatRoomId: meetingStartedEvent?.chatRoomId || callDetails?.channelId,
          userImage: meetingStartedEvent?.userImage || "",
          roomName: callDetails?.roomName,
          channelCode: callDetails?.channelName,
          // backPageURL: callDetails?.backURL,
        },
        async (ack) => {
          if (ack?.success) {
            handleAddChannelNewMessage(ack?.messageDetail?.roomMessage);
            handleMeetingEndEvent(null);
            handleMeetingJoin(null);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (redirectpath) {
      navigate(redirectpath);
    }
  }, [redirectpath]);
  console.log("meetingStartedEvent", meetingStartedEvent);
  console.log("meetingEndEvent", meetingEndEvent);

  useEffect(() => {
    if (meetingStartedEvent?.chatRoomId && meetingEndEvent === null) {
      if (
        meetingStartedEvent?.chatRoomId !== userData?.id &&
        meetingEndEvent === null
      ) {
        setModalState(true);
      }
    }
  }, [meetingStartedEvent, meetingEndEvent]);

  useEffect(() => {
    if (meetingEndEvent) {
      dispatch(callingData(null));
      setModalState(false);
      handleMeetingEndEvent(null);
      handleMeetingJoin(null);
      handleAddChannelNewMessage(meetingEndEvent?.roomMessage);
    }
  }, [meetingEndEvent]);

  return (
    <div className="mainBody">
      <AppLayout setRedirectPath={setRedirectPath}>
        <>
          <LoginSidebar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
          <div className="content_wrap">
            <LoginHeader
              menuToggle={menuToggle}
              setMenuToggle={setMenuToggle}
            />
            <Outlet />
          </div>

          <ModalComponent
            backdrop
            show={modalState}
            onHandleCancel={() => setModalState(false)}
            size="sm"
            modalExtraClass="noHeader"
            extraClassName="callAttend noHeader"
          >
            <>
              <div className="callAttend_cnt">
                <h3>{meetingStartedEvent?.roomName}</h3>
                <p>Is calling you</p>
                {meetingStartedEvent?.userImage ? (
                  <ImageElement
                    previewSource={meetingStartedEvent?.userImage}
                    className="img-fluid"
                    alt="call-attend"
                  />
                ) : (
                  <>
                    <div
                      className={`userAvatar userAvatar-lg mx-auto  ${
                        meetingStartedEvent?.roomName
                          ? colorObj?.[
                              meetingStartedEvent?.roomName
                                ?.charAt(0)
                                .toLowerCase()
                            ]
                          : ""
                      } `}
                    >
                      <span>{logoCreater(meetingStartedEvent?.roomName)}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-between text-center modalFooter">
                <CommonButton onClick={() => CallAccept()} variant="success">
                  <span className="icon-phone" />
                </CommonButton>
                <CommonButton
                  onClick={() => CallReject()}
                  variant="danger"
                  extraClassName="ms-2"
                >
                  <span className="icon-phone" />
                </CommonButton>
              </div>
            </>
          </ModalComponent>
        </>
      </AppLayout>
    </div>
  );
}

export default PrivateLayout;
