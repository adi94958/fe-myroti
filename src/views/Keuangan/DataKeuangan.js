import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
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
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilUserPlus, cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom'

const DataKeuangan = () => {
  const [searchText, setSearchText] = useState('')
  const [dataLapak, setDataLapak] = useState([])
  const [dataKurir, setDataKurir] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    axios
      .get('http://localhost:8000/api/keuangan/kurir')
      .then((response) => {
        console.log(response.data)
        setDataKurir(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  const filteredData = dataKurir.filter((Kurir) => {
    const kurirName = Kurir?.nama?.toString()?.toLowerCase() || ''

    const nameMatch = kurirName.includes(searchText.toLowerCase())

    return nameMatch
  })
  const handleTransaksiClick = (lapak) => {
    setDataLapak(lapak)
    console.log(lapak)
    setVisible(true)
  }

  return (
    <>
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
                    <CCol md={4} xs={6} className="d-flex justify-content-end">
                      <CBadge
                        color="white"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: 'black',
                          fontSize: '20px',
                        }}
                      >
                        Tanggal: {new Date().toLocaleDateString()}
                      </CBadge>
                    </CCol>
                  </CRow>
                </CForm>
                <CTable striped bordered responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Kurir</CTableHeaderCell>
                      <CTableHeaderCell>Data Transaksi</CTableHeaderCell>
                      <CTableHeaderCell>Penghasilan</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredData.map((kurir, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{kurir.nama}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            variant="outline"
                            size="sm"
                            className="ms-2"
                            title="Daftar Roti"
                            onClick={() => handleTransaksiClick(kurir.transaksi)}
                          >
                            <CIcon icon={cilSearch} className="mx-12 me-2" />
                            Open Detail
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                          {kurir && kurir.penghasilan && kurir.penghasilan.length > 0
                            ? kurir.penghasilan[0].penghasilan
                            : 'Belum ada transaksi'}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        {visible && (
          <CModal
            alignment="center"
            visible={visible}
            className="modal"
            onClose={() => setVisible(false)}
            aria-labelledby="VerticallyCenteredExample"
          >
            <CModalHeader>
              <CModalTitle id="VerticallyCenteredExample">Data lapak</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CTable striped bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                    <CTableHeaderCell>Jumlah Uang Setoran</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataLapak.length > 0 ? (
                    dataLapak.map((lapak, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          {lapak
                            ? lapak.lapak
                              ? lapak.lapak.nama_lapak
                              : 'Belum ada transaksi'
                            : 'Belum ada transaksi'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {lapak && lapak.data_penjualan
                            ? lapak.data_penjualan.uang_setoran
                            : 'Belum ada transaksi'}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="2" style={{ textAlign: 'center' }}>
                        Belum ada transaksi yang selesai
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        )}
      </div>
    </>
  )
}

export default DataKeuangan
