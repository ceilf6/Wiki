# CSS — transition

# CSS — Transition Module

## Overview

This module provides test examples demonstrating CSS transitions and animations for rotating images. It contains two distinct implementations: one using CSS `@keyframes` animations for continuous rotation, and another using CSS `transition` properties for click-triggered rotation.

## File Structure

```
CSS/transition/test/图片旋转/
├── animation.html    # Continuous rotation using CSS animations
└── transition.html   # Click-triggered rotation using CSS transitions
```

## Implementation Details

### animation.html — Continuous Rotation

This example uses CSS `@keyframes` and the `animation` property to create an infinitely rotating image.

**CSS Implementation:**
```css
@keyframes rotateAnimationName {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.rotate {
    animation: rotateAnimationName 2s infinite;
}
```

**JavaScript Interaction:**
- The `rotateImg()` function toggles the `.rotate` class on the image element
- Button text updates dynamically based on animation state
- Uses `classList.toggle()` and `classList.contains()` for state management

**Key Characteristics:**
- Animation runs continuously (infinite loop)
- 2-second duration per rotation cycle
- Smooth 360-degree rotation
- Toggle-based start/stop control

### transition.html — Click-Triggered Rotation

This example uses CSS `transition` properties to create a rotation effect triggered by user interaction.

**CSS Implementation:**
```css
img {
    transform: rotate(0deg);
    transition: transform 0.5s ease;
}

.rotate {
    transform: rotate(360deg);
}
```

**JavaScript Interaction:**
- Simple `rotateImg()` function toggles the `.rotate` class
- No state tracking or button text updates
- Direct class toggling on each button click

**Key Characteristics:**
- Single rotation per click (toggles between 0° and 360°)
- 0.5-second transition duration
- Ease timing function for smooth acceleration/deceleration
- Stateless toggle behavior

## Usage

1. Open either HTML file in a web browser
2. For `animation.html`: Click the button to start/stop continuous rotation
3. For `transition.html`: Click the button to toggle between rotated and original states

## Key CSS Concepts Demonstrated

### CSS Animations (`animation.html`)
- `@keyframes` rule defines the animation sequence
- `animation` shorthand property controls timing, iteration, and playback
- `infinite` keyword creates continuous looping
- Class-based animation control via JavaScript

### CSS Transitions (`transition.html`)
- `transition` property defines how CSS changes are animated
- `transform` property handles the rotation transformation
- `ease` timing function provides natural acceleration/deceleration
- Class toggling triggers the transition effect

## Integration Notes

This module serves as a standalone test/example collection. The implementations are self-contained and don't depend on external libraries or frameworks. The image paths reference `../../../../assetsForTest/ceilf6.png`, indicating the test asset structure within the project.

## Development Considerations

When extending or modifying these examples:

1. **Performance**: CSS animations and transitions are GPU-accelerated for `transform` properties, making them efficient for rotation effects
2. **Browser Support**: Both approaches have excellent cross-browser support
3. **State Management**: The animation example maintains state via class toggling, while the transition example uses stateless toggling
4. **Timing Control**: Adjust `2s` (animation) or `0.5s` (transition) values to control rotation speed
5. **Easing Functions**: Replace `ease` with other timing functions (`linear`, `ease-in`, `ease-out`, `cubic-bezier()`) for different motion effects

## Example Modification

To change rotation direction or add additional transformations:

```css
/* Reverse rotation */
@keyframes reverseRotate {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
}

/* Combined transformations */
.rotate {
    transform: rotate(360deg) scale(1.2);
    transition: transform 0.5s ease;
}
```