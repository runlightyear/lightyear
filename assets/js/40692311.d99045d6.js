"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[25015],{62757:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>g});var r=n(67308);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=c(n),f=a,g=u["".concat(i,".").concat(f)]||u[f]||y[f]||o;return n?r.createElement(g,l(l({ref:t},d),{},{components:n})):r.createElement(g,l({ref:t},d))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=f;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[u]="string"==typeof e?e:a,l[1]=p;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},85411:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>y,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var r=n(94790),a=(n(67308),n(62757));const o={},l=void 0,p={unversionedId:"api/notion.pdfblock",id:"api/notion.pdfblock",title:"notion.pdfblock",description:"Home &gt; @runlightyear/notion &gt; PdfBlock",source:"@site/docs/api/notion.pdfblock.md",sourceDirName:"api",slug:"/api/notion.pdfblock",permalink:"/docs/api/notion.pdfblock",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"PdfBlock interface",id:"pdfblock-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],d={toc:c},u="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.pdfblock"},"PdfBlock")),(0,a.yg)("h2",{id:"pdfblock-interface"},"PdfBlock interface"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"interface PdfBlock extends BaseBlock \n")),(0,a.yg)("b",null,"Extends:"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.baseblock"},"BaseBlock")),(0,a.yg)("h2",{id:"required-properties"},"Required Properties"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Property"),(0,a.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/notion.pdfblock.pdf"},"pdf")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/notion.fileobject"},"FileObject")),(0,a.yg)("td",{parentName:"tr",align:null})),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/notion.pdfblock.type"},"type")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},'"pdf"'),(0,a.yg)("td",{parentName:"tr",align:null})))))}y.isMDXComponent=!0}}]);