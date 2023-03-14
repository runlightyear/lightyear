"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[48201],{57522:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>s});var r=a(29901);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=r.createContext({}),c=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),b=c(a),s=n,y=b["".concat(i,".").concat(s)]||b[s]||u[s]||o;return a?r.createElement(y,l(l({ref:t},d),{},{components:a})):r.createElement(y,l({ref:t},d))}));function s(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=b;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,l[1]=p;for(var c=2;c<o;c++)l[c]=a[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}b.displayName="MDXCreateElement"},3506:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var r=a(14090),n=(a(29901),a(57522));const o={},l=void 0,p={unversionedId:"api/github.labelpayload",id:"api/github.labelpayload",title:"github.labelpayload",description:"Home &gt; @runlightyear/github &gt; LabelPayload",source:"@site/docs/api/github.labelpayload.md",sourceDirName:"api",slug:"/api/github.labelpayload",permalink:"/docs/api/github.labelpayload",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"LabelPayload type",id:"labelpayload-type",level:2}],d={toc:c};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.labelpayload"},"LabelPayload")),(0,n.kt)("h2",{id:"labelpayload-type"},"LabelPayload type"),(0,n.kt)("p",null,"Documentation: ",(0,n.kt)("a",{parentName:"p",href:"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads%5C#label"},"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads\\#label")),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"declare type LabelPayload = LabelCreatedPayload | LabelDeletedPayload | LabelEditedPayload;\n")),(0,n.kt)("b",null,"References:"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.labelcreatedpayload"},"LabelCreatedPayload"),", ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.labeldeletedpayload"},"LabelDeletedPayload"),", ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.labeleditedpayload"},"LabelEditedPayload")))}u.isMDXComponent=!0}}]);