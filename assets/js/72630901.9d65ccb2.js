"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[77765],{62757:(e,t,r)=>{r.d(t,{xA:()=>m,yg:()=>y});var n=r(67308);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var o=n.createContext({}),p=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},m=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),s=p(r),u=i,y=s["".concat(o,".").concat(u)]||s[u]||d[u]||a;return r?n.createElement(y,l(l({ref:t},m),{},{components:r})):n.createElement(y,l({ref:t},m))}));function y(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=u;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c[s]="string"==typeof e?e:i,l[1]=c;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4097:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var n=r(94790),i=(r(67308),r(62757));const a={},l=void 0,c={unversionedId:"api/slack.datetimepickerelement.initialdatetime",id:"api/slack.datetimepickerelement.initialdatetime",title:"slack.datetimepickerelement.initialdatetime",description:"Home &gt; @runlightyear/slack &gt; DatetimePickerElement &gt; initialDateTime",source:"@site/docs/api/slack.datetimepickerelement.initialdatetime.md",sourceDirName:"api",slug:"/api/slack.datetimepickerelement.initialdatetime",permalink:"/docs/api/slack.datetimepickerelement.initialdatetime",draft:!1,tags:[],version:"current",frontMatter:{}},o={},p=[{value:"DatetimePickerElement.initialDateTime property",id:"datetimepickerelementinitialdatetime-property",level:2}],m={toc:p},s="wrapper";function d(e){let{components:t,...r}=e;return(0,i.yg)(s,(0,n.A)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/slack.datetimepickerelement"},"DatetimePickerElement")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/slack.datetimepickerelement.initialdatetime"},"initialDateTime")),(0,i.yg)("h2",{id:"datetimepickerelementinitialdatetime-property"},"DatetimePickerElement.initialDateTime property"),(0,i.yg)("p",null,"The initial date and time that is selected when the element is loaded, represented as a UNIX timestamp in seconds. This should be in the format of 10 digits, for example 1628633820 represents the date and time August 10th, 2021 at 03:17pm PST."),(0,i.yg)("b",null,"Signature:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-typescript"},"initialDateTime?: number;\n")))}d.isMDXComponent=!0}}]);