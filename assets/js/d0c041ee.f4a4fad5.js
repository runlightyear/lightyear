"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[44215],{57522:(t,e,r)=>{r.d(e,{Zo:()=>u,kt:()=>f});var n=r(29901);function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}var m=n.createContext({}),p=function(t){var e=n.useContext(m),r=e;return t&&(r="function"==typeof t?t(e):a(a({},e),t)),r},u=function(t){var e=p(t.components);return n.createElement(m.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},l=n.forwardRef((function(t,e){var r=t.components,o=t.mdxType,i=t.originalType,m=t.parentName,u=c(t,["components","mdxType","originalType","parentName"]),l=p(r),f=o,h=l["".concat(m,".").concat(f)]||l[f]||s[f]||i;return r?n.createElement(h,a(a({ref:e},u),{},{components:r})):n.createElement(h,a({ref:e},u))}));function f(t,e){var r=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var i=r.length,a=new Array(i);a[0]=l;var c={};for(var m in e)hasOwnProperty.call(e,m)&&(c[m]=e[m]);c.originalType=t,c.mdxType="string"==typeof t?t:o,a[1]=c;for(var p=2;p<i;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}l.displayName="MDXCreateElement"},16907:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>m,contentTitle:()=>a,default:()=>s,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var n=r(14090),o=(r(29901),r(57522));const i={},a=void 0,c={unversionedId:"api/github.pushcommit.committer",id:"api/github.pushcommit.committer",title:"github.pushcommit.committer",description:"Home &gt; @runlightyear/github &gt; PushCommit &gt; committer",source:"@site/docs/api/github.pushcommit.committer.md",sourceDirName:"api",slug:"/api/github.pushcommit.committer",permalink:"/docs/api/github.pushcommit.committer",draft:!1,tags:[],version:"current",frontMatter:{}},m={},p=[{value:"PushCommit.committer property",id:"pushcommitcommitter-property",level:2}],u={toc:p};function s(t){let{components:e,...r}=t;return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.pushcommit"},"PushCommit")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.pushcommit.committer"},"committer")),(0,o.kt)("h2",{id:"pushcommitcommitter-property"},"PushCommit.committer property"),(0,o.kt)("p",null,"Metaproperties for Git author/committer information."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"committer: {\n        date: string;\n        email: string | null;\n        name: string;\n        username: string;\n    };\n")))}s.isMDXComponent=!0}}]);