"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4748],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),b=s(r),d=a,f=b["".concat(l,".").concat(d)]||b[d]||u[d]||o;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=b;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},35842:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var n=r(14090),a=(r(29901),r(57522));const o={},i=void 0,p={unversionedId:"api/lightyear.definewebhook",id:"api/lightyear.definewebhook",title:"lightyear.definewebhook",description:"Home &gt; @runlightyear/lightyear &gt; defineWebhook",source:"@site/docs/api/lightyear.definewebhook.md",sourceDirName:"api",slug:"/api/lightyear.definewebhook",permalink:"/docs/api/lightyear.definewebhook",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"defineWebhook() function",id:"definewebhook-function",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],c={toc:s};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear.definewebhook"},"defineWebhook")),(0,a.kt)("h2",{id:"definewebhook-function"},"defineWebhook() function"),(0,a.kt)("p",null,"Define a Webhook"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"declare function defineWebhook(props: DefineWebhookProps): string;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/lightyear.definewebhookprops"},"DefineWebhookProps")),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"string"),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("p",null,"Basic"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'defineWebhook({\n  name: "basicWebhook",\n  title: "Basic Webhook",\n})\n')),(0,a.kt)("h2",{id:"example-2"},"Example 2"),(0,a.kt)("p",null,"With Subscription"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'defineWebhook({\n  name: "subscriptionWebhook",\n  title: "Subscription Webhook",\n  subscribeProps: () => {\n    // returns the props to be passed into subscribe\n    // represents essential parameters to create the subscription\n  },\n  subscribe: ({ subscribeProps }) => {\n    // runs after a change in subscribeProps is detected\n    // code to create subscription using subscribe props\n    // return value becomes unsubscribeProps for unsubscribe\n    // for example: hook id returned by rest api call\n  },\n  unsubscribe: ({ unsubscribeProps }) => {\n     // if subscribed, runs after a change in subscribeProps is detected\n     // code to unsubscribe using unsubscribe props\n  },\n})\n')))}u.isMDXComponent=!0}}]);