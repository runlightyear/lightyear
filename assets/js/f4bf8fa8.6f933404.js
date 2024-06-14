"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[14941],{57522:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),s=l(r),f=a,d=s["".concat(c,".").concat(f)]||s[f]||m[f]||o;return r?n.createElement(d,p(p({ref:t},u),{},{components:r})):n.createElement(d,p({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=s;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var l=2;l<o;l++)p[l]=r[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},18621:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=r(14090),a=(r(29901),r(57522));const o={},p=void 0,i={unversionedId:"api/openai.createchatcompletionprops.temperature",id:"api/openai.createchatcompletionprops.temperature",title:"openai.createchatcompletionprops.temperature",description:"Home &gt; @runlightyear/openai &gt; CreateChatCompletionProps &gt; temperature",source:"@site/docs/api/openai.createchatcompletionprops.temperature.md",sourceDirName:"api",slug:"/api/openai.createchatcompletionprops.temperature",permalink:"/docs/api/openai.createchatcompletionprops.temperature",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"CreateChatCompletionProps.temperature property",id:"createchatcompletionpropstemperature-property",level:2}],u={toc:l};function m(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops"},"CreateChatCompletionProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops.temperature"},"temperature")),(0,a.kt)("h2",{id:"createchatcompletionpropstemperature-property"},"CreateChatCompletionProps.temperature property"),(0,a.kt)("p",null,"What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic."),(0,a.kt)("p",null,"We generally recommend altering this or top","_","p but not both."),(0,a.kt)("p",null,"Defaults to 1"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"temperature?: number;\n")))}m.isMDXComponent=!0}}]);