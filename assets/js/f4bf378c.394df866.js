"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[90349],{57522:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,y=d["".concat(p,".").concat(m)]||d[m]||c[m]||o;return n?a.createElement(y,i(i({ref:t},u),{},{components:n})):a.createElement(y,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},80891:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=n(14090),r=(n(29901),n(57522));const o={},i=void 0,l={unversionedId:"api/notion.notion.querydatabase",id:"api/notion.notion.querydatabase",title:"notion.notion.querydatabase",description:"Home &gt; @runlightyear/notion &gt; Notion &gt; queryDatabase",source:"@site/docs/api/notion.notion.querydatabase.md",sourceDirName:"api",slug:"/api/notion.notion.querydatabase",permalink:"/docs/api/notion.notion.querydatabase",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[{value:"Notion.queryDatabase() method",id:"notionquerydatabase-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],u={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion"},"Notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion.querydatabase"},"queryDatabase")),(0,r.kt)("h2",{id:"notionquerydatabase-method"},"Notion.queryDatabase() method"),(0,r.kt)("p",null,"Query a database"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"queryDatabase(props: QueryDatabaseProps): Promise<QueryDatabaseResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/notion.querydatabaseprops"},"QueryDatabaseProps")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.querydatabaseresponse"},"QueryDatabaseResponse"),">"),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("p",null,"Query a database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "queryDatabase",\n  title: "Query Database",\n  apps: ["notion"],\n  variables: ["databaseId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({\n      auth: auths.notion,\n    });\n    const response = await notion.queryDatabase({\n      databaseId: variables.databaseId!,\n    });\n    console.log("Query result: ", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("p",null,"Query a database with filter"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "queryDatabaseWithFilter",\n  title: "Query Database With Filter",\n  apps: ["notion"],\n  variables: ["databaseId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({\n      auth: auths.notion,\n    });\n    const response = await notion.queryDatabase({\n      databaseId: variables.databaseId!,\n      filter: {\n        property: "Name",\n        richText: {\n          isNotEmpty: true,\n        },\n      },\n    });\n    console.log("Result: ", response.data);\n  },\n});\n')))}c.isMDXComponent=!0}}]);