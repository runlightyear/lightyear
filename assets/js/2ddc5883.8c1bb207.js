"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[32437],{57522:(e,r,t)=>{t.d(r,{Zo:()=>i,kt:()=>f});var a=t(29901);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=a.createContext({}),p=function(e){var r=a.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},i=function(e){var r=p(e.components);return a.createElement(s.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,i=l(e,["components","mdxType","originalType","parentName"]),u=p(t),f=n,m=u["".concat(s,".").concat(f)]||u[f]||d[f]||o;return t?a.createElement(m,c(c({ref:r},i),{},{components:t})):a.createElement(m,c({ref:r},i))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,c=new Array(o);c[0]=u;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,c[1]=l;for(var p=2;p<o;p++)c[p]=t[p];return a.createElement.apply(null,c)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},31806:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=t(14090),n=(t(29901),t(57522));const o={},c=void 0,l={unversionedId:"api/salesforce.salesforce.createrecord",id:"api/salesforce.salesforce.createrecord",title:"salesforce.salesforce.createrecord",description:"Home &gt; @runlightyear/salesforce &gt; Salesforce &gt; createRecord",source:"@site/docs/api/salesforce.salesforce.createrecord.md",sourceDirName:"api",slug:"/api/salesforce.salesforce.createrecord",permalink:"/docs/api/salesforce.salesforce.createrecord",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"Salesforce.createRecord() method",id:"salesforcecreaterecord-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],i={toc:p};function d(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},i,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.salesforce"},"Salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.salesforce.createrecord"},"createRecord")),(0,n.kt)("h2",{id:"salesforcecreaterecord-method"},"Salesforce.createRecord() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"Create a Record"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"createRecord(props: CreateRecordProps): Promise<CreateRecordResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/salesforce.createrecordprops"},"CreateRecordProps")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.createrecordresponse"},"CreateRecordResponse"),">"),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("p",null,"Create an account"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'const response = await salesforce.createRecord({\n  objectType: "Account",\n  fieldValues: { Name: "A New Account" },\n});\n\nconsole.log("Created new account", response.data.id);\n')))}d.isMDXComponent=!0}}]);