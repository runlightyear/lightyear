"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[73231],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,c=e.originalType,i=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=u(r),f=a,g=m["".concat(i,".").concat(f)]||m[f]||l[f]||c;return r?n.createElement(g,o(o({ref:t},s),{},{components:r})):n.createElement(g,o({ref:t},s))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=r.length,o=new Array(c);o[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var u=2;u<c;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},97547:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>l,frontMatter:()=>c,metadata:()=>p,toc:()=>u});var n=r(14090),a=(r(29901),r(57522));const c={},o=void 0,p={unversionedId:"api/gcal.eventresourceinput.attachments",id:"api/gcal.eventresourceinput.attachments",title:"gcal.eventresourceinput.attachments",description:"Home &gt; @runlightyear/gcal &gt; EventResourceInput &gt; attachments",source:"@site/docs/api/gcal.eventresourceinput.attachments.md",sourceDirName:"api",slug:"/api/gcal.eventresourceinput.attachments",permalink:"/docs/api/gcal.eventresourceinput.attachments",draft:!1,tags:[],version:"current",frontMatter:{}},i={},u=[{value:"EventResourceInput.attachments property",id:"eventresourceinputattachments-property",level:2}],s={toc:u};function l(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.eventresourceinput"},"EventResourceInput")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.eventresourceinput.attachments"},"attachments")),(0,a.kt)("h2",{id:"eventresourceinputattachments-property"},"EventResourceInput.attachments property"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"attachments?: [\n        {\n            fileUrl: string;\n            title: string;\n            mimeType: string;\n            iconLink: string;\n            fileId: string;\n        }\n    ];\n")))}l.isMDXComponent=!0}}]);