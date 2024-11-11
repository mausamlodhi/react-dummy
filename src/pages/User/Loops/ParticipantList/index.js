import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable, logoCreater } from "../../../../components";
import { LoopService } from "../../../../services";
import {
  colorObj,
  getRoomMembersLength,
  modalNotification,
} from "../../../../utils";

export default function LoopParticipantList({
  chatClose,
  chatDetails,
  Employeecolumns,
  selectLoopRoom,
}) {
  const [state, setState] = useState({
    lists: [],
    roleLists: [],
    isLoading: true,
    updateRoleDetails: [],
  });

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key),
    }));
  };

  const getLoopParticipantListDetails = async () => {
    try {
      const response = await Promise.all([
        LoopService.getLoopParticipantListsService(selectLoopRoom?.id),
        LoopService.getLoopRoleListsService(selectLoopRoom?.id),
      ]);
      handleStateChange({
        lists: response?.[0]?.data ?? [],
        roleLists: response?.[1]?.data?.rows ?? [],
        isLoading: false,
      });
    } catch (error) {
      handleStateChange("isLoading", false);
    }
  };

  const handleChangeRoleState = (participantId, selectedRoleId, isLoading) => {
    const isAlreadyExistRole =
      state.updateRoleDetails.length > 0 &&
      state.updateRoleDetails.find(
        (item) =>
          item.participantId === participantId &&
          item.selectedRoleId === selectedRoleId
      );
    if (isAlreadyExistRole) {
      handleStateChange(
        "updateRoleDetails",
        state.updateRoleDetails.map((upRoleDItem) =>
          upRoleDItem.participantId === participantId
            ? { participantId, selectedRoleId, isLoading }
            : upRoleDItem
        )
      );
    } else {
      handleStateChange("updateRoleDetails", [
        ...state.updateRoleDetails,
        { participantId, selectedRoleId, isLoading },
      ]);
    }
  };

  const handleUpdateParticipantRole = async (participantId, selectedRoleId) => {
    handleChangeRoleState(participantId, selectedRoleId, true);
    try {
      const bodyData = {
        participantId,
        selectedRoleId,
      };
      const response = await LoopService.putParticipantRoleUpdateService(
        selectLoopRoom?.loopId,
        bodyData
      );
      handleChangeRoleState(participantId, selectedRoleId, false);

      modalNotification({
        type: "success",
        message: response.message,
      });
    } catch (error) {
      setTimeout(() => {
        handleChangeRoleState(participantId, selectedRoleId, false);
        modalNotification({
          type: "error",
          message: error.message,
        });
      }, 10000);
    }
  };

  useEffect(() => {
    getLoopParticipantListDetails();
  }, []);

  return (
    <>
      <div className={`chatRight ${chatDetails ? "chatRight-open" : ""}`}>
        <div className="chatHead">
          <div className="userBox d-flex align-items-center justify-content-between w-100 p-0">
            <div className="d-flex align-items-center">
              <Link
                className="link-primary me-2 d-block d-lg-none"
                onClick={() => chatClose(false)}
              >
                <em className="icon icon-back">
                  <em className="path1" />
                  <em className="path2" />
                </em>
              </Link>
              <div
                className={`userAvatar userAvatar-md ${
                  selectLoopRoom?.name
                    ? colorObj?.[selectLoopRoom?.name?.charAt(0).toLowerCase()]
                    : ""
                }`}
              >
                <span>{logoCreater(selectLoopRoom?.name)}</span>
              </div>
              <div className="userBox_content">
                <h5>{selectLoopRoom?.name ? selectLoopRoom?.name : "-"}</h5>
                <div className="d-flex">
                  {selectLoopRoom?.chatRooms?.length > 0
                    ? getRoomMembersLength(
                        selectLoopRoom?.chatRooms
                          ?.map((item) => item?.chatRoomMembers)
                          .flat()
                      )
                    : 0}
                  &nbsp;Members <span className="px-1">|</span>
                  {selectLoopRoom?.chatRooms?.length} Channels
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pageHeader ">
          <div className="pageHeader_head d-flex flex-wrap flex-xl-nowrap align-items-center mb-0">
            <h3 className="pageHeader_head_title pageHeader_head_title-sm font-sb m-0 flex-shrink-0">
              Participants Lists
            </h3>
          </div>
        </div>
        <div className="chatBox pt-0">
          <div className="userDataTable">
            <DataTable
              isCard={false}
              header={false}
              pagination={false}
              userTable
              hasLimit
              // noOfPage='1'
              // sizePerPage='10'
              // page='1'
              // count='100'
              tableData={state.lists}
              tableColumns={Employeecolumns({
                roleLists: state.roleLists,
                handleUpdateParticipantRole,
                updateRoleDetails: state.updateRoleDetails,
              })}
              // param={param}
              // defaultSort={defaultSort}
              setSizePerPage=""
              // tableLoader={tableLoader}
              // tableReset={tableReset}
              // getSearchValue={getSearchValue}
              // searchPlaceholder={t("text.search.ManageSubscription")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
