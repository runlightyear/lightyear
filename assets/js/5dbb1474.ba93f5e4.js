"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[30921],{57522:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(29901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),i=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),y=i(n),f=a,d=y["".concat(c,".").concat(f)]||y[f]||u[f]||o;return n?r.createElement(d,s(s({ref:t},l),{},{components:n})):r.createElement(d,s({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=y;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,s[1]=p;for(var i=2;i<o;i++)s[i]=n[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},80086:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>i});var r=n(14090),a=(n(29901),n(57522));const o={},s=void 0,p={unversionedId:"api/salesforce.soaptype",id:"api/salesforce.soaptype",title:"salesforce.soaptype",description:"Home &gt; @runlightyear/salesforce &gt; SOAPType",source:"@site/docs/api/salesforce.soaptype.md",sourceDirName:"api",slug:"/api/salesforce.soaptype",permalink:"/docs/api/salesforce.soaptype",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"SOAPType type",id:"soaptype-type",level:2}],l={toc:i};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/salesforce.soaptype"},"SOAPType")),(0,a.kt)("h2",{id:"soaptype-type"},"SOAPType type"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'declare type SOAPType = \n/**\n * Unique ID associated with an sObject. For information on IDs, see Field Types.\n */\n"tns:ID"\n/**\n * Can be ID, Boolean, double, integer, string, date, or dateTime.\n */\n | "xsd:anyType"\n/**\n * Base 64-encoded binary data.\n */\n | "xsd:base64Binary"\n/**\n * Boolean (true / false) values.\n */\n | "xsd:boolean"\n/**\n * Date values.\n */\n | "xsd:date"\n/**\n * Date/time values.\n */\n | "xsd:dateTime"\n/**\n * Double values.\n */\n | "xsd:double"\n/**\n * Integer values.\n */\n | "xsd:int"\n/**\n * Character strings.\n */\n | "xsd:string";\n')))}u.isMDXComponent=!0}}]);