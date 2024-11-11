import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUserData } from "redux/AuthSlice/index.slice";
import {
  AddEditRolesForm,
  ManageRoles,
  ModalComponent,
  logoCreater,
} from "../../../../components";
import {
  colorObj,
  getRoomMembersLength,
  logger,
  modalNotification,
} from "../../../../utils";
import { LoopService } from "../../../../services";

export default function LoopsRole({
  chatClose,
  chatDetails,
  loopId,
  selectLoopRoom,
}) {
  const { t } = useTranslation();
  const [addRole, setAddRole] = useState(false);
  const [tableLoader, setTableLoaderLoading] = useState(false);
  const [roleListData, setRolesListData] = useState([]);
  const [addRoleLoading, setAddRoleLoading] = useState(false);
  const [rowData, setRowData] = useState("");
  const userData = useSelector(selectUserData);
  const [owner,setOwner] = useState(false)
  const getRoleListData = async (id) => {
    setTableLoaderLoading(true);
    setRolesListData([]);
    setAddRole(false);
    try {
      const response = await LoopService?.getRolesListService(id);
      if (response?.success) {
        setRolesListData(response?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoaderLoading(false);
  };

  const onSubmit = async (value) => {
    setAddRoleLoading(true);
    try {
      let channelId;
      if (value?.channelRoleId) {
        channelId = parseInt(value?.channelRoleId);
      }

      let bodyData = {
        ...value,
        channelRoleId: channelId,
      };

      const response = rowData?.id
        ? await LoopService?.updateRolesService(loopId, rowData?.id, bodyData)
        : await LoopService?.addRolesService(loopId, bodyData);

      if (response?.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
        setRowData("");
        setAddRole(false);
      }
    } catch (error) {
      logger(error);
    }
    setAddRoleLoading(false);
    getRoleListData(loopId);
  };

  useEffect(() => {
    if(selectLoopRoom?.createdBy===userData?.id)
        setOwner(true);
  }, [loopId]);

  return (
    <>
      <div className={`chatRight ${chatDetails ? "chatRight-open" : ""}`}>
        {/* chatHead */}
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
                    : 0}{" "}
                  Members <span className="px-1">|</span>
                  {selectLoopRoom?.chatRooms?.length} Channels{" "}
                </div>
              </div>
            </div>
            <ul className="chatHead_toolsList list-inline mb-0">
              {userData?.id===selectLoopRoom?.createdBy &&<li className="list-inline-item">
                <Link
                  className="chatHead_toolsList_icon link-primary text-decoration-underline font-sb"
                  onClick={() => setAddRole(true)}
                  to="#"
                >
                  {t("text.loops.addRoles")}
                </Link>
              </li>}
            </ul>
          </div>
        </div>
        <div className="chatBox">
          <ManageRoles
            setAddRole={setAddRole}
            loopId={loopId}
            getRoleListData={getRoleListData}
            tableLoader={tableLoader}
            roleListData={roleListData}
            setRowData={setRowData}
            permissionId={rowData?.id}
            owner={owner}
          />
        </div>
      </div>

      <ModalComponent
        backdrop
        show={addRole}
        onHandleCancel={() => {
          setAddRole(false);
          setRowData("");
        }}
        size="md"
        title="Add Role"
        extraClassName="addRole"
      >
        <AddEditRolesForm
          rowData={rowData}
          onSubmit={onSubmit}
          setAddRole={setAddRole}
          addRoleLoading={addRoleLoading}
        />
      </ModalComponent>
    </>
  );
}
