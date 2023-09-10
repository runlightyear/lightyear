"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[76074],{57522:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>f});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),u=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},c=function(e){var r=u(e.components);return n.createElement(i.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),y=u(t),f=a,d=y["".concat(i,".").concat(f)]||y[f]||l[f]||o;return t?n.createElement(d,s(s({ref:r},c),{},{components:t})):n.createElement(d,s({ref:r},c))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=y;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,s[1]=p;for(var u=2;u<o;u++)s[u]=t[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},30851:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>s,default:()=>l,frontMatter:()=>o,metadata:()=>p,toc:()=>u});var n=t(14090),a=(t(29901),t(57522));const o={},s=void 0,p={unversionedId:"api/notion.querydatabaseprops.startcursor",id:"api/notion.querydatabaseprops.startcursor",title:"notion.querydatabaseprops.startcursor",description:"Home &gt; @runlightyear/notion &gt; QueryDatabaseProps &gt; startCursor",source:"@site/docs/api/notion.querydatabaseprops.startcursor.md",sourceDirName:"api",slug:"/api/notion.querydatabaseprops.startcursor",permalink:"/docs/api/notion.querydatabaseprops.startcursor",draft:!1,tags:[],version:"current",frontMatter:{}},i={},u=[{value:"QueryDatabaseProps.startCursor property",id:"querydatabasepropsstartcursor-property",level:2}],c={toc:u};function l(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion.querydatabaseprops"},"QueryDatabaseProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion.querydatabaseprops.startcursor"},"startCursor")),(0,a.kt)("h2",{id:"querydatabasepropsstartcursor-property"},"QueryDatabaseProps.startCursor property"),(0,a.kt)("p",null,"When supplied, returns a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"startCursor?: string;\n")))}l.isMDXComponent=!0}}]);