"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[63298],{57522:(t,e,a)=>{a.d(e,{Zo:()=>u,kt:()=>h});var n=a(29901);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var s=n.createContext({}),p=function(t){var e=n.useContext(s),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},u=function(t){var e=p(t.components);return n.createElement(s.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,s=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),m=p(a),h=r,k=m["".concat(s,".").concat(h)]||m[h]||d[h]||l;return a?n.createElement(k,i(i({ref:e},u),{},{components:a})):n.createElement(k,i({ref:e},u))}));function h(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=m;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var p=2;p<l;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},3082:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var n=a(14090),r=(a(29901),a(57522));const l={},i=void 0,o={unversionedId:"api/github.github",id:"api/github.github",title:"github.github",description:"Home &gt; @runlightyear/github &gt; GitHub",source:"@site/docs/api/github.github.md",sourceDirName:"api",slug:"/api/github.github",permalink:"/docs/api/github.github",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"GitHub class",id:"github-class",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2},{value:"Example 4",id:"example-4",level:2},{value:"Example 5",id:"example-5",level:2},{value:"Example 6",id:"example-6",level:2},{value:"Example 7",id:"example-7",level:2},{value:"Example 8",id:"example-8",level:2},{value:"Example 9",id:"example-9",level:2},{value:"Constructors",id:"constructors",level:2},{value:"Commit Methods",id:"commit-methods",level:2},{value:"Gist Methods",id:"gist-methods",level:2},{value:"Git Database Methods",id:"git-database-methods",level:2},{value:"Helper Methods",id:"helper-methods",level:2},{value:"Issue Methods",id:"issue-methods",level:2},{value:"Listener Methods",id:"listener-methods",level:2},{value:"Pull Request Methods",id:"pull-request-methods",level:2},{value:"Repository Methods",id:"repository-methods",level:2},{value:"Repository Content Methods",id:"repository-content-methods",level:2},{value:"Search Methods",id:"search-methods",level:2},{value:"Webhook Methods",id:"webhook-methods",level:2},{value:"Webhook Payload Methods",id:"webhook-payload-methods",level:2},{value:"Other Methods",id:"other-methods",level:2}],u={toc:p};function d(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},u,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")),(0,r.kt)("h2",{id:"github-class"},"GitHub class"),(0,r.kt)("p",null,"Connector to the GitHub API"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"declare class GitHub extends RestConnector \n")),(0,r.kt)("p",null,"Extends: "),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api/lightyear.restconnector"},"RestConnector")),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("p",null,"On push"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { GitHub } from "@runlightyear/github";\n\nGitHub.onPush({\n  name: "onPush",\n  title: "On Push",\n  run: async ({ data, auths }) => {\n    console.log("Push data: ", data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("p",null,"On issue opened"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { GitHub } from "@runlightyear/github";\nimport { SKIPPED } from "@runlightyear/lightyear";\n\nGitHub.onIssues({\n  name: "onIssueOpened",\n  title: "On Issue Opened",\n  run: async ({ data, auths }) => {\n    if (data.action !== "opened") {\n      throw SKIPPED;\n    }\n    console.log("Issue opened:", data.issue);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-3"},"Example 3"),(0,r.kt)("p",null,"On workflow run completed"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { GitHub } from "@runlightyear/github";\nimport { SKIPPED } from "@runlightyear/lightyear";\n\nGitHub.onWorkflowRun({\n  name: "onWorkflowRunComplete",\n  title: "On Workflow Run Complete",\n  run: async ({ data, auths }) => {\n    console.log("Workflow run data: ", data);\n    if (data.action !== "completed") {\n      throw SKIPPED;\n    }\n    console.log("Workflow run completed:", data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-4"},"Example 4"),(0,r.kt)("p",null,"Create an issue"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "createIssue",\n  title: "Create Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "title",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.createIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      title: variables.title!,\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-5"},"Example 5"),(0,r.kt)("p",null,"Assign an issue"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "assignIssue",\n  title: "Assign Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "issueNumber",\n    "assignee",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const result = await github.updateIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      issueNumber: parseInt(variables.issueNumber!),\n      assignees: [variables.assignee!],\n    });\n    console.log("Issue: ", result.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-6"},"Example 6"),(0,r.kt)("p",null,"Label an issue"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "labelIssue",\n  title: "Label Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "issueNumber",\n    "label",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.updateIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      issueNumber: parseInt(variables.issueNumber!),\n      labels: [variables.label!],\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-7"},"Example 7"),(0,r.kt)("p",null,"Complete an issue"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "completeIssue",\n  title: "Complete Issue",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    "issueNumber",\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.updateIssue({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      issueNumber: parseInt(variables.issueNumber!),\n      state: "closed",\n      stateReason: "completed",\n    });\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-8"},"Example 8"),(0,r.kt)("p",null,"Compare two commits"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "compareTwoCommits",\n  title: "Compare Two Commits",\n  apps: ["github"],\n  variables: [\n    {\n      name: "owner",\n      description:\n        "The account owner of the repository. The name is not case sensitive.",\n    },\n    {\n      name: "repo",\n      description:\n        "The name of the repository without the .git extension. The name is not case sensitive.",\n    },\n    {\n      name: "basehead",\n      description:\n        "The base branch and head branch to compare. This parameter expects the format BASE...HEAD. Both must be branch names in repo. To compare with a branch that exists in a different repository in the same network as repo, the basehead parameter expects the format USERNAME:BASE...USERNAME:HEAD.",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.compareTwoCommits({\n      owner: variables.owner!,\n      repo: variables.repo!,\n      basehead: variables.basehead!,\n    });\n    console.log("Response data:", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-9"},"Example 9"),(0,r.kt)("p",null,"Create a gist"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GitHub } from "@runlightyear/github";\n\ndefineAction({\n  name: "createGist",\n  title: "Create Gist",\n  apps: ["github"],\n  run: async ({ auths }) => {\n    const github = new GitHub({\n      auth: auths.github,\n    });\n    const response = await github.createGist({\n      description: "Hello World",\n      files: {\n        "helloWorld.txt": {\n          content: "Hello World",\n        },\n      },\n      isPublic: false,\n    });\n    console.log("Response data:", response.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"constructors"},"Constructors"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Constructor"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github._constructor_"},"(constructor)(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Constructs a new instance of the ",(0,r.kt)("code",null,"GitHub")," class")))),(0,r.kt)("h2",{id:"commit-methods"},"Commit Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.comparetwocommits"},"compareTwoCommits(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Compare two commits")))),(0,r.kt)("h2",{id:"gist-methods"},"Gist Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.creategist"},"createGist(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Create a gist")))),(0,r.kt)("h2",{id:"git-database-methods"},"Git Database Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.gettree"},"getTree(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Get a tree")))),(0,r.kt)("h2",{id:"helper-methods"},"Helper Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.matchallcommits"},"matchAllCommits(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Match all commits")))),(0,r.kt)("h2",{id:"issue-methods"},"Issue Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.createissue"},"createIssue(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Create an issue")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.createissuecomment"},"createIssueComment(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Create an issue comment")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.updateissue"},"updateIssue(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Update an issue")))),(0,r.kt)("h2",{id:"listener-methods"},"Listener Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.oncommitcomment"},"onCommitComment(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when there is activity relating to commit comments."),(0,r.kt)("p",null,"For activity relating to comments on pull request reviews, use the pull","_","request","_","review","_","comment event. For activity relating to issue comments, use the issue","_","comment event. For activity relating to discussion comments, use the discussion","_","comment event."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.oncreate"},"onCreate(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when a Git branch or tag is created."),(0,r.kt)("p",null,"Note: This event will not occur when more than three tags are created at once."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.ondelete"},"onDelete(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when a Git branch or tag is deleted."),(0,r.kt)("p",null,"Note: This event will not occur when more than three tags are deleted at once."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onissuecomment"},"onIssueComment(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when there is activity relating to a comment on an issue or pull request."),(0,r.kt)("p",null,"For activity relating to an issue as opposed to comments on an issue, use the issue event. For activity related to pull request reviews or pull request review comments, use the pull","_","request","_","review or pull","_","request","_","review","_",'comment events. For more information about the different types of pull request comments, see "Working with comments."'))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onissues"},"onIssues(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when there is activity relating to an issue."),(0,r.kt)("p",null,"For activity relating to a comment on an issue, use the issue","_","comment event."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onlabel"},"onLabel(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when there is activity relating to labels."),(0,r.kt)("p",null,"If you want to receive an event when a label is added to or removed from an issue, pull request, or discussion, use the labeled or unlabeled action type for the issues, pull","_","request, or discussion events instead."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onmember"},"onMember(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"This event occurs when there is activity relating to collaborators in a repository.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onpullrequest"},"onPullRequest(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"On Pull Request")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onpullrequestreview"},"onPullRequestReview(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when there is activity on a pull request."),(0,r.kt)("p",null,"For activity related to pull request reviews, pull request review comments, pull request comments, or pull request review threads, use the pull","_","request","_","review, pull","_","request","_","review","_","comment, issue","_","comment, or pull","_","request","_","review","_","thread events instead."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onpush"},"onPush(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when a commit or tag is pushed."),(0,r.kt)("p",null,"Note: An event will not be created when more than three tags are pushed at once."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onrepository"},"onRepository(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"This event occurs when there is activity relating to repositories.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onstatus"},"onStatus(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"This event occurs when the status of a Git commit changes. For example, commits can be marked as error, failure, pending, or success.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onworkflowdispatch"},"onWorkflowDispatch(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when a GitHub Actions workflow is manually triggered."),(0,r.kt)("p",null,"For activity relating to workflow runs, use the workflow","_","run event."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onworkflowjob"},"onWorkflowJob(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when there is activity relating to a job in a GitHub Actions workflow."),(0,r.kt)("p",null,"For activity relating to a workflow run instead of a job in a workflow run, use the workflow","_","run event."))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.onworkflowrun"},"onWorkflowRun(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("p",null,"This event occurs when there is activity relating to a run of a GitHub Actions workflow."),(0,r.kt)("p",null,"For activity relating to a job in a workflow run, use the workflow","_","job event."))))),(0,r.kt)("h2",{id:"pull-request-methods"},"Pull Request Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.createpullrequest"},"createPullRequest(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Create a pull request")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.updatepullrequest"},"updatePullRequest(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Update a pull request")))),(0,r.kt)("h2",{id:"repository-methods"},"Repository Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.listorganizationrepositories"},"listOrganizationRepositories(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"List organization repositories")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.listrepositoriesforauthenticateduser"},"listRepositoriesForAuthenticatedUser(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"List repositories for the authenticated user")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.listrepositoriesforuser"},"listRepositoriesForUser(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"List repositories for a user")))),(0,r.kt)("h2",{id:"repository-content-methods"},"Repository Content Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.downloadrepoarchivetar"},"downloadRepoArchiveTar(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Download a repository archive (tar)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.downloadrepoarchivezip"},"downloadRepoArchiveZip(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Download a repository archive (zip)")))),(0,r.kt)("h2",{id:"search-methods"},"Search Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.searchissuesandpullrequests"},"searchIssuesAndPullRequests(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Search issues and pull requests")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.searchrepositories"},"searchRepositories(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Search repositories")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.searchusers"},"searchUsers(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Search users")))),(0,r.kt)("h2",{id:"webhook-methods"},"Webhook Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.createrepositorywebhook"},"createRepositoryWebhook(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Create a repository webhook")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.definewebhook"},"defineWebhook(props)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Define a GitHub repository webhook")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.deleterepositorywebhook"},"deleteRepositoryWebhook(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Delete a repository webhook")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.getrepositorywebhook"},"getRepositoryWebhook(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Get a repository webhook")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.listrepositorywebhooks"},"listRepositoryWebhooks(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"List repository webhooks")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.pingrepositorywebhook"},"pingRepositoryWebhook(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Ping a repository webhook")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.testpushrepositorywebhook"},"testPushRepositoryWebhook(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Test the push repository webhook")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.updaterepositorywebhook"},"updateRepositoryWebhook(props)")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Update a repository webhook")))),(0,r.kt)("h2",{id:"webhook-payload-methods"},"Webhook Payload Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.ascommitcommentpayload"},"asCommitCommentPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Commit Comment Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.ascreatepayload"},"asCreatePayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Create Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asdeletepayload"},"asDeletePayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Delete Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asissuecommentpayload"},"asIssueCommentPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Issue Comment Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asissuespayload"},"asIssuesPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Issues Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.aslabelpayload"},"asLabelPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Label Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asmemberpayload"},"asMemberPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Member Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.aspingpayload"},"asPingPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Ping Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.aspullrequestpayload"},"asPullRequestPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Pull Request Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.aspullrequestreviewpayload"},"asPullRequestReviewPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Pull Request Review Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.aspushpayload"},"asPushPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Push Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asrepositorypayload"},"asRepositoryPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Repository Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asstatuspayload"},"asStatusPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Status Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asworkflowdispatchpayload"},"asWorkflowDispatchPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Workflow Dispatch Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asworkflowjobpayload"},"asWorkflowJobPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Workflow Job Payload")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.asworkflowrunpayload"},"asWorkflowRunPayload(data)")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("code",null,"static")),(0,r.kt)("td",{parentName:"tr",align:null},"Workflow Run Payload")))),(0,r.kt)("h2",{id:"other-methods"},"Other Methods"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.getbaseurl"},"getBaseUrl()")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/github.github.getdefaultheaders"},"getDefaultHeaders()")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})))))}d.isMDXComponent=!0}}]);