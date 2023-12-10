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
  CFormInput,
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilSearch, cilUserPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'

const KelolaDataPemilik = () => {
  const [searchText, setSearchText] = useState('')
  const [dataPemilik, setDataPemilik] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/pemilik')
      .then((response) => {
        console.log(response.data)
        setDataPemilik(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  function handleEdit(data) {
    localStorage.setItem(
      'lsDataPemilik',
      JSON.stringify({
        id: data.id_pemilik,
        nama: data.nama,
        username: data.username,
        password: data.password,
      }),
    )
    navigate('/admin/pemilik/update')
  }

  const handleDelete = (data) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${data.nama}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/pemilik/delete/${data.id_pemilik}`)
          .then((response) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            window.location.href = '/admin/pemilik'
          })
          .catch((error) => {
            console.error('Error deleting data:', error)
          })
      }
    })
  }

  const filteredData = dataPemilik.filter((akun) => {
    const nama = akun.nama.toString().toLowerCase()
    const username = akun.username.toString().toLowerCase()
    const password = akun.password.toString().toLowerCase()

    return (
      searchText === '' ||
      nama.includes(searchText.toLowerCase()) ||
      username.includes(searchText.toLowerCase()) ||
      password.includes(searchText.toLowerCase())
    )
  })

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Data Pemilik</CCardHeader>
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
                  <CCol md={4} xs={6} className="text-end">
                    <Link to="/admin/pemilik/tambah">
                      <CButton variant="outline">
                        <CIcon icon={cilUserPlus} className="mx-2" />
                        Tambah Akun Pemilik
                      </CButton>
                    </Link>
                  </CCol>
                </CRow>
              </CForm>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Nama</CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Password</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((akun, index) => (
                      <CTableRow key={akun.id}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{akun.nama}</CTableDataCell>
                        <CTableDataCell>{akun.username}</CTableDataCell>
                        <CTableDataCell>{akun.password}</CTableDataCell>
                        <CTableDataCell>
                          <CCol>
                            <CButton
                              color="primary"
                              variant="outline"
                              className="ms-2"
                              title="Edit Data Roti"
                              onClick={() => handleEdit(akun)}
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                            <CButton
                              color="danger"
                              variant="outline"
                              className="ms-2"
                              title="Hapus Data Roti"
                              onClick={() => handleDelete(akun)}
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default KelolaDataPemilik
