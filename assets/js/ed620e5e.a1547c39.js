"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[83742],{57522:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>d});var a=t(29901);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=a.createContext({}),p=function(e){var r=a.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},s=function(e){var r=p(e.components);return a.createElement(i.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(t),d=n,b=u["".concat(i,".").concat(d)]||u[d]||f[d]||o;return t?a.createElement(b,l(l({ref:r},s),{},{components:t})):a.createElement(b,l({ref:r},s))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,l=new Array(o);l[0]=u;var c={};for(var i in r)hasOwnProperty.call(r,i)&&(c[i]=r[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var p=2;p<o;p++)l[p]=t[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},91584:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>l,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var a=t(14090),n=(t(29901),t(57522));const o={},l=void 0,c={unversionedId:"api/salesforce.field.createable",id:"api/salesforce.field.createable",title:"salesforce.field.createable",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; createable",source:"@site/docs/api/salesforce.field.createable.md",sourceDirName:"api",slug:"/api/salesforce.field.createable",permalink:"/docs/api/salesforce.field.createable",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"Field.createable property",id:"fieldcreateable-property",level:2}],s={toc:p};function f(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.field.createable"},"createable")),(0,n.kt)("h2",{id:"fieldcreateable-property"},"Field.createable property"),(0,n.kt)("p",null,"Indicates whether the field can be created (true) or not (false). If true, then this field value can be set in a create() call."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"createable: boolean;\n")))}f.isMDXComponent=!0}}]);