import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CFormSelect,
} from '@coreui/react'

const FormUpdateRoti = () => {
  const [selectedArea, setSelectedArea] = useState('') // Nilai opsi yang dipilih
  const [optionsArea, setOptionsArea] = useState([]) // Array untuk menyimpan opsi dari API
  const [selectedKurir, setSelectedKurir] = useState('') // Nilai opsi yang dipilih
  const [optionsKurir, setOptionsKurir] = useState([]) // Array untuk menyimpan opsi dari API
  const [namaLapak, setNamaLapak] = useState('')
  const [kodeLapak, setKodeLapak] = useState('')
  const [alamat, setAlamat] = useState('')
  const [noTelp, setNoTelp] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isKurirDisabled, setIsKurirDisabled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const dataLapak = JSON.parse(localStorage.getItem('lsDataLapak'))
    setNamaLapak(dataLapak.nama_lapak)
    setAlamat(dataLapak.alamat)
    setSelectedArea(dataLapak.area_id)
    setSelectedKurir(dataLapak.id_kurir)
    setKodeLapak(dataLapak.kode_lapak)
    setNoTelp(dataLapak.no_telp)
    handleArea()
    handleKurir(dataLapak.area_id)
  }, [])

  function handleArea() {
    axios
      .get('http://localhost:8000/api/area')
      .then((response) => {
        const data = response.data // Mengakses data dari respons API
        const formattedOptions = [
          '--Pilih Kecamatan--',
          ...data.map((area) => ({
            label: area.area_distribusi, // Ganti dengan properti yang sesuai dari API area
            value: area.area_id, // Ganti dengan properti yang sesuai dari API area
            isSelected: area.area_id === selectedArea,
          })),
        ]
        // Menyimpan data opsi ke dalam state
        setOptionsArea(formattedOptions)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  function handleKurir(area_id) {
    axios
      .get('http://localhost:8000/api/kurir')
      .then((response) => {
        const data = response.data // Pastikan respons dari API kurir mengandung data kurir yang benar
        const areaLapakString = parseInt(area_id, 10)
        const filteredKurir = data.filter((kurir) => kurir.area_id === areaLapakString)
        console.log(filteredKurir)
        const OptionsKurir = [
          '--Pilih Kurir--',
          ...filteredKurir.map((kurir) => ({
            isSelected: kurir.id_kurir === selectedKurir,
            label: kurir.nama, // Ganti dengan properti yang sesuai dari API area
            value: kurir.id_kurir, // Ganti dengan properti yang sesuai dari API area
          })),
        ]
        // Menyimpan data opsi ke dalam state
        setOptionsKurir(OptionsKurir)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleSelectChangeArea = (event) => {
    const selectedValue = event.target.value
    setSelectedArea(selectedValue)
    setIsKurirDisabled(selectedValue === '--Pilih Kecamatan--')
    if (selectedValue === '--Pilih Kecamatan--') {
      // Jika '--Pilih Kecamatan--' dipilih, set opsi kurir menjadi kosong
      setOptionsKurir([])
    } else {
      // Jika nilai valid dipilih, ambil kurir berdasarkan nilai tersebut
      handleKurir(selectedValue)
      setSelectedKurir('')
    }
  }

  const handleSelectChangeKurir = (event) => {
    const selectedValueKurir = event.target.value
    setSelectedKurir(selectedValueKurir)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const area_id = parseInt(selectedArea, 10)
    const updateLapak = {
      nama_lapak: namaLapak,
      no_telp: noTelp,
      id_kurir: selectedKurir,
      area_id: area_id,
      alamat_lapak: alamat,
    }
    console.log(updateLapak)
    console.log(kodeLapak)

    try {
      const response = axios.put(
        `http://localhost:8000/api/koordinator/lapak/update/${kodeLapak}`,
        updateLapak,
      )
      console.log('Roti updated successfully:', response.data)
      localStorage.removeItem('lsDataLapak')
      Swal.fire({
        title: 'Berhasil',
        text: `Data ${updateLapak.nama_lapak} telah berhasil diubah.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/lapak'
          console.log('Roti updated successfully:', response.data)
        }
      })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        setMessage(resMessage)
      }
      setLoading(false)
    }
  }

  function handleCancel() {
    localStorage.removeItem('lsDataLapak')
    navigate('/lapak')
  }

  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Update Lapak</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="namaLapak"
                    placeholder="Nama Lapak"
                    floatingLabel="Nama Lapak"
                    defaultValue={namaLapak}
                    required
                    onChange={(e) => setNamaLapak(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="NoTelp"
                    placeholder="No Telp"
                    floatingLabel="No Telp"
                    defaultValue={noTelp}
                    required
                    onChange={(e) => setNoTelp(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="nama-area">Kecamatan</CInputGroupText>
                  <CFormSelect
                    aria-label="Default select example"
                    aria-describedby="nama-area"
                    value={selectedArea}
                    onChange={handleSelectChangeArea}
                    options={optionsArea}
                  ></CFormSelect>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="alamat"
                    placeholder="Alamat"
                    floatingLabel="Alamat"
                    defaultValue={alamat}
                    required
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="nama-kurir">Nama Kurir</CInputGroupText>
                  <CFormSelect
                    aria-label="Default select example"
                    id="nama-kurir"
                    value={selectedKurir}
                    onChange={handleSelectChangeKurir}
                    options={optionsKurir}
                    disabled={isKurirDisabled}
                  ></CFormSelect>
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol xs={10}></CCol>
              <CCol md={1}>
                <CButton
                  color="secondary"
                  variant="outline"
                  className="ms-2"
                  title="Back"
                  onClick={handleCancel}
                >
                  Back
                </CButton>
              </CCol>
              <CCol xs={1}>
                {loading ? (
                  <CButton color="primary" variant="outline" type="submit" disabled>
                    <CSpinner color="info" size="sm" />
                  </CButton>
                ) : (
                  <CButton color="primary" variant="outline" type="submit">
                    Submit
                  </CButton>
                )}
              </CCol>
            </CRow>
            <CRow className="mt-2">
              {message && <p className="error-message alert alert-danger">{message}</p>}
            </CRow>
          </CCardFooter>
        </CForm>
      </CCard>
    </>
  )
}

export default FormUpdateRoti
