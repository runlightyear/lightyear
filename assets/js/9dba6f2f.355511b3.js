"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[95539],{62757:(e,r,t)=>{t.d(r,{xA:()=>y,yg:()=>u});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),p=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},y=function(e){var r=p(e.components);return n.createElement(c.Provider,{value:r},e.children)},s="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,y=i(e,["components","mdxType","originalType","parentName"]),s=p(t),m=a,u=s["".concat(c,".").concat(m)]||s[m]||g[m]||o;return t?n.createElement(u,l(l({ref:r},y),{},{components:t})):n.createElement(u,l({ref:r},y))}));function u(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=m;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i[s]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=t[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},18373:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=t(94790),a=(t(67308),t(62757));const o={},l=void 0,i={unversionedId:"api/lightyear.modelsynchronizer.create",id:"api/lightyear.modelsynchronizer.create",title:"lightyear.modelsynchronizer.create",description:"Home &gt; @runlightyear/lightyear &gt; ModelSynchronizer &gt; create",source:"@site/docs/api/lightyear.modelsynchronizer.create.md",sourceDirName:"api",slug:"/api/lightyear.modelsynchronizer.create",permalink:"/docs/api/lightyear.modelsynchronizer.create",draft:!1,tags:[],version:"current",frontMatter:{}},c={},p=[{value:"ModelSynchronizer.create() method",id:"modelsynchronizercreate-method",level:2},{value:"Parameters",id:"parameters",level:2}],y={toc:p},s="wrapper";function g(e){let{components:r,...t}=e;return(0,a.yg)(s,(0,n.A)({},y,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear"},"@runlightyear/lightyear")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear.modelsynchronizer"},"ModelSynchronizer")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/lightyear.modelsynchronizer.create"},"create")),(0,a.yg)("h2",{id:"modelsynchronizercreate-method"},"ModelSynchronizer.create() method"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"abstract create(obj: CreateObjectProps<T>): Promise<string>;\n")),(0,a.yg)("h2",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"obj"),(0,a.yg)("td",{parentName:"tr",align:null},"CreateObjectProps","<","T",">"),(0,a.yg)("td",{parentName:"tr",align:null})))),(0,a.yg)("b",null,"Returns:"),(0,a.yg)("p",null,"Promise","<","string",">"))}g.isMDXComponent=!0}}]);