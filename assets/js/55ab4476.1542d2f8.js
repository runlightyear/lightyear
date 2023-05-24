"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[70963],{57522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>b});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var o=n.createContext({}),p=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=p(r),b=a,d=m["".concat(o,".").concat(b)]||m[b]||c[b]||i;return r?n.createElement(d,u(u({ref:t},s),{},{components:r})):n.createElement(d,u({ref:t},s))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,u=new Array(i);u[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,u[1]=l;for(var p=2;p<i;p++)u[p]=r[p];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},24965:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>u,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=r(14090),a=(r(29901),r(57522));const i={},u=void 0,l={unversionedId:"api/github.github.onpullrequestreview",id:"api/github.github.onpullrequestreview",title:"github.github.onpullrequestreview",description:"Home &gt; @runlightyear/github &gt; GitHub &gt; onPullRequestReview",source:"@site/docs/api/github.github.onpullrequestreview.md",sourceDirName:"api",slug:"/api/github.github.onpullrequestreview",permalink:"/docs/api/github.github.onpullrequestreview",draft:!1,tags:[],version:"current",frontMatter:{}},o={},p=[{value:"GitHub.onPullRequestReview() method",id:"githubonpullrequestreview-method",level:2},{value:"Parameters",id:"parameters",level:2}],s={toc:p};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github"},"GitHub")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/github.github.onpullrequestreview"},"onPullRequestReview")),(0,a.kt)("h2",{id:"githubonpullrequestreview-method"},"GitHub.onPullRequestReview() method"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,a.kt)("p",null,"This event occurs when there is activity on a pull request."),(0,a.kt)("p",null,"For activity related to pull request reviews, pull request review comments, pull request comments, or pull request review threads, use the pull","_","request","_","review, pull","_","request","_","review","_","comment, issue","_","comment, or pull","_","request","_","review","_","thread events instead."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"static onPullRequestReview(props: GitHubListenerProps<PullRequestReviewPayload>): {\n        webhook: string;\n        action: string;\n    };\n")),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"props"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.githublistenerprops"},"GitHubListenerProps"),"<",(0,a.kt)("a",{parentName:"td",href:"/docs/api/github.pullrequestreviewpayload"},"PullRequestReviewPayload"),">"),(0,a.kt)("td",{parentName:"tr",align:null})))),(0,a.kt)("b",null,"Returns:"),(0,a.kt)("p",null,"{ webhook: string; action: string; }"))}c.isMDXComponent=!0}}]);