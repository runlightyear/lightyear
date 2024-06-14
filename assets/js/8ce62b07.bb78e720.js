"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[55641],{57522:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var r=t(29901);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),s=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(t),m=a,d=f["".concat(l,".").concat(m)]||f[m]||u[m]||o;return t?r.createElement(d,i(i({ref:n},p),{},{components:t})):r.createElement(d,i({ref:n},p))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=f;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},51466:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var r=t(14090),a=(t(29901),t(57522));const o={},i=void 0,c={unversionedId:"api/linear.linearscope",id:"api/linear.linearscope",title:"linear.linearscope",description:"Home &gt; @runlightyear/linear &gt; LinearScope",source:"@site/docs/api/linear.linearscope.md",sourceDirName:"api",slug:"/api/linear.linearscope",permalink:"/docs/api/linear.linearscope",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"LinearScope type",id:"linearscope-type",level:2}],p={toc:s};function u(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.linearscope"},"LinearScope")),(0,a.kt)("h2",{id:"linearscope-type"},"LinearScope type"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'declare type LinearScope = \n/**\n *  (Default) Read access for the user\'s account. This scope will always be present.\n */\n"read"\n/**\n * Write access for the user\'s account. If your application only needs to create comments, use a more targeted scope\n */\n | "write"\n/**\n * Allows creating new issues and their attachments\n */\n | "issues:create"\n/**\n * Allows creating new issue comments\n */\n | "comments:create"\n/**\n * Full access to admin level endpoints. You should never ask for this permission unless it\'s absolutely needed\n */\n | "admin";\n')))}u.isMDXComponent=!0}}]);