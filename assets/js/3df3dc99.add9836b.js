"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[51802],{62757:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>d});var n=r(67308);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},s="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(r),f=o,d=s["".concat(i,".").concat(f)]||s[f]||y[f]||a;return r?n.createElement(d,c(c({ref:t},u),{},{components:r})):n.createElement(d,c({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=f;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[s]="string"==typeof e?e:o,c[1]=l;for(var p=2;p<a;p++)c[p]=r[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},30533:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>y,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var n=r(94790),o=(r(67308),r(62757));const a={},c=void 0,l={unversionedId:"api/slack.optionobject.url",id:"api/slack.optionobject.url",title:"slack.optionobject.url",description:"Home &gt; @runlightyear/slack &gt; OptionObject &gt; url",source:"@site/docs/api/slack.optionobject.url.md",sourceDirName:"api",slug:"/api/slack.optionobject.url",permalink:"/docs/api/slack.optionobject.url",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"OptionObject.url property",id:"optionobjecturl-property",level:2}],u={toc:p},s="wrapper";function y(e){let{components:t,...r}=e;return(0,o.yg)(s,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack.optionobject"},"OptionObject")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack.optionobject.url"},"url")),(0,o.yg)("h2",{id:"optionobjecturl-property"},"OptionObject.url property"),(0,o.yg)("p",null,"A URL to load in the user's browser when the option is clicked. The url attribute is only available in overflow menus. Maximum length for this field is 3000 characters. If you're using url, you'll still receive an interaction payload and will need to send an acknowledgement response."),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"url?: string;\n")))}y.isMDXComponent=!0}}]);