"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[67141],{57522:(t,e,n)=>{n.d(e,{Zo:()=>p,kt:()=>y});var r=n(29901);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var l=r.createContext({}),s=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},p=function(t){var e=s(t.components);return r.createElement(l.Provider,{value:e},t.children)},f={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,i=t.originalType,l=t.parentName,p=c(t,["components","mdxType","originalType","parentName"]),u=s(n),y=a,g=u["".concat(l,".").concat(y)]||u[y]||f[y]||i;return n?r.createElement(g,o(o({ref:e},p),{},{components:n})):r.createElement(g,o({ref:e},p))}));function y(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var l in e)hasOwnProperty.call(e,l)&&(c[l]=e[l]);c.originalType=t,c.mdxType="string"==typeof t?t:a,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},77999:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var r=n(14090),a=(n(29901),n(57522));const i={},o=void 0,c={unversionedId:"api/gcal.calendarlistentry.notificationsettings",id:"api/gcal.calendarlistentry.notificationsettings",title:"gcal.calendarlistentry.notificationsettings",description:"Home &gt; @runlightyear/gcal &gt; CalendarListEntry &gt; notificationSettings",source:"@site/docs/api/gcal.calendarlistentry.notificationsettings.md",sourceDirName:"api",slug:"/api/gcal.calendarlistentry.notificationsettings",permalink:"/docs/api/gcal.calendarlistentry.notificationsettings",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"CalendarListEntry.notificationSettings property",id:"calendarlistentrynotificationsettings-property",level:2}],p={toc:s};function f(t){let{components:e,...n}=t;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.calendarlistentry"},"CalendarListEntry")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.calendarlistentry.notificationsettings"},"notificationSettings")),(0,a.kt)("h2",{id:"calendarlistentrynotificationsettings-property"},"CalendarListEntry.notificationSettings property"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"notificationSettings: {\n        notifications: [\n            {\n                type: string;\n                method: string;\n            }\n        ];\n    };\n")))}f.isMDXComponent=!0}}]);