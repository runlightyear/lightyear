"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[48304],{57522:(t,e,n)=>{n.d(e,{Zo:()=>s,kt:()=>d});var a=n(29901);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),c=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},s=function(t){var e=c(t.components);return a.createElement(p.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,s=o(t,["components","mdxType","originalType","parentName"]),u=c(n),d=r,k=u["".concat(p,".").concat(d)]||u[d]||m[d]||l;return n?a.createElement(k,i(i({ref:e},s),{},{components:n})):a.createElement(k,i({ref:e},s))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var c=2;c<l;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},46437:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var a=n(14090),r=(n(29901),n(57522));const l={},i=void 0,o={unversionedId:"api/slack.selectmenustaticoptionselement",id:"api/slack.selectmenustaticoptionselement",title:"slack.selectmenustaticoptionselement",description:"Home &gt; @runlightyear/slack &gt; SelectMenuStaticOptionsElement",source:"@site/docs/api/slack.selectmenustaticoptionselement.md",sourceDirName:"api",slug:"/api/slack.selectmenustaticoptionselement",permalink:"/docs/api/slack.selectmenustaticoptionselement",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"SelectMenuStaticOptionsElement interface",id:"selectmenustaticoptionselement-interface",level:2},{value:"Required Properties",id:"required-properties",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],s={toc:c};function m(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/slack.selectmenustaticoptionselement"},"SelectMenuStaticOptionsElement")),(0,r.kt)("h2",{id:"selectmenustaticoptionselement-interface"},"SelectMenuStaticOptionsElement interface"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"interface SelectMenuStaticOptionsElement \n")),(0,r.kt)("h2",{id:"required-properties"},"Required Properties"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.options"},"options")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Array","<",(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.optionobject"},"OptionObject"),">"),(0,r.kt)("td",{parentName:"tr",align:null},"An array of option objects. Maximum number of options is 100. If option","_","groups is specified, this field should not be.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.type"},"type")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},'"static',"_",'select"'),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("h2",{id:"optional-properties"},"Optional Properties"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.actionid"},"actionId?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action","_","ids in the containing block. Maximum length is 255 characters.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.confirm"},"confirm?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.confirmationdialogobject"},"ConfirmationDialogObject")),(0,r.kt)("td",{parentName:"tr",align:null},"A confirm object that defines an optional confirmation dialog that appears after a menu item is selected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.focusonload"},"focusOnLoad?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.initialoption"},"initialOption?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.optionobject"},"OptionObject")),(0,r.kt)("td",{parentName:"tr",align:null},"A single option that exactly matches one of the options within options or option","_","groups. This option will be selected when the menu initially loads.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.optiongroups"},"optionGroups?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Array","<",(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.optiongroupobject"},"OptionGroupObject"),">"),(0,r.kt)("td",{parentName:"tr",align:null},"An array of option group objects. Maximum number of option groups is 100. If options is specified, this field should not be.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.selectmenustaticoptionselement.placeholder"},"placeholder?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.plaintextobject"},"PlainTextObject")),(0,r.kt)("td",{parentName:"tr",align:null},"A plain","_","text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.")))))}m.isMDXComponent=!0}}]);