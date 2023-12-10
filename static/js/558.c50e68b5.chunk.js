"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[558],{3558:(r,a,e)=>{e.r(a),e.d(a,{default:()=>j});var i=e(2791),o=e(7689),s=e(5294),l=e(1830),t=e.n(l),c=e(2937),n=e(4846),d=e(3400),h=e(3488),m=e(4040),p=e(7256),u=e(1087),x=e(184);const j=()=>{const[r,a]=(0,i.useState)(""),[e,l]=(0,i.useState)([]),j=(0,o.s0)();(0,i.useEffect)((()=>{s.Z.get("https://be-myroti-production.up.railway.app/api/koordinator").then((r=>{console.log(r.data),l(r.data)})).catch((r=>{console.error("Error fetching data:",r)}))}),[]);const y=e.filter((a=>{const e=a.nama.toString().toLowerCase(),i=a.username.toString().toLowerCase(),o=a.password.toString().toLowerCase();return""===r||e.includes(r.toLowerCase())||i.includes(r.toLowerCase())||o.includes(r.toLowerCase())}));return(0,x.jsx)("div",{children:(0,x.jsx)(c.rb,{children:(0,x.jsx)(c.b7,{children:(0,x.jsxs)(c.xH,{children:[(0,x.jsx)(c.bn,{children:"Data Koordinator"}),(0,x.jsxs)(c.sl,{children:[(0,x.jsx)(c.lx,{className:"mb-3",children:(0,x.jsxs)(c.rb,{children:[(0,x.jsx)(c.b7,{md:8,xs:6,children:(0,x.jsxs)(c.YR,{children:[(0,x.jsx)(c.jO,{type:"text",placeholder:"Search...",value:r,onChange:r=>a(r.target.value)}),(0,x.jsx)(c.u5,{variant:"outline",className:"ms-2",children:(0,x.jsx)(n.Z,{icon:d.j})})]})}),(0,x.jsx)(c.b7,{md:4,xs:6,className:"text-end",children:(0,x.jsx)(u.rU,{to:"/admin/koordinator/tambah",children:(0,x.jsxs)(c.u5,{variant:"outline",children:[(0,x.jsx)(n.Z,{icon:h.J,className:"mx-2"}),"Tambah Koordinator"]})})})]})}),(0,x.jsxs)(c.Sx,{striped:!0,bordered:!0,responsive:!0,children:[(0,x.jsx)(c.V,{children:(0,x.jsxs)(c.T6,{children:[(0,x.jsx)(c.is,{children:"No"}),(0,x.jsx)(c.is,{children:"Nama"}),(0,x.jsx)(c.is,{children:"Username"}),(0,x.jsx)(c.is,{children:"Password"}),(0,x.jsx)(c.is,{children:"Aksi"})]})}),(0,x.jsx)(c.NR,{children:0===y.length?(0,x.jsx)("tr",{children:(0,x.jsx)("td",{colSpan:"6",className:"text-center",children:"Tidak ada data."})}):y.map(((r,a)=>(0,x.jsxs)(c.T6,{children:[(0,x.jsx)(c.NN,{children:a+1}),(0,x.jsx)(c.NN,{children:r.nama}),(0,x.jsx)(c.NN,{children:r.username}),(0,x.jsx)(c.NN,{children:r.password}),(0,x.jsx)(c.NN,{children:(0,x.jsxs)(c.b7,{children:[(0,x.jsx)(c.u5,{color:"primary",variant:"outline",className:"ms-2",title:"Edit Data Roti",onClick:()=>{return a=r,localStorage.setItem("lsDataKoor",JSON.stringify({id:a.id,nama:a.nama,username:a.username,password:a.password})),void j("/admin/koordinator/update");var a},children:(0,x.jsx)(n.Z,{icon:m.C})}),(0,x.jsx)(c.u5,{color:"danger",variant:"outline",className:"ms-2",title:"Hapus Data Roti",onClick:()=>{return a=r,void t().fire({title:"Apakah anda yakin ingin menghapus ".concat(a.nama,"?"),icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Delete"}).then((r=>{r.isConfirmed&&s.Z.delete("https://be-myroti-production.up.railway.app/api/koordinator/delete/".concat(a.id)).then((r=>{t().fire("Deleted!","Your file has been deleted.","success"),window.location.href="/admin/koordinator"})).catch((r=>{console.error("Error deleting data:",r)}))}));var a},children:(0,x.jsx)(n.Z,{icon:p.N})})]})})]},r.id)))})]})]})]})})})})}},4040:(r,a,e)=>{e.d(a,{C:()=>i});var i=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M345.994,42.019,179.531,208.481A646.3,646.3,0,0,0,25.325,456.521a24.845,24.845,0,0,0,6,25.708l.087.087a24.84,24.84,0,0,0,17.611,7.342,25.172,25.172,0,0,0,8.1-1.344,646.283,646.283,0,0,0,248.04-154.207L471.62,167.646A88.831,88.831,0,0,0,345.994,42.019ZM282.531,311.48A614.445,614.445,0,0,1,60.419,453.221,614.435,614.435,0,0,1,202.158,231.108l99.162-99.161,80.372,80.372ZM448.993,145.019l-44.674,44.673L323.947,109.32l44.674-44.674a56.832,56.832,0,1,1,80.372,80.373Z' class='ci-primary'/>"]},3400:(r,a,e)=>{e.d(a,{j:()=>i});var i=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z' class='ci-primary'/>"]},7256:(r,a,e)=>{e.d(a,{N:()=>i});var i=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z' class='ci-primary'/><rect width='32' height='200' x='168' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='240' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='312' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z' class='ci-primary'/>"]},3488:(r,a,e)=>{e.d(a,{J:()=>i});var i=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M208,16A112.127,112.127,0,0,0,96,128v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L60.4,343.656A79.725,79.725,0,0,0,24,410.732V496H312V464H56V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,128,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L240.5,307.007,312,353.483V315.317l-29.223-19,27.455-50.334A80.23,80.23,0,0,0,320,207.681V128A112.127,112.127,0,0,0,208,16Z' class='ci-primary'/><polygon fill='var(--ci-primary-color, currentColor)' points='424 400 424 336 392 336 392 400 328 400 328 432 392 432 392 496 424 496 424 432 488 432 488 400 424 400' class='ci-primary'/>"]}}]);
//# sourceMappingURL=558.c50e68b5.chunk.js.map