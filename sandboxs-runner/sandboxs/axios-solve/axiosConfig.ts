import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { ApiStatus, type ApiResponse, type RequestOptions } from './types';

let instance: AxiosInstance;
const pendingRequests = new Map<string, AbortController>();

// Toast 工具
const showToast = (message: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast(message);
    } else {
        console.log('Toast:', message);
    }
};

// 生成 traceId
const generateTraceId = () => {
    return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

// 日志记录
const logError = (name: string, url: string, message: string) => {
    console.error({
        name,
        url,
        message,
        timestamp: new Date().toISOString(),
    });
};

export function createAxiosInstance() {
    instance = axios.create({
        baseURL: '/api',
        timeout: 8000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // ========== 请求拦截器 ==========
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig & RequestOptions) => {
            // 1. 检查网络状态
            if (!navigator.onLine) {
                return Promise.reject(new Error('网络未连接，请检查网络'));
            }

            // 2. 添加 traceId（用于全链路追踪）
            config.headers['trace-id'] = generateTraceId();

            // 3. 添加灰度参数
            config.params = {
                ...config.params,
                version: localStorage.getItem('grayVersion') || '',
            };

            // 4. 请求去重逻辑
            if (config.cancelDuplicate) {
                const key = `${config.method}_${config.url}`;

                // 如果有相同请求在进行，取消旧请求
                if (pendingRequests.has(key)) {
                    pendingRequests.get(key)!.abort();
                    console.log('取消重复请求:', key);
                }

                // 创建新的 AbortController
                const controller = new AbortController();
                config.signal = controller.signal;
                pendingRequests.set(key, controller);
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // ========== 响应拦截器 ==========
    instance.interceptors.response.use(
        (response) => {
            const config = response.config as InternalAxiosRequestConfig & RequestOptions;
            const needToast = !config.noToast;

            // 请求完成，从去重队列移除
            if (config.cancelDuplicate) {
                const key = `${config.method}_${config.url}`;
                pendingRequests.delete(key);
            }

            // 1. 登录失效处理
            if (response.data?.status === ApiStatus.UN_LOGIN) {
                showToast('登录已失效，请重新登录');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
                return;
            }

            // 2. HTTP 状态码异常
            if (response.status !== 200) {
                const msg = response.data?.message || '网络异常';
                logError('网络错误', config.url || '', msg);
                needToast && showToast(msg);
                return response.data; // 不 reject，返回数据
            }

            // 3. 业务状态码异常
            if (response.data?.status !== ApiStatus.SUCCESS) {
                const msg = response.data?.message || response.data?.msg || '业务异常';
                logError('业务错误', config.url || '', msg);
                needToast && showToast(msg);
                return response.data; // 不 reject，返回数据
            }

            return response.data;
        },
        (error) => {
            const config = error.config as InternalAxiosRequestConfig & RequestOptions;

            // 请求被取消（AbortController）
            if (axios.isCancel(error)) {
                console.log('请求已取消:', error.message);
                return Promise.reject(error);
            }

            // 网络错误（超时/断网/跨域等）
            if (!config?.noToast) {
                const msg = error.response?.data?.message || error.message || '请求失败';
                showToast(msg);
            }

            logError('网络异常', config?.url || '', error.message);

            // reject 让页面可以 try-catch
            return Promise.reject(new Error(error.message));
        }
    );

    return instance;
}

// ========== 封装请求方法 ==========
export const get = <T>(
    url: string,
    params?: any,
    options?: RequestOptions
): Promise<ApiResponse<T>> => {
    return instance.get(url, { params, ...options });
};

export const post = <T>(
    url: string,
    data?: any,
    options?: RequestOptions
): Promise<ApiResponse<T>> => {
    return instance.post(url, data, options);
};

export { instance };
