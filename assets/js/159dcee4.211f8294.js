"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[50963],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(29901);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(r),d=i,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||a;return r?n.createElement(f,c(c({ref:t},s),{},{components:r})):n.createElement(f,c({ref:t},s))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,c=new Array(a);c[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,c[1]=o;for(var p=2;p<a;p++)c[p]=r[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},84689:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var n=r(14090),i=(r(29901),r(57522));const a={},c=void 0,o={unversionedId:"api/slack.timepickerelement.actionid",id:"api/slack.timepickerelement.actionid",title:"slack.timepickerelement.actionid",description:"Home &gt; @runlightyear/slack &gt; TimePickerElement &gt; actionId",source:"@site/docs/api/slack.timepickerelement.actionid.md",sourceDirName:"api",slug:"/api/slack.timepickerelement.actionid",permalink:"/docs/api/slack.timepickerelement.actionid",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"TimePickerElement.actionId property",id:"timepickerelementactionid-property",level:2}],s={toc:p};function m(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/slack.timepickerelement"},"TimePickerElement")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/slack.timepickerelement.actionid"},"actionId")),(0,i.kt)("h2",{id:"timepickerelementactionid-property"},"TimePickerElement.actionId property"),(0,i.kt)("p",null,"An identifier for the action triggered when a time is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action","_","ids in the containing block. Maximum length is 255 characters."),(0,i.kt)("b",null,"Signature:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"actionId?: string;\n")))}m.isMDXComponent=!0}}]);