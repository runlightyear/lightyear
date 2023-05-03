"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[52570],{57522:(e,n,r)=>{r.d(n,{Zo:()=>s,kt:()=>u});var t=r(29901);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function c(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=t.createContext({}),p=function(e){var n=t.useContext(i),r=n;return e&&(r="function"==typeof e?e(n):l(l({},n),e)),r},s=function(e){var n=p(e.components);return t.createElement(i.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=p(r),u=o,g=d["".concat(i,".").concat(u)]||d[u]||m[u]||a;return r?t.createElement(g,l(l({ref:n},s),{},{components:r})):t.createElement(g,l({ref:n},s))}));function u(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=d;var c={};for(var i in n)hasOwnProperty.call(n,i)&&(c[i]=n[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var p=2;p<a;p++)l[p]=r[p];return t.createElement.apply(null,l)}return t.createElement.apply(null,r)}d.displayName="MDXCreateElement"},22974:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var t=r(14090),o=(r(29901),r(57522));const a={},l=void 0,c={unversionedId:"api/zoom.zoom.onnewrecordings",id:"api/zoom.zoom.onnewrecordings",title:"zoom.zoom.onnewrecordings",description:"Home &gt; @runlightyear/zoom &gt; Zoom &gt; onNewRecordings",source:"@site/docs/api/zoom.zoom.onnewrecordings.md",sourceDirName:"api",slug:"/api/zoom.zoom.onnewrecordings",permalink:"/docs/api/zoom.zoom.onnewrecordings",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"Zoom.onNewRecordings() method",id:"zoomonnewrecordings-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],s={toc:p};function m(e){let{components:n,...r}=e;return(0,o.kt)("wrapper",(0,t.Z)({},s,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/zoom"},"@runlightyear/zoom")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/zoom.zoom"},"Zoom")," ",">"," ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/zoom.zoom.onnewrecordings"},"onNewRecordings")),(0,o.kt)("h2",{id:"zoomonnewrecordings-method"},"Zoom.onNewRecordings() method"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,o.kt)("p",null,"Poll for new cloud recordings"),(0,o.kt)("b",null,"Signature:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"static onNewRecordings(props: OnNewRecordingsProps): string;\n")),(0,o.kt)("h2",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"props"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"/docs/api/zoom.onnewrecordingsprops"},"OnNewRecordingsProps")),(0,o.kt)("td",{parentName:"tr",align:null})))),(0,o.kt)("b",null,"Returns:"),(0,o.kt)("p",null,"string"),(0,o.kt)("h2",{id:"example-1"},"Example 1"),(0,o.kt)("p",null,"Poll for completed cloud recordings every minute"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'Zoom.onNewRecordings({\n  name: "poll-for-recordings",\n  title: "Poll for Recordings",\n  pollingFrequency: 1,\n  run: async ({ data }) => {\n    console.log("recordings", data);\n  }\n})\n')),(0,o.kt)("h2",{id:"example-2"},"Example 2"),(0,o.kt)("p",null,"Full example: Poll for completed cloud recordings every 15 minutes and post to Slack"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Zoom } from "@runlightyear/zoom";\nimport { Slack } from "@runlightyear/slack";\n\nZoom.onNewRecordings({\n  name: "post-new-recordings-to-slack",\n  title: "Post New Zoom Recordings to Slack",\n  pollingFrequency: 15,\n  apps: ["slack"],\n  run: async ({ auths, data }) => {\n    const slack = new Slack({ auth: auths.slack });\n\n    for (const recording of data) {\n      await slack.postMessage({\n        channel: "#general",\n        text: `New recording: ${recording.shareUrl}`,\n      });\n    }\n  },\n});\n')))}m.isMDXComponent=!0}}]);