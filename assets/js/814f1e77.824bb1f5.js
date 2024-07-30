"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[51908],{62757:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>y});var n=r(67308);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(r),f=i,y=d["".concat(c,".").concat(f)]||d[f]||u[f]||a;return r?n.createElement(y,o(o({ref:t},p),{},{components:r})):n.createElement(y,o({ref:t},p))}));function y(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},84542:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var n=r(94790),i=(r(67308),r(62757));const a={},o=void 0,l={unversionedId:"api/salesforce.childrelationship.restricteddelete",id:"api/salesforce.childrelationship.restricteddelete",title:"salesforce.childrelationship.restricteddelete",description:"Home &gt; @runlightyear/salesforce &gt; ChildRelationship &gt; restrictedDelete",source:"@site/docs/api/salesforce.childrelationship.restricteddelete.md",sourceDirName:"api",slug:"/api/salesforce.childrelationship.restricteddelete",permalink:"/docs/api/salesforce.childrelationship.restricteddelete",draft:!1,tags:[],version:"current",frontMatter:{}},c={},s=[{value:"ChildRelationship.restrictedDelete property",id:"childrelationshiprestricteddelete-property",level:2}],p={toc:s},d="wrapper";function u(e){let{components:t,...r}=e;return(0,i.yg)(d,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/salesforce.childrelationship"},"ChildRelationship")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/salesforce.childrelationship.restricteddelete"},"restrictedDelete")),(0,i.yg)("h2",{id:"childrelationshiprestricteddelete-property"},"ChildRelationship.restrictedDelete property"),(0,i.yg)("p",null,"Indicates whether the parent object can\u2019t be deleted because it is referenced by a child object (true) or not (false)."),(0,i.yg)("b",null,"Signature:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-typescript"},"restrictedDelete: boolean;\n")))}u.isMDXComponent=!0}}]);