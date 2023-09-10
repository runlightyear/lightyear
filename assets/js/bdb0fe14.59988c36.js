"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[43015],{57522:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,b=u["".concat(l,".").concat(m)]||u[m]||c[m]||o;return n?a.createElement(b,i(i({ref:t},d),{},{components:n})):a.createElement(b,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},89557:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var a=n(14090),r=(n(29901),n(57522));const o={},i=void 0,p={unversionedId:"api/notion.notion.onupdateddatabaseitems",id:"api/notion.notion.onupdateddatabaseitems",title:"notion.notion.onupdateddatabaseitems",description:"Home &gt; @runlightyear/notion &gt; Notion &gt; onUpdatedDatabaseItems",source:"@site/docs/api/notion.notion.onupdateddatabaseitems.md",sourceDirName:"api",slug:"/api/notion.notion.onupdateddatabaseitems",permalink:"/docs/api/notion.notion.onupdateddatabaseitems",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"Notion.onUpdatedDatabaseItems() method",id:"notiononupdateddatabaseitems-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],d={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion"},"Notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion.onupdateddatabaseitems"},"onUpdatedDatabaseItems")),(0,r.kt)("h2",{id:"notiononupdateddatabaseitems-method"},"Notion.onUpdatedDatabaseItems() method"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,r.kt)("p",null,"On Updated Database Items"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"static onUpdatedDatabaseItems(props: OnUpdatedDatabaseItemsProps): string;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},"OnUpdatedDatabaseItemsProps"),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"string"),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("p",null,"On updated database items"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Notion } from "@runlightyear/notion";\n\nNotion.onUpdatedDatabaseItems({\n  name: "onUpdatedDatabaseItems",\n  title: "On Updated Database Items",\n  pollingFrequency: 1,\n  run: async ({ data }) => {\n    console.log("Updated database items:", data);\n  },\n});\n')))}c.isMDXComponent=!0}}]);