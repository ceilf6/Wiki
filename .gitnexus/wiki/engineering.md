# engineering

# Engineering Module: Webpack Demo

## Overview

This module demonstrates a complete webpack-based build system for a frontend application. It showcases modern JavaScript bundling, CSS preprocessing, asset management, and development server configuration. The demo project is a "movie-list" application that uses jQuery and LESS for styling.

## Project Structure

```
engineering/webpack/demo/
├── babel.config.js          # Babel transpilation configuration
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS plugin configuration
├── public/
│   └── index.html           # HTML template for HtmlWebpackPlugin
├── src/
│   ├── a.js                 # Simple module export
│   ├── a.less               # LESS stylesheet
│   ├── addImg.js            # Dynamic image insertion module
│   ├── b.js                 # Simple module export
│   ├── b.module.less        # CSS Module stylesheet
│   ├── c.module.less        # CSS Module stylesheet
│   ├── home/
│   │   └── index.js         # Home module
│   ├── index.less           # Global LESS stylesheet
│   └── main.js              # Application entry point
└── webpack.config.js        # Main webpack configuration
```

## Build System Architecture

```mermaid
graph TD
    A[Entry: src/main.js] --> B[Webpack Bundler]
    B --> C[JavaScript Processing]
    B --> D[CSS/LESS Processing]
    B --> E[Asset Processing]
    
    C --> F[Babel Loader]
    F --> G[Output: js/app-[hash].js]
    
    D --> H[Less Loader]
    H --> I[PostCSS Loader]
    I --> J[CSS Loader]
    J --> K[MiniCssExtractPlugin]
    K --> L[Output: css/[name]-[hash].css]
    
    E --> M[Asset Modules]
    M --> N[Output: assets/[hash][ext]]
    
    B --> O[Plugins]
    O --> P[HtmlWebpackPlugin]
    O --> Q[CleanWebpackPlugin]
    O --> R[CopyPlugin]
```

## Webpack Configuration

### Entry and Output

- **Entry**: `./src/main.js` - The main application entry point
- **Output**: 
  - Path: `./dist` directory
  - JavaScript: `js/app-[contenthash:5].js` (with content hashing for cache busting)
  - Assets: `assets/[hash:5][ext]` (images, media files)
  - Chunks: `js/chunk-[contenthash:5].js` (for code splitting)

### Development Server

- Port: 8080
- Source maps enabled (`devtool: 'source-map'`)
- Stats: Only shows errors (`stats: 'errors-only'`)

### Module Processing Rules

#### JavaScript Files
- **Loader**: `babel-loader`
- **Excludes**: `node_modules` directory
- **Purpose**: Transpiles modern JavaScript to compatible versions

#### CSS and LESS Files
- **Loader Chain**: 
  1. `MiniCssExtractPlugin.loader` - Extracts CSS into separate files
  2. `css-loader` - Resolves CSS imports and url() references
  3. `postcss-loader` - Applies PostCSS transformations
  4. `less-loader` - Compiles LESS to CSS

#### Asset Files
- **Images** (gif, png, webp, svg, jpg, jpeg, bmp):
  - Type: `asset` (automatically chooses between inline and file)
  - Inline threshold: 1024 bytes (files smaller than 1KB are base64 encoded)
  - Output: `assets/[hash:5][ext]`

- **Media** (mp3, mp4):
  - Type: `asset/resource` (always outputs as separate files)

### Plugins

1. **HtmlWebpackPlugin**: Generates HTML file from `public/index.html` template
2. **MiniCssExtractPlugin**: Extracts CSS into separate files with content hashing
3. **CleanWebpackPlugin**: Cleans the output directory before each build
4. **CopyPlugin**: Copies static assets from `public/` to output (excluding HTML files)

### Path Resolution

- **Alias**: `@` maps to `src/` directory for cleaner imports
  ```javascript
  import imgUrl from '@/a.png'  // Resolves to src/a.png
  ```

## Babel Configuration

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',  // Only polyfill features actually used
        corejs: 3,             // Use core-js version 3
      },
    ],
  ],
};
```

This configuration:
- Uses `@babel/preset-env` for automatic environment-based transpilation
- Enables automatic polyfilling of only the features used in the code
- Uses core-js version 3 for polyfills

## PostCSS Configuration

```javascript
// postcss.config.js
module.exports = () => ({
  plugins: ['cssnano', 'autoprefixer'],
});
```

- **cssnano**: Minifies CSS in production
- **autoprefixer**: Automatically adds vendor prefixes based on browser support

## Source Code Patterns

### Entry Point (`src/main.js`)

The main entry file demonstrates several webpack features:

1. **Modern JavaScript**: Uses async functions and nullish coalescing operator (`??`)
2. **CSS Modules**: Imports and uses CSS Modules for scoped styling
3. **Dynamic Imports**: Demonstrates code splitting potential
4. **Asset Imports**: Shows how to import and use images

```javascript
// CSS Modules usage
import styles1 from './b.module.less';
import styles2 from './c.module.less';

$('<h1>')
  .text('b.module.less样式中的类样式a')
  .addClass(styles1.a)  // Scoped class name
  .appendTo(document.body);
```

### Asset Handling (`src/addImg.js`)

Demonstrates dynamic image insertion with webpack asset management:

```javascript
import $ from 'jquery';
import imgUrl from '@/a.png';  // Webpack resolves and processes this image

export function addImg() {
    $('<img>').prop('src', imgUrl).appendTo(document.body)
}
```

Key points:
- Images imported in JavaScript are processed by webpack's asset modules
- Small images (<1KB) are inlined as base64
- Larger images are output as separate files with hashed names

### CSS Modules

The project uses CSS Modules for scoped styling:
- `b.module.less` and `c.module.less` are treated as CSS Modules
- Class names are locally scoped by default
- Imported as JavaScript objects with class name mappings

## Development Workflow

### Available Scripts

```bash
# Start development server
npm run serve

# Build for production
npm run build
```

### Development Server Features

- Hot module replacement (implied by webpack-dev-server)
- Source maps for debugging
- Automatic rebuilding on file changes
- Local server at `http://localhost:8080`

## Key Features Demonstrated

1. **Modern JavaScript Support**: Automatic transpilation and polyfilling
2. **CSS Processing Pipeline**: LESS → PostCSS → CSS extraction
3. **Asset Optimization**: Automatic image optimization and inlining
4. **Code Splitting**: Automatic chunk creation for dynamic imports
5. **Cache Busting**: Content hashing for long-term caching
6. **Development Experience**: Source maps, dev server, and error-only stats

## Integration Points

This webpack configuration serves as a template for:
- Single-page applications requiring modern JavaScript features
- Projects using CSS preprocessors (LESS/SASS)
- Applications with mixed static and dynamic assets
- Development environments needing hot reloading and debugging tools

The configuration is extensible - additional loaders and plugins can be added for TypeScript, Vue, React, or other frameworks as needed.