"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[28343],{62757:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>y});var r=n(67308);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),p=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,o=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,y=u["".concat(o,".").concat(m)]||u[m]||d[m]||c;return n?r.createElement(y,l(l({ref:t},s),{},{components:n})):r.createElement(y,l({ref:t},s))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,l=new Array(c);l[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[u]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<c;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},72847:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>d,frontMatter:()=>c,metadata:()=>i,toc:()=>p});var r=n(94790),a=(n(67308),n(62757));const c={},l=void 0,i={unversionedId:"api/slack.publicchannelsselectelement.actionid",id:"api/slack.publicchannelsselectelement.actionid",title:"slack.publicchannelsselectelement.actionid",description:"Home &gt; @runlightyear/slack &gt; PublicChannelsSelectElement &gt; actionId",source:"@site/docs/api/slack.publicchannelsselectelement.actionid.md",sourceDirName:"api",slug:"/api/slack.publicchannelsselectelement.actionid",permalink:"/docs/api/slack.publicchannelsselectelement.actionid",draft:!1,tags:[],version:"current",frontMatter:{}},o={},p=[{value:"PublicChannelsSelectElement.actionId property",id:"publicchannelsselectelementactionid-property",level:2}],s={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack.publicchannelsselectelement"},"PublicChannelsSelectElement")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack.publicchannelsselectelement.actionid"},"actionId")),(0,a.yg)("h2",{id:"publicchannelsselectelementactionid-property"},"PublicChannelsSelectElement.actionId property"),(0,a.yg)("p",null,"An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action","_","ids in the containing block. Maximum length is 255 characters."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"actionId?: string;\n")))}d.isMDXComponent=!0}}]);