"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[57063],{57522:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>m});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=n.createContext({}),s=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},c=function(e){var r=s(e.components);return n.createElement(p.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),f=s(t),m=a,y=f["".concat(p,".").concat(m)]||f[m]||u[m]||i;return t?n.createElement(y,o(o({ref:r},c),{},{components:t})):n.createElement(y,o({ref:r},c))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=f;var l={};for(var p in r)hasOwnProperty.call(r,p)&&(l[p]=r[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=t[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},54307:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var n=t(14090),a=(t(29901),t(57522));const i={},o=void 0,l={unversionedId:"api/linear.userfilter.isme",id:"api/linear.userfilter.isme",title:"linear.userfilter.isme",description:"Home &gt; @runlightyear/linear &gt; UserFilter &gt; isMe",source:"@site/docs/api/linear.userfilter.isme.md",sourceDirName:"api",slug:"/api/linear.userfilter.isme",permalink:"/docs/api/linear.userfilter.isme",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[{value:"UserFilter.isMe property",id:"userfilterisme-property",level:2}],c={toc:s};function u(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.userfilter"},"UserFilter")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.userfilter.isme"},"isMe")),(0,a.kt)("h2",{id:"userfilterisme-property"},"UserFilter.isMe property"),(0,a.kt)("p",null,"Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"isMe?: BooleanComparator;\n")))}u.isMDXComponent=!0}}]);