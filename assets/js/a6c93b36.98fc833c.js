"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3037],{57522:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>d});var a=t(29901);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=a.createContext({}),c=function(e){var r=a.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},s=function(e){var r=c(e.components);return a.createElement(i.Provider,{value:r},e.children)},k={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=c(t),d=n,y=u["".concat(i,".").concat(d)]||u[d]||k[d]||o;return t?a.createElement(y,l(l({ref:r},s),{},{components:t})):a.createElement(y,l({ref:r},s))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,l=new Array(o);l[0]=u;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,l[1]=p;for(var c=2;c<o;c++)l[c]=t[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},48313:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>l,default:()=>k,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var a=t(14090),n=(t(29901),t(57522));const o={},l=void 0,p={unversionedId:"api/slack.slackappwebhook.receivedelivery",id:"api/slack.slackappwebhook.receivedelivery",title:"slack.slackappwebhook.receivedelivery",description:"Home &gt; @runlightyear/slack &gt; SlackAppWebhook &gt; receiveDelivery",source:"@site/docs/api/slack.slackappwebhook.receivedelivery.md",sourceDirName:"api",slug:"/api/slack.slackappwebhook.receivedelivery",permalink:"/docs/api/slack.slackappwebhook.receivedelivery",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"SlackAppWebhook.receiveDelivery() method",id:"slackappwebhookreceivedelivery-method",level:2},{value:"Parameters",id:"parameters",level:2}],s={toc:c};function k(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slackappwebhook"},"SlackAppWebhook")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slackappwebhook.receivedelivery"},"receiveDelivery")),(0,n.kt)("h2",{id:"slackappwebhookreceivedelivery-method"},"SlackAppWebhook.receiveDelivery() method"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"receiveDelivery(delivery: WebhookDelivery): Promise<AppWebhookDeliveryResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"delivery"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/lightyear.webhookdelivery"},"WebhookDelivery")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/lightyear.appwebhookdeliveryresponse"},"AppWebhookDeliveryResponse"),">"))}k.isMDXComponent=!0}}]);