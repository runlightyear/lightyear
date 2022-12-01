"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7735],{7522:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>h});var r=a(9901);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,l=function(e,t){if(null==e)return{};var a,r,l={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var i=r.createContext({}),p=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):u(u({},t),e)),a},c=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,l=e.mdxType,n=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=p(a),h=l,y=d["".concat(i,".").concat(h)]||d[h]||s[h]||n;return a?r.createElement(y,u(u({ref:t},c),{},{components:a})):r.createElement(y,u({ref:t},c))}));function h(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var n=a.length,u=new Array(n);u[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:l,u[1]=o;for(var p=2;p<n;p++)u[p]=a[p];return r.createElement.apply(null,u)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},4985:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>u,default:()=>s,frontMatter:()=>n,metadata:()=>o,toc:()=>p});var r=a(4090),l=(a(9901),a(7522));const n={},u=void 0,o={unversionedId:"api/github.github.pullrequestpayload",id:"api/github.github.pullrequestpayload",title:"github.github.pullrequestpayload",description:"Home &gt; @runlightyear/github &gt; Github &gt; pullRequestPayload",source:"@site/docs/api/github.github.pullrequestpayload.md",sourceDirName:"api",slug:"/api/github.github.pullrequestpayload",permalink:"/lightyear/docs/api/github.github.pullrequestpayload",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.github.pullrequestpayload.md",tags:[],version:"current",frontMatter:{}},i={},p=[{value:"Github.pullRequestPayload() method",id:"githubpullrequestpayload-method",level:2},{value:"Parameters",id:"parameters",level:2}],c={toc:p};function s(e){let{components:t,...a}=e;return(0,l.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/lightyear/docs/api/"},"Home")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github.github"},"Github")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github.github.pullrequestpayload"},"pullRequestPayload")),(0,l.kt)("h2",{id:"githubpullrequestpayload-method"},"Github.pullRequestPayload() method"),(0,l.kt)("p",null,"Pull Request Payload"),(0,l.kt)("b",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"static pullRequestPayload(data: WebhookDeliveryData): PullRequestPayload;\n")),(0,l.kt)("h2",{id:"parameters"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"data"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/lightyear/docs/api/lightyear.webhookdeliverydata"},"WebhookDeliveryData")),(0,l.kt)("td",{parentName:"tr",align:null},"webhook delivery data")))),(0,l.kt)("b",null,"Returns:"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github.pullrequestpayload"},"PullRequestPayload")))}s.isMDXComponent=!0}}]);