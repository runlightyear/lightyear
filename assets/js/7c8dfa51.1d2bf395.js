"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[90582],{57522:(e,r,n)=>{n.d(r,{Zo:()=>u,kt:()=>g});var t=n(29901);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function i(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function s(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=t.createContext({}),p=function(e){var r=t.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):i(i({},r),e)),n},u=function(e){var r=p(e.components);return t.createElement(l.Provider,{value:r},e.children)},c={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},m=t.forwardRef((function(e,r){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=p(n),g=a,f=m["".concat(l,".").concat(g)]||m[g]||c[g]||o;return n?t.createElement(f,i(i({ref:r},u),{},{components:n})):t.createElement(f,i({ref:r},u))}));function g(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return t.createElement.apply(null,i)}return t.createElement.apply(null,n)}m.displayName="MDXCreateElement"},42098:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var t=n(14090),a=(n(29901),n(57522));const o={},i=void 0,s={unversionedId:"api/gsheets.valuerange.majordimension",id:"api/gsheets.valuerange.majordimension",title:"gsheets.valuerange.majordimension",description:"Home &gt; @runlightyear/gsheets &gt; ValueRange &gt; majorDimension",source:"@site/docs/api/gsheets.valuerange.majordimension.md",sourceDirName:"api",slug:"/api/gsheets.valuerange.majordimension",permalink:"/docs/api/gsheets.valuerange.majordimension",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"ValueRange.majorDimension property",id:"valuerangemajordimension-property",level:2}],u={toc:p};function c(e){let{components:r,...n}=e;return(0,a.kt)("wrapper",(0,t.Z)({},u,n,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gsheets"},"@runlightyear/gsheets")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gsheets.valuerange"},"ValueRange")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/gsheets.valuerange.majordimension"},"majorDimension")),(0,a.kt)("h2",{id:"valuerangemajordimension-property"},"ValueRange.majorDimension property"),(0,a.kt)("p",null,"The major dimension of the values."),(0,a.kt)("p",null,"For output, if the spreadsheet data is: A1=1,B1=2,A2=3,B2=4, then requesting range=A1:B2,majorDimension=ROWS will return ","[","[","1,2","]",",","[","3,4","]","]",", whereas requesting range=A1:B2,majorDimension=COLUMNS will return ","[","[","1,3","]",",","[","2,4","]","]","."),(0,a.kt)("p",null,"For input, with range=A1:B2,majorDimension=ROWS then ","[","[","1,2","]",",","[","3,4","]","]"," will set A1=1,B1=2,A2=3,B2=4. With range=A1:B2,majorDimension=COLUMNS then ","[","[","1,2","]",",","[","3,4","]","]"," will set A1=1,B1=3,A2=2,B2=4."),(0,a.kt)("p",null,"When writing, if this field is not set, it defaults to ROWS."),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"majorDimension?: Dimension;\n")))}c.isMDXComponent=!0}}]);