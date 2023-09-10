"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[29453],{57522:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>d});var a=t(29901);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),s=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=s(e.components);return a.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=s(t),d=r,b=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return t?a.createElement(b,i(i({ref:n},c),{},{components:t})):a.createElement(b,i({ref:n},c))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=m;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},74485:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var a=t(14090),r=(t(29901),t(57522));const o={},i=void 0,p={unversionedId:"api/notion.notion.createdatabase",id:"api/notion.notion.createdatabase",title:"notion.notion.createdatabase",description:"Home &gt; @runlightyear/notion &gt; Notion &gt; createDatabase",source:"@site/docs/api/notion.notion.createdatabase.md",sourceDirName:"api",slug:"/api/notion.notion.createdatabase",permalink:"/docs/api/notion.notion.createdatabase",draft:!1,tags:[],version:"current",frontMatter:{}},l={},s=[{value:"Notion.createDatabase() method",id:"notioncreatedatabase-method",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example 1",id:"example-1",level:2},{value:"Example 2",id:"example-2",level:2}],c={toc:s};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion"},"@runlightyear/notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion"},"Notion")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.notion.createdatabase"},"createDatabase")),(0,r.kt)("h2",{id:"notioncreatedatabase-method"},"Notion.createDatabase() method"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.")),(0,r.kt)("p",null,"Create a database"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"createDatabase(props: CreateDatabaseProps): Promise<CreateDatabaseResponse>;\n")),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"props"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/api/notion.createdatabaseprops"},"CreateDatabaseProps")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("b",null,"Returns:"),(0,r.kt)("p",null,"Promise","<",(0,r.kt)("a",{parentName:"p",href:"/docs/api/notion.createdatabaseresponse"},"CreateDatabaseResponse"),">"),(0,r.kt)("h2",{id:"example-1"},"Example 1"),(0,r.kt)("p",null,"Create a database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "createDatabase",\n  title: "Create Database",\n  apps: ["notion"],\n  variables: ["parentPageId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({\n      auth: auths.notion,\n    });\n    const result = await notion.createDatabase({\n      parent: {\n        pageId: variables.parentPageId!,\n      },\n      title: [\n        {\n          text: {\n            content: "Grocery List",\n          },\n        },\n      ],\n      properties: {\n        Name: {\n          title: {},\n        },\n        Description: {\n          richText: {},\n        },\n        "In Stock": {\n          checkbox: {},\n        },\n        "Food Group": {\n          select: {\n            options: [\n              {\n                name: "\ud83e\udd66 Vegetable",\n                color: "green",\n              },\n              {\n                name: "\ud83c\udf4e Fruit",\n                color: "red",\n              },\n              {\n                name: "\ud83c\udf5e Carbs",\n                color: "yellow",\n              },\n            ],\n          },\n        },\n        Price: {\n          number: {\n            format: "dollar",\n          },\n        },\n        "Last Ordered": {\n          date: {},\n        },\n        "Store Availability": {\n          multiSelect: {\n            options: [\n              {\n                name: "Duc Loi Market",\n                color: "blue",\n              },\n              {\n                name: "Rainbow Grocery",\n                color: "gray",\n              },\n              {\n                name: "Nijiya Market",\n                color: "purple",\n              },\n              {\n                name: "Gus\'s Community Market",\n                color: "yellow",\n              },\n            ],\n          },\n        },\n        "+1": {\n          people: {},\n        },\n        Photo: {\n          files: {},\n        },\n      },\n    });\n    console.log("Database: ", result.data);\n  },\n});\n')),(0,r.kt)("h2",{id:"example-2"},"Example 2"),(0,r.kt)("p",null,"Create a database with items"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { defineAction } from "@runlightyear/lightyear";\nimport { Notion } from "@runlightyear/notion";\n\ndefineAction({\n  name: "createDatabaseItems",\n  title: "Create Database Items",\n  apps: ["notion"],\n  variables: ["parentPageId"],\n  run: async ({ auths, variables }) => {\n    const notion = new Notion({ auth: auths.notion });\n    const response = await notion.createDatabase({\n      parent: {\n        pageId: variables.parentPageId!,\n      },\n      title: [\n        {\n          text: {\n            content: "Shopping List",\n          },\n        },\n      ],\n      properties: {\n        Name: {\n          title: {},\n        },\n        Description: {\n          richText: {},\n        },\n        Quantity: {\n          number: {\n            format: "number",\n          },\n        },\n      },\n    });\n\n    const newDatabaseId = response.data.id;\n\n    await notion.createPage({\n      parent: {\n        databaseId: newDatabaseId,\n      },\n      properties: {\n        Name: {\n          title: [\n            {\n              text: {\n                content: "\ud83e\udd66 Broccoli",\n              },\n            },\n          ],\n        },\n        Description: {\n          richText: [\n            {\n              text: {\n                content: "A green vegetable",\n              },\n            },\n          ],\n        },\n        Quantity: {\n          number: 1,\n        },\n      },\n    });\n\n    await notion.createPage({\n      parent: {\n        databaseId: newDatabaseId,\n      },\n      properties: {\n        Name: {\n          title: [\n            {\n              text: {\n                content: "\ud83c\udf4e Apple",\n              },\n            },\n          ],\n        },\n        Description: {\n          richText: [\n            {\n              text: {\n                content: "A red fruit",\n              },\n            },\n          ],\n        },\n        Quantity: {\n          number: 2,\n        },\n      },\n    });\n\n    await notion.createPage({\n      parent: {\n        databaseId: newDatabaseId,\n      },\n      properties: {\n        Name: {\n          title: [\n            {\n              text: {\n                content: "\ud83c\udf5e Bread",\n              },\n            },\n          ],\n        },\n        Description: {\n          richText: [\n            {\n              text: {\n                content: "A yellow carb",\n              },\n            },\n          ],\n        },\n        Quantity: {\n          number: 3,\n        },\n      },\n    });\n  },\n});\n')))}u.isMDXComponent=!0}}]);