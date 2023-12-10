import React from 'react'

//Admin Koordinator
const KelolaDataKoordinator = React.lazy(() => import('./views/admin/koordinator/DataKoordinator'))
const FormTambahKoordinator = React.lazy(() =>
  import('./views/admin/koordinator/FormTambahKoordinator'),
)
const FormUpdateKoordinator = React.lazy(() =>
  import('./views/admin/koordinator/FormUpdateKoordinator'),
)

//Admin Keuangan
const KelolaDataKeuangan = React.lazy(() => import('./views/admin/keuangan/DataKeuangan'))
const FormTambahKeuangan = React.lazy(() => import('./views/admin/keuangan/FormTambahKeuangan'))
const FormUpdateKeuangan = React.lazy(() => import('./views/admin/keuangan/FormUpdateKeuangan'))

//Admin Pemilik
const KelolaDataPemilik = React.lazy(() => import('./views/admin/pemilik/DataPemilik'))
const FormTambahPemilik = React.lazy(() => import('./views/admin/pemilik/FormTambahPemilik'))
const FormUpdatePemilik = React.lazy(() => import('./views/admin/pemilik/FormUpdatePemilik'))

//Admin Pemilik
const KelolaDataKurir = React.lazy(() => import('./views/admin/kurir/DataKurir'))
const FormTambahKurir = React.lazy(() => import('./views/admin/kurir/FormTambahKurir'))
const FormUpdateKurir = React.lazy(() => import('./views/admin/kurir/FormUpdateKurir'))

// Pengiriman
const Pengiriman = React.lazy(() => import('./views/koordinator/pengiriman/Pengiriman'))
const FormPengiriman = React.lazy(() => import('./views/koordinator/pengiriman/FormPengiriman'))
const DaftarPengirimanKoor = React.lazy(() =>
  import('./views/koordinator/pengiriman/DaftarPengiriman'),
)
const RiwayatPengiriman = React.lazy(() =>
  import('./views/koordinator/pengiriman/RiwayatPengiriman'),
)

// Roti
const Roti = React.lazy(() => import('./views/koordinator/roti/DataRoti'))
const FormTambahRoti = React.lazy(() => import('./views/koordinator/roti/FormTambahRoti'))
const FormUpdateRoti = React.lazy(() => import('./views/koordinator/roti/FormUpdateRoti'))

// Lapak
const Lapak = React.lazy(() => import('./views/koordinator/lapak/DataLapak'))
const FormTambahLapak = React.lazy(() => import('./views/koordinator/lapak/FormTambahLapak'))
const FormUpdateLapak = React.lazy(() => import('./views/koordinator/lapak/FormUpdateLapak'))

// Kurir
const Riwayat = React.lazy(() => import('./views/kurir/Riwayat'))
const PengirimanKurir = React.lazy(() => import('./views/kurir/KurirPengiriman'))
const DaftarPengiriman = React.lazy(() => import('./views/kurir/DaftarPengiriman'))
const EditKurir = React.lazy(() => import('./views/kurir/EditKurir'))

// Keuangan
const Keuangan = React.lazy(() => import('./views/Keuangan/DataKeuangan'))

// Pemilik
const Pemilik = React.lazy(() => import('./views/Pemilik/DataPemilik'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin', name: 'Admin', exact: true, element: KelolaDataKoordinator },
  { path: '/koordinator', name: 'Koordinator', exact: true, element: Pengiriman },
  { path: '/kurir', name: 'Kurir', exact: true, element: PengirimanKurir },
  { path: '/keuangan', name: 'Keuangan', exact: true, element: Keuangan },
  { path: '/pemilik', name: 'Pemilik', exact: true, element: Pemilik },
  { path: '/kurir/daftar-pengiriman', name: 'Penerimaan Uang Roti', element: DaftarPengiriman },
  { path: '/kurir/pengiriman', name: 'Pengiriman Roti', element: PengirimanKurir },
  { path: '/admin/koordinator', name: 'Koordinator', element: KelolaDataKoordinator },
  { path: '/admin/koordinator/tambah', name: 'Tambah Koordinator', element: FormTambahKoordinator },
  { path: '/admin/koordinator/update', name: 'Edit Koordinator', element: FormUpdateKoordinator },
  { path: '/admin/keuangan', name: 'Keuangan', element: KelolaDataKeuangan },
  { path: '/admin/keuangan/tambah', name: 'Tambah Keuangan', element: FormTambahKeuangan },
  { path: '/admin/keuangan/update', name: 'Edit Keuangan', element: FormUpdateKeuangan },
  { path: '/admin/pemilik', name: 'Pemilik', element: KelolaDataPemilik },
  { path: '/admin/pemilik/tambah', name: 'Tambah Pemilik', element: FormTambahPemilik },
  { path: '/admin/pemilik/update', name: 'Edit Pemilik', element: FormUpdatePemilik },
  { path: '/admin/kurir', name: 'Kurir', element: KelolaDataKurir },
  { path: '/admin/kurir/tambah', name: 'Tambah Kurir', element: FormTambahKurir },
  { path: '/admin/kurir/update', name: 'Edit Kurir', element: FormUpdateKurir },
  { path: '/pengiriman', name: 'Pengiriman', element: Pengiriman },
  { path: '/pengiriman/kelola', name: 'Kelola Pengiriman', element: Pengiriman },
  { path: '/pengiriman/kelola/kirim', name: 'Form Pengiriman', element: FormPengiriman },
  { path: '/pengiriman/list', name: 'Daftar Pengiriman', element: DaftarPengirimanKoor },
  { path: '/pengiriman/riwayat', name: 'Riwayat Pengiriman', element: RiwayatPengiriman },
  { path: '/roti', name: 'Roti', element: Roti },
  { path: '/roti/update', name: 'Form Update Roti', element: FormUpdateRoti },
  { path: '/roti/tambah', name: 'Form Tambah Roti', element: FormTambahRoti },
  { path: '/lapak', name: 'Lapak', element: Lapak },
  { path: '/lapak/update', name: 'Form Update Lapak', element: FormUpdateLapak },
  { path: '/lapak/tambah', name: 'Form Tambah Lapak', element: FormTambahLapak },
  { path: '/kurir/riwayat', name: 'Riwayat Kurir', element: Riwayat },
  { path: '/kurir/edit', name: 'Edit Data', element: EditKurir },
]

export default routes
