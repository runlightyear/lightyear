"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[15934],{62757:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>g});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),p=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(r),y=n,g=u["".concat(s,".").concat(y)]||u[y]||f[y]||o;return r?a.createElement(g,l(l({ref:t},c),{},{components:r})):a.createElement(g,l({ref:t},c))}));function g(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=y;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:n,l[1]=i;for(var p=2;p<o;p++)l[p]=r[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}y.displayName="MDXCreateElement"},51384:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>f,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=r(94790),n=(r(67308),r(62757));const o={},l=void 0,i={unversionedId:"api/linear.linear.listworkflowstates",id:"api/linear.linear.listworkflowstates",title:"linear.linear.listworkflowstates",description:"Home &gt; @runlightyear/linear &gt; Linear &gt; listWorkflowStates",source:"@site/docs/api/linear.linear.listworkflowstates.md",sourceDirName:"api",slug:"/api/linear.linear.listworkflowstates",permalink:"/docs/api/linear.linear.listworkflowstates",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"Linear.listWorkflowStates() method",id:"linearlistworkflowstates-method",level:2},{value:"Parameters",id:"parameters",level:2}],c={toc:p},u="wrapper";function f(e){let{components:t,...r}=e;return(0,n.yg)(u,(0,a.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear.linear"},"Linear")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear.linear.listworkflowstates"},"listWorkflowStates")),(0,n.yg)("h2",{id:"linearlistworkflowstates-method"},"Linear.listWorkflowStates() method"),(0,n.yg)("blockquote",null,(0,n.yg)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,n.yg)("p",null,"List workflow states"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"listWorkflowStates(props?: ListWorkflowStatesProps): Promise<ListWorkflowStatesResponse>;\n")),(0,n.yg)("h2",{id:"parameters"},"Parameters"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"props"),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.listworkflowstatesprops"},"ListWorkflowStatesProps")),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("i",null,"(Optional1)"))))),(0,n.yg)("b",null,"Returns:"),(0,n.yg)("p",null,"Promise","<",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear.listworkflowstatesresponse"},"ListWorkflowStatesResponse"),">"))}f.isMDXComponent=!0}}]);