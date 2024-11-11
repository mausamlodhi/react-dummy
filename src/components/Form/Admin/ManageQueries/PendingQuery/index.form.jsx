import { Form, Formik } from "formik";
import { t } from "i18next";
import { CommonButton, Input as TextInput } from "../../../..";
import validation from "./validation";
import { AntTextArea } from "../../../../Antd";

function PendingQueriesForm({ onSubmit, closeReplyModal, rowData, loading }) {
  const initialValues = {
    email: rowData?.email || "",
    reply: "",
  };
  return (
    <>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validation()}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label className="form-label">{t("text.common.email")}</label>
            <TextInput
              id="email"
              className="form-control form-control-lg"
              name="email"
              disabled
              variant="standard"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="full-name">
              {t("text.manageQueries.reply")}
            </label>
            <AntTextArea
              className="form-control form-control-lg"
              name="reply"
              id="reply"
              disabled={false}
              variant="standard"
              type="text"
              placeholder="Enter Reply"
              defaultValue=""
            />
          </div>
          <div className="mt-4 align-center justify-content-center flex-wrap flex-sm-nowrap gx-md-4 gx-2 gy-2">
            <div>
              <CommonButton
                className="btn btn-primary btn-lg"
                type="submit"
                loading={loading}
                htmlFor="submit"
              >
                {t("text.manageQueries.reply")}
              </CommonButton>
            </div>
            <div>
              <CommonButton
                className="btn btn-light btn-lg"
                onClick={closeReplyModal}
              >
                {t("text.manageQueries.cancel")}
              </CommonButton>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default PendingQueriesForm;
