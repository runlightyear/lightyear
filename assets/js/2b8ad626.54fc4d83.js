"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[38152],{57522:(t,e,n)=>{n.d(e,{Zo:()=>s,kt:()=>f});var r=n(29901);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var c=r.createContext({}),l=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},s=function(t){var e=l(t.components);return r.createElement(c.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,o=t.mdxType,i=t.originalType,c=t.parentName,s=p(t,["components","mdxType","originalType","parentName"]),d=l(n),f=o,y=d["".concat(c,".").concat(f)]||d[f]||u[f]||i;return n?r.createElement(y,a(a({ref:e},s),{},{components:n})):r.createElement(y,a({ref:e},s))}));function f(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var i=n.length,a=new Array(i);a[0]=d;var p={};for(var c in e)hasOwnProperty.call(e,c)&&(p[c]=e[c]);p.originalType=t,p.mdxType="string"==typeof t?t:o,a[1]=p;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},54092:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(14090),o=(n(29901),n(57522));const i={},a=void 0,p={unversionedId:"api/notion.datefiltercondition.isnotempty",id:"api/notion.datefiltercondition.isnotempty",title:"notion.datefiltercondition.isnotempty",description:"Home &gt; @runlightyear/notion &gt; DateFilterCondition &gt; isNotEmpty",source:"@site/docs/api/notion.datefiltercondition.isnotempty.md",sourceDirName:"api",slug:"/api/notion.datefiltercondition.isnotempty",permalink:"/docs/api/notion.datefiltercondition.isnotempty",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"DateFilterCondition.isNotEmpty property",id:"datefilterconditionisnotempty-property",level:2}],s={toc:l};function u(t){let{components:e,...n}=t;return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion.datefiltercondition"},"DateFilterCondition")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion.datefiltercondition.isnotempty"},"isNotEmpty")),(0,o.kt)("h2",{id:"datefilterconditionisnotempty-property"},"DateFilterCondition.isNotEmpty property"),(0,o.kt)("p",null,"The value to compare the date property value against."),(0,o.kt)("p",null,"Returns database entries where the date property value is not empty."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"isNotEmpty?: true;\n")))}u.isMDXComponent=!0}}]);