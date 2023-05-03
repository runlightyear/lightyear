"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[63584],{57522:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(29901);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var d=n.createContext({}),i=function(e){var t=n.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=i(e.components);return n.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,r=e.originalType,d=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=i(a),m=l,g=u["".concat(d,".").concat(m)]||u[m]||s[m]||r;return a?n.createElement(g,o(o({ref:t},c),{},{components:a})):n.createElement(g,o({ref:t},c))}));function m(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=a.length,o=new Array(r);o[0]=u;var p={};for(var d in t)hasOwnProperty.call(t,d)&&(p[d]=t[d]);p.originalType=e,p.mdxType="string"==typeof e?e:l,o[1]=p;for(var i=2;i<r;i++)o[i]=a[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},67729:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>s,frontMatter:()=>r,metadata:()=>p,toc:()=>i});var n=a(14090),l=(a(29901),a(57522));const r={},o=void 0,p={unversionedId:"api/gcal.googlecalendar",id:"api/gcal.googlecalendar",title:"gcal.googlecalendar",description:"Home &gt; @runlightyear/gcal &gt; GoogleCalendar",source:"@site/docs/api/gcal.googlecalendar.md",sourceDirName:"api",slug:"/api/gcal.googlecalendar",permalink:"/docs/api/gcal.googlecalendar",draft:!1,tags:[],version:"current",frontMatter:{}},d={},i=[{value:"GoogleCalendar class",id:"googlecalendar-class",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2},{value:"Example 3",id:"example-3",level:2},{value:"Example 4",id:"example-4",level:2},{value:"Constructors",id:"constructors",level:2},{value:"Calendar Methods",id:"calendar-methods",level:2},{value:"Event Methods",id:"event-methods",level:2},{value:"Listener Methods",id:"listener-methods",level:2}],c={toc:i};function s(e){let{components:t,...a}=e;return(0,l.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar"},"GoogleCalendar")),(0,l.kt)("h2",{id:"googlecalendar-class"},"GoogleCalendar class"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,l.kt)("p",null,"Google Calendar connector"),(0,l.kt)("b",null,"Signature:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"declare class GoogleCalendar extends RestConnector \n")),(0,l.kt)("p",null,"Extends: "),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api/lightyear.restconnector"},"RestConnector")),(0,l.kt)("h2",{id:"example-1"},"Example 1"),(0,l.kt)("p",null,"Install"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"npm install @runlightyear/gcal\n")),(0,l.kt)("h2",{id:"example-2"},"Example 2"),(0,l.kt)("p",null,"Import"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'import { GoogleCalendar } from "@runlightyear/gcal";\n')),(0,l.kt)("h2",{id:"example-3"},"Example 3"),(0,l.kt)("p",null,"Use in an action"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'defineAction({\n  name: "gcalExample",\n  title: "Google Calendar Example",\n  apps: ["gcal"],\n  run: async ({ auths }) => {\n    const gcal = new GoogleCalendar({\n      auth: auths.gcal,\n    });\n  },\n});\n')),(0,l.kt)("h2",{id:"example-4"},"Example 4"),(0,l.kt)("p",null,"Get updated events every minute"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'GoogleCalendar.onUpdatedEvents({\n  name: "updatedCalendarEvents",\n  title: "Updated Calendar Events",\n  calendarId: "primary",\n  trigger: {\n    pollingFrequency: 1,  // Run once a minute\n  },\n  run: async ({ data: events }) => {\n    console.log("Updated events", events);\n  },\n});\n')),(0,l.kt)("h2",{id:"constructors"},"Constructors"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Constructor"),(0,l.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar._constructor_"},"(constructor)(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Constructs a new instance of the ",(0,l.kt)("code",null,"GoogleCalendar")," class")))),(0,l.kt)("h2",{id:"calendar-methods"},"Calendar Methods"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Method"),(0,l.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar.createcalendar"},"createCalendar(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Creates a secondary calendar.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar.listcalendars"},"listCalendars(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Returns the calendars on the user's calendar list.")))),(0,l.kt)("h2",{id:"event-methods"},"Event Methods"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Method"),(0,l.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar.createevent"},"createEvent(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Creates an event.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar.deleteevent"},"deleteEvent(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Deletes an event.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar.listevents"},"listEvents(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Returns events on the specified calendar.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar.updateevent"},"updateEvent(props)")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Updates an event. This method does not support patch semantics and always updates the entire event resource. To do a partial update, perform a get followed by an update using etags to ensure atomicity.")))),(0,l.kt)("h2",{id:"listener-methods"},"Listener Methods"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Method"),(0,l.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"/docs/api/gcal.googlecalendar.onupdatedevents"},"onUpdatedEvents(props)")),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("code",null,"static")),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("b",null,(0,l.kt)("i",null,"(BETA)"))," Updated Events Listener")))))}s.isMDXComponent=!0}}]);