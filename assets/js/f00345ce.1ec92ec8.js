"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[355],{62757:(e,r,t)=>{t.d(r,{xA:()=>l,yg:()=>f});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},p=Object.keys(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)t=p[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),s=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},l=function(e){var r=s(e.components);return n.createElement(c.Provider,{value:r},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,p=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=s(t),y=a,f=u["".concat(c,".").concat(y)]||u[y]||g[y]||p;return t?n.createElement(f,o(o({ref:r},l),{},{components:t})):n.createElement(f,o({ref:r},l))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var p=t.length,o=new Array(p);o[0]=y;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<p;s++)o[s]=t[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},51927:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>g,frontMatter:()=>p,metadata:()=>i,toc:()=>s});var n=t(94790),a=(t(67308),t(62757));const p={},o=void 0,i={unversionedId:"api/notion.createpageprops.parent",id:"api/notion.createpageprops.parent",title:"notion.createpageprops.parent",description:"Home &gt; @runlightyear/notion &gt; CreatePageProps &gt; parent",source:"@site/docs/api/notion.createpageprops.parent.md",sourceDirName:"api",slug:"/api/notion.createpageprops.parent",permalink:"/docs/api/notion.createpageprops.parent",draft:!1,tags:[],version:"current",frontMatter:{}},c={},s=[{value:"CreatePageProps.parent property",id:"createpagepropsparent-property",level:2}],l={toc:s},u="wrapper";function g(e){let{components:r,...t}=e;return(0,a.yg)(u,(0,n.A)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.createpageprops"},"CreatePageProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.createpageprops.parent"},"parent")),(0,a.yg)("h2",{id:"createpagepropsparent-property"},"CreatePageProps.parent property"),(0,a.yg)("p",null,"The parent page or database where the new page is inserted, represented as a JSON object with a page","_","id or database","_","id key, and the corresponding ID."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"parent: PageParentInput | DatabaseParentInput;\n")))}g.isMDXComponent=!0}}]);