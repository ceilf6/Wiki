import { IServer } from "./base/01-Interface";
import { Server } from "./base/02-Server";

// 使用 ES6 Proxy API 创建代理对象，而不是再包一层代理类。
export function createProxyServer(server: Server, permission: number): IServer {
    return new Proxy(server, {
        get(target, prop, receiver) {
            const originalValue = Reflect.get(target, prop, receiver);

            // 代理层中间可以做很多事情
            if (prop === "operation" && typeof originalValue === "function") {
                return (...args: unknown[]) => {
                    if ((permission & 1) === 1) {
                        return originalValue.apply(target, args);
                    }

                    console.log("permission is not allowed");
                    return undefined;
                };
            }

            return originalValue;
        },
    });
}
