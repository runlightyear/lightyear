"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[90654],{57522:(e,r,t)=>{t.d(r,{Zo:()=>i,kt:()=>d});var a=t(29901);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},s=Object.keys(e);for(a=0;a<s.length;a++)t=s[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)t=s[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=a.createContext({}),c=function(e){var r=a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},i=function(e){var r=c(e.components);return a.createElement(p.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},m=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,s=e.originalType,p=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),m=c(t),d=n,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||s;return t?a.createElement(f,l(l({ref:r},i),{},{components:t})):a.createElement(f,l({ref:r},i))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var s=t.length,l=new Array(s);l[0]=m;var o={};for(var p in r)hasOwnProperty.call(r,p)&&(o[p]=r[p]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var c=2;c<s;c++)l[c]=t[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},22297:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var a=t(14090),n=(t(29901),t(57522));const s={},l=void 0,o={unversionedId:"api/gcal.listcalendarsprops.maxresults",id:"api/gcal.listcalendarsprops.maxresults",title:"gcal.listcalendarsprops.maxresults",description:"Home &gt; @runlightyear/gcal &gt; ListCalendarsProps &gt; maxResults",source:"@site/docs/api/gcal.listcalendarsprops.maxresults.md",sourceDirName:"api",slug:"/api/gcal.listcalendarsprops.maxresults",permalink:"/docs/api/gcal.listcalendarsprops.maxresults",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"ListCalendarsProps.maxResults property",id:"listcalendarspropsmaxresults-property",level:2}],i={toc:c};function u(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},i,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gcal.listcalendarsprops"},"ListCalendarsProps")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gcal.listcalendarsprops.maxresults"},"maxResults")),(0,n.kt)("h2",{id:"listcalendarspropsmaxresults-property"},"ListCalendarsProps.maxResults property"),(0,n.kt)("p",null,"Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"maxResults?: number;\n")))}u.isMDXComponent=!0}}]);