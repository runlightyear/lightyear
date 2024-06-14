"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[81329],{57522:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>f});var r=n(29901);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var p=r.createContext({}),c=function(t){var e=r.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=c(t.components);return r.createElement(p.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,p=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),m=c(n),f=a,s=m["".concat(p,".").concat(f)]||m[f]||d[f]||o;return n?r.createElement(s,i(i({ref:e},u),{},{components:n})):r.createElement(s,i({ref:e},u))}));function f(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var p in e)hasOwnProperty.call(e,p)&&(l[p]=e[p]);l.originalType=t,l.mdxType="string"==typeof t?t:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},68191:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(14090),a=(n(29901),n(57522));const o={},i=void 0,l={unversionedId:"api/notion.formulafiltercondition",id:"api/notion.formulafiltercondition",title:"notion.formulafiltercondition",description:"Home &gt; @runlightyear/notion &gt; FormulaFilterCondition",source:"@site/docs/api/notion.formulafiltercondition.md",sourceDirName:"api",slug:"/api/notion.formulafiltercondition",permalink:"/docs/api/notion.formulafiltercondition",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"FormulaFilterCondition interface",id:"formulafiltercondition-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],u={toc:c};function d(t){let{components:e,...n}=t;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/notion.formulafiltercondition"},"FormulaFilterCondition")),(0,a.kt)("h2",{id:"formulafiltercondition-interface"},"FormulaFilterCondition interface"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"interface FormulaFilterCondition \n")),(0,a.kt)("h2",{id:"optional-properties"},"Optional Properties"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Property"),(0,a.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.formulafiltercondition.checkbox"},"checkbox?")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.checkboxfiltercondition"},"CheckboxFilterCondition")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"A checkbox filter condition to compare the formula result against."),(0,a.kt)("p",null,"Returns database entries where the formula result matches the provided condition."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.formulafiltercondition.date"},"date?")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.datefiltercondition"},"DateFilterCondition")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"A date filter condition to compare the formula result against."),(0,a.kt)("p",null,"Returns database entries where the formula result matches the provided condition."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.formulafiltercondition.number"},"number?")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.numberfiltercondition"},"NumberFilterCondition")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"A number filter condition to compare the formula result against."),(0,a.kt)("p",null,"Returns database entries where the formula result matches the provided condition."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.formulafiltercondition.string"},"string?")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/notion.richtextfiltercondition"},"RichTextFilterCondition")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"A rich text filter condition to compare the formula result against."),(0,a.kt)("p",null,"Returns database entries where the formula result matches the provided condition."))))))}d.isMDXComponent=!0}}]);