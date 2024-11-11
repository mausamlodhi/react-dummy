import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import AgoraRTC from "agora-rtc-sdk-ng";
import { Link } from "react-router-dom";
// import ImageElement from "../ImageElement";
import { useSelector } from "react-redux";
import { TimerFormat, getFullName } from "utils";
import { ImageElement, ModalComponent, CommonButton } from "../..";

function AudioCall({ audioCall, setAudioCall }) {
  const [leaveModal, setLeaveModal] = useState(false);
  const [miceMuteUnMute, setMiceMuteUnMute] = useState(true);
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const userData = useSelector((state) => state.auth?.userData);
  const [state, setState] = useState({
    localAudioTrack: null,
    client: null,
  });

  let isMuteAudio = true;
  let joinCalls = "";

  const hideLeaveModal = () => {
    setLeaveModal(false);
  };
  let options = {
    appId: "819d1995e444411c82ebb4924d6547d8",
    channel: "Dummy channel",
    token:
      "007eJxTYKh4vrfE8tNPjrmPnuvMUPfgKjP35hLIlhae4jidT8nMyE2BwSTV2NzQPDUtxTwtzcTM2MTSwDTF2CjRyMLAyNI4MdGs6sDTlIZARoYeI1EWRgYIBPF5GVxKc3MrFZIzEvPyUnMYGABu8R8P",
    uid: Math.random().toString(),
  };

  let channelParameters = {
    localAudioTrack: null,
    remoteAudioTrack: null,
    remoteUid: null,
  };
  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
  async function startBasicCall() {
    agoraEngine.on("user-published", async (user, mediaType) => {
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");

      if (mediaType === "audio") {
        channelParameters.remoteUid = user.uid;
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteAudioTrack.play();
      }

      agoraEngine.on("user-unpublished", (users) => {
        console.log(`${users.uid}has left the channel`);
      });
    });

    joinCalls = async function () {
      await agoraEngine.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );
      channelParameters.localAudioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
      await agoraEngine.publish(channelParameters.localAudioTrack);
      setState({
        ...state,
        localAudioTrack: channelParameters.localAudioTrack,
        client: agoraEngine,
      });
      console.log("Publish success!");
      countRef.current = setInterval(() => {
        setCount((timer) => timer + 1);
      }, 1000);
    };
    let checkMiceMute = document.getElementById("muteMice");
    if (checkMiceMute === null) {
      checkMiceMute = <div />;
      return checkMiceMute;
    }
    checkMiceMute.onclick = async () => {
      if (isMuteAudio === false) {
        channelParameters.localAudioTrack.setMuted(false);
        if (state.localAudioTrack) {
          state.localAudioTrack.setMuted(false);
        }
        setMiceMuteUnMute(true);
        isMuteAudio = true;
      } else {
        channelParameters.localAudioTrack.setMuted(true);
        if (state.localAudioTrack) {
          state.localAudioTrack.setMuted(true);
        }
        setMiceMuteUnMute(false);
        isMuteAudio = false;
      }
    };
  }

  useEffect(() => {
    if (leaveModal) {
      let leaveCall = document.getElementById("leave");
      if (leaveCall === null) {
        leaveCall = <div />;
        return leaveCall;
      }
      leaveCall.onclick = async function () {
        state?.localAudioTrack?.close();
        clearInterval(countRef.current);
        // channelParameters.localAudioTrack.close();
        await agoraEngine.leave();
        console.log("You left the channel");
        window.location.reload();
      };
    }
  }, [leaveModal]);

  useEffect(() => {
    startBasicCall();
    joinCalls();
  }, []);

  return (
    <>
      <div
        className={`audioCall d-flex flex-column justify-content-between h-100 position-relative ${
          audioCall ? "audioCall-open" : ""
        }`}
      >
        <div className="audioCall_time text-center">
          <h2>Ongoing Call...</h2>
          <p> {count > 0 && TimerFormat(count)}</p>
        </div>
        <div className="audioCall_member">
          <div>
            <ul className="list-unstyled d-flex flex-wrap mb-0">
              <li className="active">
                <ImageElement
                  previewSource={userData?.profileImageUrl}
                  alt="audio-call-member-active"
                />
                <h2 className="text-truncate mb-0">
                  {getFullName(userData?.firstName, userData?.lastName)}{" "}
                </h2>
              </li>
              {/* <li>
                <ImageElement
                  source="audio-call-member.jpg"
                  alt="audio-call-member"
                />
                <h2 className="text-truncate mb-0">Brian</h2>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="audioCall_control">
          <div className="audioCall_control_space position-relative">
            <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0">
              <li>
                <Link to="/video-call">
                  <span className="icon-video-call">
                    <em className="path1" />
                    <em className="path2" />
                  </span>
                </Link>
              </li>

              <li id="muteMice">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span
                    className={miceMuteUnMute ? "icon-mute" : "icon-unmute"}
                  >
                    <em className="path1" />
                    <em className="path2" />
                    <em className="path3" />
                    <em className="path4" />
                  </span>
                </Link>
              </li>
              <li
                className="callClose"
                onClick={(e) => {
                  e.preventDefault();
                  setLeaveModal(true);
                }}
              >
                <Link to="#" className="w-100 h-100">
                  <span className="icon icon-phone" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            // setChatInfoOpen(false);
            setAudioCall(false);
          }}
          className="closeBtn"
        >
          <em className="icon-close" />
        </Link>
      </div>
      <ModalComponent
        show={leaveModal}
        onHandleCancel={hideLeaveModal}
        size="md"
        title="Are you sure you want to leave?"
        // extraClassName="pinModal"
      >
        <>
          <p className="mb-0">You can minimize the window instead.</p>
          <div className="text-end modalFooter" id="leave">
            <CommonButton
              variant="primary"
              onClick={() => {
                setLeaveModal(false);
                setAudioCall(false);
              }}
            >
              Leave
            </CommonButton>
          </div>
        </>
      </ModalComponent>
    </>
  );
}

export default AudioCall;
