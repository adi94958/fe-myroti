import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCarAlt, cilMoney, cilNotes } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navKurir = [
  {
    component: CNavTitle,
    name: 'Kelola Pengiriman',
  },
  {
    component: CNavItem,
    name: 'Pengiriman Roti',
    to: '/kurir/pengiriman',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Penerimaan Uang Roti',
    to: '/kurir/daftar-pengiriman',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Riwayat Pengiriman',
    to: '/kurir/riwayat',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default navKurir
