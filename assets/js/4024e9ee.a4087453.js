"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9693],{62757:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>y});var r=n(67308);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",v={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),m=i,y=u["".concat(l,".").concat(m)]||u[m]||v[m]||o;return n?r.createElement(y,a(a({ref:t},p),{},{components:n})):r.createElement(y,a({ref:t},p))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},81569:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>v,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(94790),i=(n(67308),n(62757));const o={},a=void 0,s={unversionedId:"api/slack.conversationslistelement.initialconversations",id:"api/slack.conversationslistelement.initialconversations",title:"slack.conversationslistelement.initialconversations",description:"Home &gt; @runlightyear/slack &gt; ConversationsListElement &gt; initialConversations",source:"@site/docs/api/slack.conversationslistelement.initialconversations.md",sourceDirName:"api",slug:"/api/slack.conversationslistelement.initialconversations",permalink:"/docs/api/slack.conversationslistelement.initialconversations",draft:!1,tags:[],version:"current",frontMatter:{}},l={},c=[{value:"ConversationsListElement.initialConversations property",id:"conversationslistelementinitialconversations-property",level:2}],p={toc:c},u="wrapper";function v(e){let{components:t,...n}=e;return(0,i.yg)(u,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/slack.conversationslistelement"},"ConversationsListElement")," ",">"," ",(0,i.yg)("a",{parentName:"p",href:"/docs/api/slack.conversationslistelement.initialconversations"},"initialConversations")),(0,i.yg)("h2",{id:"conversationslistelementinitialconversations-property"},"ConversationsListElement.initialConversations property"),(0,i.yg)("p",null,"An array of one or more IDs of any valid conversations to be pre-selected when the menu loads. If default","_","to","_","current","_","conversation is also supplied, initial","_","conversations will be ignored."),(0,i.yg)("b",null,"Signature:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-typescript"},"initialConversations?: Array<string>;\n")))}v.isMDXComponent=!0}}]);