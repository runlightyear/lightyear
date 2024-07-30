"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5486],{62757:(e,t,a)=>{a.d(t,{xA:()=>p,yg:()=>g});var r=a(67308);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var u=r.createContext({}),s=function(e){var t=r.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,u=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(a),y=n,g=m["".concat(u,".").concat(y)]||m[y]||c[y]||o;return a?r.createElement(g,i(i({ref:t},p),{},{components:a})):r.createElement(g,i({ref:t},p))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=y;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[m]="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}y.displayName="MDXCreateElement"},34481:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=a(94790),n=(a(67308),a(62757));const o={},i=void 0,l={unversionedId:"api/github.github.asissuecommentpayload",id:"api/github.github.asissuecommentpayload",title:"github.github.asissuecommentpayload",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; asIssueCommentPayload",source:"@site/docs/api/github.github.asissuecommentpayload.md",sourceDirName:"api",slug:"/api/github.github.asissuecommentpayload",permalink:"/docs/api/github.github.asissuecommentpayload",draft:!1,tags:[],version:"current",frontMatter:{}},u={},s=[{value:"GitHub.asIssueCommentPayload() method",id:"githubasissuecommentpayload-method",level:2},{value:"Parameters",id:"parameters",level:2}],p={toc:s},m="wrapper";function c(e){let{components:t,...a}=e;return(0,n.yg)(m,(0,r.A)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github.asissuecommentpayload"},"asIssueCommentPayload")),(0,n.yg)("h2",{id:"githubasissuecommentpayload-method"},"GitHub.asIssueCommentPayload() method"),(0,n.yg)("p",null,"Issue Comment Payload"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"static asIssueCommentPayload(data: WebhookDeliveryData): IssueCommentPayload | null;\n")),(0,n.yg)("h2",{id:"parameters"},"Parameters"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"data"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/lightyear.webhookdeliverydata"},"WebhookDeliveryData")),(0,n.yg)("td",{parentName:"tr",align:null})))),(0,n.yg)("b",null,"Returns:"),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.issuecommentpayload"},"IssueCommentPayload")," ","|"," null"))}c.isMDXComponent=!0}}]);