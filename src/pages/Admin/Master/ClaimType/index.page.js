import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  actionFormatter,
  Breadcrumb,
  DataTable,
  ListingHeader,
  ModalComponent,
  PageHeader,
  SweetAlert,
  statusFormatter,
  ClaimTypeForm,
  serialNumberFormatter,
  MasterFilter
} from '../../../../components'
import {
  checkValidData,
  decodeQueryData,
  firstLetterCaps,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam
} from '../../../../utils'
import adminRouteMap from '../../../../routeControl/adminRouteMap'
import { AdminMasterServices } from '../../../../services'

function ClaimType() {
  const [editClaimTypeModel, setEditClaimTypeModel] = useState(false)
  const [claimTypeModel, setClaimTypeModel] = useState('')
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [sizePerPage, setSizePerPage] = useState(10)
  const [claimData, setClaimData] = useState([])
  const [page, setPage] = useState(1)
  const [filterData, setFilterData] = useState({})
  const [claimName, setClaimName] = useState()
  const [claimId, setClaimId] = useState()
  const location = useLocation()
  const { pathname, search } = location
  const [tableLoader, setTableLoader] = useState(false)
  const [noOfPage, setNoOfPage] = useState()
  const [searchName, setSearchName] = useState()
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [param, setParam] = useState({})
  const navigate = useNavigate()
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: '',
      order: ''
    }
  ])
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: 'DASHBOARD'
    },
    {
      path: '#',
      name: 'Claim Type'
    }
  ]
  const arrayOfData = [
    {
      id: 'active',
      name: 'Active'
    },
    {
      id: 'inactive',
      name: 'Inactive'
    }
  ]
  const showClaimTypeModal = () => {
    setClaimTypeModel('add')
    setEditClaimTypeModel(true)
  }

  const hideClaimEditModal = () => {
    setEditClaimTypeModel(false)
  }
  const getClaimData = async () => {
    setTableLoader(true)
    setClaimData([])
    let queryParams = {
      offset: (page - 1) * sizePerPage,
      limit: sizePerPage,
      sortBy: param?.sortBy,
      sortType: param?.sortType,
      search: searchName,
      ...filterData
    }
    const response = await AdminMasterServices.getClaimType(queryParams)
    if (response?.success && response?.data) {
      setClaimData(response?.data.rows)
      setNoOfPage(
        response?.data?.count > 0
          ? Math.ceil(response?.data?.count / sizePerPage)
          : 1
      )
      setTotalCount(response?.data?.count)
    }
    setTableLoader(false)
  }
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
  useEffect(() => {
    if (search && JSON.stringify(param) !== '{}') {
      getClaimData()
    }
  }, [param])

  useEffect(() => {
    if (!search) {
      getClaimData()
    }
  }, [])
  const tableReset = () => {
    setClaimData([])
    setNoOfPage(0)
    setTotalCount(0)
  }
  const onSubmit = async (formData) => {
    setLoading(true)
    const bodyData = { name: formData.claimType }
    const response =
      claimTypeModel === 'add'
        ? await AdminMasterServices.addCalimType(bodyData)
        : await AdminMasterServices.editCalimType(bodyData, claimId)
    if (response?.success) {
      setEditClaimTypeModel(false)
      modalNotification({ type: 'success', message: response?.message })
      getClaimData()
      tableReset()
    }
    setLoading(false)
  }
  const changeState = () => {
    setIsAlertVisible(false)
  }
  const onConfirmAlert = async () => {
    const response = await AdminMasterServices.deleteCalimType(claimId)
    if (response?.success) {
      modalNotification({ type: 'success', message: response?.message })
      tableReset()
      getClaimData()
      changeState()
    }
  }
  const options = (row) => {
    const optionsArr = [
      {
        name: t('text.common.edit'),
        icon: 'icon ni ni-edit',
        action: 'confirm',
        onClickHandle: () => {
          setClaimTypeModel('update')
          setClaimName(row?.name)
          setClaimId(row?.id)
          setEditClaimTypeModel(true)
        }
      },
      {
        name: t('text.common.delete'),
        icon: 'icon ni ni-trash',
        action: 'confirm',
        onClickHandle: () => {
          setClaimId(row?.id)
          setIsAlertVisible(true)
        }
      }
    ]
    return optionsArr
  }
  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === 'asc' ? 'sorting_asc' : 'sorting_desc'
  }

  const onSortColumn = (field, order) => {
    const data = { ...param }
    data.sortBy = field
    data.sortType = order === 'asc' ? 'ASC' : 'DESC'
    navigateWithParam(data, navigate, pathname)
    tableReset()
  }
  const columns = [
    {
      dataField: 'id',
      text: t('text.common.sno'),
      headerClasses: 'w_70',
      formatter: (cell, row, index) =>
        serialNumberFormatter(page, sizePerPage, index)
    },
    {
      dataField: 'name',
      text: t('text.common.type'),
      sort: true,
      headerClasses: 'sorting',
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order)
      },
      formatter: (cell) => checkValidData(firstLetterCaps(cell))
    },
    {
      dataField: 'status',
      text: t('text.common.status'),
      formatter: statusFormatter
    },
    {
      dataField: 'action',
      text: t('text.common.action'),
      headerClasses: 'nk-tb-col-tools text-end',
      formatter: (cell, row) => actionFormatter(options(row))
    }
  ]

  const handleFilterSubmit = (val) => {
    try {
      setFilterData(val)
      tableReset()
      const newParams = { ...param }
      newParams.page = 1
      navigateWithParam(newParams, navigate, pathname)
      setVisible(false)
    } catch (error) {
      logger(error)
    }
  }
  const getSearchValue = (val) => {
    setSearchName(val)
    if (val) {
      tableReset()
    }
  }
  const onReset = () => {
    setFilterData({})
    tableReset()
    setVisible(false)
    const newParams = { ...param }
    newParams.page = 1
    navigateWithParam(newParams, navigate, pathname)
  }

  useEffect(() => {
    getClaimData()
  }, [])
  return (
    <>
      <div className='nk-block-head nk-block-head-sm'>
        <div className='nk-block-between'>
          <PageHeader heading='Claim Type'>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={['create', 'filter']}
            btnText={t('text.master.addClaim')}
            visible={visible}
            setVisible={setVisible}
            onHandleShow={showClaimTypeModal}
            popover={
              <MasterFilter
                onSubmit={handleFilterSubmit}
                tableLoader={tableLoader}
                onReset={onReset}
                arrayOfData={arrayOfData}
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
        tableData={claimData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerPage}
        selectRow={false}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t('text.master.searchByClaimType')}
      />
      <ModalComponent
        backdrop
        show={editClaimTypeModel}
        onHandleCancel={hideClaimEditModal}
        title={
          claimTypeModel === 'add'
            ? `${t('text.master.addClaimType')}`
            : `${t('text.master.editClaimType')}`
        }
      >
        <ClaimTypeForm
          claimTypeModel={claimTypeModel}
          hideClaimEditModal={hideClaimEditModal}
          onSubmit={onSubmit}
          loading={loading}
          claimName={claimName}
        />
      </ModalComponent>
      <SweetAlert
        title={t('text.common.areYouSure')}
        text={t('text.master.youWantToDeleteThisClaim')}
        show={isAlertVisible}
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

export default ClaimType
