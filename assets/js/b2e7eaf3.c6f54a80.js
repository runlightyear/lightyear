"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[65868],{62757:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>y});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),c=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},b=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(r),b=n,y=m["".concat(p,".").concat(b)]||m[b]||u[b]||i;return r?a.createElement(y,o(o({ref:t},s),{},{components:r})):a.createElement(y,o({ref:t},s))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=b;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[m]="string"==typeof e?e:n,o[1]=l;for(var c=2;c<i;c++)o[c]=r[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},20372:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=r(94790),n=(r(67308),r(62757));const i={},o=void 0,l={unversionedId:"api/airtable.airtable.whoami",id:"api/airtable.airtable.whoami",title:"airtable.airtable.whoami",description:"Home &gt; @runlightyear/airtable &gt; Airtable &gt; whoami",source:"@site/docs/api/airtable.airtable.whoami.md",sourceDirName:"api",slug:"/api/airtable.airtable.whoami",permalink:"/docs/api/airtable.airtable.whoami",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"Airtable.whoami() method",id:"airtablewhoami-method",level:2},{value:"Example",id:"example",level:2}],s={toc:c},m="wrapper";function u(e){let{components:t,...r}=e;return(0,n.yg)(m,(0,a.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.airtable"},"Airtable")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.airtable.whoami"},"whoami")),(0,n.yg)("h2",{id:"airtablewhoami-method"},"Airtable.whoami() method"),(0,n.yg)("p",null,"Retrieve the user ID and, for OAuth access tokens, the scopes associated with the token used."),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"whoami(): Promise<WhoamiResponse>;\n")),(0,n.yg)("b",null,"Returns:"),(0,n.yg)("p",null,"Promise","<",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.whoamiresponse"},"WhoamiResponse"),">"),(0,n.yg)("h2",{id:"example"},"Example"),(0,n.yg)("p",null,"Who am I?"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Airtable } from "@runlightyear/airtable";\n\ndefineAction({\n  name: "whoami",\n  title: "Who Am I?",\n  apps: ["airtable"],\n  run: async ({ auths, variables }) => {\n    const airtable = new Airtable({ auth: auths.airtable });\n\n    const response = await airtable.whoami();\n\n    console.log("Response: ", response.data);\n  },\n});\n')))}u.isMDXComponent=!0}}]);