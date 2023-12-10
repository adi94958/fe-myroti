"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[714],{714:(a,e,i)=>{i.r(e),i.d(e,{default:()=>u});var r=i(2791),t=i(5294),s=i(7689),n=i(1830),o=i.n(n),l=i(2937),c=i(9746),d=i(7256),m=i(4846),h=i(184);const u=()=>{const[a,e]=(0,r.useState)([]),[i,n]=(0,r.useState)(""),[u,x]=(0,r.useState)(!1),j=(0,s.s0)(),[p,_]=(0,r.useState)([]),[k,g]=(0,r.useState)(!1),[f,N]=(0,r.useState)({tanggal:(new Date).toLocaleDateString(),kode_lapak:"",nama_lapak:"",nama_kurir:""}),[b,y]=(0,r.useState)([]);(0,r.useEffect)((()=>{(async()=>{try{const a=JSON.parse(localStorage.getItem("dataTransaksi"));N({...f,kode_lapak:a.kode_lapak,nama_lapak:a.nama_lapak,nama_kurir:a.nama_kurir});const i=await t.Z.get("https://be-myroti-production.up.railway.app/api/rekomendasi");console.log("Rekomendasi",i.data);const r=i.data.filter((e=>e.kode_lapak===a.kode_lapak)).map((a=>({kode_lapak:a.kode_lapak,kode_roti:a.kode_roti,jumlah_roti_transaksi:a.jumlah_roti_transaksi,jumlah_roti_rotibasi:a.jumlah_roti_rotibasi,calculated_value:a.calculated_value})));console.log("data filter",r),_(r);const s=(await t.Z.get("https://be-myroti-production.up.railway.app/api/koordinator/dataroti")).data.map((a=>({kode_roti:a.kode_roti,nama_roti:a.nama_roti,stok_roti:a.stok_roti,rasa_roti:a.rasa_roti,harga_satuan_roti:a.harga_satuan_roti,jumlah_roti_dikirim:0})));if(r.length>0){const a=s.map((a=>{const e=r.find((e=>e.kode_roti===a.kode_roti));return e?{...a,jumlah_roti_dikirim:e.calculated_value}:a}));e(a)}else{(function(a){for(let e=a.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[a[e],a[i]]=[a[i],a[e]]}return a})(Array.from({length:s.length},((a,e)=>e))).slice(0,10).forEach((a=>{s[a].jumlah_roti_dikirim=5})),e(s)}}catch(a){console.error("Error fetching data:",a)}})()}),[]);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.xH,{children:(0,h.jsxs)(l.lx,{onSubmit:async a=>{a.preventDefault();const e=b.filter((a=>a.jumlah_roti>0));if(0===e.length){return void o().mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:a=>{a.onmouseenter=o().stopTimer,a.onmouseleave=o().resumeTimer}}).fire({icon:"warning",title:"Silakan untuk memilih roti yang akan di kirim!"})}x(!0);const i={kode_roti:e.map((a=>a.kode_roti.toString())),jumlah_roti:e.map((a=>a.jumlah_roti))};t.Z.post("https://be-myroti-production.up.railway.app/api/koordinator/transaksi/create/".concat(f.kode_lapak),i),o().fire({title:"Berhasil",text:"Berhasil melakukan pengiriman",icon:"success",confirmButtonText:"OK"}).then((a=>{a.isConfirmed&&(window.location.href="/pengiriman/kelola")})).then((a=>{console.log("Cart sent successfully",a.data),localStorage.removeItem("dataTransaksi"),j("/pengiriman/kelola")})).catch((a=>{console.error("Error sending cart data",a)}))},children:[(0,h.jsx)(l.bn,{children:"Form Pengiriman"}),(0,h.jsxs)(l.sl,{children:[(0,h.jsxs)(l.xH,{children:[(0,h.jsx)(l.bn,{children:"Data Lapak"}),(0,h.jsx)(l.sl,{children:(0,h.jsxs)(l.rb,{children:[(0,h.jsx)(l.b7,{xs:12,children:(0,h.jsx)(l.YR,{className:"mb-3",children:(0,h.jsx)(l.jO,{name:"tanggal",floatingLabel:"Tanggal",value:f.tanggal,disabled:!0})})}),(0,h.jsx)(l.b7,{xs:12,children:(0,h.jsx)(l.YR,{className:"mb-3",children:(0,h.jsx)(l.jO,{name:"nama_lapak",placeholder:"Nama Lapak",floatingLabel:"Nama Lapak",value:f.nama_lapak,disabled:!0})})}),(0,h.jsx)(l.b7,{xs:12,children:(0,h.jsx)(l.YR,{className:"mb-3",children:(0,h.jsx)(l.jO,{name:"nama_kurir",placeholder:"Nama Kurir",floatingLabel:"Nama Kurir",value:f.nama_kurir,disabled:!0})})}),(0,h.jsx)(l.b7,{xs:12,children:(0,h.jsx)(l.YR,{className:"mb-3",children:(0,h.jsx)(l.PB,{name:"catatan_penjual",placeholder:"Catatan Penjual",floatingLabel:"Catatan Penjual",value:f.nama_kurir,disabled:!0})})})]})})]}),(0,h.jsxs)(l.xH,{className:"mt-4",children:[(0,h.jsx)(l.bn,{children:"Data Roti"}),(0,h.jsxs)(l.sl,{children:[(0,h.jsx)(l.rb,{children:(0,h.jsx)(l.b7,{md:8,xs:6,className:"mb-3",children:(0,h.jsxs)(l.u5,{variant:"outline",onClick:async()=>{g(!0)},children:[(0,h.jsx)(m.Z,{icon:c.S,className:"mx-8 me-2"}),"Pilih Roti"]})})}),(0,h.jsxs)(l.Sx,{striped:!0,bordered:!0,responsive:!0,children:[(0,h.jsx)(l.V,{children:(0,h.jsxs)(l.T6,{children:[(0,h.jsx)(l.is,{children:"No."}),(0,h.jsx)(l.is,{children:"Nama Roti"}),(0,h.jsx)(l.is,{children:"Rasa Roti"}),(0,h.jsx)(l.is,{children:"Jumlah Roti"}),(0,h.jsx)(l.is,{children:"Harga Satuan"}),(0,h.jsx)(l.is,{children:"Aksi"})]})}),(0,h.jsx)(l.NR,{children:0===b.length?(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:"7",className:"text-center",children:"Tidak ada data."})}):b.map(((a,e)=>(0,h.jsxs)(l.T6,{children:[(0,h.jsx)(l.NN,{children:e+1}),(0,h.jsx)(l.NN,{children:a.nama_roti}),(0,h.jsx)(l.NN,{children:a.rasa_roti}),(0,h.jsx)(l.NN,{children:a.jumlah_roti_dikirim}),(0,h.jsx)(l.NN,{children:a.harga_satuan_roti}),(0,h.jsx)(l.NN,{children:(0,h.jsx)(l.b7,{children:(0,h.jsx)(l.u5,{color:"danger",variant:"outline",className:"ms-2",title:"Hapus Data Roti",onClick:()=>((a,e)=>{o().fire({title:"Apakah anda yakin ingin menghapus ".concat(a.nama_roti,"?"),icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Delete"}).then((a=>{if(a.isConfirmed){const a=[...b];a.splice(e,1),y(a),o().fire("Deleted!","Your file has been deleted.","success")}}))})(a,e),children:(0,h.jsx)(m.Z,{icon:d.N})})})})]},e)))})]})]})]})]}),(0,h.jsxs)(l.Bt,{children:[(0,h.jsxs)(l.rb,{children:[(0,h.jsx)(l.b7,{md:1,children:(0,h.jsx)(l.u5,{color:"danger",variant:"outline",className:"ms-2",title:"Back",onClick:function(){localStorage.removeItem("dataTransaksi"),j("/pengiriman/kelola")},children:"Back"})}),(0,h.jsx)(l.b7,{xs:1,children:u?(0,h.jsx)(l.u5,{color:"primary",variant:"outline",type:"submit",disabled:!0,children:(0,h.jsx)(l.LQ,{color:"info",size:"sm"})}):(0,h.jsx)(l.u5,{color:"primary",variant:"outline",type:"submit",children:"Submit"})})]}),(0,h.jsx)(l.rb,{className:"mt-2",children:i&&(0,h.jsx)("p",{className:"error-message alert alert-danger",children:i})})]})]})}),(0,h.jsxs)(l.Tk,{backdrop:"static",visible:k,className:"modal-lg",onClose:()=>{g(!1),n(""),x(!1)},children:[(0,h.jsx)(l.p0,{closeButton:!0,children:(0,h.jsx)(l.fl,{children:"Pilih Roti"})}),(0,h.jsx)(l.sD,{children:(0,h.jsxs)(l.Sx,{striped:!0,bordered:!0,responsive:!0,children:[(0,h.jsx)(l.V,{children:(0,h.jsxs)(l.T6,{children:[(0,h.jsx)(l.is,{children:"No"}),(0,h.jsx)(l.is,{children:"Nama Roti"}),(0,h.jsx)(l.is,{children:"Stok Roti"}),(0,h.jsx)(l.is,{children:"Rasa Roti"}),(0,h.jsx)(l.is,{children:"Harga Satuan"}),(0,h.jsx)(l.is,{children:"Jumlah Roti"})]})}),(0,h.jsx)(l.NR,{children:0===a.length?(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:"6",className:"text-center",children:"Tidak ada data."})}):a.map(((a,i)=>(0,h.jsxs)(l.T6,{children:[(0,h.jsx)(l.NN,{children:i+1}),(0,h.jsx)(l.NN,{children:a.nama_roti}),(0,h.jsx)(l.NN,{children:a.stok_roti}),(0,h.jsx)(l.NN,{children:a.rasa_roti}),(0,h.jsx)(l.NN,{children:a.harga_satuan_roti}),(0,h.jsx)(l.NN,{children:(0,h.jsx)(l.lx,{children:(0,h.jsx)(l.jO,{size:"sm",name:"jumlah_roti",value:a.jumlah_roti_dikirim,onChange:i=>((a,i)=>{const r=i.target.value,t=""!==r?parseInt(r,10):0;e((e=>{const i=e.map((e=>e.kode_roti===a.kode_roti?{...e,jumlah_roti_dikirim:t}:e));return console.log("newData",i),i}))})(a,i),required:!0})})})]},i)))})]})}),(0,h.jsxs)(l.Ym,{children:[(0,h.jsx)(l.u5,{color:"secondary",onClick:()=>{g(!1),x(!1)},children:"Close"}),u?(0,h.jsx)(l.u5,{color:"primary",disabled:!0,children:(0,h.jsx)(l.LQ,{color:"info",size:"sm"})}):(0,h.jsx)(l.u5,{color:"primary",onClick:()=>{const e=a.every((a=>a.jumlah_roti_dikirim<=a.stok_roti));if(console.log(e),e){const e=a.filter((a=>a.jumlah_roti_dikirim>0));console.log("newDataArray :",e),y(e),g(!1),j("/pengiriman/kelola/kirim");o().mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:a=>{a.onmouseenter=o().stopTimer,a.onmouseleave=o().resumeTimer}}).fire({icon:"success",title:"Berhasil Pilih Roti"})}else{o().mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:5e3,timerProgressBar:!0,didOpen:a=>{a.onmouseenter=o().stopTimer,a.onmouseleave=o().resumeTimer}}).fire({icon:"warning",title:"Mohon maaf! Ada jumlah roti yang melebihi stok yang tersedia."})}},children:"Selesai"})]})]})]})}},7256:(a,e,i)=>{i.d(e,{N:()=>r});var r=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z' class='ci-primary'/><rect width='32' height='200' x='168' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='240' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='312' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z' class='ci-primary'/>"]}}]);
//# sourceMappingURL=714.01be97e5.chunk.js.map