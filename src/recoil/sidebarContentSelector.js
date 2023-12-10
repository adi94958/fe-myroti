import { selector } from 'recoil'
import sidebarContentAtom from './sidebarContentRecoil'

const sidebarContentSelector = selector({
  key: 'sidebarContentSelector',
  get: ({ get }) => {
    return get(sidebarContentAtom)
  },
})

export default sidebarContentSelector
