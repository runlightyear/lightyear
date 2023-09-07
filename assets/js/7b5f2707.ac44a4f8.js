"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[45966],{57522:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),c=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),s=c(r),m=n,b=s["".concat(i,".").concat(m)]||s[m]||u[m]||o;return r?a.createElement(b,l(l({ref:t},d),{},{components:r})):a.createElement(b,l({ref:t},d))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=s;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,l[1]=p;for(var c=2;c<o;c++)l[c]=r[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}s.displayName="MDXCreateElement"},41121:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var a=r(14090),n=(r(29901),r(57522));const o={},l=void 0,p={unversionedId:"api/airtable.airtable.updaterecord",id:"api/airtable.airtable.updaterecord",title:"airtable.airtable.updaterecord",description:"Home &gt; @runlightyear/airtable &gt; Airtable &gt; updateRecord",source:"@site/docs/api/airtable.airtable.updaterecord.md",sourceDirName:"api",slug:"/api/airtable.airtable.updaterecord",permalink:"/docs/api/airtable.airtable.updaterecord",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"Airtable.updateRecord() method",id:"airtableupdaterecord-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],d={toc:c};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.airtable"},"Airtable")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.airtable.updaterecord"},"updateRecord")),(0,n.kt)("h2",{id:"airtableupdaterecord-method"},"Airtable.updateRecord() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"Update record"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"updateRecord(props: UpdateRecordProps): Promise<UpdateRecordResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/airtable.updaterecordprops"},"UpdateRecordProps")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.updaterecordresponse"},"UpdateRecordResponse"),">"),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("p",null,"Update a record"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'const result = await airtable.updateRecord({\n  baseId: "baseId",\n  tableIdOrName: "tableIdOrName",\n  recordId: "recordId",\n  fields: {\n    Name: "Russian Hill",\n  },\n});\nconsole.log("New record: ", result.data);\n')))}u.isMDXComponent=!0}}]);