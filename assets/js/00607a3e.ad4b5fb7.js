"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[64933],{57522:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(29901);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=l(n),f=o,y=d["".concat(p,".").concat(f)]||d[f]||s[f]||i;return n?r.createElement(y,a(a({ref:t},u),{},{components:n})):r.createElement(y,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3608:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>s,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var r=n(14090),o=(n(29901),n(57522));const i={},a=void 0,c={unversionedId:"api/notion.notionid",id:"api/notion.notionid",title:"notion.notionid",description:"Home &gt; @runlightyear/notion &gt; NotionId",source:"@site/docs/api/notion.notionid.md",sourceDirName:"api",slug:"/api/notion.notionid",permalink:"/docs/api/notion.notionid",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"NotionId type",id:"notionid-type",level:2}],u={toc:l};function s(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion.notionid"},"NotionId")),(0,o.kt)("h2",{id:"notionid-type"},"NotionId type"),(0,o.kt)("p",null,"UUIDv4"),(0,o.kt)("p",null,'Example: "6c574cee-ca68-41c8-86e0-1b9e992689fb"'),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"declare type NotionId = string;\n")))}s.isMDXComponent=!0}}]);