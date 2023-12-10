import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import sidebarContentAtom from '../recoil/sidebarContentRecoil'
import { useRecoilState } from 'recoil'
import navAdmin from '../navAdmin'
import navKoordinator from './../navKoordinator'
import navKurir from 'src/navKurir'
import navKeuangan from 'src/navKeuangan'
import navPemilik from 'src/navPemilik'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [Sidebar, setSidebar] = useRecoilState(sidebarContentAtom)

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))

    if (!infoLogin) {
      navigate('/login')
    } else {
      if (infoLogin && infoLogin.user_type) {
        if (infoLogin.user_type === 'admin') {
          setSidebar(navAdmin)
        } else if (infoLogin.user_type === 'koordinator') {
          setSidebar(navKoordinator)
        } else if (infoLogin.user_type === 'kurir') {
          setSidebar(navKurir)
        } else if (infoLogin.user_type === 'keuangan') {
          setSidebar(navKeuangan)
        } else if (infoLogin.user_type === 'pemilik') {
          setSidebar(navPemilik)
        }
      } else {
        // Handle the case where user_type is null or undefined
        console.error('User type is null or undefined in infoLogin')
        navigate('/login')
      }
    }
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
