"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[66388],{62757:(e,a,n)=>{n.d(a,{xA:()=>c,yg:()=>m});var t=n(67308);function l(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function r(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?r(Object(n),!0).forEach((function(a){l(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function o(e,a){if(null==e)return{};var n,t,l=function(e,a){if(null==e)return{};var n,t,l={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||(l[n]=e[n]);return l}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=t.createContext({}),p=function(e){var a=t.useContext(i),n=a;return e&&(n="function"==typeof e?e(a):s(s({},a),e)),n},c=function(e){var a=p(e.components);return t.createElement(i.Provider,{value:a},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},y=t.forwardRef((function(e,a){var n=e.components,l=e.mdxType,r=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),g=p(n),y=l,m=g["".concat(i,".").concat(y)]||g[y]||d[y]||r;return n?t.createElement(m,s(s({ref:a},c),{},{components:n})):t.createElement(m,s({ref:a},c))}));function m(e,a){var n=arguments,l=a&&a.mdxType;if("string"==typeof e||l){var r=n.length,s=new Array(r);s[0]=y;var o={};for(var i in a)hasOwnProperty.call(a,i)&&(o[i]=a[i]);o.originalType=e,o[g]="string"==typeof e?e:l,s[1]=o;for(var p=2;p<r;p++)s[p]=n[p];return t.createElement.apply(null,s)}return t.createElement.apply(null,n)}y.displayName="MDXCreateElement"},82915:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var t=n(94790),l=(n(67308),n(62757));const r={},s=void 0,o={unversionedId:"api/slack.slack",id:"api/slack.slack",title:"slack.slack",description:"Home &gt; @runlightyear/slack &gt; Slack",source:"@site/docs/api/slack.slack.md",sourceDirName:"api",slug:"/api/slack.slack",permalink:"/docs/api/slack.slack",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"Slack class",id:"slack-class",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2},{value:"Example 4",id:"example-4",level:2},{value:"Example 5",id:"example-5",level:2},{value:"Example 6",id:"example-6",level:2},{value:"Example 7",id:"example-7",level:2},{value:"Example 8",id:"example-8",level:2},{value:"Constructors",id:"constructors",level:2},{value:"Properties",id:"properties",level:2},{value:"Chat Methods",id:"chat-methods",level:2},{value:"Conversations Methods",id:"conversations-methods",level:2},{value:"Team Methods",id:"team-methods",level:2},{value:"Users Methods",id:"users-methods",level:2},{value:"Other Methods",id:"other-methods",level:2}],c={toc:p},g="wrapper";function d(e){let{components:a,...n}=e;return(0,l.yg)(g,(0,t.A)({},c,n,{components:a,mdxType:"MDXLayout"}),(0,l.yg)("p",null,(0,l.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,l.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,l.yg)("a",{parentName:"p",href:"/docs/api/slack.slack"},"Slack")),(0,l.yg)("h2",{id:"slack-class"},"Slack class"),(0,l.yg)("p",null,"Connector to the Slack API"),(0,l.yg)("b",null,"Signature:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},"declare class Slack extends RestConnector \n")),(0,l.yg)("p",null,"Extends: "),(0,l.yg)("p",null,(0,l.yg)("a",{parentName:"p",href:"/docs/api/lightyear.restconnector"},"RestConnector")),(0,l.yg)("h2",{id:"example-1"},"Example 1"),(0,l.yg)("p",null,"Post text message"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "postMessage",\n  title: "Post Message",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "channel",\n      description:\n        "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",\n    },\n    {\n      name: "text",\n      description: "The formatted text of the message to be published.",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n    const response = await slack.postMessage({\n      channel: variables.channel!,\n      text: variables.text!,\n    });\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"example-2"},"Example 2"),(0,l.yg)("p",null,"Post message with blocks"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "postMessageWithBlocks",\n  title: "Post Message With Blocks",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "channel",\n      description:\n        "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({ auth: auths.slack });\n\n    const response = await slack.postMessage({\n      channel: variables.channel!,\n      blocks: [\n        {\n          type: "header",\n          text: {\n            type: "plain_text",\n            text: "The header of the message",\n          },\n        },\n        {\n          type: "section",\n          text: {\n            type: "mrkdwn",\n            text: "A message *with some bold text* and _some italicized text_.",\n          },\n        },\n        {\n          type: "divider",\n        },\n        {\n          type: "section",\n          fields: [\n            {\n              type: "mrkdwn",\n              text: "*Priority*\\nHigh",\n            },\n            {\n              type: "mrkdwn",\n              text: "*Assignee*\\nJohn",\n            },\n            {\n              type: "mrkdwn",\n              text: "*Labels*\\nBug",\n            },\n            {\n              type: "mrkdwn",\n              text: "*Milestone*\\nRelease 1.0",\n            },\n          ],\n        },\n      ],\n      text: "Text for screens where blocks are not supported.",\n    });\n\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"example-3"},"Example 3"),(0,l.yg)("p",null,"Schedule a message"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { dayjsUtc, defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "scheduleMessage",\n  title: "Schedule Message",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "channel",\n      description:\n        "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.",\n    },\n    {\n      name: "delay?",\n      description:\n        "Amount of time in seconds to delay sending message. Defaults to 60.",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n\n    const delay = variables.delay ? parseInt(variables.delay) : 60;\n    const response = await slack.scheduleMessage({\n      channel: variables.channel!,\n      postAt: dayjsUtc().add(delay, "seconds").unix(),\n      text: `This message was delayed ${delay} seconds.`,\n    });\n\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"example-4"},"Example 4"),(0,l.yg)("p",null,"Create a new conversation"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "createPublicChannel",\n  title: "Create Public Channel",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "name",\n      description: "Name of the public channel to create",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n    const response = await slack.createConversation({\n      name: variables.name!,\n      isPrivate: false,\n    });\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"example-5"},"Example 5"),(0,l.yg)("p",null,"Invite a user to a channel"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "inviteToChannel",\n  title: "Invite to Channel",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "channel",\n      description: "ID of the channel to invite user to. Example: C1234567890",\n    },\n    {\n      name: "user",\n      description: "ID of the user to invite. Example: U3456789012",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n    const response = await slack.inviteToConversation({\n      channel: variables.channel!,\n      users: [variables.user!],\n    });\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"example-6"},"Example 6"),(0,l.yg)("p",null,"List users"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "listUsers",\n  title: "List Users",\n  apps: ["slack"],\n  run: async ({ auths }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n    const response = await slack.listUsers();\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"example-7"},"Example 7"),(0,l.yg)("p",null,"Get user info"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "getUser",\n  title: "Get User",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "user",\n      description: "User to get info on. Example: W1234567890",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n    const response = await slack.getUser({\n      user: variables.user!,\n    });\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"example-8"},"Example 8"),(0,l.yg)("p",null,"Lookup user by email"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Slack } from "@runlightyear/slack";\n\ndefineAction({\n  name: "lookupUserByEmail",\n  title: "Lookup User By Email",\n  apps: ["slack"],\n  variables: [\n    {\n      name: "email",\n      description: "Email address of user to look up",\n    },\n  ],\n  run: async ({ auths, variables }) => {\n    const slack = new Slack({\n      auth: auths.slack,\n    });\n    const response = await slack.lookupUserByEmail({\n      email: variables.email!,\n    });\n    console.log("Response data: ", response.data);\n  },\n});\n')),(0,l.yg)("h2",{id:"constructors"},"Constructors"),(0,l.yg)("table",null,(0,l.yg)("thead",{parentName:"table"},(0,l.yg)("tr",{parentName:"thead"},(0,l.yg)("th",{parentName:"tr",align:null},"Constructor"),(0,l.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.yg)("th",{parentName:"tr",align:null},"Description"))),(0,l.yg)("tbody",{parentName:"table"},(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack._constructor_"},"(constructor)(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Create a new slack connector")))),(0,l.yg)("h2",{id:"properties"},"Properties"),(0,l.yg)("table",null,(0,l.yg)("thead",{parentName:"table"},(0,l.yg)("tr",{parentName:"thead"},(0,l.yg)("th",{parentName:"tr",align:null},"Property"),(0,l.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.yg)("th",{parentName:"tr",align:null},"Type"),(0,l.yg)("th",{parentName:"tr",align:null},"Description"))),(0,l.yg)("tbody",{parentName:"table"},(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.appwebhook"},"AppWebhook")),(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("code",null,"static")),(0,l.yg)("td",{parentName:"tr",align:null},"typeof ",(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slackappwebhook"},"SlackAppWebhook")),(0,l.yg)("td",{parentName:"tr",align:null})),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.authtype"},"authType")),(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("code",null,"static")),(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/lightyear.authtype"},"AuthType")),(0,l.yg)("td",{parentName:"tr",align:null})),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.oauth"},"OAuth")),(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("code",null,"static")),(0,l.yg)("td",{parentName:"tr",align:null},"typeof ",(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slackoauth"},"SlackOAuth")),(0,l.yg)("td",{parentName:"tr",align:null})),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.secrets"},"secrets")),(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("code",null,"static")),(0,l.yg)("td",{parentName:"tr",align:null},"string","[","]"),(0,l.yg)("td",{parentName:"tr",align:null})),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.variables"},"variables")),(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("code",null,"static")),(0,l.yg)("td",{parentName:"tr",align:null},"string","[","]"),(0,l.yg)("td",{parentName:"tr",align:null})))),(0,l.yg)("h2",{id:"chat-methods"},"Chat Methods"),(0,l.yg)("table",null,(0,l.yg)("thead",{parentName:"table"},(0,l.yg)("tr",{parentName:"thead"},(0,l.yg)("th",{parentName:"tr",align:null},"Method"),(0,l.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.yg)("th",{parentName:"tr",align:null},"Description"))),(0,l.yg)("tbody",{parentName:"table"},(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.postmessage"},"postMessage(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Sends a message to a channel")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.schedulemessage"},"scheduleMessage(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Schedules a message to be sent to a channel.")))),(0,l.yg)("h2",{id:"conversations-methods"},"Conversations Methods"),(0,l.yg)("table",null,(0,l.yg)("thead",{parentName:"table"},(0,l.yg)("tr",{parentName:"thead"},(0,l.yg)("th",{parentName:"tr",align:null},"Method"),(0,l.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.yg)("th",{parentName:"tr",align:null},"Description"))),(0,l.yg)("tbody",{parentName:"table"},(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.createconversation"},"createConversation(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Initiates a public or private channel-based conversation")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.invitetoconversation"},"inviteToConversation(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Invites users to a channel.")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.joinconversation"},"joinConversation(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Join an existing conversation")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.kickfromconversation"},"kickFromConversation(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Kick a user from a conversation")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.leaveconversation"},"leaveConversation(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Leave a conversation")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.listconversations"},"listConversations(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"List conversations")))),(0,l.yg)("h2",{id:"team-methods"},"Team Methods"),(0,l.yg)("table",null,(0,l.yg)("thead",{parentName:"table"},(0,l.yg)("tr",{parentName:"thead"},(0,l.yg)("th",{parentName:"tr",align:null},"Method"),(0,l.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.yg)("th",{parentName:"tr",align:null},"Description"))),(0,l.yg)("tbody",{parentName:"table"},(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.getteaminfo"},"getTeamInfo(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Get team info")))),(0,l.yg)("h2",{id:"users-methods"},"Users Methods"),(0,l.yg)("table",null,(0,l.yg)("thead",{parentName:"table"},(0,l.yg)("tr",{parentName:"thead"},(0,l.yg)("th",{parentName:"tr",align:null},"Method"),(0,l.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.yg)("th",{parentName:"tr",align:null},"Description"))),(0,l.yg)("tbody",{parentName:"table"},(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.getuser"},"getUser(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Gets information about a user.")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.listusers"},"listUsers(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"List users")),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.lookupuserbyemail"},"lookupUserByEmail(props)")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null},"Find a user with an email address.")))),(0,l.yg)("h2",{id:"other-methods"},"Other Methods"),(0,l.yg)("table",null,(0,l.yg)("thead",{parentName:"table"},(0,l.yg)("tr",{parentName:"thead"},(0,l.yg)("th",{parentName:"tr",align:null},"Method"),(0,l.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.yg)("th",{parentName:"tr",align:null},"Description"))),(0,l.yg)("tbody",{parentName:"table"},(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.getbaseurl"},"getBaseUrl()")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null})),(0,l.yg)("tr",{parentName:"tbody"},(0,l.yg)("td",{parentName:"tr",align:null},(0,l.yg)("a",{parentName:"td",href:"/docs/api/slack.slack.getdefaultheaders"},"getDefaultHeaders()")),(0,l.yg)("td",{parentName:"tr",align:null}),(0,l.yg)("td",{parentName:"tr",align:null})))))}d.isMDXComponent=!0}}]);