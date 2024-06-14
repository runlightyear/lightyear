"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[36271],{57522:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>k});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),p=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},s=function(e){var r=p(e.components);return n.createElement(i.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(t),k=a,f=u["".concat(i,".").concat(k)]||u[k]||d[k]||o;return t?n.createElement(f,c(c({ref:r},s),{},{components:t})):n.createElement(f,c({ref:r},s))}));function k(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=u;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,c[1]=l;for(var p=2;p<o;p++)c[p]=t[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},21998:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=t(14090),a=(t(29901),t(57522));const o={},c=void 0,l={unversionedId:"api/slack.headerblock.blockid",id:"api/slack.headerblock.blockid",title:"slack.headerblock.blockid",description:"Home &gt; @runlightyear/slack &gt; HeaderBlock &gt; blockId",source:"@site/docs/api/slack.headerblock.blockid.md",sourceDirName:"api",slug:"/api/slack.headerblock.blockid",permalink:"/docs/api/slack.headerblock.blockid",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"HeaderBlock.blockId property",id:"headerblockblockid-property",level:2}],s={toc:p};function d(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/slack.headerblock"},"HeaderBlock")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/slack.headerblock.blockid"},"blockId")),(0,a.kt)("h2",{id:"headerblockblockid-property"},"HeaderBlock.blockId property"),(0,a.kt)("p",null,"A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block","_","id should be unique for each message and each iteration of a message. If a message is updated, use a new block","_","id."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"blockId?: string;\n")))}d.isMDXComponent=!0}}]);