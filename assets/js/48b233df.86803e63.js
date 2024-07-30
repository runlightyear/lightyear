"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[28351],{62757:(e,n,r)=>{r.d(n,{xA:()=>u,yg:()=>g});var t=r(67308);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function p(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function l(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=t.createContext({}),i=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):p(p({},n),e)),r},u=function(e){var n=i(e.components);return t.createElement(c.Provider,{value:n},e.children)},s="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=i(r),m=a,g=s["".concat(c,".").concat(m)]||s[m]||y[m]||o;return r?t.createElement(g,p(p({ref:n},u),{},{components:r})):t.createElement(g,p({ref:n},u))}));function g(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=m;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[s]="string"==typeof e?e:a,p[1]=l;for(var i=2;i<o;i++)p[i]=r[i];return t.createElement.apply(null,p)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},46430:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>p,default:()=>y,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var t=r(94790),a=(r(67308),r(62757));const o={},p=void 0,l={unversionedId:"api/openai.openai.cancelrun",id:"api/openai.openai.cancelrun",title:"openai.openai.cancelrun",description:"Home &gt; @runlightyear/openai &gt; OpenAI &gt; cancelRun",source:"@site/docs/api/openai.openai.cancelrun.md",sourceDirName:"api",slug:"/api/openai.openai.cancelrun",permalink:"/docs/api/openai.openai.cancelrun",draft:!1,tags:[],version:"current",frontMatter:{}},c={},i=[{value:"OpenAI.cancelRun() method",id:"openaicancelrun-method",level:2},{value:"Parameters",id:"parameters",level:2}],u={toc:i},s="wrapper";function y(e){let{components:n,...r}=e;return(0,a.yg)(s,(0,t.A)({},u,r,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai"},"@runlightyear/openai")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai.openai"},"OpenAI")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/openai.openai.cancelrun"},"cancelRun")),(0,a.yg)("h2",{id:"openaicancelrun-method"},"OpenAI.cancelRun() method"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"This API is in beta and may contain contain bugs. Can be used in production with caution.")),(0,a.yg)("p",null,"Cancel a run"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"cancelRun(props: CancelRunProps): Promise<CancelRunResponse>;\n")),(0,a.yg)("h2",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Parameter"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"props"),(0,a.yg)("td",{parentName:"tr",align:null},"CancelRunProps"),(0,a.yg)("td",{parentName:"tr",align:null})))),(0,a.yg)("b",null,"Returns:"),(0,a.yg)("p",null,"Promise","<","CancelRunResponse",">"))}y.isMDXComponent=!0}}]);