"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1585],{57522:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>h});var o=n(29901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},s=Object.keys(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),p=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=p(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=p(n),h=r,m=d["".concat(c,".").concat(h)]||d[h]||u[h]||s;return n?o.createElement(m,a(a({ref:t},l),{},{components:n})):o.createElement(m,a({ref:t},l))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,a=new Array(s);a[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var p=2;p<s;p++)a[p]=n[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},83432:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var o=n(14090),r=(n(29901),n(57522));const s={},a=void 0,i={unversionedId:"api/github.githubscope",id:"api/github.githubscope",title:"github.githubscope",description:"Home &gt; @runlightyear/github &gt; GithubScope",source:"@site/docs/api/github.githubscope.md",sourceDirName:"api",slug:"/api/github.githubscope",permalink:"/lightyear/docs/api/github.githubscope",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/github.githubscope.md",tags:[],version:"current",frontMatter:{}},c={},p=[{value:"GithubScope type",id:"githubscope-type",level:2}],l={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/api"},"Home")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/github"},"@runlightyear/github")," ",">"," ",(0,r.kt)("a",{parentName:"p",href:"/docs/api/github.githubscope"},"GithubScope")),(0,r.kt)("h2",{id:"githubscope-type"},"GithubScope type"),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'declare type GithubScope = \n/**\n * Grants full access to public and private repositories including read and write access to code, commit statuses, repository invitations, collaborators, deployment statuses, and repository webhooks. Note: In addition to repository related resources, the repo scope also grants access to manage organization-owned resources including projects, invitations, team memberships and webhooks. This scope also grants the ability to manage projects owned by users.\n */\n"repo"\n/**\n * Grants read/write access to commit statuses in public and private repositories. This scope is only necessary to grant other users or services access to private repository commit statuses without granting access to the code.\n */\n | "repo:status"\n/**\n * Grants access to deployment statuses for public and private repositories. This scope is only necessary to grant other users or services access to deployment statuses, without granting access to the code.\n */\n | "repo_deployment"\n/**\n * Limits access to public repositories. That includes read/write access to code, commit statuses, repository projects, collaborators, and deployment statuses for public repositories and organizations. Also required for starring public repositories.\n */\n | "public_repo"\n/**\n * Grants accept/decline abilities for invitations to collaborate on a repository. This scope is only necessary to grant other users or services access to invites without granting access to the code.\n */\n | "repo:invite" | "security_events"\n/**\n *  Grants read, write, ping, and delete access to repository hooks in public or private repositories. The repo and public_repo scopes grant full access to repositories, including repository hooks. Use the admin:repo_hook scope to limit access to only repository hooks.\n */\n | "admin:repo_hook"\n/**\n * Grants read, write, and ping access to hooks in public or private repositories.\n */\n | "write:repo_hook"\n/**\n * Grants read and ping access to hooks in public or private repositories.\n */\n | "read:repo_hook"\n/**\n * Fully manage the organization and its teams, projects, and memberships.\n */\n | "admin:org"\n/**\n * Read and write access to organization membership, organization projects, and team membership.\n */\n | "write:org"\n/**\n * Read-only access to organization membership, organization projects, and team membership.\n */\n | "read:org"\n/**\n * Fully manage public keys.\n */\n | "admin:public_key"\n/**\n * Create, list, and view details for public keys.\n */\n | "write:public_key"\n/**\n * List and view details for public keys.\n */\n | "read:public_key"\n/**\n * Grants read, write, ping, and delete access to organization hooks. Note: OAuth tokens will only be able to perform these actions on organization hooks which were created by the OAuth App. Personal access tokens will only be able to perform these actions on organization hooks created by a user.\n */\n | "admin:org_hook"\n/**\n * Grants write access to gists.\n */\n | "gist"\n/**\n *  Grants:\n *   read access to a user\'s notifications\n * mark as read access to threads\n * watch and unwatch access to a repository, and\n * read, write, and delete access to thread subscriptions.\n */\n | "notifications"\n/**\n * Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.\n */\n | "user"\n/**\n * Grants access to read a user\'s profile data.\n */\n | "read:user"\n/**\n * Grants read access to a user\'s email addresses.\n */\n | "user:email"\n/**\n * Grants access to follow or unfollow other users.\n */\n | "user:follow"\n/**\n * Grants read/write access to user and organization projects.\n */\n | "project"\n/**\n * Grants read only access to user and organization projects.\n */\n | "read:project"\n/**\n * Grants access to delete adminable repositories.\n */\n | "delete_repo"\n/**\n * Allows read and write access for team discussions.\n */\n | "write:discussion"\n/**\n * Allows read access for team discussions.\n */\n | "read:discussion"\n/**\n * Grants access to download or install packages from GitHub Packages. For more information, see "Installing a package".\n */\n | "read:packages"\n/**\n * Grants access to delete packages from GitHub Packages. For more information, see "Deleting and restoring a package."\n */\n | "delete:packages"\n/**\n * Fully manage GPG keys.\n */\n | "admin:gpg_key"\n/**\n * Create, list, and view details for GPG keys.\n */\n | "write:gpg_key"\n/**\n *  List and view details for GPG keys.\n */\n | "read:gpg_key"\n/**\n *  Grants the ability to create and manage codespaces. Codespaces can expose a GITHUB_TOKEN which may have a different set of scopes. For more information, see "Security in GitHub Codespaces."\n */\n | "codespace"\n/**\n * Grants the ability to add and update GitHub Actions workflow files. Workflow files can be committed without this scope if the same file (with both the same path and contents) exists on another branch in the same repository. Workflow files can expose GITHUB_TOKEN which may have a different set of scopes. For more information, see "Authentication in a workflow."\n */\n | "workflow";\n')))}u.isMDXComponent=!0}}]);