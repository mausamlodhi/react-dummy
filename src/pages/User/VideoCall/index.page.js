import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Container , Row , Col, Button} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import {
  ModalComponent,
  CommonButton,
  SearchMember,
} from "../../../components";

import { ImageElement } from "../../../utils";

function VideoCall() {
  const [leaveModal, setLeaveModal] = useState(false);
  const [iconClick, setIconClick] = useState(false);
  const [iconClickSpeaker, setIconClickSpeaker] = useState(false);
  const [iconClickVideo, setIconClickVideo] = useState(false);
  const handleClickIcon = () => {
    setIconClick((click) => !click);
  };
  const handleSpeakerClickIcon = () => {
    setIconClickSpeaker((click) => !click);
  };
  const handleVideoClickIcon = () => {
    setIconClickVideo((click) => !click);
  };
  const hideLeaveModal = () => {
    setLeaveModal(false);
  };
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <div className="VideoCall">
        <div className="VideoCall_member position-relative">
          <ul className="list-unstyled d-flex flex-wrap justify-content-center">
            <li>
              <div className="h-100">
                <video autoPlay muted loop className="w-100">
                  <source
                    src="https://previews.customer.envatousercontent.com/files/cf11346c-e118-4b7d-ab6e-39614e8bd67b/video_preview_h264.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </li>
            <li>
              <div className="h-100">
                <video autoPlay muted loop className="w-100">
                  <source
                    src="https://previews.customer.envatousercontent.com/files/83d3db22-37ae-43b8-8cc1-96da62ed85b1/video_preview_h264.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </li>
            <li>
              <div className="h-100">
                <video autoPlay muted loop className="w-100">
                  <source
                    src="https://previews.customer.envatousercontent.com/files/83d3db22-37ae-43b8-8cc1-96da62ed85b1/video_preview_h264.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </li>
            <li>
              <div className="h-100">
                <video autoPlay muted loop className="w-100">
                  <source
                    src="https://previews.customer.envatousercontent.com/files/83d3db22-37ae-43b8-8cc1-96da62ed85b1/video_preview_h264.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </li>
          </ul>

          <div className="VideoCall_member_active position-fixed">
            <div className="h-100">
              <video autoPlay muted loop className="w-100">
                <source
                  src="https://previews.customer.envatousercontent.com/files/83d3db22-37ae-43b8-8cc1-96da62ed85b1/video_preview_h264.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
        <div className="audioCall_control">
          <div className="audioCall_control_space">
            <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0">
              <li>
                <Link to="#" onClick={handleVideoClickIcon}>
                  <span
                    className={
                      iconClickVideo ? "icon-video-call" : "icon-video-off"
                    }
                  >
                    <em className="path1" />
                    <em className="path2" />
                  </span>
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleClickIcon}>
                  <span className={iconClick ? "icon-mute" : "icon-unmute"}>
                    <em className="path1" />
                    <em className="path2" />
                    <em className="path3" />
                    <em className="path4" />
                  </span>
                </Link>
              </li>
              <li className="callClose" onClick={() => setLeaveModal(true)}>
                <Link to="#" className="w-100 h-100">
                  <span className="icon icon-phone" />
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleSpeakerClickIcon}>
                  <span
                    className={
                      iconClickSpeaker ? "icon-speaker" : "icon-silent"
                    }
                  >
                    <em className="path1" />
                    <em className="path2" />
                    <em className="path3" />
                    <em className="path4" />
                    <em className="path5" />
                  </span>
                </Link>
              </li>
              <li>
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
                        <Link to="#">
                          <span className="icon-close" />
                        </Link>
                      </div>
                      {/* <ChatSearchBar searchOpen={searchOpen} setSearchOpen={setSearchOpen} /> */}
                      <SearchMember
                        searchOpen={searchOpen}
                        setSearchOpen={setSearchOpen}
                      />
                      <div className="audioCall_memberList">
                        <Link
                          className="dropdown-item"
                          onClick={document.body.click()}
                        >
                          <div className="user d-flex align-items-center">
                            <div className="userImage position-relative">
                              <div className="userAvatar flex-shrink-0">
                                <ImageElement
                                  source="profile/profile01.jpg"
                                  alt="user"
                                />
                              </div>
                            </div>
                            <div className="user_info ms-2 ms-md-3 overflow-hidden">
                              <h6 className="text-truncate mb-0">
                                Domingo Osuna
                              </h6>
                            </div>
                          </div>
                        </Link>
                        <Link
                          className="dropdown-item"
                          onClick={document.body.click()}
                        >
                          <div className="user d-flex align-items-center">
                            <div className="userImage position-relative">
                              <div className="userAvatar flex-shrink-0">
                                <ImageElement
                                  source="profile/profile02.jpg"
                                  alt="user"
                                />
                              </div>
                            </div>
                            <div className="user_info ms-2 ms-md-3 overflow-hidden">
                              <h6 className="text-truncate mb-0">
                                Domingo Osuna
                              </h6>
                            </div>
                          </div>
                        </Link>
                        <Link
                          className="dropdown-item"
                          onClick={document.body.click()}
                          to="#"
                        >
                          <div className="user d-flex align-items-center">
                            <div className="userImage position-relative">
                              <div className="userAvatar flex-shrink-0">
                                <ImageElement
                                  source="profile/profile03.jpg"
                                  alt="user"
                                />
                              </div>
                            </div>
                            <div className="user_info ms-2 ms-md-3 overflow-hidden">
                              <h6 className="text-truncate mb-0">
                                Domingo Osuna
                              </h6>
                            </div>
                          </div>
                        </Link>
                        <Link
                          className="dropdown-item"
                          onClick={document.body.click()}
                        >
                          <div className="user d-flex align-items-center">
                            <div className="userImage position-relative">
                              <div className="userAvatar flex-shrink-0">
                                <ImageElement
                                  source="profile/profile04.jpg"
                                  alt="user"
                                />
                              </div>
                            </div>
                            <div className="user_info ms-2 ms-md-3 overflow-hidden">
                              <h6 className="text-truncate mb-0">
                                Domingo Osuna
                              </h6>
                            </div>
                          </div>
                        </Link>
                        <Link
                          className="dropdown-item"
                          onClick={document.body.click()}
                        >
                          <div className="user d-flex align-items-center">
                            <div className="userImage position-relative">
                              <div className="userAvatar flex-shrink-0">
                                <ImageElement
                                  source="profile/profile05.jpg"
                                  alt="user"
                                />
                              </div>
                            </div>
                            <div className="user_info ms-2 ms-md-3 overflow-hidden">
                              <h6 className="text-truncate mb-0">
                                Domingo Osuna
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="VideoCall_time">
          <p className="mb-0">
            <span>29:05</span>
          </p>
        </div>
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
          <div className="text-end modalFooter">
            <CommonButton
              variant="primary"
              onClick={() => {
                setLeaveModal(false);
                navigate(-1);
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

export default VideoCall;
