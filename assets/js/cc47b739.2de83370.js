"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[55735],{62757:(e,r,t)=>{t.d(r,{xA:()=>y,yg:()=>d});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),s=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},y=function(e){var r=s(e.components);return n.createElement(l.Provider,{value:r},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,y=i(e,["components","mdxType","originalType","parentName"]),c=s(t),u=a,d=c["".concat(l,".").concat(u)]||c[u]||g[u]||o;return t?n.createElement(d,p(p({ref:r},y),{},{components:t})):n.createElement(d,p({ref:r},y))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,p=new Array(o);p[0]=u;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i[c]="string"==typeof e?e:a,p[1]=i;for(var s=2;s<o;s++)p[s]=t[s];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},74259:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>p,default:()=>g,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var n=t(94790),a=(t(67308),t(62757));const o={},p=void 0,i={unversionedId:"api/lightyear.appwebhookdeliveryresponse",id:"api/lightyear.appwebhookdeliveryresponse",title:"lightyear.appwebhookdeliveryresponse",description:"Home &gt; @runlightyear/lightyear &gt; AppWebhookDeliveryResponse",source:"@site/docs/api/lightyear.appwebhookdeliveryresponse.md",sourceDirName:"api",slug:"/api/lightyear.appwebhookdeliveryresponse",permalink:"/docs/api/lightyear.appwebhookdeliveryresponse",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"AppWebhookDeliveryResponse interface",id:"appwebhookdeliveryresponse-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],y={toc:s},c="wrapper";function g(e){let{components:r,...t}=e;return(0,a.yg)(c,(0,n.A)({},y,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear.appwebhookdeliveryresponse"},"AppWebhookDeliveryResponse")),(0,a.yg)("h2",{id:"appwebhookdeliveryresponse-interface"},"AppWebhookDeliveryResponse interface"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"interface AppWebhookDeliveryResponse \n")),(0,a.yg)("h2",{id:"required-properties"},"Required Properties"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Property"),(0,a.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/lightyear.appwebhookdeliveryresponse.forward"},"forward")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"{ identifier: string; filter?: string; data: any; } ","|"," null"),(0,a.yg)("td",{parentName:"tr",align:null})),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/lightyear.appwebhookdeliveryresponse.response"},"response")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"{ statusCode: number; headers?: { ","[","key: string","]",": string; }; body?: string; }"),(0,a.yg)("td",{parentName:"tr",align:null})))))}g.isMDXComponent=!0}}]);