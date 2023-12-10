import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CInputGroup,
  CFormLabel,
  CFormSelect,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const DataPengiriman = () => {
  const [searchText, setSearchText] = useState('')
  const [dataRoti, setDataRoti] = useState([])
  const [visible, setVisible] = useState(false)
  const [idKurir, setKurirId] = useState('')
  const [dataPenjualan, setDataPenjualan] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const itemsPerPageOptions = [10, 25, 50, dataPenjualan.length] // Jumlah data per halaman

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    setKurirId(infoLogin.id)
    handlePenjualan()
  }, [])

  const handlePenjualan = () => {
    axios
      .get('http://localhost:8000/api/kurir/datapenjualan')
      .then((response) => {
        setDataPenjualan(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const filteredData = dataPenjualan.filter((lapak) => {
    const lapakName = lapak?.nama_lapak?.toString()?.toLowerCase() || ''
    const lapakNameMatch = lapakName.includes(searchText.toLowerCase())
    const isStatus = lapak?.status == 'finished'
    const isKurirMatch = lapak?.id_kurir === idKurir
    return isStatus && isKurirMatch && lapakNameMatch
  })

  const handleRotiClick = async (lapak) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/kurir/riwayat-transaksi/${lapak.id_transaksi}`,
      )
      if (response.status >= 200 && response.status < 300) {
        const data = response.data
        setDataRoti(data.detail_roti)
        setVisible(true)
      } else {
        throw new Error('Gagal mengambil data roti')
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex =
    itemsPerPage === dataPenjualan.length ? dataPenjualan.length : startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const handleItemsPerPageChange = (value) => {
    setCurrentPage(1)
    setItemsPerPage(value)
  }

  const startRange = startIndex + 1
  const endRange = Math.min(startIndex + itemsPerPage, filteredData.length)
  const isDataEmpty = filteredData.length === 0

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Data Pengiriman Kurir</CCardHeader>
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
                          {option === dataPenjualan.length ? 'All' : option}
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
                    <CTableHeaderCell>Tanggal Pengambilan</CTableHeaderCell>
                    <CTableHeaderCell>Roti</CTableHeaderCell>
                    <CTableHeaderCell>Uang Setoran</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
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
                    paginatedData.map((lapak, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                        <CTableDataCell>{lapak.nama_lapak}</CTableDataCell>
                        <CTableDataCell>{lapak.alamat_lapak}</CTableDataCell>
                        <CTableDataCell>{lapak.tanggal_pengambilan}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            variant="outline"
                            className="ms-2"
                            title="Daftar Roti"
                            onClick={() => handleRotiClick(lapak)}
                          >
                            <CIcon icon={cilSearch} className="mx-12 me-2" />
                            Open Detail
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell>{lapak.uang_setoran}</CTableDataCell>
                        <CTableDataCell>
                          {lapak.status === 'finished' ? (
                            <span style={{ color: 'green' }}> {lapak.status} </span>
                          ) : (
                            <span>{lapak.status}</span>
                          )}
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

                {Array.from(
                  { length: Math.ceil(filteredData.length / itemsPerPage) },
                  (_, index) => {
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
                  },
                )}

                <CPaginationItem
                  onClick={() => !isDataEmpty && setCurrentPage(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(filteredData.length / itemsPerPage) || isDataEmpty
                  }
                  style={{ cursor: isDataEmpty ? 'default' : 'pointer' }}
                >
                  Next
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        backdrop="static"
        visible={visible}
        className="modal"
        onClose={() => {
          setVisible(false)
        }}
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Data Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti Basi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataRoti.map((roti, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{roti.nama_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti_basi}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default DataPengiriman
