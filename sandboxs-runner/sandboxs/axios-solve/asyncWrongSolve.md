try…catch 只能捕获同步抛出的异常（包括try中 **await** 到的 Promise 的reject ，无法直接捕获 Promise）

```tsx
try {
  await Promise.reject(new Error('boom'))
} catch (e) {
  console.log('caught', e) // 可以抓到
}
```

```tsx
try {
  Promise.reject(new Error('boom'))
} catch (e) {
  console.log('不会进这里') // 无法抓到
}

// Promise 内部的错误只能自己的 catch 方法去抓取
Promise.reject(new Error('boom')).catch(e => {
  console.log('caught', e)
})
```

try…catch的作用域只覆盖当前这次同步执行栈（宏任务）里发生的throw

- await Promise 是等这个 Promise 结束，如果 reject 就在 await 这一行以 throw 形式抛出，也就能被 try 接住
- Promise.then( ) / .reject( ) 是放到**微任务**队列之中了，没有 await 也没有把它 return 链进来，当执行时早就退出 try 这个任务了

# 钱管家

- 拦截器做统一兜底
- **网络错误 reject / 业务错误 resolve**
- **展示错误** 与 **控制流程**分离（Toast是副作用而不是控制流）
- 给业务层保留 noToast 逃生口

## 1. business-API 层 - 统一请求封装

直接用 Axios 实例做了两类错误出口

### a. 直接 reject（网络）

会被页面 try…catch 捕获

- 离线：**请求拦截器** 里 [navigator.onLine](http://navigator.onLine) 为 false 等等
- aixos异常-超时/断网/跨域等：响应拦截器的 error 分支会 throw new Error 并触发 **toast**（轻量级提示UI组件，不像 Modal / Alert 一样会阻塞操作，一般用于传达结果或状态）所以业务层不需要自己去写处理

### b. 不reject，返回一个带 status/msg 的业务响应（业务）

页面的 try…catch 抓取不到

- 统一的登陆失效处理：当 response.data.status === 10001（枚举维护）时，直接 return **toLogin**( ); 要求再去登陆
- 状态码不是200：记录**日志**（**Logger.error**，并结合**traceId(一般放在请求头，是分布式系统中一次请求的全链路唯一标识)**由**Owl**这个SDK发送到后端监控系统）并触发toast，然后 return [response.data](http://response.data) （Promise仍然算 **rosolve** 的）
- 网络状态码成功但是**业务状态码**非成功的：存在 msg 中返回

当在 **axios config** 中传入 RequestOptions.noToast 为 true 时就不会自动 toast 让页面自己处理

## 2. business中其他API

调用了 1 中暴露的 get、post 方法，所以就不用做错误抓取，直接继承就好

## 3. 页面业务层-只需要关心业务状态

对应了 1 中 reject 还是 resolve

### a. 网络错误

会直接 reject 然后触发 toast ，所以当启动 toast 的时候不需要做额外处理

多请求聚合时传 { **noToast: true** } ，**避免并发** Promise.all 时一堆 toast ，在业务层根据 res.status !== ApiStatus.OK 组装 errMsg 最后**统一渲染** <ErrorComponent errMsg={errorMsg} />

### b. 业务错误

由于 toast 没有处理，得对 res.status 进行业务状态码进行判断、兜底业务失败

```tsx
import { traceid } from '@mtfe/mtraceid';
import { i18nClient } from '@sailor/i18n-web';
import axios, {
  type AxiosRequestConfig,
  CanceledError,
  InternalAxiosRequestConfig,
} from 'axios';
import { getGrayVersionTag } from '../../gray';
import { isGray } from '../env';
import { HOST } from '../host';
import { isI18nEnableApi } from '../i18n';
import { Logger, LoggerCategory } from '../Logger';
import { parseTextWithLink } from '../parseTextWithLink';
import { toast } from '../toast';
import { checkConnectionStatus } from './network';

/**
 * 100001: 旧未登录状态码(不知道是否还有此逻辑，可以和后端确定后删除): 至少现在联调验证，未登录状态码仍然是这个
 * 106: 新的未登录状态码
 */
const UN_LOGIN_CODE = 106;
const UN_LOGIN_STATUS = 100001;
const SUCCESS_CODE = 0;
const CUI_SUCCESS_CODE = '1';

const toLogin = () => {
  const target = encodeURIComponent(location.href);
  const params = `productType=sqt_expense&isNeedMtToken=false&targetUrl=${target}`;
  location.href = `${HOST.host}/open/tmc/toLogin?${params}`;
};

export const getGrayParams = () => {
  return isGray()
    ? {
        __setkey: getGrayVersionTag(),
      }
    : {};
};

const toastError = (msg: string) => {
  const formattedMsg = parseTextWithLink(
    msg || i18nClient.t('fe_SystemException_a22e63f7', '系统异常')
  );
  toast.error(formattedMsg);
};

interface ICancelRequest {
  open?: boolean; // 是否开启
  token?: string; // 请求的唯一标识符
}
interface HttpGetParams {
  url: string;
  params?: Record<string, any>;
}
interface HttpPostParams {
  url: string;
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  cancelRequest?: ICancelRequest;
}
const pendingQueue = new Map();
const getToken = (config: any) => {
  const token = config.cancelRequest?.token;
  if (token) return token;
  return `${config.method}_${config.url}`;
};

// 获取完整请求url
const getFullUrl = (config: any) => {
  if (config.url.startsWith('http')) return config.url;
  return HOST.host + config.url;
};

// 判断请求是否在队列中，如果在就执行取消请求
const judgePendingFunc = (token: string) => {
  if (pendingQueue.has(token)) {
    pendingQueue.get(token)();
  }
};
// 删除队列中对应已执行的请求
const removeResolvedFunc = (token: string) => {
  if (pendingQueue.has(token)) {
    pendingQueue.delete(token);
  }
};

// TODO 使用新的AbortController
const { CancelToken } = axios;
const instance = axios.create({
  baseURL: '/',
  timeout: 80000,
  responseType: 'json',
  withCredentials: true,
  // @ts-ignore
  crossDomain: true,
  xDomain: true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

// 白名单接口请求，header添加locale和region字端
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url && isI18nEnableApi(config.url)) {
    config.headers['locale'] = window?.ExpI18n?.systemConfig?.locale || 'zh';
    config.headers['region'] = window?.ExpI18n?.systemConfig?.region || 'CN';
  }
  return config;
});

instance.interceptors.request.use((config: any) => {
  /** 检查网络连接状态 */
  const isConnected = checkConnectionStatus();
  if (!isConnected) {
    return Promise.reject(
      new Error(i18nClient.t('fe_909b880f', '当前网络未连接，请检查网络'))
    );
  }

  /** 请求发起之前检验该请求是否在队列中，如果在就把队列中pending请求cancel */
  const open = config.cancelRequest?.open;
  if (open) {
    const token = getToken(config);
    judgePendingFunc(token);
    config.cancelToken = new CancelToken((cb) => pendingQueue.set(token, cb));
  }

  /** 添加灰度参数 */
  config.params = {
    ...config.params,
    ...getGrayParams(),
  };

  /** 添加header */
  const method = config.method.toUpperCase() || 'GET';
  method == 'POST' && (config.headers['X-Requested-With'] = 'XMLHttpRequest');
  method == 'GET' && (config.headers['Accept'] = 'application/json');
  /\/sqt\/expense/.test(config.url) &&
    (config.headers['M-TraceId'] = traceid());

  /** 添加完整的url */
  config.url = getFullUrl(config);

  /** 返回config */
  return config;
});

// 添加请求取消和错误处理
instance.interceptors.response.use(
  (response) => {
    const open = (response.config as any).cancelRequest?.open;
    if (open) {
      const token = getToken(response.config);
      removeResolvedFunc(token);
    }

    // 是否需要提示toast
    const needToastErr = !(response.config as any)?.noToast;
    // 是否是 CUI 接口
    const isCui = (response.config as any)?.isCui;

    // 登录失效
    if (
      response.data?.status === UN_LOGIN_STATUS ||
      response.data?.code === UN_LOGIN_CODE
    ) {
      if (location.href.includes('debug')) {
        console.log('登录失效', response.config.url);
        return;
      }
      return toLogin();
    }

    // 处理网络异常(非200)
    const defaultMsg = i18nClient.t(
      'fe_ApiNetworkError_8cfc3a4d',
      '接口网络状态异常'
    );
    if (response.status !== 200) {
      const msg = response.data?.message || response.data?.msg || defaultMsg;
      Logger.error({
        name: `${defaultMsg}：${response.config.url}`,
        message: msg,
        category: LoggerCategory.AjaxError,
      });
      needToastErr && toastError(msg);
      return response.data;
    }

    // 处理业务异常
    if (
      (!isCui && response.data?.status !== SUCCESS_CODE) ||
      // 非 CUI 接口，状态码为 0 表示成功
      (isCui && response.data?.status !== CUI_SUCCESS_CODE) // CUI 接口，状态码为 "1" 表示成功
    ) {
      const msg =
        response.data?.message ||
        response.data?.msg ||
        response.data?.data?.message ||
        defaultMsg;
      Logger.error({
        name: `${defaultMsg}：${response.config.url}`,
        message: JSON.stringify(response.data || {}),
        category: LoggerCategory.AjaxError,
      });
      needToastErr && toastError(msg);
      return response.data;
    }
    return response.data;
  },
  (error: any) => {
    if (error instanceof CanceledError) {
      return;
    }
    if (!error.config?.noToast) {
      const msg = error?.response?.data?.msg || error?.message;
      toastError(msg);
    }
    if (!axios.isCancel(error)) {
      throw new Error(error?.response?.data?.msg || error?.message);
    }
  }
);
export interface ApiResponse<T> {
  status?: number;
  message?: string;
  msg?: string;
  data: T;
  code?: number; // 兼容非标准接口
  result?: T; // 兼容非标准接口
}
export enum ApiStatus {
  OK = 0,
  ApprovalDeparted = 300001, // 审批人已离职
  NeedRepay = 600002, // 需要偿还
}

export interface RequestOptions extends AxiosRequestConfig {
  cancelRequest?: ICancelRequest;
  noToast?: boolean;
  isCui?: boolean; // 是否是 CUI 接口
}
export const get = <T>(
  { url, params = {} }: HttpGetParams,
  otherOptions: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  return instance.get(url, {
    params,
    ...otherOptions,
    withCredentials: true,
  });
};
export const post = <T>(
  { url, data: requestData = {}, params, headers }: HttpPostParams,
  otherOptions: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  return instance.post(url, requestData, {
    params,
    headers: {
      ...headers,
    },
    ...otherOptions,
    withCredentials: true,
  } as any);
};

```