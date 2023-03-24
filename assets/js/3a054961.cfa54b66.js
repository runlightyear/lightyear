"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9120],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(r),m=o,f=u["".concat(i,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(f,s(s({ref:t},c),{},{components:r})):n.createElement(f,s({ref:t},c))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=u;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:o,s[1]=p;for(var l=2;l<a;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1423:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var n=r(14090),o=(r(29901),r(57522));const a={},s=void 0,p={unversionedId:"api/openai.listmodelsresponse.data",id:"api/openai.listmodelsresponse.data",title:"openai.listmodelsresponse.data",description:"Home &gt; @runlightyear/openai &gt; ListModelsResponse &gt; data",source:"@site/docs/api/openai.listmodelsresponse.data.md",sourceDirName:"api",slug:"/api/openai.listmodelsresponse.data",permalink:"/docs/api/openai.listmodelsresponse.data",draft:!1,tags:[],version:"current",frontMatter:{}},i={},l=[{value:"ListModelsResponse.data property",id:"listmodelsresponsedata-property",level:2}],c={toc:l};function d(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/openai.listmodelsresponse"},"ListModelsResponse")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/openai.listmodelsresponse.data"},"data")),(0,o.kt)("h2",{id:"listmodelsresponsedata-property"},"ListModelsResponse.data property"),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'data: {\n        object: "list";\n        data: Array<{\n            id: string;\n            object: "model";\n            ownedBy: string;\n            permission: unknown;\n        }>;\n    };\n')))}d.isMDXComponent=!0}}]);