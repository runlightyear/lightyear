"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5606],{62757:(e,r,t)=>{t.d(r,{xA:()=>s,yg:()=>b});var a=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=a.createContext({}),c=function(e){var r=a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},s=function(e){var r=c(e.components);return a.createElement(p.Provider,{value:r},e.children)},d="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=c(t),u=n,b=d["".concat(p,".").concat(u)]||d[u]||g[u]||l;return t?a.createElement(b,o(o({ref:r},s),{},{components:t})):a.createElement(b,o({ref:r},s))}));function b(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var l=t.length,o=new Array(l);o[0]=u;var i={};for(var p in r)hasOwnProperty.call(r,p)&&(i[p]=r[p]);i.originalType=e,i[d]="string"==typeof e?e:n,o[1]=i;for(var c=2;c<l;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},14268:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var a=t(94790),n=(t(67308),t(62757));const l={},o=void 0,i={unversionedId:"api/airtable.airtable.getrecord",id:"api/airtable.airtable.getrecord",title:"airtable.airtable.getrecord",description:"Home &gt; @runlightyear/airtable &gt; Airtable &gt; getRecord",source:"@site/docs/api/airtable.airtable.getrecord.md",sourceDirName:"api",slug:"/api/airtable.airtable.getrecord",permalink:"/docs/api/airtable.airtable.getrecord",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"Airtable.getRecord() method",id:"airtablegetrecord-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],s={toc:c},d="wrapper";function g(e){let{components:r,...t}=e;return(0,n.yg)(d,(0,a.A)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.airtable"},"Airtable")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.airtable.getrecord"},"getRecord")),(0,n.yg)("h2",{id:"airtablegetrecord-method"},"Airtable.getRecord() method"),(0,n.yg)("p",null,"Get record"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"getRecord(props: GetRecordProps): Promise<GetRecordResponse>;\n")),(0,n.yg)("h2",{id:"parameters"},"Parameters"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"props"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/airtable.getrecordprops"},"GetRecordProps")),(0,n.yg)("td",{parentName:"tr",align:null})))),(0,n.yg)("b",null,"Returns:"),(0,n.yg)("p",null,"Promise","<",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.getrecordresponse"},"GetRecordResponse"),">"),(0,n.yg)("h2",{id:"example"},"Example"),(0,n.yg)("p",null,"Get a record"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Airtable } from "@runlightyear/airtable";\n\ndefineAction({\n  name: "getRecord",\n  title: "Get Record",\n  apps: ["airtable"],\n  variables: ["baseId", "tableIdOrName", "recordId"],\n  run: async ({ auths, variables }) => {\n    const airtable = new Airtable({\n      auth: auths.airtable,\n    });\n\n    const response = await airtable.getRecord({\n      baseId: variables.baseId!,\n      tableIdOrName: variables.tableIdOrName!,\n      recordId: variables.recordId!,\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')))}g.isMDXComponent=!0}}]);