# Desktop entry

Desktop entry abstraction.

## Example

An example extracted from 'good-roots-startup'

It creates a desktop entry and enables it at startup on linux systems.

```typescript
/**
 * Startup
 */
function enableStartup() {
    const folderDirectory = `${__dirname}/../../`;
    
    const cmd = `cd ${folderDirectory} && npm run start -- --start`;
    const dot = new DotDesktop("good-roots", cmd);
    dot.setName("Good roots startup")
        .saveAtStartup();
}
```
