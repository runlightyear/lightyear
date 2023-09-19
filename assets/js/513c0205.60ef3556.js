"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[50901],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},s=Object.keys(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),i=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=i(e.components);return a.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=i(r),d=n,g=u["".concat(l,".").concat(d)]||u[d]||h[d]||s;return r?a.createElement(g,o(o({ref:t},c),{},{components:r})):a.createElement(g,o({ref:t},c))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,o=new Array(s);o[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:n,o[1]=p;for(var i=2;i<s;i++)o[i]=r[i];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},99878:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>p,toc:()=>i});var a=r(14090),n=(r(29901),r(57522));const s={},o=void 0,p={unversionedId:"api/gsheets.googlesheets.createspreadsheet",id:"api/gsheets.googlesheets.createspreadsheet",title:"gsheets.googlesheets.createspreadsheet",description:"Home &gt; @runlightyear/gsheets &gt; GoogleSheets &gt; createSpreadsheet",source:"@site/docs/api/gsheets.googlesheets.createspreadsheet.md",sourceDirName:"api",slug:"/api/gsheets.googlesheets.createspreadsheet",permalink:"/docs/api/gsheets.googlesheets.createspreadsheet",draft:!1,tags:[],version:"current",frontMatter:{}},l={},i=[{value:"GoogleSheets.createSpreadsheet() method",id:"googlesheetscreatespreadsheet-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],c={toc:i};function h(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gsheets"},"@runlightyear/gsheets")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gsheets.googlesheets"},"GoogleSheets")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gsheets.googlesheets.createspreadsheet"},"createSpreadsheet")),(0,n.kt)("h2",{id:"googlesheetscreatespreadsheet-method"},"GoogleSheets.createSpreadsheet() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,n.kt)("p",null,"Creates a spreadsheet, returning the newly created spreadsheet."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"createSpreadsheet(props: CreateSpreadsheetProps): Promise<CreateSpreadsheetResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/gsheets.createspreadsheetprops"},"CreateSpreadsheetProps")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gsheets.createspreadsheetresponse"},"CreateSpreadsheetResponse"),">"),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("p",null,"Create a spreadsheet"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleSheets } from "@runlightyear/gsheets";\n\ndefineAction({\n  name: "createSpreadsheet",\n  title: "Create Spreadsheet",\n  apps: ["gsheets"],\n  variables: ["title"],\n  run: async ({ auths, variables }) => {\n    const gsheets = new GoogleSheets({\n      auth: auths.gsheets,\n    });\n\n    const response = await gsheets.createSpreadsheet({\n      title: variables.title!,\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')))}h.isMDXComponent=!0}}]);