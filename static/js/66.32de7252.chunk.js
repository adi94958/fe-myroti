"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[66],{1066:(a,e,l)=>{l.r(e),l.d(e,{default:()=>p});var t=l(2791),s=l(1830),r=l.n(s),n=l(2937),i=l(1087),o=l(5294),c=l(184);const p=()=>{const[a,e]=(0,t.useState)(""),[l,s]=(0,t.useState)([]),[p,m]=(0,t.useState)(""),[d,u]=(0,t.useState)([]),[h,x]=(0,t.useState)(""),[b,j]=(0,t.useState)(!0),[_,g]=(0,t.useState)(!1),[k,f]=(0,t.useState)({nama_lapak:"",no_telp:"",alamat:""});(0,t.useEffect)((()=>{o.Z.get("https://be-myroti-production.up.railway.app/api/area").then((a=>{const e=["--Pilih Kecamatan--",...a.data.map((a=>({label:a.area_distribusi,value:a.area_id})))];s(e)})).catch((a=>{console.error("Error:",a)}))}),[]);return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.xH,{children:(0,c.jsxs)(n.lx,{onSubmit:async e=>{e.preventDefault(),g(!0),console.log(a),console.log(p);const l={nama_lapak:k.nama_lapak,no_telp:k.no_telp,area_id:a,alamat_lapak:k.alamat,id_kurir:p};try{const a=await o.Z.post("https://be-myroti-production.up.railway.app/api/koordinator/lapak/registrasi",l);r().fire({title:"Berhasil",text:"Lapak baru berhasil dibuat.",icon:"success",confirmButtonText:"OK"}).then((e=>{e.isConfirmed&&(window.location.href="/lapak",console.log("Roti created successfully:",a.data))}))}catch(t){if(t.response&&t.response.data&&t.response.data.message){const a=t.response&&t.response.data&&t.response.data.message||t.message||t.toString();x(a)}g(!1)}},children:[(0,c.jsx)(n.bn,{children:"Form Tambah Roti"}),(0,c.jsx)(n.sl,{children:(0,c.jsxs)(n.rb,{children:[(0,c.jsx)(n.b7,{xs:12,children:(0,c.jsx)(n.YR,{className:"mb-3",children:(0,c.jsx)(n.jO,{name:"nama_lapak",placeholder:"Nama Lapak",floatingLabel:"Nama Lapak",value:k.nama_lapak,required:!0,onChange:a=>f({...k,nama_lapak:a.target.value})})})}),(0,c.jsx)(n.b7,{xs:12,children:(0,c.jsx)(n.YR,{className:"mb-3",children:(0,c.jsx)(n.jO,{name:"no_telp",placeholder:"No Telp",floatingLabel:"No Telp",value:k.no_telp,required:!0,onChange:a=>f({...k,no_telp:a.target.value})})})}),(0,c.jsx)(n.b7,{xs:12,children:(0,c.jsx)(n.YR,{className:"mb-3",children:(0,c.jsx)(n.LX,{"aria-label":"Default select example",value:a,onChange:a=>{const l=a.target.value;var t;e(l),j("--Pilih Kecamatan--"===l),"--Pilih Kecamatan--"===l?u([]):(t=l,o.Z.get("https://be-myroti-production.up.railway.app/api/kurir").then((a=>{const e=a.data,l=parseInt(t,10),s=e.filter((a=>a.area_id===l));console.log(t),console.log(s);const r=["--Pilih Kurir--",...s.map((a=>({label:a.nama,value:a.id_kurir})))];u(r)})).catch((a=>{console.error("Error:",a)})))},options:l})})}),(0,c.jsx)(n.b7,{xs:12,children:(0,c.jsx)(n.YR,{className:"mb-3",children:(0,c.jsx)(n.jO,{name:"alamat",placeholder:"Alamat",floatingLabel:"Alamat",value:k.alamat,required:!0,onChange:a=>f({...k,alamat:a.target.value})})})}),(0,c.jsx)(n.b7,{xs:12,children:(0,c.jsx)(n.YR,{className:"mb-3",children:(0,c.jsx)(n.LX,{"aria-label":"Default select example",value:p,onChange:a=>{const e=a.target.value;m(e)},options:d,disabled:b})})})]})}),(0,c.jsxs)(n.Bt,{children:[(0,c.jsxs)(n.rb,{children:[(0,c.jsx)(n.b7,{md:1,children:(0,c.jsx)(i.rU,{to:"/lapak",children:(0,c.jsx)(n.u5,{color:"danger",variant:"outline",className:"ms-2",title:"Back",children:"Back"})})}),(0,c.jsx)(n.b7,{xs:1,children:_?(0,c.jsx)(n.u5,{color:"primary",variant:"outline",type:"submit",disabled:!0,children:(0,c.jsx)(n.LQ,{color:"info",size:"sm"})}):(0,c.jsx)(n.u5,{color:"primary",variant:"outline",type:"submit",children:"Submit"})})]}),(0,c.jsx)(n.rb,{className:"mt-2",children:h&&(0,c.jsx)("p",{className:"error-message alert alert-danger",children:h})})]})]})})})}}}]);
//# sourceMappingURL=66.32de7252.chunk.js.map