import React, { useState, useEffect, useContext } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { ChatSearchBar, ImageElement } from "components";
import { LoopService } from "services";
import { logger, modalNotification, userChatStatusOptions } from "utils";
import { SocketContext } from "context/socket.context";
import { selectUserData } from "redux/AuthSlice/index.slice";

function ChannelAddParticipants(props) {
  const { socket, socketState, socketStateHandler } = useContext(SocketContext);
  const { channel, onClose } = props;
  const { selectedChannel } = socketState;
  const { getUserChatStatus } = socketStateHandler;
  const [usersRolesList, setUsersRoleList] = useState([]);
  const channelDetails = channel || selectedChannel;
  const userData = useSelector(selectUserData);
  const handleErrorValidation = (values) => {
    const errorObj = {};

    values.forEach((value) => {
      if (!value?.selectedUserRole) {
        errorObj[value?.id] = `${value?.firstName ?? ""} ${
          value?.lastName ?? ""
        }`;
      }
    });

    return errorObj;
  };

  const handleParticipantRequest = (data) => {
    socket?.emit?.("participant_request", {
      userIds: data?.map((item) => item?.receiveUserId),
    });
  };

  const handleSubmit = async (formValues) => {
    try {
      const errorResult = handleErrorValidation(formValues.addedUser);
      if (Object.keys(errorResult).length) {
        modalNotification({
          type: "error",
          message: `Please select a user role for ${
            Object.values(errorResult)[0]
          }`,
        });
      } else {
        const bodyData = formValues?.addedUser?.map?.((formValue) => ({
          receiveUserId: formValue?.id,
          rolePermissionId: formValue?.selectedUserRole,
        }));
        const response = await LoopService.postAddChannelMemberService(
          channelDetails?.channelId
            ? channelDetails?.channelId
            : channelDetails?.id,
          { members: bodyData },
        );
        if (response?.success) {
          modalNotification({
            type: "success",
            message: response?.message,
          });
          handleParticipantRequest(bodyData);
          onClose();
        }
      }
    } catch (error) {
      logger(error);
    }
  };

  const handleAddParticipants = (addedUser, selectUser, setValues) => {
    const isAlreadyExists = addedUser?.some?.(
      (addedUserItem) => addedUserItem?.id === selectUser?.id,
    );
    if (isAlreadyExists) {
      modalNotification({
        type: "error",
        message: "User Already Selected",
      });
    } else {
      setValues("addedUser", [...addedUser, selectUser]);
    }
  };

  const handleRemoveParticipant = (addedUser, removeUserId, setValues) => {
    setValues(
      "addedUser",
      addedUser?.filter?.(
        (addedUserItem) => addedUserItem?.id !== removeUserId,
      ),
    );
  };

  const handleChangeMemberRole = (
    addedUser,
    selectUserId,
    roleType,
    setValues,
  ) => {
    setValues(
      "addedUser",
      addedUser?.map?.((addedUserItem) =>
        addedUserItem?.id === selectUserId
          ? { ...addedUserItem, selectedUserRole: roleType }
          : addedUserItem,
      ),
    );
  };

  const getUserRoleLists = async () => {
    try {
      const response = await LoopService.getLoopRoleListsService(
        channelDetails?.loopId || channelDetails?.chatRoom?.loopId,
      );
      if (response?.success) {
        setUsersRoleList(response?.data?.rows ?? []);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (channelDetails?.loopId || channelDetails) {
      getUserRoleLists();
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          addedUser: [],
        }}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <Row>
              <Col sm="12">
                <div className="form-group addParticipants">
                  <div className="form-label-group flex-shrink-0">
                    <label className="form-label font-sb w-100" htmlFor="name">
                      Add Participants
                    </label>
                  </div>
                  <div className="d-flex w-100 align-items-center">
                    <div className="form-control-wrap w-100">
                      <ChatSearchBar
                        //   searchOpen={searchOpen}
                        //   setSearchOpen={setSearchOpen}
                        handleSelect={(selected) => {
                          handleAddParticipants(
                            formikProps.values.addedUser,
                            selected,
                            formikProps.setFieldValue,
                          );
                        }}
                        userId={userData?.id}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <div className="addParticipantsList">
                  {formikProps.values.addedUser.length > 0 &&
                    formikProps.values.addedUser.map((addedUserItem, idx) => {
                      return (
                        <div key={idx}>
                          <div className="form-group d-flex align-items-center">
                            <div className="form-label-group d-none d-sm-block flex-shrink-0">
                              {/* <label
                              className="form-label font-sb mb-sm-0"
                              htmlFor="name"
                            >
                              &nbsp;
                            </label> */}
                            </div>
                            <div className="w-100 d-flex align-items-center me-2 flex-wrap">
                              <div className="user d-flex align-items-center">
                                <div className="userImage position-relative">
                                  <div className="userAvatar flex-shrink-0">
                                    <ImageElement
                                      previewSource={
                                        addedUserItem.profileImageUrl
                                      }
                                      alt="user"
                                    />
                                  </div>
                                  <span
                                    className={`statusdot statusdot-${
                                      userChatStatusOptions[
                                        getUserChatStatus(addedUserItem?.id) ||
                                          addedUserItem?.chatStatus?.status
                                      ]?.key
                                    }`}
                                  />
                                </div>
                                <div className="user_info ms-2 ms-md-3 overflow-hidden">
                                  <h6 className="font-sb text-truncate mb-0">
                                    {addedUserItem?.firstName ?? ""}&nbsp;
                                    {addedUserItem?.lastName ?? ""}
                                  </h6>
                                </div>
                              </div>

                              <Dropdown className="ellipseDrop d-inline-block ms-auto">
                                <Dropdown.Toggle
                                  as="a"
                                  className="d-inline-flex align-items-center"
                                  id="dropdown-basic"
                                >
                                  <span className="name">
                                    {addedUserItem?.selectedUserRole
                                      ? usersRolesList?.find(
                                          (userRoleItem) =>
                                            userRoleItem.id ===
                                            addedUserItem?.selectedUserRole,
                                        )?.channelRole?.role
                                      : "Select"}
                                  </span>
                                  <span className="icon-arrow-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                  {usersRolesList.map(
                                    (userRoleItem, userRoleItemIdx) => (
                                      <Link
                                        key={userRoleItemIdx}
                                        className="dropdown-item"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleChangeMemberRole(
                                            formikProps.values.addedUser,
                                            addedUserItem?.id,
                                            userRoleItem?.id,
                                            formikProps.setFieldValue,
                                          );
                                          document.body.click();
                                        }}
                                        // to="#"
                                      >
                                        {userRoleItem?.channelRole?.role}
                                      </Link>
                                    ),
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <Link
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveParticipant(
                                  formikProps.values.addedUser,
                                  addedUserItem.id,
                                  formikProps.setFieldValue,
                                );
                              }}
                              className="btn btn-dark btn-md flex-shrink-0 ms-2"
                            >
                              <span className="d-none d-md-block">Remove</span>{" "}
                              <em className="icon icon-close d-block d-md-none" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Col>
              <Col sm="12 text-end modalFooter">
                <Button
                  disabled={
                    !formikProps.values.addedUser.length ||
                    formikProps.isSubmitting
                  }
                  type="submit"
                  className="btn btn-primary"
                >
                  {formikProps.isSubmitting ? <Spin /> : <>Send Invite</>}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ChannelAddParticipants;
