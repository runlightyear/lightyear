"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[84092],{62757:(e,r,t)=>{t.d(r,{xA:()=>g,yg:()=>d});var a=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=a.createContext({}),c=function(e){var r=a.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},g=function(e){var r=c(e.components);return a.createElement(i.Provider,{value:r},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},s=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,g=l(e,["components","mdxType","originalType","parentName"]),u=c(t),s=n,d=u["".concat(i,".").concat(s)]||u[s]||y[s]||o;return t?a.createElement(d,p(p({ref:r},g),{},{components:t})):a.createElement(d,p({ref:r},g))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,p=new Array(o);p[0]=s;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l[u]="string"==typeof e?e:n,p[1]=l;for(var c=2;c<o;c++)p[c]=t[c];return a.createElement.apply(null,p)}return a.createElement.apply(null,t)}s.displayName="MDXCreateElement"},12927:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>p,default:()=>y,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=t(94790),n=(t(67308),t(62757));const o={},p=void 0,l={unversionedId:"api/notion.paragraphblock",id:"api/notion.paragraphblock",title:"notion.paragraphblock",description:"Home &gt; @runlightyear/notion &gt; ParagraphBlock",source:"@site/docs/api/notion.paragraphblock.md",sourceDirName:"api",slug:"/api/notion.paragraphblock",permalink:"/docs/api/notion.paragraphblock",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"ParagraphBlock interface",id:"paragraphblock-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],g={toc:c},u="wrapper";function y(e){let{components:r,...t}=e;return(0,n.yg)(u,(0,a.A)({},g,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/notion.paragraphblock"},"ParagraphBlock")),(0,n.yg)("h2",{id:"paragraphblock-interface"},"ParagraphBlock interface"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"interface ParagraphBlock extends BaseBlock \n")),(0,n.yg)("b",null,"Extends:"),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api/notion.baseblock"},"BaseBlock")),(0,n.yg)("h2",{id:"required-properties"},"Required Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/notion.paragraphblock.paragraph"},"paragraph")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/notion.paragraph"},"Paragraph")),(0,n.yg)("td",{parentName:"tr",align:null})),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/notion.paragraphblock.type"},"type")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},'"paragraph"'),(0,n.yg)("td",{parentName:"tr",align:null})))))}y.isMDXComponent=!0}}]);