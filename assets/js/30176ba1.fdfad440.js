"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[90719],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>h});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),p=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(r),h=a,b=m["".concat(u,".").concat(h)]||m[h]||c[h]||i;return r?n.createElement(b,o(o({ref:t},l),{},{components:r})):n.createElement(b,o({ref:t},l))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},21755:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=r(14090),a=(r(29901),r(57522));const i={},o=void 0,s={unversionedId:"api/github.github.createissue",id:"api/github.github.createissue",title:"github.github.createissue",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; createIssue",source:"@site/docs/api/github.github.createissue.md",sourceDirName:"api",slug:"/api/github.github.createissue",permalink:"/docs/api/github.github.createissue",draft:!1,tags:[],version:"current",frontMatter:{}},u={},p=[{value:"GitHub.createIssue() method",id:"githubcreateissue-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],l={toc:p};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github.createissue"},"createIssue")),(0,a.kt)("h2",{id:"githubcreateissue-method"},"GitHub.createIssue() method"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,a.kt)("p",null,"Create an issue"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"createIssue(props: CreateIssueProps): Promise<HttpProxyResponse>;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.createissueprops"},"CreateIssueProps")),(0,a.kt)("td",{parentName:"tr",align:null},"props")))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"Promise","<",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear.httpproxyresponse"},"HttpProxyResponse"),">"),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"Create an issue"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "createIssue",\n  title: "Create Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "title",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.createIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      title: variables.title!,\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')))}c.isMDXComponent=!0}}]);