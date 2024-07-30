"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[82993],{62757:(e,r,t)=>{t.d(r,{xA:()=>u,yg:()=>g});var o=t(67308);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},p=Object.keys(e);for(o=0;o<p.length;o++)t=p[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(o=0;o<p.length;o++)t=p[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=o.createContext({}),c=function(e){var r=o.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},u=function(e){var r=c(e.components);return o.createElement(s.Provider,{value:r},e.children)},l="mdxType",y={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},b=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,p=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),l=c(t),b=n,g=l["".concat(s,".").concat(b)]||l[b]||y[b]||p;return t?o.createElement(g,a(a({ref:r},u),{},{components:t})):o.createElement(g,a({ref:r},u))}));function g(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var p=t.length,a=new Array(p);a[0]=b;var i={};for(var s in r)hasOwnProperty.call(r,s)&&(i[s]=r[s]);i.originalType=e,i[l]="string"==typeof e?e:n,a[1]=i;for(var c=2;c<p;c++)a[c]=t[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}b.displayName="MDXCreateElement"},29912:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>a,default:()=>y,frontMatter:()=>p,metadata:()=>i,toc:()=>c});var o=t(94790),n=(t(67308),t(62757));const p={},a=void 0,i={unversionedId:"api/github.createrepositorywebhookprops.events",id:"api/github.createrepositorywebhookprops.events",title:"github.createrepositorywebhookprops.events",description:"Home &gt; @runlightyear/github &gt; CreateRepositoryWebhookProps &gt; events",source:"@site/docs/api/github.createrepositorywebhookprops.events.md",sourceDirName:"api",slug:"/api/github.createrepositorywebhookprops.events",permalink:"/docs/api/github.createrepositorywebhookprops.events",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"CreateRepositoryWebhookProps.events property",id:"createrepositorywebhookpropsevents-property",level:2}],u={toc:c},l="wrapper";function y(e){let{components:r,...t}=e;return(0,n.yg)(l,(0,o.A)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.createrepositorywebhookprops"},"CreateRepositoryWebhookProps")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.createrepositorywebhookprops.events"},"events")),(0,n.yg)("h2",{id:"createrepositorywebhookpropsevents-property"},"CreateRepositoryWebhookProps.events property"),(0,n.yg)("p",null,"Determines what events the hook is triggered for. Default: push"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"events?: Array<WebhookEvent>;\n")))}y.isMDXComponent=!0}}]);