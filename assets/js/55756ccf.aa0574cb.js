"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[94828],{57522:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>u});var n=r(29901);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),f=c(r),u=i,d=f["".concat(l,".").concat(u)]||f[u]||s[u]||a;return r?n.createElement(d,o(o({ref:t},m),{},{components:r})):n.createElement(d,o({ref:t},m))}));function u(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=f;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:i,o[1]=p;for(var c=2;c<a;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},64122:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>s,frontMatter:()=>a,metadata:()=>p,toc:()=>c});var n=r(14090),i=(r(29901),r(57522));const a={},o=void 0,p={unversionedId:"api/notion.timestampfilter",id:"api/notion.timestampfilter",title:"notion.timestampfilter",description:"Home &gt; @runlightyear/notion &gt; TimestampFilter",source:"@site/docs/api/notion.timestampfilter.md",sourceDirName:"api",slug:"/api/notion.timestampfilter",permalink:"/docs/api/notion.timestampfilter",draft:!1,tags:[],version:"current",frontMatter:{}},l={},c=[{value:"TimestampFilter type",id:"timestampfilter-type",level:2}],m={toc:c};function s(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/notion.timestampfilter"},"TimestampFilter")),(0,i.kt)("h2",{id:"timestampfilter-type"},"TimestampFilter type"),(0,i.kt)("b",null,"Signature:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"declare type TimestampFilter = CreatedTimeFilter | LastEditedTimeFilter;\n")),(0,i.kt)("b",null,"References:"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/api/notion.createdtimefilter"},"CreatedTimeFilter"),", ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/notion.lasteditedtimefilter"},"LastEditedTimeFilter")))}s.isMDXComponent=!0}}]);