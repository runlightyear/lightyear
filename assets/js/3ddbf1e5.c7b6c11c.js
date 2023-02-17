"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2281],{57522:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>f});var n=t(29901);function p(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){p(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,p=function(e,r){if(null==e)return{};var t,n,p={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(p[t]=e[t]);return p}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(p[t]=e[t])}return p}var c=n.createContext({}),i=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},u=function(e){var r=i(e.components);return n.createElement(c.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},b=n.forwardRef((function(e,r){var t=e.components,p=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),b=i(t),f=p,y=b["".concat(c,".").concat(f)]||b[f]||l[f]||o;return t?n.createElement(y,a(a({ref:r},u),{},{components:t})):n.createElement(y,a({ref:r},u))}));function f(e,r){var t=arguments,p=r&&r.mdxType;if("string"==typeof e||p){var o=t.length,a=new Array(o);a[0]=b;var s={};for(var c in r)hasOwnProperty.call(r,c)&&(s[c]=r[c]);s.originalType=e,s.mdxType="string"==typeof e?e:p,a[1]=s;for(var i=2;i<o;i++)a[i]=t[i];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}b.displayName="MDXCreateElement"},64783:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>s,toc:()=>i});var n=t(14090),p=(t(29901),t(57522));const o={},a=void 0,s={unversionedId:"api/lightyear.subscribepropsfuncprops",id:"api/lightyear.subscribepropsfuncprops",title:"lightyear.subscribepropsfuncprops",description:"Home &gt; @runlightyear/lightyear &gt; SubscribePropsFuncProps",source:"@site/docs/api/lightyear.subscribepropsfuncprops.md",sourceDirName:"api",slug:"/api/lightyear.subscribepropsfuncprops",permalink:"/lightyear/docs/api/lightyear.subscribepropsfuncprops",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/lightyear.subscribepropsfuncprops.md",tags:[],version:"current",frontMatter:{}},c={},i=[{value:"SubscribePropsFuncProps type",id:"subscribepropsfuncprops-type",level:2}],u={toc:i};function l(e){let{components:r,...t}=e;return(0,p.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,p.kt)("p",null,(0,p.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,p.kt)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,p.kt)("a",{parentName:"p",href:"/docs/api/lightyear.subscribepropsfuncprops"},"SubscribePropsFuncProps")),(0,p.kt)("h2",{id:"subscribepropsfuncprops-type"},"SubscribePropsFuncProps type"),(0,p.kt)("b",null,"Signature:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"declare type SubscribePropsFuncProps = {\n    endpoint: string;\n    auths: Auths;\n    variables: Variables;\n    secrets: Secrets;\n};\n")))}l.isMDXComponent=!0}}]);