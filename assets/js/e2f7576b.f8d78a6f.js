"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[34675],{62757:(e,r,t)=>{t.d(r,{xA:()=>l,yg:()=>d});var n=t(67308);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=n.createContext({}),c=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},l=function(e){var r=c(e.components);return n.createElement(s.Provider,{value:r},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),y=c(t),f=o,d=y["".concat(s,".").concat(f)]||y[f]||u[f]||a;return t?n.createElement(d,p(p({ref:r},l),{},{components:t})):n.createElement(d,p({ref:r},l))}));function d(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=f;var i={};for(var s in r)hasOwnProperty.call(r,s)&&(i[s]=r[s]);i.originalType=e,i[y]="string"==typeof e?e:o,p[1]=i;for(var c=2;c<a;c++)p[c]=t[c];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},15881:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>p,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=t(94790),o=(t(67308),t(62757));const a={},p=void 0,i={unversionedId:"api/lightyear.definewebhookprops.secrets",id:"api/lightyear.definewebhookprops.secrets",title:"lightyear.definewebhookprops.secrets",description:"Home &gt; @runlightyear/lightyear &gt; DefineWebhookProps &gt; secrets",source:"@site/docs/api/lightyear.definewebhookprops.secrets.md",sourceDirName:"api",slug:"/api/lightyear.definewebhookprops.secrets",permalink:"/docs/api/lightyear.definewebhookprops.secrets",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"DefineWebhookProps.secrets property",id:"definewebhookpropssecrets-property",level:2}],l={toc:c},y="wrapper";function u(e){let{components:r,...t}=e;return(0,o.yg)(y,(0,n.A)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/lightyear.definewebhookprops"},"DefineWebhookProps")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/lightyear.definewebhookprops.secrets"},"secrets")),(0,o.yg)("h2",{id:"definewebhookpropssecrets-property"},"DefineWebhookProps.secrets property"),(0,o.yg)("p",null,"An array of the secrets on this webhook."),(0,o.yg)("p",null,"Secrets are like variables, but they are stored more securely in the database and they are redacted in the console logs."),(0,o.yg)("p",null,'Secrets are required to have a value by default. If you append a "?" to the end of the name, the secret will be optional. For example:'),(0,o.yg)("p",null,"[",'"requiredSecret", "optionalSecret?"',"]"),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"secrets?: Array<SecretDef>;\n")))}u.isMDXComponent=!0}}]);