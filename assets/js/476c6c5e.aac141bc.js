"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[12671],{57522:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>v});var a=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),v=r,k=m["".concat(s,".").concat(v)]||m[v]||u[v]||o;return n?a.createElement(k,i(i({ref:t},p),{},{components:n})):a.createElement(k,i({ref:t},p))}));function v(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},63946:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=n(14090),r=(n(29901),n(57522));const o={},i=void 0,l={unversionedId:"api/slack.slack.invitetoconversation",id:"api/slack.slack.invitetoconversation",title:"slack.slack.invitetoconversation",description:"Home &gt; @runlightyear/slack &gt; Slack &gt; inviteToConversation",source:"@site/docs/api/slack.slack.invitetoconversation.md",sourceDirName:"api",slug:"/api/slack.slack.invitetoconversation",permalink:"/docs/api/slack.slack.invitetoconversation",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"Slack.inviteToConversation() method",id:"slackinvitetoconversation-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/slack.slack"},"Slack")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/slack.slack.invitetoconversation"},"inviteToConversation")),(0,r.kt)("h2",{id:"slackinvitetoconversation-method"},"Slack.inviteToConversation() method"),(0,r.kt)("p",null,"Invites users to a channel."),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"inviteToConversation(props: InviteToConversationProps): Promise<HttpProxyResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.invitetoconversationprops"},"InviteToConversationProps")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/lightyear.httpproxyresponse"},"HttpProxyResponse"),">"),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("p",null,"Invite a user to a channel"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "inviteToChannel",\n  title: "Invite to Channel",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "channel",\n      description: "ID of the channel to invite user to. Example: C1234567890",\n    },\n    {\n      name: "user",\n      description: "ID of the user to invite. Example: U3456789012",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n    const response = await slack.inviteToConversation({\n      channel: variables.channel!,\n      users: [variables.user!],\n    });\n    console.log("Response data: ", response.data);\n  },\n});\n')))}u.isMDXComponent=!0}}]);