import { FileLogger } from "../LoggerProducts/FileLogger";
import { ILogger } from "../LoggerProducts/ILogger";
import { IFactory } from "./IFactories";

export default class FilerLoggerFactory implements IFactory {
    createLogger(): ILogger {
        return new FileLogger()
    }
}