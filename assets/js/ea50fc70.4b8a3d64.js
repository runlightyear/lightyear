"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[25882],{62757:(e,t,r)=>{r.d(t,{xA:()=>d,yg:()=>u});var a=r(67308);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=a.createContext({}),g=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=g(e.components);return a.createElement(o.Provider,{value:t},e.children)},m="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),m=g(r),c=n,u=m["".concat(o,".").concat(c)]||m[c]||y[c]||l;return r?a.createElement(u,i(i({ref:t},d),{},{components:r})):a.createElement(u,i({ref:t},d))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,i=new Array(l);i[0]=c;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[m]="string"==typeof e?e:n,i[1]=p;for(var g=2;g<l;g++)i[g]=r[g];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},3013:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>y,frontMatter:()=>l,metadata:()=>p,toc:()=>g});var a=r(94790),n=(r(67308),r(62757));const l={},i=void 0,p={unversionedId:"api/linear.projectfilter",id:"api/linear.projectfilter",title:"linear.projectfilter",description:"Home &gt; @runlightyear/linear &gt; ProjectFilter",source:"@site/docs/api/linear.projectfilter.md",sourceDirName:"api",slug:"/api/linear.projectfilter",permalink:"/docs/api/linear.projectfilter",draft:!1,tags:[],version:"current",frontMatter:{}},o={},g=[{value:"ProjectFilter interface",id:"projectfilter-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],d={toc:g},m="wrapper";function y(e){let{components:t,...r}=e;return(0,n.yg)(m,(0,a.A)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear.projectfilter"},"ProjectFilter")),(0,n.yg)("h2",{id:"projectfilter-interface"},"ProjectFilter interface"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"interface ProjectFilter \n")),(0,n.yg)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.and"},"and?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<",(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter"},"ProjectFilter"),">"),(0,n.yg)("td",{parentName:"tr",align:null},"Compound filters, all of which need to be matched by the project.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.createdat"},"createdAt?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the created at date.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.creator"},"creator?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.userfilter"},"UserFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the projects creator must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.id"},"id?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.idcomparator"},"IDComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the identifier.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.issues"},"issues?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.issuecollectionfilter"},"IssueCollectionFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the projects issues must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.lead"},"lead?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.nullableuserfilter"},"NullableUserFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the projects lead must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.members"},"members?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.userfilter"},"UserFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the projects members must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.name"},"name?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the project name.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.or"},"or?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<",(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter"},"ProjectFilter"),">"),(0,n.yg)("td",{parentName:"tr",align:null},"Compound filters, one of which need to be matched by the project.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.roadmaps"},"roadmaps?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapcollectionfilter"},"RoadmapCollectionFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the projects roadmaps must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.slugid"},"slugId?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the project slug ID.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.startdate"},"startDate?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.nullabledatecomparator"},"NullableDateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the project start date.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.state"},"state?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the project state.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.targetdate"},"targetDate?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.nullabledatecomparator"},"NullableDateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the project target date.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.projectfilter.updatedat"},"updatedAt?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the updated at date.")))))}y.isMDXComponent=!0}}]);