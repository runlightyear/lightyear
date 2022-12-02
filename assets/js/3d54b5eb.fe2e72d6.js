"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3298],{7522:(t,e,a)=>{a.d(e,{Zo:()=>d,kt:()=>k});var r=a(9901);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},l=Object.keys(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var p=r.createContext({}),u=function(t){var e=r.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},d=function(t){var e=u(t.components);return r.createElement(p.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},h=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,l=t.originalType,p=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),h=u(a),k=n,m=h["".concat(p,".").concat(k)]||h[k]||s[k]||l;return a?r.createElement(m,i(i({ref:e},d),{},{components:a})):r.createElement(m,i({ref:e},d))}));function k(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var l=a.length,i=new Array(l);i[0]=h;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:n,i[1]=o;for(var u=2;u<l;u++)i[u]=a[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}h.displayName="MDXCreateElement"},3082:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var r=a(4090),n=(a(9901),a(7522));const l={},i=void 0,o={unversionedId:"api/github.github",id:"api/github.github",title:"github.github",description:"Home &gt; @runlightyear/github &gt; Github",source:"@site/docs/api/github.github.md",sourceDirName:"api",slug:"/api/github.github",permalink:"/lightyear/docs/api/github.github",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.github.md",tags:[],version:"current",frontMatter:{}},p={},u=[{value:"Github class",id:"github-class",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2},{value:"Constructors",id:"constructors",level:2},{value:"Gist Methods",id:"gist-methods",level:2},{value:"Issue Methods",id:"issue-methods",level:2},{value:"Pull Request Methods",id:"pull-request-methods",level:2},{value:"Repo Methods",id:"repo-methods",level:2},{value:"Repo Content Methods",id:"repo-content-methods",level:2},{value:"Webhook Methods",id:"webhook-methods",level:2},{value:"Webhook Payload Methods",id:"webhook-payload-methods",level:2},{value:"Other Methods",id:"other-methods",level:2}],d={toc:u};function s(t){let{components:e,...a}=t;return(0,n.kt)("wrapper",(0,r.Z)({},d,a,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github.github"},"Github")),(0,n.kt)("h2",{id:"github-class"},"Github class"),(0,n.kt)("p",null,"Connector to the Github API"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"declare class Github extends RestConnector \n")),(0,n.kt)("p",null,"Extends: ",(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/lightyear.restconnector"},"RestConnector")),(0,n.kt)("h2",{id:"example-1"},"Example 1"),(0,n.kt)("p",null,"Import"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Github } from "@runlightyear/github"\n')),(0,n.kt)("h2",{id:"example-2"},"Example 2"),(0,n.kt)("p",null,"Define an auth"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'const githubAuth = Github.defineAuth({ name: "github" });\n')),(0,n.kt)("h2",{id:"example-3"},"Example 3"),(0,n.kt)("p",null,"List all github repos"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"const github = new Github({ auth: githubAuth });\nawait github.listRepos();\n")),(0,n.kt)("h2",{id:"constructors"},"Constructors"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Constructor"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github._constructor_"},"(constructor)(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Constructs a new instance of the ",(0,n.kt)("code",null,"Github")," class")))),(0,n.kt)("h2",{id:"gist-methods"},"Gist Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.creategist"},"createGist(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Create a gist")))),(0,n.kt)("h2",{id:"issue-methods"},"Issue Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.createissue"},"createIssue(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Create an issue")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.updateissue"},"updateIssue(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Update an issue")))),(0,n.kt)("h2",{id:"pull-request-methods"},"Pull Request Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.createpullrequest"},"createPullRequest(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Create a pull request")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.createreviewcommentforpullrequest"},"createReviewCommentForPullRequest(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Create a review comment for a pull request")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.updatepullrequest"},"updatePullRequest(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Update a pull request")))),(0,n.kt)("h2",{id:"repo-methods"},"Repo Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.listorganizationrepositories"},"listOrganizationRepositories(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"List organization repositories")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.listrepositoriesforauthenticateduser"},"listRepositoriesForAuthenticatedUser(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"List repositories for the authenticated user")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.listrepositoriesforuser"},"listRepositoriesForUser(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"List repositories for a user")))),(0,n.kt)("h2",{id:"repo-content-methods"},"Repo Content Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.downloadrepoarchivetar"},"downloadRepoArchiveTar(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Download a repository archive (tar)")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.downloadrepoarchivezip"},"downloadRepoArchiveZip(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Download a repository archive (zip)")))),(0,n.kt)("h2",{id:"webhook-methods"},"Webhook Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.createrepositorywebhook"},"createRepositoryWebhook(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Create a repository webhook")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.deleterepositorywebhook"},"deleteRepositoryWebhook(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Delete a repository webhook")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.getrepositorywebhook"},"getRepositoryWebhook(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Get a repository webhook")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.listrepositorywebhooks"},"listRepositoryWebhooks(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"List repository webhooks")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.pingrepositorywebhook"},"pingRepositoryWebhook(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Ping a repository webhook")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.testpushrepositorywebhook"},"testPushRepositoryWebhook(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Test the push repository webhook")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.updaterepositorywebhook"},"updateRepositoryWebhook(options)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Update a repository webhook")))),(0,n.kt)("h2",{id:"webhook-payload-methods"},"Webhook Payload Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.pingpayload"},"pingPayload(data)")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"static")),(0,n.kt)("td",{parentName:"tr",align:null},"Ping Payload")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.pullrequestpayload"},"pullRequestPayload(data)")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"static")),(0,n.kt)("td",{parentName:"tr",align:null},"Pull Request Payload")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.pullrequestreviewpayload"},"pullRequestReviewPayload(data)")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"static")),(0,n.kt)("td",{parentName:"tr",align:null},"Pull Request Review Payload")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.pushpayload"},"pushPayload(data)")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"static")),(0,n.kt)("td",{parentName:"tr",align:null},"Push Payload")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.workflowrunpayload"},"workflowRunPayload(data)")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"static")),(0,n.kt)("td",{parentName:"tr",align:null},"Workflow Run Payload")))),(0,n.kt)("h2",{id:"other-methods"},"Other Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/lightyear/docs/api/github.github.iswebhookeventtype"},"isWebhookEventType(expectedEvent, deliveryData)")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"static")),(0,n.kt)("td",{parentName:"tr",align:null},"Verify type of webhook event")))))}s.isMDXComponent=!0}}]);