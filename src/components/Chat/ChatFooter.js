/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useContext, memo } from "react";
import { Form, Formik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next'
// import data from '@emoji-mart/data'
import Picker from "@emoji-mart/react";
import { Col, Dropdown, Row } from "react-bootstrap";

// import Media from 'apiEndPoints/Media'
import { Spin } from "antd";
import useOutsideClick from "hooks/useOutSideClick.hook";
import { SocketContext } from "context/socket.context";
import UploadInput from "components/Upload/UploadInput";
import Media from "apiEndPoints/Media";
import {
  fileIcon,
  getFileExtension,
  getUploadFileMediaType,
  logger,
  modalNotification,
} from "utils";
import { AntTextArea, Button, ImageElement, ModalComponent } from "..";

const MAX_UPLOAD_FILE_LENGTH = 15728640;

const initialState = {
  message: "",
  isOpenEmojiSelector: false,
  inputCursorPosition: null,
  fileLists: [],
  uploadFiles: [],
  uploadFileProgress: {},
  isFocus: false,
  uploadFileRequests: [],
};

let uploadFileProgress = {};

function ChatFooter(props) {
  // const { t } = useTranslation()
  const {
    userId,
    isReply,
    isMessageLoading,
    handleSubmitReply,
    handleIsMessageLoading,
    dragFiles,
    handleClearDragFiles,
    handleFooterValidation,
  } = props;
  const { socket, socketState, socketStateHandler } = useContext(SocketContext);
  const { selectedChannel } = socketState;
  const { handleAddChannelNewMessage } = socketStateHandler;
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [state, setState] = useState(initialState);
  const [mentionUsersId, setMentionUsersId] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const inputRef = React.useRef(null);
  const [micPermission, setMicPermission] = useState(false);
  const [showMic, setShowMic] = useState(false);
  const [isEnter, setIsEnter] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  let arr;

  let chatRoomMembers = [];

  if (selectedChannel?.chatRoomMembers) {
    chatRoomMembers = selectedChannel.chatRoomMembers;
  } else if (selectedChannel?.chatRoom?.chatRoomMembers) {
    chatRoomMembers = selectedChannel?.chatRoom?.chatRoomMembers;
  }

  const atTheRate = (text) => {
    arr = [];
    let count = 0;
    const atIndex = text.lastIndexOf("@");
    const textAfterAt = atIndex !== -1 ? text.slice(atIndex + 1) : "";
    if (chatRoomMembers?.length > 0)
      chatRoomMembers?.forEach?.((item) => {
        count += 1;
        if (
          (item?.user?.firstName
            ?.toLowerCase?.()
            ?.includes?.(textAfterAt?.toLowerCase?.()) ||
            item?.user?.lastName
              ?.toLowerCase?.()
              ?.includes?.(textAfterAt?.toLowerCase?.())) &&
          item?.userId !== userId
        ) {
          arr.push(item?.user);
          arr = arr.filter((member) => member?.userId !== userId);
        }
        if (chatRoomMembers.length === count) {
          arr = arr.filter((member) => member?.userId !== userId);
          setSuggestionList(arr);
        }
      });
  };

  function onChange(event) {
    const value = event?.target?.value;
    const atIndex = value.lastIndexOf("@");
    if (atIndex >= 0) {
      let temp = value;
      let array = temp.split("");
      array = array.splice(
        atIndex + 1,
        inputRef.current?.selectionStart - atIndex - 1,
      );
      const textAfterAt = array.toString().replaceAll(",", "");

      if (textAfterAt === "") {
        let tempArr = chatRoomMembers.map((item) => item?.user);
        tempArr = tempArr?.filter?.((item) => item?.userId !== userId);
        setSuggestionList(tempArr);
        setIsEnter(false);
      } else atTheRate(value);

      const dropDownToggle = document.getElementById("dropdown-basic11");
      const isDropdownOpen =
        dropDownToggle.getAttribute("aria-expanded") === "true";

      if (
        value?.charAt(value?.length - 1) === "@" ||
        value[inputRef.current?.selectionStart - 1] === "@"
      ) {
        if (!isDropdownOpen) {
          dropDownToggle.click();
          setIsEnter(false);
        }
      } else if (
        textAfterAt &&
        arr.some(
          (member) =>
            member.firstName
              .toLowerCase()
              .includes(textAfterAt.toLowerCase()) ||
            member.lastName.toLowerCase().includes(textAfterAt.toLowerCase()),
        )
      ) {
        if (!isDropdownOpen) {
          dropDownToggle.click();
          setIsEnter(false);
        }
      } else {
        setIsEnter(true);
        setSuggestionList([]);
      }
      setInputValue(value);
    } else {
      const dropDownToggle = document.getElementById("dropdown-basic11");
      const isDropdownOpen =
        dropDownToggle.getAttribute("aria-expanded") === "true";
      if (isDropdownOpen) {
        dropDownToggle.click();
        setSuggestionList([]);
        setIsEnter(true);
      }
    }
  }

  function changeText(data) {
    if (!mentionUsersId.includes(data?.id)) {
      setMentionUsersId([...mentionUsersId, data?.id]);
    }
    let i = 0;
    for (i = inputRef.current?.selectionStart - 1; i >= 0; i -= 1)
      if (inputValue.charAt(i) !== "@" && i < inputValue.lastIndexOf("@"))
        break;
    const userName = `@${data?.firstName?.trim?.()} ${data?.lastName?.trim?.()}`;
    let array = inputValue.split("");

    array.splice(i + 1, inputRef.current?.selectionStart - i - 1);
    array[inputRef.current?.selectionStart - 1] = userName;

    let content = `${array.toString().replaceAll(",", "")}`;

    setState((prevState) => ({
      ...prevState,
      message: content,
    }));
    setSuggestionList([]);
  }

  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [count, setCount] = useState(0);
  const countRef = React.useRef(null);
  const minuteRef = React.useRef(null);
  const hourRef = React.useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (audioURL !== "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [audioURL]);

  const handleStateChange = (key, value) => {
    if (
      key === "message" &&
      (value || "")?.charAt?.((value || "")?.length - 1)?.includes?.("@")
    ) {
      atTheRate(value);
    }
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
    if (!value && mentionUsersId?.length > 0) {
      setMentionUsersId([]);
    }
  };

  const emojiSelectorRef = useOutsideClick(() =>
    handleStateChange("isOpenEmojiSelector", false),
  );

  const handleUserType = (status = true) => {
    socket?.emit?.("typing", {
      userId,
      chatRoomId: selectedChannel?.id,
      isTyping: status,
      roomType: selectedChannel.type,
    });
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [isReply]);

  const handleSubmitMessage = async () => {
    try {
      const { message, uploadFiles } = state;
      if (
        state.fileLists.length > 0 &&
        state.fileLists.length !== uploadFiles.length
      ) {
        handleFooterValidation("Uploading... Please wait.");
        return;
      }
      if (
        message?.length > 0 ||
        (uploadFiles?.length > 0 &&
          uploadFiles?.some((uploadFileItem) => uploadFileItem?.status)) ||
        audioURL?.length > 0
      ) {
        handleIsMessageLoading(true);
        const messageBody = {
          roomId: selectedChannel?.id,
          fromId: userId,
          loopId: selectedChannel?.loopId,
          message,
          messageType: "text",
        };

        if (isReply) {
          messageBody.parentMessageId = isReply?.id;
          messageBody.parentMessage = isReply;
        }
        if (mentionUsersId?.length) {
          let array = [];
          mentionUsersId.forEach((item) => {
            selectedChannel?.chatRoomMembers?.forEach((data) => {
              if (data?.userId === item) {
                const fullName = `${data?.user?.firstName?.trim?.()} ${data?.user?.lastName?.trim?.()}`;
                const firstName = data?.user?.firstName;
                if (
                  messageBody.message.includes(fullName) ||
                  messageBody.message.includes(firstName)
                ) {
                  array.push(item);
                }
              }
            });
          });
          messageBody.tagUserId = array;
        }
        if (message && !uploadFiles.length) {
          await socket?.emit?.("send_message", messageBody, (ack) => {
            if (ack) {
              const newMessage = {
                ...messageBody,
                id: ack?.messageDetail?.roomMessage?.id,
                createdAt: new Date().toISOString(),
              };
              handleAddChannelNewMessage(newMessage);
            }
          });
        }
        if (uploadFiles.length > 0) {
          let media = [];
          await uploadFiles.forEach((uploadFileItem) => {
            if (uploadFileItem?.status) {
              media.push({
                mediaName: uploadFileItem?.name,
                mediaType: getFileExtension(uploadFileItem.name),
                mediaPath: uploadFileItem?.basePath,
              });
            }
          });
          if (media.length > 0) {
            const uploadFileBody = {
              roomId: selectedChannel?.id,
              fromId: userId,
              loopId: selectedChannel?.loopId,
              message,
              media,
              messageType: "media",
            };

            if (isReply) {
              uploadFileBody.parentMessageId = isReply?.id;
              uploadFileBody.parentMessage = isReply;
            }

            await socket?.emit?.(
              "send_message",
              uploadFileBody,
              async (ack) => {
                const newMessage = {
                  ...uploadFileBody,
                  ...(ack?.messageDetail?.roomMessage ?? {}),
                  id: ack?.messageDetail?.roomMessage?.id,
                  createdAt: new Date().toISOString(),
                };
                if (isReply) {
                  newMessage.parentMessage = isReply;
                }
                await handleAddChannelNewMessage(newMessage);
              },
            );
          }
        }
        if (isReply) {
          handleSubmitReply();
        }
        handleIsMessageLoading(false);
        handleStateChange({
          message: "",
          fileLists: [],
          uploadFiles: [],
          uploadFileProgress: {},
        });
        setAudioURL("");
        if (dragFiles) {
          handleClearDragFiles();
        }
        if (mentionUsersId?.length) {
          setMentionUsersId([]);
        }
      }
      uploadFileProgress = {};
      if (recorder) {
        setRecorder(null);
      }
    } catch (error) {
      logger(error);
    }
  };

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    if (e.key === "ArrowUp" && selectedIndex > 0) {
      e.preventDefault();
      setSelectedIndex(selectedIndex - 1);
    } else if (
      e.key === "ArrowDown" &&
      selectedIndex < suggestionList.length - 1
    ) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if ((isEnter && e.target.value.trim()) || state?.fileLists?.length > 0) {
        handleSubmitMessage();
        handleUserType(false);
      } else {
        if (suggestionList.length > 0)
          changeText(suggestionList[selectedIndex]);
        setIsEnter(true);
        setSelectedIndex(0);
      }
    }
    // if (keyCode === 13) {
    //   e.target.blur()
    // }
  };

  const handleChangeEmojiSelector = (e) => {
    const ele= document.getElementById("message");
    ele?.click();
    ele?.focus();
    const emoji = e.native;
    handleStateChange(
      "message",
      [
        state.message.slice(
          0,
          state.inputCursorPosition || state.message.length,
        ),
        emoji,
        state.message.slice(state.inputCursorPosition || state.message.length),
      ].join(""),
    );
    if (state.inputCursorPosition === state.message.length) {
      handleStateChange("inputCursorPosition", null);
    }
  };

  const handleRemoveFile = (id) => {
    if (
      state.uploadFileProgress?.[id] !== 100 &&
      state.uploadFileRequests?.[id]
    ) {
      state.uploadFileRequests?.[id]?.cancel?.();
      const uploadFileRequestsState = state.uploadFileRequests;
      delete uploadFileRequestsState?.[id];
      handleStateChange("uploadFileRequests", uploadFileRequestsState);
    }
    handleStateChange({
      fileLists: state.fileLists.filter(
        (fileListItem) => fileListItem.id !== id,
      ),
      uploadFiles: state.uploadFiles.filter(
        (fileListItem) => fileListItem.id !== id,
      ),
    });
    if (state.fileLists.length === 1) {
      handleFooterValidation("");
    }
    setAudioURL("");
    setRecorder(null);
  };

  const handleUploadFiles = async (files) => {
    const fileLists = files;

    await handleStateChange("fileLists", [...state.fileLists, ...fileLists]);

    let prevResponse = [];

    await fileLists.forEach(async (fileListItem) => {
      const fileExt = getFileExtension(fileListItem.file?.name);

      let mediaType = getUploadFileMediaType(fileExt);

      const url = Media.mediaUpload("user", mediaType);

      const formData = new FormData();
      formData.append("file", fileListItem.file);
      try {
        const source = axios.CancelToken.source();
        handleStateChange("uploadFileRequests", {
          ...state.uploadFileRequests,
          [fileListItem.id]: source,
        });
        const response = await axios.post(url, formData, {
          cancelToken: source.token,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: async (progressEvent) => {
            const progress = Math.round(
              (100 * progressEvent.loaded) / progressEvent.total,
            );
            uploadFileProgress = {
              ...uploadFileProgress,
              [fileListItem.id]: progress,
            };
            await handleStateChange("uploadFileProgress", {
              ...uploadFileProgress,
              [fileListItem.id]: progress,
            });
          },
        });
        const uploadFile = {
          ...(response?.data?.data ?? {}),
          status: response?.status === 201,
          id: fileListItem.id,
        };
        prevResponse.push(uploadFile);
      } catch (error) {
        if (error?.response?.data?.message) {
          modalNotification({
            type: "error",
            message: error.response.data.message,
          });
        }
        const uploadFile = {
          status: false,
          id: fileListItem.id,
        };
        prevResponse.push(uploadFile);
      }
      inputRef?.current?.focus();
      await handleStateChange("uploadFiles", [
        ...state.uploadFiles,
        ...prevResponse,
      ]);
      if (state.fileLists.length === state.uploadFiles.length) {
        handleFooterValidation("");
      }
    });
  };

  useEffect(() => {
    handleStateChange("fileLists", [...state.fileLists, ...dragFiles]);
  }, [dragFiles]);

  useEffect(() => {
    handleStateChange(initialState);
  }, [selectedChannel?.id]);

  async function requestRecorder() {
    const stream = await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((streams) => {
        return new MediaRecorder(streams);
      });
    return stream;
  }

  const detectInputAudioPermissions = async () => {
    const constraints = {
      audio: true,
    };
    try {
      const stream = await navigator.mediaDevices?.getUserMedia?.(constraints);
      if (stream) {
        for (const track of stream.getTracks()) {
          track.stop();
        }
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (micPermission === true) {
      setShowMic(true);
      setMicPermission(false);
    }
  }, [micPermission]);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder()
          .then(setRecorder, console.error)
          .catch((err) => alert("need permission to use microphone", err));
      }
      return;
    }
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    let items = [];
    const handleData = (e) => {
      items.push(e.data);
      const blob = new Blob(items, {
        type: "audio/ogg; codecs=opus",
      });
      let file = new File([blob], "recording.mp3");
      handleUploadFiles([{ file, id: 2 }]);
      setAudioURL(URL.createObjectURL(blob));
    };
    recorder.addEventListener("dataavailable", handleData);

    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = async () => {
    if (await detectInputAudioPermissions()) {
      setMicPermission(false);
      setIsRecording(true);
      setBackgroundColor("grey");
      setCount(0);
      countRef.current = setInterval(() => {
        setCount((timer) => (timer === 59 ? 0 : timer + 1));
      }, 1000);
      minuteRef.current = setInterval(() => {
        setMinutes((timer) => (timer === 59 ? 0 : timer + 1));
      }, 60000);
      hourRef.current = setInterval(() => {
        setHours((timer) => timer + 1);
      }, 3600000);
    } else {
      setMicPermission(true);
      // navigator.mediaDevices
      //   .getUserMedia({ audio: true })
      //   .then((stream) => {
      //     window.localStream = stream; // A
      //     window.localAudio.srcObject = stream; // B
      //     window.localAudio.autoplay = true; // C
      //   })
      //   .catch((err) => {
      //     console.error(`you got an error: ${err}`);
      //   });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setBackgroundColor("");
    setMinutes(0);
    setHours(0);
    clearInterval(countRef.current);
    clearInterval(minuteRef.current);
    clearInterval(hourRef.current);
    if (isRecording === true && recorder !== null) {
      recorder.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="chatEditor_left">
          <ul className="list-inline action mb-0">
            <button
              className="list-inline-item actionList border-0"
              onClick={() => (isRecording ? stopRecording() : startRecording())}
              disabled={disabled}
            >
              <span className="icon cursor-pointer" style={{ backgroundColor }}>
                <em className="icon-voice">
                  <em className="path1" />
                  <em className="path2" />
                </em>
              </span>
              {isRecording && (
                <span>{`${hours > 0 ? hours : ""}${hours > 0 ? ":" : ""} ${
                  minutes === 0 ? "00" : minutes
                } : ${count}`}</span>
              )}
            </button>
          </ul>
        </div>
        <div className="chatEditor_center">
          <div className="form-control-wrap ">
            <Dropdown
              className="dropdown ellipseDrop ellipseDrop-mention text-start w-75 position-absolute top-0 left-0"
              drop="up"
            >
              <Dropdown.Toggle
                as="a"
                className="d-inline-flex align-items-center text-dark no-caret font-bd ms-3"
                id="dropdown-basic11"
              />
              {suggestionList.length > 0 && (
                <Dropdown.Menu className="mt-0">
                  {suggestionList.map((item, index) => (
                    <Link
                      key={index}
                      className={`dropdown-item dropdownUser ${
                        index === selectedIndex ? "border rounded p-1 " : ""
                      }`}
                      onClick={() => changeText(item)}
                      to="#"
                    >
                      <ImageElement
                        className="dropdownUser_image img-fluid"
                        previewSource={item.profileImageUrl}
                        alt="profile"
                      />
                      &nbsp;
                      <span className="dropdownUser_name">
                        {`${item.firstName} ${item.lastName}`}
                      </span>
                    </Link>
                  ))}
                </Dropdown.Menu>
              )}
            </Dropdown>
            <Formik initialValues={{ message: "" }} enableReinitialize>
              <Form>
                <AntTextArea
                  rows={1}
                  textAreaRef={inputRef}
                  id="message"
                  name="message"
                  placeholder="Write your message"
                  className="form-control"
                  value={state.message}
                  onChange={(e) => {
                    onChange(e);
                    e.preventDefault();
                    handleStateChange("message", e.target.value);
                    handleUserType();
                  }}
                  onKeyDown={handleKeyPress}
                  onBlur={(e) => {
                    e.preventDefault();
                    handleStateChange(
                      "inputCursorPosition",
                      e.target.selectionStart,
                    );
                    handleUserType(false);
                  }}
                  style={{ whiteSpace: "pre-wrap", resize: "none" }}
                  onFocus={(e) => {
                    e.preventDefault();
                    handleUserType();
                  }}
                />
              </Form>
            </Formik>
          </div>
        </div>
        <div className="chatEditor_right">
          <ul className="list-inline action mb-0">
            <li className="list-inline-item actionList">
              <span
                className="icon cursor-pointer"
                onClick={() => handleStateChange("isOpenEmojiSelector", true)}
              >
                <span className="icon-smiley">
                  <span className="path1" />
                  <span className="path2" />
                </span>
              </span>
              {state.isOpenEmojiSelector && (
                <div
                  ref={emojiSelectorRef}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 10,
                    zIndex: 9,
                  }}
                >
                  <Picker
                    // data={data}
                    autoFocus
                    onEmojiSelect={(e) =>handleChangeEmojiSelector(e)}
                    showPreview
                    emoji="point_up"
                    previewPosition="none"
                    // set={isWindows() ? 'google' : 'apple'}
                  />
                </div>
              )}
            </li>
            <li className="list-inline-item actionList">
              <UploadInput
                onUpload={handleUploadFiles}
                multiple
                fileMaxCount={5}
                maxFiles={state.uploadFiles.length}
                disabled={
                  dragFiles?.length === 5 || state.uploadFiles.length === 5
                }
                maxFileLength={MAX_UPLOAD_FILE_LENGTH}
              >
                <span className="icon cursor-pointer">
                  <span className="icon-attachment" />
                </span>
              </UploadInput>
            </li>

            <li
              onClick={() => {
                if (
                  (state.message?.length > 0 && !isMessageLoading) ||
                  state.fileLists.length > 0
                ) {
                  handleUserType(false);
                  handleSubmitMessage(state.message, state.fileList);
                  handleStateChange("fileList", []);
                }
              }}
              className="list-inline-item actionList"
            >
              <span className="icon send cursor-pointer">
                <em className="icon-send" />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <ModalComponent
        show={showMic}
        onHandleCancel={() => {
          setShowMic(false);
        }}
        title="Please Check"
        size="lg"
      >
        <h5 className="text-danger">
          Your Device didn&apos;t have Microphone Permission!
        </h5>
        &nbsp;
        <div className="text-end modalFooter">
          <div className="stepsBtn d-flex justify-content-end">
            <Button
              type="primary"
              onClick={() => {
                setShowMic(false);
              }}
              className="btn btn-info"
            >
              Close
            </Button>
          </div>
        </div>
      </ModalComponent>
      {state?.fileLists?.length > 0 && (
        <div className="uploadList mt-2">
          <Row className="g-2">
            {state.fileLists.map((fileListItem, idx) => (
              <Col key={idx} md={4}>
                <div
                  className={`uploadList_item d-flex justify-content-between align-items-center ${
                    state.uploadFiles?.some?.(
                      (item) => item?.id === fileListItem?.id && !item?.status,
                    )
                      ? "border border-2 border-danger"
                      : ""
                  }`}
                >
                  <div className="uploadList_file d-flex align-items-center">
                    {fileListItem.file.name === "recording.mp3" ? (
                      <>
                        {!isRecording && audioURL && (
                          <>
                            <ImageElement
                              source={`files-icons/${fileIcon?.mp3?.file}`}
                              alt="upload-document"
                            />
                            <div className="uploadList_audioPlayer mx-2 mx-lg-3">
                              <audio
                                controls
                                src={audioURL}
                                style={{ width: "280px", height: "56px" }}
                              />
                              {/* <p className="mb-0 pl-2">
                                  {firstLetterCaps(fileListItem.file?.name)}
                                </p> */}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <ImageElement
                          source={`files-icons/${
                            fileIcon?.[getFileExtension(fileListItem.file.name)]
                              ?.file || fileIcon.file.file
                          }`}
                          alt="upload-document"
                        />
                        <p className="mb-0 ms-2">{fileListItem.file?.name}</p>
                      </>
                    )}
                  </div>
                  <div className="d-flex align-items-center mx-2">
                    <button
                      title="Remove file"
                      type="button"
                      className="uploadList_delete"
                      onClick={() => handleRemoveFile(fileListItem.id)}
                    >
                      <span className="icon-close" />
                    </button>
                    {Object.prototype.hasOwnProperty.call(
                      state.uploadFileProgress,
                      fileListItem?.id,
                    ) &&
                      state.uploadFileProgress?.[fileListItem?.id] !== 100 && (
                        <Spin size="default" />
                      )}
                  </div>
                </div>
                {/* {getUploadFileProgressValue()?.[fileListItem?.id] &&
                  getUploadFileProgressValue()?.[fileListItem?.id] !== 100 && (
                    <ProgressBar
                      ref={uploadFileProgressRef}
                      striped
                      variant="success"
                      animated
                      now={getUploadFileProgressValue()?.[fileListItem?.id]}
                    />
                  )} */}
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

export default memo(ChatFooter);
