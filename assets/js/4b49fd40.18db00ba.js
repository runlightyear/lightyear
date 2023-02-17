"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5010],{57522:(r,e,t)=>{t.d(e,{Zo:()=>p,kt:()=>w});var n=t(29901);function o(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function a(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.push.apply(t,n)}return t}function l(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){o(r,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(t,e))}))}return r}function u(r,e){if(null==r)return{};var t,n,o=function(r,e){if(null==r)return{};var t,n,o={},a=Object.keys(r);for(n=0;n<a.length;n++)t=a[n],e.indexOf(t)>=0||(o[t]=r[t]);return o}(r,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);for(n=0;n<a.length;n++)t=a[n],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(r,t)&&(o[t]=r[t])}return o}var i=n.createContext({}),c=function(r){var e=n.useContext(i),t=e;return r&&(t="function"==typeof r?r(e):l(l({},e),r)),t},p=function(r){var e=c(r.components);return n.createElement(i.Provider,{value:e},r.children)},f={inlineCode:"code",wrapper:function(r){var e=r.children;return n.createElement(n.Fragment,{},e)}},s=n.forwardRef((function(r,e){var t=r.components,o=r.mdxType,a=r.originalType,i=r.parentName,p=u(r,["components","mdxType","originalType","parentName"]),s=c(t),w=o,d=s["".concat(i,".").concat(w)]||s[w]||f[w]||a;return t?n.createElement(d,l(l({ref:e},p),{},{components:t})):n.createElement(d,l({ref:e},p))}));function w(r,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof r||o){var a=t.length,l=new Array(a);l[0]=s;var u={};for(var i in e)hasOwnProperty.call(e,i)&&(u[i]=e[i]);u.originalType=r,u.mdxType="string"==typeof r?r:o,l[1]=u;for(var c=2;c<a;c++)l[c]=t[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}s.displayName="MDXCreateElement"},86943:(r,e,t)=>{t.r(e),t.d(e,{assets:()=>i,contentTitle:()=>l,default:()=>f,frontMatter:()=>a,metadata:()=>u,toc:()=>c});var n=t(14090),o=(t(29901),t(57522));const a={},l=void 0,u={unversionedId:"api/github.workflowrunpayload.workflowrun",id:"api/github.workflowrunpayload.workflowrun",title:"github.workflowrunpayload.workflowrun",description:"Home &gt; @runlightyear/github &gt; WorkflowRunPayload &gt; workflowRun",source:"@site/docs/api/github.workflowrunpayload.workflowrun.md",sourceDirName:"api",slug:"/api/github.workflowrunpayload.workflowrun",permalink:"/lightyear/docs/api/github.workflowrunpayload.workflowrun",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.workflowrunpayload.workflowrun.md",tags:[],version:"current",frontMatter:{}},i={},c=[{value:"WorkflowRunPayload.workflowRun property",id:"workflowrunpayloadworkflowrun-property",level:2}],p={toc:c};function f(r){let{components:e,...t}=r;return(0,o.kt)("wrapper",(0,n.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.workflowrunpayload"},"WorkflowRunPayload")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.workflowrunpayload.workflowrun"},"workflowRun")),(0,o.kt)("h2",{id:"workflowrunpayloadworkflowrun-property"},"WorkflowRunPayload.workflowRun property"),(0,o.kt)("p",null,"The workflow run. Includes information such as artifacts","_","url, check","_","suite","_","id, conclusion, head","_","branch, and head","_","sha."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'workflowRun: {\n        artifactsUrl: string;\n        checkSuiteId: string;\n        conclusion?: "success" | "cancelled" | string;\n        headBranch: string;\n        headSha: string;\n        [name: string]: any;\n    };\n')))}f.isMDXComponent=!0}}]);