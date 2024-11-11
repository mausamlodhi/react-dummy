import { React, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DataTable from '../DataTable'
import { SweetAlert, checkValidData, serialNumberFormatter } from '../..'
import { LoopService } from '../../../services'
import { decodeQueryData, logger, modalNotification } from '../../../utils'

function ManageRoles({
  owner,
  setAddRole,
  loopId,
  tableLoader,
  roleListData,
  getRoleListData,
  setRowData,
  permissionId
}) {
  const { t } = useTranslation()
  const location = useLocation()
  const { search } = location

  const [page, setPage] = useState(1)
  const [sizePerPage] = useState(10)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const userActionFormatter = (row) => {
    return (
      <ul className='actionMenu list-unstyled m-0 d-flex align-items-center justify-content-end'>
        <li>
          <Dropdown className='ellipseDrop d-inline-block position-static'>
            <Dropdown.Toggle
              as='a'
              className='d-inline-flex align-items-center'
              id='dropdown-basic'
            >
              <span className='icon-ellipse' />
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu-end'>
              <Link
                className='dropdown-item'
                onClick={(e) => {
                  e.preventDefault()
                  setRowData(row)
                  setAddRole(true)
                }}
                to='#'
              >
                <span className='icon-fill-edit'>
                  <em className='path1' />
                  <em className='path2' />
                </span>
                {t('text.common.edit')}
              </Link>
              {/* <Link
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  setRowData(row);
                  setIsAlertVisible(true);
                }}
                to="#"
              >
                <span className="icon-trash">
                  <em className="path1" />
                  <em className="path2" />
                </span>
                {t("text.common.delete")}
              </Link> */}
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    )
  }

  const Options = ()=>{
    let rolesColumns = [
      {
        dataField: 'id',
        text: t('text.common.serialNo'),
        headerClasses: 'w-10',
        formatter: (cell, row, index) =>
          serialNumberFormatter(page, sizePerPage, index)
      },
      {
        dataField: 'roleName',
        text: t('text.loops.roleName'),
        headerClasses: 'sorting',
        formatter: (cell, row) => checkValidData(row?.channelRole?.role)
      },
    ];
    if(owner){
      rolesColumns.splice(2,1,{
        dataField: 'action',
        text: t('text.common.action'),
        headerClasses: 'text-end',
        formatter: (cell, row) => userActionFormatter(row)
      })
    }
    return rolesColumns
  }

  // let rolesColumns = [
  //   {
  //     dataField: 'id',
  //     text: t('text.common.serialNo'),
  //     headerClasses: 'w-10',
  //     formatter: (cell, row, index) =>
  //       serialNumberFormatter(page, sizePerPage, index)
  //   },
  //   {
  //     dataField: 'roleName',
  //     text: t('text.loops.roleName'),
  //     headerClasses: 'sorting',
  //     formatter: (cell, row) => checkValidData(row?.channelRole?.role)
  //   },
  // ];

  const onConfirmAlert = async () => {
    setLoading(true)
    try {
      const res = await LoopService.deleteRoleService(loopId, permissionId)
      if (res?.success) {
        modalNotification({
          type: 'success',
          message: res?.message
        })
        setRowData('')
        getRoleListData(loopId)
      }
    } catch (error) {
      logger(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search)
      // setParam(data);
      setPage(data?.page ?? 1)
      // setSearchName(data?.name ?? "");
      // if (data?.sortType) {
      //   const sortData = [
      //     {
      //       order: getSortType(data?.sortType),
      //       dataField: data?.sortBy,
      //     },
      //   ];
      //   setDefaultSort(sortData);
      // } else {
      //   setDefaultSort({
      //     dataField: "",
      //     order: "",
      //   });
      // }
    }
  }, [location])

  useEffect(() => {
    getRoleListData(loopId);
  }, [])
  return (
    <>
      <div className='userDataTable'>
        <DataTable
          isCard={false}
          header={false}
          pagination={false}
          userTable
          hasLimit
          noOfPage='1'
          sizePerPage='10'
          page='1'
          count='100'
          tableData={roleListData}
          tableColumns={Options("id")}
          // param={param}
          // defaultSort={defaultSort}
          setSizePerPage=''
          tableLoader={tableLoader}
          // tableReset={tableReset}
          // getSearchValue={getSearchValue}
          // searchPlaceholder={t("text.search.ManageSubscription")}
        />
      </div>

      <SweetAlert
        reverseButtons
        title={t('text.common.delete')}
        text={t('text.loops.areYouSureDeleteLoop')}
        show={isAlertVisible}
        icon='warning'
        showCancelButton
        cancelButtonText={t('text.common.no')}
        confirmButtonText={t('text.common.yes')}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        loading={loading}
        onConfirmAlert={onConfirmAlert}
      />
    </>
  )
}

export default ManageRoles
