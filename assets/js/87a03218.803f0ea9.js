"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[68527],{57522:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(29901);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},l=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=u(n),d=o,f=l["".concat(c,".").concat(d)]||l[d]||m[d]||a;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=l;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}l.displayName="MDXCreateElement"},23686:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var r=n(14090),o=(n(29901),n(57522));const a={},i=void 0,s={unversionedId:"api/github.issuecomment",id:"api/github.issuecomment",title:"github.issuecomment",description:"Home &gt; @runlightyear/github &gt; IssueComment",source:"@site/docs/api/github.issuecomment.md",sourceDirName:"api",slug:"/api/github.issuecomment",permalink:"/docs/api/github.issuecomment",draft:!1,tags:[],version:"current",frontMatter:{}},c={},u=[{value:"IssueComment type",id:"issuecomment-type",level:2}],p={toc:u};function m(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.issuecomment"},"IssueComment")),(0,o.kt)("h2",{id:"issuecomment-type"},"IssueComment type"),(0,o.kt)("p",null,"Documentation: ",(0,o.kt)("a",{parentName:"p",href:"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads%5C#issue%5C_comment"},"https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads\\#issue\\_comment")),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'declare type IssueComment = {\n    authorAssociation: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";\n    body: string;\n    createdAt: string;\n    htmlUrl: string;\n    id: number;\n    issueUrl: string;\n    nodeId: string;\n    performedViaGithubApp: object;\n    reactions: Reactions;\n    updatedAt: string;\n    url: string;\n    user: User;\n};\n')),(0,o.kt)("b",null,"References:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.reactions"},"Reactions"),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/github.user"},"User")))}m.isMDXComponent=!0}}]);