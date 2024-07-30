"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[14086],{62757:(t,e,a)=>{a.d(e,{xA:()=>d,yg:()=>s});var r=a(67308);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function o(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function i(t,e){if(null==t)return{};var a,r,n=function(t,e){if(null==t)return{};var a,r,n={},l=Object.keys(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)a=l[r],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var p=r.createContext({}),g=function(t){var e=r.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):o(o({},e),t)),a},d=function(t){var e=g(t.components);return r.createElement(p.Provider,{value:e},t.children)},m="mdxType",y={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},f=r.forwardRef((function(t,e){var a=t.components,n=t.mdxType,l=t.originalType,p=t.parentName,d=i(t,["components","mdxType","originalType","parentName"]),m=g(a),f=n,s=m["".concat(p,".").concat(f)]||m[f]||y[f]||l;return a?r.createElement(s,o(o({ref:e},d),{},{components:a})):r.createElement(s,o({ref:e},d))}));function s(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var l=a.length,o=new Array(l);o[0]=f;var i={};for(var p in e)hasOwnProperty.call(e,p)&&(i[p]=e[p]);i.originalType=t,i[m]="string"==typeof t?t:n,o[1]=i;for(var g=2;g<l;g++)o[g]=a[g];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}f.displayName="MDXCreateElement"},62114:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>o,default:()=>y,frontMatter:()=>l,metadata:()=>i,toc:()=>g});var r=a(94790),n=(a(67308),a(62757));const l={},o=void 0,i={unversionedId:"api/linear.workflowstatefilter",id:"api/linear.workflowstatefilter",title:"linear.workflowstatefilter",description:"Home &gt; @runlightyear/linear &gt; WorkflowStateFilter",source:"@site/docs/api/linear.workflowstatefilter.md",sourceDirName:"api",slug:"/api/linear.workflowstatefilter",permalink:"/docs/api/linear.workflowstatefilter",draft:!1,tags:[],version:"current",frontMatter:{}},p={},g=[{value:"WorkflowStateFilter interface",id:"workflowstatefilter-interface",level:2},{value:"Optional Properties",id:"optional-properties",level:2}],d={toc:g},m="wrapper";function y(t){let{components:e,...a}=t;return(0,n.yg)(m,(0,r.A)({},d,a,{components:e,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear"},"@runlightyear/linear")," ",">"," ",(0,n.yg)("a",{parentName:"p",href:"/docs/api/linear.workflowstatefilter"},"WorkflowStateFilter")),(0,n.yg)("h2",{id:"workflowstatefilter-interface"},"WorkflowStateFilter interface"),(0,n.yg)("b",null,"Signature:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"interface WorkflowStateFilter \n")),(0,n.yg)("h2",{id:"optional-properties"},"Optional Properties"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null},"Property"),(0,n.yg)("th",{parentName:"tr",align:null},"Modifiers"),(0,n.yg)("th",{parentName:"tr",align:null},"Type"),(0,n.yg)("th",{parentName:"tr",align:null},"Description"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.and"},"and?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<",(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter"},"WorkflowStateFilter"),">"),(0,n.yg)("td",{parentName:"tr",align:null},"Compound filters, all of which need to be matched by the workflow state.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.createdat"},"createdAt?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the created at date.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.description"},"description?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the workflow state description.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.id"},"id?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.idcomparator"},"IDComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the identifier.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.issues"},"issues?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.issuecollectionfilter"},"IssueCollectionFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the workflow states issues must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.name"},"name?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the workflow state name.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.or"},"or?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},"Array","<",(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter"},"WorkflowStateFilter"),">"),(0,n.yg)("td",{parentName:"tr",align:null},"Compound filters, one of which need to be matched by the workflow state.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.position"},"position?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.numbercomparator"},"NumberComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the workflow state position.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.team"},"team?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.teamfilter"},"TeamFilter")),(0,n.yg)("td",{parentName:"tr",align:null},"Filters that the workflow states team must satisfy.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.type"},"type?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.stringcomparator"},"StringComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the workflow state type.")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.workflowstatefilter.updatedat"},"updatedAt?")),(0,n.yg)("td",{parentName:"tr",align:null}),(0,n.yg)("td",{parentName:"tr",align:null},(0,n.yg)("a",{parentName:"td",href:"/docs/api/linear.datecomparator"},"DateComparator")),(0,n.yg)("td",{parentName:"tr",align:null},"Comparator for the updated at date.")))))}y.isMDXComponent=!0}}]);