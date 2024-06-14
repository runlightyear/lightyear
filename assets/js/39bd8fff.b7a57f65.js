"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[41247],{57522:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=l(r),m=a,y=u["".concat(s,".").concat(m)]||u[m]||f[m]||o;return r?n.createElement(y,c(c({ref:t},p),{},{components:r})):n.createElement(y,c({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var l=2;l<o;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},42012:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>f,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=r(14090),a=(r(29901),r(57522));const o={},c=void 0,i={unversionedId:"api/salesforce.contactsynchronizer.getfromobjectdata",id:"api/salesforce.contactsynchronizer.getfromobjectdata",title:"salesforce.contactsynchronizer.getfromobjectdata",description:"Home &gt; @runlightyear/salesforce &gt; ContactSynchronizer &gt; getFromObjectData",source:"@site/docs/api/salesforce.contactsynchronizer.getfromobjectdata.md",sourceDirName:"api",slug:"/api/salesforce.contactsynchronizer.getfromobjectdata",permalink:"/docs/api/salesforce.contactsynchronizer.getfromobjectdata",draft:!1,tags:[],version:"current",frontMatter:{}},s={},l=[{value:"ContactSynchronizer.getFromObjectData() method",id:"contactsynchronizergetfromobjectdata-method",level:2}],p={toc:l};function f(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce.contactsynchronizer"},"ContactSynchronizer")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce.contactsynchronizer.getfromobjectdata"},"getFromObjectData")),(0,a.kt)("h2",{id:"contactsynchronizergetfromobjectdata-method"},"ContactSynchronizer.getFromObjectData() method"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"getFromObjectData(): {\n        FirstName: string;\n        LastName: string;\n        Email: (object: any) => any;\n        Phone: (object: any) => any;\n        AccountId: string;\n    };\n")),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"{ FirstName: string; LastName: string; Email: (object: any) =",">"," any; Phone: (object: any) =",">"," any; AccountId: string; }"))}f.isMDXComponent=!0}}]);