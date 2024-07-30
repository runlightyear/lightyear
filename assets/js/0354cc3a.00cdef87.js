"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[21385],{62757:(e,r,t)=>{t.d(r,{xA:()=>c,yg:()=>y});var n=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=n.createContext({}),p=function(e){var r=n.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},c=function(e){var r=p(e.components);return n.createElement(u.Provider,{value:r},e.children)},l="mdxType",g={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},h=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,s=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),l=p(t),h=a,y=l["".concat(u,".").concat(h)]||l[h]||g[h]||s;return t?n.createElement(y,i(i({ref:r},c),{},{components:t})):n.createElement(y,i({ref:r},c))}));function y(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var s=t.length,i=new Array(s);i[0]=h;var o={};for(var u in r)hasOwnProperty.call(r,u)&&(o[u]=r[u]);o.originalType=e,o[l]="string"==typeof e?e:a,i[1]=o;for(var p=2;p<s;p++)i[p]=t[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}h.displayName="MDXCreateElement"},33931:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>u,contentTitle:()=>i,default:()=>g,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var n=t(94790),a=(t(67308),t(62757));const s={},i=void 0,o={unversionedId:"api/github.github.searchusers",id:"api/github.github.searchusers",title:"github.github.searchusers",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; searchUsers",source:"@site/docs/api/github.github.searchusers.md",sourceDirName:"api",slug:"/api/github.github.searchusers",permalink:"/docs/api/github.github.searchusers",draft:!1,tags:[],version:"current",frontMatter:{}},u={},p=[{value:"GitHub.searchUsers() method",id:"githubsearchusers-method",level:2},{value:"Parameters",id:"parameters",level:2}],c={toc:p},l="wrapper";function g(e){let{components:r,...t}=e;return(0,a.yg)(l,(0,n.A)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/github.github.searchusers"},"searchUsers")),(0,a.yg)("h2",{id:"githubsearchusers-method"},"GitHub.searchUsers() method"),(0,a.yg)("p",null,"Search users"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"searchUsers(props: SearchUsersProps): Promise<SearchUsersResponse>;\n")),(0,a.yg)("h2",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"props"),(0,a.yg)("td",{parentName:"tr",align:null},"SearchUsersProps"),(0,a.yg)("td",{parentName:"tr",align:null})))),(0,a.yg)("b",null,"Returns:"),(0,a.yg)("p",null,"Promise","<","SearchUsersResponse",">"))}g.isMDXComponent=!0}}]);