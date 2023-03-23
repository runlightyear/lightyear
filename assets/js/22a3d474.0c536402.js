"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[64175],{57522:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>m});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),s=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},i=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),k=s(r),m=n,d=k["".concat(o,".").concat(m)]||k[m]||u[m]||l;return r?a.createElement(d,c(c({ref:t},i),{},{components:r})):a.createElement(d,c({ref:t},i))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,c=new Array(l);c[0]=k;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:n,c[1]=p;for(var s=2;s<l;s++)c[s]=r[s];return a.createElement.apply(null,c)}return a.createElement.apply(null,r)}k.displayName="MDXCreateElement"},40901:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>s});var a=r(14090),n=(r(29901),r(57522));const l={},c=void 0,p={unversionedId:"api/slack.slack.parseevent",id:"api/slack.slack.parseevent",title:"slack.slack.parseevent",description:"Home &gt; @runlightyear/slack &gt; Slack &gt; parseEvent",source:"@site/docs/api/slack.slack.parseevent.md",sourceDirName:"api",slug:"/api/slack.slack.parseevent",permalink:"/docs/api/slack.slack.parseevent",draft:!1,tags:[],version:"current",frontMatter:{}},o={},s=[{value:"Slack.parseEvent() method",id:"slackparseevent-method",level:2},{value:"Parameters",id:"parameters",level:2}],i={toc:s};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slack"},"Slack")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slack.parseevent"},"parseEvent")),(0,n.kt)("h2",{id:"slackparseevent-method"},"Slack.parseEvent() method"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"static parseEvent(data: unknown): SlackEvent;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"data"),(0,n.kt)("td",{parentName:"tr",align:null},"unknown"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"SlackEvent"))}u.isMDXComponent=!0}}]);