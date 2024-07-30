"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[26335],{62757:(e,r,t)=>{t.d(r,{xA:()=>d,yg:()=>b});var n=t(67308);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),p=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},d=function(e){var r=p(e.components);return n.createElement(l.Provider,{value:r},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),s=p(t),f=o,b=s["".concat(l,".").concat(f)]||s[f]||u[f]||i;return t?n.createElement(b,a(a({ref:r},d),{},{components:t})):n.createElement(b,a({ref:r},d))}));function b(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=f;var c={};for(var l in r)hasOwnProperty.call(r,l)&&(c[l]=r[l]);c.originalType=e,c[s]="string"==typeof e?e:o,a[1]=c;for(var p=2;p<i;p++)a[p]=t[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},96896:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var n=t(94790),o=(t(67308),t(62757));const i={},a=void 0,c={unversionedId:"api/slack.dividerblock.blockid",id:"api/slack.dividerblock.blockid",title:"slack.dividerblock.blockid",description:"Home &gt; @runlightyear/slack &gt; DividerBlock &gt; blockId",source:"@site/docs/api/slack.dividerblock.blockid.md",sourceDirName:"api",slug:"/api/slack.dividerblock.blockid",permalink:"/docs/api/slack.dividerblock.blockid",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"DividerBlock.blockId property",id:"dividerblockblockid-property",level:2}],d={toc:p},s="wrapper";function u(e){let{components:r,...t}=e;return(0,o.yg)(s,(0,n.A)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack.dividerblock"},"DividerBlock")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack.dividerblock.blockid"},"blockId")),(0,o.yg)("h2",{id:"dividerblockblockid-property"},"DividerBlock.blockId property"),(0,o.yg)("p",null,"A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block","_","id should be unique for each message and each iteration of a message. If a message is updated, use a new block","_","id."),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"blockId?: string;\n")))}u.isMDXComponent=!0}}]);