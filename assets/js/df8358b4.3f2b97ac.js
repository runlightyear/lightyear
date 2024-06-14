"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[52581],{57522:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>y});var n=t(29901);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),l=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},c=function(e){var r=l(e.components);return n.createElement(i.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=l(t),y=o,f=d["".concat(i,".").concat(y)]||d[y]||u[y]||a;return t?n.createElement(f,p(p({ref:r},c),{},{components:t})):n.createElement(f,p({ref:r},c))}));function y(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=d;var s={};for(var i in r)hasOwnProperty.call(r,i)&&(s[i]=r[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,p[1]=s;for(var l=2;l<a;l++)p[l]=t[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},99012:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>p,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var n=t(14090),o=(t(29901),t(57522));const a={},p=void 0,s={unversionedId:"api/gcal.listeventsprops.orderby",id:"api/gcal.listeventsprops.orderby",title:"gcal.listeventsprops.orderby",description:"Home &gt; @runlightyear/gcal &gt; ListEventsProps &gt; orderBy",source:"@site/docs/api/gcal.listeventsprops.orderby.md",sourceDirName:"api",slug:"/api/gcal.listeventsprops.orderby",permalink:"/docs/api/gcal.listeventsprops.orderby",draft:!1,tags:[],version:"current",frontMatter:{}},i={},l=[{value:"ListEventsProps.orderBy property",id:"listeventspropsorderby-property",level:2}],c={toc:l};function u(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/gcal.listeventsprops"},"ListEventsProps")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/gcal.listeventsprops.orderby"},"orderBy")),(0,o.kt)("h2",{id:"listeventspropsorderby-property"},"ListEventsProps.orderBy property"),(0,o.kt)("p",null,"The order of the events returned in the result. Optional. The default is an unspecified, stable order."),(0,o.kt)("p",null,'Acceptable values are?: "startTime"?: Order by the start date/time (ascending). This is only available when querying single events (i.e. the parameter singleEvents is True) "updated"?: Order by last modification time (ascending).'),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'orderBy?: "startTime" | "updated";\n')))}u.isMDXComponent=!0}}]);