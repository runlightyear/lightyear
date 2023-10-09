"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[74694],{57522:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(29901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},i={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,f=d["".concat(l,".").concat(m)]||d[m]||i[m]||o;return n?r.createElement(f,p(p({ref:t},u),{},{components:n})):r.createElement(f,p({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,p[1]=s;for(var c=2;c<o;c++)p[c]=n[c];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},91749:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>i,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(14090),a=(n(29901),n(57522));const o={},p=void 0,s={unversionedId:"api/gcal.onnewandupdatedeventsprops.maxresults",id:"api/gcal.onnewandupdatedeventsprops.maxresults",title:"gcal.onnewandupdatedeventsprops.maxresults",description:"Home &gt; @runlightyear/gcal &gt; OnNewAndUpdatedEventsProps &gt; maxResults",source:"@site/docs/api/gcal.onnewandupdatedeventsprops.maxresults.md",sourceDirName:"api",slug:"/api/gcal.onnewandupdatedeventsprops.maxresults",permalink:"/docs/api/gcal.onnewandupdatedeventsprops.maxresults",draft:!1,tags:[],version:"current",frontMatter:{}},l={},c=[{value:"OnNewAndUpdatedEventsProps.maxResults property",id:"onnewandupdatedeventspropsmaxresults-property",level:2}],u={toc:c};function i(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.onnewandupdatedeventsprops"},"OnNewAndUpdatedEventsProps")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.onnewandupdatedeventsprops.maxresults"},"maxResults")),(0,a.kt)("h2",{id:"onnewandupdatedeventspropsmaxresults-property"},"OnNewAndUpdatedEventsProps.maxResults property"),(0,a.kt)("p",null,"Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"maxResults?: number;\n")))}i.isMDXComponent=!0}}]);