import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import validation from "./validation";
import { CommonButton } from "../../../UiElement";
import { AntTextArea, Input as TextInput } from "../../../Antd";

function ManageRoleForm({ onSubmit, loading, rowData, hideRoleEditModal }) {
  const { t } = useTranslation();
  const initialValues = {
    roleName: rowData?.role || "",
    description: rowData?.description || "",
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <Row className="g-3">
              <Col md="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="question">
                    {t("text.adminManageRoles.roleName")}
                  </label>
                  <TextInput
                    className="form-control form-control-lg"
                    placeholder={t("text.adminManageRoles.enterRoleName")}
                    // defaultValue={
                    //   roleModalType === "add" ? "" : "projectManager"
                    // }
                    name="roleName"
                    disabled={false}
                    variant="standard"
                    type="text"
                    setFieldValue={props.handleChange}
                  />
                </div>
              </Col>
              <Col md="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="description">
                      {t("text.adminManageRoles.description")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <AntTextArea
                      className="form-control form-control-lg"
                      placeholder={t("text.adminManageRoles.enterDescription")}
                      name="description"
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="mt-4 align-center justify-content-center flex-wrap flex-sm-nowrap gx-md-4 gx-2 gy-2">
              <div>
                <CommonButton
                  extraClassName="btn btn-lg btn-primary"
                  loading={loading}
                  htmltype="button"
                  type="submit"
                >
                  {!rowData?.id
                    ? t("text.common.add")
                    : t("text.common.update")}
                </CommonButton>
              </div>
              <div>
                <Link
                  href="#"
                  onClick={() => hideRoleEditModal()}
                  className="btn btn-light btn-lg"
                >
                  {t("text.common.cancel")}
                </Link>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ManageRoleForm;
