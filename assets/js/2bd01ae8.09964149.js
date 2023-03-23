"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[21823],{57522:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(29901);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),d=o,b=m["".concat(s,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(b,i(i({ref:t},c),{},{components:n})):r.createElement(b,i({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},25309:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(14090),o=(n(29901),n(57522));const a={},i=void 0,l={unversionedId:"api/github.milestone",id:"api/github.milestone",title:"github.milestone",description:"Home &gt; @runlightyear/github &gt; Milestone",source:"@site/docs/api/github.milestone.md",sourceDirName:"api",slug:"/api/github.milestone",permalink:"/docs/api/github.milestone",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"Milestone type",id:"milestone-type",level:2}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.milestone"},"Milestone")),(0,o.kt)("h2",{id:"milestone-type"},"Milestone type"),(0,o.kt)("p",null,"Documentation: ",(0,o.kt)("a",{parentName:"p",href:"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads%5C#milestone"},"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads\\#milestone")),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'declare type Milestone = {\n    closedAt: string | null;\n    closedIssues: number;\n    createdAt: string;\n    creator: User | null;\n    description: string | null;\n    dueOn: string | null;\n    htmlUrl: string;\n    id: number;\n    labelsUrl: string;\n    nodeId: string;\n    number: number;\n    openIssues: number;\n    state: "open" | "closed";\n    title: string;\n    updatedAt: string;\n    url: string;\n};\n')),(0,o.kt)("b",null,"References:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.user"},"User")))}u.isMDXComponent=!0}}]);