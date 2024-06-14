"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[28762],{57522:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>m});var a=t(29901);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=a.createContext({}),p=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=p(e.components);return a.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),g=p(t),m=r,d=g["".concat(c,".").concat(m)]||g[m]||u[m]||l;return t?a.createElement(d,o(o({ref:n},s),{},{components:t})):a.createElement(d,o({ref:n},s))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,o=new Array(l);o[0]=g;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var p=2;p<l;p++)o[p]=t[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},56094:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var a=t(14090),r=(t(29901),t(57522));const l={},o=void 0,i={unversionedId:"api/gcal.googlecalendar.onnewevents",id:"api/gcal.googlecalendar.onnewevents",title:"gcal.googlecalendar.onnewevents",description:"Home &gt; @runlightyear/gcal &gt; GoogleCalendar &gt; onNewEvents",source:"@site/docs/api/gcal.googlecalendar.onnewevents.md",sourceDirName:"api",slug:"/api/gcal.googlecalendar.onnewevents",permalink:"/docs/api/gcal.googlecalendar.onnewevents",draft:!1,tags:[],version:"current",frontMatter:{}},c={},p=[{value:"GoogleCalendar.onNewEvents() method",id:"googlecalendaronnewevents-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],s={toc:p};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar"},"GoogleCalendar")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar.onnewevents"},"onNewEvents")),(0,r.kt)("h2",{id:"googlecalendaronnewevents-method"},"GoogleCalendar.onNewEvents() method"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,r.kt)("p",null,"On new events"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"static onNewEvents(props: OnNewEventsProps): {\n        webhook: string;\n        action: string;\n    };\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},"OnNewEventsProps"),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"{ webhook: string; action: string; }"),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("p",null,"On new events"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { GoogleCalendar } from "@runlightyear/gcal";\n\nGoogleCalendar.onNewEvents({\n  name: "onNewEvents",\n  title: "On New Events",\n  run: async ({ data }) => {\n    console.info("New events", data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("p",null,"On new events with matching title"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { GoogleCalendar } from "@runlightyear/gcal";\nimport { SKIPPED } from "@runlightyear/lightyear";\n\nGoogleCalendar.onNewEvents({\n  name: "onNewMatchingEvents",\n  title: "On New Matching Events",\n  variables: [\n    { name: "term", description: "Event title must contain this term" },\n  ],\n  run: async ({ data, variables }) => {\n    const testEvents = data.filter((event) =>\n      event.summary.includes(variables.term!)\n    );\n\n    if (testEvents.length === 0) {\n      throw SKIPPED;\n    }\n\n    console.log(`New events matching ${variables.term!}:`, testEvents);\n  },\n});\n')))}u.isMDXComponent=!0}}]);