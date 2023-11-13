"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[29453],{57522:(n,e,t)=>{t.d(e,{Zo:()=>c,kt:()=>d});var a=t(29901);function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){r(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function p(n,e){if(null==n)return{};var t,a,r=function(n,e){if(null==n)return{};var t,a,r={},o=Object.keys(n);for(a=0;a<o.length;a++)t=o[a],e.indexOf(t)>=0||(r[t]=n[t]);return r}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(a=0;a<o.length;a++)t=o[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(r[t]=n[t])}return r}var l=a.createContext({}),s=function(n){var e=a.useContext(l),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},c=function(n){var e=s(n.components);return a.createElement(l.Provider,{value:e},n.children)},u={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(n,e){var t=n.components,r=n.mdxType,o=n.originalType,l=n.parentName,c=p(n,["components","mdxType","originalType","parentName"]),m=s(t),d=r,b=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return t?a.createElement(b,i(i({ref:e},c),{},{components:t})):a.createElement(b,i({ref:e},c))}));function d(n,e){var t=arguments,r=e&&e.mdxType;if("string"==typeof n||r){var o=t.length,i=new Array(o);i[0]=m;var p={};for(var l in e)hasOwnProperty.call(e,l)&&(p[l]=e[l]);p.originalType=n,p.mdxType="string"==typeof n?n:r,i[1]=p;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},74485:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var a=t(14090),r=(t(29901),t(57522));const o={},i=void 0,p={unversionedId:"api/notion.notion.createdatabase",id:"api/notion.notion.createdatabase",title:"notion.notion.createdatabase",description:"Home &gt; @runlightyear/notion &gt; Notion &gt; createDatabase",source:"@site/docs/api/notion.notion.createdatabase.md",sourceDirName:"api",slug:"/api/notion.notion.createdatabase",permalink:"/docs/api/notion.notion.createdatabase",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"Notion.createDatabase() method",id:"notioncreatedatabase-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],c={toc:s};function u(n){let{components:e,...t}=n;return(0,r.kt)("wrapper",(0,a.Z)({},c,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion"},"Notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion.createdatabase"},"createDatabase")),(0,r.kt)("h2",{id:"notioncreatedatabase-method"},"Notion.createDatabase() method"),(0,r.kt)("p",null,"Create a database"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"createDatabase(props: CreateDatabaseProps): Promise<CreateDatabaseResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/notion.createdatabaseprops"},"CreateDatabaseProps")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.createdatabaseresponse"},"CreateDatabaseResponse"),">"),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("p",null,"Create a database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "createDatabase",\n  title: "Create Database",\n  apps: ["notion"],\n  variables: ["parentPageId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({\n      auth: auths.notion,\n    });\n    const result = await notion.createDatabase({\n      parent: {\n        pageId: variables.parentPageId!,\n      },\n      title: [\n        {\n          text: {\n            content: "Grocery List",\n          },\n        },\n      ],\n      properties: {\n        Name: {\n          title: {},\n        },\n        Description: {\n          richText: {},\n        },\n        "In Stock": {\n          checkbox: {},\n        },\n        "Food Group": {\n          select: {\n            options: [\n              {\n                name: "\ud83e\udd66 Vegetable",\n                color: "green",\n              },\n              {\n                name: "\ud83c\udf4e Fruit",\n                color: "red",\n              },\n              {\n                name: "\ud83c\udf5e Carbs",\n                color: "yellow",\n              },\n            ],\n          },\n        },\n        Price: {\n          number: {\n            format: "dollar",\n          },\n        },\n        "Last Ordered": {\n          date: {},\n        },\n        "Store Availability": {\n          multiSelect: {\n            options: [\n              {\n                name: "Duc Loi Market",\n                color: "blue",\n              },\n              {\n                name: "Rainbow Grocery",\n                color: "gray",\n              },\n              {\n                name: "Nijiya Market",\n                color: "purple",\n              },\n              {\n                name: "Gus\'s Community Market",\n                color: "yellow",\n              },\n            ],\n          },\n        },\n        "+1": {\n          people: {},\n        },\n        Photo: {\n          files: {},\n        },\n      },\n    });\n    console.log("Database: ", result.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("p",null,"Create a database with items"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "createDatabaseItems",\n  title: "Create Database Items",\n  apps: ["notion"],\n  variables: ["parentPageId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({ auth: auths.notion });\n    const response = await notion.createDatabase({\n      parent: {\n        pageId: variables.parentPageId!,\n      },\n      title: [\n        {\n          text: {\n            content: "Shopping List",\n          },\n        },\n      ],\n      properties: {\n        Name: {\n          title: {},\n        },\n        Description: {\n          richText: {},\n        },\n        Quantity: {\n          number: {\n            format: "number",\n          },\n        },\n      },\n    });\n\n    const newDatabaseId = response.data.id;\n\n    await notion.createPage({\n      parent: {\n        databaseId: newDatabaseId,\n      },\n      properties: {\n        Name: {\n          title: [\n            {\n              text: {\n                content: "\ud83e\udd66 Broccoli",\n              },\n            },\n          ],\n        },\n        Description: {\n          richText: [\n            {\n              text: {\n                content: "A green vegetable",\n              },\n            },\n          ],\n        },\n        Quantity: {\n          number: 1,\n        },\n      },\n    });\n\n    await notion.createPage({\n      parent: {\n        databaseId: newDatabaseId,\n      },\n      properties: {\n        Name: {\n          title: [\n            {\n              text: {\n                content: "\ud83c\udf4e Apple",\n              },\n            },\n          ],\n        },\n        Description: {\n          richText: [\n            {\n              text: {\n                content: "A red fruit",\n              },\n            },\n          ],\n        },\n        Quantity: {\n          number: 2,\n        },\n      },\n    });\n\n    await notion.createPage({\n      parent: {\n        databaseId: newDatabaseId,\n      },\n      properties: {\n        Name: {\n          title: [\n            {\n              text: {\n                content: "\ud83c\udf5e Bread",\n              },\n            },\n          ],\n        },\n        Description: {\n          richText: [\n            {\n              text: {\n                content: "A yellow carb",\n              },\n            },\n          ],\n        },\n        Quantity: {\n          number: 3,\n        },\n      },\n    });\n  },\n});\n')))}u.isMDXComponent=!0}}]);