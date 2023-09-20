"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[27059],{57522:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(29901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),i=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=i(n),f=a,g=d["".concat(c,".").concat(f)]||d[f]||u[f]||o;return n?r.createElement(g,s(s({ref:t},l),{},{components:n})):r.createElement(g,s({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,s[1]=p;for(var i=2;i<o;i++)s[i]=n[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},99493:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>i});var r=n(14090),a=(n(29901),n(57522));const o={},s=void 0,p={unversionedId:"api/gcal.createeventprops.sendupdates",id:"api/gcal.createeventprops.sendupdates",title:"gcal.createeventprops.sendupdates",description:"Home &gt; @runlightyear/gcal &gt; CreateEventProps &gt; sendUpdates",source:"@site/docs/api/gcal.createeventprops.sendupdates.md",sourceDirName:"api",slug:"/api/gcal.createeventprops.sendupdates",permalink:"/docs/api/gcal.createeventprops.sendupdates",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"CreateEventProps.sendUpdates property",id:"createeventpropssendupdates-property",level:2}],l={toc:i};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops"},"CreateEventProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops.sendupdates"},"sendUpdates")),(0,a.kt)("h2",{id:"createeventpropssendupdates-property"},"CreateEventProps.sendUpdates property"),(0,a.kt)("p",null,"Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false."),(0,a.kt)("p",null,'Acceptable values are: "all": Notifications are sent to all guests. "externalOnly": Notifications are sent to non-Google Calendar guests only. "none": No notifications are sent. Warning: Using the value none can have significant adverse effects, including events not syncing to external calendars or events being lost altogether for some users. For calendar migration tasks, consider using the events.import method instead.'),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'sendUpdates?: "all" | "externalOnly" | "none";\n')))}u.isMDXComponent=!0}}]);