import{r as u,_ as l,a as r,F as h,L as i}from"./index-7b8e7deb.js";import{u as n}from"./useGetSpecificUserDetails-b84a5b13.js";function _(t,c){let a=!1;return t==null||t.forEach(s=>{s.userId===c&&(a=!0)}),a}const p=u.lazy(()=>l(()=>import("./ChatUserItem-d737fde5.js"),["assets/ChatUserItem-d737fde5.js","assets/index-7b8e7deb.js","assets/index-cdeacdc0.css","assets/avvvatars-react.esm-547eb0ba.js"])),x=({members:t,chatId:c,currentUser:a,onlineUsers:s})=>{const{getUserDetails:f,usersDetails:e}=n("users");return u.useEffect(()=>{try{const o=t==null?void 0:t.find(d=>d!=a);f(o)}catch(o){console.log(o.message)}},[]),r(h,{children:e&&r(u.Suspense,{fallback:r(i,{}),children:r(p,{...e,currentUser:a,chatId:c,status:_(s,e==null?void 0:e.id)})})})};export{x as default};
