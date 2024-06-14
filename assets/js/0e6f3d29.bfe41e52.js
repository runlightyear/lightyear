"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[44521],{57522:(e,t,n)=>{n.d(t,{Zo:()=>g,kt:()=>d});var a=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),i=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},g=function(e){var t=i(e.components);return a.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,g=p(e,["components","mdxType","originalType","parentName"]),u=i(n),d=r,m=u["".concat(c,".").concat(d)]||u[d]||s[d]||l;return n?a.createElement(m,o(o({ref:t},g),{},{components:n})):a.createElement(m,o({ref:t},g))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=u;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:r,o[1]=p;for(var i=2;i<l;i++)o[i]=n[i];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8313:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>s,frontMatter:()=>l,metadata:()=>p,toc:()=>i});var a=n(14090),r=(n(29901),n(57522));const l={},o=void 0,p={unversionedId:"api/gcal.googlecalendar.getevent",id:"api/gcal.googlecalendar.getevent",title:"gcal.googlecalendar.getevent",description:"Home &gt; @runlightyear/gcal &gt; GoogleCalendar &gt; getEvent",source:"@site/docs/api/gcal.googlecalendar.getevent.md",sourceDirName:"api",slug:"/api/gcal.googlecalendar.getevent",permalink:"/docs/api/gcal.googlecalendar.getevent",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"GoogleCalendar.getEvent() method",id:"googlecalendargetevent-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],g={toc:i};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar"},"GoogleCalendar")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar.getevent"},"getEvent")),(0,r.kt)("h2",{id:"googlecalendargetevent-method"},"GoogleCalendar.getEvent() method"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,r.kt)("p",null,"Get an event."),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"getEvent(props: GetEventProps): Promise<GetEventResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gcal.geteventprops"},"GetEventProps")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gcal.geteventresponse"},"GetEventResponse"),">"),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("p",null,"Get an event"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { GoogleCalendar } from "@runlightyear/gcal";\n\ndefineAction({\n  name: "getEvent",\n  title: "Get Event",\n  apps: ["gcal"],\n  variables: ["calendarId?", "eventId"],\n  run: async ({ auths, variables }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n\n    const response = await gcal.getEvent({\n      calendarId: variables.calendarId || "primary",\n      eventId: variables.eventId!,\n    });\n\n    console.log("Response: ", response.data);\n  },\n});\n')))}s.isMDXComponent=!0}}]);