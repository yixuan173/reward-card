const e=(r,t)=>{if(!(r!=null&&r.buffer)||!(r.buffer instanceof ArrayBuffer))return t||"";const f=new Blob([r.buffer],{type:r.type});return URL.createObjectURL(f)};export{e as g};
