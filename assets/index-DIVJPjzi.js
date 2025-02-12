import{f as c,j as e,c as d,a as F,d as S,o as C,r as u,l as M,e as O,I as h,L as z}from"./index-MtHr8zwo.js";import{H}from"./Header-NSphvrS_.js";import{d as B,I as U,a as $,M as W,S as r,g as Y}from"./indexedDB-VbUPTGWN.js";import{u as G,g as V}from"./getImageUrl-D1gqjwtB.js";function X(t,n){const s={},l={};for(const[i,o]of Object.entries(t))n.includes(i)?s[i]=o:l[i]=o;return[s,l]}const y=c(function(n,s){const{children:l,placeholder:i,className:o,...a}=n;return e.jsxs(d.select,{...a,ref:s,className:F("chakra-select",o),children:[i&&e.jsx("option",{value:"",children:i}),l]})});y.displayName="SelectField";const T=c((t,n)=>{var f;const s=S("Select",t),{rootProps:l,placeholder:i,icon:o,color:a,height:m,h:P,minH:A,minHeight:E,iconColor:p,iconSize:x,...L}=C(t),[w,k]=X(L,M),g=G(k),R={width:"100%",height:"fit-content",position:"relative",color:a},D={paddingEnd:"2rem",...s.field,_focus:{zIndex:"unset",...(f=s.field)==null?void 0:f._focus}};return e.jsxs(d.div,{className:"chakra-select__wrapper",__css:R,...w,...l,children:[e.jsx(y,{ref:n,height:P??m,minH:A??E,placeholder:i,...g,__css:D,children:t.children}),e.jsx(_,{"data-disabled":B(g.disabled),...(p||a)&&{color:p||a},__css:s.icon,...x&&{fontSize:x},children:o})]})});T.displayName="Select";const q=t=>e.jsx("svg",{viewBox:"0 0 24 24",...t,children:e.jsx("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})}),J=d("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),_=t=>{const{children:n=e.jsx(q,{}),...s}=t,l=u.cloneElement(n,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return e.jsx(J,{...s,className:"chakra-select__icon-wrapper",children:u.isValidElement(n)?l:null})};_.displayName="SelectIcon";const[K,N]=O({name:"TagStylesContext",errorMessage:`useTagStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tag />" `}),v=c((t,n)=>{const s=S("Tag",t),l=C(t),i={display:"inline-flex",verticalAlign:"top",alignItems:"center",maxWidth:"100%",...s.container};return e.jsx(K,{value:s,children:e.jsx(d.span,{ref:n,...l,__css:i})})});v.displayName="Tag";const I=c((t,n)=>{const s=N();return e.jsx(d.span,{ref:n,noOfLines:1,...t,__css:s.label})});I.displayName="TagLabel";const Q=c((t,n)=>e.jsx(h,{ref:n,verticalAlign:"top",marginEnd:"0.5rem",...t}));Q.displayName="TagLeftIcon";const Z=c((t,n)=>e.jsx(h,{ref:n,verticalAlign:"top",marginStart:"0.5rem",...t}));Z.displayName="TagRightIcon";const b=t=>e.jsx(h,{verticalAlign:"inherit",viewBox:"0 0 512 512",...t,children:e.jsx("path",{fill:"currentColor",d:"M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"})});b.displayName="TagCloseIcon";const ee=c((t,n)=>{const{isDisabled:s,children:l,...i}=t,a={display:"flex",alignItems:"center",justifyContent:"center",outline:"0",...N().closeButton};return e.jsx(d.button,{ref:n,"aria-label":"close",...i,type:"button",disabled:s,__css:a,children:l||e.jsx(b,{})})});ee.displayName="TagCloseButton";const te=`${$}/card.webp`,se=t=>{const{id:n,title:s,currentPoints:l,cardImage:i}=t,[o,a]=u.useState(!0),m=()=>{setTimeout(()=>{a(!1)},500)};return e.jsx(z,{to:`/${n}`,children:e.jsxs("div",{className:"w-full relative flex flex-col items-center",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:`absolute top-0 left-0 w-full h-64 bg-pink-200 animate-pulse ${o?"block":"hidden"}`}),e.jsx(U,{src:V(i,te),alt:s,objectFit:"cover",className:`w-full h-64 ${o?"opacity-0":"opacity-100"}`,onLoad:m})]}),e.jsx("h2",{className:"text-2xl font-bold text-pink-600",children:s}),e.jsx(v,{size:"lg",colorScheme:"red",borderRadius:"full",className:"absolute -top-3 -right-3",children:e.jsx(I,{children:l})})]})},n)},j=(t,n)=>{const s=typeof t=="string"?t:t.target.value,i={timeASC:(o,a)=>o.create-a.create,timeDESC:(o,a)=>a.create-o.create,totalPointsASC:(o,a)=>o.totalPoints-a.totalPoints,totalPointsDESC:(o,a)=>a.totalPoints-o.totalPoints,currentPointsASC:(o,a)=>o.currentPoints-a.currentPoints,currentPointsDESC:(o,a)=>a.currentPoints-o.currentPoints}[s];return i?[...n].sort(i):n},ie=()=>{const[t,n]=u.useState([]);return u.useEffect(()=>{(async()=>{const l=await Y();n(j(r.TIME_ASC,l))})()},[]),e.jsxs("div",{className:"flex flex-col items-center h-screen mb-12",children:[e.jsx(H,{}),e.jsxs("section",{className:"mt-12 w-full px-6 pb-8 max-w-lg",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("span",{className:"font-bold text-pink-600 text-lg",children:["卡片數量：",t.length," / ",W]}),e.jsxs(T,{size:"sm",width:"150px",bg:"white",borderColor:"pink.300",onChange:s=>n(j(s,t)),children:[e.jsx("option",{value:r.TIME_ASC,defaultChecked:!0,children:"建立時間遠到近"}),e.jsx("option",{value:r.TIME_DESC,children:"建立時間近到遠"}),e.jsx("option",{value:r.TOTAL_POINTS_ASC,children:"總點數小到大"}),e.jsx("option",{value:r.TOTAL_POINTS_DESC,children:"總點數大到小"}),e.jsx("option",{value:r.CURRENT_POINTS_ASC,children:"獲得點數小到大"}),e.jsx("option",{value:r.CURRENT_POINTS_DESC,children:"獲得點數大到小"})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-8 mt-4",children:t.map(({id:s,title:l,currentPoints:i,cardImage:o})=>e.jsx(se,{id:s,title:l,currentPoints:i,cardImage:o},s))})]})]})};export{ie as default};
