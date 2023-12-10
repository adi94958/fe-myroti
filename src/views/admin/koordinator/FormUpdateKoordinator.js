import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const FormUpdateKoordinator = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState({
    nama: 0,
    username: 0,
    password: 0,
  })
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    username: '',
    password: '',
  })

  useEffect(() => {
    const dataKoor = JSON.parse(localStorage.getItem('lsDataKoor'))
    setCount({
      nama: dataKoor.nama.length,
      username: dataKoor.username.length,
      password: dataKoor.password.length,
    })
    setFormData({
      id: dataKoor.id,
      nama: dataKoor.nama,
      username: dataKoor.username,
      password: dataKoor.password,
    })
  }, [])

  const handleNamaChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 50) {
      setFormData({ ...formData, nama: inputValue })
      setCount({ ...count, nama: inputValue.length })
    } else {
      setFormData({ ...formData, nama: inputValue.slice(0, 50) })
    }
  }

  const handleUsernameChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 25) {
      setFormData({ ...formData, username: inputValue })
      setCount({ ...count, username: inputValue.length })
    } else {
      setFormData({ ...formData, username: inputValue.slice(0, 25) })
    }
  }

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 25) {
      setFormData({ ...formData, password: inputValue })
      setCount({ ...count, password: inputValue.length })
    } else {
      setFormData({ ...formData, password: inputValue.slice(0, 25) })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateUser = {
      nama: formData.nama,
      username: formData.username,
      password: formData.password,
      user_type: 'koordinator',
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/koordinator/update/${formData.id}`,
        updateUser,
      )
      console.log('Roti updated successfully:', response.data)
      localStorage.removeItem('lsDataKoor')
      Swal.fire({
        title: 'Berhasil',
        text: `Data ${updateUser.nama} telah berhasil diubah.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/admin/koordinator'
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
  return (
    <>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          <CCardHeader>Form Edit Akun Koordinator</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Nama"
                    placeholder="Nama"
                    floatingLabel="Nama"
                    defaultValue={formData.nama}
                    required
                    onChange={handleNamaChange}
                  />
                  <CInputGroupText size="sm">{count.nama}/50</CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Username"
                    placeholder="Username"
                    floatingLabel="Username"
                    defaultValue={formData.username}
                    required
                    onChange={handleUsernameChange}
                  />
                  <CInputGroupText size="sm">{count.username}/25</CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Password"
                    placeholder="Password"
                    floatingLabel="Password"
                    defaultValue={formData.password}
                    required
                    onChange={handlePasswordChange}
                  />
                  <CInputGroupText size="sm">{count.password}/25</CInputGroupText>
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md={1}>
                <Link to={`/admin/koordinator`}>
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

export default FormUpdateKoordinator
