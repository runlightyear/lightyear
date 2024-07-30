"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[62222],{62757:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>d});var r=n(67308);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),y=c(n),g=a,d=y["".concat(p,".").concat(g)]||y[g]||u[g]||l;return n?r.createElement(d,i(i({ref:t},s),{},{components:n})):r.createElement(d,i({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=g;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[y]="string"==typeof e?e:a,i[1]=o;for(var c=2;c<l;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},31989:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var r=n(94790),a=(n(67308),n(62757));const l={},i=void 0,o={unversionedId:"api/notion.selectfiltercondition",id:"api/notion.selectfiltercondition",title:"notion.selectfiltercondition",description:"Home &gt; @runlightyear/notion &gt; SelectFilterCondition",source:"@site/docs/api/notion.selectfiltercondition.md",sourceDirName:"api",slug:"/api/notion.selectfiltercondition",permalink:"/docs/api/notion.selectfiltercondition",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"SelectFilterCondition interface",id:"selectfiltercondition-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],s={toc:c},y="wrapper";function u(e){let{components:t,...n}=e;return(0,a.yg)(y,(0,r.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/notion.selectfiltercondition"},"SelectFilterCondition")),(0,a.yg)("h2",{id:"selectfiltercondition-interface"},"SelectFilterCondition interface"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"interface SelectFilterCondition \n")),(0,a.yg)("h2",{id:"optional-properties"},"Optional Properties"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Property"),(0,a.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/notion.selectfiltercondition.doesnotequal"},"doesNotEqual?")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("p",null,"The string to compare the select property value against."),(0,a.yg)("p",null,"Returns database entries where the select property value does not match the provided string."))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/notion.selectfiltercondition.equals"},"equals?")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("p",null,"The string to compare the select property value against."),(0,a.yg)("p",null,"Returns database entries where the select property value matches the provided string."))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/notion.selectfiltercondition.isempty"},"isEmpty?")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"true"),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("p",null,"Whether the select property value does not contain data."),(0,a.yg)("p",null,"Returns database entries where the select property value is empty."))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/api/notion.selectfiltercondition.isnotempty"},"isNotEmpty?")),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"true"),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("p",null,"Whether the select property value contains data."),(0,a.yg)("p",null,"Returns database entries where the select property value is not empty."))))))}u.isMDXComponent=!0}}]);