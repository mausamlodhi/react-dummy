import React, { useState } from 'react'
import { ManageRoleForm } from '../../../../components'
import { AdminManageRoleService } from '../../../../services/Admin'
import { logger, modalNotification } from '../../../../utils'

function AddEditManageRole({
  rowData,
  getRoleList,
  hideRoleEditModal,
  tableReset,
  setRoleEditModal
}) {
  const [loading, setLoading] = useState(false)

  const RoleAddEdit = async (data) => {
    setLoading(true)
    try {
      let bodyData = {
        description: data.description,
        role: data.roleName
      }
      const response = rowData?.id
        ? await AdminManageRoleService.UpdateChannelService(
            rowData?.id,
            bodyData
          )
        : await AdminManageRoleService.addChannelService(bodyData)
      if (response?.success) {
        modalNotification({
          type: 'success',
          message: response?.message
        })
        getRoleList()
        tableReset()
        setRoleEditModal(false)
      }
    } catch (error) {
      logger(error)
      setRoleEditModal(false)
    }
    setLoading(false)
  }

  return (
    <>
      <ManageRoleForm
        onSubmit={RoleAddEdit}
        loading={loading}
        rowData={rowData}
        hideRoleEditModal={hideRoleEditModal}
      />
    </>
  )
}

export default AddEditManageRole
