"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[90676],{62757:(e,n,t)=>{t.d(n,{xA:()=>g,yg:()=>y});var r=t(67308);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},g=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,g=i(e,["components","mdxType","originalType","parentName"]),s=p(t),u=a,y=s["".concat(c,".").concat(u)]||s[u]||d[u]||o;return t?r.createElement(y,l(l({ref:n},g),{},{components:t})):r.createElement(y,l({ref:n},g))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=u;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[s]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=t[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},30886:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=t(94790),a=(t(67308),t(62757));const o={},l=void 0,i={unversionedId:"api/gcal.googlecalendar.defineeventswebhook",id:"api/gcal.googlecalendar.defineeventswebhook",title:"gcal.googlecalendar.defineeventswebhook",description:"Home &gt; @runlightyear/gcal &gt; GoogleCalendar &gt; defineEventsWebhook",source:"@site/docs/api/gcal.googlecalendar.defineeventswebhook.md",sourceDirName:"api",slug:"/api/gcal.googlecalendar.defineeventswebhook",permalink:"/docs/api/gcal.googlecalendar.defineeventswebhook",draft:!1,tags:[],version:"current",frontMatter:{}},c={},p=[{value:"GoogleCalendar.defineEventsWebhook() method",id:"googlecalendardefineeventswebhook-method",level:2},{value:"Parameters",id:"parameters",level:2}],g={toc:p},s="wrapper";function d(e){let{components:n,...t}=e;return(0,a.yg)(s,(0,r.A)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar"},"GoogleCalendar")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar.defineeventswebhook"},"defineEventsWebhook")),(0,a.yg)("h2",{id:"googlecalendardefineeventswebhook-method"},"GoogleCalendar.defineEventsWebhook() method"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,a.yg)("p",null,"Low level interface to define an event webhook."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"static defineEventsWebhook(props: DefineEventsWebhookProps): string;\n")),(0,a.yg)("h2",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"props"),(0,a.yg)("td",{parentName:"tr",align:null},"DefineEventsWebhookProps"),(0,a.yg)("td",{parentName:"tr",align:null})))),(0,a.yg)("b",null,"Returns:"),(0,a.yg)("p",null,"string"))}d.isMDXComponent=!0}}]);