"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[12633],{57522:(t,e,r)=>{r.d(e,{Zo:()=>c,kt:()=>d});var a=r(29901);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function o(t,e){if(null==t)return{};var r,a,n=function(t,e){if(null==t)return{};var r,a,n={},l=Object.keys(t);for(a=0;a<l.length;a++)r=l[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)r=l[a],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var i=a.createContext({}),p=function(t){var e=a.useContext(i),r=e;return t&&(r="function"==typeof t?t(e):u(u({},e),t)),r},c=function(t){var e=p(t.components);return a.createElement(i.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},h=a.forwardRef((function(t,e){var r=t.components,n=t.mdxType,l=t.originalType,i=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),h=p(r),d=n,g=h["".concat(i,".").concat(d)]||h[d]||s[d]||l;return r?a.createElement(g,u(u({ref:e},c),{},{components:r})):a.createElement(g,u({ref:e},c))}));function d(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var l=r.length,u=new Array(l);u[0]=h;var o={};for(var i in e)hasOwnProperty.call(e,i)&&(o[i]=e[i]);o.originalType=t,o.mdxType="string"==typeof t?t:n,u[1]=o;for(var p=2;p<l;p++)u[p]=r[p];return a.createElement.apply(null,u)}return a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},52514:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>i,contentTitle:()=>u,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=r(14090),n=(r(29901),r(57522));const l={},u=void 0,o={unversionedId:"api/github.githuboauth",id:"api/github.githuboauth",title:"github.githuboauth",description:"Home &gt; @runlightyear/github &gt; GitHubOAuth",source:"@site/docs/api/github.githuboauth.md",sourceDirName:"api",slug:"/api/github.githuboauth",permalink:"/docs/api/github.githuboauth",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"GitHubOAuth class",id:"githuboauth-class",level:2},{value:"Constructors",id:"constructors",level:2},{value:"Properties",id:"properties",level:2},{value:"Methods",id:"methods",level:2}],c={toc:p};function s(t){let{components:e,...r}=t;return(0,n.kt)("wrapper",(0,a.Z)({},c,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/github.githuboauth"},"GitHubOAuth")),(0,n.kt)("h2",{id:"githuboauth-class"},"GitHubOAuth class"),(0,n.kt)("p",null,"Connector to the GitHub OAuth2 API"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"declare class GitHubOAuth extends OAuthConnector \n")),(0,n.kt)("p",null,"Extends: "),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/lightyear.oauthconnector"},"OAuthConnector")),(0,n.kt)("h2",{id:"constructors"},"Constructors"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Constructor"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.githuboauth._constructor_"},"(constructor)(props)")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Constructs a new instance of the ",(0,n.kt)("code",null,"GitHubOAuth")," class")))),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Property"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.githuboauth.scopes"},"scopes")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Array","<",(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.githubscope"},"GitHubScope"),">"),(0,n.kt)("td",{parentName:"tr",align:null})))),(0,n.kt)("h2",{id:"methods"},"Methods"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Method"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.githuboauth.getaccesstokenurl"},"getAccessTokenUrl()")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.githuboauth.getauthrequesturlbase"},"getAuthRequestUrlBase()")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null})),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/github.githuboauth.getauthrequesturlparams"},"getAuthRequestUrlParams()")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null})))))}s.isMDXComponent=!0}}]);