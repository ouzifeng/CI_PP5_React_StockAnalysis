"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[486],{6486:(e,i,n)=>{n.r(i),n.d(i,{default:()=>b});var t=n(2791),a=n(3994),s=n(5527),r=n(697),l=n(890),c=n(9281),o=n(9836),h=n(6890),d=n(5855),_=n(7047),x=n(3382),m=n(4070),g=n(1889),f=n(4294),j=n(9657),p=n(1025),w=n.n(p),u=n(1224),Z=n(1087),v=n(184);const b=e=>{let{cashFlows:i}=e;const[n,p]=(0,t.useState)("yearly"),[b,y]=(0,t.useState)([]),[k,C]=(0,t.useState)(!1),{isAuthenticated:A}=(0,t.useContext)(u.V);(0,t.useEffect)((()=>{const e=null===i||void 0===i?void 0:i.filter((e=>e.type.toLowerCase()===n));y(e)}),[i,n]);const F=e=>e.replace(/_/g," ").split(" ").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join(" "),L=["net_income","depreciation","other_non_cash_items","stock_based_compensation","change_in_working_capital","change_to_account_receivables","change_to_inventory","change_to_liabilities","change_to_operating_activities","change_to_netincome","capital_expenditures","cash_flows_other_operating","total_cash_from_operating_activities","investments","other_cashflows_from_investing_activities","total_cashflows_from_investing_activities","dividends_paid","sale_purchase_of_stock","issuance_of_capital_stock","net_borrowings","other_cashflows_from_financing_activities","total_cash_from_financing_activities","exchange_rate_changes","cash_and_cash_equivalents_changes","change_in_cash","begin_period_cash_flow","end_period_cash_flow","free_cash_flow"].map((e=>{const i={metric:F(e)};return b.forEach((n=>{i[n.date]=n[e]})),i}));return b&&0!==b.length?(0,v.jsxs)(v.Fragment,{children:[k&&(0,v.jsxs)(m.Z,{severity:"warning",onClose:()=>C(!1),children:["Please ",(0,v.jsx)(Z.rU,{to:"/login",children:"login"})," to download the cash flows."]}),(0,v.jsxs)(g.ZP,{container:!0,spacing:1,children:[(0,v.jsx)(g.ZP,{item:!0,children:(0,v.jsx)(f.Z,{variant:"yearly"===n?"contained":"outlined",onClick:()=>p("yearly"),sx:{margin:1},children:"Yearly"})}),(0,v.jsx)(g.ZP,{item:!0,children:(0,v.jsx)(f.Z,{variant:"quarterly"===n?"contained":"outlined",onClick:()=>p("quarterly"),sx:{margin:1},children:"Quarterly"})}),(0,v.jsx)(g.ZP,{item:!0,children:(0,v.jsx)(f.Z,{variant:"outlined",onClick:()=>{if(A){if(b.length>0){const e=w().unparse(b),i=new Blob([e],{type:"text/csv"}),n=window.URL.createObjectURL(i),t=document.createElement("a");t.href=n,t.download="cash_flows.csv",t.click(),window.URL.revokeObjectURL(n)}}else C(!0)},sx:{margin:1},startIcon:(0,v.jsx)(j.Z,{}),children:"Download CSV"})})]}),(0,v.jsxs)(s.Z,{elevation:3,sx:{margin:"auto",overflow:"hidden"},children:[(0,v.jsx)(r.Z,{sx:{bgcolor:"primary.main",p:1},children:(0,v.jsx)(l.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"Cash Flow"})}),(0,v.jsx)(c.Z,{children:(0,v.jsxs)(o.Z,{"aria-label":"Cash Flow",size:"small",children:[(0,v.jsx)(h.Z,{children:(0,v.jsxs)(d.Z,{children:[(0,v.jsx)(a.Z,{sx:{fontWeight:"bold"},children:"Metric"}),b.map(((e,i)=>(0,v.jsx)(a.Z,{align:"right",sx:{fontWeight:"bold"},children:e.date},i)))]})}),(0,v.jsx)(x.Z,{children:L.map(((e,i)=>(0,v.jsxs)(d.Z,{children:[(0,v.jsx)(a.Z,{component:"th",scope:"row",sx:{fontWeight:"bold"},children:e.metric}),Object.keys(e).filter((e=>"metric"!==e)).map((i=>((e,i)=>{const n=e[i],t="number"===typeof n?n:parseFloat(n),s=isNaN(t)?n:t.toLocaleString();return(0,v.jsx)(a.Z,{children:s},i)})(e,i)))]},i)))})]})})]})]}):(0,v.jsxs)(s.Z,{elevation:3,sx:{margin:"auto",overflow:"hidden"},children:[(0,v.jsx)(r.Z,{sx:{bgcolor:"primary.main",p:1},children:(0,v.jsx)(l.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"Cash Flow"})}),(0,v.jsx)(c.Z,{children:(0,v.jsxs)(o.Z,{"aria-label":"Cash Flow",size:"small",children:[(0,v.jsx)(h.Z,{children:(0,v.jsx)(d.Z,{children:Array(6).fill(null).map(((e,i)=>(0,v.jsx)(a.Z,{children:(0,v.jsx)(_.Z,{variant:"text",width:100,animation:"wave"})},i)))})}),(0,v.jsx)(x.Z,{children:Array(5).fill(null).map(((e,i)=>(0,v.jsx)(d.Z,{children:Array(6).fill(null).map(((e,i)=>(0,v.jsx)(a.Z,{children:(0,v.jsx)(_.Z,{variant:"text",width:100,animation:"wave"})},i)))},i)))})]})})]})}}}]);
//# sourceMappingURL=486.065b520a.chunk.js.map