"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[32127],{57522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var s=r(29901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,s,n=function(e,t){if(null==e)return{};var r,s,n={},a=Object.keys(e);for(s=0;s<a.length;s++)r=a[s],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(s=0;s<a.length;s++)r=a[s],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=s.createContext({}),u=function(e){var t=s.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},c=function(e){var t=u(e.components);return s.createElement(i.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},g=s.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),g=u(r),d=n,f=g["".concat(i,".").concat(d)]||g[d]||l[d]||a;return r?s.createElement(f,p(p({ref:t},c),{},{components:r})):s.createElement(f,p({ref:t},c))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,p=new Array(a);p[0]=g;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:n,p[1]=o;for(var u=2;u<a;u++)p[u]=r[u];return s.createElement.apply(null,p)}return s.createElement.apply(null,r)}g.displayName="MDXCreateElement"},56675:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>p,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>u});var s=r(14090),n=(r(29901),r(57522));const a={},p=void 0,o={unversionedId:"api/github.updateissueprops.assignees",id:"api/github.updateissueprops.assignees",title:"github.updateissueprops.assignees",description:"Home &gt; @runlightyear/github &gt; UpdateIssueProps &gt; assignees",source:"@site/docs/api/github.updateissueprops.assignees.md",sourceDirName:"api",slug:"/api/github.updateissueprops.assignees",permalink:"/docs/api/github.updateissueprops.assignees",draft:!1,tags:[],version:"current",frontMatter:{}},i={},u=[{value:"UpdateIssueProps.assignees property",id:"updateissuepropsassignees-property",level:2}],c={toc:u};function l(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,s.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.updateissueprops"},"UpdateIssueProps")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.updateissueprops.assignees"},"assignees")),(0,n.kt)("h2",{id:"updateissuepropsassignees-property"},"UpdateIssueProps.assignees property"),(0,n.kt)("p",null,"Logins for Users to assign to this issue. Pass one or more user logins to replace the set of assignees on this Issue. Send an empty array (","[","]",") to clear all assignees from the Issue."),(0,n.kt)("p",null,"NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise."),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"assignees?: Array<string>;\n")))}l.isMDXComponent=!0}}]);