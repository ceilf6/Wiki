# Monorepo Locales Demo

这是一个简单的 Monorepo 示例，展示了如何将多语言文案（Locales）作为共享包管理。

## 结构

- **packages/locales**: 纯资源包，包含所有的翻译文案。
  - `src/zh-CN.ts`: 中文文案
  - `src/en-US.ts`: 英文文案
  - `src/index.ts`: 统一导出
- **apps/web**: 模拟 Web 应用，依赖 `@my-monorepo/locales` 包。

## 如何使用

1.  在根目录运行 `pnpm install` 安装依赖（需要先安装 pnpm）。
2.  在 `apps/web` 中，你可以像使用普通 npm 包一样导入 locales：
    ```typescript
    import { locales } from '@my-monorepo/locales';
    ```

## 优势

- **复用性**: Web、Mobile、Electron 等多个端可以共用同一套文案。
- **类型安全**: TypeScript 提供了完整的类型提示，防止 key 拼写错误。
- **按需加载**: 可以配合构建工具实现按需加载语言包。
