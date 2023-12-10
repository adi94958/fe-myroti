"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[438],{4438:(r,e,a)=>{a.r(e),a.d(e,{default:()=>p});var t=a(2791),i=a(7689),l=a(5294),s=a(1830),o=a.n(s),n=a(2937),c=a(4846),d=a(3400),h=a(9746),x=a(4040),u=a(7256),m=a(1087),j=a(184);const p=()=>{const[r,e]=(0,t.useState)(""),[a,s]=(0,t.useState)([]),p=(0,i.s0)(),[g,_]=(0,t.useState)(1),[v,f]=(0,t.useState)(10),y=[10,25,50,a.length];(0,t.useEffect)((()=>{l.Z.get("https://be-myroti-production.up.railway.app/api/koordinator/dataroti").then((r=>{console.log(r.data),s(r.data)})).catch((r=>{console.error("Error fetching data:",r)}))}),[]);const N=["kode_roti","nama_roti","stok_roti","rasa_roti","harga_satuan_roti"],C=a.filter((e=>""===r||N.some((a=>{const t=e[a];return"string"===typeof t&&t.toLowerCase().includes(r.toLowerCase())})))),b=(g-1)*v,k=v===a.length?a.length:b+v,w=C.slice(b,k),Z=b+1,M=Math.min(b+v,C.length),S=0===C.length;return(0,j.jsx)("div",{children:(0,j.jsx)(n.rb,{children:(0,j.jsx)(n.b7,{children:(0,j.jsxs)(n.xH,{children:[(0,j.jsx)(n.bn,{children:"Data Roti"}),(0,j.jsxs)(n.sl,{children:[(0,j.jsx)(n.lx,{className:"mb-3",children:(0,j.jsxs)(n.rb,{children:[(0,j.jsx)(n.b7,{md:6,xs:8,children:(0,j.jsxs)(n.YR,{children:[(0,j.jsx)(n.jO,{type:"text",placeholder:"Search...",value:r,onChange:r=>e(r.target.value)}),(0,j.jsx)(n.u5,{variant:"outline",className:"ms-2",children:(0,j.jsx)(c.Z,{icon:d.j})})]})}),(0,j.jsx)(n.b7,{md:2,xs:4,children:(0,j.jsx)(m.rU,{to:"/roti/tambah",children:(0,j.jsxs)(n.u5,{variant:"outline",children:[(0,j.jsx)(c.Z,{icon:h.S,className:"mx-8 me-2"}),"Tambah Roti"]})})}),(0,j.jsx)(n.b7,{md:2,xs:3,children:(0,j.jsx)(n.L8,{children:"Rows Per Page:"})}),(0,j.jsx)(n.b7,{md:2,xs:3,children:(0,j.jsx)(n.LX,{className:"form-select",value:v,onChange:r=>{return e=parseInt(r.target.value),_(1),void f(e);var e},children:y.map((r=>(0,j.jsx)("option",{value:r,children:r===a.length?"All":r},r)))})})]})}),(0,j.jsxs)(n.Sx,{striped:!0,bordered:!0,responsive:!0,children:[(0,j.jsx)(n.V,{children:(0,j.jsxs)(n.T6,{children:[(0,j.jsx)(n.is,{children:"No"}),(0,j.jsx)(n.is,{children:"Nama Roti"}),(0,j.jsx)(n.is,{children:"Stok Roti"}),(0,j.jsx)(n.is,{children:"Rasa Roti"}),(0,j.jsx)(n.is,{children:"Harga Satuan"}),(0,j.jsx)(n.is,{children:"Aksi"})]})}),(0,j.jsx)(n.NR,{children:0===w.length?(0,j.jsx)("tr",{children:(0,j.jsx)("td",{colSpan:"6",className:"text-center",children:"Tidak ada data."})}):w.map(((r,e)=>(0,j.jsxs)(n.T6,{children:[(0,j.jsx)(n.NN,{children:b+e+1}),(0,j.jsx)(n.NN,{children:r.nama_roti}),(0,j.jsx)(n.NN,{children:r.stok_roti}),(0,j.jsx)(n.NN,{children:r.rasa_roti}),(0,j.jsx)(n.NN,{children:r.harga_satuan_roti}),(0,j.jsx)(n.NN,{children:(0,j.jsxs)(n.b7,{children:[(0,j.jsx)(n.u5,{color:"primary",variant:"outline",className:"ms-2",title:"Edit Data Roti",onClick:()=>{return e=r,localStorage.setItem("lsDataRoti",JSON.stringify({kode_roti:e.kode_roti,nama_roti:e.nama_roti,stok_roti:e.stok_roti,rasa_roti:e.rasa_roti,harga_satuan_roti:e.harga_satuan_roti})),void p("/roti/update");var e},children:(0,j.jsx)(c.Z,{icon:x.C})}),(0,j.jsx)(n.u5,{color:"danger",variant:"outline",className:"ms-2",title:"Hapus Data Roti",onClick:()=>{return e=r,void o().fire({title:"Apakah anda yakin ingin menghapus ".concat(e.kode_roti,"?"),icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Delete"}).then((r=>{r.isConfirmed&&l.Z.delete("https://be-myroti-production.up.railway.app/api/koordinator/dataroti/delete/".concat(e.kode_roti)).then((r=>{o().fire("Deleted!","Your file has been deleted.","success"),window.location.href="/roti"})).catch((r=>{console.error("Error deleting data:",r)}))}));var e},children:(0,j.jsx)(c.Z,{icon:u.N})})]})})]},e)))})]}),(0,j.jsx)(n.rb,{className:"mt-2 mb-2",children:(0,j.jsxs)(n.b7,{md:4,xs:8,children:["Total Rows: ",C.length," Page: ",Z," of ",M]})}),(0,j.jsxs)(n.E7,{activepage:g,pages:Math.ceil(C.length/v),onActivePageChange:_,align:"center",doublearrows:"false",children:[(0,j.jsx)(n.tn,{onClick:()=>!S&&_(g-1),disabled:1===g||S,style:{cursor:S?"default":"pointer"},children:"Prev"}),Array.from({length:Math.ceil(C.length/v)},((r,e)=>{const a=e+1,t=Math.ceil(C.length/v);return a>=g-1&&a<=g+1||t<=3||1===g&&a<=3||g===t&&a>=t-2?(0,j.jsx)(n.tn,{active:a===g,onClick:()=>_(a),style:{cursor:"pointer"},children:a},a):1===a&&g>2||a===t&&g<t-1?(0,j.jsx)(n.tn,{disabled:!0,style:{cursor:"default"},children:"..."},a):null})),(0,j.jsx)(n.tn,{onClick:()=>!S&&_(g+1),disabled:g===Math.ceil(C.length/v)||S,style:{cursor:S?"default":"pointer"},children:"Next"})]})]})]})})})})}},4040:(r,e,a)=>{a.d(e,{C:()=>t});var t=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M345.994,42.019,179.531,208.481A646.3,646.3,0,0,0,25.325,456.521a24.845,24.845,0,0,0,6,25.708l.087.087a24.84,24.84,0,0,0,17.611,7.342,25.172,25.172,0,0,0,8.1-1.344,646.283,646.283,0,0,0,248.04-154.207L471.62,167.646A88.831,88.831,0,0,0,345.994,42.019ZM282.531,311.48A614.445,614.445,0,0,1,60.419,453.221,614.435,614.435,0,0,1,202.158,231.108l99.162-99.161,80.372,80.372ZM448.993,145.019l-44.674,44.673L323.947,109.32l44.674-44.674a56.832,56.832,0,1,1,80.372,80.373Z' class='ci-primary'/>"]},3400:(r,e,a)=>{a.d(e,{j:()=>t});var t=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z' class='ci-primary'/>"]},7256:(r,e,a)=>{a.d(e,{N:()=>t});var t=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z' class='ci-primary'/><rect width='32' height='200' x='168' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='240' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='312' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z' class='ci-primary'/>"]}}]);
//# sourceMappingURL=438.25a592a6.chunk.js.map