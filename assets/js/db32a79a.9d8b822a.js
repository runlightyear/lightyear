"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[84012],{62757:(e,n,t)=>{t.d(n,{xA:()=>s,yg:()=>g});var r=t(67308);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),i=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},s=function(e){var n=i(e.components);return r.createElement(l.Provider,{value:n},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),y=i(t),f=a,g=y["".concat(l,".").concat(f)]||y[f]||u[f]||o;return t?r.createElement(g,c(c({ref:n},s),{},{components:t})):r.createElement(g,c({ref:n},s))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=f;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p[y]="string"==typeof e?e:a,c[1]=p;for(var i=2;i<o;i++)c[i]=t[i];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},28038:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>i});var r=t(94790),a=(t(67308),t(62757));const o={},c=void 0,p={unversionedId:"api/gcal.eventtransparency",id:"api/gcal.eventtransparency",title:"gcal.eventtransparency",description:"Home &gt; @runlightyear/gcal &gt; EventTransparency",source:"@site/docs/api/gcal.eventtransparency.md",sourceDirName:"api",slug:"/api/gcal.eventtransparency",permalink:"/docs/api/gcal.eventtransparency",draft:!1,tags:[],version:"current",frontMatter:{}},l={},i=[{value:"EventTransparency type",id:"eventtransparency-type",level:2}],s={toc:i},y="wrapper";function u(e){let{components:n,...t}=e;return(0,a.yg)(y,(0,r.A)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal.eventtransparency"},"EventTransparency")),(0,a.yg)("h2",{id:"eventtransparency-type"},"EventTransparency type"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},'declare type EventTransparency = \n/**\n * Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI.\n */\n"opaque"\n/**\n * The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI.\n */\n | "transparent";\n')))}u.isMDXComponent=!0}}]);