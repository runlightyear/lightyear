"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[49816],{62757:(e,n,r)=>{r.d(n,{xA:()=>s,yg:()=>m});var t=r(67308);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function a(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function l(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=t.createContext({}),p=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):a(a({},n),e)),r},s=function(e){var n=p(e.components);return t.createElement(c.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},y=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(r),y=o,m=d["".concat(c,".").concat(y)]||d[y]||u[y]||i;return r?t.createElement(m,a(a({ref:n},s),{},{components:r})):t.createElement(m,a({ref:n},s))}));function m(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=y;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[d]="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=r[p];return t.createElement.apply(null,a)}return t.createElement.apply(null,r)}y.displayName="MDXCreateElement"},69769:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var t=r(94790),o=(r(67308),r(62757));const i={},a=void 0,l={unversionedId:"api/notion.notion.retrieveblockchildren",id:"api/notion.notion.retrieveblockchildren",title:"notion.notion.retrieveblockchildren",description:"Home &gt; @runlightyear/notion &gt; Notion &gt; retrieveBlockChildren",source:"@site/docs/api/notion.notion.retrieveblockchildren.md",sourceDirName:"api",slug:"/api/notion.notion.retrieveblockchildren",permalink:"/docs/api/notion.notion.retrieveblockchildren",draft:!1,tags:[],version:"current",frontMatter:{}},c={},p=[{value:"Notion.retrieveBlockChildren() method",id:"notionretrieveblockchildren-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],s={toc:p},d="wrapper";function u(e){let{components:n,...r}=e;return(0,o.yg)(d,(0,t.A)({},s,r,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.notion"},"Notion")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.notion.retrieveblockchildren"},"retrieveBlockChildren")),(0,o.yg)("h2",{id:"notionretrieveblockchildren-method"},"Notion.retrieveBlockChildren() method"),(0,o.yg)("p",null,"Retrieve block children"),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"retrieveBlockChildren(props: RetrieveBlockChildrenProps): Promise<RetrieveBlockChildrenResponse>;\n")),(0,o.yg)("h2",{id:"parameters"},"Parameters"),(0,o.yg)("table",null,(0,o.yg)("thead",{parentName:"table"},(0,o.yg)("tr",{parentName:"thead"},(0,o.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,o.yg)("th",{parentName:"tr",align:null},"Type"),(0,o.yg)("th",{parentName:"tr",align:null},"Description"))),(0,o.yg)("tbody",{parentName:"table"},(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},"props"),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.retrieveblockchildrenprops"},"RetrieveBlockChildrenProps")),(0,o.yg)("td",{parentName:"tr",align:null})))),(0,o.yg)("b",null,"Returns:"),(0,o.yg)("p",null,"Promise","<",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.retrieveblockchildrenresponse"},"RetrieveBlockChildrenResponse"),">"),(0,o.yg)("h2",{id:"example"},"Example"),(0,o.yg)("p",null,"Retrieve a block's children"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "retrieveBlockChildren",\n  title: "Retrieve Block Children",\n  apps: ["notion"],\n  variables: ["blockId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({\n      auth: auths.notion,\n    });\n    const response = await notion.retrieveBlockChildren({\n      blockId: variables.blockId!,\n    });\n    console.log("Block children:", response.data);\n  },\n});\n')))}u.isMDXComponent=!0}}]);