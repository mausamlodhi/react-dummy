/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import AgoraRTC from "agora-rtc-sdk-ng";
import Spinner from "react-bootstrap/Spinner";
import { useRef, useEffect, useState, useContext } from "react";
// import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // ImageElement,
  TimerFormat,
  // decodeQueryData,
  getFullName,
  logger,
} from "utils";
// import userRoutesMap from "routeControl/userRouteMap";
import {
  UpdateLocalStreamData,
  callingData,
  getCallData,
  getCallingDetails,
  getLocalStreamData,
  selectUserData,
  updateCallData,
} from "redux/AuthSlice/index.slice";
import { CommonService, LoopService } from "services";
import { SocketContext } from "context/socket.context";
import config from "../../config";

let scrollViewInnerDiv = [];

function AgoraCall() {
  const { socket, socketState, socketStateHandler } = useContext(SocketContext);
  const { meetingStartedEvent, meetingEndEvent } = socketState;

  const callDetails = useSelector(getCallData);
  const CallingData = useSelector(getCallingDetails);
  const getLocalStream = useSelector(getLocalStreamData);

  const dispatch = useDispatch();
  const {
    handleMeetingEndEvent,
    handleMeetingJoin,
    handleAddChannelNewMessage,
  } = socketStateHandler;
  // const params = useParams();
  // const { channelName, channelId } = params;
  const [token, setToken] = useState("");
  const [cameraMuteUnMute, setCameraMuteUnMute] = useState(false);
  const [miceMuteUnMute, setMiceMuteUnMute] = useState(true);
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hostCount, setHostCount] = useState([]);
  const [volumeIcon, setVolumeIcon] = useState(false);
  const userData = useSelector(selectUserData);
  const [element, setElement] = useState([]);
  const [remoteArr, setRemoteArr] = useState([]);
  const [hostArr, setHostArr] = useState();
  const [rtcClient, setRTCClient] = useState(null);
  const [userIdArr, setUserIdArr] = useState([]);
  const [scrollViewHostArr, setScrollViewHostArr] = useState();
  const [userList, setUserList] = useState([]);
  const [, setParticipantList] = useState([]);
  const [searchValue] = useState("");
  const [updateCameraState, setUpdateCameraState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leaveUserState, setLeaveUserState] = useState(false);
  const [userIdIndex, setUserIdIndex] = useState("");
  const [volumeCount, setVolumeCount] = useState(25);
  // const [scrollViewUserIdArr, setScrollViewUserIdArr] = useState();

  let isMuteVideo = false;
  let isMuteAudio = true;
  let joinCalls = "";
  let camera = false;

  const getParticipantList = async (searchVal) => {
    try {
      let queryParams = {
        search: searchVal,
      };
      const res = await LoopService.getChannelMemberListsService(
        CallingData?.chatRoomId ||
          meetingStartedEvent?.chatRoomId ||
          callDetails?.channelId,
        queryParams
      );
      if (res?.success) {
        if (!searchVal) {
          setUserList(res?.data?.rows);
        }
        let list = [];
        list = res?.data?.rows.slice(0, 5);
        setParticipantList(list);
      }
    } catch (error) {
      logger(error);
    }
  };

  const [state, setState] = useState({
    localAudioTrack: null,
    localVideoTrack: null,
  });
  let options = {
    appId: config?.AGORA_APP_ID,
    channel:
      CallingData?.channelCode ||
      meetingStartedEvent?.channelCode ||
      callDetails?.channelName||null,
    token,
    // uid: Math.floor(Math.random() * 10),
    uid: userData?.id,
  };

  let channelParameters = {
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null,
  };

  let arr = [];
  let lastElementId = "";
  let child = [];
  let uidArr = [];
  let uidIndex = "";
  let localUserUIDIndex = "";

  async function startBasicCall() {
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
    setRTCClient(agoraEngine);

    AgoraRTC.onCameraChanged = async (changedDevice) => {
      if (changedDevice.state === "ACTIVE") {
        channelParameters.localVideoTrack.setDevice(
          changedDevice.device.deviceId
        );
        document.getElementById("muteVideo").onclick();
      } else {
        document.getElementById("muteVideo").onclick();
      }
    };
    AgoraRTC.onMicrophoneChanged = async (changedDevice) => {
      if (changedDevice.state === "ACTIVE") {
        channelParameters.localAudioTrack.setDevice(
          changedDevice.device.deviceId
        );
        document.getElementById("muteMice").onclick();
      } else {
        document.getElementById("muteMice").onclick();
      }
    };

    agoraEngine.on("user-published", async (users, mediaType) => {
      await agoraEngine.subscribe(users, mediaType);
      console.log("subscribe success");
      if (mediaType === "video") {
        channelParameters.remoteVideoTrack = users.videoTrack;
        channelParameters.remoteAudioTrack = users.audioTrack;

        arr.push(channelParameters.remoteVideoTrack);

        if (uidIndex) {
          uidArr.splice(uidIndex, 0, users?.uid);
        } else if (!uidArr?.includes(users?.uid)) {
          if (uidArr?.includes(userData?.id)) {
            uidArr.push(users?.uid);
            uidArr.push(uidArr.splice(uidArr.indexOf(userData?.id), 1)[0]);
            localStorage.setItem(
              "userUID",
              JSON.stringify([...new Set(uidArr)])
            );
            localStorage.setItem("userIDCount", [...new Set(uidArr)].length);
            setUserIdIndex("");
            // if (uidArr?.length >= 3) {
            //   setScrollViewUserIdArr([...new Set(uidArr)]);
            // } else {
            setUserIdArr([...new Set(uidArr)]);
            // }
          } else {
            setUserIdIndex("");
            uidArr.push(users?.uid);
            localStorage.setItem(
              "userUID",
              JSON.stringify([...new Set(uidArr)])
            );
            localStorage.setItem("userIDCount", [...new Set(uidArr)].length);
            // if (uidArr?.length >= 3) {
            //   let arrayValue = uidArr?.map((item, idx) => {
            //     let val;
            //     if (idx >= 2) {
            //       val = item;
            //       return val;
            //     }
            //     return val;
            //   });
            //   arrayValue.push(userData?.id);
            //   let filterValue = arrayValue?.filter(
            //     (item) => item !== undefined && item
            //   );
            //   arrayValue.push(
            //     arrayValue.splice(arrayValue.indexOf(userData?.id), 1)[0]
            //   );
            //   setScrollViewUserIdArr([...new Set(filterValue)]);
            // } else {
            setUserIdArr([...new Set(uidArr)]);
            // }
          }
        }
        setRemoteArr([...new Set(arr)]);

        if (child?.length !== 2) {
          let remoteUserArr = null;
          remoteUserArr = arr.find((item) => item?._userId === users?.uid);

          if (remoteUserArr) {
            if (document.getElementById(`mainDiv-${remoteUserArr?._userId}`)) {
              setUpdateCameraState(false);
              channelParameters.remoteVideoTrack.play(
                `mainDiv-${remoteUserArr?._userId}`
              );
            } else {
              setUpdateCameraState(false);
              channelParameters?.remoteVideoTrack?.play("remote");
            }
          } else {
            setUpdateCameraState(false);
            channelParameters?.remoteVideoTrack?.play("remote");
          }
          const boxWrapper = document.getElementById("remote");
          child = Array?.from(boxWrapper?.children);
          if (child?.length <= 1) {
            channelParameters?.localVideoTrack?.play("local");
          } else {
            channelParameters.localVideoTrack.play("local");
            let localDiv = document.getElementById(`parent`);
            let div = document.getElementById("remote");
            let localProfile = document.getElementById("localProfile");
            localProfile?.classList?.remove("rounded-0");
            div.appendChild(localDiv);
            child = Array?.from(div?.children);
            if (localUserUIDIndex) {
              uidArr.push(uidArr.splice(uidArr.indexOf(userData?.id), 1)[0]);
              setUserIdArr([...new Set(uidArr)]);
              setUserIdIndex("");
            } else if (!uidArr?.includes(userData?.id)) {
              setUserIdIndex("");
              uidArr.push(uidArr.splice(uidArr.indexOf(userData?.id), 1)[0]);
              uidArr.push(userData?.id);
              localStorage.setItem(
                "userUID",
                JSON.stringify([...new Set(uidArr)])
              );
              localStorage.setItem("userIDCount", [...new Set(uidArr)].length);
              setUserIdArr([...new Set(uidArr)]);
            }
          }
          if (child?.length > 6) {
            let localDiv = document.getElementById(`parent`);
            let div = document.getElementById("scrollView");
            div.prepend(localDiv);
          }
          setHostArr(child);
          setHostCount(child?.length);
        } else {
          channelParameters.remoteVideoTrack.play("scrollView");
          let localDiv = document.getElementById(`parent`);
          let div = document.getElementById("scrollView");
          div.prepend(localDiv);
          const boxWrapper = document.getElementById("scrollView");
          let childs = Array?.from(boxWrapper?.children);
          setScrollViewHostArr(childs);

          setHostCount(childs?.length + 1);
        }

        agoraEngine.on("user-unpublished", (event) => {
          console.log("event", event);
          if (!event?._video_muted_ && !event?._audio_added_) {
            setLeaveUserState(true);
            let storeItem = localStorage.getItem("userUID");
            let parseValue = JSON.parse(storeItem);
            setUserIdIndex(parseValue.indexOf(event?.uid));
            uidIndex = parseValue.indexOf(event?.uid);
            let removeDiv = document.getElementById(`mainDiv-${event?.uid}`);
            removeDiv?.remove();
            let removeUserId = uidArr?.filter(
              (item) => item !== event?.uid && item
            );
            uidArr = removeUserId;

            if (removeUserId?.length === 2) {
              let filterArr = removeUserId?.filter(
                (item) => item !== userData?.id
              );
              let storeItems = localStorage.getItem("userUID");
              localUserUIDIndex = JSON.parse(storeItems);
              setUserIdArr([...new Set(filterArr)]);
            } else {
              setUserIdArr([...new Set(removeUserId)]);
            }

            localStorage.setItem("userIDCount", removeUserId?.length);
            localStorage.setItem("removeUser", false);

            const boxWrapper = document.getElementById("remote");
            child = Array?.from(boxWrapper?.children);
            if (child?.length === 2) {
              let removeUserIds = uidArr?.filter(
                (item) => item !== userData?.id && item
              );
              setUserIdArr([...new Set(removeUserIds)]);

              let localDiv = document.getElementById(`parent`);
              let div = document.getElementById("singleUser");
              div.appendChild(localDiv);
            } else {
              setHostCount(child?.length);
            }
            setHostArr(child);
          }
        });
      }

      if (mediaType === "audio") {
        channelParameters.remoteUid = users?.uid;
        channelParameters.remoteAudioTrack = users.audioTrack;
        channelParameters.remoteAudioTrack.play();
      }
    });

    joinCalls = async () => {
      await agoraEngine.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );
      channelParameters.localAudioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
      channelParameters.localVideoTrack =
        await AgoraRTC.createCameraVideoTrack();
      await agoraEngine.publish([
        channelParameters.localAudioTrack,
        channelParameters.localVideoTrack,
      ]);
      setState({
        ...state,
        localAudioTrack: channelParameters.localAudioTrack,
        localVideoTrack: channelParameters.localVideoTrack,
        userId: userData?.id,
      });

      localStorage.setItem(
        "callStart",
        CallingData?.chatRoomId ||
          meetingStartedEvent?.chatRoomId ||
          callDetails?.channelId
      );

      if (channelParameters?.localVideoTrack) {
        let localDivStream = document.getElementById("local");

        console.log("localDiv", localDivStream);
        channelParameters?.localVideoTrack?.play(localDivStream);

        // channelParameters?.localVideoTrack?.play("local");
      }

      countRef.current = setInterval(() => {
        setCount((timer) => timer + 1);
      }, 1000);

      if (!getLocalStream) {
        await socket.emit(
          "meeting_start",
          {
            userId: userData?.id,
            chatRoomId: callDetails?.channelId,
            userImage: callDetails?.imageURL || "",
            roomName: callDetails?.roomName,
            channelCode: callDetails?.channelName,
            backPageURL: callDetails?.backURL,
            callType: callDetails?.callType,
          },
          async (ack) => {
            let message = {
              createdAt: new Date().toISOString(),
              messageDetail: ack?.messageDetail?.roomMessage,
            };
            if (ack?.success) {
              handleMeetingJoin(ack?.messageDetail);
              handleAddChannelNewMessage(message);
            }
          }
        );
      }
      setLoading(false);
      console.log("publish success!");
    };

    // Volume range Set an event listener on the range slider.
  }

  rtcClient?.on("user-info-updated", (uid, msg) => {
    setUpdateCameraState(true);
    console.log("msgmsgmsg", msg, "uid==", uid);
    let userDiv = document.getElementById(`mainDiv-${uid}`);

    if (msg === "mute-video") {
      userDiv?.childNodes[0]?.classList?.add("d-none");
      userDiv?.childNodes[1]?.classList?.remove("d-none");
      camera = true;
      return camera;
    } else if (msg === "unmute-video") {
      userDiv?.childNodes[0]?.classList?.remove("d-none");
      userDiv?.childNodes[1]?.classList?.add("d-none");
      camera = false;
      return camera;
    }

    if (msg === "mute-audio" && camera) {
      userDiv?.childNodes[1]?.firstChild?.firstChild?.lastChild?.lastChild?.classList?.remove(
        "d-none"
      );
      userDiv?.childNodes[1]?.lastChild?.classList?.remove("d-none");
    } else if (msg === "unmute-audio" && camera) {
      userDiv?.childNodes[1]?.firstChild?.firstChild?.lastChild?.lastChild?.classList?.add(
        "d-none"
      );
    }
    if (msg === "mute-audio" && !camera) {
      userDiv?.childNodes[0]?.lastChild?.classList?.remove("d-none");
    } else {
      userDiv?.childNodes[0]?.lastChild?.classList?.add("d-none");
    }
  });

  const leaveCall = async (type) => {
    localStorage.setItem("callStart", null);
    state?.localAudioTrack?.close();
    state?.localVideoTrack?.close();
    let data = {};
    dispatch(updateCallData(data));
    dispatch(callingData(data));
    dispatch(UpdateLocalStreamData(null));

    clearInterval(countRef.current);
    await rtcClient?.leave();
    handleMeetingEndEvent(null);
    handleMeetingJoin(null);

    if (
      meetingEndEvent === null &&
      type === "endCall" &&
      CallingData?.chatRoomId === callDetails?.channelId
    ) {
      socket.emit(
        "meeting_end",
        {
          messageId:
            CallingData?.roomMessage?.id ||
            meetingStartedEvent?.roomMessage?.id,
          userId: userData?.id,
          chatRoomId:
            meetingStartedEvent?.chatRoomId || CallingData?.chatRoomId,
          userImage: "",
          roomName: CallingData?.roomName,
          channelCode: CallingData?.channelCode,
        },
        async (ack) => {
          let message = {
            createdAt: new Date().toISOString(),
            messageDetail: ack?.messageDetail?.roomMessage,
          };
          if (ack?.success) {
            handleAddChannelNewMessage(message);
          }
        }
      );
    }
    window.close();
    console.log("You left the channel");
  };

  let classObj = {
    1: "singleVideo",
    2: "threeVideo",
    3: "threeVideo",
    4: "forthVideo",
    5: "multiVideo",
    6: "multiVideo",
  };

  useEffect(() => {
    // remote add div
    setHostCount(userIdArr.length);
    console.log("userIdArr", userIdArr);
    if (
      userIdArr?.length > 0 &&
      !updateCameraState &&
      userIdIndex === "" &&
      hostArr?.length > 0
    ) {
      if (hostArr?.length > 0) {
        userIdArr?.map((el, id) => {
          hostArr?.map((item, idx) => {
            if (
              item?.id !== `mainDiv-${el}` &&
              id === idx &&
              item?.id !== `parent` &&
              !hostArr?.includes(`mainDiv-${el}`)
            ) {
              let userDetails = userList?.find(
                (val) => val?.userId === el && val
              );
              let wrapper = document.createElement("div");
              let addName = document.createElement("span");
              let addMice = document.getElementById("mice");
              addName.innerHTML = getFullName(
                userDetails?.user?.firstName,
                userDetails?.user?.lastName
              );
              const textNode = document.getElementById(
                "parentMuteVideoCallHost"
              );
              let cloneNode = textNode.cloneNode(true);
              cloneNode.childNodes[0].childNodes[0].firstChild.firstChild.src =
                userDetails?.user?.profileImageUrl;
              cloneNode.firstChild.firstChild.lastChild.innerHTML = getFullName(
                userDetails?.user?.firstName,
                userDetails?.user?.lastName
              );
              let addNameClone = addName.cloneNode(true);
              let addMiceClone = addMice.cloneNode(true);
              let addMiceCloneCameraOff = addMice.cloneNode(true);

              addNameClone.appendChild(addMiceClone);
              addMiceClone.classList.add("d-none");
              addNameClone.classList.add("hostUserName");
              cloneNode.firstChild.firstChild.lastChild.appendChild(
                addMiceCloneCameraOff
              );
              wrapper?.appendChild(addNameClone);
              wrapper?.appendChild(cloneNode);
              wrapper.id = `mainDiv-${el}`;
              wrapper?.appendChild(item);
              document.getElementById("remote").appendChild(wrapper);
            }
          });
        });
      }
    }
  }, [hostArr, userIdArr, updateCameraState, userIdIndex]);

  useEffect(() => {
    // scrollView add div
    console.log("userIdArrscroll", userIdArr);
    if (userIdArr?.length > 0) {
      userIdArr?.map((el, id) => {
        if (id > 5) {
          scrollViewHostArr?.map((item, idx) => {
            if (
              item?.id !== `mainDiv-${el}` &&
              id === idx &&
              item?.id !== `parent`
            ) {
              let userDetails = userList?.find(
                (val) => val?.userId === el && val
              );
              // let userProfileImage = document.getElementById("userImage");
              let wrapper = document.createElement("div");
              let addName = document.createElement("span");
              let addMice = document.getElementById("mice");
              addName.innerHTML = getFullName(
                userDetails?.user?.firstName,
                userDetails?.user?.lastName
              );

              // userProfileImage.src = userDetails?.profileImageUrl;
              const textNode = document.getElementById(
                "parentMuteVideoCallHost"
              );
              let cloneNode = textNode.cloneNode(true);

              cloneNode.firstChild.firstChild.firstChild.firstChild.src =
                userDetails?.user?.profileImageUrl;
              cloneNode.firstChild.firstChild.lastChild.innerHTML = getFullName(
                userDetails?.user?.firstName,
                userDetails?.user?.lastName
              );
              let addNameClone = addName.cloneNode(true);
              let addMiceClone = addMice.cloneNode(true);
              addNameClone.appendChild(addMiceClone);
              addMiceClone.classList.add("d-none");
              addNameClone.classList.add("hostUserName");
              wrapper?.appendChild(addNameClone);
              wrapper?.appendChild(cloneNode);
              wrapper.id = `mainDiv-${el}`;
              wrapper?.appendChild(item);
              document.getElementById("scrollView").appendChild(wrapper);
              let scrollViewElement = document.getElementById("scrollView");
              scrollViewInnerDiv = Array?.from(scrollViewElement?.children);
              setElement(scrollViewInnerDiv);
            }
          });
        }
      });
    }
  }, [scrollViewHostArr]);

  useEffect(() => {
    // Microphone Mute UnMute
    if (remoteArr?.length > 0 || state) {
      let checkMiceMute = document.getElementById("muteMice");
      let localUserMice = document.getElementById(`parent`);
      if (checkMiceMute === null) {
        checkMiceMute = <div />;
        return checkMiceMute;
      }
      checkMiceMute.onclick = async () => {
        if (isMuteAudio === false) {
          localUserMice?.childNodes[1]?.lastChild?.classList?.add("d-none");
          if (channelParameters?.localAudioTrack) {
            channelParameters?.localAudioTrack?.setMuted(false);
          }
          if (state.localAudioTrack) {
            state.localAudioTrack?.setMuted(false);
          }
          setMiceMuteUnMute(true);
          isMuteAudio = true;
        } else {
          localUserMice?.childNodes[1]?.lastChild?.classList?.remove("d-none");
          if (channelParameters?.localAudioTrack) {
            channelParameters?.localAudioTrack?.setMuted(true);
          }
          if (state.localAudioTrack) {
            state.localAudioTrack?.setMuted(true);
          }
          setMiceMuteUnMute(false);
          isMuteAudio = false;
        }
      };
    }
  }, [remoteArr, state]);

  useEffect(() => {
    if (remoteArr?.length > 0 || state) {
      // Camera Mute unMute
      let checkCameraMute = document.getElementById("muteVideo");
      if (checkCameraMute === null) {
        checkCameraMute = <div />;
        return checkCameraMute;
      }
      checkCameraMute.onclick = async () => {
        const innerDiv = document.getElementById(`parent`);
        let localDiv = document.getElementById(`parent`);
        if (isMuteVideo === false) {
          innerDiv?.firstChild?.classList?.add("d-none");
          innerDiv?.lastChild?.classList?.remove("d-none");
          localDiv?.childNodes[1].classList.add("d-none");
          state?.localVideoTrack?.setEnabled(false);
          setCameraMuteUnMute(true);
          isMuteVideo = true;
        } else {
          innerDiv?.firstChild?.classList?.remove("d-none");
          innerDiv?.lastChild?.classList?.add("d-none");
          localDiv?.childNodes[1].classList.remove("d-none");
          state?.localVideoTrack?.setEnabled(true);
          setCameraMuteUnMute(false);
          isMuteVideo = false;
        }
      };
    }
  }, [remoteArr, state]);

  useEffect(() => {
    if (volumeIcon && state?.localAudioTrack) {
      let volControl = document.getElementById("localAudioVolume");
      if (volControl === null) {
        volControl = <div />;
        return volControl;
      }

      volControl.addEventListener("change", (evt) => {
        setVolumeCount(parseInt(evt.target.value));
        state?.localAudioTrack?.setVolume(parseInt(evt.target.value));
        if (parseInt(evt.target.value) === 0) {
          let volLocalControl = document.getElementById("local");
          volLocalControl.muted = true;
          setVolumeIcon(false);
        }
      });
    }
  }, [volumeIcon, state]);

  useEffect(() => {
    // scrollView onClick functionality
    if (element?.length > 0) {
      element?.forEach((el) => {
        el.addEventListener("click", (e) => {
          const findTrack = remoteArr.find(
            (item) => item?._player?.videoElement?.id === e?.target?.id
          );
          if (findTrack) {
            let lastChild = document.getElementById("remote").lastElementChild;
            lastElementId = lastChild.lastChild;
            let lastElementTract = remoteArr.find(
              (item) => `agora-video-player-${item?._ID}` === lastElementId?.id
            );

            if (findTrack) {
              lastElementTract.play("scrollView");
            }
            let checkReplaceDiv = document.getElementById(
              `mainDiv-${findTrack?._userId}`
            );
            userIdArr.push(findTrack?._userId);

            checkReplaceDiv?.remove();

            const scrollViewWrapper = document.getElementById("scrollView");
            let childrens = Array?.from(scrollViewWrapper?.children);
            if (childrens?.length) {
              childrens?.map((item, idx) => {
                if (
                  item?.id !== `mainDiv-${lastElementTract?._userId}` &&
                  item?.id !== `parent` &&
                  idx + 1 === childrens?.length
                ) {
                  let wrapper = document.createElement("div");
                  const textNode = document.getElementById(
                    "parentMuteVideoCallHost"
                  );
                  let cloneNode = textNode.cloneNode(true);
                  wrapper?.appendChild(cloneNode);
                  wrapper.id = `mainDiv-${lastElementTract?._userId}`;
                  wrapper?.appendChild(item);
                  document.getElementById("scrollView").appendChild(wrapper);
                }
              });
            }

            if (childrens?.length) {
              childrens?.map((item) => {
                if (!item?.className) {
                  return item.classList.add(lastElementId.className);
                }
              });
            }
            let removeRemoteViewChild =
              document.getElementById("remote").lastElementChild;
            removeRemoteViewChild?.remove();
            findTrack.play("remote");
            const boxWrapperr = document.getElementById("remote");
            let childs = Array?.from(boxWrapperr?.children);

            childs?.map((item, idx) => {
              if (
                item?.id !== `mainDiv-${findTrack?._userId}` &&
                idx + 1 === childs?.length
              ) {
                let wrapper = document.createElement("div");
                const textNode = document.getElementById(
                  "parentMuteVideoCallHost"
                );
                let cloneNode = textNode.cloneNode(true);
                wrapper?.appendChild(cloneNode);
                wrapper.id = `mainDiv-${findTrack?._userId}`;
                wrapper?.appendChild(item);
                document.getElementById("remote").appendChild(wrapper);
              }
            });

            if (childs?.length) {
              childs?.map((item) => {
                if (!item?.className) {
                  let newClass = scrollViewInnerDiv?.find(
                    (items) =>
                      items?.id === `agora-video-player-${findTrack?._ID}`
                  );
                  return item.classList.add(newClass?.className);
                }
              });
            }
          }
          let scrollViewElements = document.getElementById("scrollView");
          scrollViewInnerDiv = Array?.from(scrollViewElements?.children);
          setElement(scrollViewInnerDiv);
        });
      });
    }
  }, [element]);

  const createAgoraToken = async () => {
    setLoading(true);
    try {
      let id = "";
      if (callDetails?.channelId) {
        id = callDetails?.channelId;
      } else if (meetingStartedEvent?.chatRoomId) {
        id = meetingStartedEvent?.chatRoomId;
      } else {
        id = CallingData?.chatRoomId;
      }
      const res = await CommonService.createToken(id);
      if (res?.success) {
        setToken(res?.data?.token);
      }
    } catch (error) {
      logger(error);
    }
  };

  // useEffect(() => {
  //   if (!token) {
  //     getParticipantList();
  //     createAgoraToken();
  //   }
  // }, [token]);

  useEffect(() => {
    if (searchValue?.length >= 3 || searchValue?.length === 0) {
      getParticipantList(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (meetingEndEvent) {
      leaveCall("leaveCall");
    }
  }, [meetingEndEvent]);

  useEffect(() => {
    if (leaveUserState) {
      const existDiv = document.getElementById("remote");
      setHostCount(existDiv?.childNodes?.length);
      if (existDiv?.childNodes?.length === 1) {
        let localProfile = document.getElementById("localProfile");
        localProfile.classList.add("rounded-0");
      }
      setLeaveUserState(false);
    }
  }, [leaveUserState]);

  useEffect(() => {
    // if (getLocalStream !== null) {
    //   setToken(getLocalStream);
    // }
    dispatch(
      callingData(CallingData?.chatRoomId ? CallingData : meetingStartedEvent)
    );
  }, [meetingStartedEvent]);

  useEffect(() => {
    if (state?.localVideoTrack) {
      dispatch(UpdateLocalStreamData(token));
    }
  }, [state]);

  useEffect(() => {
    if (token) {
      startBasicCall();
      joinCalls();
    }
  }, [token]);

  useEffect(() => {
    if (performance.navigation.type === 1) {
      if (
        localStorage.getItem("userIDCount") === "1" ||
        localStorage.getItem("userIDCount") === "2"
      ) {
        socket.emit(
          "meeting_end",
          {
            messageId:
              CallingData?.roomMessage?.id ||
              meetingStartedEvent?.roomMessage?.id,
            userId: userData?.id,
            chatRoomId:
              meetingStartedEvent?.chatRoomId || CallingData?.chatRoomId,
            userImage: "",
            roomName: CallingData?.roomName,
            channelCode: CallingData?.channelCode,
          },
          async (ack) => {
            let message = {
              createdAt: new Date().toISOString(),
              messageDetail: ack?.messageDetail?.roomMessage,
            };
            if (ack?.success) {
              handleAddChannelNewMessage(message);
              localStorage.setItem("callStart", null);
              dispatch(UpdateLocalStreamData(null));
              let data = {};
              dispatch(updateCallData(data));
              dispatch(callingData(data));
              window.close();
            }
          }
        );
      } else {
        window.close();
      }
    }
  }, []);

  useEffect(() => {
    getParticipantList();
    createAgoraToken();
  }, []);

  return (
    <div className="VideoCall">
      <>
        <div className="VideoCall_member position-relative">
          <ul className="rightHostVideo VideoCall_member_list list-unstyled d-flex flex-wrap justify-content-center mb-0">
            <>
              <li
                id="remote"
                className={
                  hostCount <= 6
                    ? `commonVideo ${classObj[hostCount]}`
                    : "commonVideo multiVideoRightHost"
                }
              >
                {loading && (
                  <span className="videoCallingLoader text-center">
                    <Spinner animation="border" className="text-500" />
                  </span>
                )}
              </li>
              <li
                className={hostCount > 6 ? "commonRightVideo" : "d-none"}
                id="scrollView"
              />
            </>
          </ul>
          <div
            className="VideoCall_member_active position-fixed"
            id="singleUser"
          >
            <div className="commonRightVideo  hoverNone" id="parent">
              <video autoPlay muted loop className="w-100" id="local" />

              <span className="hostUserName hostUserName_localUSer">
                {!loading && "You"}
                <span className="icon-unmute ms-2 d-none">
                  <em className="path1" />
                  <em className="path2" />
                  <em className="path3" />
                  <em className="path4" />
                </span>
              </span>
              {/* <span>{getFullName(userData?.firstName, userData?.lastName)}</span> */}

              {/* <div className="d-none">
                <div className="userAvatar userAvatar-lg danger d-flex justify-content-center align-items-center mb-2 mx-auto">
                  
                  <ImageElement
                    previewSource={userData?.profileImageUrl}
                    alt="Image"
                  />
                </div>
              </div> */}
              <div className="videoHostName d-none d-flex align-items-center justify-content-center">
                <div
                  className="rightBarDetail_profile text-center w-auto h-auto rou nded-0"
                  id="localProfile"
                >
                  <span>
                    <div className="userAvatar userAvatar-lg danger d-flex justify-content-center align-items-center mb-2 mx-auto">
                      {/* <span>WO</span> */}
                      <img
                        src={userData?.profileImageUrl}
                        alt="Image"
                        origin="anonymous"
                      />
                    </div>
                    <div className="detail h-auto">You</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="audioCall_control">
          <div className="audioCall_control_space">
            <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0">
              <li id="muteVideo">
                <Link to="#">
                  <span
                    id="camera"
                    className={
                      cameraMuteUnMute ? "icon-video-off" : "icon-video-call"
                    }
                  >
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
                  leaveCall(hostCount > 1 ? "leaveCall" : "endCall");
                }}
                id="leaveCall"
              >
                <Link
                  to="#"
                  className="w-100 h-100"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span className="icon icon-phone" />
                </Link>
              </li>
              <li>
                <div className="volumeSlider position-relative">
                  {volumeIcon && (
                    <input
                      type="range"
                      min="0"
                      id="localAudioVolume"
                      max="100"
                      step="1"
                      defaultValue={volumeCount}
                      className="volumeSlider_side"
                    />
                  )}
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (volumeIcon) {
                        setVolumeIcon(false);
                      } else {
                        setVolumeIcon(true);
                      }
                    }}
                  >
                    <span
                      className={
                        volumeCount > 0 ? "icon-speaker" : "icon-silent"
                      }
                      // className="icon-silent"
                    >
                      <em className="path1" />
                      <em className="path2" />
                      <em className="path3" />
                      <em className="path4" />
                      <em className="path5" />
                    </span>
                  </Link>
                </div>
              </li>
              {/* <li>
                <div className="audioCall_addmember">
                  <Dropdown className="d-inline-block ">
                    <Dropdown.Toggle
                      as="a"
                      className="d-inline-flex align-items-center"
                      id="dropdown-button-drop-start"
                    >
                      <span className="icon-add-user">
                        <em className="path1" />
                        <em className="path2" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      alignRight
                      className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start"
                    >
                      <div className="audioCall_addmember_head d-flex align-items-center justify-content-between">
                        <h3 className="mb-0">Participant</h3>
                        <input
                          className="form-control"
                          placeholder="Search"
                          type="text"
                          icon={
                            <div className="form-icon">
                              <em className="icon-search" />
                            </div>
                          }
                          onChange={(e) => setSearchValue(e?.target?.value)}
                        />
                      </div>
                      <div className="audioCall_memberList">
                        {participantList?.length &&
                          participantList?.map((item) => (
                            <Link className="dropdown-item">
                              <div className="user d-flex align-items-center">
                                <div className="userImage position-relative">
                                  <div className="userAvatar flex-shrink-0">
                                    <ImageElement
                                      previewSource={item?.profileImageUrl}
                                      alt="user"
                                    />
                                  </div>
                                </div>
                                <div className="user_info ms-2 ms-md-3 overflow-hidden">
                                  <h6 className="text-truncate mb-0">
                                    {getFullName(
                                      item?.firstName,
                                      item?.lastName
                                    )}
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </li> */}
              {CallingData?.userId === userData?.id && (
                <li className="callClose">
                  <Link
                    to="#"
                    className="text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      leaveCall("endCall");
                    }}
                  >
                    End Call
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="VideoCall_time">
          <p className="mb-0">
            <span>{TimerFormat(count)}</span>
          </p>
        </div>
        <div
          className="videoHostName d-none d-flex align-items-center justify-content-center w-100 h-100"
          id="parentMuteVideoCallHost"
        >
          <div
            className="rightBarDetail_profile text-center w-auto h-auto"
            id="muteVideoCallHost"
          >
            <span>
              <div className="userAvatar userAvatar-lg danger d-flex justify-content-center align-items-center mb-2 mx-auto">
                {/* <span>WO</span> */}

                <img
                  src={userData?.profileImageUrl}
                  alt="Image"
                  origin="anonymous"
                />

                {/* <ImageElement
                  id="userImage"
                  previewSource={userData?.profileImageUrl}
                  alt="Image"
                /> */}
              </div>
              <div className="detail h-auto">
                <h2>{getFullName(userData?.firstName, userData?.lastName)}</h2>
              </div>
            </span>
          </div>
        </div>
        <span className="icon-unmute ms-2 d-none" id="mice">
          <em className="path1" />
          <em className="path2" />
          <em className="path3" />
          <em className="path4" />
        </span>
      </>
    </div>
  );
}

export default AgoraCall;
