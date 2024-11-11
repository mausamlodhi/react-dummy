import React from 'react'

import { CommonButton, ModalComponent } from 'components/UiElement'

function DeleteMessageModal(props) {
  const { isLoading, onClose, onSubmit } = props
  return (
    <ModalComponent
      backdrop
      show
      onHandleCancel={onClose}
      size='md'
      title='Delete Message?'
      extraClassName='pinModal'
    >
      <>
        <div className='text-end modalFooter'>
          <CommonButton onClick={onClose} variant='light'>
            Cancel
          </CommonButton>
          <CommonButton
            loading={isLoading}
            variant='primary'
            onClick={onSubmit}
            className='ms-2 ms-md-3'
          >
            Yes
          </CommonButton>
        </div>
      </>
    </ModalComponent>
  )
}

export default DeleteMessageModal
