"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[42720],{57522:(e,r,t)=>{t.d(r,{Zo:()=>d,kt:()=>f});var a=t(29901);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var c=a.createContext({}),s=function(e){var r=a.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},d=function(e){var r=s(e.components);return a.createElement(c.Provider,{value:r},e.children)},i={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=s(t),f=n,m=u["".concat(c,".").concat(f)]||u[f]||i[f]||o;return t?a.createElement(m,p(p({ref:r},d),{},{components:t})):a.createElement(m,p({ref:r},d))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,p=new Array(o);p[0]=u;var l={};for(var c in r)hasOwnProperty.call(r,c)&&(l[c]=r[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,p[1]=l;for(var s=2;s<o;s++)p[s]=t[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3411:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>p,default:()=>i,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=t(14090),n=(t(29901),t(57522));const o={},p=void 0,l={unversionedId:"api/salesforce.salesforce.updaterecord",id:"api/salesforce.salesforce.updaterecord",title:"salesforce.salesforce.updaterecord",description:"Home &gt; @runlightyear/salesforce &gt; Salesforce &gt; updateRecord",source:"@site/docs/api/salesforce.salesforce.updaterecord.md",sourceDirName:"api",slug:"/api/salesforce.salesforce.updaterecord",permalink:"/docs/api/salesforce.salesforce.updaterecord",draft:!1,tags:[],version:"current",frontMatter:{}},c={},s=[{value:"Salesforce.updateRecord() method",id:"salesforceupdaterecord-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}],d={toc:s};function i(e){let{components:r,...t}=e;return(0,n.kt)("wrapper",(0,a.Z)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.salesforce"},"Salesforce")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.salesforce.updaterecord"},"updateRecord")),(0,n.kt)("h2",{id:"salesforceupdaterecord-method"},"Salesforce.updateRecord() method"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,n.kt)("p",null,"Update a Record"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"updateRecord(props: UpdateRecordProps): Promise<UpdateRecordResponse>;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"props"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/salesforce.updaterecordprops"},"UpdateRecordProps")),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"Promise","<",(0,n.kt)("a",{parentName:"p",href:"/docs/api/salesforce.updaterecordresponse"},"UpdateRecordResponse"),">"),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("p",null,"Update a lead"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},'await salesforce.updateRecord({\n  objectType: "Lead",\n  objectId: "00QDo000005arNKMAY",\n  fieldValues: {\n    status: "Working - Contacted",\n  },\n});\n')))}i.isMDXComponent=!0}}]);