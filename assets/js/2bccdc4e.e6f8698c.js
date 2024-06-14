"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[41083],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},p=Object.keys(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)r=p[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=n.createContext({}),u=function(e){var t=n.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=u(e.components);return n.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,p=e.originalType,a=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=u(r),d=o,f=m["".concat(a,".").concat(d)]||m[d]||c[d]||p;return r?n.createElement(f,s(s({ref:t},l),{},{components:r})):n.createElement(f,s({ref:t},l))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var p=r.length,s=new Array(p);s[0]=m;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var u=2;u<p;u++)s[u]=r[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},41797:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>a,contentTitle:()=>s,default:()=>c,frontMatter:()=>p,metadata:()=>i,toc:()=>u});var n=r(14090),o=(r(29901),r(57522));const p={},s=void 0,i={unversionedId:"api/github.updateissueprops.milestone",id:"api/github.updateissueprops.milestone",title:"github.updateissueprops.milestone",description:"Home &gt; @runlightyear/github &gt; UpdateIssueProps &gt; milestone",source:"@site/docs/api/github.updateissueprops.milestone.md",sourceDirName:"api",slug:"/api/github.updateissueprops.milestone",permalink:"/docs/api/github.updateissueprops.milestone",draft:!1,tags:[],version:"current",frontMatter:{}},a={},u=[{value:"UpdateIssueProps.milestone property",id:"updateissuepropsmilestone-property",level:2}],l={toc:u};function c(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.updateissueprops"},"UpdateIssueProps")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.updateissueprops.milestone"},"milestone")),(0,o.kt)("h2",{id:"updateissuepropsmilestone-property"},"UpdateIssueProps.milestone property"),(0,o.kt)("p",null,"The number of the milestone to associate this issue with or null to remove current."),(0,o.kt)("p",null,"NOTE: Only users with push access can set the milestone for issues. The milestone is silently dropped otherwise."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"milestone?: string | number | null;\n")))}c.isMDXComponent=!0}}]);