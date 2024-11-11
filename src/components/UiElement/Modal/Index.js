import React from "react";
import Modal from "react-bootstrap/Modal";

function ModalComponent({ 
  title,
  subTitle,
  children,
  show,
  modalExtraClass = "",
  extraClassName = "",
  extraTitleClassName = "",
  titleClassName ="",
  onHandleVisible,
  onHandleCancel,
  closeButton = true,
  backdrop = "static",
  size = ""
 }) {
  return (
    <Modal className={modalExtraClass}
    show={show}
    onHide={onHandleCancel}
    onHandleShow={onHandleVisible}
    backdrop={backdrop}
    keyboard={false}
    dialogClassName={extraClassName}
    size={size}
    centered>
      <Modal.Header
          className={`${extraTitleClassName}`}
          closeButton={closeButton}
          closeVariant="white"
        >
          {title ? (
            <>
              <Modal.Title as="h5" className={`${titleClassName}`}>
                {title}
              </Modal.Title>
              {subTitle && <p>{subTitle}</p>}
            </>
          ) : (
            ""
          )}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
