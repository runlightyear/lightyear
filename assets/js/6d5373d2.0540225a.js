"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9311],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=l(r),f=a,d=m["".concat(i,".").concat(f)]||m[f]||u[f]||o;return r?n.createElement(d,s(s({ref:t},c),{},{components:r})):n.createElement(d,s({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,s[1]=p;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},15835:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var n=r(14090),a=(r(29901),r(57522));const o={},s=void 0,p={unversionedId:"api/slack.postmessageoptions.parse",id:"api/slack.postmessageoptions.parse",title:"slack.postmessageoptions.parse",description:"Home &gt; @runlightyear/slack &gt; PostMessageOptions &gt; parse",source:"@site/docs/api/slack.postmessageoptions.parse.md",sourceDirName:"api",slug:"/api/slack.postmessageoptions.parse",permalink:"/lightyear/docs/api/slack.postmessageoptions.parse",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/slack.postmessageoptions.parse.md",tags:[],version:"current",frontMatter:{}},i={},l=[{value:"PostMessageOptions.parse property",id:"postmessageoptionsparse-property",level:2}],c={toc:l};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/slack.postmessageoptions"},"PostMessageOptions")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/slack.postmessageoptions.parse"},"parse")),(0,a.kt)("h2",{id:"postmessageoptionsparse-property"},"PostMessageOptions.parse property"),(0,a.kt)("p",null,"Change how messages are treated."),(0,a.kt)("p",null,"Messages are formatted as described in the formatting spec. The formatting behavior will change depending on the value of parse."),(0,a.kt)("p",null,"By default, URLs will be hyperlinked. Set parse to none to remove the hyperlinks."),(0,a.kt)("p",null,"The behavior of parse is different for text formatted with mrkdwn. By default, or when parse is set to none, mrkdwn formatting is implemented. To ignore mrkdwn formatting, set parse to full."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'parse?: "full" | "none";\n')))}u.isMDXComponent=!0}}]);