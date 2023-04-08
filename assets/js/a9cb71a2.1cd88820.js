"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[20617],{57522:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>u});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),f=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=f(e.components);return n.createElement(c.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=f(t),u=a,m=d["".concat(c,".").concat(u)]||d[u]||s[u]||o;return t?n.createElement(m,i(i({ref:r},p),{},{components:t})):n.createElement(m,i({ref:r},p))}));function u(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=d;var l={};for(var c in r)hasOwnProperty.call(r,c)&&(l[c]=r[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var f=2;f<o;f++)i[f]=t[f];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},43331:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>f});var n=t(14090),a=(t(29901),t(57522));const o={},i=void 0,l={unversionedId:"api/salesforce.field.referencetargetfield",id:"api/salesforce.field.referencetargetfield",title:"salesforce.field.referencetargetfield",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; referenceTargetField",source:"@site/docs/api/salesforce.field.referencetargetfield.md",sourceDirName:"api",slug:"/api/salesforce.field.referencetargetfield",permalink:"/docs/api/salesforce.field.referencetargetfield",draft:!1,tags:[],version:"current",frontMatter:{}},c={},f=[{value:"Field.referenceTargetField property",id:"fieldreferencetargetfield-property",level:2}],p={toc:f};function s(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field.referencetargetfield"},"referenceTargetField")),(0,a.kt)("h2",{id:"fieldreferencetargetfield-property"},"Field.referenceTargetField property"),(0,a.kt)("p",null,"Applies only to indirect lookup relationships on external objects. Name of the custom field on the parent standard or custom object whose values are matched against the values of the child external object's indirect lookup relationship field. This matching is done to determine which records are related to each other. This field is available in API version 32.0 and later."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"referenceTargetField: string;\n")))}s.isMDXComponent=!0}}]);