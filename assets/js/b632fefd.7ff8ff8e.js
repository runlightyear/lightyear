"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[52465],{62757:(e,t,r)=>{r.d(t,{xA:()=>g,yg:()=>d});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),o=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},g=function(e){var t=o(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,g=s(e,["components","mdxType","originalType","parentName"]),u=o(r),c=n,d=u["".concat(p,".").concat(c)]||u[c]||y[c]||i;return r?a.createElement(d,l(l({ref:t},g),{},{components:r})):a.createElement(d,l({ref:t},g))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=c;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[u]="string"==typeof e?e:n,l[1]=s;for(var o=2;o<i;o++)l[o]=r[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},76461:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>y,frontMatter:()=>i,metadata:()=>s,toc:()=>o});var a=r(94790),n=(r(67308),r(62757));const i={},l=void 0,s={unversionedId:"api/github.createissueprops",id:"api/github.createissueprops",title:"github.createissueprops",description:"Home &gt; @runlightyear/github &gt; CreateIssueProps",source:"@site/docs/api/github.createissueprops.md",sourceDirName:"api",slug:"/api/github.createissueprops",permalink:"/docs/api/github.createissueprops",draft:!1,tags:[],version:"current",frontMatter:{}},p={},o=[{value:"CreateIssueProps interface",id:"createissueprops-interface",level:2},{value:"Required Properties",id:"required-properties",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],g={toc:o},u="wrapper";function y(e){let{components:t,...r}=e;return(0,n.yg)(u,(0,a.A)({},g,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.createissueprops"},"CreateIssueProps")),(0,n.yg)("h2",{id:"createissueprops-interface"},"CreateIssueProps interface"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"interface CreateIssueProps \n")),(0,n.yg)("h2",{id:"required-properties"},"Required Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.createissueprops.owner"},"owner")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"string"),(0,n.yg)("td",{parentName:"tr",align:null},"The account owner of the repository. The name is not case sensitive.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.createissueprops.repo"},"repo")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"string"),(0,n.yg)("td",{parentName:"tr",align:null},"The name of the repository. The name is not case sensitive.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.createissueprops.title"},"title")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"string"),(0,n.yg)("td",{parentName:"tr",align:null},"The title of the issue.")))),(0,n.yg)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.createissueprops.assignees"},"assignees?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<","string",">"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("p",null,"Logins for Users to assign to this issue."),(0,n.yg)("p",null,"NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise."))),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.createissueprops.body"},"body?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"string"),(0,n.yg)("td",{parentName:"tr",align:null},"The contents of the issue.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.createissueprops.labels"},"labels?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<","string",">"," ","|"," Array","<","object",">"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("p",null,"Labels to associate with this issue."),(0,n.yg)("p",null,"NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise."))),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.createissueprops.milestone"},"milestone?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"string ","|"," number ","|"," null"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("p",null,"The number of the milestone to associate this issue with."),(0,n.yg)("p",null,"NOTE: Only users with push access can set the milestone for new issues. The milestone is silently dropped otherwise."))))))}y.isMDXComponent=!0}}]);