"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[64],{62757:(e,r,t)=>{t.d(r,{xA:()=>y,yg:()=>s});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),d=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},y=function(e){var r=d(e.components);return n.createElement(l.Provider,{value:r},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,y=p(e,["components","mdxType","originalType","parentName"]),c=d(t),m=a,s=c["".concat(l,".").concat(m)]||c[m]||u[m]||o;return t?n.createElement(s,i(i({ref:r},y),{},{components:t})):n.createElement(s,i({ref:r},y))}));function s(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var p={};for(var l in r)hasOwnProperty.call(r,l)&&(p[l]=r[l]);p.originalType=e,p[c]="string"==typeof e?e:a,i[1]=p;for(var d=2;d<o;d++)i[d]=t[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},11811:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>d});var n=t(94790),a=(t(67308),t(62757));const o={},i=void 0,p={unversionedId:"api/openai.openai.modifythread",id:"api/openai.openai.modifythread",title:"openai.openai.modifythread",description:"Home &gt; @runlightyear/openai &gt; OpenAI &gt; modifyThread",source:"@site/docs/api/openai.openai.modifythread.md",sourceDirName:"api",slug:"/api/openai.openai.modifythread",permalink:"/docs/api/openai.openai.modifythread",draft:!1,tags:[],version:"current",frontMatter:{}},l={},d=[{value:"OpenAI.modifyThread() method",id:"openaimodifythread-method",level:2},{value:"Parameters",id:"parameters",level:2}],y={toc:d},c="wrapper";function u(e){let{components:r,...t}=e;return(0,a.yg)(c,(0,n.A)({},y,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai.openai"},"OpenAI")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai.openai.modifythread"},"modifyThread")),(0,a.yg)("h2",{id:"openaimodifythread-method"},"OpenAI.modifyThread() method"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,a.yg)("p",null,"Modify a thread"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"modifyThread(props: ModifyThreadProps): Promise<ModifyThreadResponse>;\n")),(0,a.yg)("h2",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"props"),(0,a.yg)("td",{parentName:"tr",align:null},"ModifyThreadProps"),(0,a.yg)("td",{parentName:"tr",align:null})))),(0,a.yg)("b",null,"Returns:"),(0,a.yg)("p",null,"Promise","<","ModifyThreadResponse",">"))}u.isMDXComponent=!0}}]);