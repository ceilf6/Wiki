# Vue3 — composition-API

# Vue 3 Composition API — GDP Bar Chart Demo

A Vue 3 application that renders animated horizontal bar charts of GDP data using the Composition API. It demonstrates the **composable pattern** — extracting reusable reactive logic into standalone functions — as the primary architectural principle of Vue 3's Composition API.

## Overview

The app fetches GDP data for five countries, displays it as two differently styled bar charts side by side, and lets users edit values in real time. When a value changes, both charts animate smoothly to their new sizes via GSAP.

```
┌─────────────────────────────────────────────────┐
│  App.vue                                        │
│  ┌───────────────┐  ┌───────────────┐           │
│  │   Bar1.vue    │  │   Bar2.vue    │           │
│  │  (maxSize=400)│  │  (maxSize=600)│           │
│  │               │  │               │           │
│  │  useBar()     │  │  useBar()     │           │
│  └───────────────┘  └───────────────┘           │
│                                                 │
│  ┌─────────────────────────────────────┐        │
│  │  <input> controls (v-model binding) │        │
│  └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

## Project Structure

```
Vue3/composition-API/
├── index.html              # Vite entry HTML
├── package.json            # Dependencies: vue@3, gsap, vite
├── vite.config.js          # Dev server proxy config
├── gdp.json                # Static GDP data (served via proxy)
└── src/
    ├── main.js             # App bootstrap
    ├── App.vue             # Root component — data fetching + controls
    ├── components/
    │   ├── Bar1.vue        # Left-aligned bar chart variant
    │   └── Bar2.vue        # Center-aligned bar chart variant
    └── composition/
        └── useBar.js       # Shared composable — bar calculation + animation
```

## Data Flow

1. `main.js` calls `createApp(App).mount('#app')`.
2. `App.vue`'s `setup()` fetches `/api/gdp.json` (proxied to `gdp.json` on disk) and stores the result in a `ref([])`.
3. The reactive `gdp` array is passed as a prop to both `Bar1` and `Bar2`.
4. Each bar component wraps the prop in a `computed` and delegates to `useBar(maxSize, gdp)`.
5. `useBar` watches the computed GDP data, recalculates bar sizes, and uses GSAP to animate transitions.
6. Editing an `<input>` mutates the `gdp` ref in-place via `v-model`, which propagates reactively through the entire chain.

## Key Components

### `App.vue` — Root Component

Uses the `setup()` option to:

- Declare a `ref([])` for the GDP dataset.
- Define `fetchGdp()` which loads data from the proxied API endpoint.
- Return `gdp` to the template for binding to child components and input controls.

```js
setup() {
  const gdp = ref([]);
  async function fetchGdp() {
    gdp.value = await fetch("/api/gdp.json").then((resp) => resp.json());
  }
  fetchGdp();
  return { gdp };
}
```

The template renders two chart components and a set of `<input type="number">` controls. Because `gdp` is a reactive `ref`, editing any input value via `v-model="item.value"` triggers reactivity in every consumer — both bar charts and the composable's watcher.

### `Bar1.vue` and `Bar2.vue` — Chart Components

Both components follow the same pattern:

```js
setup(props) {
  const gdp = computed(() => props.gdp);
  return {
    ...useBar(400, gdp),  // Bar1 uses 400, Bar2 uses 600
  };
}
```

They wrap the incoming `gdp` prop in a `computed` to create a stable reactive reference, then spread the return value of `useBar` into the component's setup return. This makes `bars` available in the template.

The two components differ only in styling:
- **Bar1** — left-aligned bars with labels positioned to the left of the axis.
- **Bar2** — center-aligned bars with a vertical center line and text overlay.

### `useBar` Composable (`src/composition/useBar.js`)

This is the core reusable logic. It accepts a `maxSize` (pixel width for the largest bar) and a reactive `gdp` reference, and returns a reactive `bars` array ready for rendering.

```js
export default function useGdpBar(maxSize, gdp) {
  // ...
  return { bars };
}
```

**Internal mechanics:**

1. **`max` (computed)** — finds the highest GDP value in the dataset. Used to normalize all bar widths.

2. **`targetBars` (computed)** — maps each GDP entry to an object with:
   - `size`: proportional pixel width (`(value / max) * maxSize`)
   - `color`: cycled from a five-color palette
   - plus the original `country` and `value` fields

3. **`watch(targetBars, ...)`** — deep-watches the computed target. On change, it iterates through the new values and uses `gsap.to()` to animate each bar's `size`, `value`, and `color` from their current state to the target over 1 second. If a bar doesn't exist yet (initial load), it's created with `size: 0` and `value: 0` so the animation starts from nothing.

```js
watch(
  targetBars,
  (newValue) => {
    for (let i = 0; i < newValue.length; i++) {
      if (!bars.value[i]) {
        bars.value[i] = { ...newValue[i], size: 0, value: 0 };
      }
      gsap.to(bars.value[i], { ...newValue[i], duration: 1 });
    }
  },
  { deep: true }
);
```

The key insight is that `gsap.to()` mutates the properties of `bars.value[i]` in place over time. Because `bars` is a `ref` containing reactive objects, these mutations are tracked by Vue and trigger template re-renders on each animation frame — producing smooth animated bars without any manual requestAnimationFrame logic.

## Composition API Patterns Demonstrated

| Pattern | Where | Purpose |
|---|---|---|
| `ref()` | `App.vue`, `useBar.js` | Reactive mutable state |
| `computed()` | `Bar1.vue`, `Bar2.vue`, `useBar.js` | Derived/transformed reactive values |
| `watch()` | `useBar.js` | Side effects on data change (animation) |
| Composable function | `useBar.js` | Extract and reuse stateful logic across components |
| `setup()` option | `App.vue`, `Bar1.vue`, `Bar2.vue` | Entry point for Composition API in components |

The composable pattern is the central lesson here. In Vue 2, sharing this logic would require mixins (with name collision risks) or scoped slots (with awkward ergonomics). With the Composition API, `useBar` is a plain function that encapsulates reactive state, computed properties, watchers, and side effects — and can be called from any component with different parameters.

## Development Setup

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:3000`. The `vite.config.js` proxies `/api/*` requests to the project root, stripping the `/api` prefix so that `/api/gdp.json` resolves to `./gdp.json`:

```js
proxy: {
  '/api': {
    target: 'http://127.0.0.1:5500/Vue3/composition-API',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

> **Note:** This uses the initial Vite 1.x config format where `proxy` is a top-level key (not nested under `server`).

## Data Format

`gdp.json` contains an array of objects:

```json
[
  { "country": "美国", "value": 30.615 },
  { "country": "中国", "value": 19.398 },
  ...
]
```

Each entry has a `country` string and a `value` number (in trillions). The composable adds `size` and `color` properties during processing.