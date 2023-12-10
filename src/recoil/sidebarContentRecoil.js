import { atom } from 'recoil'
import navAdmin from './../navAdmin'

const sidebarContentAtom = atom({
  key: 'sidebarContent',
  default: navAdmin,
})

export default sidebarContentAtom
