import React from "react";
import { useTranslation } from "react-i18next";

import { CommonButton, ModalComponent } from "components";

function DeleteChannelModal({
  deleteChannelModal,
  hideDeleteChannelModal,
  onHandleDelete,
}) {
  const { t } = useTranslation();

  return (
    <ModalComponent
      backdrop
      show={deleteChannelModal}
      onHandleCancel={hideDeleteChannelModal}
      size="md"
      title={t("text.createLoop.youAreAboutToDelete")}
      extraClassName="deleteModal"
    >
      <>
        <p className="mb-0">{t("text.createLoop.deleteText")}</p>
        <div className="text-end modalFooter">
          <CommonButton
            onClick={() => hideDeleteChannelModal()}
            variant="light"
          >
            {t("text.common.cancel")}
          </CommonButton>
          <CommonButton
            variant="primary"
            onClick={() => onHandleDelete()}
            className="ms-2 ms-md-3"
          >
            {t("text.common.confirm")}
          </CommonButton>
        </div>
      </>
    </ModalComponent>
  );
}

export default DeleteChannelModal;
