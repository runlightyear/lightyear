"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9731],{7522:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>f});var r=a(9901);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=r.createContext({}),p=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},s=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,i=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=p(a),f=n,m=d["".concat(i,".").concat(f)]||d[f]||u[f]||l;return a?r.createElement(m,c(c({ref:t},s),{},{components:a})):r.createElement(m,c({ref:t},s))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,c=new Array(l);c[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:n,c[1]=o;for(var p=2;p<l;p++)c[p]=a[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},3092:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var r=a(4090),n=(a(9901),a(7522));const l={},c=void 0,o={unversionedId:"api/slack.slack.defineauth",id:"api/slack.slack.defineauth",title:"slack.slack.defineauth",description:"Home &gt; @runlightyear/slack &gt; Slack &gt; defineAuth",source:"@site/docs/api/slack.slack.defineauth.md",sourceDirName:"api",slug:"/api/slack.slack.defineauth",permalink:"/docs/api/slack.slack.defineauth",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/slack.slack.defineauth.md",tags:[],version:"current",frontMatter:{}},i={},p=[{value:"Slack.defineAuth() method",id:"slackdefineauth-method",level:2},{value:"Parameters",id:"parameters",level:2}],s={toc:p};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slack"},"Slack")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/slack.slack.defineauth"},"defineAuth")),(0,n.kt)("h2",{id:"slackdefineauth-method"},"Slack.defineAuth() method"),(0,n.kt)("p",null,"Define a slack auth"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"static defineAuth(options: {\n        name: string;\n        scopes: SlackScope[];\n    }): string;\n")),(0,n.kt)("h2",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"options"),(0,n.kt)("td",{parentName:"tr",align:null},"{ name: string; scopes: SlackScope","[","]","; }"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("b",null,"Returns:"),(0,n.kt)("p",null,"string"))}u.isMDXComponent=!0}}]);