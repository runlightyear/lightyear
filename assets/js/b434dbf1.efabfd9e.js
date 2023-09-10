"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[40930],{57522:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>f});var p=t(29901);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);r&&(p=p.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,p)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?n(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,p,o=function(e,r){if(null==e)return{};var t,p,o={},n=Object.keys(e);for(p=0;p<n.length;p++)t=n[p],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(p=0;p<n.length;p++)t=n[p],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=p.createContext({}),c=function(e){var r=p.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},u=function(e){var r=c(e.components);return p.createElement(s.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return p.createElement(p.Fragment,{},r)}},d=p.forwardRef((function(e,r){var t=e.components,o=e.mdxType,n=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=c(t),f=o,y=d["".concat(s,".").concat(f)]||d[f]||l[f]||n;return t?p.createElement(y,a(a({ref:r},u),{},{components:t})):p.createElement(y,a({ref:r},u))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var n=t.length,a=new Array(n);a[0]=d;var i={};for(var s in r)hasOwnProperty.call(r,s)&&(i[s]=r[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var c=2;c<n;c++)a[c]=t[c];return p.createElement.apply(null,a)}return p.createElement.apply(null,t)}d.displayName="MDXCreateElement"},36242:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>a,default:()=>l,frontMatter:()=>n,metadata:()=>i,toc:()=>c});var p=t(14090),o=(t(29901),t(57522));const n={},a=void 0,i={unversionedId:"api/notion.updatepagepropertiesprops.properties",id:"api/notion.updatepagepropertiesprops.properties",title:"notion.updatepagepropertiesprops.properties",description:"Home &gt; @runlightyear/notion &gt; UpdatePagePropertiesProps &gt; properties",source:"@site/docs/api/notion.updatepagepropertiesprops.properties.md",sourceDirName:"api",slug:"/api/notion.updatepagepropertiesprops.properties",permalink:"/docs/api/notion.updatepagepropertiesprops.properties",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"UpdatePagePropertiesProps.properties property",id:"updatepagepropertiespropsproperties-property",level:2}],u={toc:c};function l(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,p.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion.updatepagepropertiesprops"},"UpdatePagePropertiesProps")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/notion.updatepagepropertiesprops.properties"},"properties")),(0,o.kt)("h2",{id:"updatepagepropertiespropsproperties-property"},"UpdatePagePropertiesProps.properties property"),(0,o.kt)("p",null,"The property values to update for the page. The keys are the names or IDs of the property and the values are property values. If a page property ID is not included, then it is not changed."),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"properties?: PagePropertiesInput;\n")))}l.isMDXComponent=!0}}]);