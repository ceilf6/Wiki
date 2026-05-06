# React — utils

# React — utils

A collection of general-purpose utility functions for the React application. This module provides low-level helpers that are used across different parts of the codebase.

## Functions

### `notSyncDelay(duration)`

A synchronous blocking delay function. This function halts the current JavaScript thread for the specified duration by running a busy-wait loop.

**Parameters:**
- `duration` (number): The delay time in milliseconds.

**Behavior:**
- Uses `Date.now()` to track elapsed time in a `while` loop.
- Blocks the main thread completely for the given duration.
- Does not return any value.

**Important:** This function is intentionally blocking and should be used with extreme caution. It will freeze the UI and block all other JavaScript execution. It is primarily intended for specific testing or debugging scenarios where a synchronous delay is required.

### `randomInt(min, max)`

Generates a random integer within a specified range (inclusive).

**Parameters:**
- `min` (number): The minimum value of the range (inclusive).
- `max` (number): The maximum value of the range (inclusive).

**Returns:** A random integer between `min` and `max`, inclusive.

**Algorithm:**
1. Generates a random floating-point number between 0 (inclusive) and 1 (exclusive) using `Math.random()`.
2. Scales this number to the desired range size (`max - min + 1`).
3. Floors the result to get an integer.
4. Adds the minimum value to shift the range to start at `min`.

## Usage in the Codebase

The `randomInt` function is used in other parts of the application:

1. **VNC Password Generation:** Used in `agents/sandbox/novnc-auth.ts` to generate random passwords for NoVNC authentication.
2. **Pairing Code Generation:** Used in `src/pairing/pairing-store.ts` to generate random pairing codes.

The `notSyncDelay` function does not appear in the provided call graph, suggesting it may be used in specific test scenarios or is currently unused.

## Example Usage

```javascript
import { randomInt, notSyncDelay } from './utils';

// Generate a random number between 1 and 100
const randomNumber = randomInt(1, 100);
console.log(randomNumber); // e.g., 42

// Block the thread for 500ms (use with caution!)
notSyncDelay(500);
console.log('This message appears after a 500ms delay');
```

## Notes

- **No External Dependencies:** This module has no external dependencies and is self-contained.
- **Pure Functions:** Both functions are pure (no side effects beyond the intended blocking behavior of `notSyncDelay`).
- **Thread Blocking Warning:** The `notSyncDelay` function will block the main thread. Avoid using it in production code where UI responsiveness is critical. Consider using `setTimeout` or `Promise`-based delays for non-blocking alternatives.