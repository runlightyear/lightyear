"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[12239],{57522:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>d});var o=t(29901);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function a(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},c=Object.keys(e);for(o=0;o<c.length;o++)t=c[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)t=c[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=o.createContext({}),i=function(e){var r=o.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},l=function(e){var r=i(e.components);return o.createElement(p.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},f=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,c=e.originalType,p=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),f=i(t),d=n,y=f["".concat(p,".").concat(d)]||f[d]||u[d]||c;return t?o.createElement(y,s(s({ref:r},l),{},{components:t})):o.createElement(y,s({ref:r},l))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=t.length,s=new Array(c);s[0]=f;var a={};for(var p in r)hasOwnProperty.call(r,p)&&(a[p]=r[p]);a.originalType=e,a.mdxType="string"==typeof e?e:n,s[1]=a;for(var i=2;i<c;i++)s[i]=t[i];return o.createElement.apply(null,s)}return o.createElement.apply(null,t)}f.displayName="MDXCreateElement"},65400:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>c,metadata:()=>a,toc:()=>i});var o=t(14090),n=(t(29901),t(57522));const c={},s=void 0,a={unversionedId:"api/salesforce.describesobjectresult.recordtypeinfos",id:"api/salesforce.describesobjectresult.recordtypeinfos",title:"salesforce.describesobjectresult.recordtypeinfos",description:"Home &gt; @runlightyear/salesforce &gt; DescribeSObjectResult &gt; recordTypeInfos",source:"@site/docs/api/salesforce.describesobjectresult.recordtypeinfos.md",sourceDirName:"api",slug:"/api/salesforce.describesobjectresult.recordtypeinfos",permalink:"/docs/api/salesforce.describesobjectresult.recordtypeinfos",draft:!1,tags:[],version:"current",frontMatter:{}},p={},i=[{value:"DescribeSObjectResult.recordTypeInfos property",id:"describesobjectresultrecordtypeinfos-property",level:2}],l={toc:i};function u(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,o.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult"},"DescribeSObjectResult")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult.recordtypeinfos"},"recordTypeInfos")),(0,n.kt)("h2",{id:"describesobjectresultrecordtypeinfos-property"},"DescribeSObjectResult.recordTypeInfos property"),(0,n.kt)("p",null,"An array of the record types supported by this object. The user need not have access to all the returned record types to see them here."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"recordTypeInfos: Array<RecordTypeInfo>;\n")))}u.isMDXComponent=!0}}]);