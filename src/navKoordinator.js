import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBurger,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilEnvelopeLetter,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navKoordinator = [
  {
    component: CNavTitle,
    name: 'Kelola Distribusi',
  },
  {
    component: CNavGroup,
    name: 'Pengiriman',
    to: '/pengiriman',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Kelola Pengiriman',
        to: '/pengiriman/kelola',
      },
      {
        component: CNavItem,
        name: 'Daftar Pengiriman',
        to: '/pengiriman/list',
      },
      {
        component: CNavItem,
        name: 'Riwayat Pengiriman',
        to: '/pengiriman/riwayat',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Roti',
    to: '/roti',
    icon: <CIcon icon={cilBurger} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Lapak',
    to: '/lapak',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default navKoordinator
