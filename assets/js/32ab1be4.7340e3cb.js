"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[85511],{62757:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>y});var r=t(67308);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(t),f=a,y=u["".concat(s,".").concat(f)]||u[f]||d[f]||o;return t?r.createElement(y,i(i({ref:n},p),{},{components:t})):r.createElement(y,i({ref:n},p))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=f;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},7656:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=t(94790),a=(t(67308),t(62757));const o={},i=void 0,l={unversionedId:"api/salesforce.fieldtype",id:"api/salesforce.fieldtype",title:"salesforce.fieldtype",description:"Home &gt; @runlightyear/salesforce &gt; FieldType",source:"@site/docs/api/salesforce.fieldtype.md",sourceDirName:"api",slug:"/api/salesforce.fieldtype",permalink:"/docs/api/salesforce.fieldtype",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"FieldType type",id:"fieldtype-type",level:2}],p={toc:c},u="wrapper";function d(e){let{components:n,...t}=e;return(0,a.yg)(u,(0,r.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce"},"@runlightyear/salesforce")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/salesforce.fieldtype"},"FieldType")),(0,a.yg)("h2",{id:"fieldtype-type"},"FieldType type"),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},'declare type FieldType = \n/**\n * String values.\n */\n"string"\n/**\n * Boolean (true / false) values.\n */\n | "boolean"\n/**\n * Integer values.\n */\n | "int"\n/**\n * Double values.\n */\n | "double"\n/**\n * Date values.\n */\n | "date"\n/**\n * Date and time values.\n */\n | "datetime"\n/**\n * Base64-encoded arbitrary binary data (of type base64Binary). Used for Attachment, Document, and Scontrol objects.\n */\n | "base64"\n/**\n * Primary key field for the object. For information on IDs, see Field Types.\n */\n | "ID"\n/**\n *  Cross-references to a different object. Analogous to a foreign key field in SQL.\n */\n | "reference"\n/**\n * Currency values.\n */\n | "currency"\n/**\n * String that is displayed as a multiline text field.\n */\n | "textarea"\n/**\n * Percentage values.\n */\n | "percent"\n/**\n * Phone numbers. Values can include alphabetic characters. Client applications are responsible for phone number formatting.\n */\n | "phone"\n/**\n * URL values. Client applications should commonly display these as hyperlinks. If Field.extraTypeInfo is imageurl, the URL references an image, and can be displayed as an image instead.\n */\n | "url"\n/**\n * Email addresses.\n */\n | "email"\n/**\n * Comboboxes, which provide a set of enumerated values and allow the user to specify a value not in the list.\n */\n | "combobox"\n/**\n * Single-select picklists, which provide a set of enumerated values from which only one value can be selected.\n */\n | "picklist"\n/**\n * Multi-select picklists, which provide a set of enumerated values from which multiple values can be selected.\n */\n | "multipicklist"\n/**\n * Values can be any of these types: string, picklist, boolean, int, double, percent, ID, date, dateTime, url, or email.\n */\n | "anyType"\n/**\n * Geolocation values, including latitude and longitude, for custom geolocation fields on custom objects.\n */\n | "location";\n')))}d.isMDXComponent=!0}}]);