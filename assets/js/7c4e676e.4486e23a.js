"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[28680],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var o=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=o.createContext({}),l=function(e){var t=o.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=l(r),f=n,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||a;return r?o.createElement(d,i(i({ref:t},s),{},{components:r})):o.createElement(d,i({ref:t},s))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:n,i[1]=p;for(var l=2;l<a;l++)i[l]=r[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},25184:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var o=r(14090),n=(r(29901),r(57522));const a={},i=void 0,p={unversionedId:"api/openai.createchatcompletionprops.logitbias",id:"api/openai.createchatcompletionprops.logitbias",title:"openai.createchatcompletionprops.logitbias",description:"Home &gt; @runlightyear/openai &gt; CreateChatCompletionProps &gt; logitBias",source:"@site/docs/api/openai.createchatcompletionprops.logitbias.md",sourceDirName:"api",slug:"/api/openai.createchatcompletionprops.logitbias",permalink:"/docs/api/openai.createchatcompletionprops.logitbias",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"CreateChatCompletionProps.logitBias property",id:"createchatcompletionpropslogitbias-property",level:2}],s={toc:l};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops"},"CreateChatCompletionProps")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/openai.createchatcompletionprops.logitbias"},"logitBias")),(0,n.kt)("h2",{id:"createchatcompletionpropslogitbias-property"},"CreateChatCompletionProps.logitBias property"),(0,n.kt)("p",null,"Defaults to null Modify the likelihood of specified tokens appearing in the completion."),(0,n.kt)("p",null,"Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"logitBias: object;\n")))}u.isMDXComponent=!0}}]);