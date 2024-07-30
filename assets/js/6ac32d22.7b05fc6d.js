"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[74780],{62757:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>y});var n=r(67308);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=l(r),f=i,y=m["".concat(s,".").concat(f)]||m[f]||u[f]||a;return r?n.createElement(y,o(o({ref:t},c),{},{components:r})):n.createElement(y,o({ref:t},c))}));function y(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=f;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[m]="string"==typeof e?e:i,o[1]=p;for(var l=2;l<a;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},38712:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var n=r(94790),i=(r(67308),r(62757));const a={},o=void 0,p={unversionedId:"api/gcal.listeventsprops.timemin",id:"api/gcal.listeventsprops.timemin",title:"gcal.listeventsprops.timemin",description:"Home &gt; @runlightyear/gcal &gt; ListEventsProps &gt; timeMin",source:"@site/docs/api/gcal.listeventsprops.timemin.md",sourceDirName:"api",slug:"/api/gcal.listeventsprops.timemin",permalink:"/docs/api/gcal.listeventsprops.timemin",draft:!1,tags:[],version:"current",frontMatter:{}},s={},l=[{value:"ListEventsProps.timeMin property",id:"listeventspropstimemin-property",level:2}],c={toc:l},m="wrapper";function u(e){let{components:t,...r}=e;return(0,i.yg)(m,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/gcal.listeventsprops"},"ListEventsProps")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/gcal.listeventsprops.timemin"},"timeMin")),(0,i.yg)("h2",{id:"listeventspropstimemin-property"},"ListEventsProps.timeMin property"),(0,i.yg)("p",null,"Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10?:00?:00-07?:00, 2011-06-03T10?:00?:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax."),(0,i.yg)("b",null,"Signature:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-typescript"},"timeMin?: DateTime;\n")))}u.isMDXComponent=!0}}]);