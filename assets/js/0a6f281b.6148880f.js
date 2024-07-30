"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[19757],{62757:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>f});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),l=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},s=function(e){var t=l(e.components);return a.createElement(i.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=l(r),y=n,f=m["".concat(i,".").concat(y)]||m[y]||u[y]||o;return r?a.createElement(f,p(p({ref:t},s),{},{components:r})):a.createElement(f,p({ref:t},s))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,p=new Array(o);p[0]=y;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c[m]="string"==typeof e?e:n,p[1]=c;for(var l=2;l<o;l++)p[l]=r[l];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}y.displayName="MDXCreateElement"},99941:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>p,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var a=r(94790),n=(r(67308),r(62757));const o={},p=void 0,c={unversionedId:"api/openai.createchatcompletionprops.stream",id:"api/openai.createchatcompletionprops.stream",title:"openai.createchatcompletionprops.stream",description:"Home &gt; @runlightyear/openai &gt; CreateChatCompletionProps &gt; stream",source:"@site/docs/api/openai.createchatcompletionprops.stream.md",sourceDirName:"api",slug:"/api/openai.createchatcompletionprops.stream",permalink:"/docs/api/openai.createchatcompletionprops.stream",draft:!1,tags:[],version:"current",frontMatter:{}},i={},l=[{value:"CreateChatCompletionProps.stream property",id:"createchatcompletionpropsstream-property",level:2}],s={toc:l},m="wrapper";function u(e){let{components:t,...r}=e;return(0,n.yg)(m,(0,a.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops"},"CreateChatCompletionProps")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops.stream"},"stream")),(0,n.yg)("h2",{id:"createchatcompletionpropsstream-property"},"CreateChatCompletionProps.stream property"),(0,n.yg)("p",null,"If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: ","[","DONE","]"," message. See the OpenAI Cookbook for example code."),(0,n.yg)("p",null,"Defaults to false"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"stream?: boolean;\n")))}u.isMDXComponent=!0}}]);