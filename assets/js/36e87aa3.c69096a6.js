"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[78990],{57522:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var a=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),i=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=i(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=i(n),g=r,h=c["".concat(l,".").concat(g)]||c[g]||d[g]||s;return n?a.createElement(h,p(p({ref:t},u),{},{components:n})):a.createElement(h,p({ref:t},u))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,p=new Array(s);p[0]=c;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,p[1]=o;for(var i=2;i<s;i++)p[i]=n[i];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},15515:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>i});var a=n(14090),r=(n(29901),n(57522));const s={},p=void 0,o={unversionedId:"api/gsheets.googlesheets.appendvalues",id:"api/gsheets.googlesheets.appendvalues",title:"gsheets.googlesheets.appendvalues",description:"Home &gt; @runlightyear/gsheets &gt; GoogleSheets &gt; appendValues",source:"@site/docs/api/gsheets.googlesheets.appendvalues.md",sourceDirName:"api",slug:"/api/gsheets.googlesheets.appendvalues",permalink:"/docs/api/gsheets.googlesheets.appendvalues",draft:!1,tags:[],version:"current",frontMatter:{}},l={},i=[{value:"GoogleSheets.appendValues() method",id:"googlesheetsappendvalues-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],u={toc:i};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gsheets"},"@runlightyear/gsheets")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gsheets.googlesheets"},"GoogleSheets")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gsheets.googlesheets.appendvalues"},"appendValues")),(0,r.kt)("h2",{id:"googlesheetsappendvalues-method"},"GoogleSheets.appendValues() method"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,r.kt)("p",null,"Appends values to a spreadsheet."),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"appendValues(props: AppendValuesProps): Promise<AppendValuesResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops"},"AppendValuesProps")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gsheets.appendvaluesresponse"},"AppendValuesResponse"),">"),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("p",null,"Append a row"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleSheets } from "@runlightyear/gsheets";\n\ndefineAction({\n  name: "appendRow",\n  title: "Append Row",\n  apps: ["gsheets"],\n  variables: ["spreadsheetId"],\n  run: async ({ auths, variables }) => {\n    const gsheets = new GoogleSheets({\n      auth: auths.gsheets,\n    });\n    const response = await gsheets.appendValues({\n      spreadsheetId: variables.spreadsheetId!,\n      range: "1:1",\n      valueInputOption: "RAW",\n      valueRange: {\n        range: "1:1",\n        values: [[1, 2, 3]],\n      },\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("p",null,"Append multiple rows"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleSheets } from "@runlightyear/gsheets";\n\ndefineAction({\n  name: "appendRows",\n  title: "Append Multiple Rows",\n  apps: ["gsheets"],\n  variables: ["spreadsheetId"],\n  run: async ({ auths, variables }) => {\n    const gsheets = new GoogleSheets({\n      auth: auths.gsheets,\n    });\n    const response = await gsheets.appendValues({\n      spreadsheetId: variables.spreadsheetId!,\n      range: "1:1",\n      valueInputOption: "RAW",\n      valueRange: {\n        range: "1:1",\n        values: [\n          [1, 2, 3],\n          [4, 5, 6],\n          [7, 8, 9],\n        ],\n      },\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')))}d.isMDXComponent=!0}}]);