import { IServer } from "./base/01-Interface";
import { Server } from "./base/02-Server";

export default class Proxy implements IServer {
    // 真实服务引用
    private _realServer: Server
    private _permission: number

    constructor(server: Server, permission: number) {
        this._realServer = server
        this._permission = permission
    }

    // 代理层中间可以做很多事情
    private proxyCheck() {
        // 需要 () 因为 === 的优先级比 位运算 优先级高
        if ((this._permission & 1) === 1)
            return true
        return false
    }

    public operation(): void {
        if (this.proxyCheck())
            this._realServer.operation()
        else
            console.log('permission is not allowed')
    }
}