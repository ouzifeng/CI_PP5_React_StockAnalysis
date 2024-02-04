"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[437],{3437:(e,n,t)=>{t.r(n),t.d(n,{default:()=>b});var r=t(2791),i=t(5527),l=t(697),a=t(890),s=t(9281),c=t(9836),o=t(6890),d=t(5855),h=t(3994),x=t(7047),u=t(3382),j=t(4070),m=t(1889),Z=t(4294),f=t(9657),g=t(1025),p=t.n(g),y=t(1224),v=t(1087),w=t(184);const b=e=>{let{balanceSheets:n}=e;const[t,g]=(0,r.useState)("yearly"),[b,_]=(0,r.useState)([]),[k,C]=(0,r.useState)(!1),{isAuthenticated:S}=(0,r.useContext)(y.V);if((0,r.useEffect)((()=>{const e=null===n||void 0===n?void 0:n.filter((e=>e.type.toLowerCase()===t));_(e)}),[n,t]),!b||0===b.length)return(0,w.jsxs)(i.Z,{elevation:3,sx:{margin:"auto",overflow:"hidden"},children:[(0,w.jsx)(l.Z,{sx:{bgcolor:"primary.main",p:1},children:(0,w.jsx)(a.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"Balance Sheet"})}),(0,w.jsx)(s.Z,{children:(0,w.jsxs)(c.Z,{"aria-label":"Balance Sheet",size:"small",children:[(0,w.jsx)(o.Z,{children:(0,w.jsx)(d.Z,{children:Array(6).fill(null).map(((e,n)=>(0,w.jsx)(h.Z,{children:(0,w.jsx)(x.Z,{variant:"text",width:100,animation:"wave"})},n)))})}),(0,w.jsx)(u.Z,{children:Array(5).fill(null).map(((e,n)=>(0,w.jsx)(d.Z,{children:Array(6).fill(null).map(((e,n)=>(0,w.jsx)(h.Z,{children:(0,w.jsx)(x.Z,{variant:"text",width:100,animation:"wave"})},n)))},n)))})]})})]});const A=["id","filing_date","currency_symbol","type","general","preferred_stock_and_other_adjustments","discontinued_operations","other_items","non_recurring","extraordinary_items","selling_and_marketing_expenses","minority_interest","effect_of_accounting_charges"],L=Object.keys(b[0]).filter((e=>!A.includes(e)));return(0,w.jsxs)(w.Fragment,{children:[k&&(0,w.jsxs)(j.Z,{severity:"warning",onClose:()=>C(!1),children:["Please ",(0,w.jsx)(v.rU,{to:"/login",children:"login"})," to download the balance sheets."]}),(0,w.jsxs)(m.ZP,{container:!0,spacing:1,children:[(0,w.jsx)(m.ZP,{item:!0,children:(0,w.jsx)(Z.Z,{variant:"yearly"===t?"contained":"outlined",onClick:()=>g("yearly"),sx:{margin:1},children:"Yearly"})}),(0,w.jsx)(m.ZP,{item:!0,children:(0,w.jsx)(Z.Z,{variant:"quarterly"===t?"contained":"outlined",onClick:()=>g("quarterly"),sx:{margin:1},children:"Quarterly"})}),(0,w.jsx)(m.ZP,{item:!0,children:(0,w.jsx)(Z.Z,{variant:"outlined",onClick:()=>{if(S){if(b.length>0){const e=p().unparse(b),n=new Blob([e],{type:"text/csv"}),t=window.URL.createObjectURL(n),r=document.createElement("a");r.href=t,r.download="balance_sheets.csv",r.click(),window.URL.revokeObjectURL(t)}}else C(!0)},sx:{margin:1},startIcon:(0,w.jsx)(f.Z,{}),children:"Download CSV"})})]}),(0,w.jsxs)(i.Z,{elevation:3,sx:{margin:"auto",overflow:"hidden"},children:[(0,w.jsx)(l.Z,{sx:{bgcolor:"primary.main",p:1},children:(0,w.jsx)(a.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"Balance Sheet"})}),(0,w.jsx)(s.Z,{children:(0,w.jsxs)(c.Z,{"aria-label":"Balance Sheet",size:"small",children:[(0,w.jsx)(o.Z,{children:(0,w.jsx)(d.Z,{children:L.map(((e,n)=>(0,w.jsx)(h.Z,{sx:{fontWeight:"bold"},className:"MuiTableCell-sizeSmall",children:e.replace(/_/g," ").toUpperCase()},n)))})}),(0,w.jsx)(u.Z,{children:b.map(((e,n)=>(0,w.jsx)(d.Z,{children:L.map((t=>((e,n,t)=>{if(A.includes(n))return null;if("date"===n)return(0,w.jsx)(h.Z,{children:t},"".concat(e,"-").concat(n));const r="number"===typeof t?t:parseFloat(t),i=isNaN(r)?t:r.toLocaleString();return(0,w.jsx)(h.Z,{children:i},"".concat(e,"-").concat(n))})(n,t,e[t])))},n)))})]})})]})]})}}}]);
//# sourceMappingURL=437.f954c978.chunk.js.map