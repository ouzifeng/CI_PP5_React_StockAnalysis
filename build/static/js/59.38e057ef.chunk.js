"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[59],{5966:(e,t,i)=>{i.r(t),i.d(t,{default:()=>c});i(2791);var n=i(3623),l=i(8886),a=i(3967),s=i(5527),r=i(697),d=i(890),o=i(184);l.kL.register(l.uw,l.f$,l.jn,l.od,l.Dx,l.u,l.De);const c=e=>{let{dividendYieldData:t}=e;const i=(0,a.Z)();if(!(t&&Object.keys(t).filter((e=>e.startsWith("yield_Y"))).some((e=>null!==t[e]))))return null;const l=Object.keys(t).filter((e=>e.startsWith("yield_Y"))).sort(),c=(new Date).getFullYear(),p={labels:l.map((e=>c-(l.length-parseInt(e.replace("yield_Y",""))))),datasets:[{label:"Dividend Yield",data:l.map((e=>100*parseFloat(t[e]))),borderColor:i.palette.info.main,backgroundColor:i.palette.info.light,fill:!1}]},g={plugins:{title:{display:!0,text:"Dividend Yields Over 5 Years",font:{size:16,weight:"bold"},color:"white",padding:10,backgroundColor:i.palette.info.main,textAlign:"center"},legend:{position:"top"}},responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,ticks:{callback:function(e,t,i){return e.toFixed(2)+"%"}}},x:{}}};return(0,o.jsxs)(s.Z,{elevation:3,children:[(0,o.jsx)(r.Z,{sx:{p:1,bgcolor:i.palette.info.main,textAlign:"center"},children:(0,o.jsx)(d.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"5 Year Dividend Yield"})}),(0,o.jsx)(r.Z,{sx:{paddingTop:i.spacing(1),paddingLeft:i.spacing(2),paddingRight:i.spacing(2)},children:(0,o.jsx)(r.Z,{sx:{height:"300px"},children:(0,o.jsx)(n.x1,{data:p,options:g})})})]})}}}]);
//# sourceMappingURL=59.38e057ef.chunk.js.map