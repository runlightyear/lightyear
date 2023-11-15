"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[71662],{57522:(t,e,n)=>{n.d(e,{Zo:()=>c,kt:()=>d});var a=n(29901);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},s=Object.keys(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),l=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},c=function(t){var e=l(t.components);return a.createElement(p.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,s=t.originalType,p=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),m=l(n),d=r,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||s;return n?a.createElement(f,i(i({ref:e},c),{},{components:n})):a.createElement(f,i({ref:e},c))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var s=n.length,i=new Array(s);i[0]=m;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var l=2;l<s;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},74876:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var a=n(14090),r=(n(29901),n(57522));const s={},i=void 0,o={unversionedId:"api/openai.openai.listassistants",id:"api/openai.openai.listassistants",title:"openai.openai.listassistants",description:"Home &gt; @runlightyear/openai &gt; OpenAI &gt; listAssistants",source:"@site/docs/api/openai.openai.listassistants.md",sourceDirName:"api",slug:"/api/openai.openai.listassistants",permalink:"/docs/api/openai.openai.listassistants",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"OpenAI.listAssistants() method",id:"openailistassistants-method",level:2},{value:"Parameters",id:"parameters",level:2}],c={toc:l};function u(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/openai.openai"},"OpenAI")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/openai.openai.listassistants"},"listAssistants")),(0,r.kt)("h2",{id:"openailistassistants-method"},"OpenAI.listAssistants() method"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,r.kt)("p",null,"List assistants"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"listAssistants(props?: ListAssistantsProps): Promise<ListAssistantsResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},"ListAssistantsProps"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("i",null,"(Optional1)"))))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<","ListAssistantsResponse",">"))}u.isMDXComponent=!0}}]);