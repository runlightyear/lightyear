"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[217],{57522:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>c});var a=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},s=Object.keys(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)r=s[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),o=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=o(e.components);return a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),m=o(r),c=n,g=m["".concat(i,".").concat(c)]||m[c]||d[c]||s;return r?a.createElement(g,l(l({ref:t},u),{},{components:r})):a.createElement(g,l({ref:t},u))}));function c(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,l=new Array(s);l[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,l[1]=p;for(var o=2;o<s;o++)l[o]=r[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},99082:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>p,toc:()=>o});var a=r(14090),n=(r(29901),r(57522));const s={},l=void 0,p={unversionedId:"api/github.updateissueprops",id:"api/github.updateissueprops",title:"github.updateissueprops",description:"Home &gt; @runlightyear/github &gt; UpdateIssueProps",source:"@site/docs/api/github.updateissueprops.md",sourceDirName:"api",slug:"/api/github.updateissueprops",permalink:"/lightyear/docs/api/github.updateissueprops",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.updateissueprops.md",tags:[],version:"current",frontMatter:{}},i={},o=[{value:"UpdateIssueProps interface",id:"updateissueprops-interface",level:2},{value:"Required Properties",id:"required-properties",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],u={toc:o};function d(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.updateissueprops"},"UpdateIssueProps")),(0,n.kt)("h2",{id:"updateissueprops-interface"},"UpdateIssueProps interface"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"interface UpdateIssueProps \n")),(0,n.kt)("h2",{id:"required-properties"},"Required Properties"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Property"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.issuenumber"},"issueNumber")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"number"),(0,n.kt)("td",{parentName:"tr",align:null},"The number that identifies the issue.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.owner"},"owner")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"The account owner of the repository. The name is not case sensitive.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.repo"},"repo")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"string"),(0,n.kt)("td",{parentName:"tr",align:null},"The name of the repository. The name is not case sensitive.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.statereason"},"stateReason")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},'"completed" ',"|",' "not',"_",'planned" ',"|",' "repopened" ',"|"," null"),(0,n.kt)("td",{parentName:"tr",align:null},"The reason for the current state")))),(0,n.kt)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Property"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.assignees"},"assignees?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Array","<","string",">"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("p",null,"Logins for Users to assign to this issue. Pass one or more user logins to replace the set of assignees on this Issue. Send an empty array (","[","]",") to clear all assignees from the Issue."),(0,n.kt)("p",null,"NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise."))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.body"},"body?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"string ","|"," null"),(0,n.kt)("td",{parentName:"tr",align:null},"The contents of the issue.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.labels"},"labels?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Array","<","string",">"," ","|"," Array","<","object",">"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("p",null,"Labels to associate with this issue. Pass one or more Labels to replace the set of Labels on this Issue. Send an empty array (","[","]",") to clear all Labels from the Issue."),(0,n.kt)("p",null,"NOTE: Only users with push access can set labels for issues. Labels are silently dropped otherwise."))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.milestone"},"milestone?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"string ","|"," number ","|"," null"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("p",null,"The number of the milestone to associate this issue with or null to remove current."),(0,n.kt)("p",null,"NOTE: Only users with push access can set the milestone for issues. The milestone is silently dropped otherwise."))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.state"},"state?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},'"open" ',"|",' "closed"'),(0,n.kt)("td",{parentName:"tr",align:null},"State of the issue.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.updateissueprops.title"},"title?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"string ","|"," number ","|"," null"),(0,n.kt)("td",{parentName:"tr",align:null},"The title of the issue.")))))}d.isMDXComponent=!0}}]);