import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { Col, Row, Tab, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SocketContext } from "context/socket.context";

import userRoutesMap from "routeControl/userRouteMap";
import {
  AntSelect,
  AntTooltip,
  CommonButton,
  ModalComponent,
  Popovers,
  Switch,
  LinkComponent,
} from "components";
import { removeSessionStorage, setSessionStorage } from "utils";
import ParticipantsTabs from "pages/User/ParticipantTab/index.page";
import LoopsInfo from "../LoopsInfo";
import ChanelInformation from "../ChanelSidebarComponents/Information";
import ParticipantList from "../ChanelSidebarComponents/Participants";
import ChannelNotes from "../ChanelSidebarComponents/Notes";
import ChannelFiles from "../ChanelSidebarComponents/ChannelFiles";
import ChannelCallHistory from "../ChanelSidebarComponents/ChannelCallHistory";
import StepOne from "../StepForm/StepOne/index.page";

import StepTwo from "../StepForm/StepTwo/index.page";
import StepThree from "../StepForm/StepThree/index.page";
import CreateChannelModel from "../LoopsModel/CreateChannel";

function LoopsSidebar({
  selectLoopRoom,
  addParticipants,
  setAddParticipantsModal,
  channelModal,
  hideCreateChannelModal,
  userRoleBlock,
  setParticipantListBlock,
  setUserRoleBlock,
  participantListBlock,
  loopInfoSidebar,
  sidebarOpenKey,
  setSidebarOpenKey,
  chatInfoOpen,
  setChatInfoOpen,
  setAudioCall,
  loopData,
  getLoopData,
  // loopLoading,
  loopIdData,
  loopDatas,
  countryList,
  stateList,
  getStateList,
  channelLoopId,
  setChannelLoopId,
  channel,
  setChannel,
  getPinChannels,
  channelDetails,
  setManageParticipants,
  chatOpen,
  onHandleCreateChannel,
  channelTypeForm,
  getChannelInformation,
  channelInfoLoading,
  setChannelFormType,
  stateListLoading,
  createdBy,
  disableChat,
  userData,
  singleChat
}) {
  const { socketState } = useContext(SocketContext);
  const { t } = useTranslation();
  const [copyMassageAlert, setCopymassageAlert] = useState(false);
  const [counter, setCounter] = useState(0);
  const [newChannelDetails, setNewChannelDetails] = useState(null);
  const [isOpenChannelInfo, setIsOpenChannelInfo] = useState(false);
  const messageListRef = useRef(null);
  const [flg, setFlg] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [popoverVisible, setPopoverVisible] = useState(false);

  const handlePopoverVisibleChange = (visible) => {
    setFlg(!flg);
    setPopoverVisible(visible);
  };
  const chatSidebar = [
    {
      name: t("text.adminCms.faq"),
      path: userRoutesMap.FAQ.path,
      icon: "icon-faqs",
    },
    {
      name: t("text.raiseQuery.raiseQuery"),
      path: userRoutesMap.RAISE_QUERY.path,
      icon: "icon-raise-query",
    },
    {
      name: t("text.adminCms.privacyPolicy"),
      path: userRoutesMap.PRIVACY_POLICY.path,
      icon: "icon-privacy-policy",
    },
    {
      name: t("text.adminCms.termsAndConditions"),
      path: userRoutesMap.Terms_And_Condition.path,
      icon: "icon-terms-conditions",
    },
  ];

  const hideaddParticipants = () => {
    setAddParticipantsModal(false);
  };
  const [settings, setSettings] = useState(false);
  const hideSettings = () => {
    setSettings(false);
  };

  const location = useLocation();
  const { pathname } = location;
  const myRef = useRef();

  const [loopStepModal, setEditLoopModal] = useState(false);
  const [loopStepModalType, setLoopStepModalTypel] = useState("");

  useEffect(() => {
    if (loopStepModal === true) {
      removeSessionStorage("step1Data");
    }
  }, [loopStepModal]);

  const hideEditLoopModal = () => {
    setEditLoopModal(false);
  };
  const showEditLoopModal = (type) => {
    setEditLoopModal(true);
    setLoopStepModalTypel(type);
  };
  const [removeParticipant, SetRemoveParticipant] = useState(false);
  const hideRemoveParticipant = () => {
    SetRemoveParticipant(false);
  };

  const [deleteFile, setDeleteFile] = useState(false);
  const hideDeleteFile = () => {
    setDeleteFile(false);
  };

  const [removeCallHistory, setRemoveCallHistory] = useState(false);
  const hideRemoveCallHistory = () => {
    setRemoveCallHistory(false);
  };

  const handleOpenChannelInfo = () => {
    setIsOpenChannelInfo(!isOpenChannelInfo);
  };

  const channelData = [
    {
      id: "employee",
      name: "Employee",
    },
    {
      id: "employee1",
      name: "Employee 1",
    },
    {
      id: "employee2",
      name: "Employee 2",
    },
  ];
  if (copyMassageAlert) {
    let interval = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
    if (counter === 3) {
      setCopymassageAlert(false);
      setCounter(counter + 0);
      return () => clearTimeout(interval);
    }
  }
  if (counter === 4) {
    setCounter(0);
  }
  const handleScrollToBottom = useCallback(() => {
    if (messageListRef && messageListRef?.current) {
      const element = messageListRef?.current;
      element.scroll(0, 0);
    }
  }, []);

  useEffect(() => {
    if (loopStepModalType === "loopClient") {
      getStateList({ countryId: Number(loopIdData?.countryId) });
    }
  }, [loopStepModalType]);

  useEffect(() => {
    return () => {
      setSessionStorage("Help", "help");
    };
  }, []);
  return (
    <>
      <div
        className={`chatPage_info d-flex ${
          chatInfoOpen ? "chatPage_info-open" : ""
        }`}
      >
        {sidebarOpenKey === "infoSidebar" &&
          (loopInfoSidebar ? (
            <>
              <LoopsInfo
                setSidebarOpenKey={setSidebarOpenKey}
                // myRef={myRef}
                loopData={loopIdData}
                loopId={loopData?.user?.id}
                showEditLoopModal={showEditLoopModal}
                insuranceData={loopIdData?.loopInsurance}
                loops={getLoopData}
                disableChat={disableChat}
                userData={userData}
              />
            </>
          ) : isOpenChannelInfo ? (
            // chanel sidebar
            <ChanelInformation
              channelInfoLoading={channelInfoLoading}
              setChannel={setChannel}
              onHandleCreateChannel={onHandleCreateChannel}
              myRef={myRef}
              pathname={pathname}
              showEditLoopModal={showEditLoopModal}
              setSidebarOpenKey={showEditLoopModal}
              handleOpenChannelInfo={handleOpenChannelInfo}
              disableChat={disableChat}
                userData={userData}
            />
          ) : null)}
        {sidebarOpenKey === "participantSidebar" && (
          // chanel sidebar
          <ParticipantList
            selectLoopRoom={selectLoopRoom}
            myRef={myRef}
            setSidebarOpenKey={setSidebarOpenKey}
            // setCopyMassage={setCopyMassage}
            setCopymassageAlert={setCopymassageAlert}
            SetRemoveParticipant={SetRemoveParticipant}
            copyMassageAlert={copyMassageAlert}
            setAddParticipantsModal={setAddParticipantsModal}
            setManageParticipants={setManageParticipants}
            createdBy={createdBy}
            disableChat={disableChat}
            userData={userData}
          />
        )}
        {sidebarOpenKey === "notesSidebar" && (
          // chanel sidebar
          <ChannelNotes
            ref={messageListRef}
            selectLoopRoom={selectLoopRoom}
            setSidebarOpenKey={setSidebarOpenKey}
            handleScrollToBottom={handleScrollToBottom}
            disableChat={disableChat}
            userData={userData}
            singleChat={singleChat}
          />
        )}
        {sidebarOpenKey === "filesSidebar" && (
          // chanel sidebar

          <ChannelFiles
            setDeleteFile={setDeleteFile}
            myRef={myRef}
            setSidebarOpenKey={setSidebarOpenKey}
            selectLoopRoom={selectLoopRoom}
          />
        )}
        {sidebarOpenKey === "callHistorySidebar" && (
          // chanel sidebar
          <ChannelCallHistory
            setRemoveCallHistory={setRemoveCallHistory}
            myRef={myRef}
            setSidebarOpenKey={setSidebarOpenKey}
            selectLoopRoom={selectLoopRoom}
          />
        )}
        <div
          className={
            loopInfoSidebar || socketState?.selectedChannel
              ? "rightSidebar"
              : ""
          }
        >
          <div className="rightSidebar_menu" ref={myRef}>
            <ul className="list-unstyled">
              <li className="iconClose">
                <AntTooltip
                  placement="left"
                  overlayClassName="siderbarTooltip"
                  promptText="Close"
                >
                  <Link to="#" onClick={() => setChatInfoOpen(false)}>
                    <div className="barIcon">
                      <span className="icon-close" />
                    </div>
                  </Link>
                </AntTooltip>
              </li>

              {loopInfoSidebar ? (
                <>
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Loops Information"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "infoSidebar" ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setAudioCall(false);
                          setSidebarOpenKey("infoSidebar");
                          setUserRoleBlock(false);
                          setParticipantListBlock(false);
                        }}
                      >
                        <div className="barIcon">
                          <span className="icon-info">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </div>
                      </Link>
                    </AntTooltip>
                  </li>
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Loops Role"
                    >
                      <Link
                        to="#"
                        className={`${userRoleBlock && "active"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setAudioCall(false);
                          setSidebarOpenKey("");
                          setUserRoleBlock(true);
                        }}
                      >
                        <div className="barIcon">
                          <span className="icon icon-loop-info">
                            <em className="path1" />
                            <em className="path2" />
                            <em className="path3" />
                          </span>
                        </div>
                      </Link>
                    </AntTooltip>
                  </li>
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Loops Participant List"
                    >
                      <Link
                        to="#"
                        className={`${participantListBlock && "active"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setAudioCall(false);
                          setSidebarOpenKey("");
                          setUserRoleBlock(false);
                          setParticipantListBlock(true);
                        }}
                      >
                        <div className="barIcon">
                          <span className="icon icon-users">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </div>
                      </Link>
                    </AntTooltip>
                  </li>
                </>
              ) : socketState?.selectedChannel ? (
                <>
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Channel Information"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "infoSidebar" ? "active" : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false);
                          setSidebarOpenKey("infoSidebar");
                          handleOpenChannelInfo();
                        }}
                      >
                        <div className="barIcon">
                          <span className="icon-info">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </div>
                      </Link>
                    </AntTooltip>
                  </li>
                  {pathname === userRoutesMap.CHAT.path ? (
                    <></>
                  ) : (
                    <li>
                      <AntTooltip
                        placement="left"
                        overlayClassName="siderbarTooltip"
                        promptText="Channel Participant List"
                      >
                        <Link
                          to="#"
                          className={`${
                            sidebarOpenKey === "participantSidebar"
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            setAudioCall(false);
                            setSidebarOpenKey("participantSidebar");
                          }}
                        >
                          <div className="barIcon">
                            <span className="icon-users">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                          </div>
                        </Link>
                      </AntTooltip>
                    </li>
                  )}
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Channel Notes"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "notesSidebar" ? "active" : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false);
                          setSidebarOpenKey("notesSidebar");
                        }}
                      >
                        <div className="barIcon">
                          <span className="icon-notes">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </div>
                      </Link>
                    </AntTooltip>
                  </li>
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Channel Files"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "filesSidebar" ? "active" : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false);
                          setSidebarOpenKey("filesSidebar");
                        }}
                      >
                        <div className="barIcon">
                          <span className="icon-files">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </div>
                      </Link>
                    </AntTooltip>
                  </li>
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Channel Call History"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "callHistorySidebar"
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false);
                          setSidebarOpenKey("callHistorySidebar");
                        }}
                      >
                        <div className="barIcon">
                          <span className="icon-call-history">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </div>
                      </Link>
                    </AntTooltip>
                  </li>
                  {pathname === userRoutesMap.CHAT.path ? (
                    <></>
                  ) : (
                    <li>
                      <AntTooltip
                        placement="left"
                        overlayClassName="siderbarTooltip"
                        promptText="Channel Settings"
                      >
                        <Link to="#" onClick={() => setSettings(true)}>
                          <div className="barIcon">
                            <span className="icon-setting">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                          </div>
                        </Link>
                      </AntTooltip>
                    </li>
                  )}
                  <li className="helpMenu">
                    <Popovers
                      overlayClassName="pUserInfo"
                      placement="leftBottom"
                      visible={popoverVisible}
                      onVisibleChange={handlePopoverVisibleChange}
                      content={
                        <>
                          <div className="ellipseDrop">
                            {chatSidebar.map((item) => {
                              return (
                                <LinkComponent
                                  name={item?.name}
                                  icon={item?.icon}
                                  path={item?.path}
                                />
                              );
                            })}
                          </div>
                        </>
                      }
                    >
                      <AntTooltip
                        placement="left"
                        overlayClassName="siderbarTooltip"
                        promptText="Help"
                        open={!flg && isHover}
                      >
                        <Link
                          to="#"
                          onClick={() => setFlg(!flg)}
                          onMouseOver={() => setIsHover(true)}
                          onMouseLeave={() => setIsHover(false)}
                        >
                          <div className="barIcon">
                            <span className="icon-help">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                          </div>
                        </Link>
                      </AntTooltip>
                    </Popovers>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>

        <ModalComponent
          backdrop
          show={loopStepModal}
          onHandleCancel={hideEditLoopModal}
          size="lg"
          title={
            loopStepModalType === "loopInfo"
              ? "Edit Loop Info"
              : loopStepModalType === "loopClient"
              ? "Edit Client Information"
              : loopStepModalType === "loopInsurance"
              ? "Edit Insurance Information "
              : loopStepModalType === "loopCompany"
              ? "Edit Company Information "
              : ""
          }
          extraClassName="loopModal"
        >
          <div className="loopModal_form mt-0">
            {loopStepModalType === "loopInfo" ? (
              <StepOne
                userData={loopIdData}
                hideEditLoop={() => {
                  setEditLoopModal(false);
                }}
                getLoopData={getLoopData}
                loopId={loopData?.id}
                getLoop={loopDatas}
                setEditLoopModal={setEditLoopModal}
              />
            ) : loopStepModalType === "loopClient" ? (
              <StepTwo
                userData={loopIdData}
                hideEditLoop={() => {
                  setEditLoopModal(false);
                }}
                getLoops={loopDatas}
                getLoopData={getLoopData}
                loopId={loopData?.id}
                countryList={countryList}
                stateList={stateList}
                getState={getStateList}
                step2Data={loopIdData}
                setEditLoopModal={setEditLoopModal}
                stateListLoading={stateListLoading}
              />
            ) : loopStepModalType === "loopInsurance" ? (
              <StepThree
                step3Data={loopIdData?.loopInsurance}
                hideEditLoop={() => {
                  setEditLoopModal(false);
                }}
                getLoopData={loopDatas}
                loopId={loopData?.id}
                userData={loopIdData}
                setEditLoopModal={setEditLoopModal}
                loops={getLoopData}
                loopStepModal={loopStepModal}
              />
            ) : loopStepModalType === "loopCompany" ? (
              <></>
            ) : (
              <></>
            )}
          </div>
        </ModalComponent>
        {channelModal && (
          <CreateChannelModel
            onClose={() => {
              hideCreateChannelModal();
              setChannelFormType("");
            }}
            onSubmit={(newChannel) => {
              hideCreateChannelModal();
              setNewChannelDetails(newChannel);
              if (!channel?.id) {
                setAddParticipantsModal(true);
              }
              getLoopData();
              setChannelLoopId();
              setChannel();
              getPinChannels();
            }}
            getChannelInformation={getChannelInformation}
            channelLoopId={channelLoopId}
            channel={channel}
            title={channelTypeForm}
            setChannel={setChannel}
          />
        )}

        <ModalComponent
          backdrop
          show={addParticipants}
          onHandleCancel={hideaddParticipants}
          size="lg"
          title="Add Participants"
          extraClassName="addParticipants"
        >
          <ParticipantsTabs
            channel={newChannelDetails || channelDetails}
            onClose={hideaddParticipants}
            chatOpen={chatOpen}
          />
        </ModalComponent>

        <ModalComponent
          backdrop
          show={settings}
          onHandleCancel={hideSettings}
          size="lg"
          title="Settings"
          extraClassName="modalSettings"
        >
          <>
            <div className="myProfile">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col md={4}>
                    <div className="myProfile_left p-0">
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="first">
                            <span className="icon-notification">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            {t("text.loops.notifications")}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">
                            <span className="icon-key">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            {t("text.loops.channelPermissions")}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className=" p-0">
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="modalSettings_head">
                            <h3>{t("text.loops.notifications")}</h3>
                            <p className="mb-0">
                              {t("text.loops.customizeYourNotification")}
                            </p>
                          </div>

                          <div className="modalSettings_switch d-flex justify-content-between">
                            <h6 className="mb-0">
                              {t("text.loops.showMessagePreview")}
                            </h6>
                            <Switch checked />
                          </div>

                          <div className="modalSettings_switch d-flex justify-content-between">
                            <h6 className="mb-0">
                              {t(
                                "text.loops.playSoundForIncomingCallsAndNotifications"
                              )}
                            </h6>
                            <Switch checked />
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="modalSettings_head">
                            <h3>{t("text.loops.chats")}</h3>
                            <p className="mb-0">
                              {t(
                                "text.loops.manageTheChatPermossionsForTheChannelUsers"
                              )}
                            </p>
                          </div>
                          <div className="form-group">
                            <div className="form-label-group">
                              <label
                                className="form-label font-sb"
                                htmlFor="name"
                              >
                                {t("text.loops.whoCanSendChatInThisChannel")}
                              </label>
                            </div>
                            <div className="form-control-wrap font-rg">
                              <Formik initialValues={{ sendChat: "Select" }}>
                                <Form>
                                  <AntSelect
                                    placeholder={t("text.loops.selectChannel")}
                                    name="sendChat"
                                    arrayOfData={channelData}
                                  />
                                </Form>
                              </Formik>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="form-label-group">
                              <label
                                className="form-label font-sb"
                                htmlFor="name"
                              >
                                {t("text.loops.whoCanReadChatInThisChannel")}
                              </label>
                            </div>
                            <div className="form-control-wrap font-rg">
                              <Formik initialValues={{ readChat: "Select" }}>
                                <Form>
                                  <AntSelect
                                    placeholder={t("text.loops.selectChannel")}
                                    name="readChat"
                                    arrayOfData={channelData}
                                  />
                                </Form>
                              </Formik>
                            </div>
                          </div>
                          {/* <div className="modalSettings_switch d-flex justify-content-between">
                          <h6 className="mb-0">Show message preview</h6><Switch checked/>
                        </div>

                        <div className="modalSettings_switch d-flex justify-content-between">
                          <h6 className="mb-0">Play sound for incoming calls and notifications</h6><Switch checked/>
                        </div> */}
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </>
        </ModalComponent>
        <ModalComponent
          backdrop
          show={removeParticipant}
          onHandleCancel={hideRemoveParticipant}
          size="sm"
          title="Are you sure?"
          // extraClassName="removeModal"
        >
          <>
            <p className="mb-0">you want to delete this participant? </p>
            <div className="text-end modalFooter">
              <CommonButton
                onClick={() => SetRemoveParticipant(false)}
                variant="light"
              >
                Cancel
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => SetRemoveParticipant(false)}
                className="ms-2 ms-md-3"
              >
                Confirm
              </CommonButton>
            </div>
          </>
        </ModalComponent>

        {/* <ModalComponent
          backdrop
          show={deleteNote}
          onHandleCancel={hideDeleteNote}
          size="sm"
          title="Are you sure?"
          // extraClassName="removeModal"
        >
          <>
            <p className="mb-0">you want to delete this Note? </p>
            <div className="text-end modalFooter">
              <CommonButton
                onClick={() => setDeleteNote(false)}
                variant="light"
              >
                {t("text.common.no")}
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => setDeleteNote(false)}
                className="ms-2 ms-md-3"
              >
                {t("text.common.yes")}
              </CommonButton>
            </div>
          </>
        </ModalComponent> */}

        <ModalComponent
          backdrop
          show={deleteFile}
          onHandleCancel={hideDeleteFile}
          size="sm"
          title="Are you sure?"
          // extraClassName="removeModal"
        >
          <>
            <p className="mb-0">you want to delete this File? </p>
            <div className="text-end modalFooter">
              <CommonButton
                onClick={() => setDeleteFile(false)}
                variant="light"
              >
                No
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => setDeleteFile(false)}
                className="ms-2 ms-md-3"
              >
                Yes
              </CommonButton>
            </div>
          </>
        </ModalComponent>

        <ModalComponent
          backdrop
          show={removeCallHistory}
          onHandleCancel={hideRemoveCallHistory}
          size="sm"
          title={t("text.common.areYouSure")}
          // extraClassName="removeModal"
        >
          <>
            <p className="mb-0">
              {t("text.loops.youWantToDeleteThisCallHistory")}{" "}
            </p>
            <div className="text-end modalFooter">
              <CommonButton
                onClick={() => setRemoveCallHistory(false)}
                variant="light"
              >
                {t("text.common.no")}
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => setRemoveCallHistory(false)}
                className="ms-2 ms-md-3"
              >
                {t("text.common.yes")}
              </CommonButton>
            </div>
          </>
        </ModalComponent>
      </div>
    </>
  );
}

export default LoopsSidebar;
