"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[19918],{57522:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var a=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),m=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=m(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=m(n),d=r,k=s["".concat(p,".").concat(d)]||s[d]||u[d]||l;return n?a.createElement(k,i(i({ref:t},c),{},{components:n})):a.createElement(k,i({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=s;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var m=2;m<l;m++)i[m]=n[m];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},6774:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>m});var a=n(14090),r=(n(29901),n(57522));const l={},i=void 0,o={unversionedId:"api/slack.multiselectmenuelement",id:"api/slack.multiselectmenuelement",title:"slack.multiselectmenuelement",description:"Home &gt; @runlightyear/slack &gt; MultiSelectMenuElement",source:"@site/docs/api/slack.multiselectmenuelement.md",sourceDirName:"api",slug:"/api/slack.multiselectmenuelement",permalink:"/docs/api/slack.multiselectmenuelement",draft:!1,tags:[],version:"current",frontMatter:{}},p={},m=[{value:"MultiSelectMenuElement interface",id:"multiselectmenuelement-interface",level:2},{value:"Required Properties",id:"required-properties",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],c={toc:m};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/slack.multiselectmenuelement"},"MultiSelectMenuElement")),(0,r.kt)("h2",{id:"multiselectmenuelement-interface"},"MultiSelectMenuElement interface"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"interface MultiSelectMenuElement \n")),(0,r.kt)("h2",{id:"required-properties"},"Required Properties"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.options"},"options")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Array","<",(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.optionobject"},"OptionObject"),">"),(0,r.kt)("td",{parentName:"tr",align:null},"An array of option objects. Maximum number of options is 100. Each option must be less than 76 characters. If option","_","groups is specified, this field should not be.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.type"},"type")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},'"multi',"_","static","_",'select"'),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("h2",{id:"optional-properties"},"Optional Properties"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.actionid"},"actionId?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"An identifier for the action triggered when a menu option is selected. You can use this when you receive an interaction payload to identify the source of the action. Should be unique among all other action","_","ids in the containing block. Maximum length is 255 characters.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.confirm"},"confirm?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.confirmationdialogobject"},"ConfirmationDialogObject")),(0,r.kt)("td",{parentName:"tr",align:null},"A confirm object that defines an optional confirmation dialog that appears before the multi-select choices are submitted.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.focusonload"},"focusOnLoad?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"Indicates whether the element will be set to auto focus within the view object. Only one element can be set to true. Defaults to false.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.initialoptions"},"initialOptions?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Array","<",(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.optionobject"},"OptionObject"),">"),(0,r.kt)("td",{parentName:"tr",align:null},"An array of option objects that exactly match one or more of the options within options or option","_","groups. These options will be selected when the menu initially loads.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.maxselecteditems"},"maxSelectedItems?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"Specifies the maximum number of items that can be selected in the menu. Minimum number is 1.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.optiongroups"},"optionGroups?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Array","<",(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.optiongroupobject"},"OptionGroupObject"),">"),(0,r.kt)("td",{parentName:"tr",align:null},"An array of option group objects. Maximum number of option groups is 100. If options is specified, this field should not be.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.multiselectmenuelement.placeholder"},"placeholder?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/slack.plaintextobject"},"PlainTextObject")),(0,r.kt)("td",{parentName:"tr",align:null},"A plain","_","text only text object that defines the placeholder text shown on the menu. Maximum length for the text in this field is 150 characters.")))))}u.isMDXComponent=!0}}]);