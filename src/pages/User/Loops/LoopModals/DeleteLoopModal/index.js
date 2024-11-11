import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, ModalComponent } from "components";

function DeleteLoopModal({
  deleteLoopsModal,
  hideDeleteLoopsModal,
  // getLoopData,
  // loopId,
  // setLoopId,
}) {
  const { t } = useTranslation();
  const onHandleDeleteLoop = () => {};

  return (
    <ModalComponent
      backdrop
      show={deleteLoopsModal}
      onHandleCancel={hideDeleteLoopsModal}
      size="md"
      title={t("text.createLoop.deleteLoops")}
      extraClassName="deleteModal"
    >
      <>
        <p className="mb-0 text-danger">
          {t("text.createLoop.onceYouDeleteIt")}
        </p>
        <div className="text-end modalFooter">
          <CommonButton onClick={() => hideDeleteLoopsModal()} variant="light">
            {t("text.common.cancel")}
          </CommonButton>
          <CommonButton
            variant="primary"
            onClick={() => {
              onHandleDeleteLoop();
            }}
            className="ms-2 ms-md-3"
          >
            {t("text.common.confirm")}
          </CommonButton>
        </div>
      </>
    </ModalComponent>
  );
}

export default DeleteLoopModal;
