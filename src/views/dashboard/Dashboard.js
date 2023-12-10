import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import navAdmin from 'src/navAdmin'

import sidebarContentAtom from 'src/recoil/sidebarContentRecoil'
import navKoordinator from 'src/navKoordinator'
import navKurir from 'src/navKurir'
import navKeuangan from 'src/navKeuangan'
import navPemilik from 'src/navPemilik'

const Dashboard = () => {
  const navigate = useNavigate()
  const [Sidebar, setSidebar] = useRecoilState(sidebarContentAtom)

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    if (infoLogin === null) {
      navigate('/login')
    } else {
      if (infoLogin.user_type === 'admin') {
        setSidebar(navAdmin)
        navigate('/admin')
      } else if (infoLogin.user_type === 'koordinator') {
        setSidebar(navKoordinator)
        navigate('/koordinator')
      } else if (infoLogin.user_type === 'kurir') {
        setSidebar(navKurir)
        navigate('/kurir')
      } else if (infoLogin.user_type === 'keuangan') {
        setSidebar(navKeuangan)
        navigate('/keuangan')
      } else if (infoLogin.user_type === 'pemilik') {
        setSidebar(navPemilik)
        navigate('/pemilik')
      }
    }
  }, [])
}

export default Dashboard
