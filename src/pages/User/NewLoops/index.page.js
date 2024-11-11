import React, { useState } from "react";
import { Accordion, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AntTextArea,
  AudioCall,
  ChatSidebar,
  CommonButton,
  CreateLoop,
  ImageElement,
} from "../../../components";

import userRoutesMap from "../../../routeControl/userRouteMap";

function NewLoops() {
  const [loopStepModal, setLoopStepModal] = useState(false);
  const hideLoopStepModal = () => {
    setLoopStepModal(false);
    setTimeout(() => {
      // setCurrent(0);
    }, 500);
  };

  const [channelModal, setCreateChannelModal] = useState(false);
  const hideCreateChannelModal = () => {
    setCreateChannelModal(false);
  };

  const [addParticipants, setAddParticipantsModal] = useState(false);
  const hideaddParticipantsModal = () => {
    setAddParticipantsModal(false);
  };

  const [current, setCurrent] = useState(0);
  const [chatInfoOpen, setChatInfoOpen] = useState(false);
  const [sidebarOpenKey, setSidebarOpenKey] = useState("");
  const [audioCall, setAudioCall] = useState(false);
  return (
    <>
      <div className="chatPage">
        <aside className="chatAside">
          <div className="chatAsideHead d-flex align-items-center">
            <h3 className="chatAsideHead_heading mb-0">Loops</h3>
            <Link className="chatAsideHead_icon ms-auto d-inline-flex">
              <em className="icon-filter" />
            </Link>
          </div>
          <div className="chatAside_list">
            {/* Your Loops */}
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Your Loops</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item
                      className="accordion-item-left accordion-hover"
                      eventKey="0.1"
                    >
                      <Accordion.Header>
                        <div className="userBox d-flex align-items-center justify-content-between w-100">
                          <div className="d-flex align-items-center">
                            <div className="userAvatar userAvatar-md danger">
                              <span>WO</span>
                            </div>
                            <div className="userBox_content">
                              <h5>Wildfire Operation</h5>
                              <span>02 Members</span>
                            </div>
                          </div>
                          <Dropdown className="ellipseDrop d-inline-block">
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
                                onClick={document.body.click()}
                                to="#"
                              >
                                <span className="icon-fill-edit">
                                  <span className="path1" />
                                  <span className="path2" />
                                </span>{" "}
                                Edit Loop
                              </Link>
                              <Link
                                className="dropdown-item"
                                onClick={document.body.click()}
                                to="#"
                              >
                                <span className="icon-create">
                                  <span className="path1" />
                                  <span className="path2" />
                                </span>{" "}
                                Create Channel
                              </Link>
                              <Link
                                className="dropdown-item"
                                onClick={document.body.click()}
                                to="#"
                              >
                                <span className="icon-leave-loop">
                                  <span className="path1" />
                                  <span className="path2" />
                                </span>{" "}
                                Leave Loop
                              </Link>
                              <Link
                                className="dropdown-item"
                                onClick={document.body.click()}
                                to="#"
                              >
                                <span className="icon-trash">
                                  <em className="path1" />
                                  <em className="path2" />
                                </span>
                                Delete Loop
                              </Link>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="list-unstyled channelsList mb-0">
                          <li className="channelsList_list">
                            <div className="d-flex align-items-center">
                              <Link className="channelsList_list_user unRead d-flex align-items-center">
                                General <span className="unRead_dot" />
                                <ul className="channelsList_action list-unstyled mb-0 d-flex align-items-center ms-auto">
                                  <li className="channelsList_action_list">
                                    <div className="chatRead text-end">
                                      <ul className="list-inline channelsList_user d-inline-block mb-0">
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile01.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile02.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile03.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile04.jpg"
                                            alt="profile"
                                          />
                                          <span className="font-sb">09</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                  <li className="channelsList_action_list">
                                    <Dropdown className="ellipseDrop d-inline-block ">
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
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-fill-edit">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Edit Channel
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-pin">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Pin
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-users">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Add Member
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-leave-loop">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Leave Loop
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-trash">
                                            <em className="path1" />
                                            <em className="path2" />
                                          </span>
                                          Delete Channel
                                        </Link>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </li>
                                </ul>
                              </Link>
                            </div>
                          </li>
                          <li className="channelsList_list">
                            <div className="d-flex align-items-center">
                              <Link className="unRead channelsList_list_user unRead d-flex align-items-center">
                                Search and Rescue{" "}
                                <span className="unRead_dot" />
                                <ul className="channelsList_action list-unstyled mb-0 d-flex align-items-center ms-auto">
                                  <li className="channelsList_action_list">
                                    <div className="chatRead text-end">
                                      <ul className="list-inline channelsList_user d-inline-block mb-0">
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile01.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile02.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile03.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile04.jpg"
                                            alt="profile"
                                          />
                                          <span className="font-sb">09</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                  <li className="channelsList_action_list">
                                    <Dropdown className="ellipseDrop d-inline-block ">
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
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-fill-edit">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Edit Channel
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-pin">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Pin
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-users">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Add Member
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-leave-loop">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Leave Loop
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-trash">
                                            <em className="path1" />
                                            <em className="path2" />
                                          </span>
                                          Delete Channel
                                        </Link>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </li>
                                </ul>
                              </Link>
                            </div>
                          </li>
                          <li className="channelsList_list">
                            <div className="d-flex align-items-center">
                              <Link className="read channelsList_list_user unRead d-flex align-items-center">
                                Medical
                                <ul className="channelsList_action list-unstyled mb-0 d-flex align-items-center ms-auto">
                                  <li className="channelsList_action_list">
                                    <div className="chatRead text-end">
                                      <ul className="list-inline channelsList_user d-inline-block mb-0">
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile01.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile02.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile03.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile04.jpg"
                                            alt="profile"
                                          />
                                          <span className="font-sb">09</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                  <li className="channelsList_action_list">
                                    <Dropdown className="ellipseDrop d-inline-block ">
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
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-fill-edit">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Edit Channel
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-pin">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Pin
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-users">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Add Member
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-leave-loop">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Leave Loop
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-trash">
                                            <em className="path1" />
                                            <em className="path2" />
                                          </span>
                                          Delete Channel
                                        </Link>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </li>
                                </ul>
                              </Link>
                            </div>
                          </li>
                          <li className="channelsList_list">
                            <div className="d-flex align-items-center">
                              <Link className="unRead channelsList_list_user unRead d-flex align-items-center">
                                Recovery <span className="unRead_dot" />
                                <ul className="channelsList_action list-unstyled mb-0 d-flex align-items-center ms-auto">
                                  <li className="channelsList_action_list">
                                    <div className="chatRead text-end">
                                      <ul className="list-inline channelsList_user d-inline-block mb-0">
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile01.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile02.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile03.jpg"
                                            alt="profile"
                                          />
                                        </li>
                                        <li className="list-inline-item">
                                          <ImageElement
                                            className="img-fluid"
                                            source="profile/profile04.jpg"
                                            alt="profile"
                                          />
                                          <span className="font-sb">09</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                  <li className="channelsList_action_list">
                                    <Dropdown className="ellipseDrop d-inline-block ">
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
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-fill-edit">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Edit Channel
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-pin">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Pin
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-users">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Add Member
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-leave-loop">
                                            <span className="path1" />
                                            <span className="path2" />
                                          </span>{" "}
                                          Leave Loop
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={document.body.click()}
                                          to="#"
                                        >
                                          <span className="icon-trash">
                                            <em className="path1" />
                                            <em className="path2" />
                                          </span>
                                          Delete Channel
                                        </Link>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </li>
                                </ul>
                              </Link>
                            </div>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="plusIcon plusIcon-md">
            <Link to="#" onClick={() => setLoopStepModal(true)}>
              <em className="icon-plus" />
            </Link>
          </div>
        </aside>
        <div className="chatRight">
          {/* chatHead */}
          <div className="chatHead">
            <div className="userBox d-flex align-items-center justify-content-between w-100 p-0">
              <div className="d-flex align-items-center">
                <div className="userAvatar userAvatar-md danger">
                  <span>WO</span>
                </div>
                <div className="userBox_content">
                  <h5>Wildfire Operation</h5>
                  <span>02 Members</span>
                </div>
              </div>
              <ul className="chatHead_toolsList list-inline mb-0">
                <li className="list-inline-item">
                  <Link
                    className="chatHead_toolsList_icon"
                    to={userRoutesMap.VIDEO.path}
                  >
                    <em className="icon icon-video">
                      <em className="path1" />
                      <em className="path2" />
                    </em>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    className="chatHead_toolsList_icon"
                    onClick={() => {
                      setChatInfoOpen(false);
                      setSidebarOpenKey("");
                      setAudioCall(true);
                    }}
                  >
                    <em className="icon icon-phone" />
                  </Link>
                </li>
                <li className="list-inline-item chatHead_toolsList_toggle">
                  <Link
                    className="chatHead_toolsList_icon"
                    onClick={() => setChatInfoOpen(true)}
                  >
                    <em className="icon icon-info" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* chatBox */}
          <div className="chatBox d-flex align-items-center">
            <div className="newLoops text-center">
              <h2 className="font-bd">Welcome To Tectonic Disasters </h2>
              <p className="mb-0">Here are some things to get going...</p>
              <ImageElement
                className="img-fluid image"
                source="create-more-loops.svg"
                alt="image"
              />
              <div className="text-center">
                <CommonButton
                  variant="secondary"
                  extraClassName="btn-md flex-shrink-0"
                  onClick={() => setCreateChannelModal(true)}
                >
                  Create more channels
                </CommonButton>
              </div>
            </div>
          </div>
          <div className="chatEditor d-flex align-items-center">
            <div className="chatEditor_left">
              <ul className="list-inline action mb-0">
                <li className="list-inline-item actionList">
                  <Link className="icon">
                    <em className="icon-voice">
                      <em className="path1" />
                      <em className="path2" />
                    </em>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="chatEditor_center">
              <div className="form-control-wrap">
                <AntTextArea
                  rows={1}
                  placeholder="Write your message"
                  className="form-control"
                />
              </div>
            </div>
            <div className="chatEditor_right">
              <ul className="list-inline action mb-0">
                <li className="list-inline-item actionList">
                  <Link className="icon">
                    <span className="icon-smiley">
                      <span className="path1" />
                      <span className="path2" />
                    </span>
                  </Link>
                </li>
                <li className="list-inline-item actionList">
                  <Link className="icon">
                    <span className="icon-attachment" />
                  </Link>
                </li>
                <li className="list-inline-item actionList">
                  <Link className="icon send">
                    <em className="icon-send" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {audioCall && (
          <AudioCall
            audioCall={audioCall}
            setAudioCall={setAudioCall}
            setChatInfoOpen={setChatInfoOpen}
          />
        )}
        <ChatSidebar
          addParticipants={addParticipants}
          setAddParticipantsModal={setAddParticipantsModal}
          hideaddParticipantsModal={hideaddParticipantsModal}
          setCreateChannelModal={setCreateChannelModal}
          channelModal={channelModal}
          hideCreateChannelModal={hideCreateChannelModal}
          sidebarOpenKey={sidebarOpenKey}
          setSidebarOpenKey={setSidebarOpenKey}
          chatInfoOpen={chatInfoOpen}
          setChatInfoOpen={setChatInfoOpen}
          setAudioCall={setAudioCall}
        />
      </div>
      <CreateLoop
        current={current}
        loopStepModal={loopStepModal}
        hideLoopStepModal={hideLoopStepModal}
        setCurrent={setCurrent}
      />
    </>
  );
}

export default NewLoops;
