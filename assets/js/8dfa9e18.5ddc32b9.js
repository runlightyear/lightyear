"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[71419],{57522:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>v});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),p=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},i=function(e){var t=p(e.components);return n.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),g=p(r),v=a,y=g["".concat(u,".").concat(v)]||g[v]||c[v]||o;return r?n.createElement(y,l(l({ref:t},i),{},{components:r})):n.createElement(y,l({ref:t},i))}));function v(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=g;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,l[1]=s;for(var p=2;p<o;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},88361:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=r(14090),a=(r(29901),r(57522));const o={},l=void 0,s={unversionedId:"api/gsheets.valuerange.values",id:"api/gsheets.valuerange.values",title:"gsheets.valuerange.values",description:"Home &gt; @runlightyear/gsheets &gt; ValueRange &gt; values",source:"@site/docs/api/gsheets.valuerange.values.md",sourceDirName:"api",slug:"/api/gsheets.valuerange.values",permalink:"/docs/api/gsheets.valuerange.values",draft:!1,tags:[],version:"current",frontMatter:{}},u={},p=[{value:"ValueRange.values property",id:"valuerangevalues-property",level:2}],i={toc:p};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gsheets"},"@runlightyear/gsheets")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gsheets.valuerange"},"ValueRange")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gsheets.valuerange.values"},"values")),(0,a.kt)("h2",{id:"valuerangevalues-property"},"ValueRange.values property"),(0,a.kt)("p",null,"The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell."),(0,a.kt)("p",null,"For output, empty trailing rows and columns will not be included."),(0,a.kt)("p",null,"For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"values: Array<Array<boolean | string | number>>;\n")))}c.isMDXComponent=!0}}]);