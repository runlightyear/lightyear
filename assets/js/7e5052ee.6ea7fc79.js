"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[84748],{57522:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(29901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),b=s(n),d=a,m=b["".concat(p,".").concat(d)]||b[d]||u[d]||o;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},35842:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(14090),a=(n(29901),n(57522));const o={},i=void 0,l={unversionedId:"api/lightyear.definewebhook",id:"api/lightyear.definewebhook",title:"lightyear.definewebhook",description:"Home &gt; @runlightyear/lightyear &gt; defineWebhook",source:"@site/docs/api/lightyear.definewebhook.md",sourceDirName:"api",slug:"/api/lightyear.definewebhook",permalink:"/docs/api/lightyear.definewebhook",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[{value:"defineWebhook() function",id:"definewebhook-function",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2},{value:"Example 4",id:"example-4",level:2}],c={toc:s};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear.definewebhook"},"defineWebhook")),(0,a.kt)("h2",{id:"definewebhook-function"},"defineWebhook() function"),(0,a.kt)("p",null,"Define a Webhook"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"declare function defineWebhook(props: DefineWebhookProps): string;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/lightyear.definewebhookprops"},"DefineWebhookProps")),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"string"),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("p",null,"Basic webhook"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineWebhook } from "@runlightyear/lightyear";\n\ndefineWebhook({\n  name: "basicWebhook",\n  title: "Basic Webhook",\n});\n')),(0,a.kt)("h2",{id:"example-2"},"Example 2"),(0,a.kt)("p",null,"Webhook with variables"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineWebhook } from "@runlightyear/lightyear";\n\ndefineWebhook({\n  name: "webhookWithVariables",\n  title: "Webhook with Variables",\n  variables: [\n    "var1",\n    "var2?",\n    {\n      name: "var3",\n      description: "Required variable 3",\n    },\n    {\n      name: "var4?",\n      description: "Optional variable 4",\n    },\n  ],\n});\n')),(0,a.kt)("h2",{id:"example-3"},"Example 3"),(0,a.kt)("p",null,"Webhook with secrets"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineWebhook } from "@runlightyear/lightyear";\n\ndefineWebhook({\n  name: "webhookWithSecrets",\n  title: "Webhook with Secrets",\n  secrets: [\n    "secret1",\n    "secret2?",\n    {\n      name: "secret3",\n      description: "Required secret 3",\n    },\n    {\n      name: "secret4?",\n      description: "Optional secret 4",\n    },\n  ],\n});\n')),(0,a.kt)("h2",{id:"example-4"},"Example 4"),(0,a.kt)("p",null,"With subscription"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'defineWebhook({\n  name: "subscriptionWebhook",\n  title: "Subscription Webhook",\n  subscribeProps: () => {\n    // returns the props to be passed into subscribe\n    // represents essential parameters to create the subscription\n  },\n  subscribe: ({ subscribeProps }) => {\n    // runs after a change in subscribeProps is detected\n    // code to create subscription using subscribe props\n    // return value becomes unsubscribeProps for unsubscribe\n    // for example: hook id returned by rest api call\n  },\n  unsubscribe: ({ unsubscribeProps }) => {\n     // if subscribed, runs after a change in subscribeProps is detected\n     // code to unsubscribe using unsubscribe props\n  },\n})\n')))}u.isMDXComponent=!0}}]);