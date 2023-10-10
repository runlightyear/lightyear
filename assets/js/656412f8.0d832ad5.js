"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2840],{57522:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>f});var n=r(29901);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),g=s(r),f=o,d=g["".concat(p,".").concat(f)]||g[f]||u[f]||a;return r?n.createElement(d,i(i({ref:t},l),{},{components:r})):n.createElement(d,i({ref:t},l))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=g;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},86684:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var n=r(14090),o=(r(29901),r(57522));const a={},i=void 0,c={unversionedId:"api/slack.dispatchactionconfigurationobject.triggeractionson",id:"api/slack.dispatchactionconfigurationobject.triggeractionson",title:"slack.dispatchactionconfigurationobject.triggeractionson",description:"Home &gt; @runlightyear/slack &gt; DispatchActionConfigurationObject &gt; triggerActionsOn",source:"@site/docs/api/slack.dispatchactionconfigurationobject.triggeractionson.md",sourceDirName:"api",slug:"/api/slack.dispatchactionconfigurationobject.triggeractionson",permalink:"/docs/api/slack.dispatchactionconfigurationobject.triggeractionson",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[{value:"DispatchActionConfigurationObject.triggerActionsOn property",id:"dispatchactionconfigurationobjecttriggeractionson-property",level:2}],l={toc:s};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.dispatchactionconfigurationobject"},"DispatchActionConfigurationObject")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/slack.dispatchactionconfigurationobject.triggeractionson"},"triggerActionsOn")),(0,o.kt)("h2",{id:"dispatchactionconfigurationobjecttriggeractionson-property"},"DispatchActionConfigurationObject.triggerActionsOn property"),(0,o.kt)("p",null,"An array of interaction types that you would like to receive a block","_","actions payload for. Should be one or both of:"),(0,o.kt)("p",null,"on","_","enter","_","pressed \u2014 payload is dispatched when user presses the enter key while the input is in focus. Hint text will appear underneath the input explaining to the user to press enter to submit."),(0,o.kt)("p",null,"on","_","character","_","entered \u2014 payload is dispatched when a character is entered (or removed) in the input."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'triggerActionsOn?: Array<"on_enter_pressed" | "on_character_entered">;\n')))}u.isMDXComponent=!0}}]);