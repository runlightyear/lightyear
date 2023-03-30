"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[62155],{57522:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>d});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),s=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},l=function(e){var r=s(e.components);return n.createElement(i.Provider,{value:r},e.children)},f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(t),d=a,v=u["".concat(i,".").concat(d)]||u[d]||f[d]||o;return t?n.createElement(v,c(c({ref:r},l),{},{components:t})):n.createElement(v,c({ref:r},l))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=u;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,c[1]=p;for(var s=2;s<o;s++)c[s]=t[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},92281:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>c,default:()=>f,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var n=t(14090),a=(t(29901),t(57522));const o={},c=void 0,p={unversionedId:"api/gcal.createeventprops.conferencedataversion",id:"api/gcal.createeventprops.conferencedataversion",title:"gcal.createeventprops.conferencedataversion",description:"Home &gt; @runlightyear/gcal &gt; CreateEventProps &gt; conferenceDataVersion",source:"@site/docs/api/gcal.createeventprops.conferencedataversion.md",sourceDirName:"api",slug:"/api/gcal.createeventprops.conferencedataversion",permalink:"/docs/api/gcal.createeventprops.conferencedataversion",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"CreateEventProps.conferenceDataVersion property",id:"createeventpropsconferencedataversion-property",level:2}],l={toc:s};function f(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops"},"CreateEventProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops.conferencedataversion"},"conferenceDataVersion")),(0,a.kt)("h2",{id:"createeventpropsconferencedataversion-property"},"CreateEventProps.conferenceDataVersion property"),(0,a.kt)("p",null,"Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. Acceptable values are 0 to 1, inclusive."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"conferenceDataVersion?: number;\n")))}f.isMDXComponent=!0}}]);