"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[75567],{62757:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>y});var n=r(67308);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},l=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=i(r),g=a,y=m["".concat(c,".").concat(g)]||m[g]||u[g]||o;return r?n.createElement(y,p(p({ref:t},l),{},{components:r})):n.createElement(y,p({ref:t},l))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=g;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[m]="string"==typeof e?e:a,p[1]=s;for(var i=2;i<o;i++)p[i]=r[i];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},57937:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>i});var n=r(94790),a=(r(67308),r(62757));const o={},p=void 0,s={unversionedId:"api/openai.createchatcompletionprops.messages",id:"api/openai.createchatcompletionprops.messages",title:"openai.createchatcompletionprops.messages",description:"Home &gt; @runlightyear/openai &gt; CreateChatCompletionProps &gt; messages",source:"@site/docs/api/openai.createchatcompletionprops.messages.md",sourceDirName:"api",slug:"/api/openai.createchatcompletionprops.messages",permalink:"/docs/api/openai.createchatcompletionprops.messages",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"CreateChatCompletionProps.messages property",id:"createchatcompletionpropsmessages-property",level:2}],l={toc:i},m="wrapper";function u(e){let{components:t,...r}=e;return(0,a.yg)(m,(0,n.A)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops"},"CreateChatCompletionProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops.messages"},"messages")),(0,a.yg)("h2",{id:"createchatcompletionpropsmessages-property"},"CreateChatCompletionProps.messages property"),(0,a.yg)("p",null,"The messages to generate chat completions for, in the chat format."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"messages: Array<ChatMessage>;\n")))}u.isMDXComponent=!0}}]);