"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[94075],{57522:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),b=c(r),d=o,y=b["".concat(s,".").concat(d)]||b[d]||l[d]||a;return r?n.createElement(y,p(p({ref:t},u),{},{components:r})):n.createElement(y,p({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,p=new Array(a);p[0]=b;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,p[1]=i;for(var c=2;c<a;c++)p[c]=r[c];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},93468:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>l,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(14090),o=(r(29901),r(57522));const a={},p=void 0,i={unversionedId:"api/github.createrepositorywebhookresponse.data",id:"api/github.createrepositorywebhookresponse.data",title:"github.createrepositorywebhookresponse.data",description:"Home &gt; @runlightyear/github &gt; CreateRepositoryWebhookResponse &gt; data",source:"@site/docs/api/github.createrepositorywebhookresponse.data.md",sourceDirName:"api",slug:"/api/github.createrepositorywebhookresponse.data",permalink:"/docs/api/github.createrepositorywebhookresponse.data",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"CreateRepositoryWebhookResponse.data property",id:"createrepositorywebhookresponsedata-property",level:2}],u={toc:c};function l(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.createrepositorywebhookresponse"},"CreateRepositoryWebhookResponse")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.createrepositorywebhookresponse.data"},"data")),(0,o.kt)("h2",{id:"createrepositorywebhookresponsedata-property"},"CreateRepositoryWebhookResponse.data property"),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"data: {\n        type: string;\n        id: number;\n        name: string;\n        active: boolean;\n        events: WebhookEvent[];\n        config: object;\n        updatedAt: string;\n        createdAt: string;\n        url: string;\n        testUrl: string;\n        pingUrl: string;\n        deliveriesUrl: string;\n        lastResponse: object;\n    };\n")))}l.isMDXComponent=!0}}]);