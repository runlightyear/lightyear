"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[79556],{62757:(e,r,t)=>{t.d(r,{xA:()=>i,yg:()=>h});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},p=Object.keys(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),c=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},i=function(e){var r=c(e.components);return n.createElement(l.Provider,{value:r},e.children)},s="mdxType",y={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,p=e.originalType,l=e.parentName,i=u(e,["components","mdxType","originalType","parentName"]),s=c(t),d=a,h=s["".concat(l,".").concat(d)]||s[d]||y[d]||p;return t?n.createElement(h,o(o({ref:r},i),{},{components:t})):n.createElement(h,o({ref:r},i))}));function h(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var p=t.length,o=new Array(p);o[0]=d;var u={};for(var l in r)hasOwnProperty.call(r,l)&&(u[l]=r[l]);u.originalType=e,u[s]="string"==typeof e?e:a,o[1]=u;for(var c=2;c<p;c++)o[c]=t[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},50062:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>y,frontMatter:()=>p,metadata:()=>u,toc:()=>c});var n=t(94790),a=(t(67308),t(62757));const p={},o=void 0,u={unversionedId:"api/github.createpullrequestprops.head",id:"api/github.createpullrequestprops.head",title:"github.createpullrequestprops.head",description:"Home &gt; @runlightyear/github &gt; CreatePullRequestProps &gt; head",source:"@site/docs/api/github.createpullrequestprops.head.md",sourceDirName:"api",slug:"/api/github.createpullrequestprops.head",permalink:"/docs/api/github.createpullrequestprops.head",draft:!1,tags:[],version:"current",frontMatter:{}},l={},c=[{value:"CreatePullRequestProps.head property",id:"createpullrequestpropshead-property",level:2}],i={toc:c},s="wrapper";function y(e){let{components:r,...t}=e;return(0,a.yg)(s,(0,n.A)({},i,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.createpullrequestprops"},"CreatePullRequestProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.createpullrequestprops.head"},"head")),(0,a.yg)("h2",{id:"createpullrequestpropshead-property"},"CreatePullRequestProps.head property"),(0,a.yg)("p",null,"The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace head with a user like this: username:branch."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"head: string;\n")))}y.isMDXComponent=!0}}]);