import React, { useEffect, useState } from 'react'
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
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react'
import { Link } from 'react-router-dom'

import axios from 'axios'

const FormTambahKurir = () => {
  const [message, setMessage] = useState('')
  const [dataArea, setDataArea] = useState([])
  const [count, setCount] = useState({
    nama: 0,
    username: 0,
    password: 0,
  })
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    password: '',
    area: null,
  })

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/area')
      .then((response) => {
        console.log(response.data)
        setDataArea(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
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

  const handleAreaChange = (e) => {
    const inputValue = e.target.value
    setFormData({ ...formData, area: inputValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newUser = {
      nama: formData.nama,
      username: formData.username,
      password: formData.password,
      area_id: formData.area,
      user_type: 'kurir',
    }
    console.log(newUser)

    try {
      const response = await axios.post('http://localhost:8000/api/kurir/registrasi', newUser)
      Swal.fire({
        title: 'Berhasil',
        text: `Data Kurir berhasil ditambahkan.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/admin/kurir'
          console.log('User created successfully:', response.data)
        }
      })
    } catch (error) {
      console.log('Full error response:', error.response)
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
          <CCardHeader>Form Tambah Akun Kurir</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    name="Nama"
                    placeholder="Nama"
                    floatingLabel="Nama"
                    value={formData.nama}
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
                    value={formData.username}
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
                    value={formData.password}
                    required
                    onChange={handlePasswordChange}
                  />
                  <CInputGroupText size="sm">{count.password}/25</CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol xs={12}>
                <CInputGroup className="mb-3">
                  <CInputGroupText size="sm">Pilih Area</CInputGroupText>
                  <CFormSelect id="inputGroupSelect01" onChange={handleAreaChange}>
                    {dataArea.map((item) => (
                      <option key={item.area_id} value={item.area_id}>
                        {item.area_distribusi}
                      </option>
                    ))}
                  </CFormSelect>
                </CInputGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md={1}>
                <Link to={`/admin/kurir`}>
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
export default FormTambahKurir
