"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[79839],{57522:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(29901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),i=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=i(n),y=a,f=d["".concat(c,".").concat(y)]||d[y]||u[y]||o;return n?r.createElement(f,s(s({ref:t},p),{},{components:n})):r.createElement(f,s({ref:t},p))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,s[1]=l;for(var i=2;i<o;i++)s[i]=n[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},33474:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var r=n(14090),a=(n(29901),n(57522));const o={},s=void 0,l={unversionedId:"api/gcal.listcalendarsprops.synctoken",id:"api/gcal.listcalendarsprops.synctoken",title:"gcal.listcalendarsprops.synctoken",description:"Home &gt; @runlightyear/gcal &gt; ListCalendarsProps &gt; syncToken",source:"@site/docs/api/gcal.listcalendarsprops.synctoken.md",sourceDirName:"api",slug:"/api/gcal.listcalendarsprops.synctoken",permalink:"/docs/api/gcal.listcalendarsprops.synctoken",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"ListCalendarsProps.syncToken property",id:"listcalendarspropssynctoken-property",level:2}],p={toc:i};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.listcalendarsprops"},"ListCalendarsProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.listcalendarsprops.synctoken"},"syncToken")),(0,a.kt)("h2",{id:"listcalendarspropssynctoken-property"},"ListCalendarsProps.syncToken property"),(0,a.kt)("p",null,"Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False. To ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken. If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization."),(0,a.kt)("p",null,"The default is to return all entries."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"syncToken?: string;\n")))}u.isMDXComponent=!0}}]);