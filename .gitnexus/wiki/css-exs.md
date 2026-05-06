# CSS — exs

# CSS — exs Module

## Overview

The **CSS — exs** module contains standalone HTML/CSS examples demonstrating fundamental CSS concepts. Each subdirectory showcases a specific CSS technique with minimal, self-contained code. These examples serve as learning references for developers working with CSS.

## Module Structure

```
CSS/exs/
├── background-image/   # Background image properties
├── exa/                # CSS selectors and style application methods
└── spirit/             # CSS sprite technique
```

## Examples

### 1. Background Image (`background-image/`)

**Purpose:** Demonstrates CSS background image properties.

**Files:**
- `index.html` - HTML page with body content
- `back-img.css` - CSS styling for background

**Key CSS Properties:**
```css
body {
    background: url("./img/bg.jpg") repeat fixed;
}
```

**Concepts Demonstrated:**
- Setting background images using `background-image` or shorthand `background`
- Background repetition with `background-repeat`
- Fixed positioning with `background-attachment: fixed`

**Note:** The CSS file contains both commented individual properties and their shorthand equivalent, showing two approaches to achieve the same result.

### 2. CSS Selectors & Style Application (`exa/`)

**Purpose:** Demonstrates CSS selector types and style application methods.

**Files:**
- `index.html` - HTML with various styled elements
- `css/index.css` - External stylesheet

**Style Application Methods Demonstrated:**
1. **Internal Styles** (within `<style>` tags):
   ```css
   h1 { color: blueviolet; text-align: center; }
   #text1 { color: red; }
   .red { color: red; }
   .big { font-size: 3em; }
   ```

2. **External Stylesheet** (linked via `<link>`):
   ```css
   .outside { color: purple; }
   ```

3. **Inline Styles** (using `style` attribute):
   ```html
   <p style="color:blue">内联样式</p>
   ```

**Selector Types Demonstrated:**
- Element selector (`h1`)
- ID selector (`#text1`)
- Class selector (`.red`, `.big`)
- Multiple classes (`class="red big"`)

**Important Note:** The example includes a comment about ID selectors not being able to start with numbers, which is a CSS naming convention rule.

### 3. CSS Sprite (`spirit/`)

**Purpose:** Demonstrates the CSS sprite technique for combining multiple images.

**File:**
- `index.html` - Self-contained example with embedded CSS

**Implementation:**
```css
div {
    width: 30px;
    height: 30px;
    background-image: url("icons.png");
    background-repeat: no-repeat;
    background-position: -47px -38px;
}
```

**Concepts Demonstrated:**
- Using a single image file containing multiple icons
- Positioning specific portions of the image using `background-position`
- Setting fixed dimensions for the display area
- Preventing image repetition with `background-repeat: no-repeat`

## Usage

Each example is self-contained and can be viewed by opening the respective `index.html` file in a web browser. No build process or dependencies are required.

## Development Notes

1. **Image Paths:** Examples reference local images (`bg.jpg`, `icons.png`). Ensure these files exist in the correct directories when running locally.

2. **Character Encoding:** All HTML files specify `charset="UTF-8"` for proper text rendering.

3. **Responsive Viewport:** Each HTML file includes the viewport meta tag for mobile compatibility:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

4. **No JavaScript:** These are pure CSS examples with no JavaScript dependencies.

## Adding New Examples

To add a new CSS example:
1. Create a new directory under `CSS/exs/`
2. Include an `index.html` file with proper HTML5 structure
3. Add CSS either inline, in a `<style>` block, or in an external file
4. Keep examples focused on a single CSS concept
5. Include comments explaining key techniques

## Relationship to Other Modules

This module is standalone and does not depend on or interact with other modules. It serves as a reference collection for CSS techniques that may be applied in other parts of a project.