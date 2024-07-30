"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[19898],{62757:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>f});var n=r(67308);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},p=Object.keys(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,p=e.originalType,i=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),s=u(r),y=o,f=s["".concat(i,".").concat(y)]||s[y]||m[y]||p;return r?n.createElement(f,l(l({ref:t},c),{},{components:r})):n.createElement(f,l({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var p=r.length,l=new Array(p);l[0]=y;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a[s]="string"==typeof e?e:o,l[1]=a;for(var u=2;u<p;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},57649:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>p,metadata:()=>a,toc:()=>u});var n=r(94790),o=(r(67308),r(62757));const p={},l=void 0,a={unversionedId:"api/slack.multiselectmenuelement.optiongroups",id:"api/slack.multiselectmenuelement.optiongroups",title:"slack.multiselectmenuelement.optiongroups",description:"Home &gt; @runlightyear/slack &gt; MultiSelectMenuElement &gt; optionGroups",source:"@site/docs/api/slack.multiselectmenuelement.optiongroups.md",sourceDirName:"api",slug:"/api/slack.multiselectmenuelement.optiongroups",permalink:"/docs/api/slack.multiselectmenuelement.optiongroups",draft:!1,tags:[],version:"current",frontMatter:{}},i={},u=[{value:"MultiSelectMenuElement.optionGroups property",id:"multiselectmenuelementoptiongroups-property",level:2}],c={toc:u},s="wrapper";function m(e){let{components:t,...r}=e;return(0,o.yg)(s,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack.multiselectmenuelement"},"MultiSelectMenuElement")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/slack.multiselectmenuelement.optiongroups"},"optionGroups")),(0,o.yg)("h2",{id:"multiselectmenuelementoptiongroups-property"},"MultiSelectMenuElement.optionGroups property"),(0,o.yg)("p",null,"An array of option group objects. Maximum number of option groups is 100. If options is specified, this field should not be."),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"optionGroups?: Array<OptionGroupObject>;\n")))}m.isMDXComponent=!0}}]);