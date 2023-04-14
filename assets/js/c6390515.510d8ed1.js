"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[11727],{57522:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>u});var n=r(29901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var d=n.createContext({}),p=function(e){var t=n.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=p(e.components);return n.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),g=p(r),u=a,s=g["".concat(d,".").concat(u)]||g[u]||c[u]||i;return r?n.createElement(s,o(o({ref:t},m),{},{components:r})):n.createElement(s,o({ref:t},m))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=g;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},99202:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=r(14090),a=(r(29901),r(57522));const i={},o=void 0,l={unversionedId:"api/zoom.recordingmeeting",id:"api/zoom.recordingmeeting",title:"zoom.recordingmeeting",description:"Home &gt; @runlightyear/zoom &gt; RecordingMeeting",source:"@site/docs/api/zoom.recordingmeeting.md",sourceDirName:"api",slug:"/api/zoom.recordingmeeting",permalink:"/docs/api/zoom.recordingmeeting",draft:!1,tags:[],version:"current",frontMatter:{}},d={},p=[{value:"RecordingMeeting interface",id:"recordingmeeting-interface",level:2},{value:"Required Properties",id:"required-properties",level:2}],m={toc:p};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/zoom"},"@runlightyear/zoom")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/zoom.recordingmeeting"},"RecordingMeeting")),(0,a.kt)("h2",{id:"recordingmeeting-interface"},"RecordingMeeting interface"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"interface RecordingMeeting \n")),(0,a.kt)("h2",{id:"required-properties"},"Required Properties"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Property"),(0,a.kt)("th",{parentName:"tr",align:null},"Modifiers"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.accountid"},"accountId")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"Unique Identifier of the user account.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.duration"},"duration")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"number"),(0,a.kt)("td",{parentName:"tr",align:null},"Meeting duration.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.hostid"},"hostId")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"ID of the user set as host of meeting.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.id"},"id")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"number"),(0,a.kt)("td",{parentName:"tr",align:null},"Meeting ID - also known as the meeting number.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.recordingcount"},"recordingCount")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"number"),(0,a.kt)("td",{parentName:"tr",align:null},"Number of recording files returned in the response of this API call. This includes the recording","_","files and participant","_","audio","_","files files.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.recordingfiles"},"recordingFiles")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"Array","<",(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingfile"},"RecordingFile"),">"),(0,a.kt)("td",{parentName:"tr",align:null},"Recording file list")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.recordingplaypasscode"},"recordingPlayPasscode")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"The cloud recording's password to be used in the URL. This recording's password can be directly spliced in play","_","url or share","_","url with ?pwd= to access and play. For example, '",(0,a.kt)("a",{parentName:"td",href:"https://zoom.us/rec/share/%5C*%5C*%5C*%5C*%5C*%5C*%5C*%5C*%5C*%5C*%5C*%5C*%5C*%5C*?pwd=yNYIS408EJygs7rE5vVsJwXIz4-VW7MH'"},"https://zoom.us/rec/share/\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*?pwd=yNYIS408EJygs7rE5vVsJwXIz4-VW7MH'"),". If you want to use this field, please contact Zoom support.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.shareurl"},"shareUrl")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"Lightyear note: Not documented in API, but observed in testing")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.starttime"},"startTime")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.zoomdate"},"ZoomDate")),(0,a.kt)("td",{parentName:"tr",align:null},"The time at which the meeting started.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.topic"},"topic")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"Meeting topic.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.totalsize"},"totalSize")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"number"),(0,a.kt)("td",{parentName:"tr",align:null},"The total file size of the recording. This includes the recording","_","files and participant","_","audio","_","files files.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.type"},"type")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"1 ","|"," 2 ","|"," 3 ","|"," 4 ","|"," 5 ","|"," 6 ","|"," 7 ","|"," 8 ","|"," 9 ","|"," 99"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The recording's associated type of meeting or webinar:"),(0,a.kt)("p",null,"If the recording is of a meeting:"),(0,a.kt)("p",null,"1 \u2014 Instant meeting. 2 \u2014 Scheduled meeting. 3 \u2014 A recurring meeting with no fixed time. 4 \u2014 A meeting created via PMI (Personal Meeting ID). 7 \u2014 A Personal Audio Conference (PAC). 8 - Recurring meeting with a fixed time."),(0,a.kt)("p",null,"If the recording is of a webinar:"),(0,a.kt)("p",null,"5 \u2014 A webinar. 6 \u2014 A recurring webinar without a fixed time 9 \u2014 A recurring webinar with a fixed time."),(0,a.kt)("p",null,"If the recording is not from a meeting or webinar:"),(0,a.kt)("p",null,"99 \u2014 A recording uploaded via the Recordings interface on the Zoom Web Portal."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/docs/api/zoom.recordingmeeting.uuid"},"uuid")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"Unique Meeting Identifier. Each instance of the meeting will have its own UUID.")))))}c.isMDXComponent=!0}}]);