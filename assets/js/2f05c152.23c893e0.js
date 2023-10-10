"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[23145],{57522:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>m});var n=t(29901);function s(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){s(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,s=function(e,r){if(null==e)return{};var t,n,s={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(s[t]=e[t]);return s}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var c=n.createContext({}),i=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},l=function(e){var r=i(e.components);return n.createElement(c.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,s=e.mdxType,o=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),f=i(t),m=s,y=f["".concat(c,".").concat(m)]||f[m]||u[m]||o;return t?n.createElement(y,a(a({ref:r},l),{},{components:t})):n.createElement(y,a({ref:r},l))}));function m(e,r){var t=arguments,s=r&&r.mdxType;if("string"==typeof e||s){var o=t.length,a=new Array(o);a[0]=f;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p.mdxType="string"==typeof e?e:s,a[1]=p;for(var i=2;i<o;i++)a[i]=t[i];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},69238:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>i});var n=t(14090),s=(t(29901),t(57522));const o={},a=void 0,p={unversionedId:"api/slack.listusersprops.cursor",id:"api/slack.listusersprops.cursor",title:"slack.listusersprops.cursor",description:"Home &gt; @runlightyear/slack &gt; ListUsersProps &gt; cursor",source:"@site/docs/api/slack.listusersprops.cursor.md",sourceDirName:"api",slug:"/api/slack.listusersprops.cursor",permalink:"/docs/api/slack.listusersprops.cursor",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"ListUsersProps.cursor property",id:"listuserspropscursor-property",level:2}],l={toc:i};function u(e){let{components:r,...t}=e;return(0,s.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,s.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,s.kt)("a",{parentName:"p",href:"/docs/api/slack.listusersprops"},"ListUsersProps")," ",">"," ",(0,s.kt)("a",{parentName:"p",href:"/docs/api/slack.listusersprops.cursor"},"cursor")),(0,s.kt)("h2",{id:"listuserspropscursor-property"},"ListUsersProps.cursor property"),(0,s.kt)("p",null,"Paginate through collections of data by setting the cursor parameter to a next","_","cursor attribute returned by a previous request's response","_",'metadata. Default value fetches the first "page" of the collection. See pagination for more detail.'),(0,s.kt)("b",null,"Signature:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"cursor?: string;\n")))}u.isMDXComponent=!0}}]);