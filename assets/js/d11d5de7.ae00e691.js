"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[14300],{57522:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),y=l(r),f=a,m=y["".concat(i,".").concat(f)]||y[f]||s[f]||o;return r?n.createElement(m,p(p({ref:t},u),{},{components:r})):n.createElement(m,p({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=y;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,p[1]=c;for(var l=2;l<o;l++)p[l]=r[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},51079:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>p,default:()=>s,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var n=r(14090),a=(r(29901),r(57522));const o={},p=void 0,c={unversionedId:"api/openai.createchatcompletionprops.frequencypenalty",id:"api/openai.createchatcompletionprops.frequencypenalty",title:"openai.createchatcompletionprops.frequencypenalty",description:"Home &gt; @runlightyear/openai &gt; CreateChatCompletionProps &gt; frequencyPenalty",source:"@site/docs/api/openai.createchatcompletionprops.frequencypenalty.md",sourceDirName:"api",slug:"/api/openai.createchatcompletionprops.frequencypenalty",permalink:"/docs/api/openai.createchatcompletionprops.frequencypenalty",draft:!1,tags:[],version:"current",frontMatter:{}},i={},l=[{value:"CreateChatCompletionProps.frequencyPenalty property",id:"createchatcompletionpropsfrequencypenalty-property",level:2}],u={toc:l};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops"},"CreateChatCompletionProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops.frequencypenalty"},"frequencyPenalty")),(0,a.kt)("h2",{id:"createchatcompletionpropsfrequencypenalty-property"},"CreateChatCompletionProps.frequencyPenalty property"),(0,a.kt)("p",null,"Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."),(0,a.kt)("p",null,"See more information about frequency and presence penalties."),(0,a.kt)("p",null,"Defaults to 0"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"frequencyPenalty?: number;\n")))}s.isMDXComponent=!0}}]);