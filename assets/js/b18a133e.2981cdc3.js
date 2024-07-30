"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[95229],{62757:(e,r,t)=>{t.d(r,{xA:()=>u,yg:()=>f});var n=t(67308);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function a(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},p=Object.keys(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),s=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},u=function(e){var r=s(e.components);return n.createElement(c.Provider,{value:r},e.children)},l="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,p=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),l=s(t),y=o,f=l["".concat(c,".").concat(y)]||l[y]||g[y]||p;return t?n.createElement(f,i(i({ref:r},u),{},{components:t})):n.createElement(f,i({ref:r},u))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var p=t.length,i=new Array(p);i[0]=y;var a={};for(var c in r)hasOwnProperty.call(r,c)&&(a[c]=r[c]);a.originalType=e,a[l]="string"==typeof e?e:o,i[1]=a;for(var s=2;s<p;s++)i[s]=t[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},9130:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>p,metadata:()=>a,toc:()=>s});var n=t(94790),o=(t(67308),t(62757));const p={},i=void 0,a={unversionedId:"api/github.gettreeprops.recursive",id:"api/github.gettreeprops.recursive",title:"github.gettreeprops.recursive",description:"Home &gt; @runlightyear/github &gt; GetTreeProps &gt; recursive",source:"@site/docs/api/github.gettreeprops.recursive.md",sourceDirName:"api",slug:"/api/github.gettreeprops.recursive",permalink:"/docs/api/github.gettreeprops.recursive",draft:!1,tags:[],version:"current",frontMatter:{}},c={},s=[{value:"GetTreeProps.recursive property",id:"gettreepropsrecursive-property",level:2}],u={toc:s},l="wrapper";function g(e){let{components:r,...t}=e;return(0,o.yg)(l,(0,n.A)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/github.gettreeprops"},"GetTreeProps")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/github.gettreeprops.recursive"},"recursive")),(0,o.yg)("h2",{id:"gettreepropsrecursive-property"},"GetTreeProps.recursive property"),(0,o.yg)("p",null,"Setting this parameter to any value returns the objects or subtrees referenced by the tree specified in :tree","_",'sha. For example, setting recursive to any of the following will enable returning objects or subtrees: 0, 1, "true", and "false". Omit this parameter to prevent recursively returning objects or subtrees.'),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"recursive?: string | boolean | number;\n")))}g.isMDXComponent=!0}}]);