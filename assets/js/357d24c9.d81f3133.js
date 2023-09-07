"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[76618],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>y});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},p=Object.keys(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),s=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,p=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(r),y=n,f=d["".concat(i,".").concat(y)]||d[y]||u[y]||p;return r?a.createElement(f,o(o({ref:t},l),{},{components:r})):a.createElement(f,o({ref:t},l))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=r.length,o=new Array(p);o[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var s=2;s<p;s++)o[s]=r[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},94391:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>u,frontMatter:()=>p,metadata:()=>c,toc:()=>s});var a=r(14090),n=(r(29901),r(57522));const p={},o=void 0,c={unversionedId:"api/airtable.updaterecordprops.typecast",id:"api/airtable.updaterecordprops.typecast",title:"airtable.updaterecordprops.typecast",description:"Home &gt; @runlightyear/airtable &gt; UpdateRecordProps &gt; typecast",source:"@site/docs/api/airtable.updaterecordprops.typecast.md",sourceDirName:"api",slug:"/api/airtable.updaterecordprops.typecast",permalink:"/docs/api/airtable.updaterecordprops.typecast",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"UpdateRecordProps.typecast property",id:"updaterecordpropstypecast-property",level:2}],l={toc:s};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable"},"@runlightyear/airtable")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.updaterecordprops"},"UpdateRecordProps")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/airtable.updaterecordprops.typecast"},"typecast")),(0,n.kt)("h2",{id:"updaterecordpropstypecast-property"},"UpdateRecordProps.typecast property"),(0,n.kt)("p",null,"The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"typecast?: boolean;\n")))}u.isMDXComponent=!0}}]);