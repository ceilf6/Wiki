import { IService } from "./01-Interface";

// 提供真实服务的类
export class Server implements IService {
    operation(): void {
        console.log("Service operation called");
    }
}
