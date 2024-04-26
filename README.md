# Desktop entry

Desktop entry abstraction.

# Creating a new entry

```typescript
const folderDirectory = `${__dirname}/../../`;
const cmd = `cd ${folderDirectory} && npm run start -- --start`;
const entry = new DesktopEntry("myAwesomeApp", cmd);
```

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
    const dot = new DesktopEntry("good-roots", cmd);
    dot.setName("Good roots startup")
        .saveAtStartup();
}
```
