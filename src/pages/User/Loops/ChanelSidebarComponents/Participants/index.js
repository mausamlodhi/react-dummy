import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Spin } from "antd";
import { Formik, Form } from "formik";
import {
  AntTextArea,
  CommonButton,
  GlobalLoader,
  ImageElement,
  ModalComponent,
  Popovers,
  RippleEffect,
} from "components";
import { ChatServices, ContactListServices, LoopService } from "services";
import {
  getFullName,
  logger,
  modalNotification,
  userChatStatusOptions,
} from "utils";
import { SocketContext } from "context/socket.context";
import useDebounce from "hooks/useDebounce";
import routesMap from "routeControl/userRouteMap";

const PER_PAGE_DATA = 15;

export default function ParticipantList({
  myRef,
  selectLoopRoom,
  setSidebarOpenKey,
  setAddParticipantsModal,
  setManageParticipants,
  createdBy,
  disableChat,
  userData,
}) {
  const debounce = useDebounce();
  const navigate = useNavigate();

  const { socketState, socketStateHandler } = useContext(SocketContext);
  const [state, setState] = useState({
    lists: [],
    count: 0,
    isLoading: false,
    isCopyMassageAlert: false,
    currentPage: 0,
    search: "",
    hasMoreFetch: true,
    isFetchMoreLoading: false,
  });
  const inputElem = useRef(null);
  const { selectedChannel } = socketState;
  const { isUserOnline, getUserChatStatus } = socketStateHandler;
  const [removeParticipant, setRemoveParticipant] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const { socket } = useContext(SocketContext);
  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    handleStateChange("isCopyMassageAlert", true);
    setTimeout(() => {
      handleStateChange("isCopyMassageAlert", false);
    }, 1400);
  };

  const getParticipantLists = async ({
    search = "",
    isSearch = false,
    isMoreFetch = false,
  } = {}) => {
    try {
      state.lists = [];
      state.isLoading = false;
      if (!isMoreFetch) {
        handleStateChange({
          isLoading: true,
          lists: search || isSearch ? [] : state.lists,
        });
      } else {
        handleStateChange("isFetchMoreLoading", true);
      }
      const queryParams = {
        search,
        offset:
          (isMoreFetch
            ? state.currentPage + 1
            : isSearch
            ? 0
            : state.currentPage) * PER_PAGE_DATA,
        limit: PER_PAGE_DATA,
      };
      const response = await LoopService.getChannelMemberListsService(
        selectedChannel?.id,
        queryParams
      );
      const lists = [
        ...(isMoreFetch ? state.lists : []),
        ...(response?.data?.rows ?? []),
      ];
      handleStateChange({
        lists,
        count: response?.data?.count ?? 0,
        isLoading: false,
        hasMoreFetch: lists.length < response?.data?.count ?? 0,
      });
    } catch (error) {
      logger(error);
    }
  };

  const handleSearch = useCallback(
    debounce(
      (inputVal) => getParticipantLists({ search: inputVal, isSearch: true }),
      1200
    ),
    []
  );

  const addContact = async (id,document) => {
    try {
      let bodyData = {
        contactUserId: id,
      };
      const response = await ContactListServices.addContactService(bodyData);
      if (response?.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
        document?.body?.click()
      }
    } catch (error) {
      logger(error);
    }
  };

  const singleChat = async (id) => {
    try {
      let bodyData = {
        userId: id,
      };
      const response = await ChatServices.singleChatService(bodyData);
      if (response?.success) {
        localStorage.setItem("chatData", response?.data?.id);
        navigate(routesMap.CHAT.path);
      }
    } catch (error) {
      logger(error);
    }
  };

  const handleSubmitMessage = async (chat) => {
    try {
      let data = {
        userId: chat?.userId,
        chatRoomId: chat?.roomId,
      };
      if (userData?.id !== chat?.userId) {
        data.removeBy = userData?.id;
      }

      await socket?.emit?.("left_chat_room", data, (ack) => {
        if (ack?.success === true) {
          setRemoveParticipant(false);
          getParticipantLists();
        }
      });
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (selectLoopRoom?.id) {
      getParticipantLists();
    }
  }, [selectLoopRoom]);

  return (
    <div className="rightBarDetail vh-100" ref={myRef}>
      <div className="rightBarDetail_header align-items-center d-flex position-relative">
        <h4 className="w-100 font-bd">Participants</h4>
        <Link
          to="#"
          onClick={() => {
            setSidebarOpenKey("");
            setManageParticipants(true);
          }}
          className="link-primary flex-shrink-0 font-sb text-decoration-underline"
        >
          Manage Participants
        </Link>
        <Link
          to="#"
          onClick={() => {
            setSidebarOpenKey("");
          }}
          className="closeBar position-static flex-shrink-0"
        >
          <em className="icon icon-close" />
        </Link>
      </div>
      <div className="rightBarDetail_filter d-flex align-items-center">
        <div className="searchBox">
          <div className="form-group mb-0">
            <div className="form-control-wrap">
              <input
                ref={inputElem}
                onChange={() => handleSearch(inputElem.current?.value)}
                className="form-control"
                placeholder="Search"
                type="text"
                icon={
                  <div className="form-icon">
                    <em className="icon-search" />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rightBarDetail_participants" id="participantDiv">
        {state.isLoading && !state.lists.length ? (
          <div className="d-flex justify-content-center">
            <GlobalLoader />
          </div>
        ) : !state.isLoading && state.lists.length > 0 ? (
          <div
            className="participantsList"
            // style={{ height: '80vh' }}
          >
            <InfiniteScroll
              dataLength={state.currentPage * PER_PAGE_DATA}
              hasMore={state.lists.length < state.count}
              loader={
                <Spin className="d-flex justify-content-center pt-1 pb-3" />
              }
              scrollableTarget="participantDiv"
              next={() =>
                !state.isFetchMoreLoading && state.hasMoreFetch
                  ? getParticipantLists({ isMoreFetch: true })
                  : null
              }
              style={{
                height: "100%",
                overflow: "inherit",
              }}
            >
              {}
              {state.lists.map((listItem, idx) => (
                <div
                  key={idx}
                  className="participantsList_item d-flex align-items-center"
                >
                  <div className="user d-flex align-items-center overflow-hidden">
                    <Popovers
                      overlayClassName="pUserInfo"
                      placement="bottomLeft"
                      content={
                        <>
                          <div className="pUserInfo_top">
                            <div className="d-flex align-items-start">
                              <div className="userAvatar userAvatar-lg">
                                <ImageElement
                                  className="img-fluid"
                                  previewSource={
                                    listItem?.user?.profileImageUrl
                                  }
                                  alt="profile"
                                  crossOrigin="anonymous"
                                />
                              </div>
                              <div className="userBox_content">
                                <h5 className="font-bd mb-0">
                                  {getFullName(
                                    listItem?.user?.firstName,
                                    listItem?.user?.lastName
                                  )}
                                </h5>

                                <span
                                  className={`font-sb status ${
                                    userChatStatusOptions[
                                      getUserChatStatus(listItem?.userId)
                                    ]?.key
                                  }`}
                                >
                                  {
                                    userChatStatusOptions[
                                      getUserChatStatus(listItem?.userId)
                                    ]?.label
                                  }
                                </span>
                                {listItem?.status !== "left" && (
                                  <ul className="chatHead_toolsList list-inline mb-0">
                                    <li className="list-inline-item">
                                      <Link className="chatHead_toolsList_icon">
                                        <em className="icon icon-video">
                                          <em className="path1" />
                                          <em className="path2" />
                                        </em>
                                      </Link>
                                    </li>
                                    <li className="list-inline-item">
                                      <Link className="chatHead_toolsList_icon d-flex align-item-center">
                                        <em className="icon icon-phone" />
                                      </Link>
                                    </li>
                                    <li className="list-inline-item">
                                      <Link className="chatHead_toolsList_icon d-flex align-item-center">
                                        <em className="icon icon-chat" />
                                      </Link>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="pUserInfo_center">
                            <h6 className="font-bd">Contact </h6>
                            <ul className="list-unstyled pUserInfo_list mb-0">
                              <li className="d-flex">
                                <span
                                  className={`font-sb status ${
                                    isUserOnline(listItem?.userId)
                                      ? "available"
                                      : "away"
                                  }`}
                                >
                                  <em className="icon-check" />
                                </span>
                                &nbsp;
                                <span className="info">Available</span>
                              </li>
                              <li>
                                <em className="icon icon-phone" />
                                &nbsp;
                                <span className="info">
                                  {listItem?.user?.phoneNumber}
                                </span>
                              </li>
                              <li>
                                <span className="icon icon-email">
                                  <span className="path1" />
                                  <span className="path2" />
                                </span>{" "}
                                <span className="info">
                                  {listItem?.user?.email}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="pUserInfo_bottom">
                            <Formik
                              initialValues={{ description: "" }}
                              onSubmit={(e) => console.log(e)}
                            >
                              {(props) => {
                                return (
                                  <Form>
                                    <Row>
                                      <Col sm="12">
                                        <div className="form-group">
                                          <div className="form-control-wrap">
                                            <AntTextArea
                                              id="description"
                                              className="form-control"
                                              name="description"
                                              disabled={false}
                                              variant="standard"
                                              type="description"
                                              placeholder="Send a quick message"
                                              setFieldValue={props.handleChange}
                                              icon=""
                                            />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col sm="12 text-end">
                                        <Button
                                          type="submit"
                                          className="btn btn-secondary btn-sm"
                                        >
                                          Send
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Form>
                                );
                              }}
                            </Formik>
                          </div>
                        </>
                      }
                    >
                      <div className="chat_image position-relative">
                        <div className="userAvatar">
                          <ImageElement
                            className="img-fluid"
                            previewSource={listItem?.user?.profileImageUrl}
                            alt="profile"
                          />
                        </div>
                        <span
                          className={`statusdot statusdot-${
                            userChatStatusOptions[
                              getUserChatStatus(listItem?.userId)
                            ]?.key
                          }`}
                        />
                      </div>
                    </Popovers>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        {getFullName(
                          listItem?.user?.firstName,
                          listItem?.user?.lastName
                        )}
                      </h4>
                      <p className="owner">
                        {listItem?.loopRolePermission?.channelRole?.role}
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      {userData?.id !== listItem?.userId ? (
                        <li>
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              singleChat(listItem?.userId);
                            }}
                          >
                            <span className="icon-chat">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                      <li>
                        <Dropdown className="ellipseDrop d-inline-block">
                          <Dropdown.Toggle
                            as="a"
                            className="d-inline-flex align-items-center"
                            id="dropdown-basic"
                          >
                            <span className="icon-ellipse" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-end">
                            {listItem?.status !== "left" && (
                              <Link
                                className="dropdown-item"
                                onClick={document.body.click()}
                                to="#"
                              >
                                <span className="icon-phone" />
                                Call
                              </Link>
                            )}
                            {listItem?.status !== "left" && (
                              <Link
                                className="dropdown-item"
                                onClick={document.body.click()}
                                to="#"
                              >
                                <span className="icon-video">
                                  <em className="path1" />
                                  <em className="path2" />
                                </span>
                                Video Call
                              </Link>
                            )}
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                handleCopyToClipboard(listItem?.user?.email);
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Email
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                handleCopyToClipboard(
                                  listItem?.user?.phoneNumber
                                );
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            {userData?.id !== listItem?.userId && (
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addContact(listItem?.userId,document);
                                }}
                              >
                                <span className="icon-add-contact">
                                  <em className="path1" />
                                  <em className="path2" />
                                </span>
                                Add Contact
                              </Link>
                            )}
                            { !disableChat?.includes(userData?.id)&&listItem?.status !== "left" &&
                              createdBy !== listItem?.userId && (
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document.body.click();
                                    setRemoveParticipant(true);
                                    setSelectedMember(listItem);
                                  }}
                                >
                                  <span className="icon-add-contact">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>
                                  Remove
                                </Link>
                              )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : null}
        <ModalComponent
          backdrop
          show={removeParticipant}
          onHandleCancel={() => setRemoveParticipant(false)}
          size="md"
          title="Are you sure?"
          extraClassName="removeModal"
        >
          <>
            <p className="mb-0">
              This participant will be remove from this channel
            </p>
            <div className="text-end modalFooter">
              <CommonButton
                onClick={() => setRemoveParticipant(false)}
                variant="light"
              >
                No
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => handleSubmitMessage(selectedMember)}
                className="ms-2 ms-md-3"
              >
                Yes
              </CommonButton>
            </div>
          </>
        </ModalComponent>

        {/* <div className="plusIcon plusIcon-sm">
              <Link to="#"><em className="icon-plus" /></Link>
            </div> */}
      </div>
      <div className="position-relative">
        {/* copied clipboard */}
        {state.isCopyMassageAlert && (
          <div className="copiedClipboard copiedClipboard-sidebar d-flex justify-content-center">
            <span className="info">Copied to Clipboard</span>
          </div>
        )}
        {disableChat && !disableChat.includes(userData?.id) && (
          <div className="text-center pt-2">
            <RippleEffect>
              <CommonButton
                variant="info"
                onClick={() => setAddParticipantsModal(true)}
              >
                Add Participants
              </CommonButton>
            </RippleEffect>
          </div>
        )}
      </div>
    </div>
  );
}
