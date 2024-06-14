"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[91034],{57522:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>m});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},i=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),f=c(r),m=n,d=f["".concat(s,".").concat(m)]||f[m]||u[m]||o;return r?a.createElement(d,l(l({ref:t},i),{},{components:r})):a.createElement(d,l({ref:t},i))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=f;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:n,l[1]=p;for(var c=2;c<o;c++)l[c]=r[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},85902:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var a=r(14090),n=(r(29901),r(57522));const o={},l=void 0,p={unversionedId:"api/salesforce.salesforceoauthprops",id:"api/salesforce.salesforceoauthprops",title:"salesforce.salesforceoauthprops",description:"Home &gt; @runlightyear/salesforce &gt; SalesforceOAuthProps",source:"@site/docs/api/salesforce.salesforceoauthprops.md",sourceDirName:"api",slug:"/api/salesforce.salesforceoauthprops",permalink:"/docs/api/salesforce.salesforceoauthprops",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"SalesforceOAuthProps interface",id:"salesforceoauthprops-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],i={toc:c};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.salesforceoauthprops"},"SalesforceOAuthProps")),(0,n.kt)("h2",{id:"salesforceoauthprops-interface"},"SalesforceOAuthProps interface"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"interface SalesforceOAuthProps extends OAuthConnectorProps \n")),(0,n.kt)("b",null,"Extends:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnectorprops"},"OAuthConnectorProps")),(0,n.kt)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Property"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/salesforce.salesforceoauthprops.prompt"},"prompt?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"{ login?: boolean; consent?: boolean; selectAccount?: boolean; }"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("b",null,(0,n.kt)("i",null,"(BETA)")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/salesforce.salesforceoauthprops.scopes"},"scopes?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Array","<","string",">"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("b",null,(0,n.kt)("i",null,"(BETA)")))))))}u.isMDXComponent=!0}}]);