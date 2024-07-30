"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[20573],{62757:(e,r,t)=>{t.d(r,{xA:()=>d,yg:()=>y});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),c=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},d=function(e){var r=c(e.components);return n.createElement(l.Provider,{value:r},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},s=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(t),s=a,y=u["".concat(l,".").concat(s)]||u[s]||g[s]||o;return t?n.createElement(y,p(p({ref:r},d),{},{components:t})):n.createElement(y,p({ref:r},d))}));function y(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,p=new Array(o);p[0]=s;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i[u]="string"==typeof e?e:a,p[1]=i;for(var c=2;c<o;c++)p[c]=t[c];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}s.displayName="MDXCreateElement"},33593:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>p,default:()=>g,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=t(94790),a=(t(67308),t(62757));const o={},p=void 0,i={unversionedId:"api/github.downloadrepoarchivezipprops",id:"api/github.downloadrepoarchivezipprops",title:"github.downloadrepoarchivezipprops",description:"Home &gt; @runlightyear/github &gt; DownloadRepoArchiveZipProps",source:"@site/docs/api/github.downloadrepoarchivezipprops.md",sourceDirName:"api",slug:"/api/github.downloadrepoarchivezipprops",permalink:"/docs/api/github.downloadrepoarchivezipprops",draft:!1,tags:[],version:"current",frontMatter:{}},l={},c=[{value:"DownloadRepoArchiveZipProps interface",id:"downloadrepoarchivezipprops-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],d={toc:c},u="wrapper";function g(e){let{components:r,...t}=e;return(0,a.yg)(u,(0,n.A)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.downloadrepoarchivezipprops"},"DownloadRepoArchiveZipProps")),(0,a.yg)("h2",{id:"downloadrepoarchivezipprops-interface"},"DownloadRepoArchiveZipProps interface"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"interface DownloadRepoArchiveZipProps \n")),(0,a.yg)("h2",{id:"required-properties"},"Required Properties"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Property"),(0,a.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/github.downloadrepoarchivezipprops.owner"},"owner")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"The account owner of the repository. The name is not case sensitive.")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/github.downloadrepoarchivezipprops.ref"},"ref")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null})),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/github.downloadrepoarchivezipprops.repo"},"repo")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"The name of the repository. The name is not case sensitive.")))))}g.isMDXComponent=!0}}]);