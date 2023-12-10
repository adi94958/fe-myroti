import React, { useState } from 'react'
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
} from '@coreui/react'
import { Link } from 'react-router-dom'

import axios from 'axios'
const FormTambahRoti = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama_roti: '',
    stok_roti: '',
    rasa_roti: '',
    harga_satuan_roti: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newRoti = {
      nama_roti: formData.nama_roti,
      stok_roti: formData.stok_roti,
      rasa_roti: formData.rasa_roti,
      harga_satuan_roti: formData.harga_satuan_roti,
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/koordinator/dataroti/registrasi',
        newRoti,
      )
      Swal.fire({
        title: 'Berhasil',
        text: `Data roti berhasil ditambahkan.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/roti'
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
                    name="nama_roti"
                    placeholder="Nama Roti"
                    floatingLabel="Nama Roti"
                    value={formData.nama_roti}
                    required
                    onChange={(e) => setFormData({ ...formData, nama_roti: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="stok_roti"
                    placeholder="Stok Roti"
                    floatingLabel="Stok Roti"
                    value={formData.stok_roti}
                    required
                    onChange={(e) => setFormData({ ...formData, stok_roti: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="rasa_roti"
                    placeholder="Rasa Roti"
                    floatingLabel="Rasa Roti"
                    value={formData.rasa_roti}
                    required
                    onChange={(e) => setFormData({ ...formData, rasa_roti: e.target.value })}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="harga_satuan_roti"
                    placeholder="Harga Satuan Roti"
                    floatingLabel="Harga Satuan Roti"
                    value={formData.harga_satuan_roti}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, harga_satuan_roti: e.target.value })
                    }
                  />
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md={1}>
                <Link to={`/roti`}>
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
export default FormTambahRoti
