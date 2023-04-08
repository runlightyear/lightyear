"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[88881],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>u});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=p(r),u=a,y=d["".concat(l,".").concat(u)]||d[u]||f[u]||o;return r?n.createElement(y,i(i({ref:t},s),{},{components:r})):n.createElement(y,i({ref:t},s))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},46924:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var n=r(14090),a=(r(29901),r(57522));const o={},i=void 0,c={unversionedId:"api/salesforce.field.encrypted",id:"api/salesforce.field.encrypted",title:"salesforce.field.encrypted",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; encrypted",source:"@site/docs/api/salesforce.field.encrypted.md",sourceDirName:"api",slug:"/api/salesforce.field.encrypted",permalink:"/docs/api/salesforce.field.encrypted",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"Field.encrypted property",id:"fieldencrypted-property",level:2}],s={toc:p};function f(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field.encrypted"},"encrypted")),(0,a.kt)("h2",{id:"fieldencrypted-property"},"Field.encrypted property"),(0,a.kt)("p",null,"Note"),(0,a.kt)("p",null,"This page is about Shield Platform Encryption, not Classic Encryption. What's the difference?"),(0,a.kt)("p",null,"Indicates whether this field is encrypted. This value only appears in the results of a describeSObjects() call when it is true; otherwise, it is omitted from the results. This field is available in API version 31.0 and later."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"encrypted: boolean;\n")))}f.isMDXComponent=!0}}]);