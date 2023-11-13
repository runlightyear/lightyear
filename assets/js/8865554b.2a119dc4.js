"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[13716],{57522:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>f});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},p=Object.keys(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),s=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},l=function(e){var r=s(e.components);return n.createElement(c.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,p=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=s(t),f=a,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||p;return t?n.createElement(d,o(o({ref:r},l),{},{components:t})):n.createElement(d,o({ref:r},l))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var p=t.length,o=new Array(p);o[0]=m;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<p;s++)o[s]=t[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},82853:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>p,metadata:()=>i,toc:()=>s});var n=t(14090),a=(t(29901),t(57522));const p={},o=void 0,i={unversionedId:"api/openai.createtranscriptionprops.temperature",id:"api/openai.createtranscriptionprops.temperature",title:"openai.createtranscriptionprops.temperature",description:"Home &gt; @runlightyear/openai &gt; CreateTranscriptionProps &gt; temperature",source:"@site/docs/api/openai.createtranscriptionprops.temperature.md",sourceDirName:"api",slug:"/api/openai.createtranscriptionprops.temperature",permalink:"/docs/api/openai.createtranscriptionprops.temperature",draft:!1,tags:[],version:"current",frontMatter:{}},c={},s=[{value:"CreateTranscriptionProps.temperature property",id:"createtranscriptionpropstemperature-property",level:2}],l={toc:s};function u(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai.createtranscriptionprops"},"CreateTranscriptionProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/openai.createtranscriptionprops.temperature"},"temperature")),(0,a.kt)("h2",{id:"createtranscriptionpropstemperature-property"},"CreateTranscriptionProps.temperature property"),(0,a.kt)("p",null,"Defaults to 0"),(0,a.kt)("p",null,"The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"temperature?: number;\n")))}u.isMDXComponent=!0}}]);