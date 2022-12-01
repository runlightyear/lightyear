"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8866],{7522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>y});var a=r(9901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),u=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(r),y=n,f=d["".concat(p,".").concat(y)]||d[y]||s[y]||o;return r?a.createElement(f,i(i({ref:t},c),{},{components:r})):a.createElement(f,i({ref:t},c))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6267:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=r(4090),n=(r(9901),r(7522));const o={},i=void 0,l={unversionedId:"api/github.pullrequestreviewpayload.action",id:"api/github.pullrequestreviewpayload.action",title:"github.pullrequestreviewpayload.action",description:"Home &gt; @runlightyear/github &gt; PullRequestReviewPayload &gt; action",source:"@site/docs/api/github.pullrequestreviewpayload.action.md",sourceDirName:"api",slug:"/api/github.pullrequestreviewpayload.action",permalink:"/lightyear/docs/api/github.pullrequestreviewpayload.action",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.pullrequestreviewpayload.action.md",tags:[],version:"current",frontMatter:{}},p={},u=[{value:"PullRequestReviewPayload.action property",id:"pullrequestreviewpayloadaction-property",level:2}],c={toc:u};function s(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github.pullrequestreviewpayload"},"PullRequestReviewPayload")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/lightyear/docs/api/github.pullrequestreviewpayload.action"},"action")),(0,n.kt)("h2",{id:"pullrequestreviewpayloadaction-property"},"PullRequestReviewPayload.action property"),(0,n.kt)("p",null,"The action that was performed."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'action: "submitted"\n    /**\n     * The body of a review has been edited.\n     */\n     | "edited"\n    /**\n     * A review has been dismissed.\n     */\n     | "dismissed";\n')))}s.isMDXComponent=!0}}]);