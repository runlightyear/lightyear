"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[95661],{57522:(t,e,a)=>{a.d(e,{Zo:()=>c,kt:()=>f});var r=a(29901);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function p(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},l=Object.keys(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var o=r.createContext({}),m=function(t){var e=r.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},c=function(t){var e=m(t.components);return r.createElement(o.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,l=t.originalType,o=t.parentName,c=p(t,["components","mdxType","originalType","parentName"]),u=m(a),f=n,s=u["".concat(o,".").concat(f)]||u[f]||d[f]||l;return a?r.createElement(s,i(i({ref:e},c),{},{components:a})):r.createElement(s,i({ref:e},c))}));function f(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var l=a.length,i=new Array(l);i[0]=u;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p.mdxType="string"==typeof t?t:n,i[1]=p;for(var m=2;m<l;m++)i[m]=a[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},62846:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>p,toc:()=>m});var r=a(14090),n=(a(29901),a(57522));const l={},i=void 0,p={unversionedId:"api/linear.attachmentfilter",id:"api/linear.attachmentfilter",title:"linear.attachmentfilter",description:"Home &gt; @runlightyear/linear &gt; AttachmentFilter",source:"@site/docs/api/linear.attachmentfilter.md",sourceDirName:"api",slug:"/api/linear.attachmentfilter",permalink:"/docs/api/linear.attachmentfilter",draft:!1,tags:[],version:"current",frontMatter:{}},o={},m=[{value:"AttachmentFilter interface",id:"attachmentfilter-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],c={toc:m};function d(t){let{components:e,...a}=t;return(0,n.kt)("wrapper",(0,r.Z)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,n.kt)("a",{parentName:"p",href:"/docs/api/linear.attachmentfilter"},"AttachmentFilter")),(0,n.kt)("h2",{id:"attachmentfilter-interface"},"AttachmentFilter interface"),(0,n.kt)("b",null,"Signature:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"interface AttachmentFilter \n")),(0,n.kt)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Property"),(0,n.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.and"},"and?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Array","<",(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter"},"AttachmentFilter"),">"),(0,n.kt)("td",{parentName:"tr",align:null},"Compound filters, all of which need to be matched by the attachment.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.createdat"},"createdAt?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.kt)("td",{parentName:"tr",align:null},"Comparator for the created at date.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.creator"},"creator?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.nullableuserfilter"},"NullableUserFilter")),(0,n.kt)("td",{parentName:"tr",align:null},"Filters that the attachments creator must satisfy.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.id"},"id?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.idcomparator"},"IDComparator")),(0,n.kt)("td",{parentName:"tr",align:null},"Comparator for the identifier.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.or"},"or?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},"Array","<",(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter"},"AttachmentFilter"),">"),(0,n.kt)("td",{parentName:"tr",align:null},"Compound filters, one of which need to be matched by the attachment.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.sourcetype"},"sourceType?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.sourcetypecomparator"},"SourceTypeComparator")),(0,n.kt)("td",{parentName:"tr",align:null},"Comparator for the source type.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.subtitle"},"subtitle?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.nullablestringcomparator"},"NullableStringComparator")),(0,n.kt)("td",{parentName:"tr",align:null},"Comparator for the subtitle.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.title"},"title?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.kt)("td",{parentName:"tr",align:null},"Comparator for the title.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.updatedat"},"updatedAt?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.kt)("td",{parentName:"tr",align:null},"Comparator for the updated at date.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.attachmentfilter.url"},"url?")),(0,n.kt)("td",{parentName:"tr",align:null}),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.kt)("td",{parentName:"tr",align:null},"Comparator for the url.")))))}d.isMDXComponent=!0}}]);