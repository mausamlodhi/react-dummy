import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  checkValidData,
  decodeQueryData,
  firstLetterCaps,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow
} from '../../../utils'
import adminRouteMap from '../../../routeControl/adminRouteMap'
import {
  Breadcrumb,
  DataTable,
  ListingHeader,
  ModalComponent,
  PageHeader,
  SweetAlert,
  actionFormatter,
  serialNumberFormatter,
  statusFormatter
} from '../../../components'
import { AdminManageRoleService } from '../../../services/Admin'
import { AddEditManageRole } from '..'

function ManageRoles() {
  const [isAlertVisibleDelete, setIsAlertVisibleDelete] = useState(false)
  const [roleModalType, setRoleModalType] = useState('')
  const [roleEditModal, setRoleEditModal] = useState(false)
  const [readData, setReadData] = useState()
  const location = useLocation()
  const [showReadMore, setShowReadMore] = useState(false)
  const { t } = useTranslation()
  const [param, setParam] = useState({})
  const [page, setPage] = useState(1)
  // const [filterData, setFilterData] = useState({});
  const [roleData, setRoleData] = useState([])
  const [noOfPage, setNoOfPage] = useState()
  const [sizePerPage, setSizePerView] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [rowData, setRowData] = useState({})
  const { pathname, search } = location
  const [tableLoader, setTableLoader] = useState(false)
  const navigate = useNavigate()
  const [searchName, setSearchName] = useState('')
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: '',
      order: ''
    }
  ])
  // const formRef = useRef(null);
  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search)
      setParam(data)
      setPage(data?.page ?? 1)
      // setSearchName(data?.name ?? "");
      if (data?.sortType) {
        const sortData = [
          {
            order: getSortType(data?.sortType),
            dataField: data?.sortBy
          }
        ]
        setDefaultSort(sortData)
      } else {
        setDefaultSort({
          dataField: '',
          order: ''
        })
      }
    }
  }, [location])

  const getRoleList = async () => {
    setTableLoader(true)
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName
      }
      const response = await AdminManageRoleService.getChannelService({
        queryParams
      })

      if (response?.success) {
        setRoleData(response?.data?.rows)
        setNoOfPage(
          response?.data?.count > 0
            ? Math.ceil(response?.data?.count / sizePerPage)
            : 1
        )
        setTotalCount(response?.data?.count)
      } else {
        modalNotification({
          type: 'error',
          message: response.message
        })
      }
    } catch (error) {
      logger(error)
    }
    setTableLoader(false)
  }

  useEffect(() => {
    if (search && JSON.stringify(param) !== '{}') {
      getRoleList()
    }
  }, [param])

  useEffect(() => {
    if (!search) {
      getRoleList()
    }
  }, [])

  const tableReset = () => {
    setTableLoader(true)
    setRoleData([])
    setNoOfPage(0)
    setTotalCount(0)
  }

  const getSearchValue = (val) => {
    setSearchName(val)
    if (val) {
      tableReset()
    }
  }

  const onSortColumn = (field, order) => {
    const data = { ...param }
    data.sortBy = field
    data.sortType = order === 'asc' ? 'ASC' : 'DESC'
    navigateWithParam(data, navigate, pathname)
    tableReset()
  }

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === 'asc' ? 'sorting_asc' : 'sorting_desc'
  }

  const onTypeDeleteConfirmAlert = () => {
    modalNotification({
      type: 'success',
      message: 'Roles Deleted Successfully'
    })
    setIsAlertVisibleDelete(false)
  }
  const showMoreText = (data) => {
    setShowReadMore(true)
    setReadData(data.data)
  }
  const onCloseDescriptionModal = () => {
    setShowReadMore(false)
    setReadData('')
  }
  const showRoleEditModal = () => {
    setRoleModalType('edit')
    setRoleEditModal(true)
  }
  const options = (row) => {
    const optionsArr =
      row?.isDefault === 0
        ? [
            {
              name: 'Edit',
              icon: 'icon ni ni-edit',
              action: 'confirm',
              onClickHandle: () => {
                showRoleEditModal(true)
                setRowData(row)
                document.body.click()
              }
            }
          ]
        : []
    return optionsArr
  }

  const showRoleAddModal = () => {
    setRoleModalType('add')
    setRowData({})
    setRoleEditModal(true)
  }

  const hideRoleEditModal = () => {
    setRoleEditModal(false)
  }

  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t('text.common.dashboard')
    },
    {
      path: '#',
      name: t('text.adminManageRoles.manageRoles')
    }
  ]

  const columns = [
    {
      dataField: 'id',
      text: t('text.common.sno'),
      headerClasses: 'w_70',
      headerSortingClasses,
      sort: true,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell, row, index) =>
        serialNumberFormatter(page, sizePerPage, index)
    },
    {
      dataField: 'role',
      text: t('text.adminManageRoles.roleName'),
      headerClasses: 'sorting',
      headerSortingClasses,
      sort: true,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell) => checkValidData(firstLetterCaps(cell))
    },
    {
      dataField: 'description',
      text: t('text.adminManageRoles.description'),
      headerClasses: 'sorting',
      formatter: (cell) =>
        checkValidData(readMoreTextShow(cell, showMoreText, 'text-info')),
      headerSortingClasses,
      sort: true,
      onSort: (field, order) => {
        onSortColumn(field, order)
      }
    },
    {
      dataField: 'status',
      text: t('text.common.status'),
      headerClasses: 'sorting',
      formatter: statusFormatter,
      headerSortingClasses,
      sort: true,
      onSort: (field, order) => {
        onSortColumn(field, order)
      }
    },
    {
      dataField: 'action',
      text: t('text.common.action'),
      headerClasses: 'nk-tb-col-tools text-end',
      headerSortingClasses,
      sort: true,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell, row) =>
        row?.isDefault === 0 ? actionFormatter(options(row)) : ''
    }
  ]

  return (
    <>
      <div className='nk-block-head nk-block-head-sm'>
        <div className='nk-block-between'>
          <PageHeader heading={t('text.adminManageRoles.manageRoles')}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={['create']}
            btnText={t('text.adminManageRoles.addRoles')}
            onHandleShow={showRoleAddModal}
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={roleData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        selectRow={false}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t('text.adminManageRoles.searchBy')}
      />
      <ModalComponent
        size='md'
        backdrop
        show={roleEditModal}
        onHandleCancel={hideRoleEditModal}
        title={
          roleModalType === 'add'
            ? t('text.adminManageRoles.addRoles')
            : t('text.adminManageRoles.editRole')
        }
      >
        <AddEditManageRole
          hideRoleEditModal={hideRoleEditModal}
          rowData={rowData}
          getRoleList={getRoleList}
          tableReset={tableReset}
          setRoleEditModal={setRoleEditModal}
        />
      </ModalComponent>
      <ModalComponent
        backdrop
        modalExtraClass='zoom'
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title={t('text.adminManageRoles.description')}
      >
        <p className='text-break'>{readData}</p>
      </ModalComponent>
      <SweetAlert
        title={t('text.common.areYouSure')}
        text={t('text.adminManageRoles.youWantToDelete')}
        show={isAlertVisibleDelete}
        icon='warning'
        showCancelButton
        confirmButtonText={t('text.common.yes')}
        cancelButtonText={t('text.common.no')}
        setIsAlertVisible={setIsAlertVisibleDelete}
        onConfirmAlert={onTypeDeleteConfirmAlert}
      />
    </>
  )
}

export default ManageRoles
