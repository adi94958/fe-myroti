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
  CRow,
  CSpinner,
} from '@coreui/react'

const dataRoti = JSON.parse(localStorage.getItem('lsDataRoti'))

const FormUpdateRoti = () => {
  const [nama_roti, setNama] = useState('')
  const [stok_roti, setStok] = useState('')
  const [rasa_roti, setRasa] = useState('')
  const [harga_satuan_roti, setHarga] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setNama(dataRoti.nama_roti)
    setStok(dataRoti.stok_roti)
    setRasa(dataRoti.rasa_roti)
    setHarga(dataRoti.harga_satuan_roti)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateRoti = {
      nama_roti: nama_roti,
      stok_roti: stok_roti,
      rasa_roti: rasa_roti,
      harga_satuan_roti: harga_satuan_roti,
    }

    try {
      const response = axios.put(
        `http://localhost:8000/api/koordinator/dataroti/update/${dataRoti.kode_roti}`,
        updateRoti,
      )
      console.log('Roti updated successfully:', response.data)
      localStorage.removeItem('lsDataRoti')
      Swal.fire({
        title: 'Berhasil',
        text: `Data ${updateRoti.nama_roti} telah berhasil diubah.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/roti'
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
    localStorage.removeItem('lsDataRoti')
    navigate('/roti')
  }

  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Update Roti</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="nama_roti"
                    placeholder="Nama Roti"
                    floatingLabel="Nama Roti"
                    defaultValue={nama_roti}
                    required
                    onChange={(e) => setNama(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="stok_roti"
                    placeholder="Stok Roti"
                    floatingLabel="Stok Roti"
                    defaultValue={stok_roti}
                    required
                    onChange={(e) => setStok(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="rasa_roti"
                    placeholder="Rasa Roti"
                    floatingLabel="Rasa Roti"
                    defaultValue={rasa_roti}
                    required
                    onChange={(e) => setRasa(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="harga_satuan_roti"
                    placeholder="Harga Satuan Roti"
                    floatingLabel="Harga Satuan Roti"
                    defaultValue={harga_satuan_roti}
                    required
                    onChange={(e) => setHarga(e.target.value)}
                  />
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
