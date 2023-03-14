"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[55040],{57522:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>d});var o=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?n(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,o,a=function(e,r){if(null==e)return{};var t,o,a={},n=Object.keys(e);for(o=0;o<n.length;o++)t=n[o],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)t=n[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=o.createContext({}),p=function(e){var r=o.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},c=function(e){var r=p(e.components);return o.createElement(s.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},f=o.forwardRef((function(e,r){var t=e.components,a=e.mdxType,n=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),f=p(t),d=a,m=f["".concat(s,".").concat(d)]||f[d]||u[d]||n;return t?o.createElement(m,i(i({ref:r},c),{},{components:t})):o.createElement(m,i({ref:r},c))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var n=t.length,i=new Array(n);i[0]=f;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<n;p++)i[p]=t[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}f.displayName="MDXCreateElement"},87811:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>n,metadata:()=>l,toc:()=>p});var o=t(14090),a=(t(29901),t(57522));const n={},i=void 0,l={unversionedId:"api/airtable.listrecordsprops.filterbyformula",id:"api/airtable.listrecordsprops.filterbyformula",title:"airtable.listrecordsprops.filterbyformula",description:"Home &gt; @runlightyear/airtable &gt; ListRecordsProps &gt; filterByFormula",source:"@site/docs/api/airtable.listrecordsprops.filterbyformula.md",sourceDirName:"api",slug:"/api/airtable.listrecordsprops.filterbyformula",permalink:"/docs/api/airtable.listrecordsprops.filterbyformula",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"ListRecordsProps.filterByFormula property",id:"listrecordspropsfilterbyformula-property",level:2}],c={toc:p};function u(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,o.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/airtable.listrecordsprops"},"ListRecordsProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/airtable.listrecordsprops.filterbyformula"},"filterByFormula")),(0,a.kt)("h2",{id:"listrecordspropsfilterbyformula-property"},"ListRecordsProps.filterByFormula property"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,a.kt)("p",null,'A formula used to filter records. The formula will be evaluated for each record, and if the result is not 0, false, "", NaN, ',"[","]",", or ","#","Error! the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request."),(0,a.kt)("p",null,"If combined with the view parameter, only records in that view which satisfy the formula will be returned."),(0,a.kt)("p",null,"The formula must be encoded first before passing it as a value. You can use this tool to not only encode the formula but also create the entire url you need."),(0,a.kt)("p",null,"Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/","{","baseId","}","/","{","tableIdOrName","}","/listRecords while passing the parameters within the body of the request instead of the query parameters."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"filterByFormula?: string;\n")))}u.isMDXComponent=!0}}]);