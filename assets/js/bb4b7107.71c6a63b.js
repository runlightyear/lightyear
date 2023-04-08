"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1402],{57522:(e,a,r)=>{r.d(a,{Zo:()=>d,kt:()=>g});var t=r(29901);function n(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function l(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,t)}return r}function o(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?l(Object(r),!0).forEach((function(a){n(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function c(e,a){if(null==e)return{};var r,t,n=function(e,a){if(null==e)return{};var r,t,n={},l=Object.keys(e);for(t=0;t<l.length;t++)r=l[t],a.indexOf(r)>=0||(n[r]=e[r]);return n}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)r=l[t],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=t.createContext({}),i=function(e){var a=t.useContext(p),r=a;return e&&(r="function"==typeof e?e(a):o(o({},a),e)),r},d=function(e){var a=i(e.components);return t.createElement(p.Provider,{value:a},e.children)},s={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},u=t.forwardRef((function(e,a){var r=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),u=i(r),g=n,m=u["".concat(p,".").concat(g)]||u[g]||s[g]||l;return r?t.createElement(m,o(o({ref:a},d),{},{components:r})):t.createElement(m,o({ref:a},d))}));function g(e,a){var r=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var l=r.length,o=new Array(l);o[0]=u;var c={};for(var p in a)hasOwnProperty.call(a,p)&&(c[p]=a[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var i=2;i<l;i++)o[i]=r[i];return t.createElement.apply(null,o)}return t.createElement.apply(null,r)}u.displayName="MDXCreateElement"},29361:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>p,contentTitle:()=>o,default:()=>s,frontMatter:()=>l,metadata:()=>c,toc:()=>i});var t=r(14090),n=(r(29901),r(57522));const l={},o=void 0,c={unversionedId:"api/gcal.googlecalendar.createcalendar",id:"api/gcal.googlecalendar.createcalendar",title:"gcal.googlecalendar.createcalendar",description:"Home &gt; @runlightyear/gcal &gt; GoogleCalendar &gt; createCalendar",source:"@site/docs/api/gcal.googlecalendar.createcalendar.md",sourceDirName:"api",slug:"/api/gcal.googlecalendar.createcalendar",permalink:"/docs/api/gcal.googlecalendar.createcalendar",draft:!1,tags:[],version:"current",frontMatter:{}},p={},i=[{value:"GoogleCalendar.createCalendar() method",id:"googlecalendarcreatecalendar-method",level:2},{value:"Parameters",id:"parameters",level:2}],d={toc:i};function s(e){let{components:a,...r}=e;return(0,n.kt)("wrapper",(0,t.Z)({},d,r,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar"},"GoogleCalendar")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gcal.googlecalendar.createcalendar"},"createCalendar")),(0,n.kt)("h2",{id:"googlecalendarcreatecalendar-method"},"GoogleCalendar.createCalendar() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"Creates a secondary calendar."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"createCalendar(props: CreateCalendarProps): Promise<CreateCalendarResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/gcal.createcalendarprops"},"CreateCalendarProps")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/gcal.createcalendarresponse"},"CreateCalendarResponse"),">"))}s.isMDXComponent=!0}}]);