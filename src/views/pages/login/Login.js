import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from '../../../assets/images/MyRoti.png'
import axios from 'axios'

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    if (infoLogin != null) {
      navigate('/dashboard')
    }
  }, [])

  const handleUsername = (e) => {
    const inputValue = e.target.value
    setLoginForm({ ...loginForm, username: inputValue })
  }

  const handlePassword = (e) => {
    const inputValue = e.target.value
    setLoginForm({ ...loginForm, password: inputValue })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      console.log(loginForm)
      const response = await axios.post(`http://localhost:8000/api/login`, {
        username: loginForm.username,
        password: loginForm.password,
      })
      const infoLogin = response.data.user
      console.log(response)
      if (infoLogin && infoLogin.user_type === 'admin') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in Successfully',
        })
        localStorage.setItem(
          `dataLogin`,
          JSON.stringify({
            nama: infoLogin.username,
            user_type: infoLogin.user_type,
          }),
        )
      } else if (infoLogin && infoLogin.user_type === 'kurir') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in Successfully',
        })
        localStorage.setItem(
          `dataLogin`,
          JSON.stringify({
            nama: infoLogin.nama,
            user_type: infoLogin.user_type,
            id: infoLogin.id_kurir,
          }),
        )
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in Successfully',
        })
        localStorage.setItem(
          `dataLogin`,
          JSON.stringify({
            nama: infoLogin.nama,
            user_type: infoLogin.user_type,
          }),
        )
      }
      navigate('/')
    } catch (error) {
      console.log('Full error response:', error.response)
      if (error.response && error.response.data && error.response.data.message) {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'error',
          title: `${resMessage}`,
        })
      }
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={loginForm.username}
                        onChange={handleUsername}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={loginForm.password}
                        onChange={handlePassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="bg-warning py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={logo} alt="MyRoti Logo" />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
