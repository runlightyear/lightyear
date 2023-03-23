"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[40231],{57522:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>u});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=s(r),u=a,m=b["".concat(l,".").concat(u)]||b[u]||d[u]||o;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},84253:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(14090),a=(r(29901),r(57522));const o={},i=void 0,c={unversionedId:"api/airtable.airtablescope",id:"api/airtable.airtablescope",title:"airtable.airtablescope",description:"Home &gt; @runlightyear/airtable &gt; AirtableScope",source:"@site/docs/api/airtable.airtablescope.md",sourceDirName:"api",slug:"/api/airtable.airtablescope",permalink:"/docs/api/airtable.airtablescope",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"AirtableScope type",id:"airtablescope-type",level:2}],p={toc:s};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/airtable.airtablescope"},"AirtableScope")),(0,a.kt)("h2",{id:"airtablescope-type"},"AirtableScope type"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'declare type AirtableScope = \n/**\n * See the data in records\n *\n * List records\n * Get record\n */\n"data.records:read"\n/**\n * Create, edit, and delete records\n *\n * Delete multiple records\n * Update multiple records\n * Create records\n * Sync CSV data\n * Delete record\n * Update record\n */\n | "data.records:write"\n/**\n * See comments in records\n *\n * List comments\n */\n | "data.recordComments:read"\n/**\n * Create, edit, and delete record comments\n *\n * Create comment\n * Delete comment\n * Update comment\n */\n | "data.recordComments:write"\n/**\n * See the structure of a base, like table names or field types\n *\n * List bases\n * Get base schema\n */\n | "schema.bases:read"\n/**\n * Edit the structure of a base, like adding new fields or tables\n *\n * Create base\n * Create table\n * Update table\n * Create field\n * Update field\n * Sync CSV data\n */\n | "schema.bases:write"\n/**\n * View, create, delete webhooks for a base, as well as fetch webhook payloads.\n *\n * List webhooks\n * Create a webhook\n * Delete a webhook\n * Enable/disable webhook notifications\n * Refresh a webhook\n */\n | "webhook:manage";\n')))}d.isMDXComponent=!0}}]);