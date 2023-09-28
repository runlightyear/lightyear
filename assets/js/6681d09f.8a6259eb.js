"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[98080],{57522:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>h});var n=t(29901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),l=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},u=function(e){var r=l(e.components);return n.createElement(c.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),f=l(t),h=a,d=f["".concat(c,".").concat(h)]||f[h]||s[h]||o;return t?n.createElement(d,i(i({ref:r},u),{},{components:t})):n.createElement(d,i({ref:r},u))}));function h(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=f;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var l=2;l<o;l++)i[l]=t[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},75713:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var n=t(14090),a=(t(29901),t(57522));const o={},i=void 0,p={unversionedId:"api/linear.linearoauthprops.actor",id:"api/linear.linearoauthprops.actor",title:"linear.linearoauthprops.actor",description:"Home &gt; @runlightyear/linear &gt; LinearOAuthProps &gt; actor",source:"@site/docs/api/linear.linearoauthprops.actor.md",sourceDirName:"api",slug:"/api/linear.linearoauthprops.actor",permalink:"/docs/api/linear.linearoauthprops.actor",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"LinearOAuthProps.actor property",id:"linearoauthpropsactor-property",level:2}],u={toc:l};function s(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.linearoauthprops"},"LinearOAuthProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.linearoauthprops.actor"},"actor")),(0,a.kt)("h2",{id:"linearoauthpropsactor-property"},"LinearOAuthProps.actor property"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,a.kt)("p",null,"Define how the OAuth application should create issues, comments and other changes:"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'actor?: "user"\n    /**\n     * Resources are created as the application. This option should be used if you have have only one user (e.g. admin) authorizing the application. Can be used together with createAsUser property when creating issues and comments.\n     */\n     | "application";\n')))}s.isMDXComponent=!0}}]);