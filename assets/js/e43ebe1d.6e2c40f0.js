"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[93565],{57522:(e,r,t)=>{t.d(r,{Zo:()=>d,kt:()=>f});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),i=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},d=function(e){var r=i(e.components);return n.createElement(c.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=i(t),f=a,y=u["".concat(c,".").concat(f)]||u[f]||s[f]||o;return t?n.createElement(y,l(l({ref:r},d),{},{components:t})):n.createElement(y,l({ref:r},d))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=u;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,l[1]=p;for(var i=2;i<o;i++)l[i]=t[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},21945:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>l,default:()=>s,frontMatter:()=>o,metadata:()=>p,toc:()=>i});var n=t(14090),a=(t(29901),t(57522));const o={},l=void 0,p={unversionedId:"api/gcal.deleteeventprops.calendarid",id:"api/gcal.deleteeventprops.calendarid",title:"gcal.deleteeventprops.calendarid",description:"Home &gt; @runlightyear/gcal &gt; DeleteEventProps &gt; calendarId",source:"@site/docs/api/gcal.deleteeventprops.calendarid.md",sourceDirName:"api",slug:"/api/gcal.deleteeventprops.calendarid",permalink:"/docs/api/gcal.deleteeventprops.calendarid",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"DeleteEventProps.calendarId property",id:"deleteeventpropscalendarid-property",level:2}],d={toc:i};function s(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.deleteeventprops"},"DeleteEventProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.deleteeventprops.calendarid"},"calendarId")),(0,a.kt)("h2",{id:"deleteeventpropscalendarid-property"},"DeleteEventProps.calendarId property"),(0,a.kt)("p",null,'Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.'),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'calendarId: "primary" | string;\n')))}s.isMDXComponent=!0}}]);