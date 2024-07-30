"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[34440],{62757:(e,n,t)=>{t.d(n,{xA:()=>f,yg:()=>y});var r=t(67308);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},f=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,f=l(e,["components","mdxType","originalType","parentName"]),u=c(t),d=a,y=u["".concat(p,".").concat(d)]||u[d]||m[d]||o;return t?r.createElement(y,i(i({ref:n},f),{},{components:t})):r.createElement(y,i({ref:n},f))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=d;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},89861:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=t(94790),a=(t(67308),t(62757));const o={},i=void 0,l={unversionedId:"api/notion.namedfile",id:"api/notion.namedfile",title:"notion.namedfile",description:"Home &gt; @runlightyear/notion &gt; NamedFile",source:"@site/docs/api/notion.namedfile.md",sourceDirName:"api",slug:"/api/notion.namedfile",permalink:"/docs/api/notion.namedfile",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"NamedFile type",id:"namedfile-type",level:2}],f={toc:c},u="wrapper";function m(e){let{components:n,...t}=e;return(0,a.yg)(u,(0,r.A)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.namedfile"},"NamedFile")),(0,a.yg)("h2",{id:"namedfile-type"},"NamedFile type"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"declare type NamedFile = NamedInternalFile | NamedExternalFile;\n")),(0,a.yg)("b",null,"References:"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.namedinternalfile"},"NamedInternalFile"),", ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.namedexternalfile"},"NamedExternalFile")))}m.isMDXComponent=!0}}]);