# Axios 错误处理示范项目

基于 Vite + TypeScript 的可运行示例

## 安装依赖

```bash
cd sandboxs/axios_solve/demo
npm install
```

## 运行

```bash
npm run dev
```

浏览器会自动打开 http://localhost:3000

## 功能展示

1. **异步错误捕获对比** - 演示 try-catch 的正确用法
2. **网络错误处理** - 自动 Toast，业务层无需处理
3. **业务错误处理** - 判断 status，手动处理 UI
4. **多请求聚合** - 使用 noToast 避免重复提示
5. **请求去重** - 使用 AbortController 取消重复请求

## 核心文件

- `axiosConfig.ts` - Axios 实例配置 + 拦截器
- `types.ts` - TypeScript 类型定义
- `main.ts` - 业务逻辑示例
- `index.html` - 演示页面
