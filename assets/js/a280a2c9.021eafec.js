"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5847],{62757:(e,r,t)=>{t.d(r,{xA:()=>u,yg:()=>y});var s=t(67308);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);r&&(s=s.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,s)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?n(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,s,a=function(e,r){if(null==e)return{};var t,s,a={},n=Object.keys(e);for(s=0;s<n.length;s++)t=n[s],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)t=n[s],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=s.createContext({}),l=function(e){var r=s.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},u=function(e){var r=l(e.components);return s.createElement(c.Provider,{value:r},e.children)},i="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return s.createElement(s.Fragment,{},r)}},g=s.forwardRef((function(e,r){var t=e.components,a=e.mdxType,n=e.originalType,c=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),i=l(t),g=a,y=i["".concat(c,".").concat(g)]||i[g]||d[g]||n;return t?s.createElement(y,o(o({ref:r},u),{},{components:t})):s.createElement(y,o({ref:r},u))}));function y(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var n=t.length,o=new Array(n);o[0]=g;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p[i]="string"==typeof e?e:a,o[1]=p;for(var l=2;l<n;l++)o[l]=t[l];return s.createElement.apply(null,o)}return s.createElement.apply(null,t)}g.displayName="MDXCreateElement"},61140:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>p,toc:()=>l});var s=t(94790),a=(t(67308),t(62757));const n={},o=void 0,p={unversionedId:"api/slack.schedulemessageprops.asuser",id:"api/slack.schedulemessageprops.asuser",title:"slack.schedulemessageprops.asuser",description:"Home &gt; @runlightyear/slack &gt; ScheduleMessageProps &gt; asUser",source:"@site/docs/api/slack.schedulemessageprops.asuser.md",sourceDirName:"api",slug:"/api/slack.schedulemessageprops.asuser",permalink:"/docs/api/slack.schedulemessageprops.asuser",draft:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"ScheduleMessageProps.asUser property",id:"schedulemessagepropsasuser-property",level:2}],u={toc:l},i="wrapper";function d(e){let{components:r,...t}=e;return(0,a.yg)(i,(0,s.A)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack"},"@runlightyear/slack")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack.schedulemessageprops"},"ScheduleMessageProps")," ",">"," ",(0,a.yg)("a",{parentName:"p",href:"/docs/api/slack.schedulemessageprops.asuser"},"asUser")),(0,a.yg)("h2",{id:"schedulemessagepropsasuser-property"},"ScheduleMessageProps.asUser property"),(0,a.yg)("p",null,"Set to true to post the message as the authed user, instead of as a bot. Defaults to false. Cannot be used by new Slack apps."),(0,a.yg)("b",null,"Signature:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-typescript"},"asUser?: boolean;\n")))}d.isMDXComponent=!0}}]);