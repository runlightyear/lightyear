"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[28749],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},u=Object.keys(e);for(a=0;a<u.length;a++)r=u[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(a=0;a<u.length;a++)r=u[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),i=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},s=function(e){var t=i(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,u=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=i(r),m=n,b=d["".concat(o,".").concat(m)]||d[m]||c[m]||u;return r?a.createElement(b,p(p({ref:t},s),{},{components:r})):a.createElement(b,p({ref:t},s))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var u=r.length,p=new Array(u);p[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:n,p[1]=l;for(var i=2;i<u;i++)p[i]=r[i];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},842:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>c,frontMatter:()=>u,metadata:()=>l,toc:()=>i});var a=r(14090),n=(r(29901),r(57522));const u={},p=void 0,l={unversionedId:"api/github.github.updatepullrequest",id:"api/github.github.updatepullrequest",title:"github.github.updatepullrequest",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; updatePullRequest",source:"@site/docs/api/github.github.updatepullrequest.md",sourceDirName:"api",slug:"/api/github.github.updatepullrequest",permalink:"/docs/api/github.github.updatepullrequest",draft:!1,tags:[],version:"current",frontMatter:{}},o={},i=[{value:"GitHub.updatePullRequest() method",id:"githubupdatepullrequest-method",level:2},{value:"Parameters",id:"parameters",level:2}],s={toc:i};function c(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.github.updatepullrequest"},"updatePullRequest")),(0,n.kt)("h2",{id:"githubupdatepullrequest-method"},"GitHub.updatePullRequest() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"Update a pull request"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"updatePullRequest(props: UpdatePullRequestProps): Promise<HttpProxyResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updatepullrequestprops"},"UpdatePullRequestProps")),(0,n.kt)("td",{parentName:"tr",align:null},"props")))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/lightyear.httpproxyresponse"},"HttpProxyResponse"),">"))}c.isMDXComponent=!0}}]);