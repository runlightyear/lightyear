"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[57537],{57522:(t,e,r)=>{r.d(e,{Zo:()=>m,kt:()=>d});var n=r(29901);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function p(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var l=n.createContext({}),c=function(t){var e=n.useContext(l),r=e;return t&&(r="function"==typeof t?t(e):o(o({},e),t)),r},m=function(t){var e=c(t.components);return n.createElement(l.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},u=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,i=t.originalType,l=t.parentName,m=p(t,["components","mdxType","originalType","parentName"]),u=c(r),d=a,f=u["".concat(l,".").concat(d)]||u[d]||s[d]||i;return r?n.createElement(f,o(o({ref:e},m),{},{components:r})):n.createElement(f,o({ref:e},m))}));function d(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var i=r.length,o=new Array(i);o[0]=u;var p={};for(var l in e)hasOwnProperty.call(e,l)&&(p[l]=e[l]);p.originalType=t,p.mdxType="string"==typeof t?t:a,o[1]=p;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},27060:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var n=r(14090),a=(r(29901),r(57522));const i={},o=void 0,p={unversionedId:"api/notion.timestampsortcriteria",id:"api/notion.timestampsortcriteria",title:"notion.timestampsortcriteria",description:"Home &gt; @runlightyear/notion &gt; TimestampSortCriteria",source:"@site/docs/api/notion.timestampsortcriteria.md",sourceDirName:"api",slug:"/api/notion.timestampsortcriteria",permalink:"/docs/api/notion.timestampsortcriteria",draft:!1,tags:[],version:"current",frontMatter:{}},l={},c=[{value:"TimestampSortCriteria interface",id:"timestampsortcriteria-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],m={toc:c};function s(t){let{components:e,...r}=t;return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion.timestampsortcriteria"},"TimestampSortCriteria")),(0,a.kt)("h2",{id:"timestampsortcriteria-interface"},"TimestampSortCriteria interface"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"interface TimestampSortCriteria \n")),(0,a.kt)("h2",{id:"required-properties"},"Required Properties"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Property"),(0,a.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.timestampsortcriteria.direction"},"direction")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.sortdirection"},"SortDirection")),(0,a.kt)("td",{parentName:"tr",align:null},"The direction to sort.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.timestampsortcriteria.timestamp"},"timestamp")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.timestamp"},"Timestamp")),(0,a.kt)("td",{parentName:"tr",align:null},"The name of the timestamp to sort against.")))))}s.isMDXComponent=!0}}]);