"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[569],{2569:(e,a,l)=>{l.r(a),l.d(a,{default:()=>u});l(2791);var r=l(890),t=l(1677),n=l(697),o=l(5527),i=l(3967),s=l(7047),c=l(184);const u=e=>{let{ratings:a}=e;const l=(0,i.Z)(),u=(e=>{const a={strong_buy:5,buy:4,hold:3,sell:2,strong_sell:1},l=Object.keys(a),r=l.reduce(((l,r)=>{const t=e[r];return"number"!==typeof t?(console.error("Invalid rating count for ".concat(r,":"),t),l):l+a[r]*t}),0),t=l.reduce(((a,l)=>a+e[l]),0);return 0===t?(console.error("Total number of analysts is zero."),"N/A"):(r/t).toFixed(1)})(a),d=["strong_buy","buy","hold","sell","strong_sell"].reduce(((e,l)=>e+a[l]),0);return(0,c.jsxs)(o.Z,{elevation:3,sx:{mb:3,overflow:"hidden"},children:[(0,c.jsx)(n.Z,{sx:{p:1,bgcolor:l.palette.primary.main,textAlign:"center"},children:(0,c.jsx)(r.Z,{variant:"subtitle1",sx:{color:"common.white",textAlign:"center"},children:"Average Analyst Rating"})}),(0,c.jsxs)(n.Z,{sx:{p:2},children:[a?(0,c.jsx)(t.ZP,{value:parseFloat(u),"aria-labelledby":"analyst-rating-slider",valueLabelDisplay:"auto",step:.1,marks:[{value:1,label:"Strong Sell"},{value:2,label:"Sell"},{value:3,label:"Hold"},{value:4,label:"Buy"},{value:5,label:"Strong Buy"}],min:1,max:5,disabled:!0,sx:{color:l.palette.primary.main,"& .MuiSlider-thumb":{backgroundColor:l.palette.common.white},"& .MuiSlider-markLabel":{color:l.palette.text.primary,fontSize:"12px",whiteSpace:"normal",display:"block"},"& .MuiSlider-valueLabel":{backgroundColor:"transparent",color:l.palette.primary.main,"& *":{background:"transparent",color:l.palette.primary.main}}}}):(0,c.jsx)(s.Z,{animation:"wave",height:20,width:200}),(0,c.jsx)(r.Z,{variant:"body2",align:"center",color:"primary",sx:{mt:2,fontSize:"14px"},children:a?"Overall Rating: ".concat("N/A"!==u?parseFloat(u).toFixed(1):"N/A"," based on ").concat(d," opinions"):(0,c.jsx)(s.Z,{animation:"wave",height:20,width:300})})]})]})}}}]);
//# sourceMappingURL=569.4fa0782d.chunk.js.map