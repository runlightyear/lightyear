"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[99133],{62757:(e,n,t)=>{t.d(n,{xA:()=>y,yg:()=>d});var r=t(67308);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},y=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,y=l(e,["components","mdxType","originalType","parentName"]),m=p(t),g=o,d=m["".concat(c,".").concat(g)]||m[g]||u[g]||a;return t?r.createElement(d,i(i({ref:n},y),{},{components:t})):r.createElement(d,i({ref:n},y))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=g;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},4085:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=t(94790),o=(t(67308),t(62757));const a={},i=void 0,l={unversionedId:"api/notion.richmentionblock",id:"api/notion.richmentionblock",title:"notion.richmentionblock",description:"Home &gt; @runlightyear/notion &gt; RichMentionBlock",source:"@site/docs/api/notion.richmentionblock.md",sourceDirName:"api",slug:"/api/notion.richmentionblock",permalink:"/docs/api/notion.richmentionblock",draft:!1,tags:[],version:"current",frontMatter:{}},c={},p=[{value:"RichMentionBlock interface",id:"richmentionblock-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],y={toc:p},m="wrapper";function u(e){let{components:n,...t}=e;return(0,o.yg)(m,(0,r.A)({},y,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.richmentionblock"},"RichMentionBlock")),(0,o.yg)("h2",{id:"richmentionblock-interface"},"RichMentionBlock interface"),(0,o.yg)("b",null,"Signature:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"interface RichMentionBlock extends BaseRichBlock \n")),(0,o.yg)("b",null,"Extends:"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/api/notion.baserichblock"},"BaseRichBlock")),(0,o.yg)("h2",{id:"required-properties"},"Required Properties"),(0,o.yg)("table",null,(0,o.yg)("thead",{parentName:"table"},(0,o.yg)("tr",{parentName:"thead"},(0,o.yg)("th",{parentName:"tr",align:null},"Property"),(0,o.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,o.yg)("th",{parentName:"tr",align:null},"Type"),(0,o.yg)("th",{parentName:"tr",align:null},"Description"))),(0,o.yg)("tbody",{parentName:"table"},(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.richmentionblock.mention"},"mention")),(0,o.yg)("td",{parentName:"tr",align:null}),(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.mentiondatabaseblock"},"MentionDatabaseBlock")," ","|"," ",(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.mentiondateblock"},"MentionDateBlock")," ","|"," ",(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.mentionlinkpreviewblock"},"MentionLinkPreviewBlock")," ","|"," ",(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.mentionpageblock"},"MentionPageBlock")),(0,o.yg)("td",{parentName:"tr",align:null})),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("a",{parentName:"td",href:"/docs/api/notion.richmentionblock.type"},"type")),(0,o.yg)("td",{parentName:"tr",align:null}),(0,o.yg)("td",{parentName:"tr",align:null},'"mention"'),(0,o.yg)("td",{parentName:"tr",align:null})))))}u.isMDXComponent=!0}}]);