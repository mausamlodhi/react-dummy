/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Accordion,
  Dropdown,
  Col,
  Row,
  Button,
  Tab,
  Nav
} from "react-bootstrap"
import dayjs from "dayjs"
import LightGallery from "lightgallery/react"
import lgZoom from "lightgallery/plugins/zoom"
import {
  AntSelect,
  AntTextArea,
  AntTooltip,
  CommonButton,
  DatePicker,
  ImageElement,
  ModalComponent,
  ChatSearchBar,
  RippleEffect,
  Input as TextInput
} from "../.."
import userRoutesMap from "../../../routeControl/userRouteMap"
import Popovers from "../../Antd/Popover/index.ant"
import Switch from "../../Antd/Switch/index.ant"

function ChatSidebar({
  addParticipants,
  setAddParticipantsModal,
  hideaddParticipantsModal,
  setCreateChannelModal,
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
  setAudioCall
}) {
  const [setCopyMassage] = useState(false)
  const [copyMassageAlert, setCopymassageAlert] = useState(false)
  const [counter, setCounter] = useState(0)
  // const [addParticipants , setAddParticipantsModal] = useState(false);
  const onInit = () => {}
  const hideaddParticipants = () => {
    setAddParticipantsModal(false)
  }
  const [searchOpen, setSearchOpen] = useState(false)
  const [settings, setSettings] = useState(false)
  const hideSettings = () => {
    setSettings(false)
  }

  const location = useLocation()
  const { pathname } = location
  const myRef = useRef()
  // const handleClickOutside = e => {
  //     if (!myRef.current.contains(e.target)) {
  //       setSidebarOpenKey("");
  //     }
  // };
  const [notesModal, setNotesModal] = useState(false)
  const [notesModalType, setNotesModalType] = useState("")
  const hideNotesModal = () => {
    setNotesModal(false)
    // setTimeout(() => {
    //   setNotesModalType("");
    // }, 500);
  }
  const showNotesModal = (type) => {
    setNotesModal(true)
    setNotesModalType(type)
  }
  const [loopStepModal, setEditLoopModal] = useState(false)
  const [loopStepModalType, setLoopStepModalTypel] = useState("")
  const hideEditLoopModal = () => {
    setEditLoopModal(false)
    // setLoopStepModalTypel("");
  }
  const showEditLoopModal = (type) => {
    setEditLoopModal(true)
    setLoopStepModalTypel(type)
  }
  const [removeParticipant, SetRemoveParticipant] = useState(false)
  const hideRemoveParticipant = () => {
    SetRemoveParticipant(false)
  }

  const [deleteNote, setDeleteNote] = useState(false)
  const hideDeleteNote = () => {
    setDeleteNote(false)
  }

  const [deleteFile, setDeleteFile] = useState(false)
  const hideDeleteFile = () => {
    setDeleteFile(false)
  }

  const [removeCallHistory, setRemoveCallHistory] = useState(false)
  const hideRemoveCallHistory = () => {
    setRemoveCallHistory(false)
  }

  // const [addParticipants, SetAddParticipants] = useState(false);
  // const hideAddParticipants = () => {
  //   SetRemoveParticipant(false);
  // }
  const JobData = [
    {
      id: "option",
      name: "Option"
    },
    {
      id: "option1",
      name: "Option 1"
    },
    {
      id: "option2",
      name: "Option 2"
    }
  ]
  const claimData = [
    {
      id: "option",
      name: "Option"
    },
    {
      id: "option1",
      name: "Option 1"
    }
  ]

  const channelData = [
    {
      id: "employee",
      name: "Employee"
    },
    {
      id: "employee1",
      name: "Employee 1"
    },
    {
      id: "employee2",
      name: "Employee 2"
    }
  ]
  if (copyMassageAlert) {
    let interval = setTimeout(() => {
      setCounter(counter + 1)
    }, 1000)
    if (counter === 3) {
      setCopymassageAlert(false)
      setCounter(counter + 0)
      return () => clearTimeout(interval)
    }
  }
  if (counter === 4) {
    setCounter(0)
  }
  return (
    <>
      <div
        className={`chatPage_info d-flex ${
          chatInfoOpen ? "chatPage_info-open" : ""
        }`}
      >
        {sidebarOpenKey === "infoSidebar" ? (
          loopInfoSidebar ? (
            <div className="rightBarDetail vh-100" ref={myRef}>
              <div className="rightBarDetail_header position-relative">
                <Link
                  to="#"
                  onClick={() => setSidebarOpenKey("")}
                  className="closeBar"
                >
                  <em className="icon icon-close" />
                </Link>
              </div>
              <div className="rightBarDetail_profile text-center">
                <div className="userAvatar userAvatar-lg danger d-flex justify-content-center align-items-center">
                  <span>WO</span>
                </div>
                <div className="detail">
                  <h2>Wildfire Operation</h2>
                  <h3 className="mb-0">
                    23 Members<span className="px-1">|</span>04 Channel
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer Aliquam Tincidunt
                    mauris eu risus.
                  </p>
                  <CommonButton
                    variant="outline-info"
                    htmlType="submit"
                    onClick={() => showEditLoopModal("loopInfo")}
                  >
                    Edit
                  </CommonButton>
                </div>
              </div>
              <div className="rightBarDetail_panel">
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      Client
                      <Link
                        to="#"
                        onClick={() => showEditLoopModal("loopClient")}
                      >
                        <em className="icon icon-edit-box edit" />
                      </Link>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="panelInfo d-flex align-items-center">
                        <div className="userAvatar userAvatar-md d-flex info justify-content-center align-items-center flex-shrink-0">
                          <span>AB</span>
                        </div>
                        <div className="panelProfile">
                          <h4>Adam Brown</h4>
                          <p className="mb-0">
                            <em className="icon icon-phone" />
                            +1 9895 454 21
                          </p>
                        </div>
                      </div>
                      <ul className="panelDetail list-unstyled mb-0">
                        <li>
                          <div className="panelDetail_list d-flex">
                            <span className="icon-email">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            adam.brown@gmail.com
                          </div>
                        </li>
                        <li>
                          <div className="panelDetail_list d-flex">
                            <span className="icon-location">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            14th street, chloe street, San Francisco, 15451
                          </div>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      Insurance
                      <Link
                        to="#"
                        onClick={() => showEditLoopModal("loopInsurance")}
                      >
                        <em className="icon icon-edit-box edit" />
                      </Link>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="panelDetail list-unstyled mb-0">
                        <li>
                          <div className="panelDetail_list d-flex">
                            <span className="icon-user">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            Adam Brown
                          </div>
                        </li>
                        <li>
                          <div className="panelDetail_list d-flex">
                            <span className="icon-phone">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            +1 9895 454 21
                          </div>
                        </li>
                        <li>
                          <div className="panelDetail_list d-flex">
                            <span className="icon-email">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            adam.brown@gmail.com
                          </div>
                        </li>
                        <li>
                          <div className="panelDetail_list d-flex">
                            <span className="icon-address">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            14th street, chloe street, San Francisco, 15451
                          </div>
                        </li>
                        <li>
                          <Row className="g-3">
                            <Col md="6">
                              <div className="panelDetail_list d-flex">
                                <span className="icon-water">
                                  <em className="path1" />
                                  <em className="path2" />
                                </span>
                                <div>
                                  Type of loss
                                  <p>Water</p>
                                </div>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="panelDetail_list d-flex">
                                <span className="icon-number">
                                  <em className="path1" />
                                  <em className="path2" />
                                </span>
                                <div>
                                  Claim Number
                                  <p>5468890</p>
                                </div>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="panelDetail_list d-flex">
                                <span className="icon-number">
                                  <em className="path1" />
                                  <em className="path2" />
                                </span>
                                <div>
                                  Policy Number
                                  <p>12345678DCV</p>
                                </div>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="panelDetail_list d-flex">
                                <span className="icon-calendar">
                                  <em className="path1" />
                                  <em className="path2" />
                                </span>
                                <div>
                                  Date of loss
                                  <p>12-05-2023</p>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </li>
                        <li>
                          <div className="panelDetail_list d-flex">
                            <span className="icon-address">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            <div>
                              Additional Notes
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in{" "}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* <Accordion.Item eventKey="3">
                <Accordion.Header>
                Company Info
                  <Link to="#" onClick={() => showEditLoopModal('loopCompany')}><em className="icon icon-edit-box edit" /></Link>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="info d-flex align-items-center">
                    <div className="userAvatar userAvatar-md flex-shrink-0">
                      <ImageElement source="chat-sent-image.jpg" alt="user" />
                    </div>
                    <div className="panelProfile">
                      <h4 className="mb-0">Wildfire Operation</h4>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item> */}
                </Accordion>
              </div>
            </div>
          ) : (
            <div className="rightBarDetail vh-100" ref={myRef}>
              <div className="rightBarDetail_header position-relative">
                <h4 className="w-100 font-bd">Information</h4>
                <Link
                  to="#"
                  onClick={() => setSidebarOpenKey("")}
                  className="closeBar"
                >
                  <em className="icon icon-close" />
                </Link>
              </div>
              {pathname === userRoutesMap.CHAT.path ? (
                <div className="rightBarDetail_profile d-flex flex-column justify-content-center align-items-center h-100 text-center">
                  <div className="userAvatar userAvatar-lg danger d-flex justify-content-center align-items-center">
                    <ImageElement
                      source="profile/profile01.jpg"
                      alt="profile"
                    />
                  </div>
                  <div className="pUserInfo_center border-0">
                    <h6 className="font-bd">Linda Thompson </h6>
                    <ul className="list-unstyled pUserInfo_list mb-0">
                      <li className="d-flex justify-content-center">
                        <span className="status available">
                          <em className="icon-check" />
                        </span>{" "}
                        <span className="info">Available</span>
                      </li>
                      <li>
                        <em className="icon icon-phone" />{" "}
                        <span className="info">+1 123 456 789</span>
                      </li>
                      <li className="pUserInfo_email d-flex align-items-center">
                        <span className="icon icon-email">
                          <span className="path1" />
                          <span className="path2" />
                        </span>
                        <div className="d-flex align-items-center justify-content-between w-100">
                          <span className="info">lindathompson@gmail.com</span>
                          <Link className="ms-2">
                            <span className="icon icon-copy">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="rightBarDetail_profile d-flex flex-column justify-content-center align-items-center h-100 text-center">
                  <div className="userAvatar userAvatar-lg danger d-flex justify-content-center align-items-center">
                    <span>WO</span>
                  </div>
                  <div className="detail">
                    <h2>Wildfire Operation</h2>
                    <h3 className="mb-0">
                      23 Members<span className="px-1">|</span>04 Channel
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer Aliquam Tincidunt
                      mauris eu risus.
                    </p>
                    <CommonButton
                      variant="outline-info"
                      htmlType="submit"
                      onClick={() => showEditLoopModal("loopInfo")}
                    >
                      Edit
                    </CommonButton>
                  </div>
                </div>
              )}
            </div>
          )
        ) : sidebarOpenKey === "participantSidebar" ? (
          <div className="rightBarDetail vh-100" ref={myRef}>
            <div className="rightBarDetail_header align-items-center d-flex position-relative">
              <h4 className="w-100 font-bd">Participants</h4>
              <Link
                to={userRoutesMap.MANAGE_PARTICIPANTS.path}
                className="link-primary flex-shrink-0 font-sb text-decoration-underline"
              >
                Manage Participants
              </Link>
              <Link
                to="#"
                onClick={() => setSidebarOpenKey("")}
                className="closeBar position-static flex-shrink-0"
              >
                <em className="icon icon-close" />
              </Link>
            </div>
            <div className="rightBarDetail_filter d-flex align-items-center">
              <div className="searchBox">
                <div className="form-group mb-0">
                  <div className="form-control-wrap">
                    <TextInput
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
              {/* <div className="filterIcon flex-shrink-0">
              <Link to="#"><span className="icon-filter"/></Link>
            </div> */}
            </div>
            <div className="rightBarDetail_participants">
              <div className="participantsList">
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    {/* <div className="userAvatar flex-shrink-0">
                    <ImageElement source="profile/profile01.jpg" alt="user" />
                  </div> */}
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
                                  source="profile/profile1.jpg"
                                  alt="profile"
                                />
                              </div>
                              <div className="userBox_content">
                                <h5 className="font-bd mb-0">Linda Thompson</h5>
                                <span className="font-sb status available">
                                  Available
                                </span>
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
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="pUserInfo_center">
                            <h6 className="font-bd">Contact </h6>
                            <ul className="list-unstyled pUserInfo_list mb-0">
                              <li className="d-flex">
                                <span className="status available">
                                  <em className="icon-check" />
                                </span>{" "}
                                <span className="info">Available</span>
                              </li>
                              <li>
                                <em className="icon icon-phone" />{" "}
                                <span className="info">+1 123 456 789</span>
                              </li>
                              <li>
                                <span className="icon icon-email">
                                  <span className="path1" />
                                  <span className="path2" />
                                </span>{" "}
                                <span className="info">
                                  lindathompson@gmail.com
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="pUserInfo_bottom">
                            <form>
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
                                        setFieldValue=""
                                        icon=""
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="12 text-end">
                                  <Link
                                    href="#"
                                    className="btn btn-secondary btn-sm"
                                  >
                                    Send
                                  </Link>
                                </Col>
                              </Row>
                            </form>
                          </div>
                        </>
                      }
                    >
                      <div className="chat_image position-relative">
                        <div className="userAvatar">
                          <ImageElement
                            className="img-fluid"
                            source="profile/profile01.jpg"
                            alt="profile"
                          />
                        </div>
                        <span className="statusdot statusdot-available" />
                      </div>
                    </Popovers>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Robert Martinez</h4>
                      <p className="owner">Owner</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile02.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Rose Harris</h4>
                      <p>Member</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile03.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Linda Thompson</h4>
                      <p>Member</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile04.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Annei Ellison</h4>
                      <p className="owner">Owner</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile05.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Robert Martinez</h4>
                      <p className="owner">Owner</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile06.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Rose Harris</h4>
                      <p>Member</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile01.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Linda Thompson</h4>
                      <p>Member</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile02.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Annei Ellison</h4>
                      <p className="owner">Owner</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile03.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Annei Ellison</h4>
                      <p className="owner">Owner</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile04.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Linda Thompson</h4>
                      <p>Member</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile05.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Robert Martinez</h4>
                      <p>Member</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile06.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">Rose Harris</h4>
                      <p className="owner">Owner</p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-chat">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-phone" />
                              Call
                            </Link>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                setCopyMassage(true)
                                setCopymassageAlert(true)
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
                                setCopyMassage(true)
                                setCopymassageAlert(true)
                              }}
                              to="#"
                            >
                              <span className="icon-copy">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Copy Phone Number
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => SetRemoveParticipant(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="plusIcon plusIcon-sm">
              <Link to="#"><em className="icon-plus" /></Link>
            </div> */}
            </div>
            <div className="position-relative">
              {/* copied clipboard */}
              {copyMassageAlert && (
                <div className="copiedClipboard copiedClipboard-sidebar d-flex justify-content-center">
                  <span className="info">Copied to Clipboard</span>
                </div>
              )}
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
            </div>
          </div>
        ) : sidebarOpenKey === "notesSidebar" ? (
          <div className="rightBarDetail vh-100">
            <div className="rightBarDetail_header align-items-center d-flex position-relative">
              <h4 className="w-100 font-bd">Notes</h4>
              <Link
                to="#"
                onClick={() => setSidebarOpenKey("")}
                className="closeBar position-static flex-shrink-0"
              >
                <em className="icon icon-close" />
              </Link>
            </div>
            <div className="rightBarDetail_filter d-flex align-items-center">
              <div className="searchBox">
                <div className="form-group mb-0">
                  <div className="form-control-wrap">
                    <TextInput
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
              {/* <div className="filterIcon flex-shrink-0">
              <Link to="#"><span className="icon-filter"/></Link>
            </div> */}
            </div>
            <div className="rightBarDetail_notes">
              <div className="box">
                <div className="box_detail d-flex align-items-center">
                  <div className="box_userList d-flex align-items-center overflow-hidden">
                    <div className="userAvatar userAvatar-sm flex-shrink-0">
                      <ImageElement source="profile/profile02.jpg" alt="user" />
                    </div>
                    <div className="box_info overflow-hidden">
                      <h4 className="font-sb text-truncate mb-0">
                        Melissa Sanders
                      </h4>
                    </div>
                  </div>
                  <div className="box_userAction ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <span className="time">10:19</span>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("edit")
                              }}
                              to="#"
                            >
                              <span className="icon-fill-edit">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Edit
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("view")
                              }}
                              to="#"
                            >
                              <span className="icon-details">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              View Detail
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteNote(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box_desc">
                  <h4 className="font-bd text-truncate">
                    Lorem ipsum dolor sit amet consectetuer
                  </h4>
                  <p className="font-sb mb-0">
                    <span>
                      It was popularised in the 1960s with the release of Letrat
                      sheet containing Lorem Ipsum...
                    </span>
                    <Link to="#" className="link-primary">
                      Read More
                    </Link>
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="box_detail d-flex align-items-center">
                  <div className="box_userList d-flex align-items-center overflow-hidden">
                    <div className="userAvatar userAvatar-sm flex-shrink-0">
                      <ImageElement source="profile/profile04.jpg" alt="user" />
                    </div>
                    <div className="box_info overflow-hidden">
                      <h4 className="font-sb text-truncate mb-0">
                        Melissa Sanders
                      </h4>
                    </div>
                  </div>
                  <div className="box_userAction ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <span className="time">Yesterday, 10:19</span>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("edit")
                              }}
                              to="#"
                            >
                              <span className="icon-fill-edit">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Edit
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("view")
                              }}
                              to="#"
                            >
                              <span className="icon-details">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              View Detail
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteNote(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box_desc">
                  <h4 className="font-bd text-truncate">
                    Lorem ipsum dolor sit amet consectetuer
                  </h4>
                  <p className="font-sb mb-0">
                    <span>
                      It was popularised in the 1960s with the release of Letrat
                      sheet containing Lorem Ipsum...
                    </span>
                    <Link to="#" className="link-primary">
                      Read More
                    </Link>
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="box_detail d-flex align-items-center">
                  <div className="box_userList d-flex align-items-center overflow-hidden">
                    <div className="userAvatar userAvatar-sm flex-shrink-0">
                      <ImageElement source="profile/profile05.jpg" alt="user" />
                    </div>
                    <div className="box_info overflow-hidden">
                      <h4 className="font-sb text-truncate mb-0">
                        Melissa Sanders
                      </h4>
                    </div>
                  </div>
                  <div className="box_userAction ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <span className="time">Wednesday, 14:05</span>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("edit")
                              }}
                              to="#"
                            >
                              <span className="icon-fill-edit">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Edit
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("view")
                              }}
                              to="#"
                            >
                              <span className="icon-details">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              View Detail
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteNote(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box_desc">
                  <h4 className="font-bd text-truncate">
                    Lorem ipsum dolor sit amet consectetuer
                  </h4>
                  <p className="font-sb mb-0">
                    <span>
                      Lorem ipsum dolor sit amet, consectetuer Aliquam tincidunt
                      mauris eu risus.
                    </span>
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="box_detail d-flex align-items-center">
                  <div className="box_userList d-flex align-items-center overflow-hidden">
                    <div className="userAvatar userAvatar-sm flex-shrink-0">
                      <ImageElement source="profile/profile06.jpg" alt="user" />
                    </div>
                    <div className="box_info overflow-hidden">
                      <h4 className="font-sb text-truncate mb-0">
                        Melissa Sanders
                      </h4>
                    </div>
                  </div>
                  <div className="box_userAction ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <span className="time">15-04-2023</span>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("edit")
                              }}
                              to="#"
                            >
                              <span className="icon-fill-edit">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Edit
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => {
                                document.body.click()
                                showNotesModal("view")
                              }}
                              to="#"
                            >
                              <span className="icon-details">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              View Detail
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteNote(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box_desc">
                  <h4 className="font-bd text-truncate">
                    Lorem ipsum dolor sit amet consectetuer
                  </h4>
                  <p className="font-sb mb-0">
                    <span>
                      Lorem ipsum dolor sit amet, consectetuer Aliquam tincidunt
                      mauris eu risus.
                    </span>
                  </p>
                </div>
              </div>
              {/* <div className="plusIcon plusIcon-sm">
              <Link to="#" onClick={() => showNotesModal('add')}><em className="icon-plus" /></Link>
            </div> */}
            </div>
            <div className="text-center pt-2">
              <RippleEffect>
                <CommonButton
                  variant="info"
                  onClick={() => showNotesModal("add")}
                >
                  {" "}
                  Add Notes
                </CommonButton>
              </RippleEffect>
            </div>
          </div>
        ) : sidebarOpenKey === "filesSidebar" ? (
          <div className="rightBarDetail vh-100" ref={myRef}>
            <div className="rightBarDetail_header align-items-center d-flex position-relative">
              <h4 className="w-100 font-bd">Files</h4>
              <Link
                to="#"
                onClick={() => setSidebarOpenKey("")}
                className="closeBar position-static flex-shrink-0"
              >
                <em className="icon icon-close" />
              </Link>
            </div>
            <div className="rightBarDetail_filter d-flex align-items-center">
              <div className="searchBox">
                <div className="form-group mb-0">
                  <div className="form-control-wrap">
                    <TextInput
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
              <div className="filterIcon flex-shrink-0">
                <Link to="#">
                  <span className="icon-calendar">
                    <em className="path1" />
                    <em className="path2" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="rightBarDetail_participants">
              <div className="participantsList">
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="files-icons/pdf.svg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        CST2207012 -Aaron Felder.pdf
                      </h4>
                      <p className="sender">
                        Melissa Sanders
                        <span className="dots" />
                        27-05-2023
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/files-icons/pdf.svg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile01.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        IMG-20220721-WA0008.jpg
                      </h4>
                      <p className="sender">
                        Rose Harris
                        <span className="dots" />
                        Fri
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/chat-sent-image.jpg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile02.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        IMG-20220721-WA0008.jpg
                      </h4>
                      <p className="sender">
                        Rose Harris
                        <span className="dots" />
                        Fri
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/chat-sent-image.jpg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile03.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        IMG-20220721-WA0008.jpg
                      </h4>
                      <p className="sender">
                        Rose Harris
                        <span className="dots" />
                        Fri
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/chat-sent-image.jpg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile04.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        IMG-20220721-WA0008.jpg
                      </h4>
                      <p className="sender">
                        Rose Harris
                        <span className="dots" />
                        Fri
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/chat-sent-image.jpg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="files-icons/doc.svg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        CST2207012 -Aaron Felder.doc
                      </h4>
                      <p className="sender">
                        Melissa Sanders
                        <span className="dots" />
                        27-05-2023
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/files-icons/doc.svg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile05.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        IMG-20220721-WA0008.jpg
                      </h4>
                      <p className="sender">
                        Rose Harris
                        <span className="dots" />
                        Fri
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/chat-sent-image.jpg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="profile/profile06.jpg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        IMG-20220721-WA0008.jpg
                      </h4>
                      <p className="sender">
                        Rose Harris
                        <span className="dots" />
                        Fri
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/chat-sent-image.jpg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="files-icons/pdf.svg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        CST2207012 -Aaron Felder.pdf
                      </h4>
                      <p className="sender">
                        Melissa Sanders
                        <span className="dots" />
                        27-05-2023
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/files-icons/pdf.svg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="files-icons/pdf.svg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        CST2207012 -Aaron Felder.pdf
                      </h4>
                      <p className="sender">
                        Melissa Sanders
                        <span className="dots" />
                        27-05-2023
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/files-icons/pdf.svg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="userAvatar flex-shrink-0">
                      <ImageElement source="files-icons/doc.svg" alt="user" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-sb text-truncate">
                        CST2207012 -Aaron Felder.doc
                      </h4>
                      <p className="sender">
                        Melissa Sanders
                        <span className="dots" />
                        27-05-2023
                      </p>
                    </div>
                  </div>
                  <div className="user_action ms-auto">
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <LightGallery
                                onInit={onInit}
                                speed={500}
                                counter={false}
                                addClass="chatImgView"
                                mobileSettings="showCloseIcon: true, download: true"
                                plugins={[lgZoom]}
                              >
                                <a
                                  href="assets/images/frontend/files-icons/doc.svg"
                                  data-sub-html='<div class="d-flex align-items-center"><div class="chat_image position-relative me-3"> <div class="userAvatar"> <img class="img-fluid" src="assets/images/frontend/profile/profile02.jpg" alt="profile"/></div>
                                  <span class="statusdot statusdot-busy"></span></div><div class="userBox_content text-start overflow-hidden"><h5 class="font-sb text-truncate">Wildfire Operation <span>23-05-2023 19:07</span></h5><p class="text-truncate">Wildfire Operation  >  Search and Rescue  >  In reply to Melissa Sanders post </p></div></div>'
                                >
                                  <span className="icon-details">
                                    <em className="path1" />
                                    <em className="path2" />
                                  </span>{" "}
                                  View Details
                                </a>
                              </LightGallery>
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-download">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Download
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setDeleteFile(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Delete
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : sidebarOpenKey === "callHistorySidebar" ? (
          <div className="rightBarDetail vh-100" ref={myRef}>
            <div className="rightBarDetail_header align-items-center d-flex position-relative">
              <h4 className="w-100 font-bd">Call History</h4>
              <Link
                to="#"
                onClick={() => setSidebarOpenKey("")}
                className="closeBar position-static flex-shrink-0"
              >
                <em className="icon icon-close" />
              </Link>
            </div>
            <div className="rightBarDetail_filter d-flex align-items-center">
              <div className="searchBox">
                <div className="form-group mb-0">
                  <div className="form-control-wrap">
                    <TextInput
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
              <div className="filterIcon filterIcon-calls  flex-shrink-0">
                <Dropdown className="ellipseDrop d-inline-block">
                  <Dropdown.Toggle
                    as="a"
                    className="d-inline-flex align-items-center"
                    id="dropdown-basic"
                  >
                    <span className="icon-filter" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-end">
                    <Link
                      className="dropdown-item"
                      onClick={document.body.click()}
                      to="#"
                    >
                      <span className="icon-call" />
                      All Calls
                    </Link>
                    <Link
                      className="dropdown-item missed"
                      onClick={document.body.click()}
                      to="#"
                    >
                      <span className="icon-missed-call" />
                      Missed Call
                    </Link>
                    <Link
                      className="dropdown-item"
                      onClick={document.body.click()}
                      to="#"
                    >
                      <span className="icon-incoming-call" />
                      Incoming Call
                    </Link>
                    <Link
                      className="dropdown-item"
                      onClick={document.body.click()}
                      to="#"
                    >
                      <span className="icon-outgoing-call" />
                      Outgoing Call
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="rightBarDetail_participants">
              <div className="participantsList">
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile01.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-available" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Melissa Sanders</h4>
                      <p className="callStatus font-sb missed">
                        <em className="icon-missed-call" />
                        Missed Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      <span>05m ago</span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile02.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-busy" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Annei Ellison</h4>
                      <p className="callStatus font-sb">
                        <em className="icon-incoming-call" />
                        Incoming Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      21m 30s<span>15m ago</span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile03.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-away" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Brian Beaulieu</h4>
                      <p className="callStatus font-sb">
                        <em className="icon-outgoing-call" />
                        Outgoing Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      21m 30s<span>Wednesday, 14:05 </span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile04.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-available" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Linda Thompson</h4>
                      <p className="callStatus font-sb">
                        <em className="icon-outgoing-call" />
                        Outgoing Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      21m 30s<span>Wednesday, 14:05 </span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile06.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-available" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Melissa Sanders</h4>
                      <p className="callStatus font-sb missed">
                        <em className="icon-missed-call" />
                        Missed Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      <span>05m ago</span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile01.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-busy" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Annei Ellison</h4>
                      <p className="callStatus font-sb">
                        <em className="icon-incoming-call" />
                        Incoming Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      21m 30s<span>15m ago</span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile02.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-away" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Brian Beaulieu</h4>
                      <p className="callStatus font-sb">
                        <em className="icon-outgoing-call" />
                        Outgoing Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      21m 30s<span>Wednesday, 14:05 </span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantsList_item d-flex align-items-center">
                  <div className="user d-flex align-items-center overflow-hidden">
                    <div className="user_image flex-shrink-0 position-relative">
                      <div className="userAvatar">
                        <ImageElement
                          source="profile/profile03.jpg"
                          alt="user"
                        />
                      </div>
                      <span className="statusdot statusdot-available" />
                    </div>
                    <div className="user_info overflow-hidden">
                      <h4 className="font-bd text-truncate">Linda Thompson</h4>
                      <p className="callStatus font-sb">
                        <em className="icon-outgoing-call" />
                        Outgoing Call
                      </p>
                    </div>
                  </div>
                  <div className="user_action user_action-history  ms-auto">
                    <p className="mb-0">
                      21m 30s<span>Wednesday, 14:05 </span>
                    </p>
                    <ul className="list-unstyled mb-0 d-flex align-items-center">
                      <li>
                        <Link to="#">
                          <span className="icon-video">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <span className="icon-phone" />
                        </Link>
                      </li>
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
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              <span className="icon-chat">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Chat
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={() => setRemoveCallHistory(true)}
                              to="#"
                            >
                              <span className="icon-trash">
                                <em className="path1" />
                                <em className="path2" />
                              </span>
                              Remove
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="rightSidebar">
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
                      promptText="Information"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "infoSidebar" ? "active" : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false)
                          setSidebarOpenKey("infoSidebar")
                          setUserRoleBlock(false)
                          setParticipantListBlock(false)
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
                        onClick={() => {
                          setAudioCall(false)
                          setSidebarOpenKey("")
                          setUserRoleBlock(true)
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
                      promptText="Participant List"
                    >
                      <Link
                        to="#"
                        className={`${participantListBlock && "active"}`}
                        onClick={() => {
                          setAudioCall(false)
                          setSidebarOpenKey("")
                          setUserRoleBlock(false)
                          setParticipantListBlock(true)
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
              ) : (
                <>
                  <li>
                    <AntTooltip
                      placement="left"
                      overlayClassName="siderbarTooltip"
                      promptText="Information"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "infoSidebar" ? "active" : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false)
                          setSidebarOpenKey("infoSidebar")
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
                        promptText="Loop Member"
                      >
                        <Link
                          to="#"
                          className={`${
                            sidebarOpenKey === "participantSidebar"
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            setAudioCall(false)
                            setSidebarOpenKey("participantSidebar")
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
                      promptText="Notes"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "notesSidebar" ? "active" : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false)
                          setSidebarOpenKey("notesSidebar")
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
                      promptText="Files"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "filesSidebar" ? "active" : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false)
                          setSidebarOpenKey("filesSidebar")
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
                      promptText="Call History"
                    >
                      <Link
                        to="#"
                        className={`${
                          sidebarOpenKey === "callHistorySidebar"
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          setAudioCall(false)
                          setSidebarOpenKey("callHistorySidebar")
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
                        promptText="Settings"
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
                </>
              )}
              <li className="helpMenu">
                <Popovers
                  overlayClassName="pUserInfo"
                  placement="leftBottom"
                  content={
                    <>
                      <div className="ellipseDrop">
                        <Link
                          className="dropdown-item"
                          to={userRoutesMap.FAQ.path}
                        >
                          <span className="icon-faqs">
                            <span className="path1" />
                            <span className="path2" />
                          </span>
                          FAQ&apos;s
                        </Link>
                        <Link
                          className="dropdown-item"
                          onClick={document.body.click()}
                          to="#"
                        >
                          <span className="icon-help-support">
                            <span className="path1" />
                            <span className="path2" />
                          </span>
                          Help & Support
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={userRoutesMap.PRIVACY_POLICY.path}
                        >
                          <span className="icon-privacy-policy">
                            <span className="path1" />
                            <span className="path2" />
                          </span>
                          Privacy Policy
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={userRoutesMap.Terms_And_Condition.path}
                        >
                          <span className="icon-terms-conditions">
                            <span className="path1" />
                            <span className="path2" />
                          </span>
                          Term and Conditions
                        </Link>
                      </div>
                    </>
                  }
                >
                  <AntTooltip
                    placement="left"
                    overlayClassName="siderbarTooltip"
                    promptText="Help"
                  >
                    <Link to="#">
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
            </ul>
          </div>
        </div>
        <ModalComponent
          backdrop
          show={notesModal}
          onHandleCancel={hideNotesModal}
          size="lg"
          title={
            notesModalType === "add" || notesModalType === "edit"
              ? "Note"
              : "View Note"
          }
          extraClassName="notesModal"
          titleClassName="m-0"
        >
          {notesModalType === "add" || notesModalType === "edit" ? (
            <>
              <form>
                <Row>
                  <Col lg="12">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="name">
                          Heading
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="name"
                          className="form-control form-control-lg"
                          name="name"
                          disabled={false}
                          variant="standard"
                          type="name"
                          defaultValue={
                            notesModalType === "add"
                              ? ""
                              : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                          }
                          placeholder="Enter Heading"
                          setFieldValue="Wildfire Operation"
                          icon=""
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="12">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <AntTextArea
                          id="description"
                          className="form-control form-control-lg"
                          name="description"
                          disabled={false}
                          variant="standard"
                          defaultValue={
                            notesModalType === "add"
                              ? ""
                              : "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                          }
                          type="description"
                          placeholder="Enter Description"
                          setFieldValue=""
                          icon=""
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </form>
              <div className="d-flex justify-content-end mt-3">
                <div>
                  <CommonButton
                    onClick={() => hideNotesModal()}
                    variant="primary"
                  >
                    {notesModalType === "add" ? "Submit" : "Save"}
                  </CommonButton>
                </div>
              </div>
            </>
          ) : (
            <div className="notesModal_details">
              <div className="user d-flex align-items-center">
                <div className="userAvatar">
                  <ImageElement source="profile/profile04.jpg" alt="user" />
                </div>
                <div className="user_info d-flex align-items-center flex-wrap">
                  <h3 className="m-0 font-sb">Melissa Sanders</h3>{" "}
                  <p className="m-0">Yesterday, 10:19</p>
                </div>
              </div>
              <h2 className="font-bd">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </h2>
              <p className="mb-0 font-sb">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          )}
        </ModalComponent>
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
              <form>
                <Row>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="name">
                          Loop Name
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="name"
                          className="form-control form-control-lg"
                          name="name"
                          disabled={false}
                          variant="standard"
                          type="name"
                          placeholder="Enter loop name"
                          setFieldValue="Wildfire Operation"
                          defaultValue="Wildfire Operation"
                          icon=""
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="name">
                          Claim Type
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <AntSelect
                          defaultValue="Option"
                          placeholder="Select Job"
                          arrayOfData={JobData}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="12">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <AntTextArea
                          id="description"
                          className="form-control form-control-lg"
                          name="description"
                          disabled={false}
                          variant="standard"
                          type="description"
                          placeholder="Description"
                          setFieldValue="Lorem ipsum dolor sit amet, consectetuer Aliquam Tincidunt mauris eu risus."
                          icon=""
                          defaultValue="Lorem ipsum dolor sit amet, consectetuer Aliquam Tincidunt mauris eu risus."
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="stepsBtn d-flex justify-content-end">
                  <Button type="primary" className="btn btn-primary">
                    Save
                  </Button>
                </div>
              </form>
            ) : loopStepModalType === "loopClient" ? (
              <form>
                <Row>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="name">
                          Client Name
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="name"
                          className="form-control form-control-lg"
                          name="name"
                          disabled={false}
                          variant="standard"
                          type="name"
                          placeholder="Name"
                          setFieldValue=""
                          icon=""
                          defaultValue="Adam Brown"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6" />
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group d-flex justify-content-between">
                        <label className="form-label" htmlFor="email">
                          Email Address
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="email"
                          className="form-control form-control-lg"
                          name="email"
                          disabled={false}
                          variant="standard"
                          type="email"
                          placeholder="Email Address"
                          setFieldValue=""
                          defaultValue="adam.brown@gmail.com"
                          icon=""
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group d-flex justify-content-between">
                        <label className="form-label" htmlFor="number">
                          Phone Number
                        </label>
                      </div>
                      <div className="form-control-wrap phoneNumber">
                        <TextInput
                          id="number"
                          className="form-control form-control-lg"
                          name="number"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Phone Number"
                          setFieldValue=""
                          defaultValue="+1 9895 454 21"
                          icon=""
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="address">
                          Address
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="address"
                          className="form-control form-control-lg"
                          name="address"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Address"
                          setFieldValue=""
                          defaultValue="14th street, chloe street"
                          icon=""
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="city">
                          City
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="city"
                          className="form-control form-control-lg"
                          name="city"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="City"
                          setFieldValue=""
                          defaultValue="San Francisco"
                          icon=""
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="state">
                          State
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="state"
                          className="form-control form-control-lg"
                          name="state"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="State"
                          setFieldValue=""
                          icon=""
                          defaultValue="US"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="zip">
                          Zip
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="zip"
                          className="form-control form-control-lg"
                          name="zip"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Zip"
                          setFieldValue=""
                          icon=""
                          defaultValue="15451"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="12">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="notes">
                          Notes
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <AntTextArea
                          id="notes"
                          className="form-control form-control-lg"
                          name="notes"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Enter Notes"
                          setFieldValue=""
                          icon=""
                          defaultValue="There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration."
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="stepsBtn d-flex justify-content-end">
                  <Button type="primary" className="btn btn-primary">
                    Save
                  </Button>
                </div>
              </form>
            ) : loopStepModalType === "loopInsurance" ? (
              <form>
                <Row>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="name">
                          Insurance Company Name
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="name"
                          className="form-control form-control-lg"
                          name="name"
                          disabled={false}
                          variant="standard"
                          type="name"
                          placeholder="Company Name"
                          setFieldValue=""
                          icon=""
                          defaultValue="Insuresage"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="email">
                          Adjuster Name
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="email"
                          className="form-control form-control-lg"
                          name="email"
                          disabled={false}
                          variant="standard"
                          type="email"
                          placeholder="Adjuster Name"
                          setFieldValue=""
                          icon=""
                          defaultValue="Adam Brown"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group d-flex justify-content-between">
                        <label className="form-label" htmlFor="number">
                          Phone Number
                        </label>
                        <Link href="#" className="link-primary">
                          + Add
                        </Link>
                      </div>
                      <div className="form-control-wrap phoneNumber">
                        <TextInput
                          id="number"
                          className="form-control form-control-lg"
                          name="number"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Phone Number"
                          setFieldValue=""
                          icon=""
                          defaultValue="adam.brown@gmail.com"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group d-flex justify-content-between">
                        <label className="form-label" htmlFor="address">
                          Email Address
                        </label>
                        <Link href="#" className="link-primary">
                          + Add
                        </Link>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="address"
                          className="form-control form-control-lg"
                          name="address"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Email Address"
                          setFieldValue=""
                          icon=""
                          defaultValue="+1 9895 454 21"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="name">
                          Claim Type
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <AntSelect
                          defaultValue="Option"
                          placeholder="Select"
                          arrayOfData={claimData}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="claim">
                          Claim Number
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="claim"
                          className="form-control form-control-lg"
                          name="claim"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Enter"
                          setFieldValue=""
                          icon=""
                          defaultValue="5468890"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="policy">
                          Policy Number
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="policy"
                          className="form-control form-control-lg"
                          name="policy"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Policy Number"
                          setFieldValue=""
                          icon=""
                          defaultValue="12345678DCV"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="date">
                          Date of Loss
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <DatePicker
                          id="date"
                          className="form-control form-control-lg"
                          name="date"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Select Date"
                          setFieldValue=""
                          icon=""
                          defaultValue={dayjs("12-05-2023", "DD-MM-YYYY")}
                          // value="12-05-2023"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="12">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="notes">
                          Additional Notes
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <AntTextArea
                          id="notes"
                          className="form-control form-control-lg"
                          name="notes"
                          disabled={false}
                          variant="standard"
                          type="text"
                          placeholder="Enter Notes"
                          setFieldValue=""
                          icon=""
                          defaultValue="There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration."
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="stepsBtn d-flex justify-content-end">
                  <Button type="primary" className="btn btn-primary">
                    Save
                  </Button>
                </div>
              </form>
            ) : loopStepModalType === "loopCompany" ? (
              <form>
                <Row>
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="name">
                          Company Name
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="name"
                          className="form-control form-control-lg"
                          name="name"
                          disabled={false}
                          variant="standard"
                          type="name"
                          placeholder="Company Name"
                          setFieldValue=""
                          icon=""
                          defaultValue="Initech"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="6" />
                  <Col lg="6">
                    <div className="form-group">
                      <div className="form-label-group d-flex justify-content-between flex-wrap">
                        <label className="form-label" htmlFor="name">
                          Upload Company Logo
                        </label>
                        <Link to="#" className="linkRemove">
                          Remove
                        </Link>
                      </div>
                      <div className="form-control-wrap overflow-hidden">
                        <div className="uploadImg">
                          <ImageElement
                            source="upload-img.jpg"
                            alt="user"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="stepsBtn d-flex justify-content-end">
                  <Button type="primary" className="btn btn-primary">
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
        </ModalComponent>
        <ModalComponent
          backdrop
          show={channelModal}
          onHandleCancel={hideCreateChannelModal}
          size="md"
          title="Create a Channel for ''Wildfire Operation'' loop"
          extraClassName="createChannel"
        >
          <>
            <form>
              <Row>
                <Col sm="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="name">
                        Channel name
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <TextInput
                        id="name"
                        className="form-control form-control-lg"
                        name="name"
                        disabled={false}
                        variant="standard"
                        type="name"
                        placeholder="Enter Channel name"
                        setFieldValue="Wildfire Operation"
                        icon=""
                      />
                    </div>
                  </div>
                </Col>
                <Col sm="12">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <AntTextArea
                        id="description"
                        className="form-control form-control-lg"
                        name="description"
                        disabled={false}
                        variant="standard"
                        type="description"
                        placeholder="Description"
                        setFieldValue=""
                        icon=""
                      />
                    </div>
                  </div>
                </Col>
                <Col sm="12 text-end mt-lg-3">
                  <Link
                    href="#"
                    className="btn btn-primary"
                    onClick={() => {
                      setCreateChannelModal(false)
                      setAddParticipantsModal(true)
                    }}
                  >
                    Next
                  </Link>
                  {/* <Link href="#" className="btn btn-primary">Next</Link> */}
                </Col>
              </Row>
            </form>
          </>
        </ModalComponent>
        <ModalComponent
          backdrop
          show={addParticipants}
          onHandleCancel={hideaddParticipants}
          size="lg"
          title="Add Participants"
          extraClassName="addParticipants"
        >
          <>
            <form>
              <Row>
                <Col sm="12">
                  <div className="form-group inviteLink d-sm-flex align-items-center">
                    <div className="form-label-group flex-shrink-0">
                      <label
                        className="form-label font-sb mb-sm-0"
                        htmlFor="name"
                      >
                        Invite with Link
                      </label>
                    </div>
                    <div className="form-control-wrap w-100">
                      <TextInput
                        id="name"
                        className="form-control form-control-lg"
                        name="name"
                        disabled={false}
                        variant="standard"
                        type="name"
                        placeholder="Enter Invite with Link"
                        // setFieldValue="Wildfire Operation"
                        defaultValue="https://xd.adobe.com/view/0d68d580-440d-4341-8ae2-892322ffebc4-583b/"
                        icon=""
                      />
                      <Link href="#" className="btn btn-dark">
                        <span className="d-none d-md-block">Copy Link</span>{" "}
                        <em className="icon-copy-outline d-block d-md-none" />
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col sm="12">
                  <div className="form-group addParticipants d-sm-flex align-items-center">
                    <div className="form-label-group flex-shrink-0">
                      <label
                        className="form-label font-sb mb-sm-0"
                        htmlFor="name"
                      >
                        Add Participants
                      </label>
                    </div>
                    <div className="d-flex w-100 align-items-center">
                      <div className="form-control-wrap w-100">
                        <ChatSearchBar
                          searchOpen={searchOpen}
                          setSearchOpen={setSearchOpen}
                        />
                        {/* <TextInput
                        id="name"
                        className="form-control form-control-lg"
                        name="name"
                        disabled={false}
                        variant="standard"
                        type="name"
                        placeholder="Search by Email"
                        setFieldValue="Wildfire Operation"
                        icon=""
                      /> */}
                        {/* <Dropdown className="participantsDrop ellipseDrop d-inline-block">
                        <Dropdown.Toggle as="a" className="d-inline-flex align-items-center" id="dropdown-basic">
                          <span className="name">Owner</span>  <span className="icon-arrow-down"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-end">
                          <Link className="dropdown-item" onClick={document.body.click()} to="#">Member</Link>
                          <Link className="dropdown-item" onClick={document.body.click()} to="#">Guest</Link>
                        </Dropdown.Menu>
                      </Dropdown> */}
                      </div>
                      {/* <Link href="#" className="btn btn-info btn-md flex-shrink-0 ms-2"><span className="d-none d-md-block">Add</span> <em className="icon-plus d-block d-md-none"></em></Link> */}
                    </div>
                  </div>
                </Col>
                <Col sm="12">
                  <div className="addParticipants_list">
                    <div className="form-group d-flex align-items-center">
                      <div className="form-label-group d-none d-sm-block flex-shrink-0">
                        <label
                          className="form-label font-sb mb-sm-0"
                          htmlFor="name"
                        >
                          &nbsp;
                        </label>
                      </div>
                      <div className="w-100 d-flex align-items-center me-2 flex-wrap">
                        <div className="user d-flex align-items-center">
                          <div className="userImage position-relative">
                            <div className="userAvatar flex-shrink-0">
                              <ImageElement
                                source="profile/profile01.jpg"
                                alt="user"
                              />
                            </div>
                            <span className="statusdot statusdot-available" />
                          </div>
                          <div className="user_info ms-2 ms-md-3 overflow-hidden">
                            <h6 className="font-sb text-truncate mb-0">
                              Domingo Osuna
                            </h6>
                          </div>
                        </div>
                        <Dropdown className="ellipseDrop d-inline-block ms-auto">
                          <Dropdown.Toggle
                            as="a"
                            className="d-inline-flex align-items-center"
                            id="dropdown-basic"
                          >
                            <span className="name">Owner</span>{" "}
                            <span className="icon-arrow-down" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Member
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Guest
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Link
                        href="#"
                        className="btn btn-dark btn-md flex-shrink-0 ms-2"
                      >
                        <span className="d-none d-md-block">Remove</span>{" "}
                        <em className="icon icon-close d-block d-md-none" />
                      </Link>
                    </div>
                    <div className="form-group d-flex align-items-center">
                      <div className="form-label-group d-none d-sm-block flex-shrink-0">
                        <label
                          className="form-label font-sb mb-sm-0"
                          htmlFor="name"
                        >
                          &nbsp;
                        </label>
                      </div>
                      <div className="w-100 d-flex align-items-center me-2 flex-wrap">
                        <div className="user d-flex align-items-center">
                          <div className="userImage position-relative">
                            <div className="userAvatar flex-shrink-0">
                              <ImageElement
                                source="profile/profile02.jpg"
                                alt="user"
                              />
                            </div>
                            <span className="statusdot statusdot-available" />
                          </div>
                          <div className="user_info ms-2 ms-md-3 overflow-hidden">
                            <h6 className="font-sb text-truncate mb-0">
                              Kevin South
                            </h6>
                          </div>
                        </div>
                        <Dropdown className="ellipseDrop d-inline-block ms-auto">
                          <Dropdown.Toggle
                            as="a"
                            className="d-inline-flex align-items-center"
                            id="dropdown-basic"
                          >
                            <span className="name">Owner</span>{" "}
                            <span className="icon-arrow-down" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Member
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Guest
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Link
                        href="#"
                        className="btn btn-dark btn-md flex-shrink-0 ms-2"
                      >
                        <span className="d-none d-md-block">Remove</span>{" "}
                        <em className="icon icon-close d-block d-md-none" />
                      </Link>
                    </div>
                    <div className="form-group d-flex align-items-center">
                      <div className="form-label-group d-none d-sm-block flex-shrink-0">
                        <label
                          className="form-label font-sb mb-sm-0"
                          htmlFor="name"
                        >
                          &nbsp;
                        </label>
                      </div>
                      <div className="w-100 d-flex align-items-center me-2 flex-wrap">
                        <div className="user d-flex align-items-center">
                          <div className="userImage position-relative">
                            <div className="userAvatar flex-shrink-0">
                              <ImageElement
                                source="profile/profile03.jpg"
                                alt="user"
                              />
                            </div>
                            <span className="statusdot statusdot-available" />
                          </div>
                          <div className="user_info ms-2 ms-md-3 overflow-hidden">
                            <h6 className="font-sb text-truncate mb-0">
                              Carol Castle
                            </h6>
                          </div>
                        </div>
                        <Dropdown className="ellipseDrop d-inline-block ms-auto">
                          <Dropdown.Toggle
                            as="a"
                            className="d-inline-flex align-items-center"
                            id="dropdown-basic"
                          >
                            <span className="name">Owner</span>{" "}
                            <span className="icon-arrow-down" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Member
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Guest
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Link
                        href="#"
                        className="btn btn-dark btn-md flex-shrink-0 ms-2"
                      >
                        <span className="d-none d-md-block">Remove</span>{" "}
                        <em className="icon icon-close d-block d-md-none" />
                      </Link>
                    </div>
                    <div className="form-group d-flex align-items-center">
                      <div className="form-label-group d-none d-sm-block flex-shrink-0">
                        <label
                          className="form-label font-sb mb-sm-0"
                          htmlFor="name"
                        >
                          &nbsp;
                        </label>
                      </div>
                      <div className="w-100 d-flex align-items-center me-2 flex-wrap">
                        <div className="user d-flex align-items-center">
                          <div className="userImage position-relative">
                            <div className="userAvatar flex-shrink-0">
                              <ImageElement
                                source="profile/profile04.jpg"
                                alt="user"
                              />
                            </div>
                            <span className="statusdot statusdot-available" />
                          </div>
                          <div className="user_info ms-2 ms-md-3 overflow-hidden">
                            <h6 className="font-sb text-truncate mb-0">
                              Dorothy Cave
                            </h6>
                          </div>
                        </div>
                        <Dropdown className="ellipseDrop d-inline-block ms-auto">
                          <Dropdown.Toggle
                            as="a"
                            className="d-inline-flex align-items-center"
                            id="dropdown-basic"
                          >
                            <span className="name">Owner</span>{" "}
                            <span className="icon-arrow-down" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-end">
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Member
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={document.body.click()}
                              to="#"
                            >
                              Guest
                            </Link>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Link
                        href="#"
                        className="btn btn-dark btn-md flex-shrink-0 ms-2"
                      >
                        <span className="d-none d-md-block">Remove</span>{" "}
                        <em className="icon icon-close d-block d-md-none" />
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col sm="12 text-end modalFooter">
                  <Link
                    href="#"
                    className="btn btn-primary"
                    onClick={() => {
                      hideaddParticipantsModal(true)
                    }}
                  >
                    Send Invite
                  </Link>
                </Col>
              </Row>
            </form>
          </>
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
                            Notifications
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">
                            <span className="icon-key">
                              <em className="path1" />
                              <em className="path2" />
                            </span>
                            Channel Permissions
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
                            <h3>Notifications</h3>
                            <p className="mb-0">
                              Customize your notification preferences and stay
                              informed with relevant updates and activities
                            </p>
                          </div>

                          <div className="modalSettings_switch d-flex justify-content-between">
                            <h6 className="mb-0">Show message preview</h6>
                            <Switch checked />
                          </div>

                          <div className="modalSettings_switch d-flex justify-content-between">
                            <h6 className="mb-0">
                              Play sound for incoming calls and notifications
                            </h6>
                            <Switch checked />
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="modalSettings_head">
                            <h3>Chats</h3>
                            <p className="mb-0">
                              Manage the chat permissions for the channel users.
                            </p>
                          </div>
                          <div className="form-group">
                            <div className="form-label-group">
                              <label
                                className="form-label font-sb"
                                htmlFor="name"
                              >
                                Who can send chat in this channel?
                              </label>
                            </div>
                            <div className="form-control-wrap font-rg">
                              <AntSelect
                                placeholder="Select Channel"
                                arrayOfData={channelData}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="form-label-group">
                              <label
                                className="form-label font-sb"
                                htmlFor="name"
                              >
                                Who can read chat in this channel?
                              </label>
                            </div>
                            <div className="form-control-wrap font-rg">
                              <AntSelect
                                placeholder="Select Channel"
                                arrayOfData={channelData}
                              />
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

        <ModalComponent
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
                No
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => setDeleteNote(false)}
                className="ms-2 ms-md-3"
              >
                Yes
              </CommonButton>
            </div>
          </>
        </ModalComponent>

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
          title="Are you sure?"
          // extraClassName="removeModal"
        >
          <>
            <p className="mb-0">you want to delete this Call history? </p>
            <div className="text-end modalFooter">
              <CommonButton
                onClick={() => setRemoveCallHistory(false)}
                variant="light"
              >
                No
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => setRemoveCallHistory(false)}
                className="ms-2 ms-md-3"
              >
                Yes
              </CommonButton>
            </div>
          </>
        </ModalComponent>
      </div>
    </>
  )
}

export default ChatSidebar
