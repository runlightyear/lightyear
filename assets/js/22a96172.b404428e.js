"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[92849],{62757:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>s});var r=n(67308);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),y=c(n),g=o,s=y["".concat(p,".").concat(g)]||y[g]||u[g]||a;return n?r.createElement(s,i(i({ref:t},d),{},{components:n})):r.createElement(s,i({ref:t},d))}));function s(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=g;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[y]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},59260:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(94790),o=(n(67308),n(62757));const a={},i=void 0,l={unversionedId:"api/notion.peoplefiltercondition",id:"api/notion.peoplefiltercondition",title:"notion.peoplefiltercondition",description:"Home &gt; @runlightyear/notion &gt; PeopleFilterCondition",source:"@site/docs/api/notion.peoplefiltercondition.md",sourceDirName:"api",slug:"/api/notion.peoplefiltercondition",permalink:"/docs/api/notion.peoplefiltercondition",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"PeopleFilterCondition interface",id:"peoplefiltercondition-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],d={toc:c},y="wrapper";function u(e){let{components:t,...n}=e;return(0,o.yg)(y,(0,r.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.peoplefiltercondition"},"PeopleFilterCondition")),(0,o.yg)("h2",{id:"peoplefiltercondition-interface"},"PeopleFilterCondition interface"),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"interface PeopleFilterCondition \n")),(0,o.yg)("h2",{id:"optional-properties"},"Optional Properties"),(0,o.yg)("table",null,(0,o.yg)("thead",{parentName:"table"},(0,o.yg)("tr",{parentName:"thead"},(0,o.yg)("th",{parentName:"tr",align:null},"Property"),(0,o.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,o.yg)("th",{parentName:"tr",align:null},"Type"),(0,o.yg)("th",{parentName:"tr",align:null},"Description"))),(0,o.yg)("tbody",{parentName:"table"},(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.peoplefiltercondition.contains"},"contains?")),(0,o.yg)("td",{parentName:"tr",align:null}),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.notionid"},"NotionId")),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("p",null,"The value to compare the people property value against."),(0,o.yg)("p",null,"Returns database entries where the people property value contains the provided string."))),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.peoplefiltercondition.doesnotcontain"},"doesNotContain?")),(0,o.yg)("td",{parentName:"tr",align:null}),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.notionid"},"NotionId")),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("p",null,"The value to compare the people property value against."),(0,o.yg)("p",null,"Returns database entries where the people property value does not contain the provided string."))),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.peoplefiltercondition.isempty"},"isEmpty?")),(0,o.yg)("td",{parentName:"tr",align:null}),(0,o.yg)("td",{parentName:"tr",align:null},"true"),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("p",null,"Whether the people property value does not contain any data."),(0,o.yg)("p",null,"Returns database entries where the people property value does not contain any data."))),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.peoplefiltercondition.isnotempty"},"isNotEmpty?")),(0,o.yg)("td",{parentName:"tr",align:null}),(0,o.yg)("td",{parentName:"tr",align:null},"true"),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("p",null,"Whether the people property value contains data."),(0,o.yg)("p",null,"Returns database entries where the people property value is not empty."))))))}u.isMDXComponent=!0}}]);