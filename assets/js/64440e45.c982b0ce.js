"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[82225],{62757:(e,r,t)=>{t.d(r,{xA:()=>u,yg:()=>m});var i=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);r&&(i=i.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,i,n=function(e,r){if(null==e)return{};var t,i,n={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=i.createContext({}),l=function(e){var r=i.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},u=function(e){var r=l(e.components);return i.createElement(p.Provider,{value:r},e.children)},g="mdxType",c={inlineCode:"code",wrapper:function(e){var r=e.children;return i.createElement(i.Fragment,{},r)}},y=i.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),g=l(t),y=n,m=g["".concat(p,".").concat(y)]||g[y]||c[y]||o;return t?i.createElement(m,a(a({ref:r},u),{},{components:t})):i.createElement(m,a({ref:r},u))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,a=new Array(o);a[0]=y;var s={};for(var p in r)hasOwnProperty.call(r,p)&&(s[p]=r[p]);s.originalType=e,s[g]="string"==typeof e?e:n,a[1]=s;for(var l=2;l<o;l++)a[l]=t[l];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}y.displayName="MDXCreateElement"},15851:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=t(94790),n=(t(67308),t(62757));const o={},a=void 0,s={unversionedId:"api/github.github.listrepositoriesforuser",id:"api/github.github.listrepositoriesforuser",title:"github.github.listrepositoriesforuser",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; listRepositoriesForUser",source:"@site/docs/api/github.github.listrepositoriesforuser.md",sourceDirName:"api",slug:"/api/github.github.listrepositoriesforuser",permalink:"/docs/api/github.github.listrepositoriesforuser",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"GitHub.listRepositoriesForUser() method",id:"githublistrepositoriesforuser-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],u={toc:l},g="wrapper";function c(e){let{components:r,...t}=e;return(0,n.yg)(g,(0,i.A)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github.listrepositoriesforuser"},"listRepositoriesForUser")),(0,n.yg)("h2",{id:"githublistrepositoriesforuser-method"},"GitHub.listRepositoriesForUser() method"),(0,n.yg)("p",null,"List repositories for a user"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"listRepositoriesForUser(props: ListRepositoriesForUserProps): Promise<HttpProxyResponse>;\n")),(0,n.yg)("h2",{id:"parameters"},"Parameters"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"props"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.listrepositoriesforuserprops"},"ListRepositoriesForUserProps")),(0,n.yg)("td",{parentName:"tr",align:null},"props")))),(0,n.yg)("b",null,"Returns:"),(0,n.yg)("p",null,"Promise","<",(0,n.yg)("a",{parentName:"p",href:"/docs/api/lightyear.httpproxyresponse"},"HttpProxyResponse"),">"),(0,n.yg)("h2",{id:"example"},"Example"),(0,n.yg)("p",null,"List public repositories for a user"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "listPublicRepositoriesForUser",\n  title: "List Public Repositories For User",\n  apps: ["github"],\n  variables: ["username"],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.listRepositoriesForUser({\n      username: variables.username!,\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')))}c.isMDXComponent=!0}}]);