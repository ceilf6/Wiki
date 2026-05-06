# CSS — try

# CSS — try Module

## Overview

This module provides a foundational reference for core CSS properties used in web development. It documents common styling attributes for text, colors, and layout, along with practical examples and debugging notes. The module serves as a quick reference for developers working with inline styles and basic CSS declarations.

## CSS Properties Reference

### Color Properties

#### `color`
Sets the text color of an element.

**Values:**
- **Predefined keywords:** `red`, `blue`, `green`, etc.
- **RGB notation:** `rgb(255, 0, 0)` — values range from 0-255 for red, green, and blue channels.
- **Hexadecimal notation:** `#ff4400` — two hex digits per channel (00-FF).

**Common hex shortcuts:**
- `#000` (black), `#fff` (white), `#f00` (red), `#0f0` (green), `#00f` (blue)
- `#f0f` (purple), `#0ff` (cyan), `#ccc` (gray)
- `#ff4400` (Taobao red) can be shortened to `#f40` when each channel has repeated digits.

#### `background-color`
Sets the background color of an element. Uses the same color value syntax as `color`.

### Typography Properties

#### `font-size`
Controls the size of text within an element.

**Units:**
- **`px` (pixels):** Absolute unit representing the height of the text in pixels.
- **`em`:** Relative unit based on the parent element's font size. If no parent font size is declared, it inherits from the root element (`<html>`), which uses the browser's base font size.

#### `font-weight`
Controls the thickness/boldness of text.

**Common values:**
- `normal` (equivalent to `400`)
- `bold` (equivalent to `700`)
- Numeric values: `100` to `900`

**Note:** The `<strong>` element has a default `font-weight: bold` and semantically represents important content.

#### `font-family`
Specifies the typeface for text. Multiple values can be provided as a fallback chain.

**Example:**
```css
font-family: consolas, 微软雅黑, Arial, sans-serif;
```
The browser uses the first available font. `sans-serif` serves as a generic fallback category.

#### `font-style`
Controls the style of text, typically for italicization.

**Common value:** `italic`

**Note:** The `<i>` and `<em>` elements have default italic styling. `<i>` represents special text (like terminology or icons), while `<em>` represents emphasized content.

### Text Layout Properties

#### `text-decoration`
Adds decorative lines to text.

**Common values:**
- `line-through` — strikethrough (used by `<del>` for deleted content and `<s>` for outdated content)
- `underline` — underline (default for `<a>` elements)

#### `text-indent`
Indents the first line of text within a block element.

**Units:** `px` or `em`

#### `line-height`
Controls the vertical spacing between lines of text.

**Special behavior:** Setting `line-height` equal to the element's `height` can vertically center single-line text. For multi-line content, modern layouts prefer Flexbox (`display: flex; align-items: center`).

**Numeric values:** When set to a unitless number (e.g., `1.5`), it's multiplied by the current `font-size`.

#### `letter-spacing`
Adjusts the horizontal spacing between characters.

**Units:** `px` or `em`

#### `text-align`
Controls horizontal alignment of inline content within a block element.

**Values:** `left`, `center`, `right`

### Box Model Properties

#### `width` and `height`
Set the dimensions of an element's content area.

**Units:** `px`, `em`, `%`, `vw`, `vh`, etc.

## Debugging & Inspection

When debugging CSS properties in browser developer tools:

1. **Elements panel:** Inspect the `elements.style` section to see applied styles.
2. **Computed tab:** View the final computed values (e.g., `em` units converted to `px`).
3. **User Agent Styles:** Browser default styles (UA styles) provide baseline styling for HTML elements.

## Example Implementation

The `text.htm` file demonstrates several properties in action:

```html
<p style="height: 50px; line-height: 50px; background-color: red;">
    Lorem ipsum dolor sit amet...
</p>
```

This example shows:
- A paragraph with fixed `height` and `line-height` for vertical centering
- Red background color applied via `background-color`
- Default text styling inherited from browser/user agent styles

## Integration Notes

This module operates independently with no internal or external dependencies. It serves as a reference implementation for basic CSS properties that can be applied to any HTML document. The properties documented here form the foundation for more complex styling systems and layout techniques.