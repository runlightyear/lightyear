"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[99455],{62757:(e,r,t)=>{t.d(r,{xA:()=>s,yg:()=>m});var n=t(67308);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),l=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},s=function(e){var r=l(e.components);return n.createElement(c.Provider,{value:r},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(t),f=o,m=u["".concat(c,".").concat(f)]||u[f]||y[f]||a;return t?n.createElement(m,i(i({ref:r},s),{},{components:t})):n.createElement(m,i({ref:r},s))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=f;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p[u]="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=t[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},61037:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>y,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var n=t(94790),o=(t(67308),t(62757));const a={},i=void 0,p={unversionedId:"api/notion.sortcriteria",id:"api/notion.sortcriteria",title:"notion.sortcriteria",description:"Home &gt; @runlightyear/notion &gt; SortCriteria",source:"@site/docs/api/notion.sortcriteria.md",sourceDirName:"api",slug:"/api/notion.sortcriteria",permalink:"/docs/api/notion.sortcriteria",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"SortCriteria type",id:"sortcriteria-type",level:2}],s={toc:l},u="wrapper";function y(e){let{components:r,...t}=e;return(0,o.yg)(u,(0,n.A)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.sortcriteria"},"SortCriteria")),(0,o.yg)("h2",{id:"sortcriteria-type"},"SortCriteria type"),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"declare type SortCriteria = PropertyValueSortCriteria | TimestampSortCriteria;\n")),(0,o.yg)("b",null,"References:"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.propertyvaluesortcriteria"},"PropertyValueSortCriteria"),", ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.timestampsortcriteria"},"TimestampSortCriteria")))}y.isMDXComponent=!0}}]);