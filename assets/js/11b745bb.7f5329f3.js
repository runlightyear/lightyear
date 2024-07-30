"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[56089],{62757:(e,r,t)=>{t.d(r,{xA:()=>c,yg:()=>y});var o=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function a(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var f=o.createContext({}),p=function(e){var r=o.useContext(f),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},c=function(e){var r=p(e.components);return o.createElement(f.Provider,{value:r},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},d=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,i=e.originalType,f=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),s=p(t),d=n,y=s["".concat(f,".").concat(d)]||s[d]||u[d]||i;return t?o.createElement(y,l(l({ref:r},c),{},{components:t})):o.createElement(y,l({ref:r},c))}));function y(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var i=t.length,l=new Array(i);l[0]=d;var a={};for(var f in r)hasOwnProperty.call(r,f)&&(a[f]=r[f]);a.originalType=e,a[s]="string"==typeof e?e:n,l[1]=a;for(var p=2;p<i;p++)l[p]=t[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,t)}d.displayName="MDXCreateElement"},14353:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>f,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>p});var o=t(94790),n=(t(67308),t(62757));const i={},l=void 0,a={unversionedId:"api/salesforce.field.filteredlookupinfo",id:"api/salesforce.field.filteredlookupinfo",title:"salesforce.field.filteredlookupinfo",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; filteredLookupInfo",source:"@site/docs/api/salesforce.field.filteredlookupinfo.md",sourceDirName:"api",slug:"/api/salesforce.field.filteredlookupinfo",permalink:"/docs/api/salesforce.field.filteredlookupinfo",draft:!1,tags:[],version:"current",frontMatter:{}},f={},p=[{value:"Field.filteredLookupInfo property",id:"fieldfilteredlookupinfo-property",level:2}],c={toc:p},s="wrapper";function u(e){let{components:r,...t}=e;return(0,n.yg)(s,(0,o.A)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field.filteredlookupinfo"},"filteredLookupInfo")),(0,n.yg)("h2",{id:"fieldfilteredlookupinfo-property"},"Field.filteredLookupInfo property"),(0,n.yg)("p",null,"If the field is a reference field type with a lookup filter, filteredLookupInfo contains the lookup filter information for the field. If there is no lookup filter, or the filter is inactive, this field is null."),(0,n.yg)("p",null,"This field is available in API version 31.0 and later."),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"filteredLookupInfo: FilteredLookupInfo;\n")))}u.isMDXComponent=!0}}]);