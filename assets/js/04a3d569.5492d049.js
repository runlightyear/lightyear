"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5652],{57522:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>m});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},i=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,p=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),h=u(r),m=a,d=h["".concat(p,".").concat(m)]||h[m]||l[m]||s;return r?n.createElement(d,o(o({ref:t},i),{},{components:r})):n.createElement(d,o({ref:t},i))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=h;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var u=2;u<s;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},15649:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>l,frontMatter:()=>s,metadata:()=>c,toc:()=>u});var n=r(14090),a=(r(29901),r(57522));const s={},o=void 0,c={unversionedId:"api/lightyear.oauthconnector.processrequestaccesstokenresponse",id:"api/lightyear.oauthconnector.processrequestaccesstokenresponse",title:"lightyear.oauthconnector.processrequestaccesstokenresponse",description:"Home &gt; @runlightyear/lightyear &gt; OauthConnector &gt; processRequestAccessTokenResponse",source:"@site/docs/api/lightyear.oauthconnector.processrequestaccesstokenresponse.md",sourceDirName:"api",slug:"/api/lightyear.oauthconnector.processrequestaccesstokenresponse",permalink:"/lightyear/docs/api/lightyear.oauthconnector.processrequestaccesstokenresponse",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/lightyear.oauthconnector.processrequestaccesstokenresponse.md",tags:[],version:"current",frontMatter:{}},p={},u=[{value:"OauthConnector.processRequestAccessTokenResponse() method",id:"oauthconnectorprocessrequestaccesstokenresponse-method",level:2},{value:"Parameters",id:"parameters",level:2}],i={toc:u};function l(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnector"},"OauthConnector")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnector.processrequestaccesstokenresponse"},"processRequestAccessTokenResponse")),(0,a.kt)("h2",{id:"oauthconnectorprocessrequestaccesstokenresponse-method"},"OauthConnector.processRequestAccessTokenResponse() method"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"processRequestAccessTokenResponse({ status, statusText, headers, text, }: {\n        status: number;\n        statusText: string;\n        headers: Record<string, string>;\n        text: string;\n    }): AuthData;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"{ status, statusText, headers, text, }"),(0,a.kt)("td",{parentName:"tr",align:null},"{ status: number; statusText: string; headers: Record","<","string, string",">","; text: string; }"),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"AuthData"))}l.isMDXComponent=!0}}]);