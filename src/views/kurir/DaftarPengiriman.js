import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
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
  CForm,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CSpinner,
  CFormTextarea,
  CInputGroup,
  CRow,
  CCol,
  CPagination,
  CPaginationItem,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import { cilPen, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const DaftarPengiriman = () => {
  const navigate = useNavigate()
  const [modalRoti, setModalRoti] = useState(false)
  const [roti, setRoti] = useState([])
  const [modalRotiBasi, setModalRotiBasi] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRotiDipilih, setDataRotiDipilih] = useState([])
  const [searchText, setSearchText] = useState('')
  const [formData, setFormData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [dataTransaksi, setDataTransaksi] = useState([])
  const [catatanNtotalHarga, setCatatanNtotalHarga] = useState([])
  const itemsPerPageOptions = [10, 25, 50, dataTransaksi.length] // Jumlah data per halaman

  const [idKurir, setKurirId] = useState('')
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Get infoLogin from localStorage
      const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))

      setKurirId(infoLogin.id)

      const response = await axios.get('http://localhost:8000/api/kurir/transaksi')

      setDataTransaksi(response.data)

      const initCatatanNtotalHarga = response.data.map((transaksi) => ({
        id_transaksi: transaksi.id_transaksi,
        catatan_penjual: '',
        total_dengan_rotibasi: 0,
      }))
      setCatatanNtotalHarga(initCatatanNtotalHarga)

      response.data.map((transaksi) => {
        const initRoti = transaksi.transaksi_roti.map((roti) => ({
          id_transaksi: roti.id_transaksi,
          kode_roti: roti.roti.kode_roti,
          harga_satuan_roti: roti.roti.harga_satuan_roti,
          jumlah_roti: 0,
          jumlah_roti_dikirim: roti.jumlah_roti,
        }))
        setFormData(initRoti)
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  function handleModalRoti(lapak) {
    setModalRoti(true)
    setDataRotiDipilih(lapak.transaksi_roti)
  }

  function handleModalRotiBasi(lapak) {
    setModalRotiBasi(true)
    setDataRotiDipilih(lapak.transaksi_roti)
  }

  const [dataDenganTotalHarga, setDataDenganTotalHarga] = useState([])
  useEffect(() => {
    const newDataDenganTotalHarga = dataTransaksi.map((item) => {
      const totalHargaRoti = item.transaksi_roti.reduce((total, roti) => {
        return total + roti.jumlah_roti * roti.roti.harga_satuan_roti
      }, 0)
      return {
        ...item,
        totalHargaRoti: totalHargaRoti,
      }
    })
    setDataDenganTotalHarga(newDataDenganTotalHarga)
  }, [dataTransaksi])

  const filteredData = dataDenganTotalHarga.filter((lapak) => {
    const lapakName = lapak?.lapak.nama_lapak?.toString()?.toLowerCase() || ''
    const lapakNameMatch = lapakName.includes(searchText.toLowerCase())
    const isStatus = lapak?.status == 'delivered'
    const isKurirMatch = lapak?.id_kurir === idKurir
    return isStatus && isKurirMatch && lapakNameMatch
  })

  const [inputDataRotiBasi, setInputDataRotiBasi] = useState([])
  const handleJumlahRotiBasi = (roti, event) => {
    setRoti(roti)
    const inputValue = event.target.value
    const jumlahRoti = inputValue !== '' ? parseInt(inputValue, 10) : 0

    setInputDataRotiBasi((prevData) => {
      const newData = prevData.map((existingRoti) => {
        if (existingRoti.kode_roti === roti.kode_roti) {
          return {
            ...existingRoti,
            jumlah_roti: jumlahRoti,
          }
        }
        return existingRoti
      })
      if (!newData.some((existingRoti) => existingRoti.kode_roti === roti.kode_roti)) {
        newData.push({
          kode_roti: roti.kode_roti,
          harga_satuan_roti: roti.roti.harga_satuan_roti,
          id_transaksi: roti.id_transaksi,
          jumlah_roti: jumlahRoti,
          stok_roti: roti.jumlah_roti,
        })
      }
      return newData
    })
  }

  const handleCloseRotiBasi = () => {
    setModalRotiBasi(false)
  }

  const simpanRotiBasi = (roti) => {
    const isValid = inputDataRotiBasi.every((item) => {
      return item.stok_roti >= item.jumlah_roti
    })

    if (isValid) {
      const totalHargaRotiBasi = inputDataRotiBasi.reduce((total, roti) => {
        const hargaRoti = roti.jumlah_roti * roti.harga_satuan_roti
        return total + hargaRoti
      }, 0)

      setCatatanNtotalHarga((prevData) => {
        const newData = prevData.map((existingRoti) => {
          if (existingRoti.id_transaksi === roti.id_transaksi) {
            return {
              ...existingRoti,
              total_dengan_rotibasi: totalHargaRotiBasi,
            }
          }
          return existingRoti
        })
        return newData
      })
      setModalRotiBasi(false)
      navigate('/kurir/daftar-pengiriman')
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'error',
        title: 'Maaf! anda melebihi stok roti yang tersedia',
      })
    }
  }

  const handleSubmit = async (item) => {
    const kodeRotiArray = formData.map((roti) => {
      if (roti.id_transaksi === item.id_transaksi) {
        return roti.kode_roti
      }
    })
    const jumlahRotiArray = formData.map((roti) => {
      if (roti.id_transaksi === item.id_transaksi) {
        return roti.jumlah_roti
      }
    })

    const dataTrans = catatanNtotalHarga.find(
      (transaksi) => transaksi.id_transaksi === item.id_transaksi,
    )
    const catatan = dataTrans.catatan_penjual === '' ? '-' : dataTrans.catatan_penjual
    const informasiPenjualan = {
      kode_roti: kodeRotiArray,
      jumlah_roti: jumlahRotiArray,
      catatan_penjual: catatan,
      total_harga: item.totalHargaRoti,
      total_dengan_rotibasi: dataTrans.total_dengan_rotibasi,
      uang_setoran: item.totalHargaRoti - dataTrans.total_dengan_rotibasi,
    }
    try {
      await axios.post(
        `http://localhost:8000/api/kurir/penjualan/${item.id_transaksi}`,
        informasiPenjualan,
      )
      Swal.fire({
        title: 'Berhasil',
        text: `Berhasil di submit.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/kurir/daftar-pengiriman'
        }
      })
    } catch (error) {
      setLoading(false)
    }
  }

  const handleInputCatatanChange = (event, data) => {
    setCatatanNtotalHarga((prevData) => {
      const newData = prevData.map((existingData) => {
        if (existingData.id_transaksi === data.id_transaksi) {
          return {
            ...existingData,
            catatan_penjual: event.target.value,
          }
        }
        return existingData
      })
      return newData
    })
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex =
    itemsPerPage === dataTransaksi.length ? dataTransaksi.length : startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const handleItemsPerPageChange = (value) => {
    setCurrentPage(1)
    setItemsPerPage(value)
  }

  const startRange = startIndex + 1
  const endRange = Math.min(startIndex + itemsPerPage, filteredData.length)
  const isDataEmpty = filteredData.length === 0

  return (
    <>
      <CCard>
        <CCardHeader>Daftar Pengiriman</CCardHeader>
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
                      {option === dataTransaksi.length ? 'All' : option}
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
                <CTableHeaderCell>Nama Lapak</CTableHeaderCell>
                <CTableHeaderCell>Alamat Lengkap</CTableHeaderCell>
                <CTableHeaderCell>Tgl Pengiriman</CTableHeaderCell>
                <CTableHeaderCell>Daftar Roti</CTableHeaderCell>
                <CTableHeaderCell>Total Harga</CTableHeaderCell>
                <CTableHeaderCell>Roti Basi</CTableHeaderCell>
                <CTableHeaderCell>Catatan</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                paginatedData.map((lapak, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.nama_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.lapak.alamat_lapak}</CTableDataCell>
                      <CTableDataCell>{lapak.tanggal_pengiriman}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Daftar Roti"
                          onClick={() => handleModalRoti(lapak)}
                        >
                          <CIcon icon={cilSearch} className="mx-12 me-2" />
                          Open Detail
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>{lapak.totalHargaRoti}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="Daftar Roti Basi"
                          onClick={() => handleModalRotiBasi(lapak)}
                        >
                          <CIcon icon={cilPen} className="mx-12 me-2" />
                          Input Roti Basi
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormTextarea
                          id="catatan"
                          name="catatan"
                          value={catatanNtotalHarga.catatan_penjual}
                          onChange={(e) => handleInputCatatanChange(e, lapak)}
                          placeholder="Masukkan catatan Anda di sini..."
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ color: 'orange' }}>{lapak.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="ms-2"
                          title="submit"
                          onClick={() => handleSubmit(lapak)}
                        >
                          Submit
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
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
      <CModal
        backdrop="static"
        visible={modalRoti}
        className="modal"
        onClose={() => {
          setModalRoti(false)
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataRotiDipilih.map((roti, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{roti.roti.nama_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModalRoti(false)
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal roti basi */}

      <CModal
        backdrop="static"
        visible={modalRotiBasi}
        className="modal"
        onClose={() => {
          setModalRotiBasi(false)
          setLoading(false)
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Roti</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped bordered responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nama Roti</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti Dikirim</CTableHeaderCell>
                <CTableHeaderCell>Jumlah Roti Basi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataRotiDipilih.map((roti, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{roti.roti.nama_roti}</CTableDataCell>
                  <CTableDataCell>{roti.jumlah_roti}</CTableDataCell>
                  <CTableDataCell>
                    <CForm>
                      <CFormInput
                        size="sm"
                        name="jumlah_roti"
                        value={
                          (inputDataRotiBasi.find((item) => item.kode_roti === roti.kode_roti) &&
                            inputDataRotiBasi.find((item) => item.kode_roti === roti.kode_roti)
                              .jumlah_roti) ??
                          0
                        }
                        onChange={(e) => handleJumlahRotiBasi(roti, e, index)}
                        required
                      ></CFormInput>
                    </CForm>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseRotiBasi}>
            Close
          </CButton>
          {loading ? (
            <CButton color="primary" disabled>
              <CSpinner color="info" size="sm" />
            </CButton>
          ) : (
            <CButton color="primary" onClick={() => simpanRotiBasi(roti)}>
              Selesai
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DaftarPengiriman
