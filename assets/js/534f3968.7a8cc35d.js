"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7735],{57522:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>h});var r=a(29901);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function u(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),i=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=i(e.components);return r.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=i(a),h=n,b=d["".concat(p,".").concat(h)]||d[h]||s[h]||l;return a?r.createElement(b,o(o({ref:t},c),{},{components:a})):r.createElement(b,o({ref:t},c))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,o=new Array(l);o[0]=d;var u={};for(var p in t)hasOwnProperty.call(t,p)&&(u[p]=t[p]);u.originalType=e,u.mdxType="string"==typeof e?e:n,o[1]=u;for(var i=2;i<l;i++)o[i]=a[i];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},44985:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>s,frontMatter:()=>l,metadata:()=>u,toc:()=>i});var r=a(14090),n=(a(29901),a(57522));const l={},o=void 0,u={unversionedId:"api/github.github.pullrequestpayload",id:"api/github.github.pullrequestpayload",title:"github.github.pullrequestpayload",description:"Home &gt; @runlightyear/github &gt; Github &gt; pullRequestPayload",source:"@site/docs/api/github.github.pullrequestpayload.md",sourceDirName:"api",slug:"/api/github.github.pullrequestpayload",permalink:"/lightyear/docs/api/github.github.pullrequestpayload",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.github.pullrequestpayload.md",tags:[],version:"current",frontMatter:{}},p={},i=[{value:"Github.pullRequestPayload() method",id:"githubpullrequestpayload-method",level:2},{value:"Parameters",id:"parameters",level:2}],c={toc:i};function s(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"Github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.github.pullrequestpayload"},"pullRequestPayload")),(0,n.kt)("h2",{id:"githubpullrequestpayload-method"},"Github.pullRequestPayload() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"Pull Request Payload"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"static pullRequestPayload(data: WebhookDeliveryData): PullRequestPayload;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"data"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/lightyear.webhookdeliverydata"},"WebhookDeliveryData")),(0,n.kt)("td",{parentName:"tr",align:null},"webhook delivery data")))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.pullrequestpayload"},"PullRequestPayload")))}s.isMDXComponent=!0}}]);