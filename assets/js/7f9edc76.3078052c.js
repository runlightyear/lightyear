"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[70434],{62757:(e,r,t)=>{t.d(r,{xA:()=>p,yg:()=>m});var n=t(67308);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),f=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},p=function(e){var r=f(e.components);return n.createElement(c.Provider,{value:r},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),s=f(t),d=o,m=s["".concat(c,".").concat(d)]||s[d]||u[d]||a;return t?n.createElement(m,l(l({ref:r},p),{},{components:t})):n.createElement(m,l({ref:r},p))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,l=new Array(a);l[0]=d;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i[s]="string"==typeof e?e:o,l[1]=i;for(var f=2;f<a;f++)l[f]=t[f];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},44780:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>f});var n=t(94790),o=(t(67308),t(62757));const a={},l=void 0,i={unversionedId:"api/salesforce.field.formula",id:"api/salesforce.field.formula",title:"salesforce.field.formula",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; formula",source:"@site/docs/api/salesforce.field.formula.md",sourceDirName:"api",slug:"/api/salesforce.field.formula",permalink:"/docs/api/salesforce.field.formula",draft:!1,tags:[],version:"current",frontMatter:{}},c={},f=[{value:"Field.formula property",id:"fieldformula-property",level:2}],p={toc:f},s="wrapper";function u(e){let{components:r,...t}=e;return(0,o.yg)(s,(0,n.A)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field.formula"},"formula")),(0,o.yg)("h2",{id:"fieldformula-property"},"Field.formula property"),(0,o.yg)("p",null,"The formula specified for this field. If no formula is specified for this field, it is not returned."),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"formula: string;\n")))}u.isMDXComponent=!0}}]);