# JS — algorithm

# JS — Algorithm Module

A collection of JavaScript algorithm implementations, data structures, and utility functions. This module serves as a reference and toolkit for common programming patterns, interview problems, and performance optimizations.

## Core Components

### Data Structures

#### LRU Cache (`LRU-cache.js`)
Two implementations of a Least Recently Used cache with O(1) get/put operations:

1. **Linked List + HashMap Implementation**
   - Uses a doubly linked list to maintain access order
   - HashMap provides O(1) key lookup
   - Virtual head/tail nodes simplify edge cases
   - Key methods: `get(key)`, `put(key, value)`

2. **Map-based Implementation**
   - Leverages JavaScript's built-in `Map` which maintains insertion order
   - Simpler implementation with same time complexity
   - Automatically evicts least recently used item when capacity exceeded

```javascript
// Usage example
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);    // returns 1
cache.put(3, 3); // evicts key 2
```

#### Custom Map (`map.js`)
A complete Map implementation using hash table + doubly linked list:
- Supports object keys via unique ID generation
- Maintains insertion order for iteration
- Implements all standard Map methods: `set`, `get`, `has`, `delete`, `clear`, `forEach`
- Provides iterators: `entries()`, `keys()`, `values()`

#### Min-Heap (`手写堆.js`)
A binary min-heap implementation with:
- `Down(i)` - heapify down from index i
- `Up(i)` - heapify up from index i
- `Pop()` - remove and return minimum element
- `Push(val)` - insert new element
- Used for priority queue operations

### Async Utilities

#### Debounce & Throttle (`debounce.js`, `throttle.js`)
Standard implementations for rate-limiting function calls:

```javascript
// Debounce: delays execution until after wait ms of inactivity
const debouncedFn = debounce(fn, 300);

// Throttle: ensures fn is called at most once per wait ms
const throttledFn = throttle(fn, 100);
```

#### LazyMan Task Scheduler (`lazyman.js`)
Three implementations of a chainable task scheduler:

1. **Promise Chain** - Maintains a promise chain for sequential execution
2. **Task Queue** - Uses an array-based task queue with `next()` method
3. **Class-based** - Clean class implementation with `rest()`, `learn()`, `eat()` methods

```javascript
// Usage
Hardman("Tom").rest(2).learn("Math").eat("lunch");
// Output: I am Tom → Wake up after 2s → Learning Math → Eat lunch
```

#### Remote Addition (`remoteAdd.js`)
Three strategies for adding numbers using a simulated remote service:

1. **Binary Split** - Recursively splits array and uses `Promise.all` for parallel execution
2. **Sequential** - Processes pairs sequentially
3. **Parallel Rounds** - Processes all pairs in parallel each round

#### Promise.all Implementation (`myPromiseAll.js`)
Custom implementation that:
- Handles empty arrays
- Maintains result order
- Rejects immediately on first rejection
- Uses `Promise.resolve()` to handle non-promise values

### Algorithmic Solutions

#### Big Number Arithmetic (`bigInt.js`)
String-based arithmetic for numbers exceeding JavaScript's safe integer limit:

- `addBigNumber(a, b)` - Adds two large numbers represented as strings
- `multiplyBigNumber(num1, num2)` - Multiplies two large numbers

#### Tree Diameter (`treeDiameter.js`)
Computes the diameter (longest path) of a tree using:
- Two BFS/DFS traversals
- Floyd-Warshall algorithm (O(n²) space)
- DFS from each node (O(n²) time)

#### Binary Search Problems (`二分答案.js`)
Template for binary search on answer space:
- Defines `check(k)` function to validate candidate answers
- Adjusts search bounds based on check result
- Finds minimum/maximum valid answer

#### Array Diffing (`pDd/2026春/数组比较.js`)
Compares two arrays to find:
- Added items (in new but not old)
- Removed items (in old but not new)
- Changed items (different field values)

Two implementations:
1. **Sorted + Two Pointers** - O(n log n) time
2. **HashMap** - O(n) time

### Event & Task Management

#### Event Bus (`pDd/2026春/事件监听.js`)
Publish-subscribe event system with:
- `on(event, handler)` - Subscribe to events
- `once(event, handler)` - Subscribe for single execution
- `emit(event, ...args)` - Trigger event
- Automatic cleanup of one-time listeners

#### Cached Request Function (`pDd/2026春/请求函数.js`)
Request wrapper with:
- TTL-based caching
- Request deduplication (prevents duplicate in-flight requests)
- Configurable timeout
- Automatic cache invalidation

```javascript
const cachedRequest = createCachedRequest(fetchData, {
  ttl: 5000,      // Cache for 5 seconds
  timeout: 3000   // 3 second timeout
});
```

### String & Number Utilities

#### Thousands Separator (`thousands.ts`)
Formats numbers with commas:
- `localeAPI(num)` - Uses `toLocaleString()`
- `formatThousands(num)` - Manual implementation supporting decimals

#### Tab Parser (`tab-parser.js`)
Converts tab-indented text to nested object structure:
- Handles arbitrary nesting levels
- Uses monotonic stack for parent tracking
- Returns tree structure with `value` and `children` properties

#### Deep Copy (`deepCopy.js`)
Recursive deep copy with:
- Circular reference handling via `WeakMap`
- Support for `Date`, `RegExp`, `Map`, `Set`
- Preserves object prototypes

### Problem-Specific Solutions

#### Dice Classification (`pDd/骰子对应.js`)
Classifies dice by generating all 24 possible rotations:
- Uses BFS to explore all orientations
- Takes lexicographically smallest representation as canonical form
- Groups identical dice together

#### Harmonious Intervals (`pDd/和谐区间.js`)
Counts intervals where sum is divisible by M:
- Uses prefix sums with modulo
- HashMap to count prefix sum frequencies
- O(n) time complexity

#### String Transformation (`pDd/目标字符串.js`)
Minimum cost to make two strings identical:
- Sort character codes from both strings
- Pair smallest with smallest (greedy approach)
- Sum absolute differences

## Execution Patterns

### Event Loop Demonstrations
Several files demonstrate JavaScript's event loop behavior:

```javascript
// mHy/tasks.js - Microtask vs macrotask ordering
setTimeout(() => console.log("1-1"));
Promise.resolve().then(() => console.log("1-2"));
console.log("2-1");
// Output: 2-1 → 1-2 → 1-1
```

### Closure & Scope Examples
- `mHy/var.js` - Demonstrates `var` in loops and IIFE solutions
- `mHy/this.js` - Shows `this` binding in methods vs arrow functions
- `collectArgs.js` - Currying implementation using closures

## Integration Points

The module connects to the broader codebase through:

1. **Incoming Calls** - Functions like `wrap()` from `collectArgs.js` are used in build scripts and test utilities
2. **LRU Cache Usage** - The LRU cache implementations are used in:
   - Directory completion utilities
   - LSP diagnostic caching
   - Template usage checking
   - Various handler modules (Calendar, Contacts, Device, etc.)
3. **Promise Utilities** - `myPromiseAll` and async patterns are referenced in async component tests

## Usage Patterns

### For Algorithm Practice
The files in `pDd/` and `tT/` directories contain complete solutions to competitive programming problems with:
- Input reading via `readline`
- Edge case handling
- Multiple solution approaches (optimal and suboptimal)

### For Production Use
Several utilities are production-ready:
- `debounce.js` and `throttle.js` for UI event handling
- `LRU-cache.js` for caching expensive computations
- `deepCopy.js` for immutable state management
- `event bus` for component communication

### For Learning
The module includes numerous examples demonstrating:
- JavaScript type coercion (`NumWithStr.js`, `Number.js`)
- Async/await behavior (`async只函数内等.js`)
- Event loop mechanics (`event-loop/mT.js`)
- Prototype-based vs class-based patterns (`lazyman.js`)

## Performance Considerations

- **LRU Cache**: O(1) operations using hash map + doubly linked list
- **Tree Diameter**: Two BFS runs give O(n) time vs O(n²) for all-pairs
- **Big Number Arithmetic**: String manipulation avoids precision loss
- **Binary Search**: Reduces O(n) search to O(log n) with monotonic property

## Testing & Validation

Most implementations include inline test cases or usage examples. The competitive programming solutions are validated against online judge test cases with comments indicating pass rates (e.g., "6/10", "2/20").