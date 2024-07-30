"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[70331],{62757:(e,r,t)=>{t.d(r,{xA:()=>c,yg:()=>b});var a=t(67308);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?n(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,a,o=function(e,r){if(null==e)return{};var t,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)t=n[a],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)t=n[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=a.createContext({}),p=function(e){var r=a.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},c=function(e){var r=p(e.components);return a.createElement(l.Provider,{value:r},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},y=a.forwardRef((function(e,r){var t=e.components,o=e.mdxType,n=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(t),y=o,b=u["".concat(l,".").concat(y)]||u[y]||d[y]||n;return t?a.createElement(b,s(s({ref:r},c),{},{components:t})):a.createElement(b,s({ref:r},c))}));function b(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var n=t.length,s=new Array(n);s[0]=y;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i[u]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<n;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},96708:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>n,metadata:()=>i,toc:()=>p});var a=t(94790),o=(t(67308),t(62757));const n={},s=void 0,i={unversionedId:"api/airtable.listwebhookpayloadsresponsedata.cursor",id:"api/airtable.listwebhookpayloadsresponsedata.cursor",title:"airtable.listwebhookpayloadsresponsedata.cursor",description:"Home &gt; @runlightyear/airtable &gt; ListWebhookPayloadsResponseData &gt; cursor",source:"@site/docs/api/airtable.listwebhookpayloadsresponsedata.cursor.md",sourceDirName:"api",slug:"/api/airtable.listwebhookpayloadsresponsedata.cursor",permalink:"/docs/api/airtable.listwebhookpayloadsresponsedata.cursor",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"ListWebhookPayloadsResponseData.cursor property",id:"listwebhookpayloadsresponsedatacursor-property",level:2}],c={toc:p},u="wrapper";function d(e){let{components:r,...t}=e;return(0,o.yg)(u,(0,a.A)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/airtable.listwebhookpayloadsresponsedata"},"ListWebhookPayloadsResponseData")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/airtable.listwebhookpayloadsresponsedata.cursor"},"cursor")),(0,o.yg)("h2",{id:"listwebhookpayloadsresponsedatacursor-property"},"ListWebhookPayloadsResponseData.cursor property"),(0,o.yg)("p",null,"The cursor field in the response indicates the transaction number of the payload that would immediately follow the last payload returned in this request. Payloads are returned in transaction order, so the last payload's transaction number is (cursor-1), the second-to-last payload's transaction number is (cursor-2), and so on. Each payload is associated with an incrementing cursor number. If there are no returned payloads, then the cursor in the response will be the same as the cursor specified in the request. The number of the next payload to be generated can be retrieved from cursorForNextPayload in list webhooks. Payloads are deleted from Airtable's servers after 1 week whether or not the client has seen them. The cursor value for the next payload is never reset, even if payloads are deleted."),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"cursor: number;\n")))}d.isMDXComponent=!0}}]);