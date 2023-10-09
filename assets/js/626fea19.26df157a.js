"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[11710],{57522:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var r=n(29901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(f,p(p({ref:t},l),{},{components:n})):r.createElement(f,p({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var c=2;c<o;c++)p[c]=n[c];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},49230:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=n(14090),a=(n(29901),n(57522));const o={},p=void 0,i={unversionedId:"api/gcal.onnewandupdatedeventsprops.timemax",id:"api/gcal.onnewandupdatedeventsprops.timemax",title:"gcal.onnewandupdatedeventsprops.timemax",description:"Home &gt; @runlightyear/gcal &gt; OnNewAndUpdatedEventsProps &gt; timeMax",source:"@site/docs/api/gcal.onnewandupdatedeventsprops.timemax.md",sourceDirName:"api",slug:"/api/gcal.onnewandupdatedeventsprops.timemax",permalink:"/docs/api/gcal.onnewandupdatedeventsprops.timemax",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"OnNewAndUpdatedEventsProps.timeMax property",id:"onnewandupdatedeventspropstimemax-property",level:2}],l={toc:c};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.onnewandupdatedeventsprops"},"OnNewAndUpdatedEventsProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.onnewandupdatedeventsprops.timemax"},"timeMax")),(0,a.kt)("h2",{id:"onnewandupdatedeventspropstimemax-property"},"OnNewAndUpdatedEventsProps.timeMax property"),(0,a.kt)("p",null,"Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10?:00?:00-07?:00, 2011-06-03T10?:00?:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"timeMax?: DateTime;\n")))}d.isMDXComponent=!0}}]);