"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[66],{2066:(e,n,t)=>{t.r(n),t.d(n,{default:()=>_});var i=t(2791),r=t(5527),l=t(697),a=t(890),s=t(9281),c=t(9836),o=t(6890),d=t(5855),x=t(3994),m=t(7047),h=t(3382),u=t(4070),j=t(1889),Z=t(4294),f=t(9657),g=t(1025),p=t.n(g),y=t(1224),w=t(1087),v=t(184);const _=e=>{let{incomeStatements:n}=e;const[t,g]=(0,i.useState)("yearly"),[_,b]=(0,i.useState)([]),[k,C]=(0,i.useState)(!1),{isAuthenticated:S}=(0,i.useContext)(y.V);if((0,i.useEffect)((()=>{const e=null===n||void 0===n?void 0:n.filter((e=>e.type.toLowerCase()===t));b(e)}),[n,t]),!_||0===_.length)return(0,v.jsxs)(r.Z,{elevation:3,sx:{margin:"auto",overflow:"hidden"},children:[(0,v.jsx)(l.Z,{sx:{bgcolor:"primary.main",p:1},children:(0,v.jsx)(a.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"Income Statement"})}),(0,v.jsx)(s.Z,{children:(0,v.jsxs)(c.Z,{"aria-label":"Income Statement",size:"small",children:[(0,v.jsx)(o.Z,{children:(0,v.jsx)(d.Z,{children:Array(6).fill(null).map(((e,n)=>(0,v.jsx)(x.Z,{children:(0,v.jsx)(m.Z,{variant:"text",width:100,animation:"wave"})},n)))})}),(0,v.jsx)(h.Z,{children:Array(5).fill(null).map(((e,n)=>(0,v.jsx)(d.Z,{children:Array(6).fill(null).map(((e,n)=>(0,v.jsx)(x.Z,{children:(0,v.jsx)(m.Z,{variant:"text",width:100,animation:"wave"})},n)))},n)))})]})})]});const A=["id","filing_date","currency_symbol","type","general","preferred_stock_and_other_adjustments","discontinued_operations","other_items","non_recurring","extraordinary_items","selling_and_marketing_expenses","minority_interest","effect_of_accounting_charges"],L=Object.keys(_[0]).filter((e=>!A.includes(e)));return(0,v.jsxs)(v.Fragment,{children:[k&&(0,v.jsxs)(u.Z,{severity:"warning",onClose:()=>C(!1),children:["Please ",(0,v.jsx)(w.rU,{to:"/login",children:"login"})," to download the income statements."]}),(0,v.jsxs)(j.ZP,{container:!0,spacing:1,children:[(0,v.jsx)(j.ZP,{item:!0,children:(0,v.jsx)(Z.Z,{variant:"yearly"===t?"contained":"outlined",onClick:()=>g("yearly"),sx:{margin:1},children:"Yearly"})}),(0,v.jsx)(j.ZP,{item:!0,children:(0,v.jsx)(Z.Z,{variant:"quarterly"===t?"contained":"outlined",onClick:()=>g("quarterly"),sx:{margin:1},children:"Quarterly"})}),(0,v.jsx)(j.ZP,{item:!0,children:(0,v.jsx)(Z.Z,{variant:"outlined",onClick:()=>{if(S){if(_.length>0){const e=p().unparse(_),n=new Blob([e],{type:"text/csv"}),t=window.URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download="income_statements.csv",i.click(),window.URL.revokeObjectURL(t)}}else C(!0)},sx:{margin:1},startIcon:(0,v.jsx)(f.Z,{}),children:"Download CSV"})})]}),(0,v.jsxs)(r.Z,{elevation:3,sx:{margin:"auto",overflow:"hidden"},children:[(0,v.jsx)(l.Z,{sx:{bgcolor:"primary.main",p:1},children:(0,v.jsx)(a.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"Income Statement"})}),(0,v.jsx)(s.Z,{children:(0,v.jsxs)(c.Z,{"aria-label":"Income Statement",size:"small",children:[(0,v.jsx)(o.Z,{children:(0,v.jsx)(d.Z,{children:L.map(((e,n)=>(0,v.jsx)(x.Z,{sx:{fontWeight:"bold"},className:"MuiTableCell-sizeSmall",children:e.replace(/_/g," ").toUpperCase()},n)))})}),(0,v.jsx)(h.Z,{children:_.map(((e,n)=>(0,v.jsx)(d.Z,{children:L.map((t=>((e,n,t)=>{if(A.includes(n))return null;if("date"===n)return(0,v.jsx)(x.Z,{children:t},"".concat(e,"-").concat(n));const i="number"===typeof t?t:parseFloat(t),r=isNaN(i)?t:i.toLocaleString();return(0,v.jsx)(x.Z,{children:r},"".concat(e,"-").concat(n))})(n,t,e[t])))},"row-".concat(n))))})]})})]})]})}}}]);
//# sourceMappingURL=66.c1a0146d.chunk.js.map