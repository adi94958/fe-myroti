import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
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
  CRow,
  CSpinner,
  CFormSelect,
} from '@coreui/react'
import { Link } from 'react-router-dom'

import axios from 'axios'
const FormTambahLapak = () => {
  const [selectedArea, setSelectedArea] = useState('') // Nilai opsi yang dipilih
  const [optionsArea, setOptionsArea] = useState([]) // Array untuk menyimpan opsi dari API
  const [selectedKurir, setSelectedKurir] = useState('') // Nilai opsi yang dipilih
  const [optionsKurir, setOptionsKurir] = useState([]) // Array untuk menyimpan opsi dari API
  const [message, setMessage] = useState('')
  const [isKurirDisabled, setIsKurirDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama_lapak: '',
    no_telp: '',
    alamat: '',
  })

  useEffect(() => {
    handleArea() // Memanggil fungsi handleArea saat komponen dimuat
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
          })),
        ]
        // Menyimpan data opsi ke dalam state
        setOptionsArea(formattedOptions)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  function handleKurir(area_lapak) {
    axios
      .get('http://localhost:8000/api/kurir')
      .then((response) => {
        const data = response.data // Pastikan respons dari API kurir mengandung data kurir yang benar
        const areaLapakString = parseInt(area_lapak, 10)
        const filteredKurir = data.filter((kurir) => kurir.area_id === areaLapakString)
        console.log(area_lapak)
        console.log(filteredKurir)
        const OptionsKurir = [
          '--Pilih Kurir--',
          ...filteredKurir.map((kurir) => ({
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
    }
  }

  const handleSelectChangeKurir = (event) => {
    const selectedValueKurir = event.target.value
    setSelectedKurir(selectedValueKurir)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(selectedArea)
    console.log(selectedKurir)

    const newLapak = {
      nama_lapak: formData.nama_lapak,
      no_telp: formData.no_telp,
      area_id: selectedArea,
      alamat_lapak: formData.alamat,
      id_kurir: selectedKurir,
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/koordinator/lapak/registrasi',
        newLapak,
      )
      Swal.fire({
        title: 'Berhasil',
        text: `Lapak baru berhasil dibuat.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/lapak'
          console.log('Roti created successfully:', response.data)
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
  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Tambah Roti</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="nama_lapak"
                    placeholder="Nama Lapak"
                    floatingLabel="Nama Lapak"
                    value={formData.nama_lapak}
                    required
                    onChange={(e) => setFormData({ ...formData, nama_lapak: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="no_telp"
                    placeholder="No Telp"
                    floatingLabel="No Telp"
                    value={formData.no_telp}
                    required
                    onChange={(e) => setFormData({ ...formData, no_telp: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormSelect
                    aria-label="Default select example"
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
                    value={formData.alamat}
                    required
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormSelect
                    aria-label="Default select example"
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
              <CCol md={1}>
                <Link to={'/lapak'}>
                  <CButton color="danger" variant="outline" className="ms-2" title="Back">
                    Back
                  </CButton>
                </Link>
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
export default FormTambahLapak
