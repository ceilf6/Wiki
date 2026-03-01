Axios 是一个基于 Promise 的 HTTP 客户端，用于在 浏览器/Node.js 中发请求，并提供了拦截器、实例化、请求取消、统一管理等工程级能力

并不是发请求，而是请求管理

```tsx
页面
  ↓
business API（get / post）
  ↓
Axios instance（拦截器）
  ↓
HTTP
```

# 解决原生fetch的问题

1. 无法自动JSON转换
2. 没有拦截
3. 超时控制复杂 → timeout
4. 请求取消得用AbortContoller → 内建
5. 配置每次都得重复写 → instance实例化
6. 不 reject 4XX/5XX → reject

Axios 本质是一个 **对HTTP生命周期进行封装的状态机**

# 5. 核心对象 AxiosInstance

```tsx
const instance = axios.create({...})
```

AxiosInstance 是一个带默认配置+拦截器链+独立状态 的请求客户端

可以有多个 instance

```tsx
const api = axios.create({ baseURL: '/api' });
const upload = axios.create({ baseURL: '/upload' });
```

每个都有自己的配置、headers、拦截器、cancel队列

# 生命周期

```tsx
请求 config
  ↓
请求拦截器（request interceptors）
  ↓
真正发 HTTP 请求
  ↓
响应拦截器（response interceptors）
  ↓
返回 Promise（resolve / reject）
```

# 1. JSON格式转换

Axios 会在 **请求前** 和 **响应后 ，自动做一次 JSON ↔ JS 转换**

## 配置

```tsx
transformRequest // 请求前 JS -> JSON
transformResponse // 响应后 JSON -> JS
```

响应时只有响应头包含

```tsx
Content-Type: application/json 或者 application/*+json
```

才会自动转换

例如代码是

```tsx
axios.post('/api/user', {
  name: 'Tom',
  age: 18
});
```

实际发送的是

```tsx
POST /api/user
Content-Type: application/json

{"name":"Tom","age":18}
```

# 2. 拦截

## a. 请求拦截器

**在请求发出去之前，把所有‘横切关注点’一次性补齐**

| **类型** | **你们做了什么** |
| --- | --- |
| 网络前置校验 | 离线直接 reject |
| 请求去重 | cancelRequest + pendingQueue |
| 灰度控制 | getGrayParams |
| 公共 Header | Accept / X-Requested-With |
| 国际化 | locale / region |
| 可观测性 | traceId |
| 多环境 | getFullUrl |

这些都不应该写在页面中

## b. 响应拦截器

本质是 **错误分级系统**

### Axios只在两种情况reject

### 1. 网络层错误 error

直接 reject 后 toast

### 2. 响应层 success 中的

即使 status!==200 || 业务status没有成功 也不会 reject 除非手动 throw

对于业务状态码错误并不是 reject 而是 resolve ，暴露到业务页面进行处理

# 3. 超时处理

Axios 会把超时当成一种标准的网络错误，并且自动走 reject 链路

```tsx
axios.get('/api/user', {
  timeout: 5000 // 5 秒
});
```

```tsx
const instance = axios.create({
  timeout: 5000,
});
```

如果超时了就自动进入 响应拦截器的error分支，error 类型是 AxiosError

# 4. 请求取消

路由**切换**，Tab**切换时需要中断之前的异步**

## I. CancelToken + pendingQueue

通过 method + url 生成**唯一 key**

同 key 新请求 → cancel 旧请求

防止了并发浪费 / 竞态

```tsx
const source = axios.CancelToken.source();

axios.get('/api/user', {
  cancelToken: source.token,
});

source.cancel();
```

## II. AbortController

是浏览器提供的 **统一中断正在进行的异步任务的标准机制**

```tsx
const controller = new AbortController();
const signal = controller.signal;

controller.abort(); // 触发中断
```

上面 I 中用AbortController重构

```tsx
const controller = new AbortController();
pendingMap.set(key, controller);

axios.get(url, { signal: controller.signal });
```

AbortController 是通用的异步中断机制，不只用于请求

### 1. Promise / setTimeout

```tsx
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('aborted'));
    });
  });
}
```

### 2. DOM事件监听

```tsx
element.addEventListener('click', handler, {
  signal: controller.signal,
});
```

**signal** 实现当 abort 时自动 removeEventListener

# 可观测性：traceId + Logger

```tsx
config.headers['M-TraceId'] = traceid();
```

```tsx
Logger.error(...)
```