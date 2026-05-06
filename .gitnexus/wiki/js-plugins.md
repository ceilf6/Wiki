# JS — plugins

# JS/plugins — Inheritance Utility

## Overview

This module provides a single utility function for implementing prototypal inheritance between constructor functions. It's part of the `myPlugin` namespace and offers a clean, non-polluting way to establish prototype chains in JavaScript.

## Module Initialization

```javascript
if (!this.myPlugin) {
    this.myPlugin = {};
}
```

The module initializes the `myPlugin` namespace if it doesn't already exist. This ensures the inheritance utility can be added to the namespace without overwriting existing properties.

## Function: `myPlugin.inherit`

### Purpose

Establishes a proper prototype chain between a child constructor and a parent constructor while avoiding common pitfalls of direct prototype assignment.

### Signature

```javascript
myPlugin.inherit(Child, Father)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `Child` | Function | The child constructor that will inherit from the parent |
| `Father` | Function | The parent constructor to inherit from |

### How It Works

The function performs three key operations to set up inheritance:

1. **Creates a clean prototype chain** using `Object.create(Father.prototype)`
2. **Restores the constructor reference** on the child's prototype
3. **Adds a convenience reference** to the parent's prototype

### Implementation Details

```javascript
// Step 1: Create prototype chain without polluting parent's prototype
Child.prototype = Object.create(Father.prototype);

// Step 2: Fix constructor reference (lost during prototype assignment)
Child.prototype.constructor = Child;

// Step 3: Add reference to parent's prototype (Grail pattern)
Child.prototype.uber = Father.prototype;
```

### Why This Approach?

The module comments explain the historical context:

- **Direct assignment** (`Child.prototype = Father.prototype`) causes prototype pollution
- **ES5 solution** uses `Object.create()` to create a new object with the specified prototype
- **Legacy approach** (pre-ES5) used a temporary constructor function in a closure
- **Grail pattern** adds an `uber` property for easy access to parent methods

### Example Usage

```javascript
// Define parent constructor
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return `${this.name} makes a sound.`;
};

// Define child constructor
function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Establish inheritance
myPlugin.inherit(Dog, Animal);

// Add child-specific method
Dog.prototype.fetch = function() {
    return `${this.name} fetches the ball!`;
};

// Usage
const rex = new Dog('Rex', 'German Shepherd');
console.log(rex.speak()); // "Rex makes a sound."
console.log(rex.fetch()); // "Rex fetches the ball!"
console.log(rex.constructor === Dog); // true
console.log(rex.uber === Animal.prototype); // true
```

## Key Features

1. **Non-polluting**: Uses `Object.create()` to avoid modifying the parent's prototype
2. **Constructor preservation**: Maintains correct `constructor` property on child instances
3. **Parent access**: Provides `uber` property for accessing parent prototype methods
4. **ES5+ compatible**: Uses modern JavaScript features while documenting legacy alternatives

## Integration Notes

- This module is designed to work with constructor functions (ES5-style classes)
- For ES6 classes, consider using the native `extends` keyword instead
- The `uber` property provides a convenient way to call parent methods, but `Object.getPrototypeOf(Child.prototype)` is the standard ES5+ alternative
- Always call the parent constructor within the child constructor using `Father.call(this, ...)` to initialize inherited properties

## Limitations

- Does not support multiple inheritance
- Requires manual parent constructor invocation in child constructors
- The `uber` property is non-standard (though widely used in this pattern)