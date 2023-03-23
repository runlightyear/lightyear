"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[92430],{57522:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var r=a(29901);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),i=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=i(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},v=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),v=i(a),m=n,k=v["".concat(s,".").concat(m)]||v[m]||u[m]||o;return a?r.createElement(k,l(l({ref:t},p),{},{components:a})):r.createElement(k,l({ref:t},p))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=v;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var i=2;i<o;i++)l[i]=a[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}v.displayName="MDXCreateElement"},80201:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>i});var r=a(14090),n=(a(29901),a(57522));const o={},l=void 0,c={unversionedId:"api/slack.slack.leaveconversation",id:"api/slack.slack.leaveconversation",title:"slack.slack.leaveconversation",description:"Home &gt; @runlightyear/slack &gt; Slack &gt; leaveConversation",source:"@site/docs/api/slack.slack.leaveconversation.md",sourceDirName:"api",slug:"/api/slack.slack.leaveconversation",permalink:"/docs/api/slack.slack.leaveconversation",draft:!1,tags:[],version:"current",frontMatter:{}},s={},i=[{value:"Slack.leaveConversation() method",id:"slackleaveconversation-method",level:2},{value:"Parameters",id:"parameters",level:2}],p={toc:i};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slack"},"Slack")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slack.leaveconversation"},"leaveConversation")),(0,n.kt)("h2",{id:"slackleaveconversation-method"},"Slack.leaveConversation() method"),(0,n.kt)("p",null,"Leave a conversation"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"leaveConversation(props: LeaveConversationProps): Promise<LeaveConversationResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/slack.leaveconversationprops"},"LeaveConversationProps")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.leaveconversationresponse"},"LeaveConversationResponse"),">"))}u.isMDXComponent=!0}}]);