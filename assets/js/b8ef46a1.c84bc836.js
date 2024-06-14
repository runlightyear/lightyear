"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[23070],{57522:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),o=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=o(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=o(r),d=a,f=m["".concat(p,".").concat(d)]||m[d]||c[d]||s;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,i=new Array(s);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var o=2;o<s;o++)i[o]=r[o];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},14824:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>l,toc:()=>o});var n=r(14090),a=(r(29901),r(57522));const s={},i=void 0,l={unversionedId:"api/linear.linear.listissues",id:"api/linear.linear.listissues",title:"linear.linear.listissues",description:"Home &gt; @runlightyear/linear &gt; Linear &gt; listIssues",source:"@site/docs/api/linear.linear.listissues.md",sourceDirName:"api",slug:"/api/linear.linear.listissues",permalink:"/docs/api/linear.linear.listissues",draft:!1,tags:[],version:"current",frontMatter:{}},p={},o=[{value:"Linear.listIssues() method",id:"linearlistissues-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],u={toc:o};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.linear"},"Linear")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.linear.listissues"},"listIssues")),(0,a.kt)("h2",{id:"linearlistissues-method"},"Linear.listIssues() method"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,a.kt)("p",null,"List issues"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"listIssues(props?: ListIssuesProps): Promise<ListIssuesResponse>;\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/linear.listissuesprops"},"ListIssuesProps")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("i",null,"(Optional1)"))))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"Promise","<",(0,a.kt)("a",{parentName:"p",href:"/docs/api/linear.listissuesresponse"},"ListIssuesResponse"),">"),(0,a.kt)("h2",{id:"example-1"},"Example 1"),(0,a.kt)("p",null,"List issues created since date"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'const response = await linear.listIssues({\n  filter: { createdAt: { gt: "<date>" } }\n});\n\nconst issues = response.data.issues;\n')),(0,a.kt)("h2",{id:"example-2"},"Example 2"),(0,a.kt)("p",null,"Get issue with identifier LY-123"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'const response = await linear.listIssues({\n  filter: {\n    team: { key: { eq: "LY" } },\n    number: { eq: 123 },\n  },\n});\n\nconst issue = response.data.issues[0];\n')))}c.isMDXComponent=!0}}]);