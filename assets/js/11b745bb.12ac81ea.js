"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3427],{57522:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>d});var o=t(29901);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function a(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var f=o.createContext({}),p=function(e){var r=o.useContext(f),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},c=function(e){var r=p(e.components);return o.createElement(f.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},u=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,i=e.originalType,f=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),u=p(t),d=n,y=u["".concat(f,".").concat(d)]||u[d]||s[d]||i;return t?o.createElement(y,l(l({ref:r},c),{},{components:t})):o.createElement(y,l({ref:r},c))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var i=t.length,l=new Array(i);l[0]=u;var a={};for(var f in r)hasOwnProperty.call(r,f)&&(a[f]=r[f]);a.originalType=e,a.mdxType="string"==typeof e?e:n,l[1]=a;for(var p=2;p<i;p++)l[p]=t[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},40016:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>f,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>a,toc:()=>p});var o=t(14090),n=(t(29901),t(57522));const i={},l=void 0,a={unversionedId:"api/salesforce.field.filteredlookupinfo",id:"api/salesforce.field.filteredlookupinfo",title:"salesforce.field.filteredlookupinfo",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; filteredLookupInfo",source:"@site/docs/api/salesforce.field.filteredlookupinfo.md",sourceDirName:"api",slug:"/api/salesforce.field.filteredlookupinfo",permalink:"/docs/api/salesforce.field.filteredlookupinfo",draft:!1,tags:[],version:"current",frontMatter:{}},f={},p=[{value:"Field.filteredLookupInfo property",id:"fieldfilteredlookupinfo-property",level:2}],c={toc:p};function s(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field.filteredlookupinfo"},"filteredLookupInfo")),(0,n.kt)("h2",{id:"fieldfilteredlookupinfo-property"},"Field.filteredLookupInfo property"),(0,n.kt)("p",null,"If the field is a reference field type with a lookup filter, filteredLookupInfo contains the lookup filter information for the field. If there is no lookup filter, or the filter is inactive, this field is null."),(0,n.kt)("p",null,"This field is available in API version 31.0 and later."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"filteredLookupInfo: FilteredLookupInfo;\n")))}s.isMDXComponent=!0}}]);