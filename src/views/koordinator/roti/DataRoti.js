import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
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
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CFormInput,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilSearch, cilBurger } from '@coreui/icons'
import { Link } from 'react-router-dom'

const KelolaDataDataRoti = () => {
  const [searchText, setSearchText] = useState('') //State untuk seatch
  const [dataRoti, setDataRoti] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const itemsPerPageOptions = [10, 25, 50, dataRoti.length] // Jumlah data per halaman

  useEffect(() => {
    // Menggunakan Axios untuk mengambil data dari API
    axios
      .get('http://localhost:8000/api/koordinator/dataroti')
      .then((response) => {
        console.log(response.data)
        setDataRoti(response.data)
      })
      .catch((error) => {
        // Handle error jika terjadi kesalahan saat mengambil data dari API
        console.error('Error fetching data:', error)
      })
  }, [])

  function handleEdit(data) {
    localStorage.setItem(
      'lsDataRoti',
      JSON.stringify({
        kode_roti: data.kode_roti,
        nama_roti: data.nama_roti,
        stok_roti: data.stok_roti,
        rasa_roti: data.rasa_roti,
        harga_satuan_roti: data.harga_satuan_roti,
      }),
    )
    navigate('/roti/update')
  }

  const handleDelete = (data) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${data.kode_roti}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/koordinator/dataroti/delete/${data.kode_roti}`)
          .then((response) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            window.location.href = '/roti'
          })
          .catch((error) => {
            console.error('Error deleting data:', error)
          })
      }
    })
  }

  const searchableFields = ['kode_roti', 'nama_roti', 'stok_roti', 'rasa_roti', 'harga_satuan_roti']

  const filteredData = dataRoti.filter((roti) => {
    return (
      searchText === '' ||
      searchableFields.some((field) => {
        const fieldValue = roti[field]

        // Check if the field value is a string before applying toLowerCase()
        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(searchText.toLowerCase())
        )
      })
    )
  })

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = itemsPerPage === dataRoti.length ? dataRoti.length : startIndex + itemsPerPage
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
            <CCardHeader>Data Roti</CCardHeader>
            <CCardBody>
              <CForm className="mb-3">
                <CRow>
                  <CCol md={6} xs={8}>
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
                  <CCol md={2} xs={4}>
                    <Link to="/roti/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilBurger} className="mx-8 me-2" />
                        Tambah Roti
                      </CButton>
                    </Link>
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
                          {option === dataRoti.length ? 'All' : option}
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
                    <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                    <CTableHeaderCell>Stok Roti</CTableHeaderCell>
                    <CTableHeaderCell>Rasa Roti</CTableHeaderCell>
                    <CTableHeaderCell>Harga Satuan</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((user, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                        <CTableDataCell>{user.nama_roti}</CTableDataCell>
                        <CTableDataCell>{user.stok_roti}</CTableDataCell>
                        <CTableDataCell>{user.rasa_roti}</CTableDataCell>
                        <CTableDataCell>{user.harga_satuan_roti}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title="Edit Data Roti"
                              onClick={() => handleEdit(user)}
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data Roti"
                              onClick={() => handleDelete(user)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CCol>
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
    </div>
  )
}

export default KelolaDataDataRoti
