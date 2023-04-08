"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[18816],{57522:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>c});var n=a(29901);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},p=Object.keys(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),i=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=i(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,p=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=i(a),c=r,g=m["".concat(s,".").concat(c)]||m[c]||u[c]||p;return a?n.createElement(g,l(l({ref:t},d),{},{components:a})):n.createElement(g,l({ref:t},d))}));function c(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=a.length,l=new Array(p);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var i=2;i<p;i++)l[i]=a[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},82034:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>p,metadata:()=>o,toc:()=>i});var n=a(14090),r=(a(29901),a(57522));const p={},l=void 0,o={unversionedId:"api/gsheets.appendvaluesprops",id:"api/gsheets.appendvaluesprops",title:"gsheets.appendvaluesprops",description:"Home &gt; @runlightyear/gsheets &gt; AppendValuesProps",source:"@site/docs/api/gsheets.appendvaluesprops.md",sourceDirName:"api",slug:"/api/gsheets.appendvaluesprops",permalink:"/docs/api/gsheets.appendvaluesprops",draft:!1,tags:[],version:"current",frontMatter:{}},s={},i=[{value:"AppendValuesProps interface",id:"appendvaluesprops-interface",level:2},{value:"Required Properties",id:"required-properties",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],d={toc:i};function u(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gsheets"},"@runlightyear/gsheets")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/gsheets.appendvaluesprops"},"AppendValuesProps")),(0,r.kt)("h2",{id:"appendvaluesprops-interface"},"AppendValuesProps interface"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"interface AppendValuesProps \n")),(0,r.kt)("h2",{id:"required-properties"},"Required Properties"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.range"},"range")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"The A1 notation of a range to search for a logical table of data. Values are appended after the last row of the table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.spreadsheetid"},"spreadsheetId")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"The ID of the spreadsheet to update.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.valueinputoption"},"valueInputOption")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.valueinputoption"},"ValueInputOption")),(0,r.kt)("td",{parentName:"tr",align:null},"How the input data should be interpreted.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.valuerange"},"valueRange")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.valuerange"},"ValueRange")),(0,r.kt)("td",{parentName:"tr",align:null},"The values to append.")))),(0,r.kt)("h2",{id:"optional-properties"},"Optional Properties"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.includevaluesinresponse"},"includeValuesInResponse?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"Determines if the update response should include the values of the cells that were appended. By default, responses do not include the updated values.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.insertdataoption"},"insertDataOption?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.insertdataoption"},"InsertDataOption")),(0,r.kt)("td",{parentName:"tr",align:null},"How the input data should be inserted.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.responsedatetimerenderoption"},"responseDateTimeRenderOption?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.datetimerenderoption"},"DateTimeRenderOption")),(0,r.kt)("td",{parentName:"tr",align:null},"Determines how dates, times, and durations in the response should be rendered. This is ignored if responseValueRenderOption is FORMATTED","_","VALUE. The default dateTime render option is SERIAL","_","NUMBER.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.appendvaluesprops.responsevaluerenderoption"},"responseValueRenderOption?")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/gsheets.valuerenderoption"},"ValueRenderOption")),(0,r.kt)("td",{parentName:"tr",align:null},"Determines how values in the response should be rendered. The default render option is FORMATTED","_","VALUE.")))))}u.isMDXComponent=!0}}]);