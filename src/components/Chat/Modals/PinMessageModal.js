import React from "react";

import { CommonButton, ModalComponent } from "components/UiElement";

function PinMessageModal(props) {
  const { isPinMessage, isUnPinMessage, isLoading, onClose, onSubmit, state } =
    props;

  return (
    <ModalComponent
      backdrop
      show={state.isOpenPinMessageModal}
      onHandleCancel={onClose}
      size="md"
      title={`${isPinMessage && !isUnPinMessage ? "Update " : ""} ${
        !isUnPinMessage ? "Pinned" : "Unpin"
      } Message?`}
      extraClassName="pinModal"
    >
      <>
        {isPinMessage && !isUnPinMessage && (
          <p className="mb-0">
            Do you want to replace the current pinned message with this one?
          </p>
        )}
        <div className="text-end modalFooter">
          <CommonButton onClick={onClose} variant="light">
            Cancel
          </CommonButton>
          <CommonButton
            loading={isLoading}
            variant="primary"
            onClick={onSubmit}
            className="ms-2 ms-md-3"
          >
            Yes
          </CommonButton>
        </div>
      </>
    </ModalComponent>
  );
}

export default PinMessageModal;
