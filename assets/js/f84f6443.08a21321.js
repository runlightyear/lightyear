"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[72837],{57522:(e,n,r)=>{r.d(n,{Zo:()=>p,kt:()=>d});var t=r(29901);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function a(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function s(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=t.createContext({}),l=function(e){var n=t.useContext(u),r=n;return e&&(r="function"==typeof e?e(n):a(a({},n),e)),r},p=function(e){var n=l(e.components);return t.createElement(u.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},g=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),g=l(r),d=o,f=g["".concat(u,".").concat(d)]||g[d]||c[d]||i;return r?t.createElement(f,a(a({ref:n},p),{},{components:r})):t.createElement(f,a({ref:n},p))}));function d(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=g;var s={};for(var u in n)hasOwnProperty.call(n,u)&&(s[u]=n[u]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=r[l];return t.createElement.apply(null,a)}return t.createElement.apply(null,r)}g.displayName="MDXCreateElement"},50936:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>u,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var t=r(14090),o=(r(29901),r(57522));const i={},a=void 0,s={unversionedId:"api/github.workflowrun",id:"api/github.workflowrun",title:"github.workflowrun",description:"Home &gt; @runlightyear/github &gt; WorkflowRun",source:"@site/docs/api/github.workflowrun.md",sourceDirName:"api",slug:"/api/github.workflowrun",permalink:"/docs/api/github.workflowrun",draft:!1,tags:[],version:"current",frontMatter:{}},u={},l=[{value:"WorkflowRun type",id:"workflowrun-type",level:2}],p={toc:l};function c(e){let{components:n,...r}=e;return(0,o.kt)("wrapper",(0,t.Z)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.workflowrun"},"WorkflowRun")),(0,o.kt)("h2",{id:"workflowrun-type"},"WorkflowRun type"),(0,o.kt)("p",null,"Documentation:",(0,o.kt)("a",{parentName:"p",href:"https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads?actionType=requested%5C#workflow%5C_run"},"https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads?actionType=requested\\#workflow\\_run")),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'declare type WorkflowRun = {\n    actor: User | null;\n    artifactsUrl: string;\n    cancelUrl: string;\n    checkSuiteId: number;\n    checkSuiteNodeId: string;\n    checkSuiteUrl: string;\n    conclusion: "success" | "failure" | "neutral" | "cancelled" | "timed_out" | "action_required" | "stale" | "skipped" | "startup_failure" | null;\n    createdAt: string;\n    event: string;\n    headBranch: string | null;\n    headCommit: {\n        author: {\n            date: string;\n            email: string | null;\n            name: string;\n            username: string;\n        };\n        committer: {\n            date: string;\n            email: string | null;\n            name: string;\n            username: string;\n        };\n        id: string;\n        message: string;\n        timestamp: string;\n        tree_id: string;\n    };\n    headRepository: Repository;\n    headSha: string;\n    htmlUrl: string;\n    id: number;\n    jobsUrl: string;\n    logsUrl: string;\n    name: string | null;\n    nodeId: string;\n    path: string;\n    previousAttemptUrl: string | null;\n    pullRequests: Array<{\n        base: {\n            ref: string;\n            repo: {\n                id: number;\n                name: string;\n                url: string;\n            };\n            sha: string;\n        };\n        head: {\n            ref: string;\n            repo: {\n                id: number;\n                name: string;\n                url: string;\n            };\n            sha: string;\n        };\n        id: number;\n        number: number;\n        url: string;\n    }>;\n    referencedWorkflows: Array<{\n        path: string;\n        ref: string;\n        sha: string;\n    }>;\n    repository: Repository;\n    rerunUrl: string;\n    runAttempt: number;\n    runNumber: number;\n    runStartedAt: string;\n    status: "requested" | "in_progress" | "completed" | "queued" | "pending" | "waiting";\n    triggeringActor: User | null;\n    updatedAt: string;\n    url: string;\n    workflowId: number;\n    workflowUrl: string;\n    displayTitle: string;\n};\n')),(0,o.kt)("b",null,"References:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.user"},"User"),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.repository"},"Repository")))}c.isMDXComponent=!0}}]);