// 所有工厂的接口
import { ILogger } from "../LoggerProducts/ILogger"; // 产品接口

export interface IFactory {
    createLogger(): ILogger
}