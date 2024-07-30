"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[37367],{62757:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>y});var n=r(67308);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),o=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=o(e.components);return n.createElement(i.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,u=e.originalType,i=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),c=o(r),d=a,y=c["".concat(i,".").concat(d)]||c[d]||g[d]||u;return r?n.createElement(y,l(l({ref:t},s),{},{components:r})):n.createElement(y,l({ref:t},s))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var u=r.length,l=new Array(u);l[0]=d;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[c]="string"==typeof e?e:a,l[1]=p;for(var o=2;o<u;o++)l[o]=r[o];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},75940:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>g,frontMatter:()=>u,metadata:()=>p,toc:()=>o});var n=r(94790),a=(r(67308),r(62757));const u={},l=void 0,p={unversionedId:"api/github.github.updatepullrequest",id:"api/github.github.updatepullrequest",title:"github.github.updatepullrequest",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; updatePullRequest",source:"@site/docs/api/github.github.updatepullrequest.md",sourceDirName:"api",slug:"/api/github.github.updatepullrequest",permalink:"/docs/api/github.github.updatepullrequest",draft:!1,tags:[],version:"current",frontMatter:{}},i={},o=[{value:"GitHub.updatePullRequest() method",id:"githubupdatepullrequest-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],s={toc:o},c="wrapper";function g(e){let{components:t,...r}=e;return(0,a.yg)(c,(0,n.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.github.updatepullrequest"},"updatePullRequest")),(0,a.yg)("h2",{id:"githubupdatepullrequest-method"},"GitHub.updatePullRequest() method"),(0,a.yg)("p",null,"Update a pull request"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"updatePullRequest(props: UpdatePullRequestProps): Promise<HttpProxyResponse>;\n")),(0,a.yg)("h2",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"props"),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/github.updatepullrequestprops"},"UpdatePullRequestProps")),(0,a.yg)("td",{parentName:"tr",align:null},"props")))),(0,a.yg)("b",null,"Returns:"),(0,a.yg)("p",null,"Promise","<",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear.httpproxyresponse"},"HttpProxyResponse"),">"),(0,a.yg)("h2",{id:"example"},"Example"),(0,a.yg)("p",null,"Update a pull request"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "closePullRequest",\n  title: "Close Pull Request",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "pullNumber",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.updatePullRequest({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      pullNumber: parseInt(variables.pullNumber!),\n      state: "closed",\n    });\n    console.log("Closed pull request: ", response.data);\n  },\n});\n')))}g.isMDXComponent=!0}}]);