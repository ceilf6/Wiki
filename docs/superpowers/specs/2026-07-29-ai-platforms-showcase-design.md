# AI 平台展示页（ai-platforms-showcase）设计 spec

日期：2026-07-29 ｜ 阶段：MVP ｜ 状态：已获用户批准（方案 A）

## 目标

一个独立的、本地 dev server 可启动的单页展示站，精美地展示国内主流 8 家 AI 平台（豆包、通义千问、Kimi、DeepSeek、智谱清言、文心一言、腾讯元宝、讯飞星火）。与 Wiki 仓库其余内容零耦合。

## 位置与技术栈

- 目录：Wiki 仓库根下 `ai-platforms-showcase/`，独立 `package.json`
- 栈：Vite + React + TypeScript，无额外运行时依赖（不引动画库）
- 启动：`npm install && npm run dev`

## 视觉方向

深色光晕科技风：深色底、背景渐变光晕、玻璃拟态卡片、品牌色点缀。要求有辨识度，避免通用 AI 模板感（执行时遵循 frontend-design skill）。不使用外链官方 logo 图片（版权 + 离线），用品牌色字母徽标替代。

## 架构（方案 A：数据驱动单组件流）

- `src/data/platforms.ts` — 唯一数据源：`Platform { id, name, vendor, model, highlights[], brandColor, url }` × 8
- 组件：`Hero`（大标题 + 副标题 + 光晕背景）、`PlatformCard`（徽标字、平台名、厂商、代表模型、2-3 条亮点、官网链接）、`Footer`
- 品牌色经 CSS 自定义属性注入卡片；hover 品牌色光效；滚动入场用 IntersectionObserver + CSS transition
- 错误处理面极小：数据为静态常量；外链 `rel="noopener noreferrer"`

## 质量门禁（MVP）

`tsc --noEmit` 与 `vite build` 通过即可；不写测试套件。目视浏览器确认视觉效果。

## 交付流程

GitHub issue（需求原文）→ 分支开发 → PR 关联 issue → repo-guard 评论处理至无 bug → 交付。
