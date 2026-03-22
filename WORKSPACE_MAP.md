| from openclaw

# WORKSPACE_MAP

> 位置：`/Users/a86198/Desktop/Lab`
>
> 这不是单一业务项目，而是一个 **个人技术实验室 / 知识库 / OpenClaw 工作区**。
> 核心主题集中在：**前端、浏览器原理、JavaScript/TypeScript、React/Vue、网络、AI 应用**。

---

## 1. 总体定位

这个工作区大致由 5 类内容组成：

1. **OpenClaw 协作与助手运行区**
2. **前端与底层原理知识库**
3. **源码阅读/镜像仓库**
4. **可运行的 sandbox / demo / 练手项目**
5. **图示、流程图、测试素材与自动化脚本**

如果只想快速理解它，可以把它想成：

- 上层：OpenClaw 协作文件
- 中层：前端/浏览器/网络/AI 知识沉淀
- 下层：大量实验项目和源码阅读材料

---

## 2. 顶层目录速览

### 与 OpenClaw / 助手协作直接相关

- `AGENTS.md`：工作规则与行为约束
- `SOUL.md`：助手的风格、边界与人格基调
- `USER.md`：用户信息模板（目前更像待填写档案）
- `TOOLS.md`：本地环境备注模板
- `IDENTITY.md`：助手身份模板
- `HEARTBEAT.md`：心跳任务说明
- `.openclaw/`：OpenClaw 本地状态
- `.openmcp/`：MCP 连接和标签页配置
- `docs/`：本工作区/实验场的说明文档

### 主体知识库 / 研究目录

- `AI/`
- `Browser/`
- `CSS/`
- `HTML/`
- `JS/`
- `Network/`
- `NodeJS/`
- `React/`
- `TS/`
- `Vue2/`
- `Vue3/`
- `Design-Pattern/`
- `engineering/`

### 运行型实验 / 组织型目录

- `sandboxs-runner/`
- `monorepo/`
- `assetsForTest/`
- `_reference/`
- `scripts/`

### 配套资源

- `.effect-pictures/`：技术图示图片
- `.flows/`：draw.io 流程图
- `.github/`：自动化工作流
- `.githooks/`：Git hooks

---

## 3. 重点目录地图

## 3.1 `AI/`

AI 相关内容分成三块：

- `1-LLM-base-Transformer/`：LLM / Transformer 基础
- `2-AI-infra/`：AI 基础设施
- `3-Application/`：AI 应用层

其中：

- `AI/3-Application/Openclaw-source/` 很可能是 OpenClaw 源码/工作副本
- `AI/3-Application/FrontAgent-app/` 看名字像 AI Agent 或前端代理实验
- `AI/3-Application/jargons/` 可能是术语沉淀

**适合做什么：**
- 看 LLM 基础笔记
- 查 AI infra 结构
- 进入 OpenClaw 相关源码和应用目录

---

## 3.2 `Browser/`

偏浏览器原理与 Web 平台机制：

- `Chromium-source/`：Chromium 源码镜像/副本
- `Web-API/`：Web API 相关学习
- `cache/`：缓存机制相关测试
- `render/`：渲染相关实验
- `store/`：浏览器存储机制

其中 `store/` 下覆盖了：

- `cookie/`
- `localStorage/`
- `sessionStorage/`
- `IndexedDB/`
- `FileAPI/`
- `WebSQL/`
- `SharedStorage/`

**适合做什么：**
- 查浏览器存储差异
- 看渲染/掉帧类实验
- 对照 Chromium 目录做源码级理解

---

## 3.3 `CSS/`

这是一个很完整的 CSS 分类知识区，按概念和场景拆得比较细：

- `BFC/`
- `box/`
- `compute/`
- `transition/`
- `布局/`
- `居中/`
- `堆叠上下文/`
- `视觉格式化模型/`
- `web字体&图标/`
- `inherit继承/`
- `muti层叠/`

内容形式多为：

- 单文件 HTML 示例
- `core.md` 概念总结
- 小型实验页面

**适合做什么：**
- 快速复习某个 CSS 概念
- 找能直接打开看的最小案例
- 拿现成 demo 做教学或二次实验

---

## 3.4 `HTML/`

按元素族和语义拆分：

- `HTML实体/`
- `a/`
- `iframe/`
- `img/`
- `列表元素/`
- `多媒体元素/`
- `容器元素/`
- `文本元素/`
- `文档结构/`
- `表单元素/`
- `表格元素/`
- `语义化/`

还有一些辅助脚本/笔记：

- `StackParseHTML.js`
- `元素包含关系.md`

**适合做什么：**
- 回查 HTML 元素语义与结构
- 打开单页例子快速验证行为

---

## 3.5 `JS/`

这是很大的 JavaScript 知识区，覆盖语言特性、运行机制、算法、Web API、预习练习等。

主要分块包括：

- `API/`
- `ESM/`
- `Proxy/`
- `Reflect/`
- `TypeJS/`
- `V8engine-source/`
- `Web-API/`
- `algorithm/`
- `call-stack/`
- `function/`
- `property-descriptor/`
- `sync/`
- `preJS/`

你会在这里看到很多典型主题：

- 作用域 / 闭包
- 调用栈
- 原型 / 构造函数
- 属性描述符
- 同步/异步
- 事件循环
- 各种手写题与算法实验

**适合做什么：**
- 查 JS 某个知识点的最小实验
- 找手写实现或面试题草稿
- 对照 V8 / Web API 方向做深入理解

---

## 3.6 `Network/`

网络相关沉淀也很成体系：

- `AJAX/`
- `Socket.io/`
- `WebSocket/`
- `cookie/`
- `cryptology/`

根目录还有很多主题文件：

- `HTTP.md`
- `HTTP各版本.md`
- `SSL.md`
- `SSL-chore.md`
- `XSS.md`
- `jwt.js`
- `heartbeat.js`
- `CORS.html`
- `fileUpload.html`

**适合做什么：**
- 回看 HTTP / SSL / XSS / CORS 基础
- 查 cookie / CSRF / JSONP 相关实验
- 打开 AJAX / WebSocket 的小 demo

---

## 3.7 `NodeJS/`

当前主要有两块：

- `CMJ/`：CommonJS 相关实验
- `Libuv-source/`：libuv 源码副本

这说明这里不只关注前端页面，也在延伸到底层运行时和 Node 机制。

**适合做什么：**
- 理解 CommonJS 加载行为
- 配合事件循环 / I/O 机制学习 libuv

---

## 3.8 `React/`

React 目录层次比较丰富：

- `Ahooks-source/`：ahooks 源码
- `React-source/`：React 源码
- `mini-react-app/`：迷你 React 实现/练手
- `sandboxs/`：React sandbox 项目
- `source-analyse/`：源码分析笔记
- `utils/`
- `pre/`

这块明显既有：

- 正式源码镜像
- 自己的分析文件
- 可跑的 demo
- mini 实现

**适合做什么：**
- 看 React 源码
- 找 Fiber / createElement 等分析
- 在 `sandboxs/` 或 `mini-react-app/` 跑实验

---

## 3.9 `TS/`

TypeScript 相关目前偏实验项目：

- `ex-ts-vite-react/`：TS + Vite + React 示例
- `sandboxs/`：TS 实验工程

**适合做什么：**
- 验证 TS 类型行为
- 作为小型前端工程模板参考

---

## 3.10 `Vue2/` 与 `Vue3/`

这两块都很完整，而且有明显的“源码 + API + sandbox”三层结构。

### `Vue2/`

- `Vue2-source/`：Vue 2 源码
- `pre/`：预习/基础实验
- `sandboxs/`：Vue 2 sandbox

### `Vue3/`

- `Vue3-source/`：Vue 3 源码
- `Pinia-source/`：Pinia 源码
- `composition-API/`：Composition API 实验
- `reactivity-API/`：Reactivity API 实验
- `sandboxs-vite/`：Vite 驱动的 Vue 3 sandbox

**适合做什么：**
- 对比 Vue2 / Vue3 的源码结构
- 验证响应式和组合式 API
- 直接跑 demo 看行为差异

---

## 3.11 `Design-Pattern/`

更偏通用软件设计思想：

- `Behavioral/`
- `Creational/`
- `Structural/`
- `OOP/`

下面已经细分出：

- Strategy
- Template
- Pub-Sub
- Watcher
- Factory
- Adapter
- Decorator
- Proxy

**适合做什么：**
- 回顾设计模式概念
- 给前端/框架源码阅读建立抽象映射

---

## 3.12 `engineering/`

目前重点是：

- `engineering/webpack/`

说明这里有工程化方向沉淀，但当前暴露出来的顶层还不算特别多。

---

## 3.13 `sandboxs-runner/`

这是一个 **重要的运行型入口**。

从 `package.json` 和说明看，它是一个 **基于 Vite 的实验场**，会自动扫描 `sandboxs/` 目录下的实验，并通过路由访问。

### 已知定位

- 项目名：`ui-playground`
- 技术栈：Vite + TypeScript + React + Vue
- 依赖还包括：`axios`、`framer-motion`、`gsap`、`antd-mobile`

### 目录结构

- `sandboxs-runner/package.json`
- `sandboxs-runner/vite.config.js`
- `sandboxs-runner/sandboxs/`

### 已有实验

包括但不限于：

- `CSS_ChangeThemeColor`
- `Compositor-Thread-scroll`
- `Compositor-Thread-transform`
- `Cookie&Token`
- `JS-in-template`
- `PropertyDescriptor`
- `animation`
- `axios-solve`
- `shopping-cart`
- `waterfall`
- `vue-observe`
- `wordMCP`
- `monorepo-locales`

这是当前工作区里 **最像统一入口项目** 的地方之一。

**适合做什么：**
- 直接启动实验场
- 快速添加新的 demo
- 集中浏览多个实验

---

## 3.14 `monorepo/`

当前最显眼的是：

- `Reimplementing-Masterpieces/`

README 提到它是一个子模块，用来研究与重写优秀工程方案。

下面有：

- `JS_TS/`
- `React/`
- `Vue/`
- `async/`
- `this/`

**适合做什么：**
- 看“重写经典实现”的类教程内容
- 借鉴结构来做拆解练习

---

## 3.15 `docs/`

`docs/_README.md` 对整个 Lab 的说明非常关键：

- 这是一个 Vite 驱动的实验 playground
- 实验模块放进 `sandboxs/<name>/`
- Agent / Monorepo 是另外两个主要模块
- 默认开发服务器地址是 `http://localhost:8030`

此外还有：

- `JS.md`
- `antd-mobile.md`
- `think.md`
- `_README-CN.md`

**适合做什么：**
- 先看入口说明
- 给后来者解释这个 Lab 是怎么组织的

---

## 4. 资源与辅助目录

### `.effect-pictures/`

大量技术讲解配图，例如：

- `Transformer.png`
- `MessageChannel.png`
- `proxy.png`
- `property-decriptor.png`
- React 相关流程示意图

这说明工作区中不少内容可能是“图文并行”的学习方式。

### `.flows/`

流程图文件，例如：

- `react_beginWork_flow.drawio`
- `react_completeWork_flow.drawio`
- `react_scheduler_flow.drawio`
- `FiberNode_memoizedState_effect.drawio`

这类文件对于 React/Fiber 源码分析很有价值。

### `assetsForTest/`

存放测试图片和素材：

- `cat.jpg`
- `ceilf6.png`
- `jinx.jpg`
- `maqima.jpeg`
- `pow.jpg`

### `_reference/`

看起来是参考资料归档区，目前可见：

- `NANFU/`

---

## 5. 自动化与仓库维护

### `.github/workflows/`

- `update-readme.yml`

### `scripts/`

- `setup-hooks.sh`
- `update-readme.mjs`

### `.githooks/`

- `git-wrapper.sh`
- `submodule/post-push`

说明这个工作区并非纯手工整理，已经带有一部分自动化维护能力。

---

## 6. 当前最像“主入口”的位置

如果你问“我该从哪里开始看”，我会给这几个优先级：

### 第一入口：`README.md`

这里定义了整个 Lab 的定位：

- 一个基于 Vite 的实验 playground
- 支持多模块
- 重点包含 sandbox、agent、monorepo

### 第二入口：`docs/_README.md`

它更明确地说明了这个工作区的运行方式和模块划分。

### 第三入口：`sandboxs-runner/`

如果你想 **跑起来看**，这里是最自然的入口。

### 第四入口：各技术主题目录

如果你想 **按知识点查资料**，就从这些目录直接进：

- `JS/`
- `React/`
- `Vue3/`
- `Browser/`
- `Network/`
- `AI/`

---

## 7. 当前工作区画像

一句话总结：

> 这是一个面向前端底层原理、框架源码、浏览器机制、网络基础与 AI 应用探索的个人实验室。

它不是典型的：

- 单体业务系统
- 后端服务仓库
- 生产应用项目

它更像：

- 个人技术研究仓
- 知识库 + demo 集合
- 源码阅读配套实验场
- OpenClaw 驻扎并协助整理的长期工作区

---

## 8. 推荐的后续整理方向

如果后面要继续优化这个工作区，建议按下面顺序做：

1. **补齐根目录导航**
   - 给每个一级目录补一个简短 `README.md`
   - 统一写清楚：用途、入口、是否可运行、依赖什么

2. **统一实验目录命名**
   - 现在同时存在 `sandboxs/`、`sandboxs-runner/`、各技术栈下局部 sandbox
   - 后面可以统一约定：哪些是知识点 demo，哪些是完整小项目

3. **给源码镜像区加“阅读索引”**
   - 比如 React/Vue/Chromium/libuv 各自增加一个 `README.md`
   - 记录推荐阅读路径、重点文件、配套流程图位置

4. **把图示与笔记建立双向链接**
   - `.effect-pictures/` 和 `.flows/` 价值很高
   - 建议在相关笔记里直接引用对应图片/流程图

5. **补齐 OpenClaw 的长期记忆文件**
   - `USER.md` 可补基础资料
   - `MEMORY.md` 可开始记录长期决策与偏好
   - `memory/YYYY-MM-DD.md` 可作为日常工作日志

---

## 9. 一句话导航

- 想看整体定位：`README.md`
- 想看运行方式：`docs/_README.md`
- 想直接跑实验：`sandboxs-runner/`
- 想按知识点查：`JS/`、`React/`、`Vue3/`、`Browser/`、`Network/`、`AI/`
- 想看配图/流程图：`.effect-pictures/`、`.flows/`

---

如果后面要继续，我建议下一步再补一份：

- **`ACTIVE_PROJECTS.md`**：列出当前最活跃、最值得优先关注的目录
- 或者 **`QUICK_START.md`**：告诉未来的你“想查资料、想跑 demo、想读源码”分别该从哪进
