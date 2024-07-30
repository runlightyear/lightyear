"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[35242],{62757:(e,r,t)=>{t.d(r,{xA:()=>s,yg:()=>g});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),i=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},s=function(e){var r=i(e.components);return n.createElement(l.Provider,{value:r},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,c=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=i(t),y=a,g=d["".concat(l,".").concat(y)]||d[y]||u[y]||c;return t?n.createElement(g,o(o({ref:r},s),{},{components:t})):n.createElement(g,o({ref:r},s))}));function g(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var c=t.length,o=new Array(c);o[0]=y;var p={};for(var l in r)hasOwnProperty.call(r,l)&&(p[l]=r[l]);p.originalType=e,p[d]="string"==typeof e?e:a,o[1]=p;for(var i=2;i<c;i++)o[i]=t[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},44247:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>c,metadata:()=>p,toc:()=>i});var n=t(94790),a=(t(67308),t(62757));const c={},o=void 0,p={unversionedId:"api/gcal.createeventprops.calendarid",id:"api/gcal.createeventprops.calendarid",title:"gcal.createeventprops.calendarid",description:"Home &gt; @runlightyear/gcal &gt; CreateEventProps &gt; calendarId",source:"@site/docs/api/gcal.createeventprops.calendarid.md",sourceDirName:"api",slug:"/api/gcal.createeventprops.calendarid",permalink:"/docs/api/gcal.createeventprops.calendarid",draft:!1,tags:[],version:"current",frontMatter:{}},l={},i=[{value:"CreateEventProps.calendarId property",id:"createeventpropscalendarid-property",level:2}],s={toc:i},d="wrapper";function u(e){let{components:r,...t}=e;return(0,a.yg)(d,(0,n.A)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops"},"CreateEventProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops.calendarid"},"calendarId")),(0,a.yg)("h2",{id:"createeventpropscalendarid-property"},"CreateEventProps.calendarId property"),(0,a.yg)("p",null,'Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.'),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},'calendarId: "primary" | string;\n')))}u.isMDXComponent=!0}}]);