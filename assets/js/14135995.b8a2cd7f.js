"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[81569],{57522:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>b});var n=t(29901);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),i=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},u=function(e){var r=i(e.components);return n.createElement(l.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),f=i(t),b=o,d=f["".concat(l,".").concat(b)]||f[b]||p[b]||a;return t?n.createElement(d,c(c({ref:r},u),{},{components:t})):n.createElement(d,c({ref:r},u))}));function b(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,c=new Array(a);c[0]=f;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,c[1]=s;for(var i=2;i<a;i++)c[i]=t[i];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},95419:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>i});var n=t(14090),o=(t(29901),t(57522));const a={},c=void 0,s={unversionedId:"api/salesforce.describesobjectresult.urlnew",id:"api/salesforce.describesobjectresult.urlnew",title:"salesforce.describesobjectresult.urlnew",description:"Home &gt; @runlightyear/salesforce &gt; DescribeSObjectResult &gt; urlNew",source:"@site/docs/api/salesforce.describesobjectresult.urlnew.md",sourceDirName:"api",slug:"/api/salesforce.describesobjectresult.urlnew",permalink:"/docs/api/salesforce.describesobjectresult.urlnew",draft:!1,tags:[],version:"current",frontMatter:{}},l={},i=[{value:"DescribeSObjectResult.urlNew property",id:"describesobjectresulturlnew-property",level:2}],u={toc:i};function p(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult"},"DescribeSObjectResult")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult.urlnew"},"urlNew")),(0,o.kt)("h2",{id:"describesobjectresulturlnew-property"},"DescribeSObjectResult.urlNew property"),(0,o.kt)("p",null,"URL to the new/create page for this object. Client applications can use this URL to redirect to, or access, the Salesforce user interface for standard and custom objects. To provide flexibility and allow for future enhancements, returned urlNew values are dynamic. To ensure that client applications are forward compatible, it is recommended that they use this capability where possible. Note that, for objects for which a stable URL is not available, this field is returned empty."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"urlNew: string;\n")))}p.isMDXComponent=!0}}]);