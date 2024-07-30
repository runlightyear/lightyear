"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[86206],{62757:(e,r,t)=>{t.d(r,{xA:()=>p,yg:()=>y});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=n.createContext({}),s=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},p=function(e){var r=s(e.components);return n.createElement(i.Provider,{value:r},e.children)},f="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(t),d=a,y=f["".concat(i,".").concat(d)]||f[d]||u[d]||o;return t?n.createElement(y,l(l({ref:r},p),{},{components:t})):n.createElement(y,l({ref:r},p))}));function y(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=d;var c={};for(var i in r)hasOwnProperty.call(r,i)&&(c[i]=r[i]);c.originalType=e,c[f]="string"==typeof e?e:a,l[1]=c;for(var s=2;s<o;s++)l[s]=t[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},54720:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=t(94790),a=(t(67308),t(62757));const o={},l=void 0,c={unversionedId:"api/salesforce.field.scale",id:"api/salesforce.field.scale",title:"salesforce.field.scale",description:"Home &gt; @runlightyear/salesforce &gt; Field &gt; scale",source:"@site/docs/api/salesforce.field.scale.md",sourceDirName:"api",slug:"/api/salesforce.field.scale",permalink:"/docs/api/salesforce.field.scale",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"Field.scale property",id:"fieldscale-property",level:2}],p={toc:s},f="wrapper";function u(e){let{components:r,...t}=e;return(0,a.yg)(f,(0,n.A)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field"},"Field")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce.field.scale"},"scale")),(0,a.yg)("h2",{id:"fieldscale-property"},"Field.scale property"),(0,a.yg)("p",null,"For fields of type double. Number of digits to the right of the decimal point. The API silently truncates any extra digits to the right of the decimal point, but it returns a fault response if the number has too many digits to the left of the decimal point."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"scale: number;\n")))}u.isMDXComponent=!0}}]);