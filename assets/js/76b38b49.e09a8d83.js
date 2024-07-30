"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[42858],{62757:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>d});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),p=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},y="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),y=p(r),g=n,d=y["".concat(o,".").concat(g)]||y[g]||c[g]||l;return r?a.createElement(d,i(i({ref:t},s),{},{components:r})):a.createElement(d,i({ref:t},s))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,i=new Array(l);i[0]=g;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u[y]="string"==typeof e?e:n,i[1]=u;for(var p=2;p<l;p++)i[p]=r[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}g.displayName="MDXCreateElement"},37933:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var a=r(94790),n=(r(67308),r(62757));const l={},i=void 0,u={unversionedId:"api/github.github.aspullrequestreviewpayload",id:"api/github.github.aspullrequestreviewpayload",title:"github.github.aspullrequestreviewpayload",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; asPullRequestReviewPayload",source:"@site/docs/api/github.github.aspullrequestreviewpayload.md",sourceDirName:"api",slug:"/api/github.github.aspullrequestreviewpayload",permalink:"/docs/api/github.github.aspullrequestreviewpayload",draft:!1,tags:[],version:"current",frontMatter:{}},o={},p=[{value:"GitHub.asPullRequestReviewPayload() method",id:"githubaspullrequestreviewpayload-method",level:2},{value:"Parameters",id:"parameters",level:2}],s={toc:p},y="wrapper";function c(e){let{components:t,...r}=e;return(0,n.yg)(y,(0,a.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github.aspullrequestreviewpayload"},"asPullRequestReviewPayload")),(0,n.yg)("h2",{id:"githubaspullrequestreviewpayload-method"},"GitHub.asPullRequestReviewPayload() method"),(0,n.yg)("p",null,"Pull Request Review Payload"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"static asPullRequestReviewPayload(data: WebhookDeliveryData): PullRequestReviewPayload | null;\n")),(0,n.yg)("h2",{id:"parameters"},"Parameters"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"data"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/lightyear.webhookdeliverydata"},"WebhookDeliveryData")),(0,n.yg)("td",{parentName:"tr",align:null},"webhook delivery data")))),(0,n.yg)("b",null,"Returns:"),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.pullrequestreviewpayload"},"PullRequestReviewPayload")," ","|"," null"))}c.isMDXComponent=!0}}]);