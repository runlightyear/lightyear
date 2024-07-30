"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1245],{62757:(e,t,r)=>{r.d(t,{xA:()=>d,yg:()=>c});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),u=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=u(e.components);return a.createElement(p.Provider,{value:t},e.children)},s="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),s=u(r),g=n,c=s["".concat(p,".").concat(g)]||s[g]||y[g]||l;return r?a.createElement(c,i(i({ref:t},d),{},{components:r})):a.createElement(c,i({ref:t},d))}));function c(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,i=new Array(l);i[0]=g;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[s]="string"==typeof e?e:n,i[1]=o;for(var u=2;u<l;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}g.displayName="MDXCreateElement"},32072:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>y,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var a=r(94790),n=(r(67308),r(62757));const l={},i=void 0,o={unversionedId:"api/github.pullrequestreviewpayload",id:"api/github.pullrequestreviewpayload",title:"github.pullrequestreviewpayload",description:"Home &gt; @runlightyear/github &gt; PullRequestReviewPayload",source:"@site/docs/api/github.pullrequestreviewpayload.md",sourceDirName:"api",slug:"/api/github.pullrequestreviewpayload",permalink:"/docs/api/github.pullrequestreviewpayload",draft:!1,tags:[],version:"current",frontMatter:{}},p={},u=[{value:"PullRequestReviewPayload interface",id:"pullrequestreviewpayload-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],d={toc:u},s="wrapper";function y(e){let{components:t,...r}=e;return(0,n.yg)(s,(0,a.A)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.pullrequestreviewpayload"},"PullRequestReviewPayload")),(0,n.yg)("h2",{id:"pullrequestreviewpayload-interface"},"PullRequestReviewPayload interface"),(0,n.yg)("p",null,"Documentation: ",(0,n.yg)("a",{parentName:"p",href:"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads%5C#pull%5C_request%5C_review"},"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads\\#pull\\_request\\_review")),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"interface PullRequestReviewPayload extends CommonPayload \n")),(0,n.yg)("b",null,"Extends:"),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api/github.commonpayload"},"CommonPayload")),(0,n.yg)("h2",{id:"required-properties"},"Required Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.pullrequestreviewpayload.action"},"action")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},'"submitted" /',"*","*"," ","*"," The body of a review has been edited. ","*","/ ","|",' "edited" /',"*","*"," ","*"," A review has been dismissed. ","*","/ ","|",' "dismissed"'),(0,n.yg)("td",{parentName:"tr",align:null},"The action that was performed.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.pullrequestreviewpayload.changes"},"changes")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"{ body: { from: string; }; }"),(0,n.yg)("td",{parentName:"tr",align:null})),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.pullrequestreviewpayload.pullrequest"},"pullRequest")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"object"),(0,n.yg)("td",{parentName:"tr",align:null},"The pull request the review pertains to.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/github.pullrequestreviewpayload.review"},"review")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"object"),(0,n.yg)("td",{parentName:"tr",align:null},"The review that was affected.")))))}y.isMDXComponent=!0}}]);