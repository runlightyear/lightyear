"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[18412],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=s(r),f=o,b=d["".concat(p,".").concat(f)]||d[f]||u[f]||a;return r?n.createElement(b,c(c({ref:t},l),{},{components:r})):n.createElement(b,c({ref:t},l))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var s=2;s<a;s++)c[s]=r[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},65914:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var n=r(14090),o=(r(29901),r(57522));const a={},c=void 0,i={unversionedId:"api/slack.sectionprops.blockid",id:"api/slack.sectionprops.blockid",title:"slack.sectionprops.blockid",description:"Home &gt; @runlightyear/slack &gt; SectionProps &gt; blockId",source:"@site/docs/api/slack.sectionprops.blockid.md",sourceDirName:"api",slug:"/api/slack.sectionprops.blockid",permalink:"/docs/api/slack.sectionprops.blockid",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[{value:"SectionProps.blockId property",id:"sectionpropsblockid-property",level:2}],l={toc:s};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.sectionprops"},"SectionProps")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.sectionprops.blockid"},"blockId")),(0,o.kt)("h2",{id:"sectionpropsblockid-property"},"SectionProps.blockId property"),(0,o.kt)("p",null,"A string acting as a unique identifier for a block. If not specified, one will be generated. You can use this block","_","id when you receive an interaction payload to identify the source of the action. Maximum length for this field is 255 characters. block","_","id should be unique for each message and each iteration of a message. If a message is updated, use a new block","_","id."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"blockId?: string;\n")))}u.isMDXComponent=!0}}]);