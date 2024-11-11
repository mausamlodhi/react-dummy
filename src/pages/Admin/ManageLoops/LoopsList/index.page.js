import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  actionFormatter,
  Breadcrumb,
  capitalizeFirstLetter,
  checkValidCount,
  checkValidData,
  DataTable,
  ListingHeader,
  ManageLoopsFilter,
  nameFormatter,
  PageHeader,
  serialNumberFormatter,
  statusFormatter,
  SweetAlert
} from '../../../../components'
import adminRouteMap from '../../../../routeControl/adminRouteMap'
import {
  dateFormatter,
  decodeQueryData,
  firstLetterCaps,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam
} from '../../../../utils'
import { AdminManageLoopService } from '../../../../services/Admin'
import { DateMonthYearFormate } from '../../../../helpers'

function ManageLoops() {
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [status, setStatus] = useState('active')
  const [isAlertVisibleDelete, setIsAlertVisibleDelete] = useState(false)
  const location = useLocation()
  const [param, setParam] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [filterData, setFilterData] = useState({})
  const [customerData, setCustomerData] = useState([])
  const [noOfPage, setNoOfPage] = useState()
  const [sizePerPage, setSizePerView] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [loopId, setLoopId] = useState()
  const [alertLoader, setAlertLoader] = useState(false)
  const [visible, setVisible] = useState(false)
  const { pathname, search } = location
  const navigate = useNavigate()
  const [searchName, setSearchName] = useState('')
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: '',
      order: ''
    }
  ])
  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search)
      setParam(data)
      setPage(data?.page ?? 1)
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

  const getUserList = async () => {
    setLoading(true)
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
        ...filterData
      }
      const { success, data, message } =
        await AdminManageLoopService.getLoopService({
          queryParams
        })
      if (success && data) {
        setCustomerData(data?.rows)
        setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1)
        setTotalCount(data?.count)
      } else {
        modalNotification({
          type: 'error',
          message
        })
      }
    } catch (error) {
      logger(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (search && JSON.stringify(param) !== '{}') {
      getUserList()
    }
  }, [param])

  useEffect(() => {
    if (!search) {
      getUserList()
    }
  }, [])

  const tableReset = () => {
    setLoading(true)
    setCustomerData([])
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

  const { t } = useTranslation()
  const onTypeDeleteConfirmAlert = () => {
    modalNotification({
      type: 'success',
      message: 'Loop Deleted Successfully'
    })
    setIsAlertVisibleDelete(false)
  }
  const options = (row) => {
    const optionsArr = [
      {
        name: t('text.common.view'),
        icon: 'icon ni ni-eye',
        action: 'redirect',
        path: `${adminRouteMap.LOOPS_DETAILS.path}/${row?.id}`
      }
    ]
    if (row.status === 'active') {
      optionsArr.push({
        name: t('text.common.deActivate'),
        icon: 'icon ni ni-cross-circle',
        action: 'confirm',
        onClickHandle: () => {
          setIsAlertVisible(true)
          setLoopId(row?.id)
          setStatus('inactive')
          document.body.click()
        }
      })
    }
    if (row.status === 'inactive') {
      optionsArr.push({
        name: t('text.common.activate'),
        icon: 'icon ni ni-check-circle',
        action: 'confirm',
        onClickHandle: () => {
          setIsAlertVisible(true)
          setStatus('active')
          setLoopId(row?.id)
          document.body.click()
        }
      })
    }
    return optionsArr
  }

  const onConfirmAlert = async () => {
    try {
      const bodyData = { status }
      const res = await AdminManageLoopService.UpdateStatusLoopService(
        loopId,
        bodyData
      )
      const { success, message } = res
      if (success) {
        modalNotification({
          type: 'success',
          message
        })
        tableReset()
        getUserList()
        setStatus()
        setLoopId()
        setIsAlertVisible()
        // return true;
      } else {
        modalNotification({
          type: 'error',
          message
        })
      }
    } catch (error) {
      logger(error)
    }
    setAlertLoader(false)
  }

  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: t('text.common.dashboard')
    },
    {
      path: '#',
      name: t('text.adminManageLoop.manageLoop')
    }
  ]

  const columns = [
    {
      dataField: 'id',
      text: t('text.common.sno'),
      headerClasses: 'w_70',
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell, row, index) =>
        serialNumberFormatter(page, sizePerPage, index)
    },
    {
      dataField: 'name',
      text: t('text.adminManageLoop.loopName'),
      headerClasses: 'sorting',
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell, row) => checkValidData(firstLetterCaps(row?.name))
    },
    {
      dataField: 'createdBy',
      text: t('text.adminManageLoop.createdBy'),
      headerClasses: 'sorting',
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell, row) =>
        checkValidData(
          nameFormatter(
            capitalizeFirstLetter(row?.user?.firstName),
            capitalizeFirstLetter(row?.user?.lastName)
          )
        )
    },
    {
      dataField: 'createdAt',
      text: t('text.adminManageLoop.createdOn'),
      headerClasses: 'sorting',
      sort: true,
      formatter: (cell, row) =>
        checkValidData(dateFormatter(row?.createdAt, DateMonthYearFormate)),
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order)
      }
    },
    {
      dataField: 'totalMembers',
      text: t('text.adminManageLoop.totalChannel'),
      sort: true,
      headerClasses: 'sorting',
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell, row) => checkValidCount(row?.chatRooms?.length)
    },
    {
      dataField: 'status',
      text: t('text.common.status'),
      formatter: statusFormatter,
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order)
      }
    },
    {
      dataField: 'action',
      text: t('text.common.action'),
      sort: true,
      headerClasses: 'nk-tb-col-tools text-end',
      headerSortingClasses,
      formatter: (cell, row) => actionFormatter(options(row)),
      onSort: (field, order) => {
        onSortColumn(field, order)
      }
    }
  ]

  const onReset = () => {
    setFilterData({})
    tableReset()
    setVisible(false)
    const newParams = { ...param }
    newParams.page = 1
    navigateWithParam(newParams, navigate, pathname)
  }

  const handleFilterSubmit = (val) => {
    setLoading(true)
    try {
      setFilterData(val)
      tableReset()
      const newParams = { ...param }
      newParams.page = 1
      navigateWithParam(newParams, navigate, pathname)
      setVisible(false)
      setLoading(false)
    } catch (error) {
      logger(error)
    }
    setLoading(false)
  }
  return (
    <>
      <div className='nk-block-head nk-block-head-sm'>
        <div className='nk-block-between'>
          <PageHeader heading={t('text.adminManageLoop.manageLoop')}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={['filter']}
            setVisible={setVisible}
            visible={visible}
            popover={
              <ManageLoopsFilter
                onSubmit={handleFilterSubmit}
                loading={loading}
                onReset={onReset}
                filterData={filterData}
                t={t}
              />
            }
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={customerData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        selectRow={false}
        tableLoader={loading}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t('text.adminManageLoop.searchByUser')}
      />
      <SweetAlert
        title={t('text.common.areYouSure')}
        text='you want to delete this Loop?'
        show={isAlertVisibleDelete}
        icon='warning'
        showCancelButton
        confirmButtonText='Yes'
        cancelButtonText='No'
        setIsAlertVisible={setIsAlertVisibleDelete}
        onConfirmAlert={onTypeDeleteConfirmAlert}
      />
      <SweetAlert
        title={t('text.common.areYouSure')}
        text={
          status === 'active'
            ? t('text.adminManageLoop.loopActivated')
            : t('text.adminManageLoop.loopDeactivated')
        }
        show={isAlertVisible}
        showLoaderOnConfirm
        loading={alertLoader}
        icon='warning'
        showCancelButton
        confirmButtonText={t('text.common.yes')}
        cancelButtonText={t('text.common.no')}
        setIsAlertVisible={setIsAlertVisible}
        onConfirmAlert={onConfirmAlert}
      />
    </>
  )
}

export default ManageLoops
