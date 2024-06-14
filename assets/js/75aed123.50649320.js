"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[79031],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>g});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),b=p(r),g=a,m=b["".concat(i,".").concat(g)]||b[g]||c[g]||l;return r?n.createElement(m,u(u({ref:t},s),{},{components:r})):n.createElement(m,u({ref:t},s))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,u=new Array(l);u[0]=b;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:a,u[1]=o;for(var p=2;p<l;p++)u[p]=r[p];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},91004:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>u,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var n=r(14090),a=(r(29901),r(57522));const l={},u=void 0,o={unversionedId:"api/github.github.onpullrequest",id:"api/github.github.onpullrequest",title:"github.github.onpullrequest",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; onPullRequest",source:"@site/docs/api/github.github.onpullrequest.md",sourceDirName:"api",slug:"/api/github.github.onpullrequest",permalink:"/docs/api/github.github.onpullrequest",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"GitHub.onPullRequest() method",id:"githubonpullrequest-method",level:2},{value:"Parameters",id:"parameters",level:2}],s={toc:p};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github.onpullrequest"},"onPullRequest")),(0,a.kt)("h2",{id:"githubonpullrequest-method"},"GitHub.onPullRequest() method"),(0,a.kt)("p",null,"On Pull Request"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"static onPullRequest(props: GitHubListenerProps<PullRequestPayload>): {\n        webhook: string;\n        action: string;\n    };\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.githublistenerprops"},"GitHubListenerProps"),"<",(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.pullrequestpayload"},"PullRequestPayload"),">"),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"{ webhook: string; action: string; }"))}c.isMDXComponent=!0}}]);