"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[47172],{62757:(e,r,t)=>{t.d(r,{xA:()=>l,yg:()=>b});var n=t(67308);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),p=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},l=function(e){var r=p(e.components);return n.createElement(i.Provider,{value:r},e.children)},f="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),f=p(t),y=o,b=f["".concat(i,".").concat(y)]||f[y]||u[y]||a;return t?n.createElement(b,c(c({ref:r},l),{},{components:t})):n.createElement(b,c({ref:r},l))}));function b(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,c=new Array(a);c[0]=y;var s={};for(var i in r)hasOwnProperty.call(r,i)&&(s[i]=r[i]);s.originalType=e,s[f]="string"==typeof e?e:o,c[1]=s;for(var p=2;p<a;p++)c[p]=t[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},66949:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=t(94790),o=(t(67308),t(62757));const a={},c=void 0,s={unversionedId:"api/salesforce.describesobjectresult.keyprefix",id:"api/salesforce.describesobjectresult.keyprefix",title:"salesforce.describesobjectresult.keyprefix",description:"Home &gt; @runlightyear/salesforce &gt; DescribeSObjectResult &gt; keyPrefix",source:"@site/docs/api/salesforce.describesobjectresult.keyprefix.md",sourceDirName:"api",slug:"/api/salesforce.describesobjectresult.keyprefix",permalink:"/docs/api/salesforce.describesobjectresult.keyprefix",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"DescribeSObjectResult.keyPrefix property",id:"describesobjectresultkeyprefix-property",level:2}],l={toc:p},f="wrapper";function u(e){let{components:r,...t}=e;return(0,o.yg)(f,(0,n.A)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult"},"DescribeSObjectResult")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/salesforce.describesobjectresult.keyprefix"},"keyPrefix")),(0,o.yg)("h2",{id:"describesobjectresultkeyprefix-property"},"DescribeSObjectResult.keyPrefix property"),(0,o.yg)("p",null,"Three-character prefix code in the object ID. Object IDs are prefixed with three-character codes that specify the type of the object. For example, Account objects have a prefix of 001 and Opportunity objects have a prefix of 006. Note that a key prefix can sometimes be shared by multiple objects so it does not always uniquely identify an object."),(0,o.yg)("p",null,"Use the value of this field to determine the object type of a parent in those cases where the child may have more than one object type as parent (polymorphic). For example, you may need to obtain the keyPrefix value for the parent of a Task or Event."),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"keyPrefix: string;\n")))}u.isMDXComponent=!0}}]);