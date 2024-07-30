"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[62794],{62757:(e,n,a)=>{a.d(n,{xA:()=>s,yg:()=>u});var t=a(67308);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function c(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=t.createContext({}),i=function(e){var n=t.useContext(p),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},s=function(e){var n=i(e.components);return t.createElement(p.Provider,{value:n},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),g=i(a),m=r,u=g["".concat(p,".").concat(m)]||g[m]||d[m]||l;return a?t.createElement(u,o(o({ref:n},s),{},{components:a})):t.createElement(u,o({ref:n},s))}));function u(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=m;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c[g]="string"==typeof e?e:r,o[1]=c;for(var i=2;i<l;i++)o[i]=a[i];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5583:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>i});var t=a(94790),r=(a(67308),a(62757));const l={},o=void 0,c={unversionedId:"api/gcal.googlecalendar.patchevent",id:"api/gcal.googlecalendar.patchevent",title:"gcal.googlecalendar.patchevent",description:"Home &gt; @runlightyear/gcal &gt; GoogleCalendar &gt; patchEvent",source:"@site/docs/api/gcal.googlecalendar.patchevent.md",sourceDirName:"api",slug:"/api/gcal.googlecalendar.patchevent",permalink:"/docs/api/gcal.googlecalendar.patchevent",draft:!1,tags:[],version:"current",frontMatter:{}},p={},i=[{value:"GoogleCalendar.patchEvent() method",id:"googlecalendarpatchevent-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2}],s={toc:i},g="wrapper";function d(e){let{components:n,...a}=e;return(0,r.yg)(g,(0,t.A)({},s,a,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar"},"GoogleCalendar")," ",">"," ",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar.patchevent"},"patchEvent")),(0,r.yg)("h2",{id:"googlecalendarpatchevent-method"},"GoogleCalendar.patchEvent() method"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,r.yg)("p",null,"Patch an event."),(0,r.yg)("b",null,"Signature:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},"patchEvent(props: PatchEventProps): Promise<PatchEventResponse>;\n")),(0,r.yg)("h2",{id:"parameters"},"Parameters"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,r.yg)("th",{parentName:"tr",align:null},"Type"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"props"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("a",{parentName:"td",href:"/docs/api/gcal.patcheventprops"},"PatchEventProps")),(0,r.yg)("td",{parentName:"tr",align:null})))),(0,r.yg)("b",null,"Returns:"),(0,r.yg)("p",null,"Promise","<",(0,r.yg)("a",{parentName:"p",href:"/docs/api/gcal.patcheventresponse"},"PatchEventResponse"),">"),(0,r.yg)("h2",{id:"example-1"},"Example 1"),(0,r.yg)("p",null,"Patch event summary"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleCalendar } from "@runlightyear/gcal";\n\ndefineAction({\n  name: "patchEventSummary",\n  title: "Patch Event Summary",\n  apps: ["gcal"],\n  variables: ["calendarId?", "eventId", "summary"],\n  run: async ({ auths, variables }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n\n    const response = await gcal.patchEvent({\n      calendarId: variables.calendarId || "primary",\n      eventId: variables.eventId!,\n      event: {\n        summary: variables.summary!,\n      },\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.yg)("h2",{id:"example-2"},"Example 2"),(0,r.yg)("p",null,"Patch event attendees"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleCalendar } from "@runlightyear/gcal";\n\ndefineAction({\n  name: "patchEventAttendees",\n  title: "Patch Event Attendees",\n  apps: ["gcal"],\n  variables: ["calendarId?", "eventId", "attendees"],\n  run: async ({ auths, variables }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n\n    const attendees = variables.attendees!.split(",");\n\n    const response = await gcal.patchEvent({\n      calendarId: variables.calendarId || "primary",\n      eventId: variables.eventId!,\n      event: {\n        attendees: attendees.map((email) => ({ email })),\n      },\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')),(0,r.yg)("h2",{id:"example-3"},"Example 3"),(0,r.yg)("p",null,"Add event attendee"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleCalendar } from "@runlightyear/gcal";\n\ndefineAction({\n  name: "addEventAttendee",\n  title: "Add Event Attendee",\n  apps: ["gcal"],\n  variables: ["calendarId?", "eventId", "attendee"],\n  run: async ({ auths, variables }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n\n    const getEventResponse = await gcal.getEvent({\n      calendarId: variables.calendarId || "primary",\n      eventId: variables.eventId!,\n    });\n\n    const event = getEventResponse.data;\n\n    const response = await gcal.patchEvent({\n      calendarId: variables.calendarId || "primary",\n      eventId: variables.eventId!,\n      event: {\n        attendees: [...event.attendees, { email: variables.attendee! }],\n      },\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')))}d.isMDXComponent=!0}}]);