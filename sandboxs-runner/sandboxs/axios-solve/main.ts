import axios from 'axios';
import { createAxiosInstance, get, post } from './axiosConfig';
import { ApiStatus, type ApiResponse } from './types';

// 创建 axios 实例
createAxiosInstance();

// Toast 工具
function showToast(message: string) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 挂载到全局供 HTML 调用
(window as any).showToast = showToast;

// 1. 异步错误捕获对比
(window as any).testAsyncError = async (type: 'wrong' | 'correct') => {
    const resultEl = document.getElementById('async-result')!;

    if (type === 'wrong') {
        try {
            // ❌ 没有 await，try-catch 捕获不到
            Promise.reject(new Error('这是一个错误'));
            resultEl.className = 'result error';
            resultEl.textContent = '等待 3 秒看是否捕获...\n(提示：不会被 catch 捕获)';

            setTimeout(() => {
                resultEl.textContent += '\n\n结果：未被 catch 捕获！\n错误会显示在控制台的 Uncaught Promise rejection';
            }, 3000);
        } catch (e) {
            resultEl.className = 'result success';
            resultEl.textContent = `捕获到错误: ${e}`;
        }
    } else {
        try {
            // ✅ 使用 await，可以捕获
            await Promise.reject(new Error('这是一个错误'));
        } catch (e) {
            resultEl.className = 'result success';
            resultEl.textContent = `✅ 成功捕获: ${(e as Error).message}`;
        }
    }
};

// 2. 网络错误处理
(window as any).testNetworkError = async () => {
    const resultEl = document.getElementById('network-result')!;
    resultEl.textContent = '请求中...';

    try {
        // 请求不存在的域名，触发网络错误
        await axios.get('https://this-domain-does-not-exist-12345.com/api/test');
    } catch (error: any) {
        resultEl.className = 'result error';
        resultEl.textContent = `网络错误（已在拦截器处理 + Toast）:\n${error.message}\n\n在实际项目中，拦截器会自动 toast，这里不需要额外处理`;
    }
};

(window as any).testTimeout = async () => {
    const resultEl = document.getElementById('network-result')!;
    resultEl.textContent = '请求中...（3秒超时）';

    try {
        // 模拟超时（请求一个很慢的接口）
        await axios.get('https://httpbin.org/delay/5', { timeout: 3000 });
    } catch (error: any) {
        resultEl.className = 'result error';
        resultEl.textContent = `超时错误:\n${error.message}\n\n拦截器自动处理并 toast`;
    }
};

// 3. 业务错误处理
interface UserInfo {
    id: number;
    name: string;
    email: string;
}

(window as any).testBusinessError = async () => {
    const resultEl = document.getElementById('business-result')!;
    resultEl.textContent = '请求中...';

    // 使用 Mock 数据模拟业务错误
    const mockResponse: ApiResponse<null> = {
        status: 1001,
        message: '用户权限不足',
        data: null
    };

    // 模拟异步请求
    await new Promise(resolve => setTimeout(resolve, 500));

    // 业务层判断
    if (mockResponse.status === ApiStatus.SUCCESS) {
        resultEl.className = 'result success';
        resultEl.textContent = `成功: ${JSON.stringify(mockResponse.data, null, 2)}`;
    } else {
        resultEl.className = 'result error';
        resultEl.textContent = `业务错误（status=${mockResponse.status}）:\n${mockResponse.message}\n\n注意：这里不是 reject，而是 resolve\n页面需要自己判断 status`;
    }
};

(window as any).testSuccess = async () => {
    const resultEl = document.getElementById('business-result')!;
    resultEl.textContent = '请求中...';

    // Mock 成功响应
    const mockResponse: ApiResponse<UserInfo> = {
        status: ApiStatus.SUCCESS,
        message: 'success',
        data: {
            id: 1,
            name: '张三',
            email: 'zhangsan@example.com'
        }
    };

    await new Promise(resolve => setTimeout(resolve, 500));

    if (mockResponse.status === ApiStatus.SUCCESS) {
        resultEl.className = 'result success';
        resultEl.textContent = `✅ 请求成功:\n${JSON.stringify(mockResponse.data, null, 2)}`;
    }
};

// 4. 多请求聚合
(window as any).testMultipleRequests = async () => {
    const resultEl = document.getElementById('multiple-result')!;
    resultEl.textContent = '并发请求中...';

    try {
        // 模拟 3 个请求
        const mockResponses: ApiResponse<any>[] = [
            { status: ApiStatus.SUCCESS, data: { name: '用户信息' }, message: 'success' },
            { status: 1001, data: null, message: '订单加载失败' },
            { status: 1002, data: null, message: '商品加载失败' }
        ];

        await new Promise(resolve => setTimeout(resolve, 800));

        // 使用 noToast 选项，避免多个 toast
        const [res1, res2, res3] = mockResponses;

        // 统一处理错误
        const errors: string[] = [];
        if (res1.status !== ApiStatus.SUCCESS) errors.push(`用户: ${res1.message}`);
        if (res2.status !== ApiStatus.SUCCESS) errors.push(`订单: ${res2.message}`);
        if (res3.status !== ApiStatus.SUCCESS) errors.push(`商品: ${res3.message}`);

        if (errors.length > 0) {
            resultEl.className = 'result error';
            resultEl.textContent = `部分请求失败（统一处理）:\n${errors.join('\n')}\n\n使用 { noToast: true } 避免多个 toast`;
            showToast(`${errors.length} 个请求失败`);
        } else {
            resultEl.className = 'result success';
            resultEl.textContent = '全部请求成功！';
        }
    } catch (error) {
        resultEl.className = 'result error';
        resultEl.textContent = `网络错误: ${error}`;
    }
};

// 5. 请求去重
let clickCount = 0;
(window as any).testDuplicateRequest = async () => {
    const resultEl = document.getElementById('duplicate-result')!;
    clickCount++;
    const currentClick = clickCount;

    resultEl.textContent = `第 ${currentClick} 次点击，请求中...\n(快速点击会取消前一个请求)`;

    try {
        // 模拟慢速请求
        await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, 2000);

            // 模拟请求取消
            if (clickCount > currentClick) {
                clearTimeout(timer);
                reject(new Error('Request canceled'));
            }
        });

        // 只有最后一次请求会完成
        if (clickCount === currentClick) {
            resultEl.className = 'result success';
            resultEl.textContent = `✅ 第 ${currentClick} 次请求完成\n\n在真实项目中使用 AbortController 或 CancelToken\n自动取消重复请求`;
        }
    } catch (error: any) {
        if (error.message === 'Request canceled') {
            resultEl.className = 'result';
            resultEl.textContent = `第 ${currentClick} 次请求被取消（有新请求）`;
        }
    }
};

console.log('✅ Axios 错误处理示范已加载');
