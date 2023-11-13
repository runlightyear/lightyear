"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[28704],{57522:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(29901);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),s=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=s(a),m=r,b=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return a?n.createElement(b,i(i({ref:t},c),{},{components:a})):n.createElement(b,i({ref:t},c))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<o;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5531:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var n=a(14090),r=(a(29901),a(57522));const o={},i=void 0,p={unversionedId:"api/notion.notion.retrievedatabase",id:"api/notion.notion.retrievedatabase",title:"notion.notion.retrievedatabase",description:"Home &gt; @runlightyear/notion &gt; Notion &gt; retrieveDatabase",source:"@site/docs/api/notion.notion.retrievedatabase.md",sourceDirName:"api",slug:"/api/notion.notion.retrievedatabase",permalink:"/docs/api/notion.notion.retrievedatabase",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"Notion.retrieveDatabase() method",id:"notionretrievedatabase-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],c={toc:s};function u(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion"},"Notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion.retrievedatabase"},"retrieveDatabase")),(0,r.kt)("h2",{id:"notionretrievedatabase-method"},"Notion.retrieveDatabase() method"),(0,r.kt)("p",null,"Retrieve a database"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"retrieveDatabase(props: RetrieveDatabaseProps): Promise<RetrieveDatabaseResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/notion.retrievedatabaseprops"},"RetrieveDatabaseProps")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.retrievedatabaseresponse"},"RetrieveDatabaseResponse"),">"),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("p",null,"Retrieve a database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "retrieveDatabase",\n  title: "Retrieve Database",\n  apps: ["notion"],\n  variables: ["databaseId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({\n      auth: auths.notion,\n    });\n    const response = await notion.retrieveDatabase({\n      databaseId: variables.databaseId!,\n    });\n    console.log("Result: ", response.data);\n  },\n});\n')))}u.isMDXComponent=!0}}]);