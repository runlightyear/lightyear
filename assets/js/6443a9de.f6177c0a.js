"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[34485],{62757:(e,n,a)=>{a.d(n,{xA:()=>p,yg:()=>m});var t=a(67308);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function c(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=t.createContext({}),s=function(e){var n=t.useContext(i),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},p=function(e){var n=s(e.components);return t.createElement(i.Provider,{value:n},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),g=s(a),u=r,m=g["".concat(i,".").concat(u)]||g[u]||d[u]||l;return a?t.createElement(m,o(o({ref:n},p),{},{components:a})):t.createElement(m,o({ref:n},p))}));function m(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=u;var c={};for(var i in n)hasOwnProperty.call(n,i)&&(c[i]=n[i]);c.originalType=e,c[g]="string"==typeof e?e:r,o[1]=c;for(var s=2;s<l;s++)o[s]=a[s];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},98285:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>s});var t=a(94790),r=(a(67308),a(62757));const l={},o=void 0,c={unversionedId:"api/gcal.googlecalendar.createevent",id:"api/gcal.googlecalendar.createevent",title:"gcal.googlecalendar.createevent",description:"Home &gt; @runlightyear/gcal &gt; GoogleCalendar &gt; createEvent",source:"@site/docs/api/gcal.googlecalendar.createevent.md",sourceDirName:"api",slug:"/api/gcal.googlecalendar.createevent",permalink:"/docs/api/gcal.googlecalendar.createevent",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"GoogleCalendar.createEvent() method",id:"googlecalendarcreateevent-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2}],p={toc:s},g="wrapper";function d(e){let{components:n,...a}=e;return(0,r.yg)(g,(0,t.A)({},p,a,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar"},"GoogleCalendar")," ",">"," ",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar.createevent"},"createEvent")),(0,r.yg)("h2",{id:"googlecalendarcreateevent-method"},"GoogleCalendar.createEvent() method"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,r.yg)("p",null,"Creates an event."),(0,r.yg)("b",null,"Signature:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},"createEvent(props: CreateEventProps): Promise<CreateEventResponse>;\n")),(0,r.yg)("h2",{id:"parameters"},"Parameters"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,r.yg)("th",{parentName:"tr",align:null},"Type"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"props"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("a",{parentName:"td",href:"/docs/api/gcal.createeventprops"},"CreateEventProps")),(0,r.yg)("td",{parentName:"tr",align:null})))),(0,r.yg)("b",null,"Returns:"),(0,r.yg)("p",null,"Promise","<",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal.createeventresponse"},"CreateEventResponse"),">"),(0,r.yg)("h2",{id:"example-1"},"Example 1"),(0,r.yg)("p",null,"Create an event"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleCalendar } from "@runlightyear/gcal";\n\nfunction addHours(date: Date, hours: number) {\n  return new Date(date.getTime() + hours * 60 * 60 * 1000);\n}\n\ndefineAction({\n  name: "createEvent",\n  title: "Create Event",\n  apps: ["gcal"],\n  variables: ["calendarId?", "summary"],\n  run: async ({ auths, variables }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n\n    const response = await gcal.createEvent({\n      calendarId: variables.calendarId || "primary",\n      event: {\n        summary: variables.summary!,\n        start: {\n          dateTime: addHours(new Date(), 1).toISOString(),\n        },\n        end: {\n          dateTime: addHours(new Date(), 2).toISOString(),\n        },\n      },\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.yg)("h2",{id:"example-2"},"Example 2"),(0,r.yg)("p",null,"Create an event with attendees"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleCalendar } from "@runlightyear/gcal";\n\nfunction addHours(date: Date, hours: number) {\n  return new Date(date.getTime() + hours * 60 * 60 * 1000);\n}\n\ndefineAction({\n  name: "createEventWithAttendees",\n  title: "Create Event with Attendees",\n  apps: ["gcal"],\n  variables: ["calendarId?", "summary", "attendees"],\n  run: async ({ auths, variables }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n\n    const attendees = variables.attendees!.split(",");\n\n    const response = await gcal.createEvent({\n      calendarId: variables.calendarId || "primary",\n      event: {\n        summary: variables.summary!,\n        start: {\n          dateTime: addHours(new Date(), 1).toISOString(),\n        },\n        end: {\n          dateTime: addHours(new Date(), 2).toISOString(),\n        },\n        attendees: attendees.map((email) => ({\n          email,\n        })),\n      },\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.yg)("h2",{id:"example-3"},"Example 3"),(0,r.yg)("p",null,"Create an all-day event"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleCalendar } from "@runlightyear/gcal";\n\nfunction tomorrow() {\n  const date = new Date();\n  date.setDate(date.getDate() + 1);\n  return date.toISOString().split("T")[0];\n}\n\ndefineAction({\n  name: "createAllDayEvent",\n  title: "Create All Day Event",\n  apps: ["gcal"],\n  variables: ["calendarId?", "summary"],\n  run: async ({ auths, variables }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n\n    const response = await gcal.createEvent({\n      calendarId: variables.calendarId || "primary",\n      event: {\n        summary: variables.summary!,\n        start: {\n          date: tomorrow(),\n        },\n        end: {\n          date: tomorrow(),\n        },\n      },\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')))}d.isMDXComponent=!0}}]);