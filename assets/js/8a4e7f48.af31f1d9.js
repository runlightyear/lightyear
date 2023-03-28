"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[64825],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=c(r),f=a,y=m["".concat(p,".").concat(f)]||m[f]||u[f]||o;return r?n.createElement(y,s(s({ref:t},l),{},{components:r})):n.createElement(y,s({ref:t},l))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},22831:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=r(14090),a=(r(29901),r(57522));const o={},s=void 0,i={unversionedId:"api/linear.issueresponse.team",id:"api/linear.issueresponse.team",title:"linear.issueresponse.team",description:"Home &gt; @runlightyear/linear &gt; IssueResponse &gt; team",source:"@site/docs/api/linear.issueresponse.team.md",sourceDirName:"api",slug:"/api/linear.issueresponse.team",permalink:"/docs/api/linear.issueresponse.team",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"IssueResponse.team property",id:"issueresponseteam-property",level:2}],l={toc:c};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.issueresponse"},"IssueResponse")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.issueresponse.team"},"team")),(0,a.kt)("h2",{id:"issueresponseteam-property"},"IssueResponse.team property"),(0,a.kt)("p",null,"The team that the issue is associated with."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"team: {\n        id: ID;\n        name: string;\n    };\n")))}u.isMDXComponent=!0}}]);