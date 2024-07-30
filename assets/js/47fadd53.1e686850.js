"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[91555],{62757:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>f});var n=r(67308);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},p=Object.keys(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,p=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),l=u(r),y=a,f=l["".concat(i,".").concat(y)]||l[y]||d[y]||p;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=r.length,o=new Array(p);o[0]=y;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[l]="string"==typeof e?e:a,o[1]=s;for(var u=2;u<p;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},1320:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>p,metadata:()=>s,toc:()=>u});var n=r(94790),a=(r(67308),r(62757));const p={},o=void 0,s={unversionedId:"api/linear.userresponse.updatedat",id:"api/linear.userresponse.updatedat",title:"linear.userresponse.updatedat",description:"Home &gt; @runlightyear/linear &gt; UserResponse &gt; updatedAt",source:"@site/docs/api/linear.userresponse.updatedat.md",sourceDirName:"api",slug:"/api/linear.userresponse.updatedat",permalink:"/docs/api/linear.userresponse.updatedat",draft:!1,tags:[],version:"current",frontMatter:{}},i={},u=[{value:"UserResponse.updatedAt property",id:"userresponseupdatedat-property",level:2}],c={toc:u},l="wrapper";function d(e){let{components:t,...r}=e;return(0,a.yg)(l,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/linear.userresponse"},"UserResponse")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/linear.userresponse.updatedat"},"updatedAt")),(0,a.yg)("h2",{id:"userresponseupdatedat-property"},"UserResponse.updatedAt property"),(0,a.yg)("p",null,"The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't been updated after creation."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"updatedAt: DateTime;\n")))}d.isMDXComponent=!0}}]);