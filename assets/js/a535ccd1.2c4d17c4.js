"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[61017],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>s});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=u(r),s=a,y=m["".concat(i,".").concat(s)]||m[s]||d[s]||o;return r?n.createElement(y,p(p({ref:t},c),{},{components:r})):n.createElement(y,p({ref:t},c))}));function s(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,p[1]=l;for(var u=2;u<o;u++)p[u]=r[u];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},10550:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>p,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=r(14090),a=(r(29901),r(57522));const o={},p=void 0,l={unversionedId:"api/notion.rollupproperty",id:"api/notion.rollupproperty",title:"notion.rollupproperty",description:"Home &gt; @runlightyear/notion &gt; RollupProperty",source:"@site/docs/api/notion.rollupproperty.md",sourceDirName:"api",slug:"/api/notion.rollupproperty",permalink:"/docs/api/notion.rollupproperty",draft:!1,tags:[],version:"current",frontMatter:{}},i={},u=[{value:"RollupProperty interface",id:"rollupproperty-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],c={toc:u};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion.rollupproperty"},"RollupProperty")),(0,a.kt)("h2",{id:"rollupproperty-interface"},"RollupProperty interface"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"interface RollupProperty \n")),(0,a.kt)("h2",{id:"required-properties"},"Required Properties"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Property"),(0,a.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.rollupproperty.id"},"id")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.rollupproperty.rollup"},"rollup")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.arrayrollup"},"ArrayRollup")," ","|"," ",(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.daterollup"},"DateRollup")," ","|"," ",(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.numberrollup"},"NumberRollup")," ","|"," ",(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.incompleterollup"},"IncompleteRollup")," ","|"," ",(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.unsupportedrollup"},"UnsupportedRollup")),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.rollupproperty.type"},"type")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},'"rollup"'),(0,a.kt)("td",{parentName:"tr",align:null})))))}d.isMDXComponent=!0}}]);