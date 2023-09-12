"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[94077],{57522:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>m});var r=a(29901);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,l=function(e,t){if(null==e)return{};var a,r,l={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var d=r.createContext({}),p=function(e){var t=r.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=p(e.components);return r.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,l=e.mdxType,n=e.originalType,d=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(a),m=l,b=u["".concat(d,".").concat(m)]||u[m]||c[m]||n;return a?r.createElement(b,i(i({ref:t},s),{},{components:a})):r.createElement(b,i({ref:t},s))}));function m(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var n=a.length,i=new Array(n);i[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:l,i[1]=o;for(var p=2;p<n;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},15414:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>c,frontMatter:()=>n,metadata:()=>o,toc:()=>p});var r=a(14090),l=(a(29901),a(57522));const n={},i=void 0,o={unversionedId:"api/airtable.airtable",id:"api/airtable.airtable",title:"airtable.airtable",description:"Home &gt; @runlightyear/airtable &gt; Airtable",source:"@site/docs/api/airtable.airtable.md",sourceDirName:"api",slug:"/api/airtable.airtable",permalink:"/docs/api/airtable.airtable",draft:!1,tags:[],version:"current",frontMatter:{}},d={},p=[{value:"Airtable class",id:"airtable-class",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2},{value:"Example 4",id:"example-4",level:2},{value:"Example 5",id:"example-5",level:2},{value:"Example 6",id:"example-6",level:2},{value:"Example 7",id:"example-7",level:2},{value:"Example 8",id:"example-8",level:2},{value:"Constructors",id:"constructors",level:2},{value:"Meta Methods",id:"meta-methods",level:2},{value:"Records Methods",id:"records-methods",level:2}],s={toc:p};function c(e){let{components:t,...a}=e;return(0,l.kt)("wrapper",(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/airtable.airtable"},"Airtable")),(0,l.kt)("h2",{id:"airtable-class"},"Airtable class"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,l.kt)("p",null,"Connector to the Airtable API"),(0,l.kt)("b",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"declare class Airtable extends RestConnector \n")),(0,l.kt)("p",null,"Extends: "),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api/lightyear.restconnector"},"RestConnector")),(0,l.kt)("h2",{id:"example-1"},"Example 1"),(0,l.kt)("p",null,"Import"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Airtable } from "@runlightyear/airtable"\n')),(0,l.kt)("h2",{id:"example-2"},"Example 2"),(0,l.kt)("p",null,"Use in an action"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'defineAction({\n  name: "airtableExample",\n  title: "Airtable Example"\n  apps: ["airtable"],\n  run: async ({ auths }) => {\n    const airtable = new Airtable({ auth: auths.airtable });\n  }\n}\n')),(0,l.kt)("h2",{id:"example-3"},"Example 3"),(0,l.kt)("p",null,"Create a single record"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'const result = await airtable.createRecords({\n  baseId: "baseId",\n  tableIdOrName: "tableIdOrName",\n  fields: {\n    Name: "North Beach",\n  },\n});\n\nif ("id" in result.data) {\n  console.log("Created record", result.data.id);\n}\n')),(0,l.kt)("h2",{id:"example-4"},"Example 4"),(0,l.kt)("p",null,"Create multiple records"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'const result = await airtable.createRecords({\n  baseId: "baseId",\n  tableIdOrName: "tableIdOrName",\n  records: [\n    {\n      fields: {\n        Name: "Union Square",\n      },\n    },\n    {\n      fields: {\n        Name: "Ferry Building",\n      },\n    },\n  ],\n});\n\nif ("records" in result.data) {\n  console.log(\n    "Created records",\n    result.data.records.map((record) => record.id)\n  );\n}\n')),(0,l.kt)("h2",{id:"example-5"},"Example 5"),(0,l.kt)("p",null,"Get a record"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'const result = await airtable.getRecord({\n  baseId: "baseId",\n  tableIdOrName: "tableIdOrName",\n  recordId: "recordId",\n});\nconsole.log("Record: ", result.data);\n')),(0,l.kt)("h2",{id:"example-6"},"Example 6"),(0,l.kt)("p",null,"Update a record"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'const result = await airtable.updateRecord({\n  baseId: "baseId",\n  tableIdOrName: "tableIdOrName",\n  recordId: "recordId",\n  fields: {\n    Name: "Russian Hill",\n  },\n});\nconsole.log("New record: ", result.data);\n')),(0,l.kt)("h2",{id:"example-7"},"Example 7"),(0,l.kt)("p",null,"Delete a record"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'const result = await airtable.deleteRecord({\n  baseId: "baseId",\n  tableIdOrName: "tableIdOrName",\n  recordId: "recordId",\n});\nif (result.data.deleted) {\n  console.log("Deleted record", result.data.id);\n}\n')),(0,l.kt)("h2",{id:"example-8"},"Example 8"),(0,l.kt)("p",null,"List records"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'const result = await airtable.listRecords({\n  baseId: "baseId",\n  tableIdOrName: "tableIdOrName",\n});\nconst records = result.data.records;\nconsole.log(\n  "Names: ",\n  records.map((record) => record.fields["Name"])\n);\n')),(0,l.kt)("h2",{id:"constructors"},"Constructors"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Constructor"),(0,l.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/airtable.airtable._constructor_"},"(constructor)(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Constructs a new instance of the ",(0,l.kt)("code",null,"Airtable")," class")))),(0,l.kt)("h2",{id:"meta-methods"},"Meta Methods"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Method"),(0,l.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/airtable.airtable.whoami"},"whoami()")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Retrieve the user ID and, for OAuth access tokens, the scopes associated with the token used.")))),(0,l.kt)("h2",{id:"records-methods"},"Records Methods"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Method"),(0,l.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/airtable.airtable.createrecords"},"createRecords(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Creates multiple records.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/airtable.airtable.deleterecord"},"deleteRecord(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Delete record")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/airtable.airtable.getrecord"},"getRecord(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Get record")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/airtable.airtable.listrecords"},"listRecords(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," List records in a table.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/airtable.airtable.updaterecord"},"updateRecord(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Update record")))))}c.isMDXComponent=!0}}]);