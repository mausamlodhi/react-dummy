import React, { useState, useEffect } from 'react'
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
  CategoryTypeForm,
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

function Category() {
  const [categoryEditModal, setCategoryEditModal] = useState(false)
  const [categoryModal, setCategoryModal] = useState('')
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [sizePerPage, setSizePerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [categoryId, setCategoryId] = useState()
  const [category, setCategory] = useState()
  const [tableLoader, setTableLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noOfPage, setNoOfPage] = useState()
  const [totalCount, setTotalCount] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const [param, setParam] = useState({})
  const [searchName, setSearchName] = useState()
  const [filterData, setFilterData] = useState({})
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname, search } = location
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
      name: 'Category'
    }
  ]
  const showCategoryAddModal = () => {
    setCategoryModal('add')
    setCategoryEditModal(true)
  }
  const showCategoryEditModal = () => {
    setCategoryModal('edit')
    setCategoryEditModal(true)
  }
  const hideCategoryEditModal = () => {
    setCategoryEditModal(false)
  }
  const getCategoryList = async () => {
    setTableLoader(true)
    let queryParams = {
      offset: (page - 1) * sizePerPage,
      limit: sizePerPage,
      sortBy: param?.sortBy,
      sortType: param?.sortType,
      search: searchName,
      ...filterData
    }
    const response = await AdminMasterServices.getCategoryList(queryParams)
    if (response?.success) {
      setCategoryList(response?.data.rows)
      setNoOfPage(
        response?.data?.count > 0
          ? Math.ceil(response?.data?.count / sizePerPage)
          : 1
      )
      setTotalCount(response?.data?.count)
    }
    setTableLoader(false)
  }
  const tableReset = () => {
    setCategoryList([])
    setNoOfPage(0)
    setTotalCount(0)
  }
  const onSubmit = async (formData) => {
    setLoading(true)
    const bodyData = { name: formData?.category }
    const response =
      categoryModal === 'add'
        ? await AdminMasterServices.createCategory(bodyData)
        : await AdminMasterServices.updateCategory(bodyData, categoryId)
    if (response?.success) {
      setCategoryEditModal(false)
      modalNotification({ type: 'success', message: response?.message })
      getCategoryList()
      tableReset()
    }
    setLoading(false)
  }
  const onConfirmAlert = async () => {
    const response = await AdminMasterServices.deleteCategory(categoryId)
    if (response?.success) {
      modalNotification({ type: 'success', message: response.message })
      tableReset()
      getCategoryList()
      setIsAlertVisible(false)
    }
  }
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
  const options = (row) => {
    const optionsArr = [
      {
        name: t('text.common.edit'),
        icon: 'icon ni ni-edit',
        action: 'confirm',
        onClickHandle: () => {
          showCategoryEditModal()
          setCategoryId(row?.id)
          setCategory(row?.name)
          setCategoryEditModal(true)
        }
      },
      {
        name: t('text.common.delete'),
        icon: 'icon ni ni-trash',
        action: 'confirm',
        onClickHandle: () => {
          setCategoryId(row?.id)
          setIsAlertVisible(true)
        }
      }
    ]
    return optionsArr
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
      headerClasses: 'sorting',
      sort: true,
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
  const onReset = () => {
    setFilterData({})
    tableReset()
    setVisible(false)
    const newParams = { ...param }
    newParams.page = 1
    navigateWithParam(newParams, navigate, pathname)
  }
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
  useEffect(() => {
    if (search && JSON.stringify(param) !== '{}') {
      getCategoryList()
    }
  }, [param])

  useEffect(() => {
    if (!search) {
      getCategoryList()
    }
  }, [])

  useEffect(() => {
    getCategoryList()
  }, [])
  return (
    <>
      <div className='nk-block-head nk-block-head-sm'>
        <div className='nk-block-between'>
          <PageHeader heading='Category Type'>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={['create', 'filter']}
            btnText='Add Category'
            visible={visible}
            setVisible={setVisible}
            onHandleShow={showCategoryAddModal}
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
        tableData={categoryList}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerPage}
        selectRow={false}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t('text.master.searchByCategoryType')}
      />
      <ModalComponent
        backdrop
        show={categoryEditModal}
        onHandleCancel={hideCategoryEditModal}
        title={
          categoryModal === 'add'
            ? `${t('text.master.addCategoryType')}`
            : `${t('text.master.editCategoryType')}`
        }
      >
        <CategoryTypeForm
          categoryModal={categoryModal}
          category={category}
          loading={loading}
          hideCategoryEditModal={hideCategoryEditModal}
          onSubmit={onSubmit}
        />
      </ModalComponent>
      <SweetAlert
        title={t('text.common.areYouSure')}
        text={t('text.master.youWantToDeleteThisCategory')}
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

export default Category
