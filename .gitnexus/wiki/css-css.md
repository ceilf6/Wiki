# CSS — CSS

# CSS Module

This module provides foundational CSS utilities and examples for web development. It includes a comprehensive CSS reset stylesheet and two HTML files demonstrating pseudo-element and pseudo-class selectors.

## Reset.css

A public domain CSS reset stylesheet based on Eric Meyer's reset v2.0. It normalizes default browser styles across all HTML elements to ensure consistent rendering.

### Purpose

Eliminates browser inconsistencies in default styling by:
- Removing default margins, padding, and borders
- Setting consistent font sizing and inheritance
- Normalizing list styles, quotes, and table formatting
- Applying HTML5 display roles for older browsers

### Key Components

**Element Reset**: Applies uniform styling to 100+ HTML elements including:
- Block and inline elements (`div`, `span`, `p`, etc.)
- Text formatting elements (`h1`-`h6`, `strong`, `em`, etc.)
- Form elements (`input`, `button`, `select`, etc.)
- HTML5 semantic elements (`article`, `section`, `nav`, etc.)

**Specific Normalizations**:
- `body` line-height set to 1
- Lists (`ol`, `ul`) have no list-style
- Blockquotes and quotes have no quotes
- Tables have collapsed borders and no spacing

### Usage

Include this file before any other CSS to establish a consistent baseline:

```html
<link rel="stylesheet" href="CSS/reset.css">
```

## Pseudo-Element Selectors Example

Demonstrates CSS pseudo-element selectors through `伪元素选择器.html`.

### Implemented Selectors

- `::selection` - Styles text when selected by the user
  - Background: `#008c8c` (teal)
  - Color: `yellow`

### Commented Examples

The file includes commented examples for:
- `::first-letter` - Styles the first letter of a paragraph
- `::first-line` - Styles the first line of a paragraph

### Usage

Open `CSS/伪元素选择器.html` in a browser to see the selection styling in action. Select text within the paragraph to observe the custom selection colors.

## Pseudo-Class Selectors Example

Demonstrates CSS pseudo-class selectors through `伪类选择器.html`.

### Implemented Selectors

**Link Pseudo-Classes**:
- `a:first-child` - Styles anchor elements that are first children
- `a:first-of-type` - Styles the first anchor element among siblings
- `a:last-child` - Styles anchor elements that are last children
- `a:last-of-type` - Styles the last anchor element among siblings
- `a:nth-of-type(odd)` - Styles odd-numbered anchor elements

**Structural Pseudo-Classes**:
- `li:nth-child(odd)` - Styles odd-numbered list items with alternating colors

### Visual Demonstrations

The file contains two main sections:
1. **Navigation section** with multiple anchor elements demonstrating pseudo-class targeting
2. **Unordered list** with alternating row colors using `nth-child(odd)`

### Usage

Open `CSS/伪类选择器.html` to observe:
- Anchor elements styled based on their position among siblings
- List items with alternating background colors
- The difference between `:first-child` and `:first-of-type` selectors

## Integration with Projects

### Reset.css Integration

For new projects, include the reset stylesheet as the first CSS file:

```html
<head>
    <link rel="stylesheet" href="CSS/reset.css">
    <link rel="stylesheet" href="your-styles.css">
</head>
```

### Learning from Examples

The HTML example files serve as interactive references for:
- Understanding pseudo-element and pseudo-class selector syntax
- Testing selector behavior in different browsers
- Copying selector patterns for use in your own stylesheets

## Browser Compatibility

- **Reset.css**: Compatible with all modern browsers and IE8+
- **Pseudo-element selectors**: `::selection` supported in all modern browsers
- **Pseudo-class selectors**: Full support in modern browsers, partial support in older IE versions

## File Structure

```
CSS/
├── reset.css              # CSS reset stylesheet
├── 伪元素选择器.html       # Pseudo-element selector examples
└── 伪类选择器.html         # Pseudo-class selector examples
```

## Best Practices

1. **Always use reset.css** at the beginning of your CSS stack to avoid cross-browser inconsistencies
2. **Test pseudo-selectors** across browsers, as support varies for newer selectors
3. **Use semantic HTML** to maximize the effectiveness of structural pseudo-classes
4. **Combine selectors** carefully to avoid specificity conflicts

## Extending the Module

To add new CSS utilities or examples:
1. Create new `.css` files for reusable styles
2. Create new `.html` files for interactive demonstrations
3. Follow the existing naming conventions and organization
4. Document any new selectors or patterns with comments in the HTML files