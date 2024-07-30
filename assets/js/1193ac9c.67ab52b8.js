"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[92609],{62757:(e,r,t)=>{t.d(r,{xA:()=>y,yg:()=>g});var a=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=a.createContext({}),l=function(e){var r=a.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},y=function(e){var r=l(e.components);return a.createElement(i.Provider,{value:r},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},s=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,y=c(e,["components","mdxType","originalType","parentName"]),u=l(t),s=n,g=u["".concat(i,".").concat(s)]||u[s]||f[s]||o;return t?a.createElement(g,p(p({ref:r},y),{},{components:t})):a.createElement(g,p({ref:r},y))}));function g(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,p=new Array(o);p[0]=s;var c={};for(var i in r)hasOwnProperty.call(r,i)&&(c[i]=r[i]);c.originalType=e,c[u]="string"==typeof e?e:n,p[1]=c;for(var l=2;l<o;l++)p[l]=t[l];return a.createElement.apply(null,p)}return a.createElement.apply(null,t)}s.displayName="MDXCreateElement"},16557:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>p,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var a=t(94790),n=(t(67308),t(62757));const o={},p=void 0,c={unversionedId:"api/github.createpayload.reftype",id:"api/github.createpayload.reftype",title:"github.createpayload.reftype",description:"Home &gt; @runlightyear/github &gt; CreatePayload &gt; refType",source:"@site/docs/api/github.createpayload.reftype.md",sourceDirName:"api",slug:"/api/github.createpayload.reftype",permalink:"/docs/api/github.createpayload.reftype",draft:!1,tags:[],version:"current",frontMatter:{}},i={},l=[{value:"CreatePayload.refType property",id:"createpayloadreftype-property",level:2}],y={toc:l},u="wrapper";function f(e){let{components:r,...t}=e;return(0,n.yg)(u,(0,a.A)({},y,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.createpayload"},"CreatePayload")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.createpayload.reftype"},"refType")),(0,n.yg)("h2",{id:"createpayloadreftype-property"},"CreatePayload.refType property"),(0,n.yg)("p",null,"The type of Git ref object created in the repository."),(0,n.yg)("p",null,"Can be one of: tag, branch"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},'refType: "tag" | "branch";\n')))}f.isMDXComponent=!0}}]);