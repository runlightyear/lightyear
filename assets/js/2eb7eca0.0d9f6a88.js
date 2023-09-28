"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[94333],{57522:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>m});var n=t(29901);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),c=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):p(p({},r),e)),t},l=function(e){var r=c(e.components);return n.createElement(i.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),f=c(t),m=o,y=f["".concat(i,".").concat(m)]||f[m]||u[m]||a;return t?n.createElement(y,p(p({ref:r},l),{},{components:t})):n.createElement(y,p({ref:r},l))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=f;var s={};for(var i in r)hasOwnProperty.call(r,i)&&(s[i]=r[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,p[1]=s;for(var c=2;c<a;c++)p[c]=t[c];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},88716:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>p,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=t(14090),o=(t(29901),t(57522));const a={},p=void 0,s={unversionedId:"api/linear.issueresponse.project",id:"api/linear.issueresponse.project",title:"linear.issueresponse.project",description:"Home &gt; @runlightyear/linear &gt; IssueResponse &gt; project",source:"@site/docs/api/linear.issueresponse.project.md",sourceDirName:"api",slug:"/api/linear.issueresponse.project",permalink:"/docs/api/linear.issueresponse.project",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"IssueResponse.project property",id:"issueresponseproject-property",level:2}],l={toc:c};function u(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/linear.issueresponse"},"IssueResponse")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/linear.issueresponse.project"},"project")),(0,o.kt)("h2",{id:"issueresponseproject-property"},"IssueResponse.project property"),(0,o.kt)("p",null,"The project that the issue is associated with."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"project: {\n        id: LinearID;\n        name: string;\n    };\n")))}u.isMDXComponent=!0}}]);