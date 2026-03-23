import { IServer } from "./01-Interface";

// 提供真实服务的类
export class Server implements IServer {
    operation(): void {
        console.log("Service operation called");
    }
}
