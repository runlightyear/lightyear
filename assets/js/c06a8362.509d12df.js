"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[90834],{62757:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>g});var r=n(67308);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=u(n),c=a,g=d["".concat(l,".").concat(c)]||d[c]||y[c]||i;return n?r.createElement(g,o(o({ref:t},s),{},{components:n})):r.createElement(g,o({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=c;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[d]="string"==typeof e?e:a,o[1]=p;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},97379:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>p,toc:()=>u});var r=n(94790),a=(n(67308),n(62757));const i={},o=void 0,p={unversionedId:"api/github.issuepinnedpayload",id:"api/github.issuepinnedpayload",title:"github.issuepinnedpayload",description:"Home &gt; @runlightyear/github &gt; IssuePinnedPayload",source:"@site/docs/api/github.issuepinnedpayload.md",sourceDirName:"api",slug:"/api/github.issuepinnedpayload",permalink:"/docs/api/github.issuepinnedpayload",draft:!1,tags:[],version:"current",frontMatter:{}},l={},u=[{value:"IssuePinnedPayload interface",id:"issuepinnedpayload-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],s={toc:u},d="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(d,(0,r.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.issuepinnedpayload"},"IssuePinnedPayload")),(0,a.yg)("h2",{id:"issuepinnedpayload-interface"},"IssuePinnedPayload interface"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"interface IssuePinnedPayload extends CommonPayload \n")),(0,a.yg)("b",null,"Extends:"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.commonpayload"},"CommonPayload")),(0,a.yg)("h2",{id:"required-properties"},"Required Properties"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Property"),(0,a.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/github.issuepinnedpayload.action"},"action")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},'"pinned"'),(0,a.yg)("td",{parentName:"tr",align:null})),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/github.issuepinnedpayload.issue"},"issue")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/github.issue"},"Issue")),(0,a.yg)("td",{parentName:"tr",align:null})))))}y.isMDXComponent=!0}}]);