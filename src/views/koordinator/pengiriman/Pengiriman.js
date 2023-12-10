import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroup,
  CFormInput,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormSelect,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { cilCart, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const Pengiriman = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const itemsPerPageOptions = [10, 25, 50, data.length] // Jumlah data per halaman
  const navigate = useNavigate()

  useEffect(() => {
    handleDataTransaksi()
  }, [])

  function handleDataTransaksi() {
    axios
      .get('http://localhost:8000/api/koordinator/transaksi')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  function handleKirim(item) {
    localStorage.setItem(
      'dataTransaksi',
      JSON.stringify({
        kode_lapak: item.kode_lapak,
        nama_lapak: item.nama_lapak,
        nama_kurir: item.kurir.nama,
      }),
    )
    navigate('/pengiriman/kelola/kirim')
  }

  const searchableFields = ['nama_lapak', 'alamat_lapak', 'no_telp', 'kurir.nama', 'kurir.no_telp']

  const filteredData = data.filter((lapak) => {
    return (
      searchText === '' ||
      searchableFields.some((field) => {
        const fieldKeys = field.split('.') // Pisahkan kunci objek bersarang
        const fieldValue = getFieldNestedValue(lapak, fieldKeys)

        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(searchText.toLowerCase())
        )
      })
    )
  })

  // Fungsi untuk mendapatkan nilai dari objek bersarang
  function getFieldNestedValue(obj, keys) {
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = itemsPerPage === data.length ? data.length : startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const handleItemsPerPageChange = (value) => {
    setCurrentPage(1)
    setItemsPerPage(value)
  }

  const startRange = startIndex + 1
  const endRange = Math.min(startIndex + itemsPerPage, filteredData.length)
  const isDataEmpty = filteredData.length === 0

  return (
    <CCard>
      <CCardHeader>Data Pengiriman</CCardHeader>
      <CCardBody>
        <CForm className="mb-3">
          <CRow>
            <CCol md={8} xs={6}>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <CButton variant="outline" className="ms-2">
                  <CIcon icon={cilSearch} />
                </CButton>
              </CInputGroup>
            </CCol>
            <CCol md={2} xs={3}>
              <CFormLabel>Rows Per Page:</CFormLabel>
            </CCol>
            <CCol md={2} xs={3}>
              <CFormSelect
                className="form-select"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === data.length ? 'All' : option}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CForm>
        <CTable striped bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>No</CTableHeaderCell>
              <CTableHeaderCell>Lapak</CTableHeaderCell>
              <CTableHeaderCell>Alamat Lapak</CTableHeaderCell>
              <CTableHeaderCell>No Telp Lapak</CTableHeaderCell>
              <CTableHeaderCell>Kurir</CTableHeaderCell>
              <CTableHeaderCell>No Telp Kurir</CTableHeaderCell>
              <CTableHeaderCell>Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{startRange + index}</CTableDataCell>
                  <CTableDataCell>{item.nama_lapak}</CTableDataCell>
                  <CTableDataCell>{item.alamat_lapak}</CTableDataCell>
                  <CTableDataCell>{item.no_telp}</CTableDataCell>
                  <CTableDataCell>{item.kurir.nama}</CTableDataCell>
                  <CTableDataCell>{item.kurir.no_telp}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      variant="outline"
                      className="ms-2"
                      title="Kirim"
                      onClick={() => handleKirim(item)}
                    >
                      <CIcon icon={cilCart} className="mx-12 me-2" />
                      Kirim
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
        <CRow className="mt-2 mb-2">
          <CCol md={4} xs={8}>
            Total Rows: {filteredData.length} Page: {startRange} of {endRange}
          </CCol>
        </CRow>
        <CPagination
          activepage={currentPage}
          pages={Math.ceil(filteredData.length / itemsPerPage)}
          onActivePageChange={setCurrentPage}
          align="center"
          doublearrows="false"
        >
          <CPaginationItem
            onClick={() => !isDataEmpty && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 || isDataEmpty}
            style={{ cursor: isDataEmpty ? 'default' : 'pointer' }}
          >
            Prev
          </CPaginationItem>

          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => {
            const pageIndex = index + 1
            const totalPages = Math.ceil(filteredData.length / itemsPerPage)

            // Display three consecutive pages centered around the current page
            if (
              (pageIndex >= currentPage - 1 && pageIndex <= currentPage + 1) ||
              totalPages <= 3 ||
              (currentPage === 1 && pageIndex <= 3) ||
              (currentPage === totalPages && pageIndex >= totalPages - 2)
            ) {
              return (
                <CPaginationItem
                  key={pageIndex}
                  active={pageIndex === currentPage}
                  onClick={() => setCurrentPage(pageIndex)}
                  style={{ cursor: 'pointer' }}
                >
                  {pageIndex}
                </CPaginationItem>
              )
            }

            // Display ellipses for pages before the current page
            if (pageIndex === 1 && currentPage > 2) {
              return (
                <CPaginationItem key={pageIndex} disabled style={{ cursor: 'default' }}>
                  ...
                </CPaginationItem>
              )
            }

            // Display ellipses for pages after the current page
            if (pageIndex === totalPages && currentPage < totalPages - 1) {
              return (
                <CPaginationItem key={pageIndex} disabled style={{ cursor: 'default' }}>
                  ...
                </CPaginationItem>
              )
            }

            return null
          })}

          <CPaginationItem
            onClick={() => !isDataEmpty && setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage) || isDataEmpty}
            style={{ cursor: isDataEmpty ? 'default' : 'pointer' }}
          >
            Next
          </CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  )
}

export default Pengiriman
