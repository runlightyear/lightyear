"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[89518],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=l(r),f=o,y=m["".concat(c,".").concat(f)]||m[f]||u[f]||a;return r?n.createElement(y,p(p({ref:t},s),{},{components:r})):n.createElement(y,p({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,p=new Array(a);p[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,p[1]=i;for(var l=2;l<a;l++)p[l]=r[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},72975:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var n=r(14090),o=(r(29901),r(57522));const a={},p=void 0,i={unversionedId:"api/openai.createcompletionprops.n",id:"api/openai.createcompletionprops.n",title:"openai.createcompletionprops.n",description:"Home &gt; @runlightyear/openai &gt; CreateCompletionProps &gt; n",source:"@site/docs/api/openai.createcompletionprops.n.md",sourceDirName:"api",slug:"/api/openai.createcompletionprops.n",permalink:"/docs/api/openai.createcompletionprops.n",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"CreateCompletionProps.n property",id:"createcompletionpropsn-property",level:2}],s={toc:l};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/openai.createcompletionprops"},"CreateCompletionProps")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/openai.createcompletionprops.n"},"n")),(0,o.kt)("h2",{id:"createcompletionpropsn-property"},"CreateCompletionProps.n property"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,o.kt)("p",null,"Defaults to 1 How many completions to generate for each prompt."),(0,o.kt)("p",null,"Note: Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for maxTokens and stop."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"n?: number;\n")))}u.isMDXComponent=!0}}]);