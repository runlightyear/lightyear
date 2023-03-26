"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[86589],{57522:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>f});var n=t(29901);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=n.createContext({}),l=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},s=function(e){var r=l(e.components);return n.createElement(p.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=l(t),f=o,b=u["".concat(p,".").concat(f)]||u[f]||d[f]||i;return t?n.createElement(b,a(a({ref:r},s),{},{components:t})):n.createElement(b,a({ref:r},s))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=u;var c={};for(var p in r)hasOwnProperty.call(r,p)&&(c[p]=r[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},22586:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var n=t(14090),o=(t(29901),t(57522));const i={},a=void 0,c={unversionedId:"api/slack.dividerprops.blockid",id:"api/slack.dividerprops.blockid",title:"slack.dividerprops.blockid",description:"Home &gt; @runlightyear/slack &gt; DividerProps &gt; blockId",source:"@site/docs/api/slack.dividerprops.blockid.md",sourceDirName:"api",slug:"/api/slack.dividerprops.blockid",permalink:"/docs/api/slack.dividerprops.blockid",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"DividerProps.blockId property",id:"dividerpropsblockid-property",level:2}],s={toc:l};function d(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.dividerprops"},"DividerProps")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.dividerprops.blockid"},"blockId")),(0,o.kt)("h2",{id:"dividerpropsblockid-property"},"DividerProps.blockId property"),(0,o.kt)("p",null,"A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block","_","id should be unique for each message and each iteration of a message. If a message is updated, use a new block","_","id."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"blockId?: string;\n")))}d.isMDXComponent=!0}}]);