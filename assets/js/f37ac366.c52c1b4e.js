"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[63612],{57522:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>m});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),l=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},u=function(e){var r=l(e.components);return n.createElement(i.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),f=l(t),m=a,y=f["".concat(i,".").concat(m)]||f[m]||s[m]||o;return t?n.createElement(y,c(c({ref:r},u),{},{components:t})):n.createElement(y,c({ref:r},u))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=f;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,c[1]=p;for(var l=2;l<o;l++)c[l]=t[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},43161:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>c,default:()=>s,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var n=t(14090),a=(t(29901),t(57522));const o={},c=void 0,p={unversionedId:"api/gcal.eventresource.creator",id:"api/gcal.eventresource.creator",title:"gcal.eventresource.creator",description:"Home &gt; @runlightyear/gcal &gt; EventResource &gt; creator",source:"@site/docs/api/gcal.eventresource.creator.md",sourceDirName:"api",slug:"/api/gcal.eventresource.creator",permalink:"/docs/api/gcal.eventresource.creator",draft:!1,tags:[],version:"current",frontMatter:{}},i={},l=[{value:"EventResource.creator property",id:"eventresourcecreator-property",level:2}],u={toc:l};function s(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.eventresource"},"EventResource")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.eventresource.creator"},"creator")),(0,a.kt)("h2",{id:"eventresourcecreator-property"},"EventResource.creator property"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"creator: {\n        id: string;\n        email: string;\n        displayName: string;\n        self: boolean;\n    };\n")))}s.isMDXComponent=!0}}]);