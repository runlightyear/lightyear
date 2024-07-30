"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[91749],{62757:(e,r,t)=>{t.d(r,{xA:()=>i,yg:()=>y});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var d=n.createContext({}),u=function(e){var r=n.useContext(d),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},i=function(e){var r=u(e.components);return n.createElement(d.Provider,{value:r},e.children)},s="mdxType",l={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,d=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),s=u(t),f=a,y=s["".concat(d,".").concat(f)]||s[f]||l[f]||o;return t?n.createElement(y,p(p({ref:r},i),{},{components:t})):n.createElement(y,p({ref:r},i))}));function y(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,p=new Array(o);p[0]=f;var c={};for(var d in r)hasOwnProperty.call(r,d)&&(c[d]=r[d]);c.originalType=e,c[s]="string"==typeof e?e:a,p[1]=c;for(var u=2;u<o;u++)p[u]=t[u];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},71233:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>d,contentTitle:()=>p,default:()=>l,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var n=t(94790),a=(t(67308),t(62757));const o={},p=void 0,c={unversionedId:"api/airtable.onneworupdatedrecordsrunfuncprops.data",id:"api/airtable.onneworupdatedrecordsrunfuncprops.data",title:"airtable.onneworupdatedrecordsrunfuncprops.data",description:"Home &gt; @runlightyear/airtable &gt; OnNewOrUpdatedRecordsRunFuncProps &gt; data",source:"@site/docs/api/airtable.onneworupdatedrecordsrunfuncprops.data.md",sourceDirName:"api",slug:"/api/airtable.onneworupdatedrecordsrunfuncprops.data",permalink:"/docs/api/airtable.onneworupdatedrecordsrunfuncprops.data",draft:!1,tags:[],version:"current",frontMatter:{}},d={},u=[{value:"OnNewOrUpdatedRecordsRunFuncProps.data property",id:"onneworupdatedrecordsrunfuncpropsdata-property",level:2}],i={toc:u},s="wrapper";function l(e){let{components:r,...t}=e;return(0,a.yg)(s,(0,n.A)({},i,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/airtable.onneworupdatedrecordsrunfuncprops"},"OnNewOrUpdatedRecordsRunFuncProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/airtable.onneworupdatedrecordsrunfuncprops.data"},"data")),(0,a.yg)("h2",{id:"onneworupdatedrecordsrunfuncpropsdata-property"},"OnNewOrUpdatedRecordsRunFuncProps.data property"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"data: {\n        baseId: string;\n        webhookId: string;\n        newOrUpdatedRecords: Array<{\n            tableId: string;\n            recordId: string;\n        }>;\n        payloads: Array<WebhookPayload>;\n    };\n")))}l.isMDXComponent=!0}}]);