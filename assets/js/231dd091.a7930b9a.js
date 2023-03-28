"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[41090],{57522:(e,r,n)=>{n.d(r,{Zo:()=>l,kt:()=>g});var t=n(29901);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function i(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function p(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=t.createContext({}),c=function(e){var r=t.useContext(s),n=r;return e&&(n="function"==typeof e?e(r):i(i({},r),e)),n},l=function(e){var r=c(e.components);return t.createElement(s.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},f=t.forwardRef((function(e,r){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),f=c(n),g=o,m=f["".concat(s,".").concat(g)]||f[g]||u[g]||a;return n?t.createElement(m,i(i({ref:r},l),{},{components:n})):t.createElement(m,i({ref:r},l))}));function g(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var p={};for(var s in r)hasOwnProperty.call(r,s)&&(p[s]=r[s]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var c=2;c<a;c++)i[c]=n[c];return t.createElement.apply(null,i)}return t.createElement.apply(null,n)}f.displayName="MDXCreateElement"},76919:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>p,toc:()=>c});var t=n(14090),o=(n(29901),n(57522));const a={},i=void 0,p={unversionedId:"api/linear.userresponse.organization",id:"api/linear.userresponse.organization",title:"linear.userresponse.organization",description:"Home &gt; @runlightyear/linear &gt; UserResponse &gt; organization",source:"@site/docs/api/linear.userresponse.organization.md",sourceDirName:"api",slug:"/api/linear.userresponse.organization",permalink:"/docs/api/linear.userresponse.organization",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"UserResponse.organization property",id:"userresponseorganization-property",level:2}],l={toc:c};function u(e){let{components:r,...n}=e;return(0,o.kt)("wrapper",(0,t.Z)({},l,n,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/linear.userresponse"},"UserResponse")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/linear.userresponse.organization"},"organization")),(0,o.kt)("h2",{id:"userresponseorganization-property"},"UserResponse.organization property"),(0,o.kt)("p",null,"Organization the user belongs to."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"organization: {\n        id: ID;\n        name: string;\n    };\n")))}u.isMDXComponent=!0}}]);