"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[17136],{62757:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>m});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),p=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(r),y=n,m=c["".concat(o,".").concat(y)]||c[y]||g[y]||l;return r?a.createElement(m,s(s({ref:t},u),{},{components:r})):a.createElement(m,s({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,s=new Array(l);s[0]=y;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[c]="string"==typeof e?e:n,s[1]=i;for(var p=2;p<l;p++)s[p]=r[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}y.displayName="MDXCreateElement"},55481:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>g,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var a=r(94790),n=(r(67308),r(62757));const l={},s=void 0,i={unversionedId:"api/slack.listusersprops",id:"api/slack.listusersprops",title:"slack.listusersprops",description:"Home &gt; @runlightyear/slack &gt; ListUsersProps",source:"@site/docs/api/slack.listusersprops.md",sourceDirName:"api",slug:"/api/slack.listusersprops",permalink:"/docs/api/slack.listusersprops",draft:!1,tags:[],version:"current",frontMatter:{}},o={},p=[{value:"ListUsersProps interface",id:"listusersprops-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],u={toc:p},c="wrapper";function g(e){let{components:t,...r}=e;return(0,n.yg)(c,(0,a.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/slack.listusersprops"},"ListUsersProps")),(0,n.yg)("h2",{id:"listusersprops-interface"},"ListUsersProps interface"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"interface ListUsersProps \n")),(0,n.yg)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/slack.listusersprops.cursor"},"cursor?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"string"),(0,n.yg)("td",{parentName:"tr",align:null},"Paginate through collections of data by setting the cursor parameter to a next","_","cursor attribute returned by a previous request's response","_",'metadata. Default value fetches the first "page" of the collection. See pagination for more detail.')),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/slack.listusersprops.includelocale"},"includeLocale?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"boolean"),(0,n.yg)("td",{parentName:"tr",align:null},"Set this to true to receive the locale for users. Defaults to false")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/slack.listusersprops.limit"},"limit?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"number"),(0,n.yg)("td",{parentName:"tr",align:null},"The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no limit value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience limit","_","required or HTTP 500 errors.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/slack.listusersprops.teamid"},"teamId?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"string"),(0,n.yg)("td",{parentName:"tr",align:null},"encoded team id to list users in, required if org token is used")))))}g.isMDXComponent=!0}}]);