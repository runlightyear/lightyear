"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[74804],{57522:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>b});var a=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),p=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=p(e.components);return a.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),m=p(n),b=r,h=m["".concat(u,".").concat(b)]||m[b]||c[b]||i;return n?a.createElement(h,s(s({ref:t},l),{},{components:n})):a.createElement(h,s({ref:t},l))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var p=2;p<i;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},11703:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(14090),r=(n(29901),n(57522));const i={},s=void 0,o={unversionedId:"api/github.github.updateissue",id:"api/github.github.updateissue",title:"github.github.updateissue",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; updateIssue",source:"@site/docs/api/github.github.updateissue.md",sourceDirName:"api",slug:"/api/github.github.updateissue",permalink:"/docs/api/github.github.updateissue",draft:!1,tags:[],version:"current",frontMatter:{}},u={},p=[{value:"GitHub.updateIssue() method",id:"githubupdateissue-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2}],l={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/github.github.updateissue"},"updateIssue")),(0,r.kt)("h2",{id:"githubupdateissue-method"},"GitHub.updateIssue() method"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,r.kt)("p",null,"Update an issue"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"updateIssue(props: UpdateIssueProps): Promise<HttpProxyResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops"},"UpdateIssueProps")),(0,r.kt)("td",{parentName:"tr",align:null},"props")))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/lightyear.httpproxyresponse"},"HttpProxyResponse"),">"),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("p",null,"Assign an issue"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "assignIssue",\n  title: "Assign Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "issueNumber",\n    "assignee",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const result = await github.updateIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      issueNumber: parseInt(variables.issueNumber!),\n      assignees: [variables.assignee!],\n    });\n    console.log("Issue: ", result.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("p",null,"Label an issue"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "labelIssue",\n  title: "Label Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "issueNumber",\n    "label",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.updateIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      issueNumber: parseInt(variables.issueNumber!),\n      labels: [variables.label!],\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-3"},"Example 3"),(0,r.kt)("p",null,"Complete an issue"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "completeIssue",\n  title: "Complete Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "issueNumber",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.updateIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      issueNumber: parseInt(variables.issueNumber!),\n      state: "closed",\n      stateReason: "completed",\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')))}c.isMDXComponent=!0}}]);