import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { CommonButton, Input as TextInput, } from "../../../..";
import validation from "./validation";

  function ClaimTypeForm({ categoryModal, onSubmit, hideCategoryEditModal,category,loading }) {
  const initialValues = {
    category: `${categoryModal === 'add' ? "" : category}`
  }
  return <>
    <Formik
      initialValues={initialValues}
      validationSchema={validation()}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-group">
          <label className="form-label" htmlFor="question">{t("text.master.categoryType")}</label>
          <TextInput
            className="form-control form-control-lg"

            placeholder={t("text.master.categoryTypePlaceHolder")}
            name="category"
            disabled={false}
            variant="standard"
            type="text"
          />
        </div>
        <div className="mt-4 align-center justify-content-center flex-wrap flex-sm-nowrap gx-md-4 gx-2 gy-2">
        <div>
              <CommonButton
                  extraClassName="btn btn-lg btn-primary"
                  loading={loading}
                  htmltype="button"
                  type="submit"
                >
                  {categoryModal==="add"
                    ? t("text.common.add")
                    : t("text.common.update")}
                </CommonButton>    
          </div>
          <div>
            <Link href="#" onClick={() => hideCategoryEditModal()} className="btn btn-light btn-lg">{t("text.common.cancel")}</Link>
          </div>
        </div>
      </Form>
    </Formik>
  </>
}
export default ClaimTypeForm;