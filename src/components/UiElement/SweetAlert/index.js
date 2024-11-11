import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

function SweetAlert({
  show,
  onConfirmAlert,
  loading,
  setIsAlertVisible,
  ...rest
}) {
  useEffect(() => {
    if (show) {
      Swal.fire({
        ...rest,
        preConfirm: async (data) => {
          const res = await onConfirmAlert(data)
          if (res) {
            return true
          }
          return true
        }
      }).then((result) => {
        if (result.isConfirmed) {
          //   toastr.clear();
          //   NioApp.Toast('User Queries deleted successfully', 'success',{position: 'top-right'});
          setIsAlertVisible(false)
        } else if (result.isDismissed) {
          setIsAlertVisible(false)
        }
      })
    }
  }, [show])

  return <></>
}
export default SweetAlert
