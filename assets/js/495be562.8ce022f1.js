"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[13829],{62757:(e,t,r)=>{r.d(t,{xA:()=>f,yg:()=>y});var n=r(67308);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},f=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,f=l(e,["components","mdxType","originalType","parentName"]),d=s(r),u=a,y=d["".concat(c,".").concat(u)]||d[u]||p[u]||o;return r?n.createElement(y,i(i({ref:t},f),{},{components:r})):n.createElement(y,i({ref:t},f))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},49599:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var n=r(94790),a=(r(67308),r(62757));const o={},i=void 0,l={unversionedId:"api/salesforce.field.defaultedoncreate",id:"api/salesforce.field.defaultedoncreate",title:"salesforce.field.defaultedoncreate",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; defaultedOnCreate",source:"@site/docs/api/salesforce.field.defaultedoncreate.md",sourceDirName:"api",slug:"/api/salesforce.field.defaultedoncreate",permalink:"/docs/api/salesforce.field.defaultedoncreate",draft:!1,tags:[],version:"current",frontMatter:{}},c={},s=[{value:"Field.defaultedOnCreate property",id:"fielddefaultedoncreate-property",level:2}],f={toc:s},d="wrapper";function p(e){let{components:t,...r}=e;return(0,a.yg)(d,(0,n.A)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field.defaultedoncreate"},"defaultedOnCreate")),(0,a.yg)("h2",{id:"fielddefaultedoncreate-property"},"Field.defaultedOnCreate property"),(0,a.yg)("p",null,"Indicates whether this field is defaulted when created (true) or not (false). If true, then Salesforce implicitly assigns a value for this field when the object is created, even if a value for this field is not passed in on the create() call. For example, in the Opportunity object, the Probability field has this attribute because its value is derived from the Stage field. Similarly, the Owner has this attribute on most objects because its value is derived from the current user (if the Owner field is not specified)."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"defaultedOnCreate: boolean;\n")))}p.isMDXComponent=!0}}]);