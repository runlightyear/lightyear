"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[97558],{57522:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(29901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),l=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=l(n),f=a,g=d["".concat(i,".").concat(f)]||d[f]||u[f]||o;return n?r.createElement(g,p(p({ref:t},c),{},{components:n})):r.createElement(g,p({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,p[1]=s;for(var l=2;l<o;l++)p[l]=n[l];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},58575:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>p,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(14090),a=(n(29901),n(57522));const o={},p=void 0,s={unversionedId:"api/gcal.updateeventprops.sendupdates",id:"api/gcal.updateeventprops.sendupdates",title:"gcal.updateeventprops.sendupdates",description:"Home &gt; @runlightyear/gcal &gt; UpdateEventProps &gt; sendUpdates",source:"@site/docs/api/gcal.updateeventprops.sendupdates.md",sourceDirName:"api",slug:"/api/gcal.updateeventprops.sendupdates",permalink:"/docs/api/gcal.updateeventprops.sendupdates",draft:!1,tags:[],version:"current",frontMatter:{}},i={},l=[{value:"UpdateEventProps.sendUpdates property",id:"updateeventpropssendupdates-property",level:2}],c={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.updateeventprops"},"UpdateEventProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.updateeventprops.sendupdates"},"sendUpdates")),(0,a.kt)("h2",{id:"updateeventpropssendupdates-property"},"UpdateEventProps.sendUpdates property"),(0,a.kt)("p",null,"Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false."),(0,a.kt)("p",null,'Acceptable values are: "all": Notifications are sent to all guests. "externalOnly": Notifications are sent to non-Google Calendar guests only. "none": No notifications are sent. Warning: Using the value none can have significant adverse effects, including events not syncing to external calendars or events being lost altogether for some users. For calendar migration tasks, consider using the events.import method instead.'),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'sendUpdates?: "all" | "externalOnly" | "none";\n')))}u.isMDXComponent=!0}}]);