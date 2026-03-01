# Lab

[中文文档](./docs/README-CN.md)

A Vite-based experimental playground with multiple modules for learning and practicing.

## Modules

### 1. Sandboxes

Put each experiment in a `sandboxs/<name>/` folder and access it via the `/sandboxs/<name>/` route.

### 2. Agent

Agent development practices, experiments, and optimizations.

### 3. Monorepo

Includes [Reimplementing-Masterpieces](https://github.com/ceilf6/Reimplementing-Masterpieces) as a submodule for studying and reimplementing elegant engineering solutions.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The server will start at `http://localhost:8030` and automatically open the browser.

3. Create a new experiment:

- Create a new folder `my-widget` under `sandboxs/`
- Write your page in `sandboxs/my-widget/index.html`
- Open `http://localhost:8030/sandboxs/my-widget/` in your browser

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build production version to `dist/` |
| `npm run preview` | Preview the production build |

## Features

- Fast startup with Vite and Hot Module Replacement (HMR)
- Automatic scanning of all folders under `sandboxs/`
- Independent HTML/CSS/JS for each folder
- Modern JavaScript and ES modules support
- Homepage automatically lists all available examples

A demo is included in `sandboxs/demo`.

