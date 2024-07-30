"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[72492],{62757:(e,t,r)=>{r.d(t,{xA:()=>i,yg:()=>h});var n=r(67308);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},i=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),u=l(r),y=a,h=u["".concat(p,".").concat(y)]||u[y]||g[y]||o;return r?n.createElement(h,s(s({ref:t},i),{},{components:r})):n.createElement(h,s({ref:t},i))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=y;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[u]="string"==typeof e?e:a,s[1]=c;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},71700:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>g,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var n=r(94790),a=(r(67308),r(62757));const o={},s=void 0,c={unversionedId:"api/lightyear.oauthconnector.processrefreshaccesstokenresponse",id:"api/lightyear.oauthconnector.processrefreshaccesstokenresponse",title:"lightyear.oauthconnector.processrefreshaccesstokenresponse",description:"Home &gt; @runlightyear/lightyear &gt; OAuthConnector &gt; processRefreshAccessTokenResponse",source:"@site/docs/api/lightyear.oauthconnector.processrefreshaccesstokenresponse.md",sourceDirName:"api",slug:"/api/lightyear.oauthconnector.processrefreshaccesstokenresponse",permalink:"/docs/api/lightyear.oauthconnector.processrefreshaccesstokenresponse",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"OAuthConnector.processRefreshAccessTokenResponse() method",id:"oauthconnectorprocessrefreshaccesstokenresponse-method",level:2},{value:"Parameters",id:"parameters",level:2}],i={toc:l},u="wrapper";function g(e){let{components:t,...r}=e;return(0,a.yg)(u,(0,n.A)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnector"},"OAuthConnector")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnector.processrefreshaccesstokenresponse"},"processRefreshAccessTokenResponse")),(0,a.yg)("h2",{id:"oauthconnectorprocessrefreshaccesstokenresponse-method"},"OAuthConnector.processRefreshAccessTokenResponse() method"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"processRefreshAccessTokenResponse({ status, statusText, headers, text, }: {\n        status: number;\n        statusText: string;\n        headers: Record<string, string>;\n        text: string;\n    }): AuthData;\n")),(0,a.yg)("h2",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"{ status, statusText, headers, text, }"),(0,a.yg)("td",{parentName:"tr",align:null},"{ status: number; statusText: string; headers: Record","<","string, string",">","; text: string; }"),(0,a.yg)("td",{parentName:"tr",align:null})))),(0,a.yg)("b",null,"Returns:"),(0,a.yg)("p",null,"AuthData"))}g.isMDXComponent=!0}}]);