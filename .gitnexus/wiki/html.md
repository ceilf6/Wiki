# HTML

# HTML Module Documentation

## Overview

This module provides a comprehensive collection of HTML examples, explanations, and patterns for building web pages. It covers fundamental HTML concepts from basic document structure to advanced form handling and semantic markup.

## Core Concepts

### HTML Entities

HTML entities allow you to display reserved characters and special symbols in web pages. They use two formats:
- Named entities: `&entity_name;` (e.g., `&lt;` for `<`)
- Numeric entities: `&#entity_number;` (e.g., `&#60;` for `<`)

Common entities include:
- `&lt;` and `&gt;` for angle brackets
- `&nbsp;` for non-breaking space
- `&copy;` for copyright symbol

### HTML Parsing

The `StackParseHTML.js` file demonstrates a simplified HTML parsing algorithm using a stack-based approach:

```javascript
const stack = []
root = document
current = root

for (token in tokens)
    if (token in startTag) {
        node = createNode(token)
        current.appendChild(node)
        stack.push(node)
        current = node
    }
    else if (token in endTag) {
        stack.pop()
        current = stack.top()
    }
```

This algorithm builds a DOM tree by:
1. Creating nodes for start tags and pushing them onto a stack
2. Popping nodes from the stack when end tags are encountered
3. Maintaining a reference to the current node for appending children

Modern browsers use more sophisticated parsers with state machines and error recovery rules.

## HTML Elements

### Document Structure

Every HTML document follows this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Page content -->
</body>
</html>
```

Key components:
- `<!DOCTYPE html>`: Document type declaration
- `<html>`: Root element
- `<head>`: Metadata container (not displayed)
- `<body>`: Visible content container

### Links (`<a>`)

The anchor element creates hyperlinks with various behaviors:

**Target attributes:**
- `_self`: Opens in same window (default)
- `_blank`: Opens in new window/tab
- `_parent`: Opens in parent frame
- `_top`: Opens in full body of window

**Link types:**
- URL links: `href="https://example.com"`
- Anchor links: `href="#section-id"`
- JavaScript: `href="javascript:alert('Hello')"`
- Email: `href="mailto:user@example.com"`
- Telephone: `href="tel:+1234567890"`

### Images (`<img>`)

The image element displays visual content with these key attributes:
- `src`: Image source URL
- `alt`: Alternative text for accessibility
- `usemap`: Associates with an image map

**Image maps** (`<map>`) define clickable regions using `<area>` elements with shapes:
- `circle`: Circular region
- `rect`: Rectangular region
- `poly`: Polygonal region

### Lists

HTML supports three list types:

1. **Ordered lists** (`<ol>`): Numbered items
2. **Unordered lists** (`<ul>`): Bulleted items
3. **Description lists** (`<dl>`): Term-definition pairs with `<dt>` and `<dd>`

### Multimedia

**Video and audio elements** support:
- `controls`: Show playback controls
- `autoplay`: Start automatically
- `muted`: Mute audio
- `loop`: Repeat playback

For cross-browser compatibility, use multiple `<source>` elements:

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <p>Fallback text for unsupported browsers</p>
</video>
```

### Container Elements

Semantic containers provide meaning to page sections:

- `<div>`: Generic container (no semantic meaning)
- `<header>`: Page or section header
- `<footer>`: Page or section footer
- `<article>`: Self-contained content
- `<section>`: Thematic grouping
- `<aside>`: Tangentially related content
- `<nav>`: Navigation links

### Text Elements

**Headings** (`<h1>` to `<h6>`): Define document hierarchy

**Paragraphs** (`<p>`): Block-level text containers

**Inline elements:**
- `<span>`: Generic inline container
- `<pre>`: Preformatted text (preserves whitespace)
- `<code>`: Computer code
- `<abbr>`: Abbreviation with tooltip
- `<time>`: Machine-readable date/time
- `<q>`: Short inline quotation
- `<blockquote>`: Block-level quotation

### Form Elements

Forms collect user input with various control types:

**Input types:**
- Text: `type="text"`, `type="password"`
- Date/time: `type="date"`, `type="time"`, `type="week"`
- Selection: `type="checkbox"`, `type="radio"`
- File: `type="file"`
- Buttons: `type="submit"`, `type="reset"`, `type="button"`

**Form structure:**
- `<form>`: Container with `action` and `method` attributes
- `<fieldset>`: Groups related controls
- `<legend>`: Caption for fieldset
- `<label>`: Associates text with form controls
- `<datalist>`: Provides autocomplete suggestions

**Form states:**
- `readonly`: User cannot modify but value is submitted
- `disabled`: User cannot modify and value is not submitted

### Tables

Tables organize data in rows and columns:

```html
<table>
    <caption>Table Title</caption>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Footer</td>
        </tr>
    </tfoot>
</table>
```

Key attributes:
- `rowspan`: Merge rows vertically
- `colspan`: Merge columns horizontally

## Element Containment Rules

HTML elements follow specific containment rules based on content categories:

1. Container elements can contain any element
2. `<a>` elements can contain almost any element
3. Some elements have fixed children:
   - `<ul>` and `<ol>` only contain `<li>`
   - `<dl>` contains `<dt>` and `<dd>`
4. Heading and paragraph elements cannot contain each other

## Best Practices

### Semantic HTML

Choose elements based on content meaning, not visual appearance:

```html
<!-- Good: Semantic -->
<header>
    <nav>...</nav>
</header>
<article>
    <section>...</section>
</article>

<!-- Avoid: Non-semantic -->
<div class="header">
    <div class="nav">...</div>
</div>
```

### Accessibility

- Always include `alt` attributes for images
- Use proper heading hierarchy (`<h1>` through `<h6>`)
- Associate labels with form controls using `for` and `id` attributes
- Provide alternative content for multimedia

### Performance

- Use appropriate image formats and sizes
- Lazy-load off-screen images and iframes
- Minimize DOM depth and complexity

## Integration with CSS

HTML elements provide structure, while CSS handles presentation. Key integration points:

- Semantic elements have default browser styles that can be overridden
- Use CSS classes for styling rather than inline styles
- Leverage CSS pseudo-classes like `:checked`, `:focus`, and `:hover` for interactive states

## Example Patterns

### Responsive Images

```html
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Description">
</picture>
```

### Accessible Forms

```html
<form>
    <fieldset>
        <legend>Personal Information</legend>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </fieldset>
    <button type="submit">Submit</button>
</form>
```

### Data Tables

```html
<table>
    <caption>Quarterly Sales</caption>
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Widget A</th>
            <td>$10,000</td>
            <td>$12,000</td>
        </tr>
    </tbody>
</table>
```

## Browser Compatibility

HTML5 introduced many new elements and attributes. For older browsers:
- Use feature detection
- Provide fallback content
- Consider polyfills for critical features

## Resources

- [HTML Living Standard](https://html.spec.whatwg.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [HTML5 Element Periodic Table](https://zptcsoft.github.io/html5-elements-periodic-table/)