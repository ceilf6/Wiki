# _reference

# `_reference` Module

## Overview

The `_reference` module contains saved snapshots of external websites used as design and implementation references. Currently, it holds a complete HTML snapshot of the **NANFU Group** corporate website (`https://www.nanfu.global/`), a battery manufacturer's marketing site built as a single-page application with rich scroll-driven animations, video backgrounds, and responsive layouts.

This module is not executable application code — it is a static reference artifact used to study UI patterns, animation techniques, and page structure from the production NANFU website.

## Module Contents

```
_reference/
└── NANFU/
    ├── NANFU Group _ Leading Battery Manufacturer & Power Solutions Provider.html
    └── NANFU Group _ Leading Battery Manufacturer & Power Solutions Provider_files/
        ├── index.d9c9dbee.js          # Main application bundle (ES module)
        ├── index.091b56b7.js          # Legacy/nomodule fallback bundle
        ├── index.78d8c051.css         # Primary stylesheet
        ├── respone.css                # Responsive breakpoint styles
        ├── z.js                       # Analytics/tracking script (CNZZ)
        ├── c.js                       # Additional tracking script
        ├── logo.svg                   # Site logo asset
        ├── circle.svg                 # Decorative circle element
        ├── a1.png, a2.png, a3.png     # Feature tab icons
        └── bg.png                     # Background image asset
```

## Page Architecture

The site is a Vue.js-based SPA rendered into a `#app` root element. The page is organized into distinct visual sections, each with its own scroll-triggered animation behavior.

### Section Breakdown

| Section | Class | Purpose |
|---------|-------|---------|
| **Header** | `header.fxc` | Navigation bar with desktop (`pcNav`) and mobile (`appNav`) variants, language switcher (EN, AR, CN, ES, PT, RU, TR, VN), and "Get in touch" CTA |
| **Banner** | `.row.banner` | Full-viewport hero with video background (`media.webm`/`media.mp4`), canvas-based frame animation (`bannerCv`), and headline: *"No.1 longest lasting alkaline battery"* |
| **Three Reasons** | `.row.r1` | Tabbed feature carousel (Swiper-based) showcasing: Marvellous Durability (+345%), Dominate Leader (31 years), Advanced Manufactory (3.3B units/year) |
| **Products** | `.row.r2` | Product showcase with three cards: Alkaline Battery (Regular), Alkaline Battery (Special), Button Cell |
| **Power Ring Technology** | `.row.r3` | Interactive technology explainer with video overlay and three annotated callouts: Super Capacity (0.16mm shell), Super Endurance, Ultra-low Loss (12-year power lock) |
| **History Timeline** | `.row.r5` | Horizontal scroll-driven timeline from 1954 (founding) through 2023 (international market entry), with canvas-based battery animation |
| **Footer** | `footer` | Contact info, product/technology/about links, social media (Facebook, YouTube), copyright |

### Key Visual Components

```
┌─────────────────────────────────────────────┐
│  Header (nav + language switcher + CTA)      │
├─────────────────────────────────────────────┤
│  Banner                                      │
│  ┌─────────────────────────────────────┐     │
│  │  Video BG + Canvas Frame Animation  │     │
│  │  "No.1 longest lasting..."          │     │
│  └─────────────────────────────────────┘     │
├─────────────────────────────────────────────┤
│  Three Reasons (Swiper tabs)                 │
│  [Durability] [Leader] [Manufactory]         │
├─────────────────────────────────────────────┤
│  Products Grid                               │
│  [Alkaline Regular] [Alkaline Special] [BTN] │
├─────────────────────────────────────────────┤
│  Power Ring Technology                       │
│  ┌─────────────────────────────────────┐     │
│  │  Video + Annotated Callouts         │     │
│  │  ● Super Capacity  ● Endurance      │     │
│  │  ● Ultra-low Loss                   │     │
│  └─────────────────────────────────────┘     │
├─────────────────────────────────────────────┤
│  History Timeline (horizontal scroll)        │
│  1954 ── 1990 ── 1993 ── ... ── 2023        │
├─────────────────────────────────────────────┤
│  Footer                                      │
└─────────────────────────────────────────────┘
```

## JavaScript Architecture

### Entry Points

The site loads two script bundles with a module/nomodule pattern for browser compatibility:

- **`index.d9c9dbee.js`** — ES module entry point (modern browsers)
- **`index.091b56b7.js`** — Legacy bundle with `defer` attribute (older browsers)

### Core Runtime (`index.d9c9dbee.js`)

The main bundle is a Vue.js application that handles:

**Viewport & Layout**
- `calcWinsize` — Computes window dimensions for responsive calculations
- `Viewport` class — Manages viewport state and resize events
- `drawFitCoverImage` / `coverImg` — Implements CSS `object-fit: cover` behavior on canvas elements

**Scroll-Driven Animations**
- Elements with `data-speed` attributes receive parallax transforms based on scroll position
- The `.alanFn` / `.alanChild` class pattern triggers staggered reveal animations as elements enter the viewport
- The history timeline (`.row.r5`) uses horizontal scroll mapping — the `.process` group translates horizontally as the user scrolls vertically through a tall container (`height: 10084.5px`)

**Canvas Frame Animations**
- `bannerCv` — Renders pre-rendered animation frames (120 frames at 2750×1494) from `/templates/assets/home/bannerFm/` and `/templates/assets/home/bannerFm_app/`
- `batteryCv` — Renders battery animation frames (150 frames at 718×215) from `/templates/assets/home/batteryFm`

**Media Handling**
- Desktop: Standard `<video>` elements with `autoplay muted playsinline`
- Mobile: `.ts` section elements that load MPEG-TS segments (e.g., `media.ts`, `in.ts`, `loop.ts`)
- Lazy loading via `data-src` attributes on `.lazy` elements

**Event System**
- `on` / `off` — Event listener management
- `preventDefault` calls on touch/scroll events for controlled scrolling behavior
- `cancelAnimationFrame` usage for animation lifecycle management

### Analytics (`z.js`)

CNZZ analytics tracking script, loaded in a `.hide` container. Tracks page views for web ID `1281408994`.

## CSS Architecture

### External Stylesheets

- **`index.78d8c051.css`** — Primary styles (referenced but not fully included in snapshot)
- **`respone.css`** — Responsive breakpoint overrides

### Inline Styles

The snapshot includes significant inline CSS:

**Toastify Styles** — Complete CSS for the `react-toastify` notification library, including:
- Container positioning (6 placement variants)
- Toast themes (light, dark, colored)
- Progress bar animations
- Entry/exit animations (bounce, zoom, flip, slide)
- Spinner component

**Immersive Translate Extension Styles** — CSS injected by a browser translation extension, including modal dialogs, loading spinners, and button styles. These are not part of the site itself.

**Site-Specific Styles** — Custom CSS for:
- Video overlay controls (`.ZgIIHVSSYI`, `.kAA8SjbHe2`)
- Canvas animation containers
- Responsive layout helpers

### CSS Custom Properties

The site uses a DaisyUI-compatible theming system with CSS custom properties:

```css
--p / --pc    /* Primary color / primary content */
--s / --sc    /* Secondary color / secondary content */
--a / --ac    /* Accent color / accent content */
--n / --nc    /* Neutral color / neutral content */
--b1 / --b2 / --b3 / --bc  /* Base colors */
--in / --su / --wa / --er  /* Info / Success / Warning / Error */
```

Multiple theme variants are defined: `light`, `dark`, `cupcake`, `bumblebee`, `emerald`, `corporate`, `synthwave`, `retro`, `cyberpunk`, `valentine`, `halloween`, `garden`, `forest`, `aqua`, `lofi`, `pastel`, `fantasy`, `wireframe`, `black`, `luxury`, `dracula`, `cmyk`, `autumn`, `business`, `acid`, `lemonade`, `night`, `coffee`, `winter`.

## Responsive Strategy

The site uses a dual-layout approach:

- **Desktop** (`.pc` class visible, `.app` hidden): Full navigation bar, standard `<video>` elements, canvas animations
- **Mobile** (`.app` class visible, `.pc` hidden): Hamburger menu with full-screen overlay (`.menu`), MPEG-TS video segments, simplified layouts

The mobile menu uses an SVG shape overlay (`shape-overlays`) with a full-viewport `<rect>` for the menu background transition.

## Key Data Attributes

| Attribute | Purpose |
|-----------|---------|
| `data-vh` | Sets element height as a multiple of viewport height |
| `data-speed` | Parallax speed as `"x,y"` values for scroll-driven transforms |
| `data-src` | Lazy-load image/video source URL |
| `data-path` | Canvas frame sequence directory path |
| `data-count` | Total frame count for canvas animations |
| `data-onlypc` | Restricts element to desktop viewport |
| `data-mp4` / `data-webm` | Video source URLs for lazy-loaded media |
| `data-scroll` | Enables scroll-triggered animation on element |
| `data-swiper-parallax` | Swiper parallax offset value |

## Connection to External Dependencies

The site references several external resources:

- **Vue.js** — Application framework (loaded via `engineering/src/vue.browser.js` in the call graph)
- **Swiper** — Touch slider library for tabbed content and product carousel
- **GSAP-like animation** — Scroll-triggered transforms (the `data-speed` system and `alanFn`/`alanChild` reveal pattern suggest a custom or GSAP-based scroll animation controller)
- **CNZZ Analytics** — Chinese web analytics platform
- **Immersive Translate** — Browser extension (not site-authored, injected by user's browser)

## Usage Notes

This reference module is intended for:

1. **Design reference** — Studying the visual layout, animation patterns, and responsive behavior of the production NANFU site
2. **Content reference** — Understanding the information architecture and content hierarchy
3. **Technical reference** — Analyzing the scroll animation system, canvas frame rendering, and dual-layout responsive approach

The HTML snapshot captures a single moment in time and may not reflect subsequent updates to the live site. Asset paths reference the live domain (`/templates/assets/...`, `/upfiles/...`) and will not resolve locally without a proxy or mirror.