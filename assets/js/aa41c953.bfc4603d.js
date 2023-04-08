"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8772],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>y});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(r),y=o,b=u["".concat(i,".").concat(y)]||u[y]||f[y]||a;return r?n.createElement(b,c(c({ref:t},l),{},{components:r})):n.createElement(b,c({ref:t},l))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,c[1]=s;for(var p=2;p<a;p++)c[p]=r[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},93366:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(14090),o=(r(29901),r(57522));const a={},c=void 0,s={unversionedId:"api/salesforce.describesobjectresult.keyprefix",id:"api/salesforce.describesobjectresult.keyprefix",title:"salesforce.describesobjectresult.keyprefix",description:"Home &gt; @runlightyear/salesforce &gt; DescribeSObjectResult &gt; keyPrefix",source:"@site/docs/api/salesforce.describesobjectresult.keyprefix.md",sourceDirName:"api",slug:"/api/salesforce.describesobjectresult.keyprefix",permalink:"/docs/api/salesforce.describesobjectresult.keyprefix",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"DescribeSObjectResult.keyPrefix property",id:"describesobjectresultkeyprefix-property",level:2}],l={toc:p};function f(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult"},"DescribeSObjectResult")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult.keyprefix"},"keyPrefix")),(0,o.kt)("h2",{id:"describesobjectresultkeyprefix-property"},"DescribeSObjectResult.keyPrefix property"),(0,o.kt)("p",null,"Three-character prefix code in the object ID. Object IDs are prefixed with three-character codes that specify the type of the object. For example, Account objects have a prefix of 001 and Opportunity objects have a prefix of 006. Note that a key prefix can sometimes be shared by multiple objects so it does not always uniquely identify an object."),(0,o.kt)("p",null,"Use the value of this field to determine the object type of a parent in those cases where the child may have more than one object type as parent (polymorphic). For example, you may need to obtain the keyPrefix value for the parent of a Task or Event."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"keyPrefix: string;\n")))}f.isMDXComponent=!0}}]);