# Browser

# Browser Module Documentation

## Overview

This module provides practical examples and utilities for working with browser APIs, focusing on client-side storage mechanisms, rendering performance, and file handling. It serves as both a learning resource and a collection of reusable patterns for common browser-based operations.

## Module Structure

```
Browser/
├── render/          # Rendering performance examples
├── store/           # Client-side storage implementations
│   ├── cookie/      # Cookie references
│   ├── FileAPI/     # File handling utilities
│   ├── IndexedDB/   # IndexedDB wrapper library
│   ├── localStorage/
│   ├── sessionStorage/
│   ├── SharedStorage/
│   └── WebSQL/      # Deprecated API example
└── Web-API/         # References to Web API documentation
```

## Key Components

### 1. Rendering Performance (`render/`)

**Purpose**: Demonstrates how synchronous JavaScript operations affect rendering performance.

**Key Example**: `掉帧.html` (Frame Drop Example)

This example shows how a long-running synchronous JavaScript task blocks the main thread, causing animation frame drops:

```javascript
function notSyncDelay(duration) {
    var start = Date.now();
    while (Date.now() - start < duration) { }
}

btn.onclick = function () {
    notSyncDelay(5000); // Blocks main thread for 5 seconds
};
```

**Key Insight**: The CSS animation (`@keyframes move`) will freeze during the synchronous operation, demonstrating the importance of keeping the main thread free for rendering.

### 2. File API (`store/FileAPI/`)

**Purpose**: Provides examples for handling file uploads and reading file contents.

#### File Upload Example (`imgUpload.html`)

Demonstrates image upload with preview using `FileReader`:

```javascript
file.onchange = function (event) {
    var fileHandle = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileHandle);
    reader.onload = function (event) {
        div.style.background = `url(${event.target.result}) center/cover no-repeat`;
    }
}
```

**Key Features**:
- Uses `label` element for custom upload UI
- Reads files as Data URLs for immediate preview
- Handles the `FileReader` API for asynchronous file reading

#### File Reading Example (`index.html`)

Shows basic file reading with `FileReader`:

```javascript
var reader = new FileReader();
reader.readAsText(files[0]);
reader.onload = function (event) {
    console.log(event.target.result);
}
```

### 3. IndexedDB (`store/IndexedDB/`)

**Purpose**: Provides a comprehensive wrapper library for IndexedDB operations with Promise-based API.

#### Core Functions (`db.js`)

**Database Management**:
- `openDB(dbName, version)`: Opens/creates a database with Promise wrapper
- `closeDB(db)`: Closes database connection
- `deleteDBAll(dbName)`: Deletes entire database

**Data Operations**:
- `addData(db, storeName, data)`: Inserts new records
- `getDataByKey(db, storeName, key)`: Retrieves by primary key
- `getAllDataByKey(db, storeName)`: Retrieves all records
- `updateDB(db, storeName, data)`: Updates existing records
- `deleteDB(db, storeName, id)`: Deletes by primary key

**Advanced Querying**:
- `cursorGetData(db, storeName)`: Iterates using cursor
- `getDataByIndex(db, storeName, indexName, indexValue)`: Queries by index
- `cursorGetDataByIndex(db, storeName, indexName, indexValue)`: Index + cursor query
- `cursorGetDataByIndexAndPage(...)`: Paginated queries

**Usage Pattern**:
```javascript
openDB("testDB", 1).then((db) => {
    addData(db, "测试表", { "Id": 1, "Name": "ceilf6", "Age": 18 });
    return getDataByKey(db, "测试表", 2);
}).then(res => {
    console.log(res);
});
```

**Key Design Patterns**:
- Promise-based API for async operations
- Transaction management with read/write modes
- Index creation for optimized queries
- Cursor-based iteration for large datasets

### 4. Local Storage (`store/localStorage/`)

**Purpose**: Provides a utility wrapper for localStorage with JSON serialization.

#### Storage Utility (`storage.js`)

```javascript
const storage = {
    set(key, value) {
        if (value === undefined) return;
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const value = localStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : null;
        } catch (e) {
            return value;
        }
    },
    remove(key) { localStorage.removeItem(key); },
    clear() { localStorage.clear(); }
};
```

**Features**:
- Automatic JSON serialization/deserialization
- Handles undefined values gracefully
- Error handling for malformed JSON
- Clean API for CRUD operations

### 5. Session Storage (`store/sessionStorage/`)

**Purpose**: Demonstrates sessionStorage API (similar to localStorage but session-scoped).

**Key Characteristics**:
- Data persists only for the browser session
- Same API as localStorage (`setItem`, `getItem`, `removeItem`)
- Requires JSON serialization for objects

### 6. Shared Storage (`store/SharedStorage/`)

**Purpose**: Demonstrates the experimental Shared Storage API for cross-site storage.

**Architecture**:
1. **Main Thread**: Initializes storage and loads worklet
2. **Worklet**: Runs in isolated context for privacy-preserving operations

```javascript
// Main thread
await sharedStorage.set('experiment_group', 'A');
await sharedStorage.worklet.addModule('shared-storage-worklet.js');
await sharedStorage.run('my-operation', { data: { threshold: 2 } });

// Worklet (shared-storage-worklet.js)
class MyOperation {
    async run(data) {
        const group = await sharedStorage.get('experiment_group');
        // Privacy-preserving logic
    }
}
register('my-operation', MyOperation);
```

**Use Cases**:
- A/B testing across sites
- Frequency capping
- Attribution without exposing raw data

### 7. WebSQL (`store/WebSQL/`)

**Purpose**: Documents the deprecated WebSQL API.

**Status**: Deprecated by W3C, only Safari maintains partial support.

```javascript
// Example (commented out in source)
var db = openDatabase('mydb', '1.0', 'Test', 2 * 1024 * 1024);
```

## Storage API Comparison

| API | Persistence | Capacity | Structure | Async | Cross-Tab |
|-----|-------------|----------|-----------|-------|-----------|
| **localStorage** | Forever | ~5-10MB | Key-value | No | Yes |
| **sessionStorage** | Session | ~5-10MB | Key-value | No | No |
| **IndexedDB** | Forever | Large | Object store | Yes | Yes |
| **Cookies** | Configurable | ~4KB | Key-value | No | Yes |
| **SharedStorage** | Forever | Limited | Key-value | Yes | Yes |

## Best Practices

### IndexedDB Usage
1. Always handle version upgrades in `onupgradeneeded`
2. Use transactions for data consistency
3. Create indexes for frequently queried fields
4. Use cursors for large dataset iteration

### Storage Selection Guide
- **Simple key-value**: localStorage/sessionStorage
- **Structured data**: IndexedDB
- **Cross-site privacy**: SharedStorage
- **Server communication**: Cookies (with HttpOnly flag)

### Performance Considerations
- Avoid synchronous operations on main thread (see `render/` example)
- Use Web Workers for heavy computations
- Batch IndexedDB operations when possible
- Consider storage limits and implement cleanup strategies

## Integration Notes

This module is designed as a reference implementation. To use the IndexedDB wrapper:

```javascript
import { openDB, addData, getDataByKey } from './store/IndexedDB/db.js';

const db = await openDB('myDatabase', 1);
await addData(db, 'users', { id: 1, name: 'John' });
const user = await getDataByKey(db, 'users', 1);
```

For localStorage utility:

```javascript
import storage from './store/localStorage/storage.js';

storage.set('user', { id: 1, name: 'John' });
const user = storage.get('user');
```

## Browser Support Notes

- **IndexedDB**: Supported in all modern browsers
- **SharedStorage**: Experimental, limited browser support
- **WebSQL**: Deprecated, avoid in new projects
- **File API**: Widely supported, check `FileReader` compatibility

## Related Resources

- Web API documentation referenced in `Web-API/README.md`
- Cookie implementation details in `network/cookie` (referenced in `store/cookie/README.md`)