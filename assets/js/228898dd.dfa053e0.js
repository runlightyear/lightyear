"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[32889],{57522:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>f});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},i=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),h=l(r),f=a,m=h["".concat(p,".").concat(f)]||h[f]||u[f]||o;return r?n.createElement(m,s(s({ref:t},i),{},{components:r})):n.createElement(m,s({ref:t},i))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=h;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,s[1]=c;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},72537:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var n=r(14090),a=(r(29901),r(57522));const o={},s=void 0,c={unversionedId:"api/lightyear.oauthconnector.processrefreshaccesstokenresponse",id:"api/lightyear.oauthconnector.processrefreshaccesstokenresponse",title:"lightyear.oauthconnector.processrefreshaccesstokenresponse",description:"Home &gt; @runlightyear/lightyear &gt; OAuthConnector &gt; processRefreshAccessTokenResponse",source:"@site/docs/api/lightyear.oauthconnector.processrefreshaccesstokenresponse.md",sourceDirName:"api",slug:"/api/lightyear.oauthconnector.processrefreshaccesstokenresponse",permalink:"/docs/api/lightyear.oauthconnector.processrefreshaccesstokenresponse",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"OAuthConnector.processRefreshAccessTokenResponse() method",id:"oauthconnectorprocessrefreshaccesstokenresponse-method",level:2},{value:"Parameters",id:"parameters",level:2}],i={toc:l};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnector"},"OAuthConnector")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnector.processrefreshaccesstokenresponse"},"processRefreshAccessTokenResponse")),(0,a.kt)("h2",{id:"oauthconnectorprocessrefreshaccesstokenresponse-method"},"OAuthConnector.processRefreshAccessTokenResponse() method"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"processRefreshAccessTokenResponse({ status, statusText, headers, text, }: {\n        status: number;\n        statusText: string;\n        headers: Record<string, string>;\n        text: string;\n    }): AuthData;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"{ status, statusText, headers, text, }"),(0,a.kt)("td",{parentName:"tr",align:null},"{ status: number; statusText: string; headers: Record","<","string, string",">","; text: string; }"),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"AuthData"))}u.isMDXComponent=!0}}]);