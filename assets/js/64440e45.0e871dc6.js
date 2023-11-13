"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[83192],{57522:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>b});var i=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},o=Object.keys(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=i.createContext({}),l=function(e){var t=i.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=l(e.components);return i.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=l(r),b=n,f=m["".concat(p,".").concat(b)]||m[b]||c[b]||o;return r?i.createElement(f,a(a({ref:t},u),{},{components:r})):i.createElement(f,a({ref:t},u))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,a=new Array(o);a[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,a[1]=s;for(var l=2;l<o;l++)a[l]=r[l];return i.createElement.apply(null,a)}return i.createElement.apply(null,r)}m.displayName="MDXCreateElement"},33837:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=r(14090),n=(r(29901),r(57522));const o={},a=void 0,s={unversionedId:"api/github.github.listrepositoriesforuser",id:"api/github.github.listrepositoriesforuser",title:"github.github.listrepositoriesforuser",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; listRepositoriesForUser",source:"@site/docs/api/github.github.listrepositoriesforuser.md",sourceDirName:"api",slug:"/api/github.github.listrepositoriesforuser",permalink:"/docs/api/github.github.listrepositoriesforuser",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"GitHub.listRepositoriesForUser() method",id:"githublistrepositoriesforuser-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],u={toc:l};function c(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.github.listrepositoriesforuser"},"listRepositoriesForUser")),(0,n.kt)("h2",{id:"githublistrepositoriesforuser-method"},"GitHub.listRepositoriesForUser() method"),(0,n.kt)("p",null,"List repositories for a user"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"listRepositoriesForUser(props: ListRepositoriesForUserProps): Promise<HttpProxyResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.listrepositoriesforuserprops"},"ListRepositoriesForUserProps")),(0,n.kt)("td",{parentName:"tr",align:null},"props")))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/lightyear.httpproxyresponse"},"HttpProxyResponse"),">"),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("p",null,"List public repositories for a user"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "listPublicRepositoriesForUser",\n  title: "List Public Repositories For User",\n  apps: ["github"],\n  variables: ["username"],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.listRepositoriesForUser({\n      username: variables.username!,\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')))}c.isMDXComponent=!0}}]);