"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[86345],{62757:(e,a,r)=>{r.d(a,{xA:()=>m,yg:()=>u});var t=r(67308);function n(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function l(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,t)}return r}function p(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?l(Object(r),!0).forEach((function(a){n(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function i(e,a){if(null==e)return{};var r,t,n=function(e,a){if(null==e)return{};var r,t,n={},l=Object.keys(e);for(t=0;t<l.length;t++)r=l[t],a.indexOf(r)>=0||(n[r]=e[r]);return n}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)r=l[t],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var o=t.createContext({}),d=function(e){var a=t.useContext(o),r=a;return e&&(r="function"==typeof e?e(a):p(p({},a),e)),r},m=function(e){var a=d(e.components);return t.createElement(o.Provider,{value:a},e.children)},g="mdxType",y={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},c=t.forwardRef((function(e,a){var r=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),g=d(r),c=n,u=g["".concat(o,".").concat(c)]||g[c]||y[c]||l;return r?t.createElement(u,p(p({ref:a},m),{},{components:r})):t.createElement(u,p({ref:a},m))}));function u(e,a){var r=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var l=r.length,p=new Array(l);p[0]=c;var i={};for(var o in a)hasOwnProperty.call(a,o)&&(i[o]=a[o]);i.originalType=e,i[g]="string"==typeof e?e:n,p[1]=i;for(var d=2;d<l;d++)p[d]=r[d];return t.createElement.apply(null,p)}return t.createElement.apply(null,r)}c.displayName="MDXCreateElement"},12884:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>o,contentTitle:()=>p,default:()=>y,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var t=r(94790),n=(r(67308),r(62757));const l={},p=void 0,i={unversionedId:"api/linear.roadmapfilter",id:"api/linear.roadmapfilter",title:"linear.roadmapfilter",description:"Home &gt; @runlightyear/linear &gt; RoadmapFilter",source:"@site/docs/api/linear.roadmapfilter.md",sourceDirName:"api",slug:"/api/linear.roadmapfilter",permalink:"/docs/api/linear.roadmapfilter",draft:!1,tags:[],version:"current",frontMatter:{}},o={},d=[{value:"RoadmapFilter interface",id:"roadmapfilter-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],m={toc:d},g="wrapper";function y(e){let{components:a,...r}=e;return(0,n.yg)(g,(0,t.A)({},m,r,{components:a,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear.roadmapfilter"},"RoadmapFilter")),(0,n.yg)("h2",{id:"roadmapfilter-interface"},"RoadmapFilter interface"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"interface RoadmapFilter \n")),(0,n.yg)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.and"},"and?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<",(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter"},"RoadmapFilter"),">"),(0,n.yg)("td",{parentName:"tr",align:null},"Compound filters, all of which need to be matched by the roadmap.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.createdat"},"createdAt?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the created at date.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.creator"},"creator?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.userfilter"},"UserFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the roadmap creator must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.id"},"id?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.idcomparator"},"IDComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the identifier.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.name"},"name?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the roadmap name.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.or"},"or?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<",(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter"},"RoadmapFilter"),">"),(0,n.yg)("td",{parentName:"tr",align:null},"Compound filters, one of which need to be matched by the roadmap.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.slugid"},"slugId?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the roadmap slug ID.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.roadmapfilter.updatedat"},"updatedAt?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the updated at date.")))))}y.isMDXComponent=!0}}]);