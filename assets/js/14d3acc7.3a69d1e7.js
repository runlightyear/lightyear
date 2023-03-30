"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[27541],{57522:(e,n,r)=>{r.d(n,{Zo:()=>u,kt:()=>g});var t=r(29901);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function i(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=t.createContext({}),p=function(e){var n=t.useContext(s),r=n;return e&&(r="function"==typeof e?e(n):c(c({},n),e)),r},u=function(e){var n=p(e.components);return t.createElement(s.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},f=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=p(r),g=a,d=f["".concat(s,".").concat(g)]||f[g]||l[g]||o;return r?t.createElement(d,c(c({ref:n},u),{},{components:r})):t.createElement(d,c({ref:n},u))}));function g(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=f;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var p=2;p<o;p++)c[p]=r[p];return t.createElement.apply(null,c)}return t.createElement.apply(null,r)}f.displayName="MDXCreateElement"},68668:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>s,contentTitle:()=>c,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var t=r(14090),a=(r(29901),r(57522));const o={},c=void 0,i={unversionedId:"api/gcal.eventresource.conferencedata",id:"api/gcal.eventresource.conferencedata",title:"gcal.eventresource.conferencedata",description:"Home &gt; @runlightyear/gcal &gt; EventResource &gt; conferenceData",source:"@site/docs/api/gcal.eventresource.conferencedata.md",sourceDirName:"api",slug:"/api/gcal.eventresource.conferencedata",permalink:"/docs/api/gcal.eventresource.conferencedata",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"EventResource.conferenceData property",id:"eventresourceconferencedata-property",level:2}],u={toc:p};function l(e){let{components:n,...r}=e;return(0,a.kt)("wrapper",(0,t.Z)({},u,r,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal"},"@runlightyear/gcal")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.eventresource"},"EventResource")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gcal.eventresource.conferencedata"},"conferenceData")),(0,a.kt)("h2",{id:"eventresourceconferencedata-property"},"EventResource.conferenceData property"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"conferenceData: {\n        createRequest: {\n            requestId: string;\n            conferenceSolutionKey: {\n                type: string;\n            };\n            status: {\n                statusCode: string;\n            };\n        };\n        entryPoints: [\n            {\n                entryPointType: string;\n                uri: string;\n                label: string;\n                pin: string;\n                accessCode: string;\n                meetingCode: string;\n                passcode: string;\n                password: string;\n            }\n        ];\n        conferenceSolution: {\n            key: {\n                type: string;\n            };\n            name: string;\n            iconUri: string;\n        };\n        conferenceId: string;\n        signature: string;\n        notes: string;\n    };\n")))}l.isMDXComponent=!0}}]);