import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AppHeaderDropdown = () => {
  const [Login, setLogin] = useState([])
  const [statusKurir, setStatusKurir] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const infoLogin = JSON.parse(localStorage.getItem('dataLogin'))
    if (!infoLogin) {
      navigate('/login')
    } else {
      setLogin(infoLogin)
      if (infoLogin.user_type === 'kurir') setStatusKurir(true)
    }
  }, [])

  const handleEdit = () => {
    localStorage.setItem(
      'lsDataEditKurir',
      JSON.stringify({
        id_kurir: Login.id,
      }),
    )
    navigate('/kurir/edit')
  }

  const handleLogOut = () => {
    localStorage.removeItem('dataLogin')
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
      title: 'Sign Out Successfully',
    })
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

        {statusKurir && (
          <CDropdownItem onClick={handleEdit}>
            <CIcon icon={cilSettings} className="me-2" />
            Edit Akun
          </CDropdownItem>
        )}
        <CDropdownItem onClick={handleLogOut}>
          <CIcon icon={cilBell} className="me-2" />
          Sign Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
