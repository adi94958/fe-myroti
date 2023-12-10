import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navAdmin = [
  {
    component: CNavGroup,
    name: 'Kelola Data',
    to: '/admin',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Koordinator',
        to: '/admin/koordinator',
      },
      {
        component: CNavItem,
        name: 'Keuangan',
        to: '/admin/keuangan',
      },
      {
        component: CNavItem,
        name: 'Pemilik',
        to: '/admin/pemilik',
      },
      {
        component: CNavItem,
        name: 'Kurir',
        to: '/admin/kurir',
      },
    ],
  },
]

export default navAdmin
