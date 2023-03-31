import{r as f,u as w,z as C,J as v,d as N,o as E,c as H,j as u,a as o,b as I}from"./index-7b8e7deb.js";import{A as V}from"./avvvatars-react.esm-547eb0ba.js";const S=s=>{const[e,t]=f.useState(null),[n,r]=f.useState(null),a=f.useRef(),c=w(y=>y.currentUser.user);async function h(y){try{r(null);const b=await C(v(N,s));let m=[];b.forEach(l=>{const i=l.data();m=[...m,i]});const x=m==null?void 0:m.filter(l=>l.id!==(c==null?void 0:c.id)),g=x==null?void 0:x.find(l=>{var i,d;if((d=(i=l.name)==null?void 0:i.toUpperCase())!=null&&d.includes(y.toUpperCase()))return l});if(g){const l=v(N,"chat"),i=E(l,H("members","array-contains",c==null?void 0:c.id));let d=[];(await C(i)).forEach(p=>{const k=p.data();d=[...d,{...k,chatId:p.id}]}),a.current=!1,d.forEach(p=>{p.members.includes(c.id)&&p.members.includes(g.id)&&(a.current=!0)}),a.current?t([]):t([g])}else t([])}catch(b){r(b.message),t([]),console.log(b.message)}}return{usersList:e,errorValue:n,getUser:h,setUserList:t}},j=({HandleInputValue:s})=>{const e=f.useRef();return u("div",{className:"flex flex-row gap-2 justify-center my-2 items-center mx-2",children:[o("input",{className:"border hover:border-gray-600 outline-none w-auto h-10 px-4 py-1 rounded-sm",type:"text",ref:e,placeholder:"Enter a name to search"}),u("button",{onClick:()=>{var t,n;(t=e.current)!=null&&t.value&&(s((n=e.current)==null?void 0:n.value),e.current.value="")},type:"button",className:"border border-gray-100 hover:border-gray-600 px-4 py-1 rounded-sm bg-blue-300",children:[" ","Search"," "]})]})},q=({id:s,name:e,createChatHandler:t,updateChatListHandler:n})=>{const{createNewChat:r}=I("chat"),a=w(h=>h.currentUser.user);return S("users"),u("div",{className:"border bg-white px-4 py-2 my-2 rounded-md border-gray-2",children:[u("div",{className:"flex items-center gap-6 ",children:[o(V,{value:e,displayValue:e,size:"48",shadow:!0}),o("p",{className:"font-semibold ",children:e})]}),o("button",{onClick:()=>{r(s,a==null?void 0:a.id).then(h=>{t(),n({chatId:h,members:[a==null?void 0:a.id,s]})})},className:"my-1 px-2 py-1 hover:border  border-black",children:"Click here to start new chat"})]})},J=({updateChatListHandler:s})=>{const{usersList:e,getUser:t,setUserList:n}=S("users");return u("div",{className:"flex flex-col items-center ",children:[u("div",{className:"bg-blue-200 w-full py-4 text-center mb-3",children:[o("p",{className:"font-semibold text-md py-1",children:" Create a new chat "})," "]}),o(j,{HandleInputValue:r=>{t(r)}}),e&&e.map(r=>o(q,{...r,createChatHandler:()=>{n(null)},updateChatListHandler:s},r.id)),(e==null?void 0:e.length)===0&&o("p",{children:" No users found. Please try again "})]})};export{J as default};
