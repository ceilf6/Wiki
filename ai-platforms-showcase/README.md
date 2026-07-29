# 大模型图鉴 · AI 平台展示页

深色光晕科技风的单页展示站：国内主流 8 家 AI 平台（豆包、通义千问、Kimi、DeepSeek、智谱清言、文心一言、腾讯元宝、讯飞星火）。独立子项目，与仓库其余内容零耦合。

## 启动

```bash
cd ai-platforms-showcase
npm install
npm run dev      # http://localhost:5173
```

## 质量门禁

```bash
npm run type-check   # tsc --noEmit
npm run build        # vite build
```

## 结构

- `src/data/platforms.ts` — 唯一数据源，改数据即改页面
- `src/components/` — Hero / PlatformCard / Footer
- `src/hooks/useReveal.ts` — 滚动入场
- `src/styles.css` — 设计令牌与全部样式

设计 spec：`../docs/superpowers/specs/2026-07-29-ai-platforms-showcase-design.md`
