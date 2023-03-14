"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[51139],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var o=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},p=Object.keys(e);for(o=0;o<p.length;o++)r=p[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(o=0;o<p.length;o++)r=p[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=o.createContext({}),s=function(e){var t=o.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=s(e.components);return o.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,p=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(r),f=n,b=m["".concat(i,".").concat(f)]||m[f]||u[f]||p;return r?o.createElement(b,a(a({ref:t},c),{},{components:r})):o.createElement(b,a({ref:t},c))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=r.length,a=new Array(p);a[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,a[1]=l;for(var s=2;s<p;s++)a[s]=r[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},14749:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>a,default:()=>u,frontMatter:()=>p,metadata:()=>l,toc:()=>s});var o=r(14090),n=(r(29901),r(57522));const p={},a=void 0,l={unversionedId:"api/openai.createcompletionprops.logprobs",id:"api/openai.createcompletionprops.logprobs",title:"openai.createcompletionprops.logprobs",description:"Home &gt; @runlightyear/openai &gt; CreateCompletionProps &gt; logprobs",source:"@site/docs/api/openai.createcompletionprops.logprobs.md",sourceDirName:"api",slug:"/api/openai.createcompletionprops.logprobs",permalink:"/docs/api/openai.createcompletionprops.logprobs",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"CreateCompletionProps.logprobs property",id:"createcompletionpropslogprobs-property",level:2}],c={toc:s};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/openai.createcompletionprops"},"CreateCompletionProps")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/openai.createcompletionprops.logprobs"},"logprobs")),(0,n.kt)("h2",{id:"createcompletionpropslogprobs-property"},"CreateCompletionProps.logprobs property"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"Defaults to null Include the log probabilities on the logprobs most likely tokens, as well the chosen tokens. For example, if logprobs is 5, the API will return a list of the 5 most likely tokens. The API will always return the logprob of the sampled token, so there may be up to logprobs+1 elements in the response."),(0,n.kt)("p",null,"The maximum value for logprobs is 5. If you need more than this, please contact us through our Help center and describe your use case."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"logprobs?: number | null;\n")))}u.isMDXComponent=!0}}]);