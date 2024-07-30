"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[16676],{62757:(e,r,t)=>{t.d(r,{xA:()=>l,yg:()=>d});var a=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=a.createContext({}),c=function(e){var r=a.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},l=function(e){var r=c(e.components);return a.createElement(s.Provider,{value:r},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},y=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=c(t),y=n,d=u["".concat(s,".").concat(y)]||u[y]||m[y]||o;return t?a.createElement(d,i(i({ref:r},l),{},{components:t})):a.createElement(d,i({ref:r},l))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,i=new Array(o);i[0]=y;var p={};for(var s in r)hasOwnProperty.call(r,s)&&(p[s]=r[s]);p.originalType=e,p[u]="string"==typeof e?e:n,i[1]=p;for(var c=2;c<o;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},6819:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var a=t(94790),n=(t(67308),t(62757));const o={},i=void 0,p={unversionedId:"api/airtable.whoamiresponse.data",id:"api/airtable.whoamiresponse.data",title:"airtable.whoamiresponse.data",description:"Home &gt; @runlightyear/airtable &gt; WhoamiResponse &gt; data",source:"@site/docs/api/airtable.whoamiresponse.data.md",sourceDirName:"api",slug:"/api/airtable.whoamiresponse.data",permalink:"/docs/api/airtable.whoamiresponse.data",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"WhoamiResponse.data property",id:"whoamiresponsedata-property",level:2}],l={toc:c},u="wrapper";function m(e){let{components:r,...t}=e;return(0,n.yg)(u,(0,a.A)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.whoamiresponse"},"WhoamiResponse")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/airtable.whoamiresponse.data"},"data")),(0,n.yg)("h2",{id:"whoamiresponsedata-property"},"WhoamiResponse.data property"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"data: {\n        id: string;\n        scopes?: Array<AirtableScope>;\n    };\n")))}m.isMDXComponent=!0}}]);