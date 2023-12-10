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

const navPemilik = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/pemilik',
    icon: <CIcon icon={cilBurger} customClassName="nav-icon" />,
  },
]

export default navPemilik
