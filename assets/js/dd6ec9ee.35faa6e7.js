"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[65206],{62757:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>m});var n=r(67308);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},f="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),f=c(r),s=o,m=f["".concat(l,".").concat(s)]||f[s]||y[s]||i;return r?n.createElement(m,a(a({ref:t},u),{},{components:r})):n.createElement(m,a({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=s;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[f]="string"==typeof e?e:o,a[1]=p;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},60498:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>y,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var n=r(94790),o=(r(67308),r(62757));const i={},a=void 0,p={unversionedId:"api/notion.filter",id:"api/notion.filter",title:"notion.filter",description:"Home &gt; @runlightyear/notion &gt; Filter",source:"@site/docs/api/notion.filter.md",sourceDirName:"api",slug:"/api/notion.filter",permalink:"/docs/api/notion.filter",draft:!1,tags:[],version:"current",frontMatter:{}},l={},c=[{value:"Filter type",id:"filter-type",level:2}],u={toc:c},f="wrapper";function y(e){let{components:t,...r}=e;return(0,o.yg)(f,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.filter"},"Filter")),(0,o.yg)("h2",{id:"filter-type"},"Filter type"),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"declare type Filter = PropertyFilter | TimestampFilter | CompoundFilter;\n")),(0,o.yg)("b",null,"References:"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.propertyfilter"},"PropertyFilter"),", ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.timestampfilter"},"TimestampFilter"),", ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.compoundfilter"},"CompoundFilter")))}y.isMDXComponent=!0}}]);