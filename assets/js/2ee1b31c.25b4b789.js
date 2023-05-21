"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[30959],{57522:(t,e,r)=>{r.d(e,{Zo:()=>l,kt:()=>d});var n=r(29901);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var p=n.createContext({}),s=function(t){var e=n.useContext(p),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},l=function(t){var e=s(t.components);return n.createElement(p.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},b=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,o=t.originalType,p=t.parentName,l=u(t,["components","mdxType","originalType","parentName"]),b=s(r),d=a,m=b["".concat(p,".").concat(d)]||b[d]||c[d]||o;return r?n.createElement(m,i(i({ref:e},l),{},{components:r})):n.createElement(m,i({ref:e},l))}));function d(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=r.length,i=new Array(o);i[0]=b;var u={};for(var p in e)hasOwnProperty.call(e,p)&&(u[p]=e[p]);u.originalType=t,u.mdxType="string"==typeof t?t:a,i[1]=u;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},69515:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>u,toc:()=>s});var n=r(14090),a=(r(29901),r(57522));const o={},i=void 0,u={unversionedId:"api/github.github.onstatus",id:"api/github.github.onstatus",title:"github.github.onstatus",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; onStatus",source:"@site/docs/api/github.github.onstatus.md",sourceDirName:"api",slug:"/api/github.github.onstatus",permalink:"/docs/api/github.github.onstatus",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[{value:"GitHub.onStatus() method",id:"githubonstatus-method",level:2},{value:"Parameters",id:"parameters",level:2}],l={toc:s};function c(t){let{components:e,...r}=t;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github.onstatus"},"onStatus")),(0,a.kt)("h2",{id:"githubonstatus-method"},"GitHub.onStatus() method"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,a.kt)("p",null,"On Status"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"static onStatus(props: GitHubListenerProps<StatusPayload>): {\n        webhook: string;\n        action: string;\n    };\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.githublistenerprops"},"GitHubListenerProps"),"<",(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.statuspayload"},"StatusPayload"),">"),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"{ webhook: string; action: string; }"))}c.isMDXComponent=!0}}]);