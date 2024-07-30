"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[78085],{62757:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>h});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var m=a.createContext({}),c=function(e){var t=a.useContext(m),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(m.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,m=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),s=c(r),g=n,h=s["".concat(m,".").concat(g)]||s[g]||u[g]||i;return r?a.createElement(h,l(l({ref:t},p),{},{components:r})):a.createElement(h,l({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=g;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o[s]="string"==typeof e?e:n,l[1]=o;for(var c=2;c<i;c++)l[c]=r[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}g.displayName="MDXCreateElement"},86669:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=r(94790),n=(r(67308),r(62757));const i={},l=void 0,o={unversionedId:"api/github.github.matchallcommits",id:"api/github.github.matchallcommits",title:"github.github.matchallcommits",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; matchAllCommits",source:"@site/docs/api/github.github.matchallcommits.md",sourceDirName:"api",slug:"/api/github.github.matchallcommits",permalink:"/docs/api/github.github.matchallcommits",draft:!1,tags:[],version:"current",frontMatter:{}},m={},c=[{value:"GitHub.matchAllCommits() method",id:"githubmatchallcommits-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],p={toc:c},s="wrapper";function u(e){let{components:t,...r}=e;return(0,n.yg)(s,(0,a.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.github.matchallcommits"},"matchAllCommits")),(0,n.yg)("h2",{id:"githubmatchallcommits-method"},"GitHub.matchAllCommits() method"),(0,n.yg)("p",null,"Match all commits"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"static matchAllCommits(props: MatchAllCommitsProps): string[];\n")),(0,n.yg)("h2",{id:"parameters"},"Parameters"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"props"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.matchallcommitsprops"},"MatchAllCommitsProps")),(0,n.yg)("td",{parentName:"tr",align:null})))),(0,n.yg)("b",null,"Returns:"),(0,n.yg)("p",null,"string","[","]"),(0,n.yg)("h2",{id:"example"},"Example"),(0,n.yg)("p",null,"Match Linear identifiers in an array of commits"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},'const response = await github.compareTwoCommits({\n  owner: "<owner>",\n  repo: "<repo>",\n  basehead: `${prevCommitId}...${newCommitId}`,\n});\n\nconst { commits } = response.data;\n\nconst matches = GitHub.matchAllCommits({ regex: /ENG-[0-9]+/, commits });\n')))}u.isMDXComponent=!0}}]);