"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[80071],{62757:(e,r,t)=>{t.d(r,{xA:()=>l,yg:()=>y});var o=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},s=Object.keys(e);for(o=0;o<s.length;o++)t=s[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)t=s[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=o.createContext({}),c=function(e){var r=o.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},l=function(e){var r=c(e.components);return o.createElement(i.Provider,{value:r},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},g=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,s=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=c(t),g=n,y=m["".concat(i,".").concat(g)]||m[g]||u[g]||s;return t?o.createElement(y,a(a({ref:r},l),{},{components:t})):o.createElement(y,a({ref:r},l))}));function y(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var s=t.length,a=new Array(s);a[0]=g;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p[m]="string"==typeof e?e:n,a[1]=p;for(var c=2;c<s;c++)a[c]=t[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}g.displayName="MDXCreateElement"},4145:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>p,toc:()=>c});var o=t(94790),n=(t(67308),t(62757));const s={},a=void 0,p={unversionedId:"api/slack.postmessageprops.iconemoji",id:"api/slack.postmessageprops.iconemoji",title:"slack.postmessageprops.iconemoji",description:"Home &gt; @runlightyear/slack &gt; PostMessageProps &gt; iconEmoji",source:"@site/docs/api/slack.postmessageprops.iconemoji.md",sourceDirName:"api",slug:"/api/slack.postmessageprops.iconemoji",permalink:"/docs/api/slack.postmessageprops.iconemoji",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"PostMessageProps.iconEmoji property",id:"postmessagepropsiconemoji-property",level:2}],l={toc:c},m="wrapper";function u(e){let{components:r,...t}=e;return(0,n.yg)(m,(0,o.A)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/slack.postmessageprops"},"PostMessageProps")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/slack.postmessageprops.iconemoji"},"iconEmoji")),(0,n.yg)("h2",{id:"postmessagepropsiconemoji-property"},"PostMessageProps.iconEmoji property"),(0,n.yg)("p",null,"Emoji to use as the icon for this message. Overrides iconUrl. Must be used in conjunction with asUser set to false, otherwise ignored."),(0,n.yg)("p",null,"Example :chart","_","with","_","upwards","_","trend:"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"iconEmoji?: string;\n")))}u.isMDXComponent=!0}}]);