"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[67061],{62757:(e,r,t)=>{t.d(r,{xA:()=>l,yg:()=>y});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),s=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},l=function(e){var r=s(e.components);return n.createElement(i.Provider,{value:r},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(t),m=a,y=u["".concat(i,".").concat(m)]||u[m]||d[m]||o;return t?n.createElement(y,c(c({ref:r},l),{},{components:t})):n.createElement(y,c({ref:r},l))}));function y(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=m;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p[u]="string"==typeof e?e:a,c[1]=p;for(var s=2;s<o;s++)c[s]=t[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},24216:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var n=t(94790),a=(t(67308),t(62757));const o={},c=void 0,p={unversionedId:"api/slack.createconversationprops.teamid",id:"api/slack.createconversationprops.teamid",title:"slack.createconversationprops.teamid",description:"Home &gt; @runlightyear/slack &gt; CreateConversationProps &gt; teamId",source:"@site/docs/api/slack.createconversationprops.teamid.md",sourceDirName:"api",slug:"/api/slack.createconversationprops.teamid",permalink:"/docs/api/slack.createconversationprops.teamid",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"CreateConversationProps.teamId property",id:"createconversationpropsteamid-property",level:2}],l={toc:s},u="wrapper";function d(e){let{components:r,...t}=e;return(0,a.yg)(u,(0,n.A)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack.createconversationprops"},"CreateConversationProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack.createconversationprops.teamid"},"teamId")),(0,a.yg)("h2",{id:"createconversationpropsteamid-property"},"CreateConversationProps.teamId property"),(0,a.yg)("p",null,"Encoded team id to create the channel in, required if org token is used"),(0,a.yg)("p",null,"Example T1234567890"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"teamId?: string;\n")))}d.isMDXComponent=!0}}]);