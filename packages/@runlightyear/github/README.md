# Github Connector

The Github Connector for Big Idea Integration

## Examples

### Import
```typescript
import { Github } from "@bigidea/github"
```

### Define an auth
```typescript
const githubAuth = Github.defineAuth({ name: "github" });
```

### List all github repos
```typescript
const github = new Github({ auth: githubAuth });
await github.listRepos();
* ```
