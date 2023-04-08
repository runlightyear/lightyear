"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[74369],{57522:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var o=r(29901);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,o,s=function(e,t){if(null==e)return{};var r,o,s={},c=Object.keys(e);for(o=0;o<c.length;o++)r=c[o],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)r=c[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var a=o.createContext({}),l=function(e){var t=o.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):n(n({},t),e)),r},u=function(e){var t=l(e.components);return o.createElement(a.Provider,{value:t},e.children)},i={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var r=e.components,s=e.mdxType,c=e.originalType,a=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=l(r),f=s,b=d["".concat(a,".").concat(f)]||d[f]||i[f]||c;return r?o.createElement(b,n(n({ref:t},u),{},{components:r})):o.createElement(b,n({ref:t},u))}));function f(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var c=r.length,n=new Array(c);n[0]=d;var p={};for(var a in t)hasOwnProperty.call(t,a)&&(p[a]=t[a]);p.originalType=e,p.mdxType="string"==typeof e?e:s,n[1]=p;for(var l=2;l<c;l++)n[l]=r[l];return o.createElement.apply(null,n)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6092:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>a,contentTitle:()=>n,default:()=>i,frontMatter:()=>c,metadata:()=>p,toc:()=>l});var o=r(14090),s=(r(29901),r(57522));const c={},n=void 0,p={unversionedId:"api/salesforce.describesobjectresult.supportedscopes",id:"api/salesforce.describesobjectresult.supportedscopes",title:"salesforce.describesobjectresult.supportedscopes",description:"Home &gt; @runlightyear/salesforce &gt; DescribeSObjectResult &gt; supportedScopes",source:"@site/docs/api/salesforce.describesobjectresult.supportedscopes.md",sourceDirName:"api",slug:"/api/salesforce.describesobjectresult.supportedscopes",permalink:"/docs/api/salesforce.describesobjectresult.supportedscopes",draft:!1,tags:[],version:"current",frontMatter:{}},a={},l=[{value:"DescribeSObjectResult.supportedScopes property",id:"describesobjectresultsupportedscopes-property",level:2}],u={toc:l};function i(e){let{components:t,...r}=e;return(0,s.kt)("wrapper",(0,o.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,s.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,s.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult"},"DescribeSObjectResult")," ",">"," ",(0,s.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult.supportedscopes"},"supportedScopes")),(0,s.kt)("h2",{id:"describesobjectresultsupportedscopes-property"},"DescribeSObjectResult.supportedScopes property"),(0,s.kt)("p",null,"The list of supported scopes for the object. For example, Account might have supported scopes of \u201cAll Accounts\u201d, \u201cMy Accounts\u201d, and \u201cMy Team\u2019s Accounts\u201d."),(0,s.kt)("b",null,"Signature:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"supportedScopes: ScopeInfo;\n")))}i.isMDXComponent=!0}}]);