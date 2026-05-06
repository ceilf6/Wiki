# Vue3 — Pinia-source

# Pinia Source Module Documentation

## Overview

Pinia is the official state management library for Vue.js applications. It provides a type-safe, intuitive, and modular store system that integrates seamlessly with Vue's reactivity system and devtools. This module contains the core implementation of Pinia for Vue 3.

## Architecture

Pinia's architecture revolves around three main concepts: **Stores**, **State**, **Getters**, and **Actions**. Stores are defined using `defineStore()` and can be either Option Stores (similar to Vue's Options API) or Setup Stores (using Composition API).

```mermaid
graph TD
    A[defineStore] --> B[Option Store]
    A --> C[Setup Store]
    B --> D[State]
    B --> E[Getters]
    B --> F[Actions]
    C --> G[ref/reactive]
    C --> H[computed]
    C --> I[functions]
    D --> J[store.$state]
    E --> K[store.getterName]
    F --> L[store.actionName()]
```

## Core Components

### 1. Store Creation (`defineStore`)

The `defineStore` function is the primary API for creating stores. It accepts a unique ID and either an options object or a setup function.

**Option Store Example:**
```typescript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Eduardo'
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

**Setup Store Example:**
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

### 2. State Management

State is the reactive data of a store. In Option Stores, state is defined as a function returning an object. In Setup Stores, state is defined using Vue's `ref()` or `reactive()`.

**Key Features:**
- Direct mutation: `store.count++`
- Patching: `store.$patch({ count: 5 })`
- Resetting: `store.$reset()` (Option Stores only)
- Subscriptions: `store.$subscribe((mutation, state) => { ... })`

### 3. Getters

Getters are computed properties derived from state. They are defined in the `getters` property of Option Stores or as `computed()` in Setup Stores.

**Option Store Getter:**
```typescript
getters: {
  doubleCount: (state) => state.count * 2,
  // Access other getters via `this`
  doublePlusOne(): number {
    return this.doubleCount + 1
  }
}
```

**Setup Store Getter:**
```typescript
const doubleCount = computed(() => count.value * 2)
```

### 4. Actions

Actions are methods that can be synchronous or asynchronous. They are defined in the `actions` property of Option Stores or as regular functions in Setup Stores.

**Option Store Action:**
```typescript
actions: {
  async fetchUser() {
    this.userData = await api.getUser()
  }
}
```

**Setup Store Action:**
```typescript
async function fetchUser() {
  userData.value = await api.getUser()
}
```

### 5. Plugins

Pinia supports plugins to extend store functionality. Plugins are added to the Pinia instance using `pinia.use()`.

**Plugin Example:**
```typescript
function myPiniaPlugin({ store }) {
  store.hello = 'world'
}

const pinia = createPinia()
pinia.use(myPiniaPlugin)
```

### 6. Store Composition

Stores can use other stores by importing and calling their `useStore()` functions within actions, getters, or at the top of setup stores.

```typescript
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const user = useUserStore()
  // ... rest of the store
})
```

## Key APIs

### `createPinia()`
Creates the root Pinia instance that holds all stores.

### `setActivePinia(pinia)`
Sets the active Pinia instance, used for SSR and testing.

### `storeToRefs(store)`
Extracts reactive refs from a store for destructuring while maintaining reactivity.

### `mapStores()`, `mapState()`, `mapActions()`
Helper functions for using Pinia with the Options API.

### `acceptHMRUpdate()`
Enables Hot Module Replacement for stores during development.

## Testing

Pinia provides testing utilities through `@pinia/testing`:

```typescript
import { createTestingPinia } from '@pinia/testing'

const wrapper = mount(Component, {
  global: {
    plugins: [createTestingPinia()]
  }
})
```

**Testing Features:**
- Automatic action stubbing
- Initial state configuration
- Selective action mocking
- Getter mocking

## Server-Side Rendering (SSR)

Pinia supports SSR by:
1. Creating a new Pinia instance per request
2. Serializing store state for hydration
3. Using `pinia.state.value` for state transfer

## Migration from Vuex

Pinia offers a simpler API compared to Vuex:
- No mutations (actions handle state changes)
- No modules (each store is independent)
- Better TypeScript support
- Composition API integration

## Development Tools

Pinia integrates with Vue Devtools to provide:
- Store inspection
- State time-travel debugging
- Action tracking
- Plugin support

## Configuration

### TypeScript Support
Pinia provides full TypeScript support with automatic type inference. For custom types, extend the following interfaces:

```typescript
declare module 'pinia' {
  export interface PiniaCustomProperties {
    // custom properties
  }
}
```

### Hot Module Replacement
Enable HMR for stores:

```typescript
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMyStore, import.meta.hot))
}
```

## Best Practices

1. **Store Organization**: Define each store in a separate file
2. **State Design**: Keep state minimal and normalized
3. **Getter Usage**: Use getters for derived state
4. **Action Design**: Keep actions focused and async when needed
5. **Testing**: Test stores independently from components
6. **SSR**: Use proper hydration for server-side rendering

## Performance Considerations

- Stores are lazily instantiated when first used
- Getters are cached and only recompute when dependencies change
- Actions are tracked for devtools but have minimal overhead
- Plugins are applied once per store creation

## Debugging

Pinia provides several debugging features:
- `store.$state` for direct state inspection
- `store.$subscribe()` for state change monitoring
- `store.$onAction()` for action tracking
- Vue Devtools integration for visual debugging

## Common Patterns

### Persisting State
```typescript
pinia.use(({ store }) => {
  const saved = localStorage.getItem(store.$id)
  if (saved) {
    store.$patch(JSON.parse(saved))
  }
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
})
```

### Debouncing Actions
```typescript
pinia.use(({ options, store }) => {
  if (options.debounce) {
    return Object.keys(options.debounce).reduce((debounced, action) => {
      debounced[action] = debounce(store[action], options.debounce[action])
      return debounced
    }, {})
  }
})
```

## Troubleshooting

### Common Issues
1. **Store not updating**: Ensure you're using reactive state correctly
2. **SSR hydration mismatch**: Use `skipHydrate()` for non-serializable state
3. **TypeScript errors**: Check type declarations and generic parameters
4. **Testing issues**: Ensure proper Pinia instance setup in tests

### Debugging Tips
- Use Vue Devtools to inspect store state
- Check store subscriptions for unexpected changes
- Verify plugin application order
- Test stores in isolation before integration

## Contributing

When contributing to Pinia:
1. Follow the existing code style
2. Add tests for new features
3. Update documentation for API changes
4. Consider backward compatibility
5. Test with both Vue 3 and Nuxt 3

## Resources

- [Official Documentation](https://pinia.vuejs.org)
- [GitHub Repository](https://github.com/vuejs/pinia)
- [Mastering Pinia Course](https://masteringpinia.com)
- [Vue.js State Management Guide](https://vuejs.org/guide/scaling-up/state-management.html)