"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4335],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>h});var o=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,o,a=function(e,t){if(null==e)return{};var r,o,a={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=o.createContext({}),s=function(e){var t=o.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},l=function(e){var t=s(e.components);return o.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},b=o.forwardRef((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,u=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),b=s(r),h=a,d=b["".concat(u,".").concat(h)]||b[h]||c[h]||n;return r?o.createElement(d,p(p({ref:t},l),{},{components:r})):o.createElement(d,p({ref:t},l))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,p=new Array(n);p[0]=b;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var s=2;s<n;s++)p[s]=r[s];return o.createElement.apply(null,p)}return o.createElement.apply(null,r)}b.displayName="MDXCreateElement"},55346:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>p,default:()=>c,frontMatter:()=>n,metadata:()=>i,toc:()=>s});var o=r(14090),a=(r(29901),r(57522));const n={},p=void 0,i={unversionedId:"api/github.github.updaterepositorywebhook",id:"api/github.github.updaterepositorywebhook",title:"github.github.updaterepositorywebhook",description:"Home &gt; @runlightyear/github &gt; Github &gt; updateRepositoryWebhook",source:"@site/docs/api/github.github.updaterepositorywebhook.md",sourceDirName:"api",slug:"/api/github.github.updaterepositorywebhook",permalink:"/lightyear/docs/api/github.github.updaterepositorywebhook",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.github.updaterepositorywebhook.md",tags:[],version:"current",frontMatter:{}},u={},s=[{value:"Github.updateRepositoryWebhook() method",id:"githubupdaterepositorywebhook-method",level:2},{value:"Parameters",id:"parameters",level:2}],l={toc:s};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,o.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"Github")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github.updaterepositorywebhook"},"updateRepositoryWebhook")),(0,a.kt)("h2",{id:"githubupdaterepositorywebhook-method"},"Github.updateRepositoryWebhook() method"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,a.kt)("p",null,"Update a repository webhook"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"updateRepositoryWebhook(props: UpdateRepositoryWebhookProps): Promise<UpdateRepositoryWebhookResponse>;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.updaterepositorywebhookprops"},"UpdateRepositoryWebhookProps")),(0,a.kt)("td",{parentName:"tr",align:null},"props")))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"Promise","<",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.updaterepositorywebhookresponse"},"UpdateRepositoryWebhookResponse"),">"))}c.isMDXComponent=!0}}]);