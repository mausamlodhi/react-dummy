import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { firstLetterCaps, logger } from "utils";
import { LoopService } from "services";
import { AntSelect, Checkbox, CommonButton } from "../../..";
import { validation } from "./validation";

// import { validation } from "./validation";

export default function AddEditRoles({
  onSubmit,
  setAddRole,
  addRoleLoading,
  rowData,
}) {
  const { t } = useTranslation();
  const [roleData, setRolesData] = useState([]);
  const [roleDataLoading, setRolesDataLoading] = useState(false);
  let initialValues = {
    channelRoleId: rowData?.channelRole?.role || undefined,
    channelCreate: rowData?.channelCreate || 0,
    loopView: rowData?.loopView || 1,
    channelEdit: rowData?.channelEdit || 0,
    loopEdit: rowData?.loopEdit || 0,
    channelDelete: rowData?.channelDelete || 0,
    viewParticipants: rowData?.viewParticipants || 0,
    inviteParticipants: rowData?.inviteParticipants || 0,
    noteCreate: rowData?.noteCreate || 0,
    noteEdit: rowData?.noteEdit || 0,
    noteView: rowData?.noteView || 0,
    noteRemove: rowData?.noteRemove || 0,
    filesShare: rowData?.filesShare || 0,
    filesView: rowData?.filesView || 0,
    filesDownload: rowData?.filesDownload || 0,
  };

  const getRole = async () => {
    setRolesDataLoading(true);
    try {
      const response = await LoopService?.getRolesService();
      if (response?.success) {
        setRolesData(response?.data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setRolesDataLoading(false);
  };

  useEffect(() => {
    if (!rowData) {
      getRole();
    }
  }, [rowData]);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e) => {
        onSubmit(e);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group form-group-mb">
              <div className="form-label-group">
                <label className="form-label" htmlFor="description">
                  {t("text.loops.roleName")}
                </label>
              </div>
              <AntSelect
                id="channelRoleId"
                name="channelRoleId"
                placeholder={t("text.loops.selectRoleName")}
                arrayOfData={roleData?.map((item) => {
                  return { label: firstLetterCaps(item?.role), id: item?.id };
                })}
                disabled={rowData?.channelRoleId > 0}
                // icon={
                //   <div className="form-icon form-icon-left icon-gradiant">
                //     <em className="icon-gender" />
                //   </div>
                // }
                loading={roleDataLoading}
                setFieldValue={props.handleChange}
              />
            </div>
            <h3 className="addRole_head font-sb">
              {t("text.loops.assignPermission")}
            </h3>
            <div className="d-flex">
              <div className="addRole_innerhead">
                <h4>{t("text.loops.loopInfo")}</h4>
                <div className="d-flex flex-wrap">
                  <Checkbox
                    className="font-rg"
                    id="loopView"
                    name="loopView"
                    disabled
                    checked
                    setFieldValue={props.handleChange}
                  >
                    {t("text.common.view")}
                  </Checkbox>

                  <Checkbox
                    className="font-rg"
                    id="loopEdit"
                    name="loopEdit"
                    setFieldValue={props.handleChange}
                    defaultChecked={rowData?.loopEdit === 1}
                  >
                    {t("text.common.edit")}
                  </Checkbox>
                </div>
              </div>

              <div className="addRole_innerhead me-0">
                <h4>{t("text.loops.channels")}</h4>
                <div className="d-flex flex-wrap">
                  <Checkbox
                    className="font-rg"
                    id="channelCreate"
                    name="channelCreate"
                    setFieldValue={props.handleChange}
                    defaultChecked={rowData?.channelCreate === 1}
                  >
                    {t("text.loops.create")}
                  </Checkbox>

                  <Checkbox
                    className="font-rg"
                    id="channelEdit"
                    name="channelEdit"
                    setFieldValue={props.handleChange}
                    defaultChecked={rowData?.channelEdit === 1}
                  >
                    {t("text.common.edit")}
                  </Checkbox>

                  <Checkbox
                    className="font-rg me-0"
                    id="channelDelete"
                    name="channelDelete"
                    setFieldValue={props.handleChange}
                    defaultChecked={rowData?.channelDelete === 1}
                  >
                    {t("text.common.delete")}
                  </Checkbox>
                </div>
              </div>
            </div>

            <div className="addRole_innerhead">
              <h4>{t("text.loops.channelParticipants")} </h4>
              <div className="d-flex">
                <Checkbox
                  className="font-rg"
                  id="viewParticipants"
                  name="viewParticipants"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.viewParticipants === 1}
                >
                  {t("text.loops.viewParticipants")}
                </Checkbox>

                <Checkbox
                  className="font-rg"
                  id="inviteParticipants"
                  name="inviteParticipants"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.inviteParticipants === 1}
                >
                  {t("text.loops.inviteParticipants")}
                </Checkbox>
              </div>
            </div>

            <div className="addRole_innerhead">
              <h4>{t("text.loops.notes")}</h4>
              <div className="d-flex">
                <Checkbox
                  className="font-rg"
                  id="noteCreate"
                  name="noteCreate"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.noteCreate === 1}
                >
                  {t("text.loops.create")}
                </Checkbox>

                <Checkbox
                  className="font-rg"
                  id="noteEdit"
                  name="noteEdit"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.noteEdit === 1}
                >
                  {t("text.common.edit")}
                </Checkbox>

                <Checkbox
                  className="font-rg"
                  id="noteView"
                  name="noteView"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.noteView === 1}
                >
                  {t("text.common.view")}
                </Checkbox>

                <Checkbox
                  className="font-rg"
                  id="noteRemove"
                  name="noteRemove"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.noteRemove === 1}
                >
                  {t("text.loops.remove")}
                </Checkbox>
              </div>
            </div>

            <div className="addRole_innerhead">
              <h4> {t("text.loops.files")}</h4>
              <div className="d-flex">
                <Checkbox
                  className="font-rg"
                  id="filesShare"
                  name="filesShare"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.filesShare === 1}
                >
                  {t("text.loops.share")}
                </Checkbox>

                <Checkbox
                  className="font-rg"
                  id="filesView"
                  name="filesView"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.filesView === 1}
                >
                  {t("text.common.view")}
                </Checkbox>

                <Checkbox
                  className="font-rg"
                  id="filesDownload"
                  name="filesDownload"
                  setFieldValue={props.handleChange}
                  defaultChecked={rowData?.filesDownload === 1}
                >
                  {t("text.loops.download")}
                </Checkbox>
              </div>
            </div>
            <div className="text-end modalFooter d-flex justify-content-between">
              <CommonButton onClick={() => setAddRole(false)} variant="light">
                {t("text.common.cancel")}
              </CommonButton>
              <CommonButton
                variant="primary"
                htmlType="submit"
                type="submit"
                className="ms-3"
                loading={addRoleLoading}
              >
                {rowData?.id ? t("text.common.update") : t("text.common.add")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
