"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[60231],{57522:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=s(r),d=o,m=u["".concat(l,".").concat(d)]||u[d]||f[d]||c;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,a=new Array(c);a[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var s=2;s<c;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},22328:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>c,metadata:()=>i,toc:()=>s});var n=r(14090),o=(r(29901),r(57522));const c={},a=void 0,i={unversionedId:"api/slack.sectionblock.fields",id:"api/slack.sectionblock.fields",title:"slack.sectionblock.fields",description:"Home &gt; @runlightyear/slack &gt; SectionBlock &gt; fields",source:"@site/docs/api/slack.sectionblock.fields.md",sourceDirName:"api",slug:"/api/slack.sectionblock.fields",permalink:"/docs/api/slack.sectionblock.fields",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"SectionBlock.fields property",id:"sectionblockfields-property",level:2}],p={toc:s};function f(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.sectionblock"},"SectionBlock")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.sectionblock.fields"},"fields")),(0,o.kt)("h2",{id:"sectionblockfields-property"},"SectionBlock.fields property"),(0,o.kt)("p",null,"Required if no text is provided. An array of text objects. Any text objects included with fields will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10. Maximum length for the text in each item is 2000 characters."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"fields?: TextObject[];\n")))}f.isMDXComponent=!0}}]);