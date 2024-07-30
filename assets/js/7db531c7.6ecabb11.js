"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[77799],{62757:(e,r,n)=>{n.d(r,{xA:()=>l,yg:()=>d});var t=n(67308);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function c(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function p(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=t.createContext({}),s=function(e){var r=t.useContext(i),n=r;return e&&(n="function"==typeof e?e(r):c(c({},r),e)),n},l=function(e){var r=s(e.components);return t.createElement(i.Provider,{value:r},e.children)},f="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},y=t.forwardRef((function(e,r){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),f=s(n),y=a,d=f["".concat(i,".").concat(y)]||f[y]||u[y]||o;return n?t.createElement(d,c(c({ref:r},l),{},{components:n})):t.createElement(d,c({ref:r},l))}));function d(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=n.length,c=new Array(o);c[0]=y;var p={};for(var i in r)hasOwnProperty.call(r,i)&&(p[i]=r[i]);p.originalType=e,p[f]="string"==typeof e?e:a,c[1]=p;for(var s=2;s<o;s++)c[s]=n[s];return t.createElement.apply(null,c)}return t.createElement.apply(null,n)}y.displayName="MDXCreateElement"},12016:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var t=n(94790),a=(n(67308),n(62757));const o={},c=void 0,p={unversionedId:"api/gcal.createeventprops.conferencedataversion",id:"api/gcal.createeventprops.conferencedataversion",title:"gcal.createeventprops.conferencedataversion",description:"Home &gt; @runlightyear/gcal &gt; CreateEventProps &gt; conferenceDataVersion",source:"@site/docs/api/gcal.createeventprops.conferencedataversion.md",sourceDirName:"api",slug:"/api/gcal.createeventprops.conferencedataversion",permalink:"/docs/api/gcal.createeventprops.conferencedataversion",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"CreateEventProps.conferenceDataVersion property",id:"createeventpropsconferencedataversion-property",level:2}],l={toc:s},f="wrapper";function u(e){let{components:r,...n}=e;return(0,a.yg)(f,(0,t.A)({},l,n,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops"},"CreateEventProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/gcal.createeventprops.conferencedataversion"},"conferenceDataVersion")),(0,a.yg)("h2",{id:"createeventpropsconferencedataversion-property"},"CreateEventProps.conferenceDataVersion property"),(0,a.yg)("p",null,"Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. Acceptable values are 0 to 1, inclusive."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"conferenceDataVersion?: number;\n")))}u.isMDXComponent=!0}}]);