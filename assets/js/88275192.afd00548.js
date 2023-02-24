"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4358],{57522:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),m=n,b=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return r?a.createElement(b,i(i({ref:t},p),{},{components:r})):a.createElement(b,i({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1139:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=r(14090),n=(r(29901),r(57522));const o={},i=void 0,l={unversionedId:"api/airtable.airtable.listrecords",id:"api/airtable.airtable.listrecords",title:"airtable.airtable.listrecords",description:"Home &gt; @runlightyear/airtable &gt; Airtable &gt; listRecords",source:"@site/docs/api/airtable.airtable.listrecords.md",sourceDirName:"api",slug:"/api/airtable.airtable.listrecords",permalink:"/docs/api/airtable.airtable.listrecords",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"Airtable.listRecords() method",id:"airtablelistrecords-method",level:2},{value:"Parameters",id:"parameters",level:2}],p={toc:c};function d(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.airtable"},"Airtable")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.airtable.listrecords"},"listRecords")),(0,n.kt)("h2",{id:"airtablelistrecords-method"},"Airtable.listRecords() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"List records in a table. Note that table names and table ids can be used interchangeably. We recommend using table IDs so you don't need to modify your API request when your table name changes."),(0,n.kt)("p",null,"The server returns one page of records at a time. Each page will contain pageSize records, which is 100 by default. If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters. Pagination will stop when you've reached the end of your table. If the maxRecords parameter is passed, pagination will stop once you've reached this maximum."),(0,n.kt)("p",null,'Returned records do not include any fields with "empty" values, e.g. "", ',"[","]",", or false."),(0,n.kt)("p",null,"You can filter, sort, and format the results with query parameters. Note that these parameters need to be URL encoded. You can use our API URL encoder tool to help with this. If you are using a helper library like Airtable.js, these parameters will be automatically encoded."),(0,n.kt)("p",null,"Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/","{","baseId","}","/","{","tableIdOrName","}","/listRecords while passing the parameters within the body of the request instead of the query parameters."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"listRecords(props: ListRecordsProps): Promise<ListRecordsResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/airtable.listrecordsprops"},"ListRecordsProps")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.listrecordsresponse"},"ListRecordsResponse"),">"))}d.isMDXComponent=!0}}]);