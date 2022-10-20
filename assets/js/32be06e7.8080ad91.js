"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[198],{7522:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>k});var n=a(9901);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=c(a),k=r,d=u["".concat(s,".").concat(k)]||u[k]||h[k]||l;return a?n.createElement(d,i(i({ref:t},p),{},{components:a})):n.createElement(d,i({ref:t},p))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var c=2;c<l;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},7887:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var n=a(4090),r=(a(9901),a(7522));const l={},i="Step 4 - Authorize an App",o={unversionedId:"getting-started/authorize-an-app",id:"getting-started/authorize-an-app",title:"Step 4 - Authorize an App",description:"Enable the helloToSlack task",source:"@site/docs/getting-started/4-authorize-an-app.md",sourceDirName:"getting-started",slug:"/getting-started/authorize-an-app",permalink:"/lightyear/docs/getting-started/authorize-an-app",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/getting-started/4-authorize-an-app.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{}},s={},c=[{value:"Enable the <code>helloToSlack</code> task",id:"enable-the-hellotoslack-task",level:2},{value:"Take a look at the <code>helloToSlack</code> task",id:"take-a-look-at-the-hellotoslack-task",level:2},{value:"Authorize an auth",id:"authorize-an-auth",level:2},{value:"Run the <code>helloToSlack</code> task",id:"run-the-hellotoslack-task",level:2},{value:"See the result in Slack",id:"see-the-result-in-slack",level:2}],p={toc:c};function h(e){let{components:t,...l}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"step-4---authorize-an-app"},"Step 4 - Authorize an App"),(0,r.kt)("h2",{id:"enable-the-hellotoslack-task"},"Enable the ",(0,r.kt)("inlineCode",{parentName:"h2"},"helloToSlack")," task"),(0,r.kt)("p",null,"In ",(0,r.kt)("inlineCode",{parentName:"p"},"src/index.js"),", uncomment the import of ",(0,r.kt)("inlineCode",{parentName:"p"},"./tasks/helloToSlack"),"  "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import "./tasks/helloWorld";\n// highlight-next-line\nimport "./tasks/helloToSlack";\n// import "./tasks/webhookToSlack";\n')),(0,r.kt)("h2",{id:"take-a-look-at-the-hellotoslack-task"},"Take a look at the ",(0,r.kt)("inlineCode",{parentName:"h2"},"helloToSlack")," task"),(0,r.kt)("p",null,"There are a few more things happening here compared to our ",(0,r.kt)("inlineCode",{parentName:"p"},"helloWorld")," example. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineTask } from "@bigidea/integration";\nimport { Slack } from "@bigidea/slack";\n\ndefineTask({\n  name: "helloSlack",\n  description: "Send a message to Slack",\n  auths: {\n    slack: Slack.defineAuth({\n      name: "slack",\n    }),\n  },\n  run: async ({ auths }) => {\n    const slack = new Slack({ auth: auths.slack });\n\n    await slack.postMessage({\n      channel: "#general", // <-- you might want to change this!\n      text: "Hello Slack!",\n    });\n  },\n});\n')),(0,r.kt)("p",null,"First, we've imported the ",(0,r.kt)("inlineCode",{parentName:"p"},"Slack")," connector"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineTask } from "@bigidea/integration";\n// highlight-next-line\nimport { Slack } from "@bigidea/slack";\n...\n')),(0,r.kt)("p",null,"Next, we've created an ",(0,r.kt)("inlineCode",{parentName:"p"},"Auth")," on the task using ",(0,r.kt)("inlineCode",{parentName:"p"},"Slack.defineAuth")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'...\ndefineTask({\n  name: "helloSlack",\n  description: "Send a message to Slack",\n  // highlight-start\n  auths: {\n    slack: Slack.defineAuth({\n      name: "slack",\n    }),\n  },\n  // highlight-end\n  ...\n});\n')),(0,r.kt)("p",null,"Then we're using that ",(0,r.kt)("inlineCode",{parentName:"p"},"Auth")," to instantiate a ",(0,r.kt)("inlineCode",{parentName:"p"},"Slack")," connector "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'defineTask({\n  ...\n  run: async ({ auths }) => {\n    // highlight-next-line\n    const slack = new Slack({ auth: auths.slack });\n\n    await slack.postMessage({\n      channel: "#general", // <-- you might want to change this!\n      text: "Hello Slack!",\n    });\n  },\n});\n')),(0,r.kt)("p",null,"And finally we're using that connector instance to post a message to the ",(0,r.kt)("inlineCode",{parentName:"p"},"#general")," channel in Slack. You should select an appropriate channel so you don't irritate or confuse your co-workers! \ud83d\ude42"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'defineTask({\n  ...\n  run: async ({ auths }) => {\n    const slack = new Slack({ auth: auths.slack });\n\n    // highlight-start\n    await slack.postMessage({\n      channel: "#general", // <-- you might want to change this!\n      text: "Hello Slack!",\n    });\n    // highlight-end\n  },\n});\n')),(0,r.kt)("h2",{id:"authorize-an-auth"},"Authorize an auth"),(0,r.kt)("p",null,"Let's go back to the dashboard: ",(0,r.kt)("a",{parentName:"p",href:"https://integration.bigidea.io/prototype"},"https://integration.bigidea.io/prototype")," and click on Auths and on the newly created ",(0,r.kt)("inlineCode",{parentName:"p"},"slack")," auth."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"asdf",src:a(4575).Z,width:"1172",height:"601"})),(0,r.kt)("p",null,"You will see a screen like this. Click on the ",(0,r.kt)("inlineCode",{parentName:"p"},"Authorize")," button."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"asdf",src:a(7218).Z,width:"1179",height:"597"})),(0,r.kt)("p",null,"This will take you through a standard Oauth flow. Click the ",(0,r.kt)("inlineCode",{parentName:"p"},"Allow")," button."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"asdf",src:a(3665).Z,width:"923",height:"701"})),(0,r.kt)("p",null,"And you have now successfully authorized access to your Slack account."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"asdf",src:a(5573).Z,width:"1178",height:"600"})),(0,r.kt)("h2",{id:"run-the-hellotoslack-task"},"Run the ",(0,r.kt)("inlineCode",{parentName:"h2"},"helloToSlack")," task"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"asdf",src:a(8411).Z,width:"1182",height:"605"})),(0,r.kt)("h2",{id:"see-the-result-in-slack"},"See the result in Slack"),(0,r.kt)("p",null,"Take a look at the channel you posted the message to and you should see the result:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"asdf",src:a(7999).Z,width:"533",height:"67"})))}h.isMDXComponent=!0},4575:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/authorize-an-app-0-e4382153d69b92a91ff4f08d16e60864.png"},7218:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/authorize-an-app-1-e3054540928741ed8943896d832d44e0.png"},3665:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/authorize-an-app-2-3c770c0447776b0c2bf6d55869ae404b.png"},5573:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/authorize-an-app-3-ab8a621ef09b51d402e860cbf15c3902.png"},8411:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/authorize-an-app-4-d358b188e6c9024c498ae2d4cd1cd797.png"},7999:(e,t,a)=>{a.d(t,{Z:()=>n});const n="data:image/png;base64,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"}}]);