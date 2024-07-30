"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[22661],{62757:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>f});var n=r(67308);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},p=Object.keys(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,p=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=l(r),y=o,f=u["".concat(c,".").concat(y)]||u[y]||m[y]||p;return r?n.createElement(f,a(a({ref:t},s),{},{components:r})):n.createElement(f,a({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var p=r.length,a=new Array(p);a[0]=y;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:o,a[1]=i;for(var l=2;l<p;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},86179:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>m,frontMatter:()=>p,metadata:()=>i,toc:()=>l});var n=r(94790),o=(r(67308),r(62757));const p={},a=void 0,i={unversionedId:"api/openai.createcompletionprops.stop",id:"api/openai.createcompletionprops.stop",title:"openai.createcompletionprops.stop",description:"Home &gt; @runlightyear/openai &gt; CreateCompletionProps &gt; stop",source:"@site/docs/api/openai.createcompletionprops.stop.md",sourceDirName:"api",slug:"/api/openai.createcompletionprops.stop",permalink:"/docs/api/openai.createcompletionprops.stop",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"CreateCompletionProps.stop property",id:"createcompletionpropsstop-property",level:2}],s={toc:l},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.yg)(u,(0,n.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/openai.createcompletionprops"},"CreateCompletionProps")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/openai.createcompletionprops.stop"},"stop")),(0,o.yg)("h2",{id:"createcompletionpropsstop-property"},"CreateCompletionProps.stop property"),(0,o.yg)("p",null,"Defaults to null Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence."),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"stop?: string | string[] | null;\n")))}m.isMDXComponent=!0}}]);