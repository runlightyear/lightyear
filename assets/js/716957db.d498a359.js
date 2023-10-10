"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[54068],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(29901);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,s=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),m=p(r),f=i,y=m["".concat(l,".").concat(f)]||m[f]||u[f]||s;return r?n.createElement(y,o(o({ref:t},c),{},{components:r})):n.createElement(y,o({ref:t},c))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=r.length,o=new Array(s);o[0]=m;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,o[1]=a;for(var p=2;p<s;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},63295:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>p});var n=r(14090),i=(r(29901),r(57522));const s={},o=void 0,a={unversionedId:"api/slack.listusersprops.limit",id:"api/slack.listusersprops.limit",title:"slack.listusersprops.limit",description:"Home &gt; @runlightyear/slack &gt; ListUsersProps &gt; limit",source:"@site/docs/api/slack.listusersprops.limit.md",sourceDirName:"api",slug:"/api/slack.listusersprops.limit",permalink:"/docs/api/slack.listusersprops.limit",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"ListUsersProps.limit property",id:"listuserspropslimit-property",level:2}],c={toc:p};function u(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/slack.listusersprops"},"ListUsersProps")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/slack.listusersprops.limit"},"limit")),(0,i.kt)("h2",{id:"listuserspropslimit-property"},"ListUsersProps.limit property"),(0,i.kt)("p",null,"The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no limit value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience limit","_","required or HTTP 500 errors."),(0,i.kt)("b",null,"Signature:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"limit?: number;\n")))}u.isMDXComponent=!0}}]);